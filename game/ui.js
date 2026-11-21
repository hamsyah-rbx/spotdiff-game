import { SCENES, GAME_CONFIG } from './config.js';

export class UI {
  constructor(root) {
    this.root = root;
  }

  showTitleScreen(onStart) {
    this.root.innerHTML = `
      <div class="game-container title-screen">
        <h1>🔍 Spot the Difference</h1>
        <p>Find all differences between the two panels!</p>
        <div class="preview-panels">
          <canvas id="previewLeft" width="300" height="240"></canvas>
          <canvas id="previewRight" width="300" height="240"></canvas>
        </div>
        <div class="instructions">
          <strong>How to Play:</strong><br>
          Click on differences in either panel. You have ${GAME_CONFIG.MAX_WRONG_CLICKS} wrong clicks per scene.<br>
          Use hints wisely (${GAME_CONFIG.MAX_HINTS} hints total). Press H for hint, P to pause, R to restart, M to mute.
        </div>
        <button class="btn" id="startBtn">Start Game</button>
      </div>
    `;
    
    const previewLeft = document.getElementById('previewLeft');
    const previewRight = document.getElementById('previewRight');
    const ctxL = previewLeft.getContext('2d');
    const ctxR = previewRight.getContext('2d');
    
    import('./scene-art.js').then(module => {
      const art = new module.SceneArt();
      if (art.scenes[0]) {
        art.scenes[0].draw(ctxL, 300, 240, true);
        art.scenes[0].draw(ctxR, 300, 240, false);
      }
    });
    
    document.getElementById('startBtn').addEventListener('click', onStart);
  }

  showGameScreen(sceneIdx, remaining, strikes, timeElapsed, parTime, onGameAction) {
    const hintCooldown = onGameAction._hintCooldown || 0;
    const hintsLeft = onGameAction._hintsLeft || 0;
    
    const timerFormatted = this.formatTime(timeElapsed);
    const parFormatted = this.formatTime(parTime);
    const timerPercent = Math.min(100, (timeElapsed / parTime) * 100);
    
    const totalDiffs = 7;
    const found = totalDiffs - remaining;
    
    // Generate strikes icons (hearts)
    const strikesHTML = [...Array(GAME_CONFIG.MAX_WRONG_CLICKS)].map((_, i) => {
      const isLost = i < strikes;
      return `<div class="strike-icon ${isLost ? 'lost' : 'active'}" id="strike-${i}">❤️</div>`;
    }).join('');
    
    this.root.innerHTML = `
      <div class="game-container">
        <div class="game-header">
          <div class="header-left">
            <h2>Scene ${sceneIdx + 1}/${SCENES.length}</h2>
            <div class="strikes-container">
              ${strikesHTML}
            </div>
          </div>
          
          <div class="header-center">
            <div class="status-item main">
              <span class="value main-counter" id="toFindValue">${remaining}</span>
              <span class="label">TO FIND</span>
            </div>
          </div>
          
          <div class="header-right">
            <div class="timer-container">
              <div class="timer-display">
                <span id="timerValue">${timerFormatted}</span>
                <span class="timer-par">/ ${parFormatted}</span>
              </div>
              <div class="timer-bar">
                <div class="timer-bar-fill" id="timerBarFill" style="width: ${timerPercent}%"></div>
              </div>
            </div>
            <button class="btn-small" id="hintBtn" ${hintsLeft === 0 ? 'disabled' : ''}>
              💡 ${hintCooldown > 0 ? hintCooldown : 'Hint'}
              <span class="key-hint">H</span>
            </button>
            <button class="btn-small" id="pauseBtn">
              ⏸
              <span class="key-hint">P</span>
            </button>
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
          <span class="indicators-text" id="foundText">${found} / ${totalDiffs} found</span>
          <div class="dots-container">
            ${[...Array(totalDiffs)].map((_, i) => `<div class="dot" id="dot-${i}"></div>`).join('')}
          </div>
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

  updateGameStats(remaining, strikes, timeElapsed, parTime) {
    const toFindEl = document.getElementById('toFindValue');
    const timerEl = document.getElementById('timerValue');
    const timerBarFill = document.getElementById('timerBarFill');
    const foundTextEl = document.getElementById('foundText');
    
    const totalDiffs = 7;
    const found = totalDiffs - remaining;
    
    if (toFindEl) {
      const oldValue = parseInt(toFindEl.textContent);
      toFindEl.textContent = remaining;
      // Trigger pulse animation on change
      if (oldValue !== remaining) {
        toFindEl.style.animation = 'none';
        setTimeout(() => {
          toFindEl.style.animation = 'countPulse 0.4s ease-out';
        }, 10);
      }
    }
    
    if (timerEl) {
      timerEl.textContent = this.formatTime(timeElapsed);
      if (timeElapsed > parTime * 0.8) {
        timerEl.classList.add('warning');
      } else {
        timerEl.classList.remove('warning');
      }
    }
    
    if (timerBarFill) {
      const timerPercent = Math.min(100, (timeElapsed / parTime) * 100);
      timerBarFill.style.width = `${timerPercent}%`;
    }
    
    if (foundTextEl) {
      foundTextEl.textContent = `${found} / ${totalDiffs} found`;
    }
    
    // Update strike icons
    for (let i = 0; i < GAME_CONFIG.MAX_WRONG_CLICKS; i++) {
      const strikeEl = document.getElementById(`strike-${i}`);
      if (strikeEl) {
        if (i < strikes) {
          strikeEl.classList.remove('active');
          strikeEl.classList.add('lost');
        } else {
          strikeEl.classList.remove('lost');
          strikeEl.classList.add('active');
        }
      }
    }
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
