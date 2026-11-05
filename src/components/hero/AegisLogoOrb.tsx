import React from 'react';
import {
  Brain,
  Code2,
  TrendingUp,
  Cloud,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { FloatingGlassBadge } from './FloatingGlassBadge';

interface AegisLogoOrbProps {
  className?: string;
}

export const AegisLogoOrb: React.FC<AegisLogoOrbProps> = ({ className = '' }) => {
  return (
    <div
      className={`relative w-full max-w-[560px] aspect-square flex items-center justify-center select-none ${className}`}
    >
      {/* Stable Center Stage (Independent from cursor position) */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Core Ambient Glow */}
        <div className="absolute w-72 h-72 rounded-full bg-gradient-to-tr from-[#285B91]/40 via-[#38BDF8]/25 to-[#D5AD63]/30 blur-3xl pointer-events-none aegis-pulse-glow" />

        {/* =========================================================================
            CONCENTRIC ORBITAL RINGS (Smooth continuous independent rotation)
            ========================================================================= */}
        {/* Outer Ring 1: Dia 500px, Cyan Glow with Satellite Node */}
        <div className="absolute w-[470px] sm:w-[510px] h-[470px] sm:h-[510px] rounded-full border border-[#38BDF8]/20 aegis-orbit-cw pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#38BDF8] shadow-[0_0_12px_#38BDF8]" />
          <div className="absolute bottom-6 right-16 w-2 h-2 rounded-full bg-[#D5AD63] shadow-[0_0_8px_#D5AD63]" />
        </div>

        {/* Middle Ring 2: Dia 380px, Champagne Gold Dashed Orbit */}
        <div className="absolute w-[350px] sm:w-[390px] h-[350px] sm:h-[390px] rounded-full border border-dashed border-[#D5AD63]/35 aegis-orbit-ccw pointer-events-none">
          <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-[#D5AD63] shadow-[0_0_14px_#D5AD63] border border-white" />
          <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_white]" />
        </div>

        {/* Inner Ring 3: Dia 280px, Royal Blue Luminous Ring */}
        <div className="absolute w-[260px] sm:w-[280px] h-[260px] sm:h-[280px] rounded-full border border-[#285B91]/40 aegis-orbit-cw pointer-events-none">
          <div className="absolute bottom-2 left-1/3 w-2.5 h-2.5 rounded-full bg-[#38BDF8] shadow-[0_0_10px_#38BDF8]" />
        </div>

        {/* =========================================================================
            CENTRAL GLASS SHIELD STRUCTURE (Aegis Identity Centerpiece)
            ========================================================================= */}
        <div
          className="relative z-10 w-44 sm:w-52 h-52 sm:h-60 rounded-3xl p-6 flex flex-col items-center justify-center text-center shadow-2xl backdrop-blur-2xl border border-white/30 pointer-events-auto transition-transform duration-300 hover:scale-[1.03]"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.18) 0%, rgba(16, 43, 78, 0.55) 50%, rgba(7, 20, 38, 0.75) 100%)',
            boxShadow: '0 25px 60px -10px rgba(0, 0, 0, 0.6), 0 0 30px rgba(213, 173, 99, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.45)',
          }}
        >
          {/* Inner Glare Arc */}
          <div className="absolute inset-0 rounded-3xl pointer-events-none overflow-hidden">
            <div className="absolute -top-12 -left-12 w-36 h-36 bg-gradient-to-br from-white/35 to-transparent rounded-full blur-xl" />
          </div>

          {/* Authentic Aegis Geometric Shield SVG */}
          <div className="relative w-20 sm:w-24 h-20 sm:h-24 mb-3 drop-shadow-[0_4px_16px_rgba(213,173,99,0.4)]">
            <svg
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
              aria-label="Aegis Academy Shield"
            >
              <polygon
                points="50,6 92,24 92,72 50,94 8,72 8,24"
                fill="#0B1E38"
                stroke="#D5AD63"
                strokeWidth="5.5"
              />
              <path
                d="M50 24 L68 72 L58 72 L54 60 L46 60 L42 72 L32 72 Z M50 42 L47 53 L53 53 Z"
                fill="#D5AD63"
              />
            </svg>
          </div>

          {/* Luminous Brand Typography */}
          <div className="font-bold tracking-[0.2em] text-white text-base sm:text-lg leading-tight">
            AEGIS
          </div>
          <div className="text-[10px] font-semibold tracking-[0.25em] text-[#D5AD63] uppercase mt-0.5">
            ACADEMY
          </div>
          <div className="mt-2 text-[9px] uppercase tracking-widest text-slate-300 font-mono">
            EST. 2026
          </div>
        </div>

        {/* =========================================================================
            6 FLOATING GLASS INFORMATION BADGES (Each reacts 100% independently)
            ========================================================================= */}
        {/* Badge 1: Top Right - AI Skills */}
        <FloatingGlassBadge
          label="AI Skills"
          icon={Brain}
          accentColor="#38BDF8"
          className="top-[4%] right-[8%] sm:right-[12%]"
          floatDelay={0}
          floatDuration={4.5}
        />

        {/* Badge 2: Right Center - Build & Code */}
        <FloatingGlassBadge
          label="Build & Code"
          icon={Code2}
          accentColor="#D5AD63"
          className="top-[44%] -right-[4%] sm:right-[0%]"
          floatDelay={1.2}
          floatDuration={5.2}
        />

        {/* Badge 3: Bottom Right - Career Ready */}
        <FloatingGlassBadge
          label="Career Ready"
          icon={TrendingUp}
          accentColor="#10B981"
          className="bottom-[8%] right-[10%] sm:right-[14%]"
          floatDelay={2.1}
          floatDuration={4.8}
        />

        {/* Badge 4: Bottom Left - Cloud Native */}
        <FloatingGlassBadge
          label="Cloud Native"
          icon={Cloud}
          accentColor="#60A5FA"
          className="bottom-[6%] left-[8%] sm:left-[12%]"
          floatDelay={0.8}
          floatDuration={5.5}
        />

        {/* Badge 5: Left Center - Industry Aligned */}
        <FloatingGlassBadge
          label="Industry Aligned"
          icon={ShieldCheck}
          accentColor="#D5AD63"
          className="top-[46%] -left-[4%] sm:left-[0%]"
          floatDelay={1.8}
          floatDuration={4.9}
        />

        {/* Badge 6: Top Left - Innovation Driven */}
        <FloatingGlassBadge
          label="Innovation Driven"
          icon={Sparkles}
          accentColor="#F59E0B"
          className="top-[6%] left-[6%] sm:left-[10%]"
          floatDelay={2.7}
          floatDuration={5.1}
        />
      </div>
    </div>
  );
};
