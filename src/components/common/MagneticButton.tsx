import React, { useRef, useState } from 'react';

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'gold' | 'glass' | 'subtle';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  ariaLabel?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  onClick,
  className = '',
  variant = 'gold',
  type = 'button',
  disabled = false,
  ariaLabel,
}) => {
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || !btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = (e.clientX - centerX) * 0.22; // magnetic strength
    const distanceY = (e.clientY - centerY) * 0.22;
    setOffset({ x: distanceX, y: distanceY });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  const variantStyle = {
    gold: 'btn-glossy-gold text-[#071426] font-semibold',
    glass: 'btn-glossy-glass text-slate-100 font-medium hover:text-white',
    subtle: 'bg-white/5 hover:bg-white/10 text-slate-200 border border-white/15 backdrop-blur-md',
  }[variant];

  return (
    <button
      ref={btnRef}
      type={type}
      onClick={onClick}
      disabled={disabled}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label={ariaLabel}
      className={`relative inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm rounded-xl transition-all duration-200 cursor-pointer overflow-hidden ${variantStyle} ${
        disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''
      } ${className}`}
      style={{
        transform: `translate3d(${offset.x.toFixed(1)}px, ${offset.y.toFixed(1)}px, 0)`,
        willChange: 'transform',
      }}
    >
      {/* Dynamic glossy specular highlight line */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        aria-hidden="true"
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
};
