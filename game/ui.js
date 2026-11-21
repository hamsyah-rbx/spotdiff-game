import { SCENES, GAME_CONFIG } from './config.js';

export class UI {
  constructor(root) {
    this.root = root;
  }

  showTitleScreen(onStart) {
    this.root.innerHTML = `
      <div class="game-container">
        <div class="title-screen">
          <h1>🎯 Treasure Hunt Diff</h1>
          <p>Find all the differences between two treasure scenes!</p>
          <div class="instructions">
            <strong>How to Play:</strong><br>
            Spot differences and click on them to mark them.<br>
            You have ${GAME_CONFIG.MAX_WRONG_CLICKS} wrong clicks per scene.<br>
            Use hints wisely (${GAME_CONFIG.MAX_HINTS} hints, H key to use).<br>
            <br>
            <strong>Controls:</strong> H = Hint, P = Pause, R = Restart, M = Mute
          </div>
          <button class="btn" id="startBtn">Start Game</button>
        </div>
      </div>
    `;
    
    document.getElementById('startBtn').addEventListener('click', onStart);
  }

  showGameScreen(scene, gameState, onGameAction) {
    const sceneIdx = gameState.currentScene;
    const remaining = scene.diffs.length - gameState.found.size;
    const hintCooldown = Math.ceil(gameState.hintCooldown);
    const timerClass = gameState.timeElapsed > scene.par * 0.8 ? 'timer warning' : 'timer';
    
    this.root.innerHTML = `
      <div class="game-container">
        <h2>${scene.name} (Scene ${sceneIdx + 1}/${SCENES.length})</h2>
        
        <div class="stats">
          <div class="stat-item">
            <span class="stat-label">Found</span>
            <span>${gameState.found.size}/${scene.diffs.length}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Remaining</span>
            <span>${remaining}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Wrong Clicks</span>
            <span>${gameState.wrongClicks}/${GAME_CONFIG.MAX_WRONG_CLICKS}</span>
          </div>
          <div class="stat-item">
            <span class="${timerClass}">${this.formatTime(gameState.timeElapsed)}</span>
            <span class="stat-label">Par: ${this.formatTime(scene.par)}</span>
          </div>
        </div>
        
        <div class="game-board">
          <canvas id="leftCanvas" width="${GAME_CONFIG.CANVAS_WIDTH}" height="${GAME_CONFIG.CANVAS_HEIGHT}"></canvas>
          <canvas id="rightCanvas" width="${GAME_CONFIG.CANVAS_WIDTH}" height="${GAME_CONFIG.CANVAS_HEIGHT}"></canvas>
        </div>
        
        <div class="controls">
          <button class="btn hint-btn" id="hintBtn" ${!gameState.canUseHint() ? 'disabled' : ''}>
            💡 Hint ${gameState.hintUsed}/${GAME_CONFIG.MAX_HINTS}
            ${hintCooldown > 0 ? `(${hintCooldown}s)` : ''}
          </button>
          <button class="btn" id="pauseBtn">⏸ ${gameState.isPaused ? 'Resume' : 'Pause'}</button>
          <button class="btn" id="restartBtn">🔄 Restart</button>
          <button class="btn" id="muteBtn">🔊 ${gameState.isMuted ? 'Unmute' : 'Mute'}</button>
        </div>
      </div>
      <div class="muted-indicator ${gameState.isMuted ? 'show' : ''}">🔇 Muted</div>
    `;
    
    document.getElementById('hintBtn').addEventListener('click', () => onGameAction('hint'));
    document.getElementById('pauseBtn').addEventListener('click', () => onGameAction('pause'));
    document.getElementById('restartBtn').addEventListener('click', () => onGameAction('restart'));
    document.getElementById('muteBtn').addEventListener('click', () => onGameAction('mute'));
    
    return {
      leftCanvas: document.getElementById('leftCanvas'),
      rightCanvas: document.getElementById('rightCanvas')
    };
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
