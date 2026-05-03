# DevSecOps Integration Guide — CloudGuard

This guide covers integrating CloudGuard scans into your CI/CD pipelines.

---

## GitHub Actions

### Basic Security Gate
```yaml
# .github/workflows/cloudguard-security.yml
name: CloudGuard Security Gate

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  security-scan:
    name: CloudGuard Security Scan
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: CloudGuard Scan
        id: scan
        run: |
          curl -s -X POST https://api.cloudguard.io/v1/scan \
            -H "Authorization: Bearer ${{ secrets.CLOUDGUARD_API_KEY }}" \
            -H "Content-Type: application/json" \
            -d '{
              "provider": "aws",
              "services": ["s3", "iam", "ec2"],
              "scan_type": "quick",
              "fail_on_severity": "critical"
            }' > scan-result.json

          CRITICAL=$(jq '.data.critical_count' scan-result.json)
          echo "critical_count=${CRITICAL}" >> $GITHUB_OUTPUT

          if [ "$CRITICAL" -gt "0" ]; then
            echo "❌ ${CRITICAL} critical issues found!"
            exit 1
          fi
          echo "✅ No critical issues found"

      - name: Upload Scan Report
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: cloudguard-report-${{ github.run_id }}
          path: scan-result.json
          retention-days: 30

      - name: Comment on PR
        if: github.event_name == 'pull_request' && always()
        uses: actions/github-script@v7
        with:
          script: |
            const fs = require('fs');
            const report = JSON.parse(fs.readFileSync('scan-result.json', 'utf8'));
            const body = `## ⚡ CloudGuard Security Report
            | Severity | Count |
            |----------|-------|
            | 🔴 Critical | ${report.data.critical_count} |
            | 🟡 High | ${report.data.high_count} |
            | 🟢 Low | ${report.data.low_count} |
            
            ${report.data.critical_count > 0 ? '❌ **Pipeline blocked — critical issues found**' : '✅ **Security gate passed**'}`;
            
            github.rest.issues.createComment({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: context.issue.number,
              body
            });
```

### Scheduled Full Scan
```yaml
# .github/workflows/cloudguard-scheduled.yml
name: CloudGuard Nightly Deep Scan

on:
  schedule:
    - cron: '0 2 * * *'   # 2 AM UTC daily
  workflow_dispatch:

jobs:
  deep-scan:
    name: Nightly Deep Scan — All Clouds
    runs-on: ubuntu-latest

    steps:
      - name: Run deep scan
        run: |
          curl -s -X POST https://api.cloudguard.io/v1/scan \
            -H "Authorization: Bearer ${{ secrets.CLOUDGUARD_API_KEY }}" \
            -d '{
              "provider": "all",
              "scan_type": "deep",
              "notify": { "slack": "#security-alerts" }
            }'

      - name: Notify Slack on failure
        if: failure()
        run: |
          curl -X POST ${{ secrets.SLACK_WEBHOOK }} \
            -H 'Content-type: application/json' \
            -d '{"text":"⚠️ CloudGuard nightly scan found critical issues! Check the dashboard."}'
```

---

## Jenkins

### Declarative Pipeline
```groovy
// Jenkinsfile
pipeline {
    agent any

    environment {
        CLOUDGUARD_API_KEY = credentials('cloudguard-api-key')
        CLOUDGUARD_API_URL = 'https://api.cloudguard.io/v1'
    }

    stages {
        stage('Build') {
            steps {
                sh 'echo "Building application..."'
            }
        }

        stage('Unit Tests') {
            steps {
                sh 'echo "Running unit tests..."'
            }
        }

        stage('CloudGuard Security Scan') {
            steps {
                script {
                    def response = sh(
                        script: """
                            curl -s -X POST ${CLOUDGUARD_API_URL}/scan \\
                              -H "Authorization: Bearer ${CLOUDGUARD_API_KEY}" \\
                              -H "Content-Type: application/json" \\
                              -d '{"provider":"aws","scan_type":"quick","fail_on_severity":"critical"}'
                        """,
                        returnStdout: true
                    ).trim()

                    def result = readJSON text: response
                    def criticalCount = result.data.critical_count

                    if (criticalCount > 0) {
                        error("❌ CloudGuard: ${criticalCount} critical issues found! Pipeline blocked.")
                    }
                    echo "✅ CloudGuard: No critical issues. Proceeding with deployment."
                }
            }
            post {
                always {
                    archiveArtifacts artifacts: 'cloudguard-report.json', allowEmptyArchive: true
                }
            }
        }

        stage('Deploy to Staging') {
            steps {
                sh 'echo "Deploying to staging..."'
            }
        }

        stage('Deploy to Production') {
            when { branch 'main' }
            steps {
                input message: 'Deploy to production?', ok: 'Deploy'
                sh 'echo "Deploying to production..."'
            }
        }
    }

    post {
        failure {
            slackSend(
                channel: '#security-alerts',
                color: 'danger',
                message: "❌ CloudGuard pipeline failed: ${env.JOB_NAME} #${env.BUILD_NUMBER}"
            )
        }
        success {
            slackSend(
                channel: '#deployments',
                color: 'good',
                message: "✅ Pipeline passed CloudGuard gate: ${env.JOB_NAME} #${env.BUILD_NUMBER}"
            )
        }
    }
}
```

---

## GitLab CI

```yaml
# .gitlab-ci.yml
stages:
  - build
  - test
  - security
  - deploy

variables:
  CLOUDGUARD_API_URL: "https://api.cloudguard.io/v1"

build:
  stage: build
  script:
    - echo "Building application..."

unit-tests:
  stage: test
  script:
    - echo "Running unit tests..."

cloudguard-scan:
  stage: security
  image: curlimages/curl:latest
  script:
    - |
      RESULT=$(curl -s -X POST $CLOUDGUARD_API_URL/scan \
        -H "Authorization: Bearer $CLOUDGUARD_API_KEY" \
        -H "Content-Type: application/json" \
        -d '{
          "provider": "aws",
          "scan_type": "quick",
          "fail_on_severity": "critical"
        }')
      echo $RESULT > cloudguard-report.json
      CRITICAL=$(echo $RESULT | grep -o '"critical_count":[0-9]*' | cut -d: -f2)
      if [ "$CRITICAL" -gt "0" ]; then
        echo "❌ ${CRITICAL} critical security issues found!"
        exit 1
      fi
      echo "✅ Security gate passed"
  artifacts:
    when: always
    paths:
      - cloudguard-report.json
    expire_in: 30 days
  rules:
    - if: $CI_PIPELINE_SOURCE == "merge_request_event"
    - if: $CI_COMMIT_BRANCH == "main"

deploy-staging:
  stage: deploy
  script:
    - echo "Deploying to staging..."
  environment:
    name: staging
  only:
    - develop

deploy-production:
  stage: deploy
  script:
    - echo "Deploying to production..."
  environment:
    name: production
  only:
    - main
  when: manual
```

---

## Kubernetes

### Admission Webhook (Advanced)
Block deployments with unresolved critical vulnerabilities:

```yaml
# cloudguard-admission-webhook.yaml
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingWebhookConfiguration
metadata:
  name: cloudguard-security-gate
webhooks:
  - name: cloudguard.security.gate
    clientConfig:
      url: "https://cloudguard-webhook.security.svc.cluster.local/validate"
    rules:
      - apiGroups:   ["apps"]
        apiVersions: ["v1"]
        operations:  ["CREATE", "UPDATE"]
        resources:   ["deployments"]
    failurePolicy: Fail
    admissionReviewVersions: ["v1"]
```

### CronJob — Scheduled Cluster Scan
```yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: cloudguard-cluster-scan
  namespace: security
spec:
  schedule: "0 */6 * * *"    # Every 6 hours
  jobTemplate:
    spec:
      template:
        spec:
          containers:
            - name: cloudguard-scanner
              image: cloudguard/scanner:latest
              env:
                - name: CLOUDGUARD_API_KEY
                  valueFrom:
                    secretKeyRef:
                      name: cloudguard-secrets
                      key: api-key
                - name: SCAN_PROVIDER
                  value: "gcp"
                - name: SCAN_TYPE
                  value: "deep"
          restartPolicy: OnFailure
```

### Helm Values
```yaml
# values.yaml
cloudguard:
  enabled: true
  
  scan:
    provider: all
    type: deep
    schedule: "0 2 * * *"
    failOnSeverity: critical
  
  notifications:
    slack:
      enabled: true
      channel: "#security-alerts"
      webhookSecret: cloudguard-slack-webhook
    email:
      enabled: true
      recipients:
        - ramesh@company.io
  
  rbac:
    create: true
    serviceAccountName: cloudguard-scanner
  
  resources:
    requests:
      cpu: 100m
      memory: 128Mi
    limits:
      cpu: 500m
      memory: 512Mi
```

---

## Azure DevOps

```yaml
# azure-pipelines.yml
trigger:
  branches:
    include:
      - main
      - develop

pool:
  vmImage: ubuntu-latest

stages:
  - stage: Build
    jobs:
      - job: BuildApp
        steps:
          - script: echo "Building..."

  - stage: SecurityScan
    dependsOn: Build
    jobs:
      - job: CloudGuardScan
        steps:
          - task: Bash@3
            displayName: 'CloudGuard Security Gate'
            inputs:
              targetType: inline
              script: |
                RESULT=$(curl -s -X POST https://api.cloudguard.io/v1/scan \
                  -H "Authorization: Bearer $(CLOUDGUARD_API_KEY)" \
                  -H "Content-Type: application/json" \
                  -d '{"provider":"azure","scan_type":"quick"}')
                
                echo $RESULT > $(Build.ArtifactStagingDirectory)/cloudguard-report.json
                
                CRITICAL=$(echo $RESULT | python3 -c "import sys,json; print(json.load(sys.stdin)['data']['critical_count'])")
                if [ "$CRITICAL" -gt "0" ]; then
                  echo "##vso[task.logissue type=error]${CRITICAL} critical issues found"
                  exit 1
                fi
                echo "##vso[task.setvariable variable=SECURITY_GATE_PASSED]true"

          - task: PublishBuildArtifacts@1
            displayName: 'Publish Security Report'
            condition: always()
            inputs:
              PathtoPublish: '$(Build.ArtifactStagingDirectory)'
              ArtifactName: 'cloudguard-report'

  - stage: Deploy
    dependsOn: SecurityScan
    condition: succeeded()
    jobs:
      - deployment: DeployProd
        environment: production
        strategy:
          runOnce:
            deploy:
              steps:
                - script: echo "Deploying to production..."
```

---

## Slack Alerts

### Incoming Webhook Setup
1. Go to [api.slack.com/apps](https://api.slack.com/apps)
2. Create a new app → Incoming Webhooks → Enable
3. Add to channel `#security-alerts`
4. Copy the webhook URL → add as `SLACK_WEBHOOK` secret

### Alert Message Format
```bash
curl -X POST $SLACK_WEBHOOK \
  -H 'Content-type: application/json' \
  -d '{
    "blocks": [
      {
        "type": "header",
        "text": { "type": "plain_text", "text": "⚡ CloudGuard Alert" }
      },
      {
        "type": "section",
        "fields": [
          { "type": "mrkdwn", "text": "*Severity:*\n🔴 Critical" },
          { "type": "mrkdwn", "text": "*Resource:*\ns3:::prod-media-assets" },
          { "type": "mrkdwn", "text": "*Issue:*\nPublic Bucket Access" },
          { "type": "mrkdwn", "text": "*Detected:*\n2025-05-02 09:14 UTC" }
        ]
      },
      {
        "type": "actions",
        "elements": [
          {
            "type": "button",
            "text": { "type": "plain_text", "text": "View in CloudGuard" },
            "url": "https://cloudguard.company.io",
            "style": "danger"
          }
        ]
      }
    ]
  }'
```
