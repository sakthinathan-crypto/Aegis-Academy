import React, { useEffect, useRef, useState } from 'react';

interface AmbientLightingProps {
  className?: string;
}

export const AmbientLighting: React.FC<AmbientLightingProps> = ({ className = '' }) => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 45 });
  const targetPos = useRef({ x: 50, y: 45 });
  const animFrame = useRef<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      targetPos.current = { x, y };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const updateLerp = () => {
      setMousePos(prev => ({
        x: prev.x + (targetPos.current.x - prev.x) * 0.06,
        y: prev.y + (targetPos.current.y - prev.y) * 0.06,
      }));
      animFrame.current = requestAnimationFrame(updateLerp);
    };

    animFrame.current = requestAnimationFrame(updateLerp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
    };
  }, []);

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden z-0 transition-opacity duration-700 ${className}`}
      aria-hidden="true"
    >
      {/* 1. Deep Midnight-to-Aegis Blue Base Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0C1B30] via-[#102B4E] to-[#17385F] opacity-95" />

      {/* 2. Top-Right Champagne Gold Aurora */}
      <div
        className="aurora-glow-gold absolute -top-[15%] -right-[8%] w-[650px] h-[650px] rounded-full blur-[140px] opacity-35"
      />

      {/* 3. Bottom-Left Aegis Royal Blue Aurora */}
      <div
        className="aurora-glow-blue absolute -bottom-[12%] -left-[8%] w-[750px] h-[750px] rounded-full blur-[160px] opacity-45"
      />

      {/* 4. Center Electric Cyan Accent Flare */}
      <div
        className="aurora-glow-cyan absolute top-1/3 left-1/3 w-[550px] h-[550px] rounded-full blur-[140px] opacity-25"
      />

      {/* 5. Dynamic Cursor-Following Gold Spotlight */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[130px] opacity-25 mix-blend-screen transition-transform duration-75"
        style={{
          left: `${mousePos.x}%`,
          top: `${mousePos.y}%`,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(213, 173, 99, 0.45) 0%, rgba(213, 173, 99, 0.08) 50%, transparent 70%)',
          willChange: 'left, top',
        }}
      />

      {/* 6. Counter-Flow Blue Spotlight */}
      <div
        className="absolute w-[700px] h-[700px] rounded-full blur-[150px] opacity-30 mix-blend-screen"
        style={{
          left: `${100 - mousePos.x * 0.6}%`,
          top: `${100 - mousePos.y * 0.6}%`,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.3) 0%, rgba(40, 91, 145, 0.15) 50%, transparent 75%)',
        }}
      />

      {/* 7. Subtle Futuristic Tech Grid */}
      <div className="tech-grid-pattern absolute inset-0 opacity-35 pointer-events-none" />

      {/* 8. Vignette for cinematic focus */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(12,27,48,0.75)_100%)] pointer-events-none" />
    </div>
  );
};
