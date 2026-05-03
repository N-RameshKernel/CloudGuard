# API Integration Guide — CloudGuard

This guide explains how to connect CloudGuard to a real security backend.

---

## Quick Start

All API integration points are in the `<script>` block of `index.html`. Search for the section header:

```javascript
// ─── API TESTER ───────────────────────────────────
```

---

## Replacing Mock Data

### Vulnerability Findings

Find the `vulns` array and replace it with a fetch call:

```javascript
// BEFORE (mock data)
const vulns = [
  { id:'CRIT-001', resource:'s3:::prod-media-assets', ... },
];

// AFTER (real API)
let vulns = [];

async function loadFindings() {
  const resp = await fetch('https://your-api.io/v1/findings', {
    headers: {
      'Authorization': `Bearer ${getApiKey()}`,
      'Content-Type': 'application/json'
    }
  });
  const data = await resp.json();
  vulns = data.data.map(f => ({
    id:       f.id,
    resource: f.resource_arn,
    type:     f.check_type,
    sev:      f.severity.toLowerCase(),
    score:    f.cvss_score,
    status:   f.status,
    fix:      f.remediation_summary
  }));
  renderVulnTable();
}

// Call on page load
loadFindings();
```

---

## Expected API Response Schema

### `GET /v1/findings`

**Query Parameters:**
| Param | Type | Description |
|---|---|---|
| `severity` | string | `critical`, `high`, `medium`, `low` |
| `provider` | string | `aws`, `gcp`, `azure` |
| `service` | string | `s3`, `iam`, `vpc`, `ec2`, etc. |
| `status` | string | `open`, `in_progress`, `resolved` |
| `page` | integer | Page number (default: 1) |
| `limit` | integer | Results per page (default: 20, max: 100) |

**Response:**
```json
{
  "status": 200,
  "total": 147,
  "page": 1,
  "limit": 20,
  "data": [
    {
      "id":                  "CRIT-001",
      "severity":            "critical",
      "cvss_score":          9.8,
      "provider":            "aws",
      "region":              "us-east-1",
      "service":             "s3",
      "resource_arn":        "arn:aws:s3:::prod-media-assets",
      "resource_name":       "prod-media-assets",
      "check_id":            "CKV_AWS_20",
      "check_type":          "Public Bucket Access",
      "status":              "open",
      "detected_at":         "2025-05-02T09:14:00Z",
      "last_updated":        "2025-05-02T09:14:00Z",
      "assigned_to":         null,
      "remediation_summary": "Block all public access settings on the S3 bucket",
      "remediation_cli":     "aws s3api put-public-access-block --bucket prod-media-assets ...",
      "remediation_tf":      "resource \"aws_s3_bucket_public_access_block\" ...",
      "compliance":          ["CIS_AWS_1.2", "PCI_DSS_3.4", "SOC2_CC6.1"],
      "cve_ids":             []
    }
  ],
  "meta": {
    "providers": { "aws": 89, "gcp": 33, "azure": 25 },
    "by_severity": { "critical": 7, "high": 28, "medium": 61, "low": 51 },
    "response_ms": 48
  }
}
```

---

### `GET /v1/findings/:id`

Returns full details for a single finding (used when opening the side panel).

```json
{
  "id": "CRIT-001",
  "severity": "critical",
  "cvss_score": 9.8,
  "description": "The S3 bucket has public read/write access enabled...",
  "impact": "Any internet user can read, overwrite, or delete objects...",
  "affected_resources": [
    { "arn": "arn:aws:s3:::prod-media-assets", "size_tb": 2.3, "object_count": 18492 }
  ],
  "fix_steps": [
    "Navigate to S3 Console → Select bucket → Permissions tab",
    "Under Block public access, click Edit and enable all 4 options",
    "Review and update bucket policy to remove public principals"
  ],
  "remediation_cli": "aws s3api put-public-access-block ...",
  "remediation_tf": "resource \"aws_s3_bucket_public_access_block\" ...",
  "history": [
    { "event": "detected",  "timestamp": "2025-05-02T09:14:00Z", "actor": "CloudGuard Scanner" },
    { "event": "assigned",  "timestamp": "2025-05-02T09:20:00Z", "actor": "N. Ramesh" }
  ]
}
```

---

### `POST /v1/remediate`

Trigger auto-remediation for a finding.

**Request:**
```json
{
  "finding_id":  "CRIT-001",
  "action":      "auto_fix",
  "approved_by": "ramesh@company.io",
  "dry_run":     false
}
```

**Response:**
```json
{
  "status":      200,
  "finding_id":  "CRIT-001",
  "result":      "success",
  "changes":     ["S3 public access blocked", "Bucket ACL set to private"],
  "rollback_id": "rb_xK9mN2",
  "executed_at": "2025-05-02T10:33:00Z"
}
```

---

### `POST /v1/scan`

Trigger a new scan.

**Request:**
```json
{
  "provider":   "aws",
  "services":   ["s3", "iam", "vpc"],
  "scan_type":  "deep",
  "regions":    ["us-east-1", "us-west-2"],
  "notify":     { "slack": "#security-alerts" }
}
```

**Response:**
```json
{
  "scan_id":    "scan_7rTy4kLo",
  "status":     "running",
  "started_at": "2025-05-02T10:35:00Z",
  "webhook_url": "https://your-api.io/v1/scans/scan_7rTy4kLo/status"
}
```

---

### `GET /v1/metrics/summary`

Used to populate the dashboard stat cards.

```json
{
  "risk_score":       73,
  "risk_level":       "medium",
  "total_findings":   147,
  "critical":         7,
  "high":             28,
  "medium":           61,
  "low":              51,
  "resources_scanned": 2841,
  "pass_rate":        73,
  "last_scan":        "2025-05-02T09:10:00Z",
  "compliance": {
    "cis_aws":  78,
    "soc2":     65,
    "pci_dss":  82,
    "hipaa":    45,
    "nist_csf": 71
  }
}
```

---

## Authentication

### Bearer Token (recommended)
```javascript
const API_KEY = 'cg_live_xK9mN2pQ...'; // store securely, not in source!

async function apiFetch(endpoint, options = {}) {
  const base = 'https://your-api.io/v1';
  const resp = await fetch(`${base}${endpoint}`, {
    ...options,
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
      ...(options.headers || {})
    }
  });
  if (!resp.ok) throw new Error(`API error: ${resp.status}`);
  return resp.json();
}
```

### Environment Variable Pattern (for server-side proxies)
Never embed API keys in `index.html` for public deployments. Instead, proxy through a backend:

```javascript
// Frontend calls your proxy
const data = await fetch('/api/findings?severity=critical');

// Your proxy (Node.js/Python/etc.) adds the real key
// and forwards to the security API
```

---

## Compatible Security Platforms

| Platform | Base URL | Auth |
|---|---|---|
| AWS Security Hub | `https://securityhub.{region}.amazonaws.com` | AWS SigV4 |
| Google SCC | `https://securitycenter.googleapis.com/v1` | OAuth2 / Service Account |
| Microsoft Defender | `https://management.azure.com` | Azure AD token |
| Prisma Cloud | `https://api.prismacloud.io` | Bearer token |
| Wiz | `https://api.wiz.io/graphql` | OAuth2 client credentials |
| Orca Security | `https://app.orcasecurity.io/api` | Bearer token |

---

## WebSocket Live Feed

To replace the simulated live feed with a real WebSocket:

```javascript
// Replace simulateLiveUpdate() interval with:
const ws = new WebSocket('wss://your-api.io/v1/events/stream');

ws.onmessage = (event) => {
  const threat = JSON.parse(event.data);
  injectThreatToTicker(threat); // use existing function
  showToast(
    threat.severity === 'critical' ? 'error' : 'info',
    `${threat.type} — ${threat.resource}`
  );
};

ws.onerror = () => showToast('error', 'Live feed disconnected');
```
