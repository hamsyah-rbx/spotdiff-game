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
    this.scenes = this.sceneGen.generateScenes();
    this.audioManager = new AudioManager();
    this.ui = new UI(this.root);
    this.renderer = null;
    this.inputHandler = null;
    this.lastFrameTime = Date.now();
    this.isRunning = false;
    
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

    const canvases = this.ui.showGameScreen(
      this.scenes[sceneIdx],
      this.gameState,
      (action) => this.handleGameAction(action)
    );

    this.renderer = new Renderer([
      canvases.leftCanvas,
      canvases.rightCanvas
    ]);

    this.inputHandler = new InputHandler(
      this.renderer,
      (x, y, isLeft) => this.handleDifferenceClick(x, y, isLeft),
      () => this.handleHint(),
      () => this.handlePause(),
      () => this.handleRestart(),
      () => this.handleMute()
    );

    this.isRunning = true;
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
    this.renderer.drawScene(scene, this.gameState);
    this.inputHandler.drawCrosshair();

    if (this.gameState.isFindingComplete(scene.diffs.length)) {
      this.completeScene();
    } else {
      requestAnimationFrame(() => this.gameLoop());
    }
  }

  handleDifferenceClick(x, y, isLeft) {
    const scene = this.scenes[this.gameState.currentScene];
    const diffs = this.inputHandler.getCheckDifferences(scene, x, y, isLeft);

    if (diffs.length > 0) {
      const found = diffs.find(idx => !this.gameState.found.has(idx));
      if (found !== undefined) {
        this.gameState.findDifference(found);
        this.audioManager.playFoundSound();
      } else {
        this.gameState.addWrongClick();
        this.audioManager.playErrorSound();

        if (this.gameState.wrongClicks >= GAME_CONFIG.MAX_WRONG_CLICKS) {
          this.failScene();
        }
      }
    } else {
      this.gameState.addWrongClick();
      this.audioManager.playErrorSound();

      if (this.gameState.wrongClicks >= GAME_CONFIG.MAX_WRONG_CLICKS) {
        this.failScene();
      }
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
      this.audioManager.playHintSound();
    }
  }

  handlePause() {
    this.gameState.isPaused = !this.gameState.isPaused;
    this.loadScene();
  }

  handleRestart() {
    this.gameState.found = new Set();
    this.gameState.wrongClicks = 0;
    this.gameState.timeElapsed = 0;
    this.gameState.hintUsed = 0;
    this.gameState.hintCooldown = 0;
    this.loadScene();
  }

  handleMute() {
    this.gameState.isMuted = !this.gameState.isMuted;
    this.audioManager.setMuted(this.gameState.isMuted);
    this.loadScene();
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
    const score = this.calculateScore(scene);

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

  calculateScore(scene) {
    const timePenalty = this.gameState.timeElapsed / scene.par;
    const wrongPenalty = this.gameState.wrongClicks / GAME_CONFIG.MAX_WRONG_CLICKS * 0.5;
    const score = Math.max(1, 3 - timePenalty - wrongPenalty);
    return Math.round(score * 10) / 10;
  }

  showGameEnd() {
    this.ui.showEndScreen(this.gameState.totalScore, this.gameState.sceneScores);
  }
}

new Game();
