import React from 'react';
import { useRouter } from '../context/RouterContext';
import { LEADERSHIP_TEAM } from '../data/companyData';
import { Linkedin, Shield, Info, ArrowRight } from 'lucide-react';

export const Leadership: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <div className="min-h-screen bg-[#F7F8FC] text-[#0C1B30] pt-24 pb-20">
      {/* Header */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-[#C9D9EC]/60 bg-gradient-to-b from-[#EAF1FA] to-[#F7F8FC]">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="glass-light-pill inline-block px-3.5 py-1.5 rounded-full text-xs uppercase tracking-widest text-[#285B91] font-bold border border-[#C9D9EC]">
            Executive Governance
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0C1B30] tracking-tight">
            Leadership & Key Executives
          </h1>
          <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Guiding strategic expansion, academic innovation, and technology engineering with a deep commitment to excellence.
          </p>
        </div>
      </section>

      {/* Leadership Profile Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {LEADERSHIP_TEAM.map(leader => (
            <div
              key={leader.id}
              className="glass-light-card rounded-2xl overflow-hidden flex flex-col justify-between hover:border-[#285B91]/40 transition-all duration-300 shadow-sm hover:shadow-xl group"
            >
              <div>
                <div className="relative h-64 overflow-hidden bg-slate-100">
                  <img
                    src={leader.avatar}
                    alt={leader.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C1B30]/70 via-transparent to-transparent" />
                </div>

                <div className="p-6">
                  <div className="text-xs uppercase tracking-wider font-bold text-[#B88E3E] mb-1">
                    {leader.department}
                  </div>
                  <h3 className="text-xl font-bold text-[#0C1B30] group-hover:text-[#285B91] transition-colors">
                    {leader.name}
                  </h3>
                  <div className="text-xs font-semibold text-[#285B91] mb-3">
                    {leader.designation}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {leader.bio}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-[#C9D9EC]/60 flex items-center justify-between">
                <a
                  href={leader.linkedInUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#285B91] hover:text-[#0C1B30] font-semibold transition-colors"
                  aria-label={`${leader.name} LinkedIn Profile`}
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn Profile</span>
                </a>
                <span className="text-[10px] text-slate-400 font-medium">AEGIS ACADEMY</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-xs text-slate-600 mb-4 font-medium">
            Interested in joining our visionary team of educators and engineers?
          </p>
          <button
            onClick={() => navigate('/careers')}
            className="btn-glossy-gold px-6 py-3 text-xs font-bold text-[#071426] rounded-xl transition-all inline-flex items-center gap-2 cursor-pointer shadow-md"
          >
            <span>Explore Open Positions & Fellowships</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
