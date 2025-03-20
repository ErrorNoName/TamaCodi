import React, { useState, useEffect } from 'react';
import { TamaState } from '../types';

interface PetProps {
  state: TamaState;
  isEating: boolean;
  isHappy: boolean;
  message?: string;
}

export function Pet({ state, isEating, isHappy, message }: PetProps) {
  const [blinking, setBlinking] = useState(false);
  
  // Random blinking animation
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlinking(true);
      setTimeout(() => setBlinking(false), 200);
    }, Math.random() * 3000 + 2000);
    
    return () => clearInterval(blinkInterval);
  }, []);

  const getExpression = () => {
    if (isEating) return '◕‿◕';
    if (isHappy) return '^‿^';
    if (state.stats.energy < 30) return '⊙﹏⊙';
    if (state.stats.mood < 30) return '◡︵◡';
    return blinking ? '─‿─' : '◕‿◕';
  };

  return (
    <div className="relative w-32 h-32 transition-all duration-300">
      {/* Pet body */}
      <div className="absolute inset-0 border-8 border-black rounded-full bg-white">
        {/* Face */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-pixel text-4xl transform transition-all duration-300">
            {getExpression()}
          </span>
        </div>
      </div>
      
      {/* Speech bubble */}
      {message && (
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-48">
          <div className="relative bg-white border-4 border-black p-2 rounded-lg">
            <div className="font-pixel text-sm text-center whitespace-pre-line">{message}</div>
            {/* Speech bubble tail */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
              <div className="w-4 h-4 bg-white border-4 border-black rotate-45" />
            </div>
          </div>
        </div>
      )}
      
      {/* Accessories based on level */}
      {state.level >= 2 && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="text-2xl">▲</span>
        </div>
      )}
      
      {/* Eating animation */}
      {isEating && (
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <span className="font-pixel text-2xl">nom nom</span>
        </div>
      )}
    </div>
  );
}