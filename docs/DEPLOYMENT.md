# Deployment

## Required managed services

- MongoDB Atlas cluster and database user. No local MongoDB service is required or started by this project.
- Google and/or Microsoft OIDC application credentials for sign-in.
- HTTPS reverse proxy or managed HTTPS ingress in front of the app for production.

## Environment

Copy `server/.env.example` to `server/.env` for Docker Compose. For non-container deployments, set the same variables in the API process environment. Generate secrets rather than reusing the sample strings. `CREDENTIAL_ENCRYPTION_KEY` must be exactly 64 hexadecimal characters (32 random bytes); `SESSION_SECRET` must be at least 32 characters.

For one way to generate values in PowerShell:

```powershell
[Convert]::ToHexString([Security.Cryptography.RandomNumberGenerator]::GetBytes(32))
[Convert]::ToBase64String([Security.Cryptography.RandomNumberGenerator]::GetBytes(48))
```

Set `NODE_ENV=production`, `DEMO_MODE=false`, `MONGODB_URI`, `APP_URL`, `API_URL`, `ALLOWED_ORIGINS`, callback URLs, OAuth secrets, and both random secrets. Set callback URLs to `https://your-domain/api/v1/auth/google/callback` and `https://your-domain/api/v1/auth/microsoft/callback`. The production `APP_URL` and `API_URL` should use the public HTTPS origin.

## Docker Compose

From the project root, create `server/.env`, then run:

```powershell
docker compose up --build -d
docker compose logs -f cloudguard
```

The single app container serves the built UI, API, and docs on port 4000. Compose intentionally has no database container; it connects to your Atlas URI. Restrict public access at the network edge and terminate TLS before traffic reaches this HTTP container. Configure the reverse proxy to forward `X-Forwarded-Proto` so secure session cookies work.

## Scheduled refresh

`INTEL_SYNC_CRON` refreshes NVD and CISA KEV feeds; `CLOUD_SCAN_CRON` refreshes configured native cloud connections. Defaults are hourly and every 15 minutes. Set `INTEL_SYNC_ENABLED=false` to disable scheduled jobs. A cloud provider API outage or permission issue marks that connection's scan as failed and is logged by the API.

## Health and operations

- `GET /api/v1/health` reports API and Atlas connection status.
- `GET /api/v1/auth/session` reports OAuth configuration and current session state.
- Review `docs/API.md` and `docs/PROVIDERS.md` for API and least-privilege integration details.
- Back up Atlas using its managed backup features. Back up the encryption key separately: existing encrypted cloud credentials cannot be decrypted without the same key.
- Keep secrets in the deployment platform's secret manager and rotate them on a planned schedule.
