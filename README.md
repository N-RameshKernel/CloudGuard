<div align="center">

See the risk behind every cloud.

A security operations workspace for discovering cloud exposure, investigating findings, prioritizing vulnerabilities, and maintaining a unified security posture across AWS, Azure, and Google Cloud.






</div>

Overview

CloudGuard is a multi-cloud security command center designed to bring cloud exposure, security findings, vulnerability intelligence, compliance posture, provider inventory, and operational activity into one focused workspace.

The interface is built around a simple security workflow:

Connect → Discover → Analyze → Prioritize → Remediate → Verify

The current UI showcase includes a CloudGuard 2.0 workspace with:

Security overview and exposure metrics

Findings investigation and filtering

Multi-cloud inventory

Vulnerability intelligence feeds

Compliance posture tracking

Workspace activity/audit view

Provider connection workflows

Workspace and identity settings

Sample-mode security analytics

AI/security-operations oriented product surfaces

Note: The screenshots below represent the current CloudGuard 2.0 UI showcase. The repository baseline included with this project contains a documented zero-dependency HTML/CSS/JavaScript implementation and integration-ready API documentation. Backend/authentication/database capabilities shown in newer UI screenshots should be treated as the current product direction unless their implementation is present in your local branch.

Why CloudGuard?

Security problem

CloudGuard approach

Cloud security data is fragmented

Unified workspace for multiple cloud providers

Findings are difficult to prioritize

Exposure and severity-oriented views

Vulnerability feeds are disconnected from posture

Dedicated vulnerability intelligence workspace

Compliance is hard to visualize

Framework-level posture cards and coverage metrics

Provider onboarding is operationally heavy

Dedicated connection and connector workflows

Security teams need an audit trail

Workspace activity and operational events

Analysts need developer-friendly tooling

API/CLI and integration-ready workflows

Product Surface

1. Security Overview

The overview acts as the CloudGuard command center, surfacing exposure, open findings, critical exposure, connected-account coverage, risk trends, severity distribution, and cloud posture.

Key concepts:

Exposure Index

Open Findings

Critical Exposure

Connected Accounts

Exposure-over-time analytics

Findings by severity

Cloud posture

2. Findings

The findings workspace is designed for investigation and prioritization.

Capabilities represented in the UI:

Finding search

Severity filtering

Cloud/provider filtering

Status filtering

Resource context

Severity classification

Finding status

Last-seen timestamps

Finding detail navigation

Example finding categories include:

S3 bucket allows public reads
Inbound SSH open to the internet
Privileged workload identity binding
RDS storage is not encrypted
Audit log retention below policy
Managed database accepts public traffic

3. Cloud Inventory

CloudGuard provides a normalized view of connected and connectable cloud environments.

Supported provider surfaces shown in the UI include:

AWS

Microsoft Azure

Google Cloud

Oracle Cloud Infrastructure

Alibaba Cloud

IBM Cloud

DigitalOcean

Custom/other cloud sources

The inventory view separates native read-only provider connectors from normalized finding ingestion/webhook workflows.

4. Vulnerability Intelligence

The vulnerability intelligence workspace brings external security intelligence into the same operational environment.

The UI includes concepts such as:

NVD

CISA KEV

Feed records

Known exploited vulnerabilities

CVSS severity

Product context

Exploit status

Published date

External references

5. Compliance Posture

CloudGuard visualizes policy alignment across security frameworks.

Current UI examples include:

Framework

Sample mapped posture

CIS Cloud Foundations

88%

SOC 2 · Security

83%

PCI DSS 4.0

91%

HIPAA Security Rule

85%

NIST CSF 2.0

80%

These values are sample-mode UI values shown in the screenshots, not an independent audit or certification claim.

6. Activity Log

The activity workspace provides a dedicated place for workspace-scoped operational events, including the conceptual history of cloud connections, synchronization, and finding updates.

7. Workspace Settings

The settings surface covers identity, security, persistence, credentials, organization isolation, and workspace controls.

The current UI showcase includes:

Google OpenID Connect

Microsoft identity platform

MongoDB Atlas status

Encrypted cloud credentials

Organization isolation

Workspace identity

Sign-out controls

Deployment/provider checklist

Security Analytics

CloudGuard is designed around security analytics rather than simply presenting raw infrastructure data.

Sample-mode findings distribution

The supplied UI screenshot shows six active findings distributed evenly across three severity levels:

pie showData
    title Sample Findings by Severity
    "Critical" : 2
    "High" : 2
    "Medium" : 2
    "Low" : 0

Sample compliance posture

xychart-beta
    title "Sample Compliance Posture"
    x-axis [CIS, SOC2, PCI-DSS, HIPAA, NIST]
    y-axis "Mapped %" 0 --> 100
    bar [88, 83, 91, 85, 80]

Security signal model

A practical CloudGuard-style exposure model can be represented as:

Exposure
   │
   ├── Severity
   ├── Exploitability
   ├── Asset Reachability
   ├── Provider Context
   ├── Compliance Impact
   └── Recency
          │
          ▼
    Risk Prioritization
          │
          ├── Critical
          ├── High
          ├── Medium
          └── Low

This is a conceptual product model, not a claim that the current static frontend executes this exact formula.

Architecture

Current documented frontend architecture

The repository baseline intentionally uses a single-file, zero-dependency frontend. HTML structure, CSS, JavaScript state, interactions, and Canvas-based analytics live in index.html.

flowchart LR
    U[Security Analyst] --> UI[CloudGuard Web UI]
    UI --> NAV[Screen Navigation]
    UI --> STATE[Client-side State]
    UI --> VIEWS[Security Views]

    VIEWS --> O[Overview]
    VIEWS --> F[Findings]
    VIEWS --> C[Cloud Inventory]
    VIEWS --> V[Vulnerability Intelligence]
    VIEWS --> CP[Compliance]
    VIEWS --> A[Activity]
    VIEWS --> S[Settings]

    STATE --> FILTERS[Filters & Controls]
    STATE --> TOAST[Notifications]
    STATE --> COPILOT[AI Copilot UI]

    UI --> CHARTS[Canvas Analytics]

Security operations flow

flowchart TD
    CONNECT[Connect Cloud Sources] --> DISCOVER[Discover Assets & Findings]
    DISCOVER --> NORMALIZE[Normalize Security Signals]
    NORMALIZE --> ANALYZE[Analyze Exposure]
    ANALYZE --> PRIORITIZE[Prioritize Risk]
    PRIORITIZE --> REMEDIATE[Remediation Workflow]
    REMEDIATE --> VERIFY[Verify & Track]
    VERIFY --> AUDIT[Activity / Audit Trail]

Project Structure

CloudGuard/
├── index.html                 # Main zero-dependency application
├── README.md                  # Project documentation
├── package.json               # Local development / validation scripts
├── Dockerfile                 # Container deployment
├── docker-compose.yml         # Container orchestration
├── nginx.conf                 # Nginx configuration
├── LICENSE
├── SECURITY.md
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── CHANGELOG.md
│
├── docs/
│   ├── ARCHITECTURE.md        # Architecture and design decisions
│   ├── API.md                 # Backend/API integration guide
│   ├── DEPLOYMENT.md          # Deployment options
│   └── INTEGRATIONS.md        # DevSecOps integration examples
│
└── assets/
    └── screenshots/           # Product screenshots

Tech Stack

Frontend

Technology

Role

HTML5

Application structure

CSS3

Design system, responsive layout, animations

Vanilla JavaScript

UI state and interactions

CSS Custom Properties

Theme/design tokens

HTML5 Canvas

Analytics visualizations

Google Fonts

Typography in the documented baseline

Tooling

Tool

Purpose

Node.js

Local development tooling

serve

Local static server

live-server

Development reload workflow

html-validate

HTML validation

Docker + Nginx

Container deployment

The current repository baseline deliberately avoids React, webpack, Chart.js, D3, or Recharts.

Installation

Prerequisites

Modern browser

Node.js 18+ for the repository's optional development tooling

Git

Clone

git clone <YOUR_REPOSITORY_URL>
cd CloudGuard

Install development tooling

npm install

Start locally

npm start

Then open the local server URL shown by the command.

Alternative static server

python3 -m http.server 8080

Or on Windows:

py -m http.server 8080

NPM Scripts

Command

Purpose

npm start

Start local static server on port 3000

npm run dev

Start live-server development mode

npm run preview

Serve on port 8080

npm run validate

Validate index.html

npm run lint:html

Run HTML validation

npm run size

Report index.html size

npm run lines

Count source lines

npm run deploy:vercel

Deploy using Vercel CLI

npm run deploy:netlify

Deploy using Netlify CLI

npm run docker:build

Build CloudGuard container

npm run docker:run

Run CloudGuard container

npm run docker:stop

Stop/remove CloudGuard container

API Integration Example

The repository includes an API integration guide for replacing mock findings with a real backend.

A simplified integration pattern looks like this:

let findings = [];

async function loadFindings(apiUrl, apiKey) {
  const response = await fetch(`${apiUrl}/v1/findings`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    }
  });

  if (!response.ok) {
    throw new Error(`CloudGuard API error: ${response.status}`);
  }

  const payload = await response.json();
  findings = payload.data ?? [];

  renderFindings(findings);
}

Example finding object

{
  "id": "CRIT-001",
  "severity": "critical",
  "cvss_score": 9.8,
  "provider": "aws",
  "service": "s3",
  "resource_name": "prod-media-assets",
  "status": "open",
  "remediation_summary": "Block public access settings on the bucket"
}

Never hard-code real credentials in frontend source. The repository security guide recommends environment-managed secrets, HTTPS, CSP, and authenticated backend APIs for real deployments.

DevSecOps Example

CloudGuard's documentation includes CI/CD integration patterns. A minimal security gate can follow this model:

name: CloudGuard Security Gate

on:
  pull_request:
  push:
    branches: [main]

jobs:
  security-scan:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Run CloudGuard scan
        run: |
          curl -s -X POST "$CLOUDGUARD_API_URL/v1/scan" \
            -H "Authorization: Bearer $CLOUDGUARD_API_KEY" \
            -H "Content-Type: application/json" \
            -d '{"provider":"aws","scan_type":"quick","fail_on_severity":"critical"}' \
            > scan-result.json

Use GitHub repository secrets or an equivalent secret manager for credentials.

Docker

The repository contains a lightweight Nginx-based container setup.

npm run docker:build
npm run docker:run

For a manual build:

docker build -t cloudguard:latest .
docker run -d -p 8080:80 --name cloudguard cloudguard:latest

Stop it with:

npm run docker:stop

Screenshots

Landing / Authentication



Security Overview



Findings



Cloud Inventory



Provider Connection



Vulnerability Intelligence



Compliance Posture



Activity Log



Workspace Settings



UI Design Language

CloudGuard uses a security-focused visual system built around:

Deep black / navy backgrounds

High-contrast typography

Blue as the primary interaction accent

Green for operational/success states

Amber for warnings

Red for critical exposure

Compact monospace metadata

Subtle borders and layered cards

Dense but readable security tables

Large analytical surfaces

Minimal motion with clear interaction feedback

The design goal is not simply to display data. It is to help an analyst answer:

What is exposed? Why does it matter? What should I investigate next?

Security Principles

CloudGuard's documented security direction includes:

No secrets committed to frontend source

HTTPS for real API communication

Environment-managed credentials

CSP headers for deployed applications

Authentication before exposing real security data

Least-privilege cloud access

Read-only cloud roles where possible

Separation of sample/demo data from production data

Responsible vulnerability disclosure

See SECURITY.md for the repository security policy.

Roadmap

The documented roadmap includes:

WebSocket-based real-time threat feed

Native AWS Security Hub connector

Analytics time-range picker

React + TypeScript migration

Production backend integration

Expanded cloud-provider connectors

Richer remediation workflows

More granular compliance evidence mapping

Roadmap items may change as CloudGuard evolves.

Contributing

Contributions are welcome.

Fork the repository.

Create a feature branch.

Make your change.

Validate the HTML.

Test responsive behavior.

Update documentation where necessary.

Open a pull request with a clear description.

git checkout -b feature/security-improvement
npm run validate
git add .
git commit -m "feat: improve security workspace"
git push origin feature/security-improvement

See CONTRIBUTING.md for repository contribution guidance.

License

CloudGuard is released under the MIT License.

See LICENSE for the complete license text.

<div align="center">

CloudGuard

Cloud security visibility. Vulnerability intelligence. Operational clarity.

Built for security teams that need to see the risk behind every cloud.

</div>
