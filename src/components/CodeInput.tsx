import React, { useState } from 'react';
import { Code } from 'lucide-react';

interface CodeInputProps {
  onSubmit: (code: string) => void;
}

export function CodeInput({ onSubmit }: CodeInputProps) {
  const [code, setCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim()) {
      onSubmit(code);
      setCode('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="flex items-center mb-2">
        <Code className="w-4 h-4 mr-2" />
        <span className="font-pixel text-sm">Feed with code:</span>
      </div>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full h-32 p-2 font-mono text-sm border-4 border-black resize-none focus:outline-none"
        placeholder="Paste your code here..."
      />
      <button
        type="submit"
        className="w-full mt-2 px-4 py-2 bg-black text-white font-pixel hover:bg-gray-800 transition-colors"
      >
        Feed
      </button>
    </form>
  );
}