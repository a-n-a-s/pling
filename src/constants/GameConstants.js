import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;

export const PEG_RADIUS = 6;
export const BALL_RADIUS = 12;
export const GRAVITY = 0.8;
export const BOUNCE_FACTOR = 0.8;
export const FRICTION = 0.96;
export const PEG_ROWS = 8;
export const PEG_SPACING_X = 50;
export const PEG_SPACING_Y = 50;
export const START_Y = 280;
export const MAX_TRIES = 5;
export const BIN_COUNT = 5;
export const BIN_WIDTH = width / BIN_COUNT;
export const DIVIDER_HEIGHT = 140;

export const PEG_TYPES = {
  NORMAL: { id: 'NORMAL', color: '#FFFFFF', probability: 0.7 },
  TRAMPOLINE: { id: 'TRAMPOLINE', color: '#00D2D3', probability: 0.1, bounceMultiplier: 1.8 },
  STICKY: { id: 'STICKY', color: '#8395a7', probability: 0.1, bounceMultiplier: 0.2 },
  BONUS: { id: 'BONUS', color: '#f368e0', probability: 0.05, score: 50 },
  EXTRA_TRY: { id: 'EXTRA_TRY', color: '#ff9f43', probability: 0.02 },
};
