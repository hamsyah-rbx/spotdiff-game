export class SceneArt {
  constructor() {
    this.scenes = this.createScenes();
  }

  createScenes() {
    return [
      { name: 'Beach Paradise', draw: (ctx, w, h, isLeft) => this.drawBeach(ctx, w, h, isLeft) },
      { name: 'Forest Magic', draw: (ctx, w, h, isLeft) => this.drawForest(ctx, w, h, isLeft) },
      { name: 'Mountain Peak', draw: (ctx, w, h, isLeft) => this.drawMountain(ctx, w, h, isLeft) },
    ];
  }

  drawBeach(ctx, w, h, isLeft) {
    // Sky gradient
    const skyGrad = ctx.createLinearGradient(0, 0, 0, h * 0.5);
    skyGrad.addColorStop(0, '#87CEEB');
    skyGrad.addColorStop(1, '#E0F6FF');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, w, h * 0.5);

    // Sea
    ctx.fillStyle = '#1E90FF';
    ctx.fillRect(0, h * 0.5, w, h * 0.5);

    // Sand
    ctx.fillStyle = '#F4A460';
    ctx.fillRect(0, h * 0.45, w, h * 0.1);

    // Sun
    const sunX = isLeft ? w * 0.85 : w * 0.15;
    ctx.fillStyle = '#FFD700';
    ctx.beginPath();
    ctx.arc(sunX, h * 0.15, w * 0.08, 0, Math.PI * 2);
    ctx.fill();

    // Sun rays
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 2;
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const x1 = sunX + Math.cos(angle) * w * 0.09;
      const y1 = h * 0.15 + Math.sin(angle) * w * 0.09;
      const x2 = sunX + Math.cos(angle) * w * 0.13;
      const y2 = h * 0.15 + Math.sin(angle) * w * 0.13;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    // Clouds
    this.drawCloud(ctx, w * 0.3, h * 0.2, w * 0.08);
    this.drawCloud(ctx, w * 0.7, h * 0.25, w * 0.06);
    if (!isLeft) {
      this.drawCloud(ctx, w * 0.5, h * 0.3, w * 0.07);
    }

    // Palm tree
    ctx.strokeStyle = '#8B4513';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(w * 0.2, h * 0.45);
    ctx.lineTo(w * 0.2, h * 0.25);
    ctx.stroke();

    // Palm leaves
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2 - Math.PI / 2;
      const x = w * 0.2 + Math.cos(angle) * w * 0.1;
      const y = h * 0.25 + Math.sin(angle) * h * 0.08;
      ctx.strokeStyle = '#228B22';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(w * 0.2, h * 0.25);
      ctx.lineTo(x, y);
      ctx.stroke();
    }

    // Beach umbrella
    const umbX = w * 0.6;
    const umbY = h * 0.42;
    ctx.fillStyle = isLeft ? '#FF6347' : '#FFB6C1';
    ctx.beginPath();
    ctx.arc(umbX, umbY, w * 0.06, 0, Math.PI);
    ctx.fill();
    ctx.strokeStyle = '#FF6347';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.strokeStyle = '#8B4513';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(umbX, umbY);
    ctx.lineTo(umbX, umbY + h * 0.08);
    ctx.stroke();

    // Starfish
    this.drawStarfish(ctx, w * 0.35, h * 0.5, w * 0.04);
    this.drawStarfish(ctx, w * 0.75, h * 0.55, w * 0.035);

    // Waves
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 2;
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.arc(w * 0.5, h * (0.52 + i * 0.08), w * 0.15, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  drawForest(ctx, w, h, isLeft) {
    // Sky
    const skyGrad = ctx.createLinearGradient(0, 0, 0, h * 0.6);
    skyGrad.addColorStop(0, '#87CEEB');
    skyGrad.addColorStop(1, '#E8F4F8');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, w, h * 0.6);

    // Ground
    ctx.fillStyle = '#8B6F47';
    ctx.fillRect(0, h * 0.6, w, h * 0.4);

    // Grass
    ctx.fillStyle = '#228B22';
    ctx.fillRect(0, h * 0.55, w, h * 0.08);

    // Moon/sun
    ctx.fillStyle = '#FFD700';
    ctx.beginPath();
    ctx.arc(isLeft ? w * 0.85 : w * 0.15, h * 0.15, w * 0.06, 0, Math.PI * 2);
    ctx.fill();

    // Trees
    this.drawTree(ctx, w * 0.15, h * 0.5, w * 0.08, h * 0.25);
    this.drawTree(ctx, w * 0.5, h * 0.45, w * 0.1, h * 0.3);
    if (!isLeft) {
      this.drawTree(ctx, w * 0.8, h * 0.52, w * 0.075, h * 0.22);
    } else {
      this.drawTree(ctx, w * 0.8, h * 0.52, w * 0.065, h * 0.22);
    }

    // Mushrooms
    this.drawMushroom(ctx, w * 0.25, h * 0.62, w * 0.035);
    this.drawMushroom(ctx, w * 0.7, h * 0.65, w * 0.03);

    // Flowers
    this.drawFlower(ctx, w * 0.35, h * 0.58, w * 0.025, '#FF1493');
    this.drawFlower(ctx, w * 0.65, h * 0.59, w * 0.025, '#FFD700');

    // Butterfly
    const buttX = w * (isLeft ? 0.6 : 0.4);
    const buttY = h * 0.35;
    this.drawButterfly(ctx, buttX, buttY, w * 0.03);

    // Rocks
    ctx.fillStyle = '#696969';
    ctx.beginPath();
    ctx.arc(w * 0.3, h * 0.65, w * 0.04, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(w * 0.8, h * 0.72, w * 0.035, 0, Math.PI * 2);
    ctx.fill();
  }

  drawMountain(ctx, w, h, isLeft) {
    // Sky gradient
    const skyGrad = ctx.createLinearGradient(0, 0, 0, h * 0.7);
    skyGrad.addColorStop(0, '#4B0082');
    skyGrad.addColorStop(0.5, '#1E90FF');
    skyGrad.addColorStop(1, '#FFB6C1');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, w, h * 0.7);

    // Mountains back
    ctx.fillStyle = '#696969';
    ctx.beginPath();
    ctx.moveTo(0, h * 0.5);
    ctx.lineTo(w * 0.3, h * 0.2);
    ctx.lineTo(w * 0.6, h * 0.45);
    ctx.lineTo(w, h * 0.35);
    ctx.lineTo(w, h * 0.7);
    ctx.lineTo(0, h * 0.7);
    ctx.fill();

    // Snow caps
    ctx.fillStyle = '#FFF';
    ctx.beginPath();
    ctx.moveTo(w * 0.25, h * 0.25);
    ctx.lineTo(w * 0.3, h * 0.2);
    ctx.lineTo(w * 0.35, h * 0.25);
    ctx.fill();

    // Main mountain
    ctx.fillStyle = '#8B4513';
    ctx.beginPath();
    ctx.moveTo(0, h * 0.7);
    ctx.lineTo(w * 0.5, h * 0.15);
    ctx.lineTo(w, h * 0.7);
    ctx.fill();

    // Snow on main peak
    ctx.fillStyle = '#FFF';
    ctx.beginPath();
    ctx.moveTo(w * 0.45, h * 0.2);
    ctx.lineTo(w * 0.5, h * 0.15);
    ctx.lineTo(w * 0.55, h * 0.2);
    ctx.fill();

    // Forest at base
    this.drawTree(ctx, w * 0.1, h * 0.6, w * 0.07, h * 0.15);
    this.drawTree(ctx, w * 0.25, h * 0.65, w * 0.06, h * 0.1);
    this.drawTree(ctx, w * 0.75, h * 0.63, w * 0.065, h * 0.12);

    // Cabin
    if (isLeft) {
      this.drawCabin(ctx, w * 0.65, h * 0.58, w * 0.06);
    }

    // Stars
    ctx.fillStyle = '#FFD700';
    const starPositions = [
      [w * 0.2, h * 0.1], [w * 0.8, h * 0.15], [w * 0.3, h * 0.05], [w * 0.9, h * 0.08]
    ];
    starPositions.forEach(([sx, sy]) => {
      this.drawStar(ctx, sx, sy, w * 0.008);
    });

    // Lake
    ctx.fillStyle = 'rgba(30, 144, 255, 0.6)';
    ctx.beginPath();
    ctx.ellipse(w * 0.5, h * 0.75, w * 0.2, h * 0.08, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  drawTree(ctx, x, y, w, h) {
    // Trunk
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(x - w * 0.2, y, w * 0.4, h * 0.3);

    // Foliage
    ctx.fillStyle = '#228B22';
    ctx.beginPath();
    ctx.arc(x, y - h * 0.15, w * 0.6, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x - w * 0.25, y - h * 0.05, w * 0.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x + w * 0.25, y - h * 0.05, w * 0.5, 0, Math.PI * 2);
    ctx.fill();
  }

  drawCloud(ctx, x, y, r) {
    ctx.fillStyle = '#FFF';
    ctx.beginPath();
    ctx.arc(x - r, y, r, 0, Math.PI * 2);
    ctx.arc(x, y - r * 0.5, r * 1.2, 0, Math.PI * 2);
    ctx.arc(x + r, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  drawStarfish(ctx, x, y, r) {
    ctx.fillStyle = '#FF6347';
    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
      const px = x + Math.cos(angle) * r;
      const py = y + Math.sin(angle) * r;
      ctx.beginPath();
      ctx.arc(px, py, r * 0.4, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  drawMushroom(ctx, x, y, r) {
    ctx.fillStyle = '#FF6347';
    ctx.beginPath();
    ctx.arc(x, y - r * 0.8, r * 0.9, 0, Math.PI);
    ctx.fill();
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(x - r * 0.2, y - r * 0.8, r * 0.4, r * 0.8);
    ctx.fillStyle = '#FFF';
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.arc(x - r * 0.5 + i * r * 0.5, y - r * 1.3, r * 0.15, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  drawFlower(ctx, x, y, r, color) {
    // Petals
    ctx.fillStyle = color;
    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * Math.PI * 2;
      const px = x + Math.cos(angle) * r * 1.5;
      const py = y + Math.sin(angle) * r * 1.5;
      ctx.beginPath();
      ctx.ellipse(px, py, r * 0.6, r, angle, 0, Math.PI * 2);
      ctx.fill();
    }
    // Center
    ctx.fillStyle = '#FFD700';
    ctx.beginPath();
    ctx.arc(x, y, r * 0.5, 0, Math.PI * 2);
    ctx.fill();
    // Stem
    ctx.strokeStyle = '#228B22';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + r * 3);
    ctx.stroke();
  }

  drawButterfly(ctx, x, y, r) {
    ctx.fillStyle = '#FF1493';
    ctx.beginPath();
    ctx.ellipse(x - r, y, r * 0.8, r * 1.5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(x + r, y, r * 0.8, r * 1.5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#8B008B';
    ctx.beginPath();
    ctx.arc(x - r, y - r, r * 0.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x + r, y - r, r * 0.4, 0, Math.PI * 2);
    ctx.fill();
  }

  drawCabin(ctx, x, y, s) {
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(x - s, y - s, s * 2, s * 1.5);
    ctx.fillStyle = '#D2691E';
    ctx.fillRect(x - s * 0.4, y - s * 0.3, s * 0.8, s * 0.6);
    ctx.fillStyle = '#000';
    ctx.fillRect(x - s * 0.15, y - s * 0.1, s * 0.3, s * 0.3);
  }

  drawStar(ctx, x, y, r) {
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
      const px = x + Math.cos(angle) * r * 2;
      const py = y + Math.sin(angle) * r * 2;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
      const angle2 = ((i + 0.5) / 5) * Math.PI * 2 - Math.PI / 2;
      const px2 = x + Math.cos(angle2) * r;
      const py2 = y + Math.sin(angle2) * r;
      ctx.lineTo(px2, py2);
    }
    ctx.closePath();
    ctx.fill();
  }
}
