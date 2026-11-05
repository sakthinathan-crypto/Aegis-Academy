import React, { useEffect, useState } from 'react';

interface AnimatedHeadingProps {
  className?: string;
}

export const AnimatedHeading: React.FC<AnimatedHeadingProps> = ({ className = '' }) => {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRevealed(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <h1
      className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-balance ${className}`}
    >
      <span className="inline-block overflow-hidden pb-1">
        <span
          className={`inline-block text-white transition-all duration-700 ease-out transform ${
            revealed ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
          style={{ transitionDelay: '100ms' }}
        >
          Empowering
        </span>
      </span>{' '}
      <span className="inline-block overflow-hidden pb-1">
        <span
          className={`inline-block text-white transition-all duration-700 ease-out transform ${
            revealed ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
          style={{ transitionDelay: '250ms' }}
        >
          Minds.
        </span>
      </span>{' '}
      <span className="block sm:inline overflow-hidden pb-1">
        <span
          className={`inline-block gold-gradient-text transition-all duration-700 ease-out transform ${
            revealed ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          Engineering Futures.
        </span>
      </span>
    </h1>
  );
};
