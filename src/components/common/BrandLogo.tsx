import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'full' | 'icon' | 'monochrome';
  theme?: 'light' | 'dark';
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  variant = 'full',
  theme = 'light',
  className = ''
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12'
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl'
  };

  const isLight = theme === 'light';

  return (
    <div className={`flex items-center gap-3 shrink-0 select-none ${className}`}>
      {/* Geometric Shield Icon */}
      <div className={`relative ${iconSizes[size]} shrink-0 flex items-center justify-center`}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_2px_12px_rgba(0,163,255,0.4)]"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="brandShieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00A3FF" />
              <stop offset="100%" stopColor="#0077FE" />
            </linearGradient>
          </defs>
          <polygon
            points="50,6 92,24 92,72 50,94 8,72 8,24"
            fill={isLight ? '#0F172A' : '#040E26'}
            stroke={isLight ? '#D5AD63' : 'url(#brandShieldGrad)'}
            strokeWidth="5"
          />
          {/* Inner stylized A */}
          <path
            d="M50 24 L68 72 L58 72 L54 60 L46 60 L42 72 L32 72 Z M50 42 L47 53 L53 53 Z"
            fill={isLight ? '#D5AD63' : '#00A3FF'}
          />
        </svg>
      </div>

      {variant !== 'icon' && (
        <div className="flex flex-col text-left">
          <span className={`font-bold tracking-[0.16em] leading-none ${isLight ? 'text-slate-900' : 'text-white'} ${textSizes[size]}`}>
            AEGIS <span className={isLight ? 'text-[#0077FE]' : 'text-[#00A3FF]'}>ACADEMY</span>
          </span>
          <span className={`text-[8px] uppercase tracking-wider ${isLight ? 'text-slate-500' : 'text-slate-400'} mt-1 font-medium hidden sm:inline-block`}>
            Where Guidance Meets Growth
          </span>
        </div>
      )}
    </div>
  );
};
