import React, { useState } from 'react';
import { ParticleEnvironment } from './ParticleEnvironment';
import { HeroLighting } from './HeroLighting';

interface DynamicBackgroundProps {
  videoSrc?: string;
  showParticles?: boolean;
  showLighting?: boolean;
  className?: string;
  scrimOpacity?: 'light' | 'medium' | 'deep';
  children?: React.ReactNode;
}

export const DynamicBackground: React.FC<DynamicBackgroundProps> = ({
  videoSrc,
  showParticles = true,
  showLighting = true,
  className = '',
  scrimOpacity = 'medium',
  children
}) => {
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Gradient scrim opacity mapping
  const scrimClasses = {
    light: 'bg-gradient-to-b from-[#071426]/75 via-[#071426]/60 to-[#071426]',
    medium: 'bg-gradient-to-b from-[#071426]/85 via-[#071426]/75 to-[#071426]',
    deep: 'bg-gradient-to-b from-[#071426]/95 via-[#071426]/85 to-[#071426]'
  }[scrimOpacity];

  return (
    <div className={`relative overflow-hidden bg-[#071426] ${className}`}>
      {/* 1. Base Aurora Mesh & Animated Gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        {/* Top-Right Champagne Gold Aurora */}
        <div className="aurora-glow-gold absolute -top-[20%] -right-[10%] w-[750px] h-[750px] rounded-full blur-[140px] opacity-40" />

        {/* Bottom-Left Royal Blue Aurora */}
        <div className="aurora-glow-blue absolute -bottom-[15%] -left-[10%] w-[850px] h-[850px] rounded-full blur-[160px] opacity-45" />

        {/* Center-Floating Cyan Accent Flare */}
        <div className="aurora-glow-cyan absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full blur-[130px] opacity-25" />
      </div>

      {/* 2. Optional Seamless Video Background with graceful fade-in */}
      {videoSrc && (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={() => setVideoLoaded(true)}
            className={`w-full h-full object-cover transition-opacity duration-1000 ${
              videoLoaded ? 'opacity-35 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
      )}

      {/* 3. Subtle Futuristic Tech Grid Overlay */}
      <div
        className="tech-grid-pattern absolute inset-0 z-0 opacity-40 pointer-events-none"
        aria-hidden="true"
      />

      {/* 4. Contrast Scrim to Guarantee 4.5:1 WCAG AA Legibility */}
      <div
        className={`absolute inset-0 z-0 pointer-events-none ${scrimClasses}`}
        aria-hidden="true"
      />

      {/* Radial vignette edges for cinematic depth */}
      <div
        className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(7,20,38,0.75)_100%)]"
        aria-hidden="true"
      />

      {/* 5. Dynamic Cursor-Follow Spotlight */}
      {showLighting && <HeroLighting />}

      {/* 6. Living 3D Canvas Particle & Polyhedron Environment (Antigravity Cursor Field) */}
      {showParticles && (
        <div className="absolute inset-0 z-[2] pointer-events-none">
          <ParticleEnvironment interactive={true} particleCount={85} />
        </div>
      )}

      {/* Foreground Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
