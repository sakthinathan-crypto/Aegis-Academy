import React from 'react';
import { useRouter } from '../context/RouterContext';
import { SERVICES } from '../data/companyData';
import {
  Code2,
  Smartphone,
  Cpu,
  Cloud,
  Zap,
  Layers,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

export const ServicesOverview: React.FC = () => {
  const { navigate } = useRouter();

  const techIcons: Record<string, any> = {
    Code2,
    Smartphone,
    Cpu,
    Cloud,
    Zap,
    Layers
  };

  return (
    <div className="min-h-screen bg-[#F7F8FC] text-[#0C1B30] pt-24 pb-20">
      {/* 1. HERO */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-[#C9D9EC]/60 bg-gradient-to-b from-[#EAF1FA] to-[#F7F8FC]">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="glass-light-pill inline-block px-3.5 py-1.5 rounded-full text-xs uppercase tracking-widest text-[#285B91] font-bold border border-[#C9D9EC]">
            Enterprise Solutions Directory
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0C1B30] tracking-tight">
            Our Technology Services
          </h1>
          <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            From modern responsive web applications to autonomous AI workflows and resilient cloud infrastructures, explore our complete suite of specialized enterprise engineering capabilities.
          </p>
        </div>
      </section>

      {/* 2. SERVICES LIST */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        {SERVICES.map((serv, index) => {
          const Icon = techIcons[serv.icon] || Code2;

          return (
            <div
              key={serv.id}
              className="glass-light-card p-8 sm:p-12 shadow-sm hover:shadow-xl transition-all"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#285B91]/15 flex items-center justify-center text-[#285B91]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono font-bold text-[#B88E3E]">0{index + 1}. {serv.category}</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0C1B30] tracking-tight">
                    {serv.title}
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {serv.overview}
                  </p>

                  <div className="pt-2">
                    <div className="text-xs font-bold text-[#285B91] mb-2 uppercase tracking-wider">
                      Key Solutions Provided:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 font-medium">
                      {serv.ourSolutions.slice(0, 4).map((sol, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#B88E3E] shrink-0 mt-0.5" />
                          <span>{sol}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {serv.technologiesUsed.map(t => (
                      <span key={t} className="glass-light-pill text-[11px] text-[#285B91] font-semibold px-2.5 py-0.5 rounded border border-[#C9D9EC]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-4 flex flex-col justify-center items-start lg:items-end gap-4 border-t lg:border-t-0 lg:border-l border-[#C9D9EC]/70 pt-6 lg:pt-0 lg:pl-8">
                  <div className="text-xs text-slate-500">
                    Sample Client Case:
                    <div className="font-bold text-[#0C1B30] text-sm mt-0.5">
                      {serv.sampleProjects[0]?.name}
                    </div>
                  </div>

                  <button
                    onClick={() => navigate(`/services/${serv.slug}`)}
                    className="btn-glossy-gold w-full sm:w-auto px-6 py-3 text-xs font-bold text-[#071426] rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Read Full Specification</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => navigate('/request-quote')}
                    className="btn-glossy-glass w-full sm:w-auto px-6 py-2.5 text-xs font-bold text-[#0C1B30] border border-[#C9D9EC] rounded-xl transition-colors cursor-pointer"
                  >
                    Request a Quote
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};
