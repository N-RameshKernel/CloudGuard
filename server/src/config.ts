import 'dotenv/config';
import { z } from 'zod';

const schema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(4000),
  APP_URL: z.string().url().default('http://127.0.0.1:5173'),
  API_URL: z.string().url().default('http://127.0.0.1:4000'),
  MONGODB_URI: z.string().optional().default(''),
  SESSION_SECRET: z.string().default('development-only-change-me-please-32-chars'),
  CREDENTIAL_ENCRYPTION_KEY: z.string().optional().default(''),
  DEMO_MODE: z.enum(['true', 'false']).default('true'),
  GOOGLE_CLIENT_ID: z.string().optional().default(''),
  GOOGLE_CLIENT_SECRET: z.string().optional().default(''),
  GOOGLE_REDIRECT_URI: z.string().url().default('http://127.0.0.1:4000/api/v1/auth/google/callback'),
  MICROSOFT_CLIENT_ID: z.string().optional().default(''),
  MICROSOFT_CLIENT_SECRET: z.string().optional().default(''),
  MICROSOFT_TENANT_ID: z.string().default('common'),
  MICROSOFT_REDIRECT_URI: z.string().url().default('http://127.0.0.1:4000/api/v1/auth/microsoft/callback'),
  NVD_API_KEY: z.string().optional().default(''),
  CLOUD_SCAN_CRON: z.string().default('*/15 * * * *'),
  INTEL_SYNC_ENABLED: z.enum(['true', 'false']).default('true'),
  INTEL_SYNC_CRON: z.string().default('17 * * * *'),
  CISA_KEV_URL: z.string().url().default('https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json'),
  NVD_API_URL: z.string().url().default('https://services.nvd.nist.gov/rest/json/cves/2.0'),
  ALLOWED_ORIGINS: z.string().default('http://127.0.0.1:5173'),
  WEBHOOK_SIGNING_KEY: z.string().optional().default(''),
});

export const env = schema.parse(process.env);
export const isDemo = env.DEMO_MODE === 'true';

if (env.NODE_ENV === 'production' && isDemo) {
  throw new Error('DEMO_MODE must be false in production.');
}

if (env.NODE_ENV === 'production' && (
  env.SESSION_SECRET.length < 32 ||
  !env.MONGODB_URI ||
  !/^[0-9a-f]{64}$/i.test(env.CREDENTIAL_ENCRYPTION_KEY)
)) {
  throw new Error('Production requires Atlas URI, 32+ char SESSION_SECRET, and 64 hex CREDENTIAL_ENCRYPTION_KEY.');
}
