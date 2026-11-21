export const SCENES = [
  {
    id: 1,
    title: 'Pirate Cove',
    diffs: 7,
    difficulty: 1,
    par: 45
  },
  {
    id: 2,
    title: 'Enchanted Garden',
    diffs: 7,
    difficulty: 2,
    par: 60
  },
  {
    id: 3,
    title: 'Ancient Temple',
    diffs: 7,
    difficulty: 3,
    par: 75
  },
  {
    id: 4,
    title: 'Midnight Market',
    diffs: 7,
    difficulty: 4,
    par: 90
  },
  {
    id: 5,
    title: 'Dragon\'s Lair',
    diffs: 7,
    difficulty: 5,
    par: 120
  }
];

export const GAME_CONFIG = {
  CANVAS_WIDTH: 600,
  CANVAS_HEIGHT: 400,
  MAX_WRONG_CLICKS: 3,
  HINT_COOLDOWN: 15,
  MAX_HINTS: 3,
  STAR_THRESHOLDS: {
    3: 0.8,
    2: 0.5,
    1: 0
  }
};
