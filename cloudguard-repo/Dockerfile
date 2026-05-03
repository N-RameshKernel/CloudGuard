# ─── CloudGuard Docker Image ─────────────────────
# Serves the CloudGuard dashboard via Nginx Alpine
# Size: ~25MB | Build time: ~30s

FROM nginx:1.27-alpine

LABEL maintainer="N. Ramesh <ramesh@company.io>"
LABEL version="1.0.0"
LABEL description="CloudGuard Multi-Cloud Security Dashboard"
LABEL org.opencontainers.image.source="https://github.com/nramesh/cloudguard"
LABEL org.opencontainers.image.licenses="MIT"

# Remove default nginx content
RUN rm -rf /usr/share/nginx/html/*

# Copy dashboard
COPY index.html /usr/share/nginx/html/index.html

# Copy nginx configuration with security headers
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Create non-root user for nginx worker processes
RUN addgroup -g 1001 -S cloudguard && \
    adduser -S cloudguard -u 1001 -G cloudguard

# Set permissions
RUN chown -R cloudguard:cloudguard /usr/share/nginx/html && \
    chown -R cloudguard:cloudguard /var/cache/nginx && \
    chown -R cloudguard:cloudguard /var/log/nginx && \
    touch /var/run/nginx.pid && \
    chown -R cloudguard:cloudguard /var/run/nginx.pid

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -q --spider http://localhost:8080/ || exit 1

USER cloudguard

CMD ["nginx", "-g", "daemon off;"]
