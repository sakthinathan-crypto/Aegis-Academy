import React from 'react';
import { useRouter } from '../context/RouterContext';
import { COMPANY_INFO, LEADERSHIP_TEAM } from '../data/companyData';
import { ArrowRight, Target, Compass, Sparkles, CheckCircle2, Users, Shield } from 'lucide-react';
import { GlassCard } from '../components/common/GlassCard';
import { SignatureAegisMotion } from '../components/effects/SignatureAegisMotion';

export const About: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <div className="min-h-screen bg-[#F7F8FC] text-[#0C1B30] pt-24 pb-20">
      {/* 1. ABOUT HERO (LIGHT WITH SUBTLE BLUE TINT) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-[#C9D9EC]/60 bg-gradient-to-b from-[#EAF1FA] to-[#F7F8FC] relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center space-y-4 relative z-10">
          <span className="glass-light-pill inline-block px-3.5 py-1.5 rounded-full text-xs uppercase tracking-widest text-[#285B91] font-bold border border-[#C9D9EC]">
            Institutional Profile
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0C1B30] tracking-tight">
            About Aegis Academy
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {COMPANY_INFO.description}
          </p>
        </div>
      </section>

      {/* 2 & 3: WHAT DOES AEGIS MEAN? */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            <GlassCard variant="light" tiltEnabled={false} className="p-8 sm:p-12 shadow-md">
              <span className="glass-light-pill inline-block px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider text-[#285B91] mb-3">
                The Core Acronym
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0C1B30] mt-1 mb-4">
                What Does AEGIS Stand For?
              </h2>
              <div className="text-xl sm:text-2xl font-black text-[#285B91] mb-4">
                "{COMPANY_INFO.fullForm}"
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                In classical heritage, an <em>Aegis</em> symbolizes a powerful shield of protection, guidance, and sponsorship. In modern context, Aegis Academy represents a protective and empowering platform where aspiring students, visionary educators, and enterprise partners unite to build durable technical mastery and pioneer transformative software innovations.
              </p>
            </GlassCard>
          </div>
          <div className="lg:col-span-4 flex justify-center">
            <SignatureAegisMotion size="sm" interactive={true} />
          </div>
        </div>
      </section>

      {/* 4 & 5: VISION & MISSION */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <GlassCard variant="light" tiltEnabled={true} className="p-8 space-y-4 shadow-sm hover:shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-[#D5AD63]/20 border border-[#D5AD63]/40 flex items-center justify-center text-[#B88E3E]">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-[#0C1B30]">Our Vision</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {COMPANY_INFO.vision}
            </p>
          </GlassCard>

          <GlassCard variant="light" tiltEnabled={true} className="p-8 space-y-4 shadow-sm hover:shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-[#285B91]/15 border border-[#285B91]/30 flex items-center justify-center text-[#285B91]">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-[#0C1B30]">Our Mission</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {COMPANY_INFO.mission}
            </p>
          </GlassCard>
        </div>
      </section>

      {/* 6 & 7: PHILOSOPHY & CORE VALUES */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#EAF1FA] border-t border-b border-[#C9D9EC]/60">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-widest text-[#285B91] font-bold">
              Foundational Beliefs
            </span>
            <h2 className="text-3xl font-extrabold text-[#0C1B30] tracking-tight mt-1 mb-4">
              Our Educational & Engineering Philosophy
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {COMPANY_INFO.philosophy}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {COMPANY_INFO.coreValues.map((val, i) => (
              <GlassCard key={i} variant="light" tiltEnabled={true} className="p-6 space-y-2 shadow-sm">
                <div className="text-xs font-mono text-[#285B91] font-bold">0{i + 1}.</div>
                <h4 className="text-base font-bold text-[#0C1B30]">{val.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{val.description}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* 8: OUR JOURNEY (Representative Milestones) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-[#285B91] font-bold">
            Evolution & Milestones
          </span>
          <h2 className="text-3xl font-extrabold text-[#0C1B30] tracking-tight mt-1">
            Our Journey
          </h2>
          <p className="text-xs text-slate-500 mt-2 font-mono">
            (Representative demonstration phases highlighting organizational trajectory)
          </p>
        </div>

        <div className="relative border-l-2 border-[#285B91]/30 ml-4 md:ml-32 pl-6 space-y-10">
          <div className="relative">
            <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#285B91] border-4 border-[#F7F8FC]" />
            <div className="text-xs font-mono text-[#285B91] font-bold">Phase 1 · Genesis</div>
            <h4 className="text-lg font-bold text-[#0C1B30] mt-0.5">Foundational Cohorts & Curriculum Architecture</h4>
            <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
              Launched initial collegiate technical bootcamps focusing on practical full-stack and algorithms, validating the model across pilot institutions.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#D5AD63] border-4 border-[#F7F8FC]" />
            <div className="text-xs font-mono text-[#B88E3E] font-bold">Phase 2 · Technology Integration</div>
            <h4 className="text-lg font-bold text-[#0C1B30] mt-0.5">Establishment of Aegis Technologies Division</h4>
            <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
              Expanded into enterprise client software solutions, AI agent workflows, and cloud migrations, enabling trainers to incorporate live production lessons directly.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#285B91] border-4 border-[#F7F8FC]" />
            <div className="text-xs font-mono text-[#285B91] font-bold">Phase 3 · Future Readiness</div>
            <h4 className="text-lg font-bold text-[#0C1B30] mt-0.5">Nationwide Hackathons & K-12 AI Initiatives</h4>
            <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
              Rolled out school-level computational thinking programs and hosted HackAegis national hackathons, connecting students directly with corporate recruiters.
            </p>
          </div>
        </div>
      </section>

      {/* 9 & 10: THE EDUCATION + TECH ECOSYSTEM */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#EAF1FA] border-t border-[#C9D9EC]/60">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs uppercase tracking-widest text-[#285B91] font-bold">
                Dual Advantage
              </span>
              <h2 className="text-3xl font-extrabold text-[#0C1B30] tracking-tight">
                The Education + Technology Ecosystem
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Most EdTech companies do not build enterprise software, and most software consultancies do not train students. Aegis Academy is intentionally structured to do both.
              </p>
              <div className="space-y-2 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#285B91]" />
                  <span>Real enterprise architectures become hands-on curriculum capstones</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#285B91]" />
                  <span>Top graduates gain fellowship and development opportunities</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#285B91]" />
                  <span>Continuous technological modernization without academic obsolescence</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <GlassCard variant="light" tiltEnabled={true} className="p-8 space-y-4 shadow-md">
                <h3 className="text-lg font-bold text-[#0C1B30]">Leadership & Governance</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Led by experienced entrepreneurs, senior software architects, and higher education leaders committed to ethical corporate governance.
                </p>
                <button
                  onClick={() => navigate('/leadership')}
                  className="btn-glossy-gold px-5 py-2.5 text-xs font-bold text-[#0C1B30] rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>Meet Our Leadership Team</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      {/* 12: CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 text-center bg-[#F7F8FC] border-t border-[#C9D9EC]/50">
        <div className="max-w-2xl mx-auto space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0C1B30]">
            Learn More or Get in Touch
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Discover how Aegis Academy can collaborate with your academic institution or business.
          </p>
          <div className="flex items-center justify-center gap-4 pt-2">
            <button
              onClick={() => navigate('/education')}
              className="btn-glossy-gold px-6 py-3 text-xs font-bold text-[#0C1B30] rounded-xl transition-all cursor-pointer shadow-sm"
            >
              Explore Programs
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="btn-glossy-blue px-6 py-3 text-xs font-bold rounded-xl transition-all cursor-pointer shadow-sm"
            >
              Contact Our Desk
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
