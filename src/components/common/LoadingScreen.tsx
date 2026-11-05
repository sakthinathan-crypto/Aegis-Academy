import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [fadeState, setFadeState] = useState<'visible' | 'fading' | 'hidden'>('visible');

  useEffect(() => {
    // Check if ?autostart=1 is present to skip animation for automated testing / ultra mode
    if (typeof window !== 'undefined' && window.location.search.includes('autostart=1')) {
      onComplete();
      setFadeState('hidden');
      return;
    }

    const timer = setTimeout(() => {
      setFadeState('fading');
      setTimeout(() => {
        setFadeState('hidden');
        onComplete();
      }, 400);
    }, 700);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (fadeState === 'hidden') return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#071426] transition-opacity duration-400 ease-out ${
        fadeState === 'fading' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative flex flex-col items-center">
        {/* Animated Aegis Geometric Shield */}
        <div className="relative w-20 h-20 mb-6 flex items-center justify-center">
          <div className="absolute inset-0 rounded-2xl bg-[#D5AD63]/10 blur-xl animate-pulse" />
          <svg
            className="w-16 h-16 transition-all duration-700 animate-in fade-in zoom-in-75"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon
              points="50,6 92,24 92,72 50,94 8,72 8,24"
              fill="#0A1D36"
              stroke="#D5AD63"
              strokeWidth="4"
              className="drop-shadow-[0_0_12px_rgba(213,173,99,0.3)]"
            />
            {/* Inner stylized A */}
            <path
              d="M50 24 L68 72 L58 72 L54 60 L46 60 L42 72 L32 72 Z M50 42 L47 53 L53 53 Z"
              fill="#D5AD63"
            />
          </svg>
        </div>

        {/* Wordmark */}
        <div className="text-center">
          <div className="text-xl md:text-2xl font-bold tracking-[0.25em] text-white">
            AEGIS <span className="text-[#D5AD63]">ACADEMY</span>
          </div>
          <p className="mt-2 text-xs uppercase tracking-widest text-slate-400 font-medium">
            Alliance of Entrepreneurs Guiding Innovation & Strategies
          </p>
        </div>

        {/* Minimal progress line */}
        <div className="w-44 h-0.5 mt-8 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-transparent via-[#D5AD63] to-transparent w-full animate-[shimmer_1s_infinite]" />
        </div>
      </div>
    </div>
  );
};
