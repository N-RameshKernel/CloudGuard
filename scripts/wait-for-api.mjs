import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const clientRoot = resolve(projectRoot, 'client');
const viteBin = resolve(projectRoot, 'node_modules', 'vite', 'bin', 'vite.js');
const healthUrl = 'http://127.0.0.1:4000/api/v1/health';
const deadline = Date.now() + 60_000;

console.log('Waiting for CloudGuard API at http://127.0.0.1:4000 ...');
while (Date.now() < deadline) {
  try {
    const response = await fetch(healthUrl, { signal: AbortSignal.timeout(1_500) });
    if (response.ok) break;
  } catch {}
  await delay(500);
}

try {
  const response = await fetch(healthUrl, { signal: AbortSignal.timeout(1_500) });
  if (!response.ok) throw new Error(`API health check returned ${response.status}`);
} catch {
  console.error('CloudGuard API did not become ready. Check the API process output above.');
  process.exit(1);
}

const child = spawn(process.execPath, [viteBin, '--host', '127.0.0.1'], {
  cwd: clientRoot,
  stdio: 'inherit',
});
for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => child.kill(signal));
}
child.on('error', error => {
  console.error('Could not start Vite:', error.message);
  process.exitCode = 1;
});
child.on('exit', (code, signal) => {
  process.exitCode = code ?? (signal ? 1 : 0);
});
