/* lh-check.mjs — Lighthouse gate: performance, accessibility, best-practices, SEO must each be ≥ 90.
   Run: node lh-check.mjs */
import http from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';
import chromeLauncher from 'chrome-launcher';
import lighthouse from 'lighthouse';

const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json' };
const server = http.createServer((req, res) => {
  let p = normalize(decodeURIComponent(req.url.split('?')[0]));
  if (p === '/' || p === '\\') p = '/index.html';
  const f = join(process.cwd(), p);
  if (!existsSync(f)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'Content-Type': MIME[extname(f)] ?? 'application/octet-stream' });
  res.end(readFileSync(f));
});
await new Promise(r => server.listen(0, '127.0.0.1', r));
const port = server.address().port;

const chrome = await chromeLauncher.launch({ chromeFlags: ['--no-sandbox', '--headless', '--disable-dev-shm-usage'] });
let failed = false;
try {
  const { lhr } = await lighthouse(`http://127.0.0.1:${port}/`, {
    port: chrome.port,
    output: 'json',
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
  }, { chromeFlags: ['--no-sandbox', '--headless'] });
  for (const c of ['performance', 'accessibility', 'best-practices', 'seo']) {
    const score = Math.round((lhr.categories[c].score ?? 0) * 100);
    console.log(`${c}: ${score}`);
    if (score < 90) failed = true;
  }
  if (failed) { console.error('Lighthouse gate FAILED (< 90 in at least one category)'); process.exit(1); }
  console.log('lighthouse: PASS (all categories ≥ 90)');
} finally {
  await chrome.kill();
  server.close();
}
