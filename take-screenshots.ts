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
console.log(`Server started on http://localhost:${PORT}`);

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 1280, height: 720 });

await page.goto(`http://localhost:${PORT}`, { waitUntil: 'networkidle' });

mkdirSync('screenshots', { recursive: true });

// Screenshot 0: Title screen  
await page.screenshot({
  path: 'screenshots/4-title.jpg',
  fullPage: false,
  quality: 75,
  type: 'jpeg',
});
console.log('Screenshot 4 taken: 4-title.jpg');

// Start game
await page.click('button#startBtn');
await page.waitForTimeout(500);

// Find canvas elements and get their positions
const leftCanvas = page.locator('canvas').first();
const rightCanvas = page.locator('canvas').nth(1);

// Wait for timer to run a bit
await page.waitForTimeout(3000);

// Click on actual differences based on scene data
const diffsToClick = [
  { x: 0.85, y: 0.15 },  // Sun
  { x: 0.65, y: 0.38 },  // Umbrella
  { x: 0.45, y: 0.58 },  // Sailboat
];

for (const diff of diffsToClick) {
  const bbox = await leftCanvas.boundingBox();
  if (bbox) {
    const clickX = bbox.x + bbox.width * diff.x;
    const clickY = bbox.y + bbox.height * diff.y;
    await page.mouse.click(clickX, clickY);
    await page.waitForTimeout(400);
  }
}

// Wait for timer to run more
await page.waitForTimeout(2000);

// Screenshot 2: Playing with some found (COVER)
await page.screenshot({
  path: 'screenshots/1-play.png',
  fullPage: false,
});
console.log('Screenshot 1 taken: 1-play.png (cover)');

// Click remaining differences to complete scene
const remainingDiffs = [
  { x: 0.5, y: 0.3 },
  { x: 0.3, y: 0.5 },
  { x: 0.55, y: 0.25 },
  { x: 0.75, y: 0.52 },
];

for (const diff of remainingDiffs) {
  const bbox = await leftCanvas.boundingBox();
  if (bbox) {
    const clickX = bbox.x + bbox.width * diff.x;
    const clickY = bbox.y + bbox.height * diff.y;
    await page.mouse.click(clickX, clickY);
    await page.waitForTimeout(200);
  }
}

await page.waitForTimeout(500);

// Screenshot 3: Scene complete overlay
await page.screenshot({
  path: 'screenshots/2-complete.png',
  fullPage: false,
});
console.log('Screenshot 2 taken: 2-complete.png');

// Continue to next scene
await page.click('button#nextBtn');
await page.waitForTimeout(500);

// Click a few in scene 2
const scene2Diffs = [
  { x: 0.85, y: 0.15 },
  { x: 0.4, y: 0.58 },
];

for (const diff of scene2Diffs) {
  const bbox = await leftCanvas.boundingBox();
  if (bbox) {
    const clickX = bbox.x + bbox.width * diff.x;
    const clickY = bbox.y + bbox.height * diff.y;
    await page.mouse.click(clickX, clickY);
    await page.waitForTimeout(300);
  }
}

// Screenshot 4: Scene 2 in progress
await page.screenshot({
  path: 'screenshots/3-scene2.png',
  fullPage: false,
});
console.log('Screenshot 3 taken: 3-scene2.png');

await browser.close();
server.close();
console.log('Screenshots complete');
