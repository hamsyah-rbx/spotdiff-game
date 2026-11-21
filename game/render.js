import { GAME_CONFIG } from './config.js';

export class Renderer {
  constructor(canvases) {
    this.leftCanvas = canvases[0];
    this.rightCanvas = canvases[1];
    this.leftCtx = this.leftCanvas.getContext('2d');
    this.rightCtx = this.rightCanvas.getContext('2d');
    this.markerAnimTime = 0;
    this.crosshairPos = { x: 0, y: 0 };
    this.activeCrosshair = null;
    this.hintTarget = null;
    this.hintAnimTime = 0;
  }

  drawScene(scene, found) {
    const w = GAME_CONFIG.CANVAS_WIDTH;
    const h = GAME_CONFIG.CANVAS_HEIGHT;
    
    this.leftCtx.fillStyle = 'white';
    this.leftCtx.fillRect(0, 0, w, h);
    this.rightCtx.fillStyle = 'white';
    this.rightCtx.fillRect(0, 0, w, h);
    
    scene.draw(this.leftCtx, w, h, true);
    scene.draw(this.rightCtx, w, h, false);
    
    found.forEach(diffIdx => {
      const diff = scene.diffs[diffIdx];
      if (diff) {
        const x = diff.x * w;
        const y = diff.y * h;
        const r = diff.radius * w;
        
        this.drawFoundMarker(this.leftCtx, x, y, r);
        this.drawFoundMarker(this.rightCtx, x, y, r);
      }
    });

    if (this.hintTarget !== null && this.hintAnimTime < 2) {
      const diff = scene.diffs[this.hintTarget];
      if (diff) {
        const x = diff.x * w;
        const y = diff.y * h;
        const r = diff.radius * w;
        this.drawHintMarker(this.leftCtx, x, y, r);
        this.drawHintMarker(this.rightCtx, x, y, r);
      }
    }
  }

  drawFoundMarker(ctx, x, y, r) {
    const time = this.markerAnimTime % 1;
    const pulse = Math.sin(time * Math.PI * 2) * 0.3 + 0.7;
    
    ctx.strokeStyle = `rgba(255, 215, 0, ${pulse})`;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(x, y, r + 5, 0, Math.PI * 2);
    ctx.stroke();
    
    ctx.fillStyle = 'rgba(255, 215, 0, 0.1)';
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  drawHintMarker(ctx, x, y, r) {
    const alpha = Math.max(0, 1 - this.hintAnimTime / 2);
    const scale = 1 + this.hintAnimTime * 0.5;
    
    ctx.strokeStyle = `rgba(255, 255, 0, ${alpha * 0.8})`;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(x, y, r * scale, 0, Math.PI * 2);
    ctx.stroke();
    
    ctx.fillStyle = `rgba(255, 255, 0, ${alpha * 0.2})`;
    ctx.beginPath();
    ctx.arc(x, y, r * scale, 0, Math.PI * 2);
    ctx.fill();
  }

  showHint(diffIdx) {
    this.hintTarget = diffIdx;
    this.hintAnimTime = 0;
  }

  updateAnimation(delta) {
    this.markerAnimTime += delta;
    if (this.hintTarget !== null) {
      this.hintAnimTime += delta;
      if (this.hintAnimTime >= 2) {
        this.hintTarget = null;
      }
    }
  }

  drawCrosshair(canvas, x, y) {
    const ctx = canvas === this.leftCanvas ? this.leftCtx : this.rightCtx;
    const size = 12;
    
    ctx.strokeStyle = 'rgba(255, 0, 0, 0.6)';
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
