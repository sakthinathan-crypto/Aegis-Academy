import React from 'react';
import { useRouter } from '../../context/RouterContext';
import { DynamicHeroBackground } from '../effects/DynamicHeroBackground';
import { AegisLogoOrb } from './AegisLogoOrb';
import { ArrowUpRight, ChevronDown } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { navigate } = useRouter();

  const scrollToCoreArchitecture = () => {
    const el = document.getElementById('core-architecture');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/#core-architecture');
    }
  };

  return (
    <section className="relative min-h-screen min-h-[100dvh] w-full flex items-center justify-center pt-32 sm:pt-36 pb-20 sm:pb-24 px-4 sm:px-6 lg:px-12 overflow-hidden bg-[#020617]">
      {/* 1. Dynamic Hero Background (Two White Glossy Circles + Electric Blue Auroras + Particle Field) */}
      <DynamicHeroBackground className="absolute inset-0 z-0 pointer-events-none" />

      {/* 2. Main Two-Column Container (Exact Composition from Reference Image 2) */}
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center my-auto">
        {/* LEFT COLUMN: Eyebrow, Main Headline, Description & CTAs */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 pt-2 lg:pt-0">
          {/* Eyebrow text */}
          <div className="text-xs sm:text-sm font-bold tracking-[0.18em] uppercase text-[#38BDF8] select-none">
            EDUCATION, REDESIGNED FOR TOMORROW
          </div>

          {/* Main Headline (Multi-line bold white typography matching reference image) */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.2rem] font-extrabold tracking-tight leading-[1.04] text-white text-balance drop-shadow-xl font-display">
            Build your<br />
            future with<br />
            Aegis<br className="hidden sm:inline" />
            Academy.
          </h1>

          {/* Supporting Description */}
          <p className="text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed text-balance drop-shadow-sm pt-1">
            Industry ready. AI ready. Future ready. We turn curiosity into capability through practical learning, personal guidance and real-world technology.
          </p>

          {/* Action CTA Buttons (Explore now & Partner with us) */}
          <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 w-full">
            {/* Primary Button: Explore now ↗ (Navigates to Our Core Architecture) */}
            <button
              onClick={scrollToCoreArchitecture}
              className="group px-7 py-3.5 rounded-xl text-white font-bold text-sm tracking-wide transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-lg hover:scale-[1.02]"
              style={{
                background: 'linear-gradient(135deg, #0A2B66 0%, #0052CC 60%, #0077FE 100%)',
                border: '1px solid rgba(0, 163, 255, 0.4)',
                boxShadow: '0 8px 24px -4px rgba(0, 119, 254, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
              }}
              aria-label="Explore our core architecture"
            >
              <span>Explore now</span>
              <ArrowUpRight className="w-4 h-4 text-[#38BDF8] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            {/* Secondary Button: Partner with us */}
            <button
              onClick={() => navigate('/partnerships')}
              className="px-7 py-3.5 rounded-xl text-slate-200 hover:text-white font-semibold text-sm tracking-wide transition-all duration-200 flex items-center gap-2 cursor-pointer backdrop-blur-md hover:scale-[1.02]"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
              }}
              aria-label="Partner with Aegis Academy"
            >
              <span>Partner with us</span>
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Aegis 3D Emblem Centerpiece & 5 Satellite Badges */}
        <div className="lg:col-span-5 flex items-center justify-center relative w-full">
          <AegisLogoOrb />
        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <button
        onClick={scrollToCoreArchitecture}
        className="absolute bottom-5 sm:bottom-7 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity cursor-pointer group"
        aria-label="Scroll to explore core architecture"
      >
        <span className="text-[10px] uppercase tracking-[0.22em] text-slate-400 group-hover:text-[#00A3FF] transition-colors font-mono font-medium">
          Scroll to explore
        </span>
        <ChevronDown className="w-4 h-4 text-[#00A3FF] animate-bounce" />
      </button>
    </section>
  );
};
