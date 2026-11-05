import React from 'react';
import { useRouter } from '../../context/RouterContext';
import { DynamicHeroBackground } from '../effects/DynamicHeroBackground';
import { AegisLogoOrb } from './AegisLogoOrb';
import { FloatingInfoBar } from './FloatingInfoBar';
import { MagneticButton } from '../common/MagneticButton';
import {
  GraduationCap,
  Cpu,
  Building2,
  Shield,
  ArrowRight,
  Sparkles,
  Zap,
  Globe2,
  Layers,
  CheckCircle2,
  BookOpen
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <section className="relative min-h-[94vh] flex items-center justify-center pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#0C1B30]">
      {/* 1. Dynamic Hero Background (Cinematic Auroras + Constellation Particle Field + Grid) */}
      <DynamicHeroBackground className="absolute inset-0 z-0 pointer-events-none" />

      {/* 2. Side Floating Information Bars (Reference 2) */}
      <FloatingInfoBar
        label="Future-Ready Learning"
        icon={BookOpen}
        position="left"
        top="22%"
        accentColor="#D5AD63"
        delay={0}
        duration={5.5}
      />
      <FloatingInfoBar
        label="Applied AI Labs"
        icon={Cpu}
        position="left"
        top="48%"
        accentColor="#38BDF8"
        delay={1.5}
        duration={6}
      />
      <FloatingInfoBar
        label="Industry-Aligned Curriculum"
        icon={CheckCircle2}
        position="left"
        top="74%"
        accentColor="#D5AD63"
        delay={2.5}
        duration={5}
      />

      <FloatingInfoBar
        label="Enterprise Technology"
        icon={Layers}
        position="right"
        top="24%"
        accentColor="#38BDF8"
        delay={0.8}
        duration={5.8}
      />
      <FloatingInfoBar
        label="Innovation Through Learning"
        icon={Sparkles}
        position="right"
        top="50%"
        accentColor="#D5AD63"
        delay={2}
        duration={6.2}
      />
      <FloatingInfoBar
        label="Practical Skill Development"
        icon={Zap}
        position="right"
        top="76%"
        accentColor="#10B981"
        delay={1.2}
        duration={5.4}
      />

      {/* 3. Main Split Two-Column Container (Reference 1 Composition) */}
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* LEFT COLUMN: Headings, Value Proposition & High-Gloss CTAs */}
        <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 pt-4 lg:pt-0">
          {/* Eyebrow Pill */}
          <div className="glass-light-pill inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/30 bg-white/10 backdrop-blur-md shadow-lg shadow-black/20">
            <span className="w-2 h-2 rounded-full bg-[#D5AD63] shadow-[0_0_8px_#D5AD63] animate-pulse" />
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.16em] uppercase text-[#D5AD63]">
              EDUCATION, REDESIGNED FOR TOMORROW
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] font-extrabold tracking-tight leading-[1.08] text-white text-balance drop-shadow-lg">
            Empowering Minds.{' '}
            <span className="gold-gradient-text block sm:inline">
              Engineering Futures.
            </span>
          </h1>

          {/* Supporting Description */}
          <p className="text-base sm:text-lg md:text-xl text-slate-200 max-w-xl font-normal leading-relaxed text-balance drop-shadow-md">
            Building future-ready skills and delivering innovative technology solutions for a rapidly evolving world.
          </p>

          {/* High-Gloss Action CTA Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 w-full">
            <MagneticButton
              onClick={() => navigate('/education')}
              variant="gold"
              className="text-sm font-semibold px-7 py-3.5 shadow-2xl flex items-center gap-2"
              ariaLabel="Explore our educational programs"
            >
              <span>Explore Our Programs</span>
              <GraduationCap className="w-4 h-4" />
            </MagneticButton>

            <MagneticButton
              onClick={() => navigate('/technologies')}
              variant="glass"
              className="text-sm font-semibold px-7 py-3.5 border-white/25 flex items-center gap-2"
              ariaLabel="Explore technology services"
            >
              <span>Explore Technologies</span>
              <Cpu className="w-4 h-4 text-[#38BDF8]" />
            </MagneticButton>

            <button
              onClick={() => navigate('/partnerships')}
              className="px-6 py-3.5 text-sm font-medium rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-200 flex items-center gap-2 border border-transparent hover:border-white/15 cursor-pointer"
            >
              <span>Partner With Us</span>
              <Building2 className="w-4 h-4 text-[#D5AD63]" />
            </button>
          </div>

          {/* Trust Metric Badges */}
          <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-300 border-t border-white/15 w-full">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#D5AD63]" />
              <span className="font-medium tracking-wide">Industry-Aligned Curriculum</span>
            </div>
            <div className="hidden sm:block w-px h-3.5 bg-white/20" />
            <div className="flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-[#38BDF8]" />
              <span className="font-medium tracking-wide">Enterprise Engineering</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: 3D Aegis Identity Centerpiece & Floating Badges */}
        <div className="lg:col-span-6 flex items-center justify-center relative">
          <AegisLogoOrb />
        </div>
      </div>
    </section>
  );
};
