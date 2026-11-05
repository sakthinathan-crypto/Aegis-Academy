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
          className="w-full h-full drop-shadow-[0_2px_8px_rgba(213,173,99,0.35)]"
          aria-hidden="true"
        >
          <polygon
            points="50,6 92,24 92,72 50,94 8,72 8,24"
            fill="#0F172A"
            stroke="#D5AD63"
            strokeWidth="5"
          />
          {/* Inner stylized A */}
          <path
            d="M50 24 L68 72 L58 72 L54 60 L46 60 L42 72 L32 72 Z M50 42 L47 53 L53 53 Z"
            fill="#D5AD63"
          />
        </svg>
      </div>

      {variant !== 'icon' && (
        <div className="flex flex-col text-left">
          <span className={`font-bold tracking-[0.16em] leading-none ${isLight ? 'text-slate-900' : 'text-white'} ${textSizes[size]}`}>
            AEGIS <span className="text-[#D5AD63]">ACADEMY</span>
          </span>
          <span className={`text-[9px] uppercase tracking-wider ${isLight ? 'text-slate-500' : 'text-slate-400'} mt-1 font-medium hidden sm:inline-block`}>
            Pvt. Ltd.
          </span>
        </div>
      )}
    </div>
  );
};
