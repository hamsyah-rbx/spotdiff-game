import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { writeFileSync } from 'node:fs';
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
console.log(`Server started on http://localhost:${PORT}`);

const browser = await chromium.launch();
const page = await browser.newPage();

await page.goto(`http://localhost:${PORT}`, { waitUntil: 'networkidle' });
await page.click('button#startBtn');
await page.waitForTimeout(500);

mkdirSync('screenshots', { recursive: true });

// Screenshot 1: First scene
await page.screenshot({
  path: 'screenshots/1-play.png',
  fullPage: false,
});

console.log('Screenshot 1 taken: 1-play.png');

// Take a few more by progressing
for (let i = 2; i <= 4; i++) {
  const button = page.locator('button#hintBtn');
  if (await button.isEnabled()) {
    await button.click();
  }
  await page.waitForTimeout(300);
}

await page.screenshot({
  path: 'screenshots/2-progress.png',
  fullPage: false,
});

console.log('Screenshot 2 taken: 2-progress.png');

// Simulate finding a difference
const canvases = page.locator('canvas');
const boundingBox = await canvases.first().boundingBox();
if (boundingBox) {
  await page.click('canvas', { position: { x: boundingBox.width * 0.5, y: boundingBox.height * 0.5 } });
}
await page.waitForTimeout(300);

await page.screenshot({
  path: 'screenshots/3-found.png',
  fullPage: false,
});

console.log('Screenshot 3 taken: 3-found.png');

// Try a 4th
for (let i = 0; i < 3; i++) {
  const canvases = page.locator('canvas');
  const bbox = await canvases.first().boundingBox();
  if (bbox) {
    const x = bbox.width * (0.2 + Math.random() * 0.6);
    const y = bbox.height * (0.2 + Math.random() * 0.6);
    await page.click('canvas', { position: { x, y } });
    await page.waitForTimeout(200);
  }
}

await page.screenshot({
  path: 'screenshots/4-multiple.png',
  fullPage: false,
});

console.log('Screenshot 4 taken: 4-multiple.png');

await browser.close();
server.close();
console.log('Screenshots complete');
