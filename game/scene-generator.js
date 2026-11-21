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
        { x: 0.15, y: 0.15, radius: 0.08, xLeft: 0.15, yLeft: 0.15, xRight: 0.85, yRight: 0.15 },
        { x: 0.5, y: 0.3, radius: 0.07 },
        { x: 0.65, y: 0.38, radius: 0.07 },
        { x: 0.45, y: 0.58, radius: 0.06 },
        { x: 0.75, y: 0.52, radius: 0.05 },
        { x: 0.55, y: 0.25, radius: 0.05 },
        { x: 0.3, y: 0.5, radius: 0.05 }
      ],
      [
        { x: 0.85, y: 0.15, radius: 0.05 },
        { x: 0.5, y: 0.42, radius: 0.05 },
        { x: 0.35, y: 0.62, radius: 0.05 },
        { x: 0.4, y: 0.58, radius: 0.05 },
        { x: 0.62, y: 0.3, radius: 0.05 },
        { x: 0.55, y: 0.56, radius: 0.05 },
        { x: 0.25, y: 0.22, radius: 0.05 }
      ],
      [
        { x: 0.7, y: 0.6, radius: 0.07 },
        { x: 0.45, y: 0.76, radius: 0.08 },
        { x: 0.15, y: 0.08, radius: 0.05 },
        { x: 0.5, y: 0.25, radius: 0.06 },
        { x: 0.25, y: 0.3, radius: 0.05 },
        { x: 0.68, y: 0.77, radius: 0.05 },
        { x: 0.35, y: 0.68, radius: 0.05 }
      ],
      [
        { x: 0.18, y: 0.43, radius: 0.055 },
        { x: 0.35, y: 0.45, radius: 0.055 },
        { x: 0.52, y: 0.43, radius: 0.055 },
        { x: 0.69, y: 0.46, radius: 0.055 },
        { x: 0.86, y: 0.44, radius: 0.055 },
        { x: 0.25, y: 0.75, radius: 0.05 },
        { x: 0.15, y: 0.68, radius: 0.05 }
      ],
      [
        { x: 0.25, y: 0.3, radius: 0.14 },
        { x: 0.58, y: 0.5, radius: 0.055 },
        { x: 0.08, y: 0.82, radius: 0.05 },
        { x: 0.5, y: 0.2, radius: 0.09 },
        { x: 0.88, y: 0.25, radius: 0.07 },
        { x: 0.45, y: 0.73, radius: 0.05 },
        { x: 0.22, y: 0.82, radius: 0.05 }
      ]
    ];
    return diffs[sceneIdx] || diffs[0];
  }
}
