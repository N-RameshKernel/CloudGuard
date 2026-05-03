# Contributing to CloudGuard

Thank you for your interest in contributing to **CloudGuard**! 🎉

We welcome contributions of all kinds — bug fixes, new features, documentation improvements, design enhancements, and more.

---

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Commit Convention](#commit-convention)
- [Pull Request Process](#pull-request-process)
- [Issue Guidelines](#issue-guidelines)
- [Code Style](#code-style)
- [Testing](#testing)

---

## 🤝 Code of Conduct

This project follows the [Contributor Covenant](https://www.contributor-covenant.org/) Code of Conduct. By participating, you agree to uphold a welcoming, respectful, and harassment-free environment for everyone.

---

## 🚀 Getting Started

1. **Fork** the repository on GitHub
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/cloudguard.git
   cd cloudguard
   ```
3. **Open** `index.html` in your browser — no build step needed
4. Make your changes and test in at least **two browsers**

---

## 🔄 Development Workflow

```bash
# 1. Create a feature branch
git checkout -b feature/your-feature-name

# 2. Make your changes in index.html
# (or docs/, .github/, etc.)

# 3. Test in Chrome + Firefox + Safari
# 4. Commit your changes (see commit convention below)
git add .
git commit -m "feat: add your feature"

# 5. Push to your fork
git push origin feature/your-feature-name

# 6. Open a Pull Request on GitHub
```

---

## 📝 Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix | When to use |
|---|---|
| `feat:` | New feature or screen |
| `fix:` | Bug fix |
| `style:` | CSS/visual changes (no logic change) |
| `refactor:` | Code restructure (no behavior change) |
| `docs:` | Documentation only |
| `chore:` | Build, CI, tooling changes |
| `test:` | Adding or updating tests |

**Examples:**
```
feat: add time-range picker to reports screen
fix: sidebar collapse animation on Safari
style: increase chart line weight to 2.5px
docs: add Kubernetes deployment guide
```

---

## 🔍 Pull Request Process

1. **Title** — Use the commit convention format (`feat: ...`, `fix: ...`)
2. **Description** — Fill in the PR template completely
3. **Screenshots** — Required for any UI changes (before + after)
4. **Checklist** — Make sure all items are checked before requesting review
5. **Review** — At least one maintainer approval required before merging

### PR Checklist
- [ ] Tested in Chrome, Firefox, and Safari
- [ ] No console errors or warnings
- [ ] CSS uses existing custom properties (`var(--blue)` not `#3B82F6`)
- [ ] No external libraries added without prior discussion
- [ ] Documentation updated if behavior changed
- [ ] Screenshots included for UI changes

---

## 🐛 Issue Guidelines

### Reporting Bugs
Use the [Bug Report template](.github/ISSUE_TEMPLATE/bug_report.md) and include:
- Browser name and version
- Operating system
- Steps to reproduce (numbered list)
- Expected vs. actual behavior
- Screenshot or screen recording

### Requesting Features
Use the [Feature Request template](.github/ISSUE_TEMPLATE/feature_request.md) and include:
- Problem you're trying to solve
- Proposed solution
- Alternatives considered
- Any mockups or references

---

## 🎨 Code Style

### HTML
```html
<!-- ✅ Good — semantic, clean indentation -->
<div class="card" onclick="openPanel()">
  <div class="card-label">Risk Score</div>
  <div class="stat-value">73</div>
</div>

<!-- ❌ Avoid — inline styles, non-semantic elements -->
<div style="background:#0D1220;padding:16px;" onclick="openPanel()">
  <span style="font-size:11px;">Risk Score</span>
```

### CSS
```css
/* ✅ Good — use custom properties */
.card { background: var(--bg2); border: 1px solid var(--border); }

/* ❌ Avoid — hardcoded colors */
.card { background: #0D1220; border: 1px solid rgba(255,255,255,0.07); }
```

### JavaScript
```javascript
// ✅ Good — named functions, const/let, clear comments
// ─── SECTION NAME ────────────────────────────────
function openPanel(id, resource, type) {
  const panel = document.getElementById('side-panel');
  panel.classList.add('open');
}

// ❌ Avoid — anonymous functions, var, no comments
var x = function(a,b,c) { document.getElementById('side-panel').classList.add('open'); }
```

### Section Headers in JS
```javascript
// ─── SECTION NAME ────────────────────────────────
```
Use this exact format for every new logical section in the script block.

---

## 🧪 Testing

Since CloudGuard is a zero-dependency HTML file, testing is manual:

### Browser Compatibility
Test in:
- [ ] Chrome 90+ (primary)
- [ ] Firefox 88+
- [ ] Safari 14+
- [ ] Edge 90+

### Checklist for Each Screen
- [ ] All buttons trigger correct actions
- [ ] Toast notifications appear and dismiss
- [ ] Charts render correctly on resize
- [ ] Dark/light mode toggle works
- [ ] Side panel opens and closes smoothly
- [ ] No layout overflow or scroll issues

### Responsive Testing
- [ ] Desktop (1280px+) — full layout
- [ ] Tablet (768–1279px) — adapted grid
- [ ] Mobile (< 768px) — sidebar collapsed, limited view

---

## 💬 Questions?

Open a [Discussion](https://github.com/nramesh/cloudguard/discussions) for general questions, or email **ramesh@company.io** for private inquiries.

---

Thank you for making CloudGuard better! ⚡
