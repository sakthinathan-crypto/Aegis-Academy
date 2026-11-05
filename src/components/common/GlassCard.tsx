import React, { useRef, useState } from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  tiltEnabled?: boolean;
  glossIntensity?: 'subtle' | 'medium' | 'high';
  variant?: 'card' | 'primary' | 'light';
  ariaLabel?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  onClick,
  tiltEnabled = true,
  glossIntensity = 'medium',
  variant = 'card',
  ariaLabel,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [transformStyle, setTransformStyle] = useState<string>('');
  const [glossPos, setGlossPos] = useState<{ x: number; y: number; opacity: number }>({
    x: 50,
    y: 50,
    opacity: 0,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;

    setGlossPos({
      x: percentX,
      y: percentY,
      opacity: glossIntensity === 'high' ? 0.35 : glossIntensity === 'medium' ? 0.22 : 0.12,
    });

    if (tiltEnabled) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6; // max 6 deg
      const rotateY = ((x - centerX) / centerX) * 6; // max 6 deg

      setTransformStyle(
        `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translate3d(0, -3px, 0)`
      );
    }
  };

  const handleMouseLeave = () => {
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)');
    setGlossPos(prev => ({ ...prev, opacity: 0 }));
  };

  const variantClass = {
    card: 'glass-dark-card text-white',
    primary: 'glass-primary-nav text-white',
    light: 'glass-light-card text-[#0C1B30]',
  }[variant];

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => (e.key === 'Enter' || e.key === ' ') && onClick() : undefined}
      aria-label={ariaLabel}
      className={`group relative overflow-hidden rounded-2xl ${variantClass} ${
        onClick ? 'cursor-pointer select-none' : ''
      } transition-transform duration-200 ease-out ${className}`}
      style={{
        transform: transformStyle,
        willChange: 'transform',
      }}
    >
      {/* Dynamic Specular Glass Sheen Overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
        style={{
          opacity: glossPos.opacity,
          background: `radial-gradient(circle 280px at ${glossPos.x}% ${glossPos.y}%, rgba(255, 255, 255, 0.45), rgba(213, 173, 99, 0.15) 35%, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* Subtle top edge luminous glass reflection */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/35 to-transparent z-10"
        aria-hidden="true"
      />

      {/* Card Content Container */}
      <div className="relative z-0 h-full">{children}</div>
    </div>
  );
};
