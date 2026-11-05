import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { COMPANY_INFO, SAMPLE_STATISTICS, PROGRAMS, SERVICES, PROJECTS, EVENTS, TESTIMONIALS } from '../data/companyData';
import { HeroSection } from '../components/hero/HeroSection';
import { GlassCard } from '../components/common/GlassCard';
import { MagneticButton } from '../components/common/MagneticButton';
import {
  ArrowRight,
  Cpu,
  Shield,
  Layers,
  Award,
  Calendar,
  ChevronRight,
  CheckCircle2,
  GraduationCap,
  Building2,
  TrendingUp,
  Terminal,
  Globe2,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export const Home: React.FC = () => {
  const { navigate } = useRouter();
  const [activeDivision, setActiveDivision] = useState<'all' | 'education' | 'technologies'>('all');

  const featuredPrograms = PROGRAMS.slice(0, 3);
  const featuredServices = SERVICES.slice(0, 4);
  const featuredProjects = PROJECTS.slice(0, 3);
  const upcomingEvents = EVENTS.filter(e => e.status === 'Upcoming').slice(0, 2);

  return (
    <div className="min-h-screen bg-[#F7F8FC] text-[#0C1B30] selection:bg-[#D5AD63]/30 selection:text-[#0C1B30]">
      {/* =========================================================================
          SECTION 1: HERO SECTION (REFERENCE 1 COMPOSITION + REFERENCE 2 FLOATING GLASS)
          ========================================================================= */}
      <HeroSection />

      {/* =========================================================================
          SECTION 2 & 3: INTRODUCTION & ABOUT AEGIS ACADEMY (LIGHT SECTION: PEARL WHITE #F7F8FC)
          ========================================================================= */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F7F8FC] border-b border-[#C9D9EC]/50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#285B91] font-bold">
                <span className="w-2 h-2 rounded-full bg-[#D5AD63]" />
                <span>About The Organization</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0C1B30] tracking-tight leading-tight">
                Where Academic Rigor Meets Enterprise Engineering
              </h2>
              <p className="text-[#202B3A] text-base leading-relaxed">
                {COMPANY_INFO.description}
              </p>
              <p className="text-slate-600 text-sm leading-relaxed">
                Founded on the belief that traditional educational pathways and modern technological demands must converge, Aegis Academy operates as a dual-engine organization: pioneering future-ready educational programs while building production-grade software solutions for modern enterprises.
              </p>

              {/* Light Glass Cards for Vision & Mission */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <GlassCard variant="light" tiltEnabled={true} className="p-5">
                  <div className="flex items-center gap-2 text-[#285B91] font-bold text-sm mb-2">
                    <span className="w-2 h-2 rounded-full bg-[#D5AD63]" />
                    <span>Vision</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed">{COMPANY_INFO.vision}</p>
                </GlassCard>

                <GlassCard variant="light" tiltEnabled={true} className="p-5">
                  <div className="flex items-center gap-2 text-[#285B91] font-bold text-sm mb-2">
                    <span className="w-2 h-2 rounded-full bg-[#285B91]" />
                    <span>Mission</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed">{COMPANY_INFO.mission}</p>
                </GlassCard>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => navigate('/about')}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#285B91] hover:text-[#17385F] transition-colors group cursor-pointer"
                >
                  <span>Learn more about our philosophy and leadership</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Visual Media Showcase in High-Gloss Frame */}
            <div className="lg:col-span-6 relative">
              <GlassCard variant="light" tiltEnabled={true} glossIntensity="high" className="p-3 aspect-[16/10] shadow-xl">
                <div className="relative w-full h-full rounded-xl overflow-hidden">
                  <img
                    src="/src/assets/images/aegis_education_campus_1793890911409.jpg"
                    alt="Students and engineers collaborating at Aegis Academy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C1B30]/85 via-transparent to-transparent" />
                  <div className="glass-light-card absolute bottom-4 left-4 right-4 p-4 rounded-xl border border-white/60 text-xs">
                    <div className="text-[#0C1B30] font-bold flex items-center justify-between">
                      <span>Applied Learning & Innovation Lab</span>
                      <span className="text-[11px] font-mono text-[#285B91]">Active Cohort</span>
                    </div>
                    <div className="text-slate-600 text-[11px] mt-1 leading-relaxed">
                      Hands-on sandbox environments where learners develop algorithms under direct guidance of senior engineers.
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4 & 5: DUAL CORE BUSINESS DIVISIONS (LIGHT SECTION: SOFT BLUE #EAF1FA)
          ========================================================================= */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#EAF1FA] border-b border-[#C9D9EC]/60 relative">
        <div className="tech-grid-light absolute inset-0 opacity-40 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#285B91] font-bold mb-3">
              <span className="w-2 h-2 rounded-full bg-[#D5AD63]" />
              <span>Our Core Architecture</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0C1B30] tracking-tight">
              Two Interconnected Business Divisions
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
              A self-reinforcing innovation engine: Aegis Technologies tests and deploys software in production, and those verified industry practices directly shape Aegis Education curricula.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Division A: Aegis Education */}
            <GlassCard
              variant="light"
              tiltEnabled={true}
              glossIntensity="high"
              className="p-8 sm:p-10 flex flex-col justify-between shadow-lg"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#D5AD63]/20 border border-[#D5AD63]/40 flex items-center justify-center text-[#B88E3E] mb-6 shadow-sm">
                  <GraduationCap className="w-7 h-7" />
                </div>
                <div className="text-xs uppercase tracking-wider text-[#B88E3E] font-bold">Division 01</div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0C1B30] mt-1 mb-3">Aegis Education</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Specialized skill-building tracks for school students (Ages 10–15), collegiate engineering bootcamps, and professional corporate upskilling.
                </p>

                <div className="space-y-3 text-xs text-slate-700 border-t border-[#C9D9EC]/60 pt-5 mb-8">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#D5AD63] shrink-0" />
                    <span>School AI, Generative AI & Computational Thinking</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#D5AD63] shrink-0" />
                    <span>College Full Stack, DSA, Cybersecurity & Mobile Dev</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#D5AD63] shrink-0" />
                    <span>Soft Skills, Aptitude & Placement Interview Mastery</span>
                  </div>
                </div>
              </div>

              <div>
                <button
                  onClick={() => navigate('/education')}
                  className="btn-glossy-gold w-full py-3.5 px-4 rounded-xl text-[#0C1B30] font-bold text-xs tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <span>Explore Education Programs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </GlassCard>

            {/* Division B: Aegis Technologies */}
            <GlassCard
              variant="light"
              tiltEnabled={true}
              glossIntensity="high"
              className="p-8 sm:p-10 flex flex-col justify-between shadow-lg"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#285B91]/15 border border-[#285B91]/30 flex items-center justify-center text-[#285B91] mb-6 shadow-sm">
                  <Cpu className="w-7 h-7" />
                </div>
                <div className="text-xs uppercase tracking-wider text-[#285B91] font-bold">Division 02</div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0C1B30] mt-1 mb-3">Aegis Technologies</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Custom software engineering, intelligent AI/ML solutions, cloud infrastructure modernization, and enterprise workflow automation.
                </p>

                <div className="space-y-3 text-xs text-slate-700 border-t border-[#C9D9EC]/60 pt-5 mb-8">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#285B91] shrink-0" />
                    <span>Modern Web Platforms & Reactive Microservices</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#285B91] shrink-0" />
                    <span>Autonomous AI Agents, Vector Search & RAG</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#285B91] shrink-0" />
                    <span>Cloud Migration, DevOps CI/CD & Kubernetes</span>
                  </div>
                </div>
              </div>

              <div>
                <button
                  onClick={() => navigate('/technologies')}
                  className="btn-glossy-blue w-full py-3.5 px-4 rounded-xl text-white font-bold text-xs tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <span>Explore Technology Services</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C9D9EC]" />
                </button>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: WHAT MAKES AEGIS DIFFERENT (LIGHT SECTION: PURE WHITE #FFFFFF)
          ========================================================================= */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF] border-b border-[#C9D9EC]/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#285B91] font-bold mb-3">
              <span className="w-2 h-2 rounded-full bg-[#D5AD63]" />
              <span>Competitive Differentiation</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0C1B30] tracking-tight">
              What Makes Aegis Different?
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-600">
              Unlike theoretical training institutes or disconnected software consultancies, Aegis creates unified symbiosis between skill incubation and software delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <GlassCard variant="light" tiltEnabled={true} className="p-7 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#D5AD63]/20 border border-[#D5AD63]/30 flex items-center justify-center text-[#B88E3E]">
                <Terminal className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#0C1B30]">Production-Tested Faculty</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Courses are instructed by practicing engineers actively shipping code in Aegis Technologies, not detached theoretical trainers.
              </p>
            </GlassCard>

            <GlassCard variant="light" tiltEnabled={true} className="p-7 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#285B91]/15 border border-[#285B91]/30 flex items-center justify-center text-[#285B91]">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#0C1B30]">Full-Stack Capstones</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Students construct end-to-end architectures—deploying Docker containers, CI/CD pipelines, and relational database schemas to live domains.
              </p>
            </GlassCard>

            <GlassCard variant="light" tiltEnabled={true} className="p-7 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#D5AD63]/20 border border-[#D5AD63]/30 flex items-center justify-center text-[#B88E3E]">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#0C1B30]">Institutional Integration</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We partner directly with colleges and secondary schools to upgrade campus labs, certify faculties, and prepare students for tier-1 placement benchmarks.
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: FEATURED PROGRAMS (LIGHT SECTION: PEARL WHITE #F7F8FC)
          ========================================================================= */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F7F8FC] border-b border-[#C9D9EC]/60">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#285B91] font-bold mb-2">
                <span className="w-2 h-2 rounded-full bg-[#D5AD63]" />
                <span>Curated Pathways</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0C1B30] tracking-tight">
                Featured Education Programs
              </h2>
            </div>
            <button
              onClick={() => navigate('/education')}
              className="text-xs font-semibold text-[#285B91] hover:text-[#17385F] flex items-center gap-1.5 transition-colors self-start md:self-auto cursor-pointer"
            >
              <span>View All 10+ Programs</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPrograms.map(prog => (
              <GlassCard
                key={prog.id}
                variant="light"
                tiltEnabled={true}
                className="overflow-hidden flex flex-col justify-between group shadow-sm hover:shadow-xl"
              >
                <div>
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={prog.image || '/src/assets/images/aegis_tech_engineering_1793890910041.jpg'}
                      alt={prog.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0C1B30]/60 via-transparent to-transparent" />
                    <div className="glass-light-pill absolute top-3 left-3 text-[11px] font-bold uppercase tracking-wider text-[#285B91] px-3 py-1 rounded-lg border border-white/80">
                      {prog.category.toUpperCase()}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-bold text-[#0C1B30] group-hover:text-[#285B91] transition-colors">
                      {prog.title}
                    </h3>
                    <p className="mt-2 text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {prog.shortDescription}
                    </p>

                    <div className="mt-4 pt-4 border-t border-[#C9D9EC]/50 flex items-center justify-between text-xs text-slate-500 font-medium">
                      <span className="font-mono">{prog.duration.split(' ')[0]} {prog.duration.split(' ')[1]}</span>
                      <span className="text-[#285B91] font-semibold">{prog.learningMode}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() => navigate(`/programs/${prog.slug}`)}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#EAF1FA] hover:bg-[#285B91] hover:text-white text-[#285B91] font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-[#C9D9EC]/80"
                  >
                    <span>View Curriculum & Details</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#D5AD63]" />
                  </button>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: FEATURED TECHNOLOGY SERVICES (LIGHT SECTION: SOFT BLUE #EAF1FA)
          ========================================================================= */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#EAF1FA] border-b border-[#C9D9EC]/60">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#285B91] font-bold mb-2">
                <span className="w-2 h-2 rounded-full bg-[#D5AD63]" />
                <span>Enterprise Engineering</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0C1B30] tracking-tight">
                Featured Technology Services
              </h2>
            </div>
            <button
              onClick={() => navigate('/services')}
              className="text-xs font-semibold text-[#285B91] hover:text-[#17385F] flex items-center gap-1.5 transition-colors self-start md:self-auto cursor-pointer"
            >
              <span>Explore All 6 Services</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredServices.map((service, index) => (
              <GlassCard
                key={service.id}
                variant="light"
                tiltEnabled={true}
                className="p-6 flex flex-col justify-between group shadow-sm hover:shadow-xl"
              >
                <div>
                  <div className="text-xs font-mono text-[#285B91] font-bold mb-3">0{index + 1}.</div>
                  <h3 className="text-base font-bold text-[#0C1B30] group-hover:text-[#285B91] transition-colors">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                    {service.shortDescription}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {service.technologiesUsed.slice(0, 3).map(tech => (
                      <span key={tech} className="glass-light-pill text-[10px] text-slate-600 px-2 py-0.5 rounded border border-[#C9D9EC]">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    onClick={() => navigate(`/services/${service.slug}`)}
                    className="text-xs font-semibold text-[#285B91] hover:text-[#0C1B30] flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>Read specifications</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 9 & 10: DEMONSTRATION BENCHMARK METRICS & METHODOLOGY (CINEMATIC CONTRAST STRIP ~10%)
          ========================================================================= */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#0C1B30] via-[#17385F] to-[#0C1B30] relative overflow-hidden text-white">
        <div className="tech-grid-pattern absolute inset-0 opacity-20 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Benchmark Metrics Banner */}
          <div className="text-center mb-12">
            <span className="glass-light-pill inline-block px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider text-[#D5AD63] border border-white/20 mb-2">
              Demonstration Benchmark Metrics
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Measured Outcomes & Academic Impact
            </h3>
            <p className="text-xs text-slate-300 mt-1 font-mono">
              (Representative demo benchmarks structured for institutional preview)
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mb-20">
            {SAMPLE_STATISTICS.map((stat, i) => (
              <GlassCard key={i} variant="card" tiltEnabled={true} className="p-6 space-y-2 border-white/20">
                <div className="text-3xl sm:text-5xl font-extrabold gold-gradient-text font-mono tabular-nums">
                  {stat.value}
                </div>
                <div className="text-xs font-semibold text-white uppercase tracking-wider">
                  {stat.label}
                </div>
                <div className="text-[11px] text-slate-300">
                  {stat.context}
                </div>
              </GlassCard>
            ))}
          </div>

          {/* 4-Stage Methodology in High-Gloss Cards */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#D5AD63] font-semibold mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D5AD63]" />
              <span>Our Methodology</span>
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight">
              The 4-Stage Continuous Delivery Model
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <GlassCard variant="card" tiltEnabled={true} className="p-6 space-y-2.5 border-white/15">
              <div className="text-sm font-bold font-mono text-[#D5AD63]">01. Diagnostics</div>
              <h4 className="text-sm font-semibold text-white">Skill & Audit</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Assessing student knowledge baselines or enterprise software specifications to map exact outcomes.
              </p>
            </GlassCard>

            <GlassCard variant="card" tiltEnabled={true} className="p-6 space-y-2.5 border-white/15">
              <div className="text-sm font-bold font-mono text-[#38BDF8]">02. Hands-on Build</div>
              <h4 className="text-sm font-semibold text-white">Applied Engineering Labs</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Direct immersion in code, database modeling, and algorithmic problem sets under mentor guidance.
              </p>
            </GlassCard>

            <GlassCard variant="card" tiltEnabled={true} className="p-6 space-y-2.5 border-white/15">
              <div className="text-sm font-bold font-mono text-[#D5AD63]">03. Capstone Defense</div>
              <h4 className="text-sm font-semibold text-white">Live Code Defense</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Defending system architecture, test coverage, and deployment scripts before senior industry panels.
              </p>
            </GlassCard>

            <GlassCard variant="card" tiltEnabled={true} className="p-6 space-y-2.5 border-white/15">
              <div className="text-sm font-bold font-mono text-[#38BDF8]">04. Delivery</div>
              <h4 className="text-sm font-semibold text-white">Production Release</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Graduating students into product teams or handing over enterprise software code with full SLA guarantees.
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 11: FEATURED PROJECTS (LIGHT SECTION: PEARL WHITE #F7F8FC)
          ========================================================================= */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F7F8FC] border-b border-[#C9D9EC]/60">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#285B91] font-bold mb-2">
                <span className="w-2 h-2 rounded-full bg-[#D5AD63]" />
                <span>Demonstration Portfolio</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0C1B30] tracking-tight">
                Featured Engineering Projects
              </h2>
            </div>
            <button
              onClick={() => navigate('/projects')}
              className="text-xs font-semibold text-[#285B91] hover:text-[#17385F] flex items-center gap-1.5 transition-colors self-start md:self-auto cursor-pointer"
            >
              <span>Explore All Projects</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredProjects.map(proj => (
              <GlassCard
                key={proj.id}
                variant="light"
                tiltEnabled={true}
                className="overflow-hidden flex flex-col justify-between group shadow-sm hover:shadow-xl"
              >
                <div>
                  <div className="h-52 overflow-hidden relative">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0C1B30]/70 via-transparent to-transparent" />
                    <div className="glass-light-pill absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider text-[#0C1B30] px-2.5 py-1 rounded-lg border border-white/80">
                      {proj.category}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-base font-bold text-[#0C1B30] group-hover:text-[#285B91] transition-colors">
                      {proj.title}
                    </h3>
                    <p className="mt-2 text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {proj.shortDescription}
                    </p>

                    <div className="mt-4 pt-4 border-t border-[#C9D9EC]/50 flex flex-wrap gap-1.5">
                      {proj.techStack.slice(0, 4).map(tech => (
                        <span key={tech} className="glass-light-pill text-[10px] text-slate-600 px-2 py-0.5 rounded border border-[#C9D9EC]">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() => navigate(`/projects/${proj.slug}`)}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#EAF1FA] hover:bg-[#285B91] hover:text-white text-[#285B91] font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-[#C9D9EC]/80"
                  >
                    <span>Read Architecture Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#D5AD63]" />
                  </button>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 12: EVENTS AND WORKSHOPS (LIGHT SECTION: SOFT BLUE #EAF1FA)
          ========================================================================= */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#EAF1FA] border-b border-[#C9D9EC]/60">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#285B91] font-bold mb-2">
                <span className="w-2 h-2 rounded-full bg-[#D5AD63]" />
                <span>Community & Engagement</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0C1B30] tracking-tight">
                Upcoming Events & Hackathons
              </h2>
            </div>
            <button
              onClick={() => navigate('/events')}
              className="text-xs font-semibold text-[#285B91] hover:text-[#17385F] flex items-center gap-1.5 transition-colors self-start md:self-auto cursor-pointer"
            >
              <span>View All Events</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {upcomingEvents.map(event => (
              <GlassCard
                key={event.id}
                variant="light"
                tiltEnabled={true}
                className="p-8 flex flex-col justify-between shadow-sm hover:shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                    <span className="font-bold text-[#B88E3E] uppercase tracking-wider">{event.type}</span>
                    <span className="glass-light-pill px-2.5 py-1 rounded text-slate-700 border border-[#C9D9EC] font-medium">{event.mode}</span>
                  </div>

                  <h3 className="text-xl font-bold text-[#0C1B30] mb-2">{event.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">{event.description}</p>

                  <div className="space-y-1.5 text-xs text-slate-500 pt-3 border-t border-[#C9D9EC]/50">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#285B91]" />
                      <span className="font-medium text-slate-700">{event.date} · {event.time}</span>
                    </div>
                    <div>Location: {event.location}</div>
                  </div>
                </div>

                <div className="mt-6 pt-4 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-500">{event.capacity}</span>
                  <button
                    onClick={() => navigate('/events')}
                    className="btn-glossy-gold px-4 py-2 text-xs font-bold text-[#0C1B30] rounded-lg transition-colors cursor-pointer shadow-sm"
                  >
                    Register / Details
                  </button>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 13: TESTIMONIALS (LIGHT SECTION: PURE WHITE #FFFFFF)
          ========================================================================= */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF] border-b border-[#C9D9EC]/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#285B91] font-bold mb-2">
              <span className="w-2 h-2 rounded-full bg-[#D5AD63]" />
              <span>Verified Feedback</span>
            </div>
            <h2 className="text-3xl font-extrabold text-[#0C1B30] tracking-tight">
              What Our Community Says
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.slice(0, 3).map(test => (
              <GlassCard
                key={test.id}
                variant="light"
                tiltEnabled={true}
                className="p-7 flex flex-col justify-between shadow-sm hover:shadow-xl"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-1 text-[#D5AD63]">
                    {Array.from({ length: test.rating }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                    "{test.quote}"
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#C9D9EC]/60">
                  <div className="text-sm font-bold text-[#0C1B30]">{test.name}</div>
                  <div className="text-[11px] text-[#285B91] font-semibold">{test.role}</div>
                  <div className="text-[11px] text-slate-500">{test.organization}</div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 14 & 15: INSTITUTIONAL ALLIANCES & PARTNERSHIP CTA (DARK CINEMATIC SECTION)
          ========================================================================= */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#0C1B30] to-[#17385F] text-white relative overflow-hidden">
        <div className="aurora-glow-gold absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full blur-[160px] opacity-25 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <GlassCard
            variant="card"
            tiltEnabled={false}
            className="p-8 sm:p-14 relative overflow-hidden border-white/20"
          >
            <div className="relative z-10 max-w-2xl space-y-4">
              <span className="glass-light-pill inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-[#D5AD63] border border-white/20">
                Institutional Alliances
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Partner With Aegis Academy for On-Campus Excellence
              </h2>
              <p className="text-sm text-slate-200 leading-relaxed">
                Transform your school or college into an innovation hub. We establish joint Centers of Excellence (CoE), deliver faculty development seminars, and coordinate national hackathons.
              </p>
              <div className="pt-4 flex flex-wrap gap-4">
                <button
                  onClick={() => navigate('/partnerships')}
                  className="btn-glossy-gold px-6 py-3.5 text-xs font-bold text-[#0C1B30] rounded-xl transition-all cursor-pointer shadow-lg"
                >
                  Explore Partnership Models
                </button>
                <button
                  onClick={() => navigate('/contact')}
                  className="btn-glossy-glass px-6 py-3.5 text-xs font-semibold text-slate-200 hover:text-white rounded-xl transition-colors cursor-pointer border border-white/25"
                >
                  Schedule Institutional Discovery
                </button>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* =========================================================================
          SECTION 16: CONTACT CTA (LIGHT SECTION: SOFT BLUE #EAF1FA)
          ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#EAF1FA] border-t border-[#C9D9EC]/50">
        <div className="max-w-4xl mx-auto text-center space-y-5">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0C1B30] tracking-tight">
            Ready to Build Future-Ready Skills or Engineering Solutions?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            Connect directly with our admissions advisors for educational programs, or consult our enterprise solutions engineering desk.
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton
              onClick={() => navigate('/enroll')}
              variant="gold"
              className="text-xs font-bold px-7 py-3"
            >
              Enroll as a Student
            </MagneticButton>
            <button
              onClick={() => navigate('/request-quote')}
              className="btn-glossy-blue px-7 py-3 text-xs font-bold rounded-xl transition-all cursor-pointer shadow-md"
            >
              Request a Technology Quote
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="px-6 py-3 text-xs font-semibold text-[#285B91] hover:text-[#0C1B30] transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>Contact Us Directly</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
