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
        { x: 0.85, y: 0.15, radius: 0.08 },   // Sun position
        { x: 0.5, y: 0.3, radius: 0.07 },     // Cloud
        { x: 0.65, y: 0.38, radius: 0.07 },   // Umbrella color
        { x: 0.45, y: 0.58, radius: 0.06 },   // Sailboat sail color
        { x: 0.75, y: 0.52, radius: 0.03 },   // Starfish
        { x: 0.55, y: 0.25, radius: 0.05 },   // Seagull position
        { x: 0.3, y: 0.5, radius: 0.03 }      // Starfish
      ],
      [
        { x: 0.85, y: 0.15, radius: 0.06 },   // Sun position
        { x: 0.5, y: 0.42, radius: 0.1 },     // Front tree position
        { x: 0.35, y: 0.62, radius: 0.025 },  // Mushroom
        { x: 0.4, y: 0.58, radius: 0.02 },    // Flower color
        { x: 0.62, y: 0.3, radius: 0.03 },    // Butterfly position
        { x: 0.55, y: 0.56, radius: 0.02 },   // Flower
        { x: 0.25, y: 0.22, radius: 0.02 }    // Bird
      ],
      [
        { x: 0.7, y: 0.6, radius: 0.07 },     // Cabin position
        { x: 0.45, y: 0.76, radius: 0.08 },   // Lake highlight
        { x: 0.15, y: 0.08, radius: 0.02 },   // Star
        { x: 0.5, y: 0.25, radius: 0.06 },    // Snow on peak
        { x: 0.25, y: 0.3, radius: 0.04 },    // Back mountain snow
        { x: 0.68, y: 0.77, radius: 0.03 },   // Rock
        { x: 0.7, y: 0.55, radius: 0.05 }     // Smoke
      ]
    ];
    return diffs[sceneIdx] || diffs[0];
  }
}
