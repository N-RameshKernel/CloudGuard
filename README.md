# ⚡ CloudGuard — Multi-Cloud Security Dashboard

<div align="center">

![CloudGuard Banner](https://img.shields.io/badge/CloudGuard-v1.0.0-3B82F6?style=for-the-badge&logo=shield&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-22C55E?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-Pure%20Vanilla-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-Glassmorphism-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Status](https://img.shields.io/badge/Status-Production%20Ready-22C55E?style=for-the-badge)

**Enterprise-grade multi-cloud security dashboard — zero dependencies, pure HTML/CSS/JS.**

[🚀 Live Demo](#live-demo) · [📸 Screenshots](#screenshots) · [🛠️ Installation](#installation) · [🗺️ Roadmap](#roadmap) · [🤝 Contributing](#contributing)

---

</div>

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Screenshots](#screenshots)
- [Live Demo](#live-demo)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Screens & Modules](#screens--modules)
- [Tech Stack](#tech-stack)
- [Configuration](#configuration)
- [API Reference](#api-reference)
- [DevSecOps Integration](#devsecops-integration)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [Authors](#authors)
- [License](#license)

---

## 🔍 Overview

**CloudGuard** is a production-quality, enterprise-grade **multi-cloud security dashboard** built entirely with vanilla HTML, CSS, and JavaScript — no frameworks, no build tools, no dependencies. It provides real-time visibility into vulnerabilities across AWS, GCP, and Azure, with actionable remediation workflows, DevSecOps pipeline integration, and an AI-powered security copilot.

> Designed for **security engineers**, **DevSecOps teams**, and **cloud architects** who need a fast, portable, and fully self-contained security command center.

### Why CloudGuard?

| Problem | CloudGuard Solution |
|---|---|
| Security tools are siloed per cloud | Unified multi-cloud view (AWS + GCP + Azure) |
| Dashboards are slow & heavy | Zero-dependency single HTML file — loads instantly |
| Findings lack context | AI Copilot explains vulnerabilities in plain English |
| Remediation is manual | One-click Auto-Remediate + CLI/Terraform snippets |
| No developer workflow | CI/CD pipeline integration + REST API playground |

---

## ✨ Features

### 🛡️ Core Security Features
- **Real-time Threat Feed** — live ticker with severity-coded alerts (Critical → Low)
- **Risk Score Engine** — circular gauge with weighted multi-cloud scoring (0–100)
- **Misconfiguration Heatmap** — 84-day GitHub-style activity heatmap
- **Compliance Tracker** — CIS, SOC 2, PCI DSS, HIPAA, NIST CSF progress bars
- **Vulnerability Explorer** — filterable, sortable data grid with 16+ mock findings
- **Issue Detail Panel** — slide-over drawer with Overview / Fix / History tabs

### ⚡ Remediation Workflows
- **Auto-Remediate** — one-click fix with confirmation toast notifications
- **CLI Snippets** — AWS CLI commands ready to copy
- **Terraform Snippets** — IaC-ready fix templates with copy button
- **Bulk Actions** — multi-select findings for batch operations

### 🔬 Scan & Audit
- **Configurable Scan Engine** — select provider, services, and scan depth
- **YAML Config Preview** — live config editor with DevOps aesthetics
- **Pipeline Progress** — CI/CD-style step-by-step scan visualization
- **Live Log Streaming** — real-time log output with color-coded levels

### 📊 Analytics & Reports
- **Risk Trend Chart** — 30-day canvas line chart with gradient fill
- **Distribution Donut** — severity breakdown with percentage labels
- **Cloud-wise Bar Chart** — stacked bar chart per provider
- **AI-Generated Summary** — human-readable executive security brief
- **Export Options** — PDF, JSON, CSV (UI hooks ready)

### 🔗 DevSecOps Integrations
- **GitHub Actions** — connected status with workflow count
- **Jenkins** — one-click OAuth connect
- **Kubernetes** — error state with reconnect flow
- **Slack** — alert channel integration
- **Azure DevOps** — YAML pipeline task support
- **GitLab CI** — native `.gitlab-ci.yml` support
- **Pipeline Visualization** — live stage flow diagram

### 💻 CLI & API Playground
- **Terminal Emulator** — interactive terminal with command history
- **REST API Tester** — method selector, URL input, live JSON response
- **Pre-built Commands** — copy-ready CLI templates
- **Syntax Highlighting** — color-coded terminal output

### ⚙️ Settings & IAM
- **Team Management** — role-based user list (Admin / Viewer / CI Bot)
- **API Key Management** — generate, view, copy keys
- **Cloud Account Linking** — AWS / GCP / Azure account status
- **Notification Preferences** — Slack, Email, PagerDuty toggles

### 🎨 UX & Design
- **Dark / Light Mode** — full theme toggle with smooth transition
- **Animated Counters** — numbers count up on load
- **Sparkline Charts** — mini bar charts on every stat card
- **Card Glow Effect** — radial highlight follows cursor
- **Toast Notifications** — top-right slide-in alerts
- **Keyboard Shortcuts** — `Cmd/Ctrl+K` search, `Esc` close panels
- **Loading Animations** — fade-up card entrance animations
- **Collapsible Sidebar** — icon-only collapsed state
- **Notification Dropdown** — bell icon with alert feed

---

## 📸 Screenshots

> *Open `index.html` in your browser to explore all screens interactively.*

| Screen | Description |
|---|---|
| **Dashboard** | Command center with risk score, threat feed, heatmap, compliance |
| **Scan & Audit** | Pipeline-style scan runner with live log streaming |
| **Vulnerability Explorer** | Filterable grid with severity badges and side panel |
| **Reports & Analytics** | Trend charts, donut chart, cloud bar chart, AI summary |
| **Integrations** | CI/CD connector cards with pipeline flow diagram |
| **CLI / API** | Terminal emulator + REST API tester |
| **Settings & IAM** | Team roles, API keys, cloud account linking |

---

## 🚀 Live Demo

### Option 1 — Open Directly
```bash
# Clone and open — that's it!
git clone https://github.com/nramesh/cloudguard.git
cd cloudguard
open index.html          # macOS
xdg-open index.html      # Linux
start index.html          # Windows
```

### Option 2 — Local Server
```bash
# Python
python3 -m http.server 8080
# then visit http://localhost:8080

# Node.js
npx serve .
# then visit http://localhost:3000
```

### Option 3 — GitHub Pages
Fork this repo → Settings → Pages → Deploy from `main` branch → `/root`

---

## 🛠️ Installation

### Prerequisites
- Any modern web browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- No Node.js, no npm, no build step required

### Quick Start
```bash
# 1. Clone the repository
git clone https://github.com/nramesh/cloudguard.git

# 2. Navigate into the folder
cd cloudguard

# 3. Open in browser
open index.html
```

### Deploy to Vercel
```bash
npm i -g vercel
vercel --prod
```

### Deploy to Netlify
```bash
# Drag and drop index.html into https://app.netlify.com/drop
# Or use CLI:
npm i -g netlify-cli
netlify deploy --prod --dir .
```

### Deploy with Docker
```dockerfile
FROM nginx:alpine
COPY index.html /usr/share/nginx/html/index.html
EXPOSE 80
```
```bash
docker build -t cloudguard .
docker run -p 8080:80 cloudguard
```

---

## 📁 Project Structure

```
cloudguard/
│
├── index.html                  # 🏠 Main application (all-in-one)
│
├── README.md                   # 📖 This file
├── LICENSE                     # ⚖️  MIT License
├── CHANGELOG.md                # 📋 Version history
├── CONTRIBUTING.md             # 🤝 Contribution guidelines
├── SECURITY.md                 # 🔒 Security policy
│
├── .github/
│   ├── workflows/
│   │   ├── ci.yml              # ✅ CI — lint & validate HTML
│   │   └── deploy.yml          # 🚀 CD — auto-deploy to GitHub Pages
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md       # 🐛 Bug report template
│   │   └── feature_request.md  # 💡 Feature request template
│   └── pull_request_template.md
│
├── docs/
│   ├── ARCHITECTURE.md         # 🏗️  Architecture decisions
│   ├── API.md                  # 🔌 API integration guide
│   ├── DEPLOYMENT.md           # 🚢 Deployment options
│   └── INTEGRATIONS.md         # 🔗 CI/CD integration guide
│
└── assets/
    ├── screenshots/            # 📸 UI screenshots
    └── cloudguard-logo.svg     # 🖼️  Logo asset
```

---

## 🖥️ Screens & Modules

### 1️⃣ Dashboard — Command Center
The primary view gives an at-a-glance overview of your entire cloud security posture.

**Components:**
- **Stat Cards** — Critical issues, total vulnerabilities, resources scanned, pass rate (with animated counters + sparklines)
- **Risk Score Gauge** — Circular SVG indicator (0–100) with color thresholds
- **Multi-Cloud Overview** — AWS / GCP / Azure with per-provider finding counts
- **Compliance Status** — CIS / SOC 2 / PCI DSS / HIPAA / NIST CSF progress bars
- **Active Threat Ticker** — Live feed of recent security events
- **Misconfiguration Heatmap** — 84-day calendar heatmap (GitHub activity style)
- **Quick Actions Bar** — Run Scan, Auto-Fix Critical, Export Report, Live Feed

### 2️⃣ Scan & Audit
Configure and launch security scans with a CI/CD-style pipeline UI.

**Features:**
- Cloud provider selection (AWS / GCP / Azure / All)
- Service selection (S3, IAM, VPC, EC2, RDS, Lambda, EKS, CloudTrail)
- Scan type toggles (Deep Scan, Historical, Auto-Remediate Low)
- YAML config preview with copy button
- Pipeline step progress (Auth → Discovery → Analysis → Matching → Report)
- Real-time log streaming with color-coded levels

### 3️⃣ Vulnerability Explorer
Advanced data grid with filtering, sorting, and drill-down capabilities.

**Columns:** Resource · Issue Type · Severity · Risk Score · Status · Suggested Fix

**Filters:** All / Critical / High / Medium / Low · Cloud Provider · Service Type

**Actions:** View detail panel · Inline fix button · Checkbox bulk selection

### 4️⃣ Issue Detail Panel (Slide-over)
A slide-in panel (not a new page) with full remediation context.

**Tabs:**
- **Overview** — Description, Impact, Affected Resources
- **Fix** — Step-by-step guide, AWS CLI snippet, Terraform snippet, Auto-Remediate CTA
- **History** — Audit trail with timestamps

### 5️⃣ Reports & Analytics
Executive-level security reporting with exportable visualizations.

**Charts:** Risk trend (30-day line), Severity distribution (donut), Cloud-wise findings (stacked bar)

**AI Summary** — Human-readable security brief with actionable recommendations

### 6️⃣ DevSecOps Integrations
One-click connector management for your CI/CD ecosystem.

**Supported:** GitHub Actions · Jenkins · Kubernetes · Slack · Azure DevOps · GitLab CI

**Pipeline Visualization** — Live workflow stage diagram

### 7️⃣ CLI & API Playground
Developer-first interface for automation and scripting.

**Terminal** — Interactive shell with real command responses

**API Tester** — REST client with method selector, headers editor, live JSON response

### 8️⃣ Settings & IAM
Role-based access control and platform configuration.

**Sections:** Team Members · API Keys · Cloud Account Linking · Notification Preferences

---

## 🧰 Tech Stack

| Layer | Technology | Reason |
|---|---|---|
| **Markup** | HTML5 (semantic) | Structure & accessibility |
| **Styling** | CSS3 (custom properties, grid, flexbox) | Zero-dependency theming |
| **Logic** | Vanilla JavaScript (ES2020) | No framework overhead |
| **Charts** | HTML5 Canvas API | Native, fast, no library |
| **Typography** | Google Fonts (Space Grotesk, Syne, JetBrains Mono) | Professional, distinctive |
| **Icons** | Inline SVG | Crisp at all sizes, no sprite |
| **Animations** | CSS keyframes + JS | Smooth 60fps transitions |

**Bundle size:** ~1 file · ~2,500 lines · **0 dependencies** · **0 npm packages**

---

## ⚙️ Configuration

All configuration is inline in `index.html`. Key variables:

### CSS Custom Properties (`:root`)
```css
--bg:        #080C14;   /* Base background */
--blue:      #3B82F6;   /* Primary accent */
--green:     #22C55E;   /* Safe / success */
--amber:     #F59E0B;   /* Warning */
--red:       #EF4444;   /* Critical / danger */
--sidebar-w: 220px;     /* Sidebar expanded width */
--nav-h:     56px;      /* Top nav height */
```

### Mock Data (JavaScript)
Replace the `vulns` array in the `<script>` block with your real API data:
```javascript
const vulns = [
  {
    id:       'CRIT-001',
    resource: 's3:::prod-media-assets',
    type:     'Public Bucket',
    sev:      'critical',          // critical | high | medium | low
    score:    9.8,                 // CVSS score
    status:   'Open',              // Open | In Progress | Assigned | Ignored
    fix:      'Block public access'
  },
  // ... more findings
];
```

### Connecting Real APIs
Replace `sendApiRequest()` in the script with your actual backend:
```javascript
async function sendApiRequest() {
  const url = document.querySelector('.api-url').value;
  const response = await fetch(url, {
    headers: { 'Authorization': 'Bearer YOUR_TOKEN' }
  });
  const data = await response.json();
  document.getElementById('api-response').textContent = JSON.stringify(data, null, 2);
}
```

---

## 🔌 API Reference

CloudGuard is designed to connect to any security API. Expected response format:

### `GET /v1/findings`
```json
{
  "status": 200,
  "total": 147,
  "data": [
    {
      "id":        "CRIT-001",
      "severity":  "critical",
      "score":     9.8,
      "provider":  "aws",
      "service":   "s3",
      "resource":  "arn:aws:s3:::prod-media-assets",
      "type":      "Public Bucket",
      "status":    "open",
      "fix":       "Block public access settings",
      "detected":  "2025-05-02T09:14:00Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "provider": "aws",
    "response_ms": 48
  }
}
```

### `POST /v1/remediate`
```json
{
  "finding_id": "CRIT-001",
  "action": "auto_fix",
  "approved_by": "ramesh@company.io"
}
```

### Compatible Backends
- [AWS Security Hub](https://aws.amazon.com/security-hub/)
- [Google Security Command Center](https://cloud.google.com/security-command-center)
- [Microsoft Defender for Cloud](https://azure.microsoft.com/en-us/products/defender-for-cloud)
- [Prisma Cloud](https://www.paloaltonetworks.com/prisma/cloud)
- [Wiz](https://www.wiz.io/)
- [Orca Security](https://orca.security/)

---

## 🔗 DevSecOps Integration

### GitHub Actions
Add CloudGuard scan to your CI pipeline:

```yaml
# .github/workflows/security.yml
name: CloudGuard Security Scan

on: [push, pull_request]

jobs:
  security-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: CloudGuard Scan
        uses: cloudguard/scan-action@v1
        with:
          provider: aws
          services: s3,iam,ec2
          severity-threshold: high
          api-key: ${{ secrets.CLOUDGUARD_API_KEY }}

      - name: Upload Report
        uses: actions/upload-artifact@v4
        with:
          name: cloudguard-report
          path: cloudguard-report.json
```

### Jenkins
```groovy
// Jenkinsfile
pipeline {
    agent any
    stages {
        stage('CloudGuard Security Gate') {
            steps {
                sh 'cloudguard scan --provider aws --fail-on critical'
            }
        }
    }
}
```

### Kubernetes (Helm)
```yaml
# values.yaml
cloudguard:
  enabled: true
  scanOnDeploy: true
  failOnSeverity: critical
  apiKey: "${CLOUDGUARD_API_KEY}"
```

---

## 🗺️ Roadmap

### v1.1 — Real Backend Integration
- [ ] REST API client with bearer token auth
- [ ] WebSocket live threat feed
- [ ] AWS Security Hub native connector
- [ ] Google SCC connector

### v1.2 — Enhanced Analytics
- [ ] Time-range picker (7d / 30d / 90d / custom)
- [ ] Trend comparison (current vs previous period)
- [ ] SLA breach alerts
- [ ] Executive PDF report generation

### v1.3 — Collaboration
- [ ] Comment threads on findings
- [ ] Assignment workflow (assign to team member)
- [ ] Slack notification templates
- [ ] JIRA ticket auto-creation

### v2.0 — Framework Migration
- [ ] React + TypeScript rewrite
- [ ] Recharts / Nivo for charts
- [ ] Zustand state management
- [ ] React Query for API caching
- [ ] Storybook component library

### Backlog
- [ ] Mobile-first responsive redesign
- [ ] SAML / SSO authentication
- [ ] Custom rule builder (YAML)
- [ ] Audit log export
- [ ] Multi-tenant support
- [ ] Dark pattern risk score explanation modal

---

## 🤝 Contributing

Contributions are warmly welcome! Here's how to get started:

### 1. Fork & Clone
```bash
git clone https://github.com/YOUR_USERNAME/cloudguard.git
cd cloudguard
```

### 2. Create a Branch
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

### 3. Make Changes
- Edit `index.html` for UI/UX changes
- Follow the existing code style (2-space indent, CSS variables, semantic HTML)
- Test in Chrome, Firefox, and Safari

### 4. Commit & Push
```bash
git add .
git commit -m "feat: add your feature description"
git push origin feature/your-feature-name
```

### 5. Open a Pull Request
- Fill in the PR template
- Include screenshots for UI changes
- Reference any related issues

### Contribution Guidelines
- **Bug fixes** — Always welcome, please include reproduction steps
- **New features** — Open an issue first to discuss
- **Design changes** — Include before/after screenshots
- **Docs** — Typos, clarity improvements always appreciated

### Code Style
```
✅ Use CSS custom properties (var(--blue)) not hardcoded colors
✅ Keep JS functions small and named clearly
✅ Add a comment header for each logical section (─── SECTION NAME ───)
✅ Prefer const/let over var
✅ No external libraries without discussion
```

---

## 🐛 Reporting Issues

Found a bug? [Open an issue](https://github.com/nramesh/cloudguard/issues/new?template=bug_report.md) with:

1. Browser + version
2. Steps to reproduce
3. Expected vs actual behavior
4. Screenshot if applicable

---

## 🔒 Security Policy

If you discover a security vulnerability in CloudGuard itself, please **do not** open a public issue. Email **security@cloudguard.io** with:

- Description of the vulnerability
- Steps to reproduce
- Potential impact

We will respond within 48 hours and provide a fix within 14 days for confirmed issues. See [SECURITY.md](SECURITY.md) for full details.

---

## 👤 Authors

### N. Ramesh
**Lead Developer & Architect**

- 🔗 GitHub: [@nramesh](https://github.com/nramesh)
- 💼 LinkedIn: [linkedin.com/in/nramesh](https://linkedin.com/in/nramesh)
- 📧 Email: ramesh@company.io
- 🌐 Role: Admin · Cloud Security Engineer

---

## 🙏 Acknowledgements

- Inspired by [Datadog](https://datadoghq.com), [Grafana](https://grafana.com), and [AWS Security Hub](https://aws.amazon.com/security-hub/) UI patterns
- Typography: [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk), [Syne](https://fonts.google.com/specimen/Syne), [JetBrains Mono](https://www.jetbrains.com/lp/mono/)
- Color system inspired by Tailwind CSS semantic colors
- Glassmorphism design trend applied with restraint for readability

---

## 📄 License

```
MIT License — Copyright (c) 2025 N. Ramesh

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

See [LICENSE](LICENSE) for the full text.

---

<div align="center">

Made with ⚡ by **N. Ramesh**

⭐ Star this repo if CloudGuard helped you!

[![GitHub Stars](https://img.shields.io/github/stars/nramesh/cloudguard?style=social)](https://github.com/nramesh/cloudguard)
[![GitHub Forks](https://img.shields.io/github/forks/nramesh/cloudguard?style=social)](https://github.com/nramesh/cloudguard/fork)

</div>
