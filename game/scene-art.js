export class SceneArt {
  constructor() {
    this.scenes = this.createScenes();
  }

  createScenes() {
    return [
      { name: 'Beach Paradise', draw: (ctx, w, h, isLeft) => this.drawBeach(ctx, w, h, isLeft) },
      { name: 'Forest Magic', draw: (ctx, w, h, isLeft) => this.drawForest(ctx, w, h, isLeft) },
      { name: 'Mountain Peak', draw: (ctx, w, h, isLeft) => this.drawMountain(ctx, w, h, isLeft) },
      { name: 'Lantern Market', draw: (ctx, w, h, isLeft) => this.drawMarket(ctx, w, h, isLeft) },
      { name: 'Clockwork Garden', draw: (ctx, w, h, isLeft) => this.drawClockwork(ctx, w, h, isLeft) },
    ];
  }

  drawBeach(ctx, w, h, isLeft) {
    // Sky gradient
    const skyGrad = ctx.createLinearGradient(0, 0, 0, h * 0.5);
    skyGrad.addColorStop(0, '#87CEEB');
    skyGrad.addColorStop(1, '#FFE5B4');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, w, h * 0.5);

    // Sea
    const seaGrad = ctx.createLinearGradient(0, h * 0.5, 0, h * 0.85);
    seaGrad.addColorStop(0, '#1E90FF');
    seaGrad.addColorStop(1, '#006994');
    ctx.fillStyle = seaGrad;
    ctx.fillRect(0, h * 0.5, w, h * 0.35);

    // Sand
    ctx.fillStyle = '#F4A460';
    ctx.fillRect(0, h * 0.45, w, h * 0.15);
    ctx.fillStyle = '#DEB887';
    for (let i = 0; i < w; i += 30) {
      ctx.fillRect(i, h * 0.52, 15, 3);
    }

    // Beach bottom extends to edge
    ctx.fillStyle = '#D2B48C';
    ctx.fillRect(0, h * 0.85, w, h * 0.15);

    // Sun
    const sunX = isLeft ? w * 0.85 : w * 0.15;
    const sunGrad = ctx.createRadialGradient(sunX, h * 0.15, 0, sunX, h * 0.15, w * 0.1);
    sunGrad.addColorStop(0, '#FFD700');
    sunGrad.addColorStop(1, '#FFA500');
    ctx.fillStyle = sunGrad;
    ctx.beginPath();
    ctx.arc(sunX, h * 0.15, w * 0.08, 0, Math.PI * 2);
    ctx.fill();

    // Sun rays
    ctx.strokeStyle = 'rgba(255, 215, 0, 0.3)';
    ctx.lineWidth = 3;
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const x1 = sunX + Math.cos(angle) * w * 0.09;
      const y1 = h * 0.15 + Math.sin(angle) * w * 0.09;
      const x2 = sunX + Math.cos(angle) * w * 0.15;
      const y2 = h * 0.15 + Math.sin(angle) * w * 0.15;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    // Clouds
    this.drawCloud(ctx, w * 0.3, h * 0.18, w * 0.08);
    this.drawCloud(ctx, w * 0.7, h * 0.25, w * 0.06);
    if (!isLeft) {
      this.drawCloud(ctx, w * 0.5, h * 0.28, w * 0.07);
    }

    // Palm tree left
    ctx.strokeStyle = '#8B4513';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(w * 0.15, h * 0.45);
    ctx.lineTo(w * 0.15, h * 0.22);
    ctx.stroke();

    for (let i = 0; i < 10; i++) {
      const angle = (i / 10) * Math.PI * 2 - Math.PI / 2;
      const x = w * 0.15 + Math.cos(angle) * w * 0.12;
      const y = h * 0.22 + Math.sin(angle) * h * 0.09;
      ctx.strokeStyle = '#228B22';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(w * 0.15, h * 0.22);
      ctx.lineTo(x, y);
      ctx.stroke();
    }

    // Palm tree right
    ctx.strokeStyle = '#8B4513';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(w * 0.88, h * 0.45);
    ctx.lineTo(w * 0.88, h * 0.28);
    ctx.stroke();

    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2 - Math.PI / 2;
      const x = w * 0.88 + Math.cos(angle) * w * 0.1;
      const y = h * 0.28 + Math.sin(angle) * h * 0.08;
      ctx.strokeStyle = '#228B22';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(w * 0.88, h * 0.28);
      ctx.lineTo(x, y);
      ctx.stroke();
    }

    // Beach umbrella
    const umbX = w * 0.65;
    const umbY = h * 0.38;
    const umbColor = isLeft ? '#FF6347' : '#FFB6C1';
    ctx.fillStyle = umbColor;
    ctx.beginPath();
    ctx.arc(umbX, umbY, w * 0.07, 0, Math.PI);
    ctx.fill();
    
    ctx.strokeStyle = '#8B0000';
    ctx.lineWidth = 2;
    for (let i = 0; i < 8; i++) {
      const angle = Math.PI * (i / 8);
      const x = umbX + Math.cos(angle) * w * 0.07;
      const y = umbY + Math.sin(angle) * w * 0.07;
      ctx.beginPath();
      ctx.moveTo(umbX, umbY);
      ctx.lineTo(x, y);
      ctx.stroke();
    }

    ctx.strokeStyle = '#8B4513';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(umbX, umbY);
    ctx.lineTo(umbX, umbY + h * 0.1);
    ctx.stroke();

    // Sailboat
    const boatX = w * 0.45;
    const boatY = h * 0.58;
    ctx.fillStyle = '#8B4513';
    ctx.beginPath();
    ctx.moveTo(boatX - w * 0.04, boatY);
    ctx.lineTo(boatX + w * 0.04, boatY);
    ctx.lineTo(boatX + w * 0.03, boatY + h * 0.02);
    ctx.lineTo(boatX - w * 0.03, boatY + h * 0.02);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = isLeft ? '#FFF' : '#FFE4E1';
    ctx.beginPath();
    ctx.moveTo(boatX, boatY);
    ctx.lineTo(boatX, boatY - h * 0.08);
    ctx.lineTo(boatX + w * 0.05, boatY);
    ctx.closePath();
    ctx.fill();

    // Starfish
    this.drawStarfish(ctx, w * 0.3, h * 0.5, w * 0.03, '#FF6347');
    if (isLeft) {
      this.drawStarfish(ctx, w * 0.75, h * 0.52, w * 0.025, '#FF4500');
    }

    // Shells
    ctx.fillStyle = '#FFE4C4';
    ctx.beginPath();
    ctx.arc(w * 0.22, h * 0.51, w * 0.015, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(w * 0.8, h * 0.48, w * 0.018, 0, Math.PI * 2);
    ctx.fill();

    // Seagulls
    const birdY = isLeft ? h * 0.25 : h * 0.32;
    this.drawBird(ctx, w * 0.55, birdY, w * 0.02);
    this.drawBird(ctx, w * 0.6, birdY + h * 0.02, w * 0.018);

    // Waves texture
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 2;
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      for (let x = 0; x < w; x += 20) {
        const y = h * (0.52 + i * 0.05) + Math.sin((x + i * 30) * 0.05) * 5;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
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

    // Ground base
    ctx.fillStyle = '#8B6F47';
    ctx.fillRect(0, h * 0.6, w, h * 0.4);

    // Grass layers
    ctx.fillStyle = '#3A5F0B';
    ctx.fillRect(0, h * 0.58, w, h * 0.05);
    ctx.fillStyle = '#4A7C0C';
    ctx.fillRect(0, h * 0.55, w, h * 0.05);
    
    // Grass tufts instead of vertical lines
    ctx.fillStyle = '#5A9C0D';
    for (let i = 0; i < w; i += 20) {
      for (let j = 0; j < 8; j++) {
        const x = i + Math.random() * 15;
        const y = h * (0.6 + j * 0.05) + Math.random() * 10;
        ctx.fillRect(x, y, 3, 8);
      }
    }

    // Sun
    const sunX = isLeft ? w * 0.85 : w * 0.15;
    ctx.fillStyle = '#FFD700';
    ctx.beginPath();
    ctx.arc(sunX, h * 0.15, w * 0.06, 0, Math.PI * 2);
    ctx.fill();

    // Background trees (far)
    this.drawTree(ctx, w * 0.1, h * 0.52, w * 0.06, h * 0.2, '#1F4E0C');
    this.drawTree(ctx, w * 0.9, h * 0.54, w * 0.055, h * 0.18, '#1F4E0C');
    
    // Mid trees
    this.drawTree(ctx, w * 0.25, h * 0.48, w * 0.08, h * 0.28, '#228B22');
    this.drawTree(ctx, w * 0.65, h * 0.5, w * 0.075, h * 0.25, '#228B22');

    // Front tree
    const frontTreeX = isLeft ? w * 0.5 : w * 0.52;
    this.drawTree(ctx, frontTreeX, h * 0.42, w * 0.1, h * 0.35, '#2E8B57');

    // Bushes
    ctx.fillStyle = '#3CB371';
    ctx.beginPath();
    ctx.ellipse(w * 0.18, h * 0.62, w * 0.06, h * 0.05, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(w * 0.82, h * 0.64, w * 0.055, h * 0.045, 0, 0, Math.PI * 2);
    ctx.fill();

    // Mushrooms
    this.drawMushroom(ctx, w * 0.3, h * 0.65, w * 0.03);
    this.drawMushroom(ctx, w * 0.72, h * 0.68, w * 0.028);
    if (!isLeft) {
      this.drawMushroom(ctx, w * 0.35, h * 0.62, w * 0.025);
    }

    // Flowers
    this.drawFlower(ctx, w * 0.4, h * 0.58, w * 0.02, isLeft ? '#FF1493' : '#FF69B4');
    this.drawFlower(ctx, w * 0.68, h * 0.6, w * 0.022, '#FFD700');
    this.drawFlower(ctx, w * 0.55, h * 0.56, w * 0.018, '#9370DB');

    // Butterfly
    const buttX = isLeft ? w * 0.62 : w * 0.38;
    const buttY = h * 0.3;
    this.drawButterfly(ctx, buttX, buttY, w * 0.025);

    // Rocks
    ctx.fillStyle = '#696969';
    ctx.beginPath();
    ctx.ellipse(w * 0.15, h * 0.68, w * 0.035, h * 0.025, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(w * 0.85, h * 0.72, w * 0.03, h * 0.022, 0, 0, Math.PI * 2);
    ctx.fill();

    // Path
    ctx.fillStyle = '#A0826D';
    ctx.beginPath();
    ctx.moveTo(w * 0.45, h * 0.55);
    ctx.lineTo(w * 0.48, h);
    ctx.lineTo(w * 0.52, h);
    ctx.lineTo(w * 0.55, h * 0.55);
    ctx.closePath();
    ctx.fill();

    // Birds
    this.drawBird(ctx, w * 0.25, h * 0.22, w * 0.015);
    this.drawBird(ctx, w * 0.3, h * 0.18, w * 0.013);
  }

  drawMountain(ctx, w, h, isLeft) {
    // Sky gradient
    const skyGrad = ctx.createLinearGradient(0, 0, 0, h * 0.7);
    skyGrad.addColorStop(0, '#1C1C4D');
    skyGrad.addColorStop(0.3, '#4B0082');
    skyGrad.addColorStop(0.6, '#1E90FF');
    skyGrad.addColorStop(1, '#FFB6C1');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, w, h * 0.7);

    // Back mountains
    ctx.fillStyle = '#696969';
    ctx.beginPath();
    ctx.moveTo(0, h * 0.5);
    ctx.lineTo(w * 0.25, h * 0.25);
    ctx.lineTo(w * 0.5, h * 0.42);
    ctx.lineTo(w * 0.75, h * 0.3);
    ctx.lineTo(w, h * 0.45);
    ctx.lineTo(w, h * 0.7);
    ctx.lineTo(0, h * 0.7);
    ctx.fill();

    // Snow caps back
    ctx.fillStyle = '#FFF';
    ctx.beginPath();
    ctx.moveTo(w * 0.2, h * 0.3);
    ctx.lineTo(w * 0.25, h * 0.25);
    ctx.lineTo(w * 0.3, h * 0.3);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(w * 0.7, h * 0.35);
    ctx.lineTo(w * 0.75, h * 0.3);
    ctx.lineTo(w * 0.8, h * 0.35);
    ctx.fill();

    // Main mountain
    ctx.fillStyle = '#5C4033';
    ctx.beginPath();
    ctx.moveTo(0, h * 0.7);
    ctx.lineTo(w * 0.5, h * 0.12);
    ctx.lineTo(w, h * 0.7);
    ctx.fill();

    // Shadow on mountain
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.beginPath();
    ctx.moveTo(w * 0.5, h * 0.12);
    ctx.lineTo(w, h * 0.7);
    ctx.lineTo(w * 0.5, h * 0.7);
    ctx.fill();

    // Snow on main peak
    ctx.fillStyle = '#FFF';
    ctx.beginPath();
    ctx.moveTo(w * 0.42, h * 0.2);
    ctx.lineTo(w * 0.5, h * 0.12);
    ctx.lineTo(w * 0.58, h * 0.2);
    ctx.lineTo(w * 0.5, h * 0.25);
    ctx.fill();

    // Ground at bottom
    ctx.fillStyle = '#2F4F2F';
    ctx.fillRect(0, h * 0.7, w, h * 0.3);

    // Trees at base - layered
    for (let i = 0; i < 8; i++) {
      const tx = w * (0.1 + i * 0.11);
      const ty = h * (0.62 + Math.sin(i) * 0.03);
      const tw = w * 0.05;
      const th = h * 0.12;
      this.drawTree(ctx, tx, ty, tw, th, '#1F4E0C');
    }

    // Cabin
    const cabinX = isLeft ? w * 0.7 : w * 0.3;
    this.drawCabin(ctx, cabinX, h * 0.6, w * 0.07);

    // Smoke from cabin
    if (isLeft) {
      ctx.fillStyle = 'rgba(200, 200, 200, 0.4)';
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.arc(cabinX + w * 0.02, h * (0.55 - i * 0.02), w * 0.01 * (1 + i * 0.2), 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Stars
    ctx.fillStyle = '#FFD700';
    const starPositions = [
      [w * 0.15, h * 0.08], [w * 0.85, h * 0.12], [w * 0.3, h * 0.04], 
      [w * 0.92, h * 0.06], [w * 0.65, h * 0.09], [w * 0.45, h * 0.05]
    ];
    starPositions.forEach(([sx, sy]) => {
      this.drawStar(ctx, sx, sy, w * 0.006);
    });

    // Lake reflection
    ctx.fillStyle = 'rgba(30, 144, 255, 0.5)';
    ctx.beginPath();
    ctx.ellipse(w * 0.5, h * 0.78, w * 0.25, h * 0.08, 0, 0, Math.PI * 2);
    ctx.fill();

    // Lake highlights
    ctx.fillStyle = 'rgba(135, 206, 250, 0.3)';
    ctx.beginPath();
    ctx.ellipse(w * 0.45, h * 0.76, w * 0.08, h * 0.03, 0, 0, Math.PI * 2);
    ctx.fill();

    // Rocks near lake
    ctx.fillStyle = '#696969';
    ctx.beginPath();
    ctx.ellipse(w * 0.35, h * 0.75, w * 0.025, h * 0.02, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(w * 0.68, h * 0.77, w * 0.03, h * 0.022, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  drawTree(ctx, x, y, w, h, color = '#228B22') {
    // Trunk
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(x - w * 0.15, y, w * 0.3, h * 0.3);

    // Foliage layers
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y - h * 0.2, w * 0.7, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x - w * 0.3, y - h * 0.05, w * 0.55, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x + w * 0.3, y - h * 0.05, w * 0.55, 0, Math.PI * 2);
    ctx.fill();
    
    // Highlights
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.beginPath();
    ctx.arc(x - w * 0.2, y - h * 0.2, w * 0.3, 0, Math.PI * 2);
    ctx.fill();
  }

  drawCloud(ctx, x, y, r) {
    ctx.fillStyle = '#FFF';
    ctx.beginPath();
    ctx.arc(x - r, y, r, 0, Math.PI * 2);
    ctx.arc(x, y - r * 0.5, r * 1.2, 0, Math.PI * 2);
    ctx.arc(x + r, y, r, 0, Math.PI * 2);
    ctx.arc(x + r * 0.5, y + r * 0.3, r * 0.8, 0, Math.PI * 2);
    ctx.fill();
  }

  drawStarfish(ctx, x, y, r, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
      const angle2 = ((i + 0.5) / 5) * Math.PI * 2 - Math.PI / 2;
      const px = x + Math.cos(angle) * r;
      const py = y + Math.sin(angle) * r;
      const px2 = x + Math.cos(angle2) * r * 0.4;
      const py2 = y + Math.sin(angle2) * r * 0.4;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
      ctx.lineTo(px2, py2);
    }
    ctx.closePath();
    ctx.fill();
  }

  drawMushroom(ctx, x, y, r) {
    ctx.fillStyle = '#FF6347';
    ctx.beginPath();
    ctx.arc(x, y - r * 0.8, r * 1.1, 0, Math.PI);
    ctx.fill();
    
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(x - r * 0.2, y - r * 0.8, r * 0.4, r);
    
    ctx.fillStyle = '#FFF';
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.arc(x - r * 0.6 + i * r * 0.6, y - r * 1.4, r * 0.15, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  drawFlower(ctx, x, y, r, color) {
    ctx.fillStyle = color;
    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * Math.PI * 2;
      const px = x + Math.cos(angle) * r * 1.5;
      const py = y + Math.sin(angle) * r * 1.5;
      ctx.beginPath();
      ctx.ellipse(px, py, r * 0.7, r * 1.1, angle, 0, Math.PI * 2);
      ctx.fill();
    }
    
    ctx.fillStyle = '#FFD700';
    ctx.beginPath();
    ctx.arc(x, y, r * 0.6, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.strokeStyle = '#228B22';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + r * 3.5);
    ctx.stroke();
  }

  drawButterfly(ctx, x, y, r) {
    ctx.fillStyle = '#FF1493';
    ctx.beginPath();
    ctx.ellipse(x - r, y, r * 0.9, r * 1.6, 0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(x + r, y, r * 0.9, r * 1.6, -0.3, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = '#8B008B';
    ctx.beginPath();
    ctx.arc(x - r, y - r * 0.8, r * 0.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x + r, y - r * 0.8, r * 0.5, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x, y - r);
    ctx.lineTo(x, y + r);
    ctx.stroke();
  }

  drawCabin(ctx, x, y, s) {
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(x - s, y - s * 1.2, s * 2, s * 1.8);
    
    ctx.fillStyle = '#654321';
    for (let i = 0; i < 6; i++) {
      ctx.fillRect(x - s, y - s * 1.2 + i * s * 0.3, s * 2, s * 0.05);
    }
    
    ctx.fillStyle = '#D2691E';
    ctx.fillRect(x - s * 0.4, y - s * 0.5, s * 0.8, s * 0.8);
    
    ctx.fillStyle = '#4169E1';
    ctx.fillRect(x - s * 0.15, y - s * 0.3, s * 0.3, s * 0.4);
    
    ctx.fillStyle = '#8B0000';
    ctx.beginPath();
    ctx.moveTo(x - s * 1.2, y - s * 1.2);
    ctx.lineTo(x, y - s * 1.8);
    ctx.lineTo(x + s * 1.2, y - s * 1.2);
    ctx.closePath();
    ctx.fill();
  }

  drawStar(ctx, x, y, r) {
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
      const px = x + Math.cos(angle) * r * 2.5;
      const py = y + Math.sin(angle) * r * 2.5;
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

  drawBird(ctx, x, y, size) {
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x - size, y);
    ctx.quadraticCurveTo(x - size * 0.5, y - size, x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.quadraticCurveTo(x + size * 0.5, y - size, x + size, y);
    ctx.stroke();
  }

  drawMarket(ctx, w, h, isLeft) {
    // Night sky gradient
    const skyGrad = ctx.createLinearGradient(0, 0, 0, h * 0.6);
    skyGrad.addColorStop(0, '#1a1a2e');
    skyGrad.addColorStop(1, '#16213e');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, w, h * 0.6);

    // Stars
    ctx.fillStyle = '#FFD700';
    const stars = [[0.1, 0.1], [0.3, 0.05], [0.7, 0.15], [0.85, 0.08], [0.5, 0.12], [0.2, 0.18]];
    stars.forEach(([sx, sy]) => this.drawStar(ctx, w * sx, h * sy, w * 0.005));

    // Moon
    ctx.fillStyle = '#FFF8DC';
    ctx.beginPath();
    ctx.arc(w * 0.85, h * 0.2, w * 0.07, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'rgba(255, 248, 220, 0.3)';
    ctx.beginPath();
    ctx.arc(w * 0.85, h * 0.2, w * 0.09, 0, Math.PI * 2);
    ctx.fill();

    // Ground
    ctx.fillStyle = '#2F4F4F';
    ctx.fillRect(0, h * 0.6, w, h * 0.4);

    // Market stalls
    const stallColors = ['#8B4513', '#A0522D', '#654321'];
    for (let i = 0; i < 4; i++) {
      const x = w * (0.15 + i * 0.22);
      const y = h * 0.55;
      
      ctx.fillStyle = stallColors[i % 3];
      ctx.fillRect(x - w * 0.08, y, w * 0.16, h * 0.25);
      
      ctx.fillStyle = '#CD853F';
      ctx.beginPath();
      ctx.moveTo(x - w * 0.1, y);
      ctx.lineTo(x, y - h * 0.08);
      ctx.lineTo(x + w * 0.1, y);
      ctx.closePath();
      ctx.fill();
      
      if (i === 0) {
        ctx.fillStyle = '#FF6347';
        for (let j = 0; j < 3; j++) {
          ctx.beginPath();
          ctx.arc(x - w * 0.04 + j * w * 0.03, y + h * 0.1, w * 0.015, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    // Lanterns
    const lanternX = [0.25, 0.47, 0.69, 0.91];
    const lanternY = [0.35, 0.38, 0.36, 0.4];
    const lanternColors = isLeft 
      ? ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF']
      : ['#FFD93D', '#FFD93D', '#6BCB77', '#4D96FF'];
    
    lanternX.forEach((lx, idx) => {
      const x = w * lx;
      const y = h * lanternY[idx];
      
      ctx.strokeStyle = '#666';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, h * 0.3);
      ctx.lineTo(x, y - h * 0.05);
      ctx.stroke();
      
      ctx.fillStyle = lanternColors[idx];
      ctx.beginPath();
      ctx.ellipse(x, y, w * 0.025, h * 0.045, 0, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = `${lanternColors[idx]}40`;
      ctx.beginPath();
      ctx.ellipse(x, y, w * 0.035, h * 0.06, 0, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.strokeStyle = '#FFD700';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x, y + h * 0.045);
      ctx.lineTo(x, y + h * 0.08);
      ctx.stroke();
    });

    // People silhouettes
    if (isLeft) {
      this.drawPerson(ctx, w * 0.35, h * 0.75, w * 0.04);
      this.drawPerson(ctx, w * 0.65, h * 0.72, w * 0.035);
    } else {
      this.drawPerson(ctx, w * 0.4, h * 0.75, w * 0.04);
      this.drawPerson(ctx, w * 0.65, h * 0.72, w * 0.035);
    }

    // Ground items
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(w * 0.1, h * 0.85, w * 0.12, h * 0.08);
    ctx.fillStyle = '#CD853F';
    for (let i = 0; i < 4; i++) {
      ctx.fillRect(w * (0.11 + i * 0.028), h * 0.87, w * 0.02, h * 0.04);
    }
  }

  drawClockwork(ctx, w, h, isLeft) {
    // Sky gradient
    const skyGrad = ctx.createLinearGradient(0, 0, 0, h * 0.6);
    skyGrad.addColorStop(0, '#B8860B');
    skyGrad.addColorStop(1, '#DAA520');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, w, h * 0.6);

    // Ground
    ctx.fillStyle = '#696969';
    ctx.fillRect(0, h * 0.6, w, h * 0.4);
    
    ctx.strokeStyle = '#808080';
    ctx.lineWidth = 1;
    for (let i = 0; i < 20; i++) {
      ctx.beginPath();
      ctx.moveTo(w * (i / 20), h * 0.6);
      ctx.lineTo(w * (i / 20), h);
      ctx.stroke();
    }

    // Large gears
    this.drawGear(ctx, w * 0.3, h * 0.35, w * 0.12, 12, isLeft ? '#CD7F32' : '#B87333');
    this.drawGear(ctx, w * 0.7, h * 0.4, w * 0.1, 10, '#DAA520');
    
    this.drawGear(ctx, w * 0.5, h * 0.25, w * 0.08, 8, '#FFD700');
    this.drawGear(ctx, w * 0.15, h * 0.5, w * 0.07, 8, '#B8860B');
    
    this.drawGear(ctx, w * 0.85, h * 0.2, w * 0.05, 6, '#CD853F');
    if (!isLeft) {
      this.drawGear(ctx, w * 0.6, h * 0.55, w * 0.045, 6, '#DAA520');
    }

    // Pipes
    ctx.strokeStyle = '#A9A9A9';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(w * 0.1, h * 0.7);
    ctx.lineTo(w * 0.4, h * 0.7);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(w * 0.6, h * 0.75);
    ctx.lineTo(w * 0.9, h * 0.75);
    ctx.stroke();

    ctx.fillStyle = '#696969';
    [0.1, 0.4, 0.6, 0.9].forEach(px => {
      const py = px < 0.5 ? 0.7 : 0.75;
      ctx.beginPath();
      ctx.arc(w * px, h * py, w * 0.025, 0, Math.PI * 2);
      ctx.fill();
    });

    // Steam
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.ellipse(w * (0.2 + i * 0.3), h * (0.82 + i * 0.02), w * 0.03, h * 0.04, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = '#2F4F4F';
    const boltPositions = [[0.25, 0.65], [0.45, 0.68], [0.75, 0.7], [0.55, 0.72]];
    boltPositions.forEach(([bx, by]) => {
      ctx.beginPath();
      ctx.arc(w * bx, h * by, w * 0.008, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.strokeStyle = '#8B7355';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(w * 0.3, h * 0.35);
    ctx.lineTo(w * 0.5, h * 0.25);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(w * 0.5, h * 0.25);
    ctx.lineTo(w * 0.7, h * 0.4);
    ctx.stroke();

    const gaugeX = isLeft ? w * 0.1 : w * 0.12;
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(gaugeX, h * 0.8, w * 0.03, 0, Math.PI * 2);
    ctx.stroke();
    
    ctx.strokeStyle = '#FF0000';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(gaugeX, h * 0.8, w * 0.022, Math.PI, Math.PI * 1.7);
    ctx.stroke();
  }

  drawGear(ctx, x, y, radius, teeth, color) {
    ctx.save();
    ctx.translate(x, y);
    
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = color;
    for (let i = 0; i < teeth; i++) {
      const angle = (i / teeth) * Math.PI * 2;
      ctx.save();
      ctx.rotate(angle);
      ctx.fillRect(-radius * 0.15, -radius * 1.1, radius * 0.3, radius * 0.25);
      ctx.restore();
    }
    
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.3, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.beginPath();
    ctx.arc(-radius * 0.2, -radius * 0.2, radius * 0.4, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
  }

  drawPerson(ctx, x, y, size) {
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(x, y - size * 1.5, size * 0.5, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillRect(x - size * 0.3, y - size, size * 0.6, size * 1.2);
    
    ctx.fillRect(x - size * 0.3, y + size * 0.2, size * 0.25, size * 0.8);
    ctx.fillRect(x + size * 0.05, y + size * 0.2, size * 0.25, size * 0.8);
  }
}
