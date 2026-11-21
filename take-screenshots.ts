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

// Screenshot 0: Title screen - wait for animations
await page.waitForTimeout(2000);
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

// Find canvas elements
const leftCanvas = page.locator('canvas').first();

// Wait for timer to run
await page.waitForTimeout(3000);

// Click on Beach scene differences
const diffsToClick = [
  { x: 0.85, y: 0.15 },
  { x: 0.65, y: 0.38 },
  { x: 0.45, y: 0.58 },
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

await page.waitForTimeout(2000);

// Screenshot 1: Beach scene playing (COVER)
await page.screenshot({
  path: 'screenshots/1-play.png',
  fullPage: false,
});
console.log('Screenshot 1 taken: 1-play.png (cover)');

// Complete beach scene
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

// Continue through scenes to Lantern Market
await page.click('button#nextBtn');
await page.waitForTimeout(500);

// Complete Forest
const forest2Diffs = [
  { x: 0.85, y: 0.15 }, { x: 0.5, y: 0.42 }, { x: 0.35, y: 0.62 },
  { x: 0.4, y: 0.58 }, { x: 0.62, y: 0.3 }, { x: 0.55, y: 0.56 },
  { x: 0.25, y: 0.22 }
];

for (const diff of forest2Diffs) {
  const bbox = await leftCanvas.boundingBox();
  if (bbox) {
    const clickX = bbox.x + bbox.width * diff.x;
    const clickY = bbox.y + bbox.height * diff.y;
    await page.mouse.click(clickX, clickY);
    await page.waitForTimeout(150);
  }
}

await page.waitForTimeout(500);
await page.click('button#nextBtn');
await page.waitForTimeout(500);

// Complete Mountain
const mountain3Diffs = [
  { x: 0.7, y: 0.6 }, { x: 0.45, y: 0.76 }, { x: 0.15, y: 0.08 },
  { x: 0.5, y: 0.25 }, { x: 0.25, y: 0.3 }, { x: 0.68, y: 0.77 },
  { x: 0.7, y: 0.55 }
];

for (const diff of mountain3Diffs) {
  const bbox = await leftCanvas.boundingBox();
  if (bbox) {
    const clickX = bbox.x + bbox.width * diff.x;
    const clickY = bbox.y + bbox.height * diff.y;
    await page.mouse.click(clickX, clickY);
    await page.waitForTimeout(150);
  }
}

await page.waitForTimeout(500);
await page.click('button#nextBtn');
await page.waitForTimeout(500);

// Now at Lantern Market - click some diffs
await page.waitForTimeout(2000);

const lanternDiffs = [
  { x: 0.25, y: 0.37 },
  { x: 0.47, y: 0.4 },
  { x: 0.35, y: 0.75 },
];

for (const diff of lanternDiffs) {
  const bbox = await leftCanvas.boundingBox();
  if (bbox) {
    const clickX = bbox.x + bbox.width * diff.x;
    const clickY = bbox.y + bbox.height * diff.y;
    await page.mouse.click(clickX, clickY);
    await page.waitForTimeout(400);
  }
}

await page.waitForTimeout(1500);

// Screenshot 2: Lantern Market playing
await page.screenshot({
  path: 'screenshots/2-lantern.png',
  fullPage: false,
});
console.log('Screenshot 2 taken: 2-lantern.png');

// Complete Lantern Market
const lanternRemaining = [
  { x: 0.15, y: 0.68 },
  { x: 0.7, y: 0.1 },
  { x: 0.85, y: 0.2 },
  { x: 0.5, y: 0.88 }
];

for (const diff of lanternRemaining) {
  const bbox = await leftCanvas.boundingBox();
  if (bbox) {
    const clickX = bbox.x + bbox.width * diff.x;
    const clickY = bbox.y + bbox.height * diff.y;
    await page.mouse.click(clickX, clickY);
    await page.waitForTimeout(150);
  }
}

await page.waitForTimeout(500);
await page.click('button#nextBtn');
await page.waitForTimeout(500);

// Now at Clockwork Garden - click some diffs
await page.waitForTimeout(2000);

const clockworkDiffs = [
  { x: 0.3, y: 0.35 },
  { x: 0.5, y: 0.25 },
];

for (const diff of clockworkDiffs) {
  const bbox = await leftCanvas.boundingBox();
  if (bbox) {
    const clickX = bbox.x + bbox.width * diff.x;
    const clickY = bbox.y + bbox.height * diff.y;
    await page.mouse.click(clickX, clickY);
    await page.waitForTimeout(400);
  }
}

await page.waitForTimeout(1500);

// Screenshot 3: Clockwork Garden playing
await page.screenshot({
  path: 'screenshots/3-clockwork.png',
  fullPage: false,
});
console.log('Screenshot 3 taken: 3-clockwork.png');

await browser.close();
server.close();
console.log('Screenshots complete');
