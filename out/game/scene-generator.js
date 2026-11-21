export class SceneGenerator {
  constructor() {
    this.scenes = this.generateScenes();
  }

  generateScenes() {
    return [
      this.generatePirateCove(),
      this.generateGarden(),
      this.generateTemple(),
      this.generateMarket(),
      this.generateDragonsLair()
    ];
  }

  generatePirateCove() {
    return {
      name: 'Pirate Cove',
      draw: (ctx, w, h, isLeft) => {
        ctx.fillStyle = '#87CEEB';
        ctx.fillRect(0, 0, w, h);
        
        ctx.fillStyle = '#8B7355';
        ctx.beginPath();
        ctx.ellipse(w * 0.3, h * 0.7, w * 0.3, h * 0.15, 0, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = '#D2B48C';
        ctx.fillRect(w * 0.15, h * 0.6, w * 0.3, h * 0.2);
        
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(w * 0.18, h * 0.62, w * 0.08, h * 0.12);
        
        ctx.strokeStyle = '#654321';
        ctx.lineWidth = 3;
        ctx.strokeRect(w * 0.18, h * 0.62, w * 0.08, h * 0.12);
        
        if (isLeft) {
          ctx.fillStyle = '#FFD700';
          ctx.beginPath();
          ctx.arc(w * 0.7, h * 0.3, w * 0.08, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = '#654321';
          ctx.beginPath();
          ctx.arc(w * 0.7, h * 0.3, w * 0.08, 0, Math.PI * 2);
          ctx.fill();
        }
        
        ctx.fillStyle = '#4682B4';
        for (let i = 0; i < 5; i++) {
          ctx.beginPath();
          ctx.arc(w * (0.2 + i * 0.12), h * (0.2 + Math.sin(i) * 0.1), w * 0.04, 0, Math.PI * 2);
          ctx.fill();
        }
      },
      diffs: [
        { x: 0.7, y: 0.3, radius: 0.08, type: 'color' },
        { x: 0.25, y: 0.8, radius: 0.05, type: 'size' },
        { x: 0.5, y: 0.15, radius: 0.06, type: 'remove' },
        { x: 0.15, y: 0.3, radius: 0.05, type: 'shift' },
        { x: 0.8, y: 0.6, radius: 0.07, type: 'color' },
        { x: 0.35, y: 0.7, radius: 0.06, type: 'add' },
        { x: 0.6, y: 0.5, radius: 0.05, type: 'rotation' }
      ]
    };
  }

  generateGarden() {
    return {
      name: 'Enchanted Garden',
      draw: (ctx, w, h, isLeft) => {
        ctx.fillStyle = '#90EE90';
        ctx.fillRect(0, 0, w, h);
        
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(0, h * 0.7, w, h * 0.3);
        
        for (let i = 0; i < 6; i++) {
          const x = w * (0.15 + i * 0.13);
          const y = h * 0.5;
          ctx.fillStyle = '#228B22';
          ctx.beginPath();
          ctx.ellipse(x, y, w * 0.06, h * 0.15, 0.3, 0, Math.PI * 2);
          ctx.fill();
          
          const petals = isLeft && i === 2 ? 6 : 5;
          ctx.fillStyle = i === 1 && isLeft ? '#FF69B4' : '#FF1493';
          for (let p = 0; p < petals; p++) {
            const angle = (p / petals) * Math.PI * 2;
            const px = x + Math.cos(angle) * w * 0.08;
            const py = y - h * 0.12 + Math.sin(angle) * h * 0.08;
            ctx.beginPath();
            ctx.ellipse(px, py, w * 0.05, h * 0.06, angle, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.arc(w * 0.85, h * 0.2, w * 0.06, 0, Math.PI * 2);
        ctx.fill();
      },
      diffs: [
        { x: 0.35, y: 0.5, radius: 0.08, type: 'color' },
        { x: 0.75, y: 0.35, radius: 0.06, type: 'add' },
        { x: 0.15, y: 0.65, radius: 0.05, type: 'remove' },
        { x: 0.5, y: 0.2, radius: 0.07, type: 'shift' },
        { x: 0.85, y: 0.2, radius: 0.06, type: 'color' },
        { x: 0.25, y: 0.35, radius: 0.05, type: 'size' },
        { x: 0.65, y: 0.65, radius: 0.06, type: 'rotation' }
      ]
    };
  }

  generateTemple() {
    return {
      name: 'Ancient Temple',
      draw: (ctx, w, h, isLeft) => {
        ctx.fillStyle = '#F4A460';
        ctx.fillRect(0, 0, w, h);
        
        ctx.fillStyle = '#8B4513';
        ctx.beginPath();
        ctx.moveTo(w * 0.5, h * 0.15);
        ctx.lineTo(w * 0.2, h * 0.5);
        ctx.lineTo(w * 0.8, h * 0.5);
        ctx.closePath();
        ctx.fill();
        
        for (let i = 0; i < 2; i++) {
          ctx.fillStyle = '#654321';
          ctx.fillRect(w * (0.25 + i * 0.5), h * 0.5, w * 0.1, h * 0.35);
        }
        
        ctx.fillStyle = '#DAA520';
        ctx.beginPath();
        ctx.arc(w * 0.5, h * 0.3, w * 0.05, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = isLeft ? '#4169E1' : '#32CD32';
        ctx.fillRect(w * 0.15, h * 0.75, w * 0.7, h * 0.2);
        
        for (let i = 0; i < 5; i++) {
          ctx.fillStyle = '#696969';
          ctx.fillRect(w * (0.2 + i * 0.12), h * 0.78, w * 0.04, h * 0.12);
        }
      },
      diffs: [
        { x: 0.5, y: 0.3, radius: 0.05, type: 'color' },
        { x: 0.3, y: 0.6, radius: 0.08, type: 'size' },
        { x: 0.15, y: 0.85, radius: 0.06, type: 'color' },
        { x: 0.7, y: 0.3, radius: 0.06, type: 'remove' },
        { x: 0.35, y: 0.2, radius: 0.05, type: 'shift' },
        { x: 0.65, y: 0.65, radius: 0.07, type: 'add' },
        { x: 0.5, y: 0.85, radius: 0.04, type: 'rotation' }
      ]
    };
  }

  generateMarket() {
    return {
      name: 'Midnight Market',
      draw: (ctx, w, h, isLeft) => {
        ctx.fillStyle = '#2F4F4F';
        ctx.fillRect(0, 0, w, h);
        
        ctx.fillStyle = '#FF6347';
        ctx.fillRect(w * 0.1, h * 0.2, w * 0.25, h * 0.4);
        
        ctx.fillStyle = '#FFD700';
        ctx.fillRect(w * 0.4, h * 0.25, w * 0.2, h * 0.35);
        
        ctx.fillStyle = '#20B2AA';
        ctx.fillRect(w * 0.65, h * 0.3, w * 0.25, h * 0.3);
        
        ctx.fillStyle = '#FFF';
        for (let i = 0; i < 8; i++) {
          for (let j = 0; j < 4; j++) {
            if ((i + j) % 2 === 0) {
              ctx.fillRect(w * (0.15 + i * 0.08), h * (0.3 + j * 0.08), w * 0.04, h * 0.04);
            }
          }
        }
        
        ctx.fillStyle = '#FF1493';
        ctx.beginPath();
        ctx.arc(w * 0.5, h * 0.15, w * 0.05, 0, Math.PI * 2);
        ctx.fill();
        
        if (isLeft) {
          ctx.fillStyle = '#FFD700';
          ctx.fillRect(w * 0.8, h * 0.15, w * 0.12, h * 0.1);
        }
      },
      diffs: [
        { x: 0.2, y: 0.4, radius: 0.08, type: 'color' },
        { x: 0.5, y: 0.42, radius: 0.07, type: 'size' },
        { x: 0.75, y: 0.45, radius: 0.06, type: 'color' },
        { x: 0.5, y: 0.15, radius: 0.05, type: 'remove' },
        { x: 0.3, y: 0.5, radius: 0.05, type: 'shift' },
        { x: 0.85, y: 0.2, radius: 0.06, type: 'add' },
        { x: 0.15, y: 0.6, radius: 0.06, type: 'rotation' }
      ]
    };
  }

  generateDragonsLair() {
    return {
      name: 'Dragon\'s Lair',
      draw: (ctx, w, h, isLeft) => {
        ctx.fillStyle = '#1C1C1C';
        ctx.fillRect(0, 0, w, h);
        
        ctx.fillStyle = '#8B0000';
        ctx.beginPath();
        ctx.moveTo(w * 0.5, h * 0.15);
        ctx.lineTo(w * 0.65, h * 0.35);
        ctx.lineTo(w * 0.5, h * 0.4);
        ctx.lineTo(w * 0.35, h * 0.35);
        ctx.closePath();
        ctx.fill();
        
        ctx.fillStyle = '#DC143C';
        for (let i = 0; i < 3; i++) {
          ctx.beginPath();
          ctx.arc(w * (0.35 + i * 0.15), h * (0.3 + Math.sin(i) * 0.1), w * 0.04, 0, Math.PI * 2);
          ctx.fill();
        }
        
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.arc(w * 0.4, h * 0.5, w * 0.12, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = isLeft ? '#FF4500' : '#1C1C1C';
        ctx.beginPath();
        ctx.arc(w * 0.35, h * 0.48, w * 0.04, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(w * 0.45, h * 0.48, w * 0.04, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.strokeStyle = '#FFD700';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(w * 0.6, h * 0.7, w * 0.15, 0, Math.PI * 2);
        ctx.stroke();
      },
      diffs: [
        { x: 0.5, y: 0.25, radius: 0.07, type: 'size' },
        { x: 0.4, y: 0.5, radius: 0.12, type: 'color' },
        { x: 0.4, y: 0.48, radius: 0.04, type: 'color' },
        { x: 0.5, y: 0.3, radius: 0.05, type: 'remove' },
        { x: 0.3, y: 0.6, radius: 0.08, type: 'shift' },
        { x: 0.7, y: 0.5, radius: 0.06, type: 'add' },
        { x: 0.6, y: 0.7, radius: 0.15, type: 'color' }
      ]
    };
  }
}
