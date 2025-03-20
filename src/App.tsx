import React, { useState, useEffect } from 'react';
import { TamaScreen } from './components/TamaScreen';
import { CodeInput } from './components/CodeInput';
import { DebugChallenge } from './components/DebugChallenge';
import { TamaState } from './types';
import { analyzeCode } from './utils/codeAnalysis.ts';
import { saveState, loadState } from './utils/storage';
import { DEBUG_CHALLENGES } from './utils/challenges';

const initialState: TamaState = {
  stats: {
    energy: 100,
    mood: 100,
    skill: 0,
    health: 100
  },
  level: 1,
  accessories: [],
  messages: ['Hello! I\'m your coding companion!'],
  currentForm: 'baby'
};

function App() {
  const [state, setState] = useState<TamaState>(initialState);
  const [isEating, setIsEating] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentCode, setCurrentCode] = useState<string>();
  const [petMessage, setPetMessage] = useState<string>();
  const [currentChallenge, setCurrentChallenge] = useState<Challenge>();

  // Load saved state on mount
  useEffect(() => {
    const savedState = loadState();
    if (savedState) {
      setState(prev => ({
        ...prev,
        stats: savedState.stats,
        level: savedState.level,
        accessories: savedState.accessories,
        currentForm: savedState.currentForm
      }));
    }
  }, []);

  useEffect(() => {
    // Decrease stats over time
    const interval = setInterval(() => {
      setState(prev => ({
        ...prev,
        stats: {
          ...prev.stats,
          energy: Math.max(0, prev.stats.energy - 1),
          mood: Math.max(0, prev.stats.mood - 0.5),
          health: Math.max(0, prev.stats.health - 0.2)
        }
      }));
    }, 10000); // Every 10 seconds
    
    // Save state every minute
    const saveInterval = setInterval(() => {
      saveState({
        stats: state.stats,
        level: state.level,
        accessories: state.accessories,
        currentForm: state.currentForm,
        lastSaved: Date.now()
      });
    }, 60000);

    return () => {
      clearInterval(interval);
      clearInterval(saveInterval);
    };
  }, []);

  const startDebugChallenge = () => {
    const availableChallenges = DEBUG_CHALLENGES.filter(c => 
      c.difficulty === (state.level === 1 ? 'easy' : state.level === 2 ? 'medium' : 'hard')
    );
    const challenge = availableChallenges[Math.floor(Math.random() * availableChallenges.length)];
    setCurrentChallenge(challenge);
  };

  const handleChallengeComplete = (success: boolean) => {
    if (success) {
      setState(prev => ({
        ...prev,
        stats: {
          ...prev.stats,
          energy: Math.min(100, prev.stats.energy + 20),
          mood: Math.min(100, prev.stats.mood + 30),
          skill: Math.min(100, prev.stats.skill + 15)
        },
        messages: [...prev.messages, 'Great job fixing that bug! 🎉']
      }));
      setPetMessage('You did it! That was some nice debugging! 🎯');
    } else {
      setState(prev => ({
        ...prev,
        stats: {
          ...prev.stats,
          mood: Math.max(0, prev.stats.mood - 10),
          energy: Math.max(0, prev.stats.energy - 5)
        },
        messages: [...prev.messages, 'Keep practicing! You\'ll get better! 💪']
      }));
      setPetMessage('Don\'t worry, debugging is hard! Try again! 🔄');
    }
    setCurrentChallenge(undefined);

    // Clear message after a few seconds
    setTimeout(() => {
      setPetMessage(undefined);
    }, 3000);
  };

  const handleCodeSubmit = (code: string) => {
    setCurrentCode(code);
    setIsEating(true);
    setIsAnalyzing(true);
    
    // Analyze code and update stats
    const analysis = analyzeCode(code);
    
    // Generate detailed feedback message
    const feedback = analysis.isValid
      ? `Mmm, tasty ${analysis.language} code! ${analysis.quality > 0.7 ? '😋\n' : '\n'}Tip: ${analysis.suggestions[0]}`
      : `This ${analysis.language} code needs work... 😕\nTip: ${analysis.suggestions[0]}`;
    
    setPetMessage(feedback);
    
    // Simple evaluation based on code length
    const energy = Math.min(100, state.stats.energy + analysis.quality * 20);
    const skill = Math.min(100, state.stats.skill + analysis.complexity * 10);
    const mood = Math.min(100, state.stats.mood + (analysis.isValid ? 20 : -10));
    
    // Simulate eating and analysis animation
    setTimeout(() => {
      setState(prev => ({
        ...prev,
        stats: {
          ...prev.stats,
          energy,
          skill,
          mood
        },
        messages: [
          ...prev.messages,
          analysis.isValid
            ? `Yum! That ${analysis.language} code was delicious! 🍝\nSuggestion: ${analysis.suggestions[1]}`
            : `Ugh... this ${analysis.language} code needs work 😕\nSuggestion: ${analysis.suggestions[1]}`
        ]
      }));
      setIsEating(false);
    }, 2000);

    // Reset analysis state
    setTimeout(() => {
      setIsAnalyzing(false);
      setCurrentCode(undefined);
      setPetMessage(undefined);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-2xl mx-auto space-y-4">
        <button
          onClick={startDebugChallenge}
          className="w-full px-4 py-2 bg-black text-white font-pixel hover:bg-gray-800 transition-colors"
        >
          Start Debug Challenge
        </button>
        <TamaScreen
          state={state}
          isEating={isEating}
          isAnalyzing={isAnalyzing}
          currentCode={currentCode}
          petMessage={petMessage}
        />
        <CodeInput onSubmit={handleCodeSubmit} />
      </div>
      {currentChallenge && (
        <DebugChallenge
          challenge={currentChallenge}
          onComplete={handleChallengeComplete}
          onClose={() => setCurrentChallenge(undefined)}
        />
      )}
    </div>
  );
}

export default App;
