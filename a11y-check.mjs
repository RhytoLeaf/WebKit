/* a11y-check.mjs — axe-core gate: fails the build on any WCAG violation in the docs site.
   Run: node a11y-check.mjs */
import { puppeteer, AxePuppeteer } from '@axe-core/puppeteer';
import http from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';

const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json' };
const server = http.createServer((req, res) => {
  let p = normalize(decodeURIComponent(req.url.split('?')[0]));
  if (p === '/' || p === '\\') p = '/index.html';
  const f = join(process.cwd(), p);
  if (!existsSync(f) || !f.endsWith('.html') === false && !existsSync(f)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'Content-Type': MIME[extname(f)] ?? 'application/octet-stream' });
  res.end(readFileSync(f));
});
await new Promise(r => server.listen(0, '127.0.0.1', r));
const port = server.address().port;

const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'networkidle0' });
  const results = await new AxePuppeteer(page).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22a', 'wcag22aa']).analyze();
  console.log(`${results.violations.length} violation(s), ${results.passes.length} passing rule(s)`);
  for (const v of results.violations) {
    console.log(`- ${v.id}: ${v.help} [${v.impact}] (${v.nodes.length} node(s))`);
    for (const n of v.nodes.slice(0, 3)) console.log(`    ${n.target.join(' ')}`);
  }
  if (results.violations.length) process.exit(1);
  console.log('a11y: PASS (no WCAG 2.2 A/AA violations)');
} finally {
  await browser.close();
  server.close();
}
