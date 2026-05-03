# Deployment Guide — CloudGuard

CloudGuard is a single HTML file. Every deployment method below takes less than 5 minutes.

---

## Option 1 — GitHub Pages (Free, Recommended)

1. Fork this repository
2. Go to **Settings → Pages**
3. Under "Build and deployment", set:
   - Source: **Deploy from a branch**
   - Branch: `main` / `(root)`
4. Click **Save**
5. Your dashboard will be live at:
   `https://YOUR_USERNAME.github.io/cloudguard/`

The included `deploy.yml` workflow auto-deploys on every push to `main`.

---

## Option 2 — Vercel

```bash
npm install -g vercel
vercel --prod
```

Or connect via the Vercel dashboard → Import Git Repository.

**Custom domain:** Settings → Domains → Add your domain.

---

## Option 3 — Netlify

### Via drag-and-drop
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag `index.html` onto the page
3. Live in seconds

### Via CLI
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir .
```

### Via Git integration
Connect your GitHub repo in the Netlify dashboard. Every push to `main` auto-deploys.

---

## Option 4 — Docker + Nginx

### Dockerfile
```dockerfile
FROM nginx:alpine

# Copy dashboard
COPY index.html /usr/share/nginx/html/index.html

# Optional: custom nginx config for security headers
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget -q --spider http://localhost/ || exit 1
```

### nginx.conf (recommended for production)
```nginx
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";
    add_header X-XSS-Protection "1; mode=block";
    add_header Referrer-Policy "strict-origin-when-cross-origin";
    add_header Content-Security-Policy "
        default-src 'self';
        script-src 'self' 'unsafe-inline';
        style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
        font-src https://fonts.gstatic.com;
        img-src 'self' data:;
        connect-src 'self';
    ";

    # Gzip compression
    gzip on;
    gzip_types text/html text/css application/javascript;
    gzip_min_length 1024;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### Build & Run
```bash
docker build -t cloudguard:latest .
docker run -d -p 8080:80 --name cloudguard cloudguard:latest
```

### Docker Compose
```yaml
# docker-compose.yml
version: '3.8'

services:
  cloudguard:
    build: .
    ports:
      - "8080:80"
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "wget", "-q", "--spider", "http://localhost/"]
      interval: 30s
      timeout: 5s
      retries: 3
```

```bash
docker compose up -d
```

---

## Option 5 — AWS S3 Static Website

```bash
# Create bucket
aws s3 mb s3://cloudguard-dashboard

# Enable static website hosting
aws s3 website s3://cloudguard-dashboard \
  --index-document index.html \
  --error-document index.html

# Upload file
aws s3 cp index.html s3://cloudguard-dashboard/ \
  --content-type "text/html" \
  --cache-control "max-age=3600"

# Make bucket public (for open dashboards)
aws s3api put-bucket-policy \
  --bucket cloudguard-dashboard \
  --policy '{
    "Version":"2012-10-17",
    "Statement":[{
      "Sid":"PublicRead",
      "Effect":"Allow",
      "Principal":"*",
      "Action":"s3:GetObject",
      "Resource":"arn:aws:s3:::cloudguard-dashboard/*"
    }]
  }'
```

Access at: `http://cloudguard-dashboard.s3-website-us-east-1.amazonaws.com`

### Add CloudFront CDN
```bash
aws cloudfront create-distribution \
  --origin-domain-name cloudguard-dashboard.s3-website-us-east-1.amazonaws.com \
  --default-root-object index.html
```

---

## Option 6 — Google Cloud Storage

```bash
# Create bucket
gsutil mb gs://cloudguard-dashboard

# Upload
gsutil cp index.html gs://cloudguard-dashboard/

# Make public
gsutil iam ch allUsers:objectViewer gs://cloudguard-dashboard

# Enable website serving
gsutil web set -m index.html -e index.html gs://cloudguard-dashboard
```

---

## Option 7 — Azure Static Web Apps

```bash
# Install Azure CLI
az login

# Create resource group
az group create --name cloudguard-rg --location eastus

# Create static web app
az staticwebapp create \
  --name cloudguard-dashboard \
  --resource-group cloudguard-rg \
  --source https://github.com/nramesh/cloudguard \
  --location eastus \
  --branch main \
  --app-location "/" \
  --output-location "/"
```

---

## Option 8 — Internal Network / Intranet

For air-gapped or internal deployments:

```bash
# Simple Python HTTP server (Python 3)
python3 -m http.server 8080 --bind 0.0.0.0

# Node.js
npx serve . --listen 8080

# PHP built-in server
php -S 0.0.0.0:8080
```

---

## Production Checklist

Before going live in production:

### Security
- [ ] Add authentication in front of the dashboard (OAuth2, SAML, basic auth via nginx)
- [ ] Configure Content Security Policy headers
- [ ] Enable HTTPS (TLS certificate)
- [ ] Remove any hardcoded API keys from `index.html`
- [ ] Set up a backend proxy for real API calls

### Performance
- [ ] Enable gzip/brotli compression on your server
- [ ] Set `Cache-Control` headers (1 hour recommended)
- [ ] Add a CDN for global teams

### Monitoring
- [ ] Set up uptime monitoring (UptimeRobot, Pingdom, etc.)
- [ ] Configure error logging on your server
- [ ] Add a status page for your security team

---

## Environment-Specific Configuration

Since CloudGuard is a static file, environment-specific config is done via:

### Option A — Build-time replacement
```bash
# Replace API base URL before deployment
sed -i 's|https://api.cloudguard.io|https://your-api.company.io|g' index.html
```

### Option B — Runtime config via window global
Add to `index.html` before the closing `</body>`:
```html
<script src="/config.js"></script>
```

`config.js` (served by your server, not committed to git):
```javascript
window.CLOUDGUARD_CONFIG = {
  apiBase: 'https://your-api.company.io/v1',
  apiKey:  '', // never set this — use a proxy
  orgName: 'Acme Corp',
  theme:   'dark'
};
```
