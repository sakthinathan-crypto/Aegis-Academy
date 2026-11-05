import React from 'react';
import { AmbientLighting } from './AmbientLighting';
import { HeroParticleField } from './HeroParticleField';

interface DynamicHeroBackgroundProps {
  className?: string;
  children?: React.ReactNode;
}

export const DynamicHeroBackground: React.FC<DynamicHeroBackgroundProps> = ({
  className = '',
  children
}) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Dynamic Aurora & Cursor-following Spotlight Lighting */}
      <AmbientLighting />

      {/* Floating Constellation Particle Mesh */}
      <HeroParticleField particleCount={60} />

      {/* Foreground Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
