import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from '../../context/RouterContext';
import {
  Bot,
  Code2,
  Briefcase,
  Cloud
} from 'lucide-react';
import { FloatingGlassBadge } from './FloatingGlassBadge';

interface AegisLogoOrbProps {
  className?: string;
}

export const AegisLogoOrb: React.FC<AegisLogoOrbProps> = ({ className = '' }) => {
  const { navigate } = useRouter();
  const [statHovered, setStatHovered] = useState(false);
  const [statProximity, setStatProximity] = useState(false);
  const statRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const el = statRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
      setStatProximity(dist < 100);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      className={`relative w-full max-w-[540px] aspect-square flex items-center justify-center select-none ${className}`}
    >
      {/* 1. Ambient Background Glow Behind Centerpiece */}
      <div
        className="absolute w-[360px] sm:w-[420px] h-[360px] sm:h-[420px] rounded-full blur-[110px] pointer-events-none opacity-50"
        style={{
          background: 'radial-gradient(circle, rgba(0, 119, 254, 0.45) 0%, rgba(20, 45, 110, 0.25) 50%, transparent 70%)',
        }}
      />

      {/* 2. Concentric Subtle Orbit Rings (Dashed line matching reference image) */}
      <div className="absolute w-[380px] sm:w-[440px] h-[380px] sm:h-[440px] rounded-full border border-dashed border-[#00A3FF]/20 aegis-orbit-cw pointer-events-none">
        <div className="absolute top-8 right-16 w-2 h-2 rounded-full bg-[#00A3FF] shadow-[0_0_8px_#00A3FF]" />
      </div>

      <div className="relative w-full h-full flex items-center justify-center">
        {/* =========================================================================
            3. CENTRAL GLASS PORTAL CONTAINER (Matching Reference Image 2)
            ========================================================================= */}
        <div
          className="relative z-10 w-[270px] sm:w-[330px] h-[270px] sm:h-[330px] rounded-[36px] p-6 sm:p-7 flex items-center justify-center shadow-2xl backdrop-blur-2xl pointer-events-auto transition-transform duration-300 hover:scale-[1.02]"
          style={{
            background: 'linear-gradient(145deg, rgba(12, 28, 62, 0.72) 0%, rgba(5, 15, 38, 0.82) 100%)',
            border: '1.5px solid rgba(0, 163, 255, 0.32)',
            boxShadow: '0 25px 60px -10px rgba(0, 0, 0, 0.7), 0 0 35px rgba(0, 119, 254, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.25)',
          }}
        >
          {/* Specular Glare Arc */}
          <div className="absolute inset-0 rounded-[36px] pointer-events-none overflow-hidden">
            <div className="absolute -top-12 -left-12 w-36 h-36 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-xl" />
          </div>

          {/* Inner Circular Deep Aperture / Portal */}
          <div
            className="relative w-[190px] sm:w-[230px] h-[190px] sm:h-[230px] rounded-full flex items-center justify-center overflow-hidden border border-[#0077FE]/30 shadow-[inset_0_10px_30px_rgba(0,0,0,0.8),0_0_25px_rgba(0,119,254,0.3)]"
            style={{
              background: 'radial-gradient(circle at 45% 45%, #183a78 0%, #0e224e 50%, #06102a 100%)',
            }}
          >
            {/* Ambient Lighting Cone Inside Aperture */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#00A3FF]/15 to-transparent pointer-events-none" />

            {/* Dimensional Monolithic 3D "A" Emblem (Matching Reference Image 2) */}
            <div className="relative w-28 sm:w-36 h-36 sm:h-44 drop-shadow-[12px_18px_25px_rgba(0,0,0,0.8)] flex items-center justify-center">
              <svg
                viewBox="0 0 140 180"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
                aria-label="Aegis 3D Monument"
              >
                <defs>
                  {/* Front Face Metallic Lavender-Blue Gradient */}
                  <linearGradient id="faceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#8A9AD6" />
                    <stop offset="40%" stopColor="#6978B8" />
                    <stop offset="100%" stopColor="#4A5694" />
                  </linearGradient>

                  {/* Left Facet Highlight */}
                  <linearGradient id="leftBevelGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#B4C2F8" />
                    <stop offset="100%" stopColor="#7E8EC8" />
                  </linearGradient>

                  {/* Right Extrusion Deep Shadow */}
                  <linearGradient id="rightExtrusionGrad" x1="0%" y1="0%" x2="100%" y2="50%">
                    <stop offset="0%" stopColor="#253258" />
                    <stop offset="100%" stopColor="#0E162C" />
                  </linearGradient>

                  {/* Inner A cutout shadow */}
                  <linearGradient id="innerCutoutShadow" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#1C2746" />
                    <stop offset="100%" stopColor="#0C1326" />
                  </linearGradient>

                  {/* Cast shadow behind 3D A */}
                  <filter id="monumentDropShadow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="6" />
                    <feOffset dx="10" dy="12" result="offsetblur" />
                    <feFlood floodColor="#000000" floodOpacity="0.75" />
                    <feComposite in2="offsetblur" operator="in" />
                    <feMerge>
                      <feMergeNode />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Back Wall Shadow Projection */}
                <path
                  d="M 68 28 L 98 145 L 82 145 L 75 118 L 61 118 L 54 145 L 38 145 Z"
                  fill="#060C1C"
                  opacity="0.65"
                  transform="translate(14, 14)"
                />

                {/* 3D Extrusion Sides (Depth to the right) */}
                {/* Right Outer Extrusion */}
                <polygon
                  points="68,20 80,24 110,149 98,145"
                  fill="url(#rightExtrusionGrad)"
                />
                {/* Crossbar Bottom Extrusion */}
                <polygon
                  points="61,118 75,118 81,122 67,122"
                  fill="#1A2544"
                />
                {/* Inner Cutout Right Extrusion */}
                <polygon
                  points="68,52 74,54 77,100 71,98"
                  fill="url(#innerCutoutShadow)"
                />

                {/* Left Bevel Highlight (Light coming from upper-left) */}
                <polygon
                  points="68,20 64,22 34,147 38,145"
                  fill="url(#leftBevelGrad)"
                />

                {/* Front Face of the 3D Monolith A */}
                <path
                  d="M 68 20 L 98 145 L 82 145 L 75 118 L 61 118 L 54 145 L 38 145 Z M 68 52 L 61 98 L 75 98 Z"
                  fill="url(#faceGrad)"
                />

                {/* Top Peak Specular Glint */}
                <polygon
                  points="64,22 68,20 74,22 70,24"
                  fill="#E2E8FF"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* =========================================================================
            4. THE 5 FLOATING SATELLITE BADGES (Exact layout from Reference Image 2)
            Independent hover and proximity with zero global stretching
            ========================================================================= */}

        {/* 1. TOP-RIGHT: AI Skills (Floating gracefully above top-right) */}
        <FloatingGlassBadge
          label="AI Skills"
          icon={Bot}
          accentColor="#00A3FF"
          className="top-[4%] sm:top-[6%] right-[2%] sm:right-[6%] z-20"
          floatDelay={0}
          floatDuration={5.2}
          onClick={() => navigate('/services/ai-solutions')}
        />

        {/* 2. LEFT: Build & Code (Floating on top of left edge of the tile) */}
        <FloatingGlassBadge
          label="Build & Code"
          icon={Code2}
          accentColor="#00A3FF"
          className="top-[36%] sm:top-[35%] -left-[2%] sm:left-[2%] z-20"
          floatDelay={0.9}
          floatDuration={4.8}
          onClick={() => navigate('/programs/full-stack-web-development')}
        />

        {/* 3. RIGHT: Career Ready (Floating on top of right edge of the tile) */}
        <FloatingGlassBadge
          label="Career Ready"
          icon={Briefcase}
          accentColor="#00A3FF"
          className="top-[54%] sm:top-[52%] -right-[2%] sm:right-[2%] z-20"
          floatDelay={1.8}
          floatDuration={5.4}
          onClick={() => navigate('/education')}
        />

        {/* 4. BOTTOM-LEFT: Cloud Native (Floating on top of bottom-left edge of the tile) */}
        <FloatingGlassBadge
          label="Cloud Native"
          icon={Cloud}
          accentColor="#00A3FF"
          className="bottom-[8%] sm:bottom-[10%] left-[6%] sm:left-[12%] z-20"
          floatDelay={1.4}
          floatDuration={5}
          onClick={() => navigate('/services/cloud-solutions')}
        />

        {/* 5. BOTTOM-RIGHT: 10× Stat Card (Floating on top of bottom-right corner of the tile) */}
        <div
          ref={statRef}
          onMouseEnter={() => setStatHovered(true)}
          onMouseLeave={() => setStatHovered(false)}
          className="absolute bottom-[2%] sm:bottom-[4%] right-[-2%] sm:right-[3%] z-20 hover:z-30 pointer-events-auto select-none transition-all"
          style={{
            animation: 'statCardFloat 5.6s ease-in-out infinite',
            animationDelay: '1.2s'
          }}
        >
          <div
            className="px-5 py-3 rounded-2xl backdrop-blur-xl transition-all cursor-pointer"
            style={{
              backgroundColor: statHovered ? 'rgba(6, 20, 52, 0.92)' : 'rgba(4, 14, 38, 0.82)',
              borderColor: statHovered ? '#00A3FF' : statProximity ? 'rgba(0, 163, 255, 0.6)' : 'rgba(0, 163, 255, 0.3)',
              borderWidth: '1.2px',
              borderStyle: 'solid',
              boxShadow: statHovered
                ? '0 16px 36px rgba(0, 0, 0, 0.75), 0 0 28px rgba(0, 163, 255, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.4)'
                : '0 12px 30px rgba(0, 0, 0, 0.6), 0 0 16px rgba(0, 119, 254, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              transform: statHovered ? 'scale(1.06)' : statProximity ? 'scale(1.02)' : 'scale(1)',
              transition: 'transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease, border-color 0.25s ease',
            }}
          >
            <div className="text-2xl sm:text-3xl font-extrabold text-white leading-tight tracking-tight flex items-baseline">
              10<span className="text-[#00A3FF]">×</span>
            </div>
            <div className="text-[11px] sm:text-xs text-slate-300 font-medium tracking-wide mt-0.5 whitespace-nowrap">
              more career clarity
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes statCardFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }
      `}</style>
    </div>
  );
};
