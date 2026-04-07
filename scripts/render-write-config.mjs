import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const apiBaseUrl = (process.env.API_BASE_URL || 'http://localhost:8080').replace(/\/+$/, '');
const filePath = path.join(process.cwd(), 'public', 'app-config.js');

await mkdir(path.dirname(filePath), { recursive: true });
await writeFile(
  filePath,
  `window.__APP_CONFIG__ = ${JSON.stringify({ apiBaseUrl }, null, 2)};\n`,
  'utf8'
);

console.log(`Wrote runtime API config for ${apiBaseUrl}`);
