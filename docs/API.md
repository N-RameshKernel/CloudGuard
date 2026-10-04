# CloudGuard API

All application endpoints use the `/api/v1` prefix. The browser uses an HTTP-only session cookie. Obtain a CSRF token from `GET /auth/session` before state-changing requests and send it as `x-csrf-token`. JSON request bodies use `Content-Type: application/json`.

## Session and health

| Method | Path | Auth | Purpose |
| --- | --- | --- | --- |
| GET | `/health` | No | API and database health |
| GET | `/auth/session` | No | Current user, CSRF token, configured login providers |
| GET | `/auth/google` | No | Start Google OIDC sign-in |
| GET | `/auth/microsoft` | No | Start Microsoft OIDC sign-in |
| POST | `/auth/demo` | No | Local sample login; only enabled when `DEMO_MODE=true` |
| POST | `/auth/logout` | Session | End current session |

## Dashboard and findings

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/dashboard/overview` | Workspace metrics, provider catalog, recent findings, and connected accounts |
| GET | `/findings?severity=all&provider=all&status=all&q=` | Filtered organization findings |
| PATCH | `/findings/:id` | Change finding status (`open`, `in_progress`, `resolved`, `suppressed`) |
| GET | `/activity` | Recent workspace audit events |

## Cloud connections

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/cloud/providers` | Provider catalog and integration mode |
| GET | `/cloud/connections` | Connections for the signed-in organization |
| POST | `/cloud/connections` | Create a native or webhook connection |
| POST | `/cloud/connections/:id/sync` | Sync a single native cloud connection |
| POST | `/cloud/sync-all` | Sync all native connections for the organization |

Create connection request example (AWS):

```json
{
  "provider": "aws",
  "name": "Production",
  "externalRef": "arn:aws:iam::123456789012:role/CloudGuardReadOnly",
  "regions": ["us-east-1", "us-west-2"],
  "credentials": { "roleArn": "arn:aws:iam::123456789012:role/CloudGuardReadOnly", "externalId": "your-generated-external-id" }
}
```

Native credentials are encrypted before storage and are never returned by connection APIs. Other providers receive a one-time webhook bearer token in the create response; see [provider setup](PROVIDERS.md).

## Vulnerability intelligence

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/intel/status` | Last successful feed poll and demo-memory count |
| GET | `/intel/advisories?q=&severity=all&kev=false&limit=100` | Search/filter NVD and CISA KEV records |
| POST | `/intel/sync` | Refresh vulnerability feeds now |

## Webhook ingestion

`POST /ingest/:connectionId` uses the connection's bearer token and does not use browser sessions. Require HTTPS and keep the token secret. Body is `{ "findings": [...] }`, with each finding containing `externalId`, `title`, and `severity`; optional fields are `description`, `resourceId`, `resourceName`, `region`, `cveIds`, `remediation`, and `status`. Limits are 500 findings per request. The endpoint upserts by connection and external ID.

## Error responses

Errors return JSON of the form `{ "error": "..." }`. Invalid request schemas return HTTP 400. Missing or invalid session returns HTTP 401. Atlas is required for persistent cloud connections and webhooks; the demo workspace intentionally uses in-memory sample findings.
