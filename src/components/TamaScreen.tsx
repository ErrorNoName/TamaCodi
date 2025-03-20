import React from 'react';
import { Monitor } from 'lucide-react';
import { PixelContainer } from './PixelContainer';
import { StatBar } from './StatBar';
import { Pet } from './Pet';
import { CodeAnalyzer } from './CodeAnalyzer';
import { TamaState } from '../types';

interface TamaScreenProps extends React.PropsWithChildren {
  state: TamaState;
  isEating?: boolean;
  isAnalyzing?: boolean;
  currentCode?: string;
  petMessage?: string;
}

export function TamaScreen({ state, isEating, isAnalyzing, currentCode, petMessage }: TamaScreenProps) {
  return (
    <PixelContainer className="max-w-md mx-auto">
      <div className="flex items-center justify-center mb-4">
        <Monitor className="w-8 h-8" />
        <h2 className="font-pixel text-xl ml-2">TamaCode</h2>
      </div>
      
      <div className="space-y-4">
        <div className="aspect-square border-4 border-black p-4 flex flex-col items-center justify-center">
          <Pet
            state={state}
            isEating={isEating}
            isHappy={state.stats.mood > 80}
            message={petMessage}
          />
          {currentCode && isAnalyzing && (
            <div className="mt-4 w-full">
              <CodeAnalyzer code={currentCode} isAnalyzing={isAnalyzing} />
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <StatBar label="Energy" value={state.stats.energy} />
          <StatBar label="Mood" value={state.stats.mood} />
          <StatBar label="Skill" value={state.stats.skill} />
          <StatBar label="Health" value={state.stats.health} />
        </div>
        
        <div className="h-24 border-2 border-black p-2 overflow-y-auto font-pixel text-sm">
          {state.messages.map((msg, i) => (
            <p key={i} className="mb-1">&gt; {msg}</p>
          ))}
        </div>
      </div>
    </PixelContainer>
  );
}