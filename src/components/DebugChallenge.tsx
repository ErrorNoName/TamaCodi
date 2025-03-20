import React, { useState, useEffect } from 'react';
import { Challenge } from '../types';
import { PixelContainer } from './PixelContainer';
import { Timer, Bug } from 'lucide-react';

interface DebugChallengeProps {
  challenge: Challenge;
  onComplete: (success: boolean) => void;
  onClose: () => void;
}

export function DebugChallenge({ challenge, onComplete, onClose }: DebugChallengeProps) {
  const [timeLeft, setTimeLeft] = useState(challenge.timeLimit);
  const [answer, setAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState(0);

  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete(false);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onComplete]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = answer.trim().toLowerCase() === challenge.answer.toLowerCase();
    onComplete(success);
  };

  const showNextHint = () => {
    if (currentHint < challenge.hints.length - 1) {
      setCurrentHint(prev => prev + 1);
    }
    setShowHint(true);
  };

  return (
    <PixelContainer className="fixed inset-4 md:inset-10 bg-white z-50 overflow-auto">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <Bug className="w-6 h-6 mr-2" />
          <h2 className="font-pixel text-xl">Debug Challenge</h2>
        </div>
        <div className="flex items-center">
          <Timer className="w-4 h-4 mr-1" />
          <span className="font-pixel">{timeLeft}s</span>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <p className="font-pixel mb-2">{challenge.question}</p>
          <pre className="font-mono text-sm p-4 bg-gray-100 border-2 border-black overflow-x-auto">
            {challenge.code}
          </pre>
        </div>

        <form onSubmit={handleSubmit} className="space-y-2">
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-full h-24 p-2 font-mono text-sm border-2 border-black resize-none focus:outline-none"
            placeholder="Enter your fix here..."
          />
          <div className="flex justify-between">
            <button
              type="button"
              onClick={showNextHint}
              className="px-4 py-2 border-2 border-black font-pixel hover:bg-gray-100"
            >
              Show Hint
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white font-pixel hover:bg-gray-800"
            >
              Submit Fix
            </button>
          </div>
        </form>

        {showHint && (
          <div className="p-4 border-2 border-black bg-gray-100">
            <p className="font-pixel">💡 Hint: {challenge.hints[currentHint]}</p>
          </div>
        )}
      </div>

      <button
        onClick={onClose}
        className="absolute top-4 right-4 font-pixel hover:opacity-75"
      >
        ✕
      </button>
    </PixelContainer>
  );
}