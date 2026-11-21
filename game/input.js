import { GAME_CONFIG } from './config.js';

export class InputHandler {
  constructor(renderer, onDifferenceClick, onHint, onPause, onRestart, onMute) {
    this.renderer = renderer;
    this.onDifferenceClick = onDifferenceClick;
    this.onHint = onHint;
    this.onPause = onPause;
    this.onRestart = onRestart;
    this.onMute = onMute;
    
    this.crosshairCanvas = null;
    this.crosshairPos = null;
    
    this.setupCanvasListeners();
    this.setupKeyboardListeners();
  }

  setupCanvasListeners() {
    [this.renderer.leftCanvas, this.renderer.rightCanvas].forEach(canvas => {
      canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
      canvas.addEventListener('click', (e) => this.handleCanvasClick(e));
      canvas.addEventListener('mouseleave', () => {
        this.crosshairPos = null;
      });
    });
  }

  handleMouseMove(e) {
    const canvas = e.target;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    this.crosshairCanvas = canvas;
    this.crosshairPos = { x, y };
  }

  handleCanvasClick(e) {
    const canvas = e.target;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const isLeft = canvas === this.renderer.leftCanvas;
    this.onDifferenceClick(x, y, isLeft);
  }

  setupKeyboardListeners() {
    document.addEventListener('keydown', (e) => {
      switch (e.key.toUpperCase()) {
        case 'H':
          this.onHint();
          break;
        case 'P':
          this.onPause();
          break;
        case 'R':
          this.onRestart();
          break;
        case 'M':
          this.onMute();
          break;
      }
    });
  }

  getCheckDifferences(scene, x, y, isLeft) {
    const w = GAME_CONFIG.CANVAS_WIDTH;
    const h = GAME_CONFIG.CANVAS_HEIGHT;
    
    const clickRadius = 30;
    const results = [];
    
    scene.diffs.forEach((diff, idx) => {
      const diffX = diff.x * w;
      const diffY = diff.y * h;
      const diffRadius = diff.radius * w;
      
      const dist = Math.hypot(x - diffX, y - diffY);
      if (dist < clickRadius + diffRadius) {
        results.push(idx);
      }
    });
    
    return results;
  }

  drawCrosshair() {
    if (this.crosshairPos && this.crosshairCanvas) {
      this.renderer.drawCrosshair(this.crosshairCanvas, this.crosshairPos.x, this.crosshairPos.y);
    }
  }
}
