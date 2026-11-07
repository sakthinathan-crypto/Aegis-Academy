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
      {/* 1. Deep Midnight Space to Electric Deep Cobalt Gradient (matching reference image) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#040E26] to-[#071738]" />

      {/* 2. Central Vibrant Electric Blue Aurora Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[750px] rounded-full blur-[140px] opacity-45 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0, 119, 254, 0.45) 0%, rgba(0, 82, 204, 0.25) 45%, transparent 70%)',
        }}
      />

      {/* 3. Top-Right Electric Azure & Cobalt Flare */}
      <div
        className="absolute -top-[10%] -right-[5%] w-[680px] h-[680px] rounded-full blur-[150px] opacity-35"
        style={{
          background: 'radial-gradient(circle, rgba(0, 163, 255, 0.35) 0%, rgba(0, 102, 255, 0.15) 50%, transparent 70%)',
        }}
      />

      {/* 4. Bottom-Left Rich Electric Blue Aurora */}
      <div
        className="absolute -bottom-[15%] -left-[10%] w-[800px] h-[800px] rounded-full blur-[160px] opacity-40"
        style={{
          background: 'radial-gradient(circle, rgba(0, 119, 254, 0.38) 0%, rgba(4, 18, 54, 0.2) 55%, transparent 75%)',
        }}
      />

      {/* =========================================================================
          TWO WHITE GLOSSY CIRCLES (Exact visual element requested by user)
          ========================================================================= */}
      {/* White Glossy Circle 1: Left Upper Background */}
      <div
        className="absolute w-[440px] sm:w-[540px] h-[440px] sm:h-[540px] rounded-full z-[1] transition-transform duration-1000 ease-out"
        style={{
          left: '3%',
          top: '12%',
          background: 'radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.04) 55%, transparent 75%)',
          border: '1.5px solid rgba(255, 255, 255, 0.18)',
          boxShadow: '0 0 70px rgba(255, 255, 255, 0.09), inset 0 2px 6px rgba(255, 255, 255, 0.35)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          animation: 'whiteGlossCircleFloat1 18s ease-in-out infinite',
        }}
      >
        {/* Specular Inner Rim Light Arc */}
        <div className="absolute inset-0 rounded-full border border-white/20 mask-radial" />
        <div className="absolute top-8 left-12 w-28 h-28 bg-white/20 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* White Glossy Circle 2: Right Upper Background */}
      <div
        className="absolute w-[460px] sm:w-[580px] h-[460px] sm:h-[580px] rounded-full z-[1] transition-transform duration-1000 ease-out"
        style={{
          right: '2%',
          top: '16%',
          background: 'radial-gradient(circle at 65% 35%, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.04) 55%, transparent 75%)',
          border: '1.5px solid rgba(255, 255, 255, 0.18)',
          boxShadow: '0 0 80px rgba(255, 255, 255, 0.09), inset 0 2px 6px rgba(255, 255, 255, 0.35)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          animation: 'whiteGlossCircleFloat2 22s ease-in-out infinite',
        }}
      >
        {/* Specular Inner Rim Light Arc */}
        <div className="absolute top-10 right-14 w-32 h-32 bg-white/20 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* 5. Dynamic Cursor-Following Electric Blue Spotlight */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[130px] opacity-35 mix-blend-screen transition-transform duration-75"
        style={{
          left: `${mousePos.x}%`,
          top: `${mousePos.y}%`,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(0, 163, 255, 0.45) 0%, rgba(0, 119, 254, 0.15) 45%, transparent 70%)',
          willChange: 'left, top',
        }}
      />

      {/* 6. Subtle Futuristic Tech Grid */}
      <div className="tech-grid-pattern absolute inset-0 opacity-25 pointer-events-none" />

      {/* 7. Vignette for cinematic focus */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(2,6,23,0.8)_100%)] pointer-events-none" />

      <style>{`
        @keyframes whiteGlossCircleFloat1 {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(15px, -18px, 0) scale(1.03);
          }
        }
        @keyframes whiteGlossCircleFloat2 {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(-18px, 14px, 0) scale(1.025);
          }
        }
      `}</style>
    </div>
  );
};
