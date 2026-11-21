import { SCENES, GAME_CONFIG } from './config.js';
import { GameState } from './game-state.js';
import { SceneGenerator } from './scene-generator.js';
import { Renderer } from './render.js';
import { InputHandler } from './input.js';
import { AudioManager } from './audio.js';
import { UI } from './ui.js';

class Game {
  constructor() {
    this.root = document.getElementById('root');
    this.gameState = new GameState();
    this.sceneGen = new SceneGenerator();
    this.scenes = this.sceneGen.scenes;
    this.audioManager = new AudioManager();
    this.ui = new UI(this.root);
    this.renderer = null;
    this.inputHandler = null;
    this.lastFrameTime = Date.now();
    this.isRunning = false;
    this.dots = [];
    
    this.showTitle();
  }

  showTitle() {
    this.ui.showTitleScreen(() => this.startGame());
  }

  startGame() {
    this.gameState.startGame();
    this.gameState.currentScene = 0;
    this.loadScene();
  }

  loadScene() {
    const sceneIdx = this.gameState.currentScene;
    if (sceneIdx >= this.scenes.length) {
      this.showGameEnd();
      return;
    }

    const scene = this.scenes[sceneIdx];
    const remaining = scene.diffs.length - this.gameState.found.size;
    const parTime = SCENES[sceneIdx]?.par || 60;

    const action = (type) => this.handleGameAction(type);
    action._hintCooldown = Math.ceil(this.gameState.hintCooldown);
    action._hintsLeft = GAME_CONFIG.MAX_HINTS - this.gameState.hintsUsed;

    const { leftCanvas, rightCanvas, dots } = this.ui.showGameScreen(
      sceneIdx,
      remaining,
      this.gameState.strikes,
      this.gameState.timeElapsed,
      parTime,
      action
    );

    this.dots = dots;
    this.updateIndicators();

    this.renderer = new Renderer([leftCanvas, rightCanvas]);
    this.inputHandler = new InputHandler(
      this.renderer,
      (x, y, isLeft) => this.handleDifferenceClick(x, y, isLeft),
      () => this.handleHint(),
      () => this.handlePause(),
      () => this.handleRestart(),
      () => this.handleMute()
    );

    this.isRunning = true;
    this.lastFrameTime = Date.now();
    this.gameLoop();
  }

  gameLoop() {
    if (!this.isRunning) return;

    const now = Date.now();
    const delta = (now - this.lastFrameTime) / 1000;
    this.lastFrameTime = now;

    this.gameState.updateTimer(delta);
    this.gameState.updateHintCooldown(delta);

    const scene = this.scenes[this.gameState.currentScene];
    const parTime = SCENES[this.gameState.currentScene]?.par || 60;
    const remaining = scene.diffs.length - this.gameState.found.size;
    
    this.ui.updateGameStats(remaining, this.gameState.strikes, this.gameState.timeElapsed, parTime);
    this.renderer.drawScene(scene, this.gameState.found);
    this.renderer.updateAnimation(delta);
    this.inputHandler.drawCrosshair();
    this.updateIndicators();

    if (this.gameState.isFindingComplete(scene.diffs.length)) {
      this.completeScene();
    } else if (this.gameState.hasGameOver()) {
      this.failScene();
    } else {
      requestAnimationFrame(() => this.gameLoop());
    }
  }

  handleDifferenceClick(x, y, isLeft) {
    const scene = this.scenes[this.gameState.currentScene];
    const diffs = this.inputHandler.getCheckDifferences(scene, x, y);

    if (diffs.length > 0) {
      const found = diffs.find(idx => !this.gameState.found.has(idx));
      if (found !== undefined) {
        this.gameState.findDifference(found);
        this.audioManager.playFoundSound();
        this.updateIndicators();
      } else {
        this.gameState.addStrike();
        this.audioManager.playErrorSound();
        this.shakeScreen();
      }
    } else {
      this.gameState.addStrike();
      this.audioManager.playErrorSound();
      this.shakeScreen();
    }
  }

  shakeScreen() {
    const container = document.querySelector('.game-container');
    if (container) {
      container.style.animation = 'shake 0.3s';
      setTimeout(() => {
        container.style.animation = '';
      }, 300);
    }
  }

  handleHint() {
    if (!this.gameState.canUseHint()) return;

    const scene = this.scenes[this.gameState.currentScene];
    const unFound = [];

    scene.diffs.forEach((_, idx) => {
      if (!this.gameState.found.has(idx)) {
        unFound.push(idx);
      }
    });

    if (unFound.length > 0) {
      const hint = unFound[Math.floor(Math.random() * unFound.length)];
      this.gameState.useHint();
      this.renderer.showHint(hint);
      this.audioManager.playHintSound();
    }
  }

  handlePause() {
    this.gameState.isPaused = !this.gameState.isPaused;
    this.loadScene();
  }

  handleRestart() {
    this.gameState.found = new Set();
    this.gameState.strikes = 0;
    this.gameState.timeElapsed = 0;
    this.gameState.hintsUsed = 0;
    this.gameState.hintCooldown = 0;
    this.loadScene();
  }

  handleMute() {
    this.gameState.isMuted = !this.gameState.isMuted;
    this.audioManager.setMuted(this.gameState.isMuted);
  }

  handleGameAction(action) {
    switch (action) {
      case 'hint':
        this.handleHint();
        break;
      case 'pause':
        this.handlePause();
        break;
      case 'restart':
        this.handleRestart();
        break;
      case 'mute':
        this.handleMute();
        break;
    }
  }

  completeScene() {
    this.isRunning = false;
    const scene = this.scenes[this.gameState.currentScene];
    const parTime = SCENES[this.gameState.currentScene]?.par || 60;
    const score = this.calculateScore(parTime);

    this.audioManager.playSceneCompleteSound();
    this.gameState.saveSceneScore(score);

    const stars = score > 2 ? 3 : score > 1 ? 2 : 1;
    this.ui.showSceneComplete(stars, () => {
      this.gameState.nextScene();
      this.loadScene();
    });
  }

  failScene() {
    this.isRunning = false;
    alert('Game Over! Too many wrong clicks.');
    this.showTitle();
  }

  calculateScore(parTime) {
    const timePenalty = this.gameState.timeElapsed / parTime;
    const strikePenalty = (this.gameState.strikes / GAME_CONFIG.MAX_WRONG_CLICKS) * 0.5;
    const score = Math.max(1, 3 - timePenalty - strikePenalty);
    return Math.round(score * 10) / 10;
  }

  updateIndicators() {
    if (this.dots.length === 0) return;
    this.dots.forEach((dot, i) => {
      if (this.gameState.found.has(i)) {
        dot.classList.add('found');
      } else {
        dot.classList.remove('found');
      }
    });
  }

  showGameEnd() {
    this.ui.showEndScreen(this.gameState.totalScore, this.gameState.sceneScores);
  }
}

new Game();
