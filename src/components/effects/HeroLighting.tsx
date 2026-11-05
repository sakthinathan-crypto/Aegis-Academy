import React, { useEffect, useRef, useState } from 'react';

interface HeroLightingProps {
  className?: string;
}

export const HeroLighting: React.FC<HeroLightingProps> = ({ className = '' }) => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 }); // percentage based
  const targetPos = useRef({ x: 50, y: 50 });
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
        x: prev.x + (targetPos.current.x - prev.x) * 0.08,
        y: prev.y + (targetPos.current.y - prev.y) * 0.08,
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
      className={`pointer-events-none absolute inset-0 overflow-hidden z-[1] transition-opacity duration-700 ${className}`}
      aria-hidden="true"
    >
      {/* Primary Dynamic Gold Spotlight following cursor */}
      <div
        className="absolute w-[650px] h-[650px] rounded-full blur-[130px] opacity-25 mix-blend-screen transition-transform duration-75"
        style={{
          left: `${mousePos.x}%`,
          top: `${mousePos.y}%`,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(213, 173, 99, 0.45) 0%, rgba(213, 173, 99, 0.1) 45%, transparent 70%)',
          willChange: 'left, top',
        }}
      />

      {/* Secondary Electric Cyan/Royal Blue Counter Spotlight */}
      <div
        className="absolute w-[800px] h-[800px] rounded-full blur-[150px] opacity-30 mix-blend-screen"
        style={{
          left: `${100 - mousePos.x * 0.7}%`,
          top: `${100 - mousePos.y * 0.7}%`,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.35) 0%, rgba(36, 91, 145, 0.15) 50%, transparent 75%)',
        }}
      />

      {/* Fixed Ambient Center Glow for consistent readability */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full blur-[140px] opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(36, 91, 145, 0.5) 0%, rgba(7, 20, 38, 0.8) 70%, transparent 100%)',
        }}
      />
    </div>
  );
};
