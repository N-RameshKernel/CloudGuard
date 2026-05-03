# Architecture — CloudGuard

## Overview

CloudGuard is a **single-file, zero-dependency** web application. All HTML structure, CSS styling, and JavaScript logic live in `index.html`. This is an intentional architectural decision to maximize portability and minimize deployment friction.

---

## Design Philosophy

### 1. Zero Dependencies
No npm, no webpack, no React, no libraries. The entire application is one HTML file that opens in any browser. This means:
- **Instant deployment** — copy one file anywhere
- **No supply chain risk** — no third-party packages to audit
- **No build step** — edit and refresh
- **Maximum portability** — works offline, on intranets, in air-gapped environments

### 2. CSS Custom Properties as Design Tokens
All colors, spacing, and sizing are defined as CSS variables in `:root`. This enables:
- Full dark/light mode switching with a single `body.light` class toggle
- Consistent theming across all 8 screens
- Easy customization without touching individual components

```css
:root {
  --bg:     #080C14;   /* Layer 0 — deepest background */
  --bg2:    #0D1220;   /* Layer 1 — cards, sidebar, nav */
  --bg3:    #111827;   /* Layer 2 — inputs, nested elements */
  --bg4:    #1a2235;   /* Layer 3 — hover states, highlights */
  --blue:   #3B82F6;   /* Primary action color */
  --green:  #22C55E;   /* Safe / success / low severity */
  --amber:  #F59E0B;   /* Warning / high severity */
  --red:    #EF4444;   /* Critical / danger / error */
}
```

### 3. Screen-based Navigation
CloudGuard uses a **single-page application pattern** without a router. All screens are rendered in the DOM simultaneously; navigation shows/hides them via `.active` class toggling.

```
.content (display: none by default)
  └── .content.active (display: block — current screen)
```

This gives instant screen transitions with no loading states.

### 4. Canvas-based Charts
All charts (trend line, donut, bar chart) are drawn using the **HTML5 Canvas API**. This avoids the need for Chart.js, D3, or Recharts, keeping the bundle at zero dependencies while still producing smooth, high-quality visualizations.

Charts are redrawn on:
- Screen navigation to `reports`
- Window resize events
- Theme toggle (light/dark affects chart colors)

---

## File Structure (Internal)

Within `index.html`, sections are organized in this order:

```
<head>
  Google Fonts import
  <style>
    ── CSS Custom Properties (:root + body.light)
    ── Light Mode Overrides
    ── Page Load Animations
    ── Layout (app, sidebar, main)
    ── Top Navigation
    ── Content Areas
    ── Stat Cards
    ── Risk Score Ring
    ── Severity Badges
    ── Threat Ticker
    ── Heatmap
    ── Compliance Bars
    ── Cloud Provider Cards
    ── Vulnerability Table
    ── Filter Bar
    ── Side Panel (slide-over)
    ── Scan Screen
    ── Pipeline Steps
    ── Log Stream
    ── Reports / Charts
    ── Integration Cards
    ── Pipeline Flow
    ── CLI Terminal
    ── API Tester
    ── Settings
    ── Toast Notifications
    ── Skeleton Loaders
    ── AI Copilot
    ── Scrollbar
    ── Sparklines
    ── Responsive Breakpoints
  </style>
</head>

<body>
  .app
    aside.sidebar
      .sidebar-logo
      nav-section × 3 (Overview, Insights, Developer)
      .sidebar-footer
    .main
      nav.topnav
        .search-box
        .cloud-selector
        .nav-actions
      #notif-dropdown

      <!-- 8 SCREENS -->
      #screen-dashboard
      #screen-scan
      #screen-vulns
      #screen-reports
      #screen-integrations
      #screen-cli
      #screen-settings

  <!-- OVERLAYS -->
  .panel-overlay
  .side-panel
    .panel-header
    .panel-tabs
    .panel-body
      #tab-overview
      #tab-fix
      #tab-history

  <!-- FLOATING UI -->
  .copilot-btn
  .copilot-panel
  .toast-container

  <script>
    ── Theme Toggle
    ── Notifications
    ── Sparklines
    ── Counter Animation
    ── Card Glow Effect
    ── Live Feed Simulation
    ── Bulk Remediate
    ── Screen Navigation
    ── Sidebar Toggle
    ── Heatmap
    ── Vulnerability Table + Filter
    ── Side Panel
    ── Scan Simulation
    ── Log Stream
    ── Chart: Trend Line
    ── Chart: Distribution Donut
    ── Chart: Cloud Bar
    ── CLI Terminal
    ── API Tester
    ── Copy to Clipboard
    ── Toast System
    ── AI Copilot
    ── Keyboard Shortcuts
    ── Cloud Selector
    ── Config Chips
    ── Resize Handler
    ── Init
  </script>
</body>
```

---

## Data Flow

```
User Action
    │
    ▼
Event Handler (onclick, onkeydown, etc.)
    │
    ├── DOM Mutation (show/hide, add class)
    │       └── CSS Transition / Animation
    │
    ├── State Update (JS variable)
    │       └── Re-render (innerHTML replacement)
    │
    └── Toast Notification (showToast())
```

All state is held in JavaScript variables (no localStorage, no cookies):
- `activeSevFilter` — current vulnerability severity filter
- `scanRunning` — scan in progress flag
- `sidebarCollapsed` — sidebar state
- `lightMode` — current theme
- `notifOpen` — notification dropdown state
- `liveIdx` — live event feed index
- `logTime` — scan log timestamp counter

---

## Rendering Performance

| Technique | Where Used | Benefit |
|---|---|---|
| CSS `transform` for transitions | Side panel, copilot | GPU-accelerated, no layout reflow |
| `requestAnimationFrame` | Sparkline build | Smooth 60fps bar animation |
| Canvas 2D API | Charts | Native GPU rendering |
| `will-change: transform` (implicit via transitions) | Modals | Composite layer promotion |
| Class toggling vs style mutation | All show/hide | Avoids forced reflow |
| `setInterval` for counters | Stat cards | Smooth number count-up |

---

## Future Architecture (v2.0)

When migrating to a framework:

```
cloudguard/
├── src/
│   ├── components/
│   │   ├── Dashboard/
│   │   │   ├── StatCard.tsx
│   │   │   ├── RiskGauge.tsx
│   │   │   ├── ThreatTicker.tsx
│   │   │   ├── Heatmap.tsx
│   │   │   └── ComplianceBars.tsx
│   │   ├── Vulnerabilities/
│   │   │   ├── VulnTable.tsx
│   │   │   ├── VulnFilters.tsx
│   │   │   └── IssuePanel.tsx
│   │   ├── Reports/
│   │   │   ├── TrendChart.tsx
│   │   │   ├── DonutChart.tsx
│   │   │   └── CloudBarChart.tsx
│   │   ├── Scan/
│   │   ├── Integrations/
│   │   ├── CLI/
│   │   └── Settings/
│   ├── hooks/
│   │   ├── useTheme.ts
│   │   ├── useVulnerabilities.ts
│   │   └── useScan.ts
│   ├── store/
│   │   └── useStore.ts        (Zustand)
│   ├── api/
│   │   ├── findings.ts
│   │   ├── remediate.ts
│   │   └── scan.ts
│   └── styles/
│       └── tokens.css
├── package.json
└── vite.config.ts
```

**Recommended stack for v2.0:**
- **React 19** + TypeScript
- **Vite** for bundling
- **Zustand** for state
- **React Query (TanStack)** for API caching
- **Recharts** or **Nivo** for charts
- **Radix UI** for accessible primitives
- **Tailwind CSS** for styling
