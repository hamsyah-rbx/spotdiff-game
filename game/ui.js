import { SCENES, GAME_CONFIG } from './config.js';

export class UI {
  constructor(root) {
    this.root = root;
  }

  showTitleScreen(onStart) {
    this.root.innerHTML = `
      <div class="game-container">
        <div class="title-screen">
          <h1>🔍 Spot the Difference</h1>
          <p>Find all differences between the two panels!</p>
          <div class="instructions">
            <strong>How to Play:</strong><br>
            Click on differences in either panel. You have ${GAME_CONFIG.MAX_WRONG_CLICKS} wrong clicks per scene.<br>
            Use hints wisely (${GAME_CONFIG.MAX_HINTS} hints total). Press H for hint, P to pause, R to restart, M to mute.
          </div>
          <button class="btn" id="startBtn">Start Game</button>
        </div>
      </div>
    `;
    
    document.getElementById('startBtn').addEventListener('click', onStart);
  }

  showGameScreen(sceneIdx, remaining, strikes, timeElapsed, parTime, onGameAction) {
    const hintCooldown = onGameAction._hintCooldown || 0;
    const hintsLeft = onGameAction._hintsLeft || 0;
    
    const timerFormatted = this.formatTime(timeElapsed);
    const parFormatted = this.formatTime(parTime);
    
    this.root.innerHTML = `
      <div class="game-container">
        <div class="game-header">
          <div class="header-left">
            <h2>Scene ${sceneIdx + 1}/${SCENES.length}</h2>
          </div>
          <div class="header-center">
            <div class="status-item">
              <span class="label">TO FIND</span>
              <span class="value">${remaining}</span>
            </div>
            <div class="status-item">
              <span class="label">TIME</span>
              <span class="value ${timeElapsed > parTime * 0.8 ? 'warning' : ''}">${timerFormatted}</span>
            </div>
            <div class="status-item">
              <span class="label">STRIKES</span>
              <span class="value">${strikes}/${GAME_CONFIG.MAX_WRONG_CLICKS}</span>
            </div>
          </div>
          <div class="header-right">
            <button class="btn-small" id="hintBtn" ${hintsLeft === 0 ? 'disabled' : ''}>
              💡 ${hintCooldown > 0 ? hintCooldown : 'Hint'}
            </button>
            <button class="btn-small" id="pauseBtn">⏸</button>
          </div>
        </div>

        <div class="panels">
          <div class="panel-wrapper">
            <div class="panel-label">Original</div>
            <canvas id="leftCanvas" width="${GAME_CONFIG.CANVAS_WIDTH}" height="${GAME_CONFIG.CANVAS_HEIGHT}"></canvas>
          </div>
          <div class="panel-wrapper">
            <div class="panel-label">Spot the changes</div>
            <canvas id="rightCanvas" width="${GAME_CONFIG.CANVAS_WIDTH}" height="${GAME_CONFIG.CANVAS_HEIGHT}"></canvas>
          </div>
        </div>

        <div class="indicators">
          ${[...Array(7)].map((_, i) => `<div class="dot" id="dot-${i}"></div>`).join('')}
        </div>
      </div>
    `;
    
    document.getElementById('hintBtn').addEventListener('click', () => onGameAction('hint'));
    document.getElementById('pauseBtn').addEventListener('click', () => onGameAction('pause'));
    
    return {
      leftCanvas: document.getElementById('leftCanvas'),
      rightCanvas: document.getElementById('rightCanvas'),
      dots: Array.from(document.querySelectorAll('.dot'))
    };
  }

  updateIndicators(dots, found) {
    dots.forEach((dot, i) => {
      if (found.has(i)) {
        dot.classList.add('found');
      } else {
        dot.classList.remove('found');
      }
    });
  }

  showSceneComplete(stars, onNext) {
    const starDisplay = '⭐'.repeat(stars) + '☆'.repeat(3 - stars);
    
    const overlay = document.createElement('div');
    overlay.className = 'scene-complete';
    overlay.innerHTML = `
      <h2>Scene Complete!</h2>
      <div class="stars">${starDisplay}</div>
      <button class="btn" id="nextBtn">Next Scene</button>
    `;
    
    document.body.appendChild(overlay);
    document.getElementById('nextBtn').addEventListener('click', () => {
      overlay.remove();
      onNext();
    });
  }

  showEndScreen(totalScore, sceneScores) {
    const avgStars = (sceneScores.reduce((a, b) => a + b, 0) / sceneScores.length).toFixed(1);
    
    this.root.innerHTML = `
      <div class="game-container">
        <div class="end-screen">
          <h1>Game Complete! 🎉</h1>
          <div class="end-stats">
            <p><strong>Total Score:</strong> ${totalScore}</p>
            <p><strong>Average Stars:</strong> ${avgStars}/3</p>
            <p><strong>Scenes Completed:</strong> ${SCENES.length}</p>
          </div>
          <button class="btn" id="restartBtn">Play Again</button>
        </div>
      </div>
    `;
    
    document.getElementById('restartBtn').addEventListener('click', () => window.location.reload());
  }

  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
}
