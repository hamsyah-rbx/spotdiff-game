import { GAME_CONFIG } from './config.js';

export class GameState {
  constructor() {
    this.reset();
  }

  reset() {
    this.currentScene = 0;
    this.found = new Set();
    this.wrongClicks = 0;
    this.timeElapsed = 0;
    this.hintUsed = 0;
    this.hintCooldown = 0;
    this.isPaused = false;
    this.isMuted = false;
    this.totalScore = 0;
    this.sceneScores = [];
    this.gameStarted = false;
  }

  startGame() {
    this.gameStarted = true;
    this.currentScene = 0;
    this.found = new Set();
    this.wrongClicks = 0;
    this.timeElapsed = 0;
    this.hintUsed = 0;
    this.hintCooldown = 0;
    this.totalScore = 0;
    this.sceneScores = [];
  }

  findDifference(index) {
    this.found.add(index);
  }

  isFindingComplete(totalDiffs) {
    return this.found.size === totalDiffs;
  }

  addWrongClick() {
    this.wrongClicks++;
  }

  canUseHint() {
    return this.hintUsed < GAME_CONFIG.MAX_HINTS && this.hintCooldown === 0;
  }

  useHint() {
    this.hintUsed++;
    this.hintCooldown = GAME_CONFIG.HINT_COOLDOWN;
  }

  updateTimer(delta) {
    if (!this.isPaused && this.gameStarted) {
      this.timeElapsed += delta;
    }
  }

  updateHintCooldown(delta) {
    if (this.hintCooldown > 0) {
      this.hintCooldown = Math.max(0, this.hintCooldown - delta);
    }
  }

  nextScene() {
    this.currentScene++;
    this.found = new Set();
    this.wrongClicks = 0;
    this.hintUsed = 0;
    this.hintCooldown = 0;
  }

  saveSceneScore(score) {
    this.sceneScores.push(score);
    this.totalScore += score;
  }
}
