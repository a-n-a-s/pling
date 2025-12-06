import { useState, useEffect, useRef } from 'react';
import { 
    PEG_RADIUS, BALL_RADIUS, GRAVITY, FRICTION, BOUNCE_FACTOR, 
    PEG_ROWS, PEG_SPACING_X, PEG_SPACING_Y, START_Y, 
    MAX_TRIES, BIN_COUNT, BIN_WIDTH, DIVIDER_HEIGHT,
    SCREEN_WIDTH, SCREEN_HEIGHT, PEG_TYPES 
} from '../constants/GameConstants';
import { checkCollision, resolveCollision, resolveSpecialCollision, checkWallCollision } from '../utils/PhysicsEngine';
import { useSoundManager } from './useSoundManager';

export const useGameLoop = ({ onShake }) => {
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [tries, setTries] = useState(MAX_TRIES);
    const [balls, setBalls] = useState([]);
    const [particles, setParticles] = useState([]);

    const ballsRef = useRef([]);
    const pegsRef = useRef([]);
    const requestRef = useRef();
    
    const { play: playSound } = useSoundManager();

    // Initialize Pegs
    useEffect(() => {
        const newPegs = [];
        for (let row = 0; row < PEG_ROWS; row++) {
          const pinsInRow = row + 3; 
          const rowWidth = (pinsInRow - 1) * PEG_SPACING_X;
          const startX = (SCREEN_WIDTH - rowWidth) / 2;
    
          for (let col = 0; col < pinsInRow; col++) {
             let type = PEG_TYPES.NORMAL;
             const rand = Math.random();
             let cumulative = 0;
             
             if (rand < (cumulative += PEG_TYPES.TRAMPOLINE.probability)) type = PEG_TYPES.TRAMPOLINE;
             else if (rand < (cumulative += PEG_TYPES.STICKY.probability)) type = PEG_TYPES.STICKY;
             else if (rand < (cumulative += PEG_TYPES.BONUS.probability)) type = PEG_TYPES.BONUS;
             else if (rand < (cumulative += PEG_TYPES.EXTRA_TRY.probability)) type = PEG_TYPES.EXTRA_TRY;
    
            newPegs.push({
              x: startX + col * PEG_SPACING_X,
              y: START_Y + row * PEG_SPACING_Y,
              id: `peg-${row}-${col}`,
              type: type
            });
          }
        }
        pegsRef.current = newPegs;
    }, []);

    const spawnParticles = (x, y, color) => {
        const id = Date.now() + Math.random();
        const newParts = Array.from({ length: 5 }).map((_, i) => ({
            id: id + i,
            x: x + (Math.random() - 0.5) * 20,
            y: y + (Math.random() - 0.5) * 20,
            color: color
        }));
        setParticles(prev => [...prev, ...newParts]);
        setTimeout(() => {
            setParticles(prev => prev.filter(p => !newParts.find(np => np.id === p.id)));
        }, 600);
    };

    const addScore = (amount, x, y) => {
        setScore(s => s + amount);
        if (x && y) spawnParticles(x, y, '#FFD700'); 
        playSound('score');
    };
     
    const addTry = () => {
       setTries(t => t + 1);
    };

    const animate = () => {
        const activeBalls = [];
        let scoreDelta = 0;
    
        ballsRef.current.forEach(ball => {
          ball.vy += GRAVITY;
          ball.vx *= FRICTION;
          ball.vy *= FRICTION;
          ball.x += ball.vx;
          ball.y += ball.vy;
    
          if (ball.x < BALL_RADIUS) {
            ball.x = BALL_RADIUS;
            ball.vx *= -BOUNCE_FACTOR;
          } else if (ball.x > SCREEN_WIDTH - BALL_RADIUS) {
            ball.x = SCREEN_WIDTH - BALL_RADIUS;
            ball.vx *= -BOUNCE_FACTOR;
          }
    
          pegsRef.current.forEach(peg => {
            if (checkCollision(ball, peg)) {
               resolveSpecialCollision(ball, peg, 
                  (amt) => addScore(amt, peg.x, peg.y), 
                  addTry
               );
               if (peg.type && peg.type.id === 'TRAMPOLINE') onShake();
               if (peg.type && peg.type.id === 'BONUS') spawnParticles(peg.x, peg.y, '#f368e0');
               
               if (peg.type && peg.type.id === 'TRAMPOLINE') playSound('bounce_heavy');
               else playSound('pling');
            }
          });
    
          if (ball.y > SCREEN_HEIGHT) {
            const distFromCenter = Math.abs(ball.x - SCREEN_WIDTH / 2);
            if (distFromCenter < 50) { scoreDelta += 100; spawnParticles(ball.x, SCREEN_HEIGHT-50, '#Feca57'); }
            else if (distFromCenter < 100) { scoreDelta += 50; spawnParticles(ball.x, SCREEN_HEIGHT-50, '#54A0FF'); }
            else { scoreDelta += 10; spawnParticles(ball.x, SCREEN_HEIGHT-50, '#FF9FF3'); }
          } else {
            activeBalls.push(ball);
          }
          
          for (let i = 1; i < BIN_COUNT; i++) {
             const wallX = i * BIN_WIDTH;
             const wallTopY = SCREEN_HEIGHT - DIVIDER_HEIGHT;
             checkWallCollision(ball, wallX, wallTopY);
          }
        });
    
        ballsRef.current = activeBalls;
        setBalls([...activeBalls]); 
        if (scoreDelta > 0) {
          setScore(s => {
            const newScore = s + scoreDelta;
            if (newScore > bestScore) setBestScore(newScore);
            return newScore;
          });
        }
    
        requestRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current);
    }, [bestScore]); 

    const spawnBall = () => {
        if (tries <= 0) return;
        const startX = Math.random() * (SCREEN_WIDTH - 40) + 20;
        const newBall = {
          x: startX,
          y: 50,
          vx: (Math.random() - 0.5) * 5, 
          vy: 0,
          id: Date.now() + Math.random()
        };
        ballsRef.current.push(newBall);
        setTries(t => t - 1);
    };

    const resetGame = () => {
        setScore(0);
        setTries(MAX_TRIES);
        setBalls([]);
        ballsRef.current = [];
    };

    return {
        score,
        bestScore,
        tries,
        balls,
        particles,
        pegs: pegsRef.current,
        spawnBall,
        resetGame
    };
};
