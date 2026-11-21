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

    // Beach bottom extends to edge with details
    ctx.fillStyle = '#D2B48C';
    ctx.fillRect(0, h * 0.85, w, h * 0.15);
    
    // Rocks and shells
    ctx.fillStyle = '#8B7D6B';
    for (let i = 0; i < 8; i++) {
      const x = w * (0.1 + i * 0.11);
      const y = h * (0.88 + Math.random() * 0.08);
      const size = w * (0.015 + Math.random() * 0.01);
      ctx.beginPath();
      ctx.ellipse(x, y, size, size * 0.7, Math.random() * Math.PI, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Footprints
    ctx.fillStyle = 'rgba(139, 125, 107, 0.3)';
    for (let i = 0; i < 6; i++) {
      const x = w * (0.15 + i * 0.12);
      const y = h * (0.91 + (i % 2) * 0.03);
      ctx.beginPath();
      ctx.ellipse(x, y, w * 0.012, w * 0.018, 0.3, 0, Math.PI * 2);
      ctx.fill();
    }

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
    
    // More background trees
    for (let i = 0; i < 5; i++) {
      const tx = w * (0.15 + i * 0.15);
      const ty = h * 0.68;
      this.drawTree(ctx, tx, ty, w * 0.04, h * 0.08, '#0F3E0C');
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
    skyGrad.addColorStop(0, '#0a0e27');
    skyGrad.addColorStop(1, '#1a1a3e');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, w, h * 0.6);

    // Stars
    ctx.fillStyle = '#FFD700';
    for (let i = 0; i < 30; i++) {
      const x = w * Math.random();
      const y = h * Math.random() * 0.5;
      const size = Math.random() * 0.003 + 0.002;
      this.drawStar(ctx, x, y, w * size);
    }

    // Moon with glow
    const moonGrad = ctx.createRadialGradient(w * 0.85, h * 0.15, 0, w * 0.85, h * 0.15, w * 0.12);
    moonGrad.addColorStop(0, '#FFF8DC');
    moonGrad.addColorStop(0.5, '#FFF8DC');
    moonGrad.addColorStop(1, 'rgba(255, 248, 220, 0)');
    ctx.fillStyle = moonGrad;
    ctx.beginPath();
    ctx.arc(w * 0.85, h * 0.15, w * 0.12, 0, Math.PI * 2);
    ctx.fill();

    // Building silhouettes
    ctx.fillStyle = '#0a0a1a';
    ctx.fillRect(0, h * 0.35, w * 0.2, h * 0.2);
    ctx.fillRect(w * 0.8, h * 0.38, w * 0.2, h * 0.18);
    ctx.fillRect(w * 0.3, h * 0.32, w * 0.15, h * 0.22);
    
    // Roof details
    for (let i = 0; i < 3; i++) {
      const rx = w * (0.05 + i * 0.3);
      ctx.fillStyle = '#1a1a2a';
      ctx.beginPath();
      ctx.moveTo(rx, h * (0.35 - i * 0.02));
      ctx.lineTo(rx + w * 0.1, h * (0.32 - i * 0.02));
      ctx.lineTo(rx + w * 0.2, h * (0.35 - i * 0.02));
      ctx.closePath();
      ctx.fill();
    }

    // Stone ground
    ctx.fillStyle = '#3a3a4a';
    ctx.fillRect(0, h * 0.55, w, h * 0.45);
    
    // Stone texture
    ctx.strokeStyle = '#2a2a3a';
    ctx.lineWidth = 1;
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 15; x++) {
        const sx = x * (w / 15);
        const sy = h * 0.55 + y * (h * 0.045);
        ctx.strokeRect(sx, sy, w / 15, h * 0.045);
      }
    }

    // Market stalls with detailed canopies
    const stallData = [
      { x: 0.15, color: '#8B4513', stripes: '#CD853F' },
      { x: 0.38, color: '#A0522D', stripes: '#DEB887' },
      { x: 0.62, color: '#654321', stripes: '#D2691E' },
      { x: 0.85, color: '#8B7355', stripes: '#BDB76B' }
    ];

    stallData.forEach(stall => {
      const x = w * stall.x;
      const y = h * 0.58;
      
      // Stall posts
      ctx.fillStyle = '#654321';
      ctx.fillRect(x - w * 0.075, y, w * 0.01, h * 0.25);
      ctx.fillRect(x + w * 0.065, y, w * 0.01, h * 0.25);
      
      // Canopy frame
      ctx.fillStyle = stall.color;
      ctx.beginPath();
      ctx.moveTo(x - w * 0.08, y - h * 0.02);
      ctx.lineTo(x, y - h * 0.1);
      ctx.lineTo(x + w * 0.08, y - h * 0.02);
      ctx.lineTo(x + w * 0.08, y);
      ctx.lineTo(x - w * 0.08, y);
      ctx.closePath();
      ctx.fill();
      
      // Striped pattern
      ctx.fillStyle = stall.stripes;
      for (let i = 0; i < 6; i++) {
        ctx.beginPath();
        const offset = w * (-0.08 + i * 0.027);
        ctx.moveTo(x + offset, y - h * 0.02);
        ctx.lineTo(x + offset + w * 0.013, y - h * 0.02);
        ctx.lineTo(x + offset + w * 0.013 + w * 0.01, y);
        ctx.lineTo(x + offset + w * 0.01, y);
        ctx.closePath();
        ctx.fill();
      }
      
      // Table
      ctx.fillStyle = '#8B7355';
      ctx.fillRect(x - w * 0.06, y + h * 0.15, w * 0.12, h * 0.02);
      ctx.fillRect(x - w * 0.055, y + h * 0.17, w * 0.01, h * 0.08);
      ctx.fillRect(x + w * 0.045, y + h * 0.17, w * 0.01, h * 0.08);
      
      // Items on table
      if (stall.x === 0.15) {
        for (let i = 0; i < 4; i++) {
          ctx.fillStyle = i === 0 && !isLeft ? '#FFD700' : '#FF6347';
          ctx.beginPath();
          ctx.arc(x - w * 0.04 + i * w * 0.025, y + h * 0.13, w * 0.012, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    });

    // Lanterns with detailed glow
    const lanternCount = isLeft ? 5 : 4;
    const lanternX = [0.18, 0.35, 0.52, 0.69, 0.86];
    const lanternY = [0.42, 0.45, 0.43, 0.46, 0.44];
    const lanternColors = ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#FF6B6B'];
    
    for (let idx = 0; idx < lanternCount; idx++) {
      const x = w * lanternX[idx];
      const y = h * lanternY[idx];
      
      // String
      ctx.strokeStyle = '#888';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, h * 0.35);
      ctx.lineTo(x, y - h * 0.05);
      ctx.stroke();
      
      // Glow
      const glowGrad = ctx.createRadialGradient(x, y, 0, x, y, w * 0.05);
      glowGrad.addColorStop(0, `${lanternColors[idx]}80`);
      glowGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(x, y, w * 0.05, 0, Math.PI * 2);
      ctx.fill();
      
      // Lantern body
      const bodyGrad = ctx.createLinearGradient(x - w * 0.025, y, x + w * 0.025, y);
      bodyGrad.addColorStop(0, lanternColors[idx]);
      bodyGrad.addColorStop(0.5, '#FFF');
      bodyGrad.addColorStop(1, lanternColors[idx]);
      ctx.fillStyle = bodyGrad;
      ctx.beginPath();
      ctx.ellipse(x, y, w * 0.025, h * 0.045, 0, 0, Math.PI * 2);
      ctx.fill();
      
      // Frame lines
      ctx.strokeStyle = '#8B4513';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, y - h * 0.045);
      ctx.lineTo(x, y + h * 0.045);
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(x, y, w * 0.025, h * 0.045, 0, 0, Math.PI * 2);
      ctx.stroke();
      
      // Tassel
      ctx.strokeStyle = '#FFD700';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x, y + h * 0.045);
      ctx.lineTo(x, y + h * 0.08);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(x, y + h * 0.08, w * 0.005, 0, Math.PI * 2);
      ctx.fill();
    }

    // Bunting flags
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, h * 0.35);
    ctx.lineTo(w, h * 0.35);
    ctx.stroke();
    
    const flagColors = ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF'];
    for (let i = 0; i < 12; i++) {
      const fx = w * (0.05 + i * 0.08);
      ctx.fillStyle = flagColors[i % 4];
      ctx.beginPath();
      ctx.moveTo(fx, h * 0.35);
      ctx.lineTo(fx + w * 0.03, h * 0.35);
      ctx.lineTo(fx + w * 0.015, h * 0.4);
      ctx.closePath();
      ctx.fill();
    }

    // Chairs and tables
    if (isLeft) {
      this.drawChair(ctx, w * 0.25, h * 0.75, w * 0.03);
      this.drawChair(ctx, w * 0.7, h * 0.73, w * 0.028);
    } else {
      this.drawChair(ctx, w * 0.3, h * 0.75, w * 0.03);
      this.drawChair(ctx, w * 0.7, h * 0.73, w * 0.028);
    }

    // Crates
    ctx.fillStyle = '#8B7355';
    ctx.fillRect(w * 0.05, h * 0.82, w * 0.08, h * 0.08);
    ctx.strokeStyle = '#654321';
    ctx.lineWidth = 2;
    ctx.strokeRect(w * 0.05, h * 0.82, w * 0.08, h * 0.08);
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.moveTo(w * 0.05, h * (0.82 + i * 0.027));
      ctx.lineTo(w * 0.13, h * (0.82 + i * 0.027));
      ctx.stroke();
    }
  }

  drawChair(ctx, x, y, size) {
    ctx.fillStyle = '#654321';
    ctx.fillRect(x - size * 0.4, y - size, size * 0.8, size * 0.1);
    ctx.fillRect(x - size * 0.4, y - size, size * 0.1, size * 0.8);
    ctx.fillRect(x + size * 0.3, y - size, size * 0.1, size * 0.8);
    ctx.fillRect(x - size * 0.35, y - size * 0.2, size * 0.1, size);
    ctx.fillRect(x + size * 0.25, y - size * 0.2, size * 0.1, size);
  }

  drawClockwork(ctx, w, h, isLeft) {
    // Bronze sky gradient
    const skyGrad = ctx.createLinearGradient(0, 0, 0, h * 0.55);
    skyGrad.addColorStop(0, '#4a4a3a');
    skyGrad.addColorStop(1, '#6a6a4a');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, w, h * 0.55);

    // Metal floor with rivets
    const floorGrad = ctx.createLinearGradient(0, h * 0.55, 0, h);
    floorGrad.addColorStop(0, '#505050');
    floorGrad.addColorStop(1, '#383838');
    ctx.fillStyle = floorGrad;
    ctx.fillRect(0, h * 0.55, w, h * 0.45);
    
    // Floor panels
    ctx.strokeStyle = '#2a2a2a';
    ctx.lineWidth = 2;
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 5; j++) {
        const px = i * (w / 8);
        const py = h * 0.55 + j * (h * 0.09);
        ctx.strokeRect(px, py, w / 8, h * 0.09);
        
        // Rivets at corners
        ctx.fillStyle = '#1a1a1a';
        [0, w / 8].forEach(ox => {
          [0, h * 0.09].forEach(oy => {
            ctx.beginPath();
            ctx.arc(px + ox, py + oy, 2, 0, Math.PI * 2);
            ctx.fill();
          });
        });
      }
    }

    // Large main gears with teeth detail
    this.drawDetailedGear(ctx, w * 0.25, h * 0.3, w * 0.14, 16, isLeft ? '#B87333' : '#CD7F32');
    this.drawDetailedGear(ctx, w * 0.7, h * 0.38, w * 0.12, 14, '#8B7355');
    
    // Medium gears
    this.drawDetailedGear(ctx, w * 0.5, h * 0.2, w * 0.09, 12, '#DAA520');
    this.drawDetailedGear(ctx, w * 0.12, h * 0.45, w * 0.08, 10, '#CD853F');
    this.drawDetailedGear(ctx, w * 0.88, h * 0.25, w * 0.07, 10, '#B8860B');
    
    // Small gears
    if (!isLeft) {
      this.drawDetailedGear(ctx, w * 0.58, h * 0.5, w * 0.055, 8, '#8B7355');
    }
    this.drawDetailedGear(ctx, w * 0.38, h * 0.48, w * 0.05, 8, '#A0826D');

    // Connecting rods
    ctx.strokeStyle = '#6a6a5a';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(w * 0.25, h * 0.3);
    ctx.lineTo(w * 0.5, h * 0.2);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(w * 0.5, h * 0.2);
    ctx.lineTo(w * 0.7, h * 0.38);
    ctx.stroke();

    // Pipes with gradient
    const pipeGrad = ctx.createLinearGradient(0, h * 0.65, 0, h * 0.75);
    pipeGrad.addColorStop(0, '#8a8a8a');
    pipeGrad.addColorStop(0.5, '#aaaaaa');
    pipeGrad.addColorStop(1, '#7a7a7a');
    
    // Horizontal pipes
    ctx.fillStyle = pipeGrad;
    ctx.fillRect(w * 0.05, h * 0.68, w * 0.4, h * 0.04);
    ctx.fillRect(w * 0.55, h * 0.73, w * 0.4, h * 0.04);
    
    // Pipe highlights
    ctx.fillStyle = 'rgba(200, 200, 200, 0.3)';
    ctx.fillRect(w * 0.05, h * 0.685, w * 0.4, h * 0.008);
    ctx.fillRect(w * 0.55, h * 0.735, w * 0.4, h * 0.008);

    // Pipe joints and valves
    const joints = [
      { x: 0.05, y: 0.7 }, { x: 0.45, y: 0.7 },
      { x: 0.55, y: 0.75 }, { x: 0.95, y: 0.75 }
    ];
    
    joints.forEach(joint => {
      // Joint base
      ctx.fillStyle = '#5a5a5a';
      ctx.beginPath();
      ctx.arc(w * joint.x, h * joint.y, w * 0.03, 0, Math.PI * 2);
      ctx.fill();
      
      // Valve wheel
      if (joint.x === 0.45) {
        for (let i = 0; i < 6; i++) {
          const angle = (i / 6) * Math.PI * 2;
          ctx.strokeStyle = '#3a3a3a';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(w * joint.x, h * joint.y);
          ctx.lineTo(w * joint.x + Math.cos(angle) * w * 0.025, h * joint.y + Math.sin(angle) * w * 0.025);
          ctx.stroke();
        }
        ctx.beginPath();
        ctx.arc(w * joint.x, h * joint.y, w * 0.025, 0, Math.PI * 2);
        ctx.stroke();
      }
      
      // Bolts
      for (let i = 0; i < 4; i++) {
        const angle = (i / 4) * Math.PI * 2;
        ctx.fillStyle = '#2a2a2a';
        ctx.beginPath();
        ctx.arc(
          w * joint.x + Math.cos(angle) * w * 0.022,
          h * joint.y + Math.sin(angle) * w * 0.022,
          w * 0.004,
          0, Math.PI * 2
        );
        ctx.fill();
      }
    });

    // Steam vents
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    for (let i = 0; i < 5; i++) {
      const sx = w * (0.15 + i * 0.15);
      const sy = h * (0.78 + Math.random() * 0.05);
      ctx.save();
      ctx.translate(sx, sy);
      for (let j = 0; j < 3; j++) {
        ctx.globalAlpha = 0.3 - j * 0.1;
        ctx.beginPath();
        ctx.ellipse(0, -j * h * 0.02, w * 0.025 * (1 + j * 0.3), h * 0.03 * (1 + j * 0.3), 0, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    // Pressure gauges
    const gaugeX = isLeft ? w * 0.08 : w * 0.12;
    
    // Gauge body
    ctx.fillStyle = '#4a4a4a';
    ctx.beginPath();
    ctx.arc(gaugeX, h * 0.82, w * 0.035, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.strokeStyle = '#2a2a2a';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Gauge face
    ctx.fillStyle = '#e8e8e8';
    ctx.beginPath();
    ctx.arc(gaugeX, h * 0.82, w * 0.028, 0, Math.PI * 2);
    ctx.fill();
    
    // Gauge markings
    for (let i = 0; i < 12; i++) {
      const angle = Math.PI + (i / 11) * Math.PI;
      const x1 = gaugeX + Math.cos(angle) * w * 0.022;
      const y1 = h * 0.82 + Math.sin(angle) * w * 0.022;
      const x2 = gaugeX + Math.cos(angle) * w * 0.026;
      const y2 = h * 0.82 + Math.sin(angle) * w * 0.026;
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
    
    // Needle
    ctx.strokeStyle = '#FF0000';
    ctx.lineWidth = 2;
    const needleAngle = Math.PI * 1.4;
    ctx.beginPath();
    ctx.moveTo(gaugeX, h * 0.82);
    ctx.lineTo(
      gaugeX + Math.cos(needleAngle) * w * 0.02,
      h * 0.82 + Math.sin(needleAngle) * w * 0.02
    );
    ctx.stroke();

    // Smaller gauges
    [{ x: 0.22, y: 0.82 }, { x: 0.35, y: 0.8 }].forEach(g => {
      ctx.fillStyle = '#3a3a3a';
      ctx.beginPath();
      ctx.arc(w * g.x, h * g.y, w * 0.02, 0, Math.PI * 2);
      ctx.fill();
    });

    // Control panel
    ctx.fillStyle = '#4a4a3a';
    ctx.fillRect(w * 0.75, h * 0.75, w * 0.15, h * 0.12);
    ctx.strokeStyle = '#2a2a2a';
    ctx.lineWidth = 2;
    ctx.strokeRect(w * 0.75, h * 0.75, w * 0.15, h * 0.12);
    
    // Buttons and switches
    const buttonColors = ['#FF0000', '#00FF00', '#FFD700'];
    buttonColors.forEach((color, i) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(w * (0.78 + i * 0.03), h * 0.8, w * 0.008, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  drawDetailedGear(ctx, x, y, radius, teeth, color) {
    ctx.save();
    ctx.translate(x, y);
    
    // Gear body with gradient
    const gearGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
    gearGrad.addColorStop(0, color);
    gearGrad.addColorStop(0.7, color);
    gearGrad.addColorStop(1, '#000');
    ctx.fillStyle = gearGrad;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.fill();
    
    // Teeth with shadows
    ctx.fillStyle = color;
    for (let i = 0; i < teeth; i++) {
      const angle = (i / teeth) * Math.PI * 2;
      ctx.save();
      ctx.rotate(angle);
      
      // Tooth
      ctx.fillRect(-radius * 0.18, -radius * 1.15, radius * 0.36, radius * 0.3);
      
      // Tooth shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.fillRect(radius * 0.1, -radius * 1.15, radius * 0.08, radius * 0.3);
      ctx.fillStyle = color;
      
      ctx.restore();
    }
    
    // Center hole with depth
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.35, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = '#1a1a1a';
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.32, 0, Math.PI * 2);
    ctx.fill();
    
    // Highlight for metallic look
    ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.beginPath();
    ctx.arc(-radius * 0.25, -radius * 0.25, radius * 0.4, 0, Math.PI * 2);
    ctx.fill();
    
    // Bolts around center
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const bx = Math.cos(angle) * radius * 0.6;
      const by = Math.sin(angle) * radius * 0.6;
      ctx.fillStyle = '#2a2a2a';
      ctx.beginPath();
      ctx.arc(bx, by, radius * 0.05, 0, Math.PI * 2);
      ctx.fill();
    }
    
    ctx.restore();
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
