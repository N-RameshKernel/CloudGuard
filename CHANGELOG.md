# Changelog

All notable changes to **CloudGuard** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Planned
- WebSocket real-time threat feed
- AWS Security Hub native connector
- Time-range picker for analytics
- React + TypeScript migration

---

## [1.0.0] — 2025-05-02

### Added
- 🎉 Initial release of CloudGuard
- **Dashboard** — Command center with risk score, heatmap, threat ticker, compliance bars
- **Scan & Audit** — Pipeline-style scan runner with live log streaming
- **Vulnerability Explorer** — Filterable data grid with 16 mock findings (7 critical)
- **Issue Detail Panel** — Slide-over drawer with Overview / Fix / History tabs
- **Reports & Analytics** — Canvas-drawn trend, donut, and bar charts
- **DevSecOps Integrations** — GitHub Actions, Jenkins, K8s, Slack, Azure DevOps, GitLab CI
- **CLI & API Playground** — Interactive terminal emulator + REST API tester
- **Settings & IAM** — Team roles, API key management, cloud account linking
- **AI Copilot** — Context-aware security assistant with 5 response modes
- **Dark / Light Mode** — Full CSS variable-driven theme toggle
- **Animated Counters** — Number count-up animation on load
- **Sparkline Charts** — Mini bar charts on each stat card
- **Card Glow Effect** — Radial cursor-following highlight on cards
- **Notification Dropdown** — Bell icon with 4 alert types
- **Toast Notifications** — Slide-in alerts (success / error / info / warning)
- **Keyboard Shortcuts** — Cmd/Ctrl+K for search, Esc to close panels
- **Collapsible Sidebar** — Icon-only collapsed state
- **Misconfiguration Heatmap** — 84-cell GitHub-style activity grid
- **Zero dependencies** — Pure HTML/CSS/JS, no npm, no build step

### Security
- No external API calls except Google Fonts
- No localStorage or sessionStorage usage
- No tracking or analytics

---

## [0.9.0] — 2025-04-28 (Beta)

### Added
- Core layout: sidebar, top nav, main content area
- Basic dashboard with stat cards
- Vulnerability table prototype
- Initial dark theme

### Fixed
- Sidebar collapse transition jank on Safari
- Chart canvas DPI scaling on Retina displays

---

[Unreleased]: https://github.com/nramesh/cloudguard/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/nramesh/cloudguard/releases/tag/v1.0.0
[0.9.0]: https://github.com/nramesh/cloudguard/releases/tag/v0.9.0
