import { GAME_CONFIG } from './config.js';

export class Renderer {
  constructor(canvases) {
    this.leftCanvas = canvases[0];
    this.rightCanvas = canvases[1];
    this.leftCtx = this.leftCanvas.getContext('2d');
    this.rightCtx = this.rightCanvas.getContext('2d');
  }

  drawScene(scene, gameState) {
    this.clearCanvases();
    
    const w = GAME_CONFIG.CANVAS_WIDTH;
    const h = GAME_CONFIG.CANVAS_HEIGHT;
    
    scene.draw(this.leftCtx, w, h, true);
    scene.draw(this.rightCtx, w, h, false);
    
    this.drawFoundMarkers(scene, gameState);
  }

  clearCanvases() {
    const w = GAME_CONFIG.CANVAS_WIDTH;
    const h = GAME_CONFIG.CANVAS_HEIGHT;
    
    this.leftCtx.fillStyle = 'white';
    this.leftCtx.fillRect(0, 0, w, h);
    
    this.rightCtx.fillStyle = 'white';
    this.rightCtx.fillRect(0, 0, w, h);
  }

  drawFoundMarkers(scene, gameState) {
    const w = GAME_CONFIG.CANVAS_WIDTH;
    const h = GAME_CONFIG.CANVAS_HEIGHT;
    
    for (const diffIdx of gameState.found) {
      if (diffIdx < scene.diffs.length) {
        const diff = scene.diffs[diffIdx];
        const x = diff.x * w;
        const y = diff.y * h;
        const r = diff.radius * w;
        
        this.drawMarker(this.leftCtx, x, y, r);
        this.drawMarker(this.rightCtx, x, y, r);
      }
    }
  }

  drawMarker(ctx, x, y, r) {
    ctx.strokeStyle = '#00FF00';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.stroke();
    
    ctx.fillStyle = 'rgba(0, 255, 0, 0.1)';
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  drawCrosshair(canvas, x, y) {
    const ctx = canvas === this.leftCanvas ? this.leftCtx : this.rightCtx;
    const size = 15;
    
    ctx.strokeStyle = '#FF0000';
    ctx.lineWidth = 2;
    
    ctx.beginPath();
    ctx.moveTo(x - size, y);
    ctx.lineTo(x + size, y);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(x, y - size);
    ctx.lineTo(x, y + size);
    ctx.stroke();
  }
}
