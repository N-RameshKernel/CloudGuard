# Architecture

```text
React + Vite client
       │ same-origin /api/v1 requests + secure session cookie
       ▼
Express API ─── Google / Microsoft OIDC
       │
       ├── MongoDB Atlas: users, organizations, cloud accounts, findings, advisories, audit events, sessions
       ├── AWS STS + Security Hub (read-only)
       ├── Azure Identity + Defender for Cloud Assessments (read-only)
       ├── Google Auth + Security Command Center (read-only)
       ├── signed bearer-token ingestion for other cloud/security providers
       └── NVD CVE API + CISA Known Exploited Vulnerabilities feed
```

## Runtime shape

- The `client/` workspace builds the React app into `client/dist`.
- The `server/` workspace provides OAuth, API routes, cloud connectors, feed polling, and persistence.
- In production one Express service serves both the built UI and API, so session cookies are same-origin. In development Vite proxies `/api` to the API server.
- Docker Compose runs only the application. Persistent storage is a user-provided MongoDB Atlas cluster; no self-hosted database container is included.

## Tenant boundaries and secrets

OAuth sign-in associates a user with an organization. Cloud connections, findings, and activity events are queried by that organization. Cloud secrets are encrypted with AES-256-GCM using a deployment-provided 32-byte key; session cookies use an independent secret. Webhook tokens are returned once and only their hashes are stored. Atlas stores the session collection.

## Refresh and failure behavior

NVD and CISA KEV feeds are polled hourly by default. Native cloud integrations are polled every 15 minutes by default. Polling is not event streaming; source latency, API quotas, permissions, and network availability affect freshness. Feed failures and per-account sync failures are logged. Native integrations only read provider security findings/assessments; remediation is outside this app.

## Extension points

AWS, Azure, and Google Cloud have native connectors in `server/src/connectors/`. Additional providers use the normalized ingestion schema at `POST /api/v1/ingest/:connectionId`; see [provider setup](PROVIDERS.md). New native connectors should implement the shared connector interface, map source records into normalized findings, use least-privilege read-only permissions, and add their provider ID to the shared catalog/schema.
