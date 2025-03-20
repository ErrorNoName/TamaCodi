import React from 'react';

interface PixelContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function PixelContainer({ children, className = '' }: PixelContainerProps) {
  return (
    <div className={`border-4 border-black p-4 bg-white shadow-[8px_8px_0_0_rgba(0,0,0,1)] ${className}`}>
      {children}
    </div>
  );
}