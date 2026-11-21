import { SceneArt } from './scene-art.js';

export class SceneGenerator {
  constructor() {
    this.art = new SceneArt();
    this.scenes = this.generateScenes();
  }

  generateScenes() {
    return this.art.scenes.map((scene, idx) => ({
      name: scene.name,
      draw: scene.draw,
      diffs: this.generateDiffs(idx)
    }));
  }

  generateDiffs(sceneIdx) {
    const diffs = [
      [
        { x: 0.15, y: 0.2, radius: 0.05 },
        { x: 0.5, y: 0.45, radius: 0.06 },
        { x: 0.75, y: 0.35, radius: 0.04 },
        { x: 0.3, y: 0.65, radius: 0.05 },
        { x: 0.85, y: 0.6, radius: 0.04 },
        { x: 0.4, y: 0.15, radius: 0.05 },
        { x: 0.6, y: 0.7, radius: 0.06 }
      ],
      [
        { x: 0.2, y: 0.25, radius: 0.05 },
        { x: 0.6, y: 0.5, radius: 0.06 },
        { x: 0.8, y: 0.3, radius: 0.04 },
        { x: 0.25, y: 0.7, radius: 0.05 },
        { x: 0.75, y: 0.65, radius: 0.04 },
        { x: 0.45, y: 0.1, radius: 0.05 },
        { x: 0.65, y: 0.75, radius: 0.06 }
      ],
      [
        { x: 0.1, y: 0.3, radius: 0.06 },
        { x: 0.55, y: 0.4, radius: 0.05 },
        { x: 0.85, y: 0.25, radius: 0.05 },
        { x: 0.35, y: 0.6, radius: 0.06 },
        { x: 0.7, y: 0.7, radius: 0.04 },
        { x: 0.5, y: 0.15, radius: 0.05 },
        { x: 0.2, y: 0.75, radius: 0.06 }
      ]
    ];
    return diffs[sceneIdx] || diffs[0];
  }
}
