import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { mkdirSync } from 'node:fs';

const PORT = 9876;
const server = createServer((req, res) => {
  let filePath = req.url === '/' ? '/index.html' : req.url;
  filePath = join(import.meta.dirname, 'game', filePath);

  try {
    const content = readFileSync(filePath);
    const ext = filePath.split('.').pop();
    const mimeTypes: Record<string, string> = {
      html: 'text/html',
      js: 'application/javascript',
      css: 'text/css',
    };

    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
    res.end(content);
  } catch {
    res.writeHead(404);
    res.end('Not found');
  }
});

await new Promise(r => server.listen(PORT, r));

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 1280, height: 720 });
await page.goto(`http://localhost:${PORT}`, { waitUntil: 'networkidle' });

mkdirSync('screenshots', { recursive: true });

// Start game
await page.click('button#startBtn');
await page.waitForTimeout(2000);

const leftCanvas = page.locator('canvas').first();

// Beach scene: click 3 diffs (sun, palm tree, crab)
for (const [x, y] of [[0.15, 0.15], [0.5, 0.3], [0.65, 0.38]]) {
  const bbox = await leftCanvas.boundingBox();
  if (bbox) await page.mouse.click(bbox.x + bbox.width * x, bbox.y + bbox.height * y);
  await page.waitForTimeout(500);
}
await page.waitForTimeout(1500);
await page.screenshot({ path: 'screenshots/1-play.jpg', type: 'jpeg', quality: 70 });
console.log('1-play.jpg (Beach)');

// Complete Beach: click remaining 4
for (const [x, y] of [[0.45, 0.58], [0.75, 0.52], [0.55, 0.25], [0.3, 0.5]]) {
  const bbox = await leftCanvas.boundingBox();
  if (bbox) await page.mouse.click(bbox.x + bbox.width * x, bbox.y + bbox.height * y);
  await page.waitForTimeout(300);
}
await page.waitForTimeout(2000);
await page.getByRole('button', { name: /next/i }).click();
await page.waitForTimeout(1500);

// Forest: click 3 diffs
for (const [x, y] of [[0.85, 0.15], [0.5, 0.42], [0.35, 0.62]]) {
  const bbox = await leftCanvas.boundingBox();
  if (bbox) await page.mouse.click(bbox.x + bbox.width * x, bbox.y + bbox.height * y);
  await page.waitForTimeout(400);
}
await page.waitForTimeout(1500);
await page.screenshot({ path: 'screenshots/2-forest.jpg', type: 'jpeg', quality: 70 });
console.log('2-forest.jpg (Forest)');

// Complete Forest: click remaining 4
for (const [x, y] of [[0.4, 0.58], [0.62, 0.3], [0.55, 0.56], [0.25, 0.22]]) {
  const bbox = await leftCanvas.boundingBox();
  if (bbox) await page.mouse.click(bbox.x + bbox.width * x, bbox.y + bbox.height * y);
  await page.waitForTimeout(150);
}
await page.waitForTimeout(1500);
await page.getByRole('button', { name: /next/i }).click();
await page.waitForTimeout(1000);

// Mountain: click all 7
for (const [x, y] of [[0.7, 0.6], [0.45, 0.76], [0.15, 0.08], [0.5, 0.25], [0.25, 0.3], [0.68, 0.77], [0.35, 0.68]]) {
  const bbox = await leftCanvas.boundingBox();
  if (bbox) await page.mouse.click(bbox.x + bbox.width * x, bbox.y + bbox.height * y);
  await page.waitForTimeout(150);
}
await page.waitForTimeout(1500);
await page.getByRole('button', { name: /next/i }).click();
await page.waitForTimeout(1000);

// Lantern Market: click 4 diffs
for (const [x, y] of [[0.18, 0.43], [0.52, 0.43], [0.25, 0.75], [0.35, 0.45]]) {
  const bbox = await leftCanvas.boundingBox();
  if (bbox) await page.mouse.click(bbox.x + bbox.width * x, bbox.y + bbox.height * y);
  await page.waitForTimeout(400);
}
await page.waitForTimeout(1500);
await page.screenshot({ path: 'screenshots/3-lantern.jpg', type: 'jpeg', quality: 70 });
console.log('3-lantern.jpg (Lantern Market)');

// Complete Lantern Market
for (const [x, y] of [[0.69, 0.46], [0.86, 0.44], [0.15, 0.68]]) {
  const bbox = await leftCanvas.boundingBox();
  if (bbox) await page.mouse.click(bbox.x + bbox.width * x, bbox.y + bbox.height * y);
  await page.waitForTimeout(150);
}
await page.waitForTimeout(1500);
await page.getByRole('button', { name: /next/i }).click();
await page.waitForTimeout(1000);

// Clockwork Garden: click 3 diffs
for (const [x, y] of [[0.25, 0.3], [0.5, 0.2], [0.08, 0.82]]) {
  const bbox = await leftCanvas.boundingBox();
  if (bbox) await page.mouse.click(bbox.x + bbox.width * x, bbox.y + bbox.height * y);
  await page.waitForTimeout(400);
}
await page.waitForTimeout(1500);
await page.screenshot({ path: 'screenshots/4-clockwork.jpg', type: 'jpeg', quality: 70 });
console.log('4-clockwork.jpg (Clockwork Garden)');

await browser.close();
server.close();
console.log('Done');
