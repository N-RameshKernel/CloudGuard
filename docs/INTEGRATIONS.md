# Integrations

CloudGuard integrates with security services through native read-only connectors and a normalized webhook endpoint.

## Native account connectors

- AWS Security Hub findings via an assumed IAM role.
- Microsoft Defender for Cloud assessments via Azure service principal.
- Google Security Command Center findings via service account.

See [PROVIDERS.md](PROVIDERS.md) for permissions, credential fields, and regional/account setup.

## Other cloud services and scanners

Oracle Cloud, Alibaba Cloud, IBM Cloud, DigitalOcean, and custom providers can push existing scanner results into `POST /api/v1/ingest/:connectionId`. CloudGuard does not claim native API coverage for these providers yet. The webhook schema is documented in [API.md](API.md).

## Vulnerability feeds

NVD CVE 2.0 and CISA KEV are polled on a schedule. Configure `NVD_API_KEY` to increase NVD request quota. Feed status appears in the Vulnerability Intelligence area.

## Current product boundaries

The app reads security findings and assessments, tracks finding status, and provides vulnerability context. It does not deploy agents, perform active penetration testing, change cloud resources, or execute remediation. Ticketing/chat notifications and CI/CD gates are not wired up in this build.
