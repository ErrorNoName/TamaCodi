import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface CodeAnalyzerProps {
  code: string;
  isAnalyzing: boolean;
}

export function CodeAnalyzer({ code, isAnalyzing }: CodeAnalyzerProps) {
  const fragments = code.split('\n').filter(line => line.trim());
  
  return (
    <div className="relative border-4 border-black p-4 bg-white">
      <div className="space-y-2">
        {fragments.map((fragment, index) => (
          <div
            key={index}
            className={`
              font-mono text-sm p-2 border-2 border-black
              transform transition-all duration-300
              ${isAnalyzing ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
            `}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center gap-2">
              {isAnalyzing && (
                <>
                  {/^(function|class|const|let|var)/.test(fragment) ? (
                    <CheckCircle className="w-4 h-4 text-black" />
                  ) : (
                    <XCircle className="w-4 h-4 text-black" />
                  )}
                </>
              )}
              <code>{fragment}</code>
            </div>
          </div>
        ))}
      </div>
      
      {isAnalyzing && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-1 bg-black animate-[analyze_2s_ease-in-out_infinite]" />
        </div>
      )}
    </div>
  );
}