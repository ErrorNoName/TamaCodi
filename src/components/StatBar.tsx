import React from 'react';

interface StatBarProps {
  label: string;
  value: number;
  max?: number;
}

export function StatBar({ label, value, max = 100 }: StatBarProps) {
  const percentage = Math.min(100, (value / max) * 100);
  
  return (
    <div className="mb-2">
      <div className="flex justify-between text-xs mb-1">
        <span className="font-pixel">{label}</span>
        <span className="font-pixel">{value}/{max}</span>
      </div>
      <div className="h-4 bg-white border-2 border-black">
        <div 
          className="h-full bg-black transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}