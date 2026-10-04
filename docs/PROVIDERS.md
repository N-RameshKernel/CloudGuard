# Identity and cloud provider setup

CloudGuard uses Google or Microsoft sign-in for the person using the app. Cloud account access is configured separately with dedicated, read-only service identities.

## Google and Microsoft sign-in

Register an OpenID Connect web application with each identity provider. Configure these exact redirect URIs for local development:

- Google: `http://127.0.0.1:4000/api/v1/auth/google/callback`
- Microsoft: `http://127.0.0.1:4000/api/v1/auth/microsoft/callback`

Set `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `MICROSOFT_CLIENT_ID`, and `MICROSOFT_CLIENT_SECRET` in `server/.env`. Microsoft defaults to the `common` tenant; set `MICROSOFT_TENANT_ID` to your tenant ID to restrict sign-in. For production, use your HTTPS domain in `APP_URL`, both callback URLs, and `ALLOWED_ORIGINS`. Never put client secrets in the browser build.

## AWS Security Hub

Create a cross-account IAM role that CloudGuard can assume and allow `sts:AssumeRole` from the CloudGuard runtime identity. Supply the role ARN and an external ID when adding the connection. Grant only `securityhub:GetFindings` for the regions you select. Enable Security Hub and the standards/products you want assessed in those regions. CloudGuard uses temporary credentials and reads findings; it does not change AWS resources.

## Microsoft Azure Defender for Cloud

Create an app registration/service principal and grant it the **Security Reader** role on the target subscription. Supply the tenant ID, client ID, client secret, and subscription ID when adding the connection. CloudGuard reads Defender for Cloud security assessments. Use a dedicated principal and rotate the secret.

## Google Cloud Security Command Center

Create a service account and grant `roles/securitycenter.findingsViewer` at the organization scope. Provide the organization ID and service-account JSON when adding the connection. The JSON key is encrypted before it is stored. Prefer short-lived workload identity credentials in environments where available; never commit a service-account key to source control.

## Other cloud and security providers

Oracle Cloud, Alibaba Cloud, IBM Cloud, DigitalOcean, and custom providers are supported through the signed ingestion endpoint. Create a provider connection in the Cloud inventory screen and save the one-time bearer token. Send `POST /api/v1/ingest/{connectionId}` over HTTPS with `Authorization: Bearer <token>` and a JSON body containing `findings`.

```json
{
  "findings": [
    {
      "externalId": "scanner-finding-123",
      "title": "Public storage bucket",
      "description": "Bucket allows anonymous reads.",
      "severity": "high",
      "resourceId": "account/project/bucket",
      "resourceName": "example-assets",
      "region": "us-east-1",
      "cveIds": [],
      "remediation": "Restrict the bucket policy.",
      "status": "open"
    }
  ]
}
```

Allowed severities are `critical`, `high`, `medium`, `low`, and `info`; status is `open`, `in_progress`, `resolved`, or `suppressed`. The endpoint accepts up to 500 findings per request and upserts by provider connection plus `externalId`. Keep the bearer token private, rotate it by recreating the connection, and send only validated scanner output.

## Vulnerability intelligence

The app refreshes NVD CVE records and CISA's Known Exploited Vulnerabilities catalog using public feeds. The default schedule is hourly. `NVD_API_KEY` can be set to raise NVD request limits. Source timestamps and upstream availability affect freshness; feed polling is not a real-time vulnerability event stream.
