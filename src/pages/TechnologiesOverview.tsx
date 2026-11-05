import React from 'react';
import { useRouter } from '../context/RouterContext';
import { SERVICES, PROJECTS } from '../data/companyData';
import {
  Cpu,
  Code2,
  Smartphone,
  Cloud,
  Zap,
  Layers,
  ArrowRight,
  ShieldCheck,
  GitBranch,
  Terminal,
  Server
} from 'lucide-react';
import { GlassCard } from '../components/common/GlassCard';

export const TechnologiesOverview: React.FC = () => {
  const { navigate } = useRouter();

  const techIcons: Record<string, any> = {
    Code2,
    Smartphone,
    Cpu,
    Cloud,
    Zap,
    Layers
  };

  const stackCategories = [
    { title: 'Frontend & UI', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Flutter', 'React Native'] },
    { title: 'Backend & APIs', items: ['Node.js', 'Express', 'Python', 'FastAPI', 'Go', 'GraphQL', 'REST'] },
    { title: 'Data & Intelligence', items: ['PostgreSQL', 'TimescaleDB', 'Redis', 'ChromaDB', 'Pinecone', 'Gemini API', 'PyTorch'] },
    { title: 'Cloud & DevOps', items: ['AWS', 'Google Cloud', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions'] }
  ];

  return (
    <div className="min-h-screen bg-[#F7F8FC] text-[#0C1B30] pt-24 pb-20 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute -top-40 right-0 w-[500px] h-[500px] rounded-full blur-[140px] bg-[#EAF1FA] pointer-events-none" />
      <div className="absolute top-1/2 -left-40 w-[500px] h-[500px] rounded-full blur-[140px] bg-[#285B91]/10 pointer-events-none" />

      {/* 1. HERO */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-[#C9D9EC]/60 bg-gradient-to-b from-[#EAF1FA] to-[#F7F8FC] relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <span className="glass-light-pill inline-block px-3.5 py-1.5 rounded-full text-xs uppercase tracking-widest text-[#285B91] font-bold border border-[#C9D9EC]">
            Aegis Technologies Division
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#0C1B30] tracking-tight leading-tight">
            Enterprise Engineering.{' '}
            <span className="text-[#285B91] block sm:inline">Intelligent Architectures.</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Delivering robust custom software, applied artificial intelligence workflows, cloud-native scalability, and operational automation for modern forward-thinking enterprises.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate('/request-quote')}
              className="btn-glossy-gold px-6 py-3.5 text-xs font-semibold text-[#071426] rounded-xl transition-all shadow-lg cursor-pointer"
            >
              Request a Technology Consultation
            </button>
            <button
              onClick={() => navigate('/services')}
              className="btn-glossy-blue px-6 py-3.5 text-xs font-semibold text-white rounded-xl transition-all shadow-md cursor-pointer"
            >
              View Service Specifications
            </button>
          </div>
        </div>
      </section>

      {/* 2. OUR TECHNOLOGY PHILOSOPHY */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="glass-light-pill inline-block px-3 py-1 rounded text-xs uppercase tracking-widest text-[#B88E3E] font-bold">
              Engineering Mindset
            </span>
            <h2 className="text-3xl font-extrabold text-[#0C1B30] tracking-tight">
              Architectural Resilience Over Hype
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              We design software meant to endure. By combining immutable TypeScript typing, declarative infrastructure, automated contract testing, and deterministic AI evaluation, we safeguard enterprises from technical debt and unpredictable operational drift.
            </p>
            <div className="space-y-3 text-xs text-slate-700 pt-2 font-medium">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#B88E3E] shrink-0" />
                <span>Strict zero-trust data privacy and SOC2-aligned development standards</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#B88E3E] shrink-0" />
                <span>Observable microservices with real-time distributed telemetry</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#B88E3E] shrink-0" />
                <span>Domain-driven design isolating business logic from framework churn</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden border border-[#C9D9EC] shadow-xl">
              <img
                src="/src/assets/images/aegis_tech_engineering_1793890910041.jpg"
                alt="Aegis Technologies Engineering Control Room"
                referrerPolicy="no-referrer"
                className="w-full h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHAT WE BUILD: 6 SERVICES */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#EAF1FA] border-t border-b border-[#C9D9EC]/70">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="glass-light-pill inline-block px-3 py-1 rounded text-xs uppercase tracking-widest text-[#285B91] font-bold">
                Core Capabilities
              </span>
              <h2 className="text-3xl font-extrabold text-[#0C1B30] tracking-tight mt-2">
                What We Build
              </h2>
            </div>
            <button
              onClick={() => navigate('/services')}
              className="text-xs font-bold text-[#285B91] hover:text-[#0C1B30] flex items-center gap-1 cursor-pointer"
            >
              <span>Explore All Services</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map(service => {
              const Icon = techIcons[service.icon] || Code2;
              return (
                <GlassCard
                  key={service.id}
                  variant="light"
                  tiltEnabled={true}
                  className="p-8 flex flex-col justify-between group shadow-sm hover:shadow-xl transition-all"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#285B91]/15 border border-[#285B91]/30 flex items-center justify-center text-[#285B91] mb-4">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-[#0C1B30] group-hover:text-[#285B91] transition-colors">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-xs text-slate-600 leading-relaxed mb-6">
                      {service.shortDescription}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#C9D9EC]/60">
                      {service.technologiesUsed.map(t => (
                        <span key={t} className="glass-light-pill text-[10px] text-[#285B91] font-semibold px-2 py-0.5 rounded border border-[#C9D9EC]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-[#C9D9EC]/60">
                    <button
                      onClick={() => navigate(`/services/${service.slug}`)}
                      className="text-xs font-bold text-[#285B91] hover:text-[#0C1B30] flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Explore Service Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. TECHNOLOGIES WE WORK WITH */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="glass-light-pill inline-block px-3 py-1 rounded text-xs uppercase tracking-widest text-[#B88E3E] font-bold">
            Technology Stack
          </span>
          <h2 className="text-3xl font-extrabold text-[#0C1B30] tracking-tight mt-2">
            Engineered with Modern Industry Standards
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stackCategories.map((cat, idx) => (
            <GlassCard key={idx} variant="light" tiltEnabled={true} className="p-6 space-y-3 shadow-sm hover:shadow-md">
              <h4 className="text-sm font-bold text-[#285B91] uppercase tracking-wider">{cat.title}</h4>
              <div className="space-y-1.5 text-xs text-slate-600 font-medium">
                {cat.items.map(item => (
                  <div key={item} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#B88E3E]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* 5. CONSULTATION CTA (CONTRAST BANNER) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-r from-[#0C1B30] to-[#17385F] text-white">
        <div className="max-w-2xl mx-auto space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Have a Complex Engineering Problem to Solve?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Schedule an architectural review with our technical architects to scope your software requirements.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigate('/request-quote')}
              className="btn-glossy-gold px-8 py-3.5 text-xs font-bold text-[#071426] rounded-xl transition-all shadow-xl cursor-pointer"
            >
              Request a Project Quote
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
