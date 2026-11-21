import { buildDossier } from './vendor/makefun-game.ts';
import { writeFileSync, copyFileSync, mkdirSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const outputDir = process.env.MAKEFUN_OUTPUT_DIR || '/output';

function copyDir(src: string, dest: string) {
  mkdirSync(dest, { recursive: true });
  const files = readdirSync(src, { withFileTypes: true });
  files.forEach(file => {
    const srcPath = join(src, file.name);
    const destPath = join(dest, file.name);
    if (file.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      copyFileSync(srcPath, destPath);
    }
  });
}

copyDir('game', join(outputDir, 'game'));
copyDir('screenshots', join(outputDir, 'screenshots'));

const dossier = buildDossier(outputDir, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  game_max_files: 993,
  game_max_bytes: 50331648,
  game_path_max_bytes: 1000,
});

writeFileSync(`${outputDir}/dossier.json`, dossier);
console.log('Dossier written successfully');
