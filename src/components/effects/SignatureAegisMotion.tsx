import React, { useRef, useState, useEffect } from 'react';
import { Cpu, Code, Brain, Shield, Cloud, Terminal, Sparkles } from 'lucide-react';

interface SignatureAegisMotionProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
}

export const SignatureAegisMotion: React.FC<SignatureAegisMotionProps> = ({
  className = '',
  size = 'md',
  interactive = true,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!interactive) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20; // max 20px tilt
      const y = (e.clientY / innerHeight - 0.5) * 20;
      setMouseOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [interactive]);

  const scaleClass = {
    sm: 'scale-75',
    md: 'scale-90 sm:scale-100',
    lg: 'scale-100 sm:scale-110 lg:scale-125',
  }[size];

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center select-none pointer-events-none ${scaleClass} ${className}`}
      aria-hidden="true"
      style={{
        transform: `translate3d(${mouseOffset.x.toFixed(1)}px, ${mouseOffset.y.toFixed(1)}px, 0)`,
        transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* 1. Ambient Central Energy Core */}
      <div className="absolute w-[360px] h-[360px] rounded-full blur-[90px] bg-gradient-to-tr from-[#285B91]/40 via-[#17385F]/30 to-[#D5AD63]/25 aegis-pulse-glow" />

      {/* 2. Outer Orbital Ring (540px) */}
      <div className="absolute w-[520px] h-[520px] rounded-full border border-[#76A9FF]/20 aegis-orbit-cw flex items-center justify-center">
        {/* Node 1 on Outer Ring */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 p-2.5 rounded-xl bg-[#0C1B30]/80 border border-white/20 backdrop-blur-md shadow-xl text-[#D5AD63] flex items-center gap-2">
          <Brain className="w-4 h-4" />
          <span className="text-[10px] font-mono tracking-wider text-slate-200">AI LABS</span>
        </div>
        {/* Node 2 on Outer Ring */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 p-2.5 rounded-xl bg-[#0C1B30]/80 border border-white/20 backdrop-blur-md shadow-xl text-[#38BDF8] flex items-center gap-2">
          <Cloud className="w-4 h-4" />
          <span className="text-[10px] font-mono tracking-wider text-slate-200">CLOUD INFRA</span>
        </div>
      </div>

      {/* 3. Middle Dashed Orbital Trajectory Ring (400px) */}
      <div className="absolute w-[390px] h-[390px] rounded-full border border-dashed border-[#76A9FF]/30 aegis-orbit-ccw flex items-center justify-center">
        {/* Node 3 on Middle Ring */}
        <div className="absolute top-1/2 -left-4 -translate-y-1/2 p-2 rounded-xl bg-[#0C1B30]/85 border border-[#D5AD63]/30 backdrop-blur-md shadow-xl text-[#D5AD63]">
          <Terminal className="w-4 h-4" />
        </div>
        {/* Node 4 on Middle Ring */}
        <div className="absolute top-1/2 -right-4 -translate-y-1/2 p-2 rounded-xl bg-[#0C1B30]/85 border border-[#38BDF8]/30 backdrop-blur-md shadow-xl text-[#38BDF8]">
          <Shield className="w-4 h-4" />
        </div>
      </div>

      {/* 4. Inner Luminous Ring (270px) */}
      <div className="absolute w-[260px] h-[260px] rounded-full border border-[#D5AD63]/35 aegis-orbit-cw flex items-center justify-center shadow-[0_0_40px_rgba(40,91,145,0.25)]">
        {/* Dot on Inner Ring */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#D5AD63] shadow-[0_0_10px_#D5AD63]" />
      </div>

      {/* 5. Central Aegis Radiant Monogram Emblem */}
      <div className="relative z-10 w-28 h-28 rounded-3xl bg-gradient-to-br from-white/25 via-[#17385F]/85 to-[#0C1B30] border border-white/35 backdrop-blur-xl shadow-2xl flex flex-col items-center justify-center p-3 text-center liquid-sheen-effect group">
        <div className="w-12 h-12 rounded-xl bg-[#D5AD63]/20 border border-[#D5AD63]/40 flex items-center justify-center text-[#D5AD63] shadow-inner mb-1">
          <Shield className="w-6 h-6 fill-[#D5AD63]/20" />
        </div>
        <span className="text-[11px] font-black tracking-widest text-white uppercase font-display">AEGIS</span>
        <span className="text-[8px] font-mono tracking-wider text-[#D5AD63]">INNOVATION</span>
      </div>
    </div>
  );
};
