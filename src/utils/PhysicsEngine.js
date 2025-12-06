import { BALL_RADIUS, PEG_RADIUS, BOUNCE_FACTOR, PEG_TYPES, BIN_COUNT, BIN_WIDTH, DIVIDER_HEIGHT, SCREEN_HEIGHT } from '../constants/GameConstants';

export const checkCollision = (ball, peg) => {
  const dx = ball.x - peg.x;
  const dy = ball.y - peg.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance < BALL_RADIUS + PEG_RADIUS;
};

export const resolveCollision = (ball, peg) => {
  const dx = ball.x - peg.x;
  const dy = ball.y - peg.y;
  const angle = Math.atan2(dy, dx);
  const overlap = (BALL_RADIUS + PEG_RADIUS) - Math.sqrt(dx*dx + dy*dy);
  ball.x += Math.cos(angle) * overlap;
  ball.y += Math.sin(angle) * overlap;

  const speed = Math.sqrt(ball.vx * ball.vx + ball.vy * ball.vy);
  const variance = (Math.random() - 0.5) * 0.5; // Pling chaos
  ball.vy = Math.sin(angle + variance) * speed * BOUNCE_FACTOR;
};

export const resolveSpecialCollision = (ball, peg, addScoreFn, addTryFn) => {
   const type = peg.type || PEG_TYPES.NORMAL;
   
   let modBounce = BOUNCE_FACTOR;
   if (type.bounceMultiplier) modBounce *= type.bounceMultiplier;
   
   const dx = ball.x - peg.x;
   const dy = ball.y - peg.y;
   const angle = Math.atan2(dy, dx);
   const speed = Math.sqrt(ball.vx * ball.vx + ball.vy * ball.vy);
   const variance = (Math.random() - 0.5) * 0.5;

   ball.vx = Math.cos(angle + variance) * speed * modBounce;
   ball.vy = Math.sin(angle + variance) * speed * modBounce;

   if (type.id === 'BONUS') addScoreFn(50);
   if (type.id === 'EXTRA_TRY') addTryFn();
};

export const checkWallCollision = (ball, wallX, wallTopY) => {
  const wallThickness = 4;
  if (ball.y > wallTopY && Math.abs(ball.x - wallX) < BALL_RADIUS + wallThickness/2) {
      if (ball.x < wallX) ball.x = wallX - (BALL_RADIUS + wallThickness/2);
      else ball.x = wallX + (BALL_RADIUS + wallThickness/2);
      
      ball.vx *= -BOUNCE_FACTOR;
      return true;
  }
  return false;
};
