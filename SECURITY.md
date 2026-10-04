# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| 1.0.x   | ✅ Yes     |
| < 1.0   | ❌ No      |

## Reporting a Vulnerability

If you discover a security vulnerability in **CloudGuard**, please **do not** open a public GitHub issue.

Instead, please email **security@cloudguard.io** with:

1. A description of the vulnerability
2. Steps to reproduce the issue
3. Potential impact / severity assessment
4. Any suggested mitigations (optional)

### Response Timeline

| Stage | SLA |
|---|---|
| Initial acknowledgement | 48 hours |
| Severity assessment | 5 business days |
| Fix for Critical/High | 14 days |
| Fix for Medium/Low | 30 days |
| Public disclosure | After fix is released |

We follow [responsible disclosure](https://en.wikipedia.org/wiki/Responsible_disclosure) and will credit researchers who report valid vulnerabilities (unless they prefer anonymity).

## Security Design Notes

CloudGuard v1.0 is a **static frontend** with the following security properties:

- ✅ No server-side code — attack surface is limited to the browser
- ✅ No localStorage or sessionStorage usage
- ✅ No cookies set
- ✅ No external API calls (except Google Fonts CDN for typography)
- ✅ No user data transmitted anywhere
- ✅ No authentication tokens stored in the DOM
- ⚠️ Mock data only — real deployments must secure their own backend APIs

## When Connecting to Real Backends

If you extend CloudGuard to connect to real security APIs:

- Store API keys in environment variables, **never** in `index.html`
- Use HTTPS for all API endpoints
- Implement Content Security Policy (CSP) headers
- Consider adding authentication (OAuth2 / SAML) before exposing to the internet
- Review OWASP Top 10 for web application security
