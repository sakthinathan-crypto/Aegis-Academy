import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { PROJECTS } from '../data/companyData';
import { ArrowRight, Info, Layers, ExternalLink } from 'lucide-react';

export const ProjectsPortfolio: React.FC = () => {
  const { navigate } = useRouter();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = [
    'All',
    'Web Applications',
    'Mobile Applications',
    'AI Solutions',
    'Automation Solutions'
  ];

  const filteredProjects = activeCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#F7F8FC] text-[#0C1B30] pt-24 pb-20">
      {/* 1. HERO */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-[#C9D9EC]/60 bg-gradient-to-b from-[#EAF1FA] to-[#F7F8FC]">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="glass-light-pill inline-block px-3.5 py-1.5 rounded-full text-xs uppercase tracking-widest text-[#285B91] font-bold border border-[#C9D9EC]">
            Engineering Case Studies
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0C1B30] tracking-tight">
            Projects & Technical Portfolio
          </h1>
          <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            A curated showcase of full-stack platforms, precision IoT meshes, and generative AI systems engineered by Aegis Academy teams and student fellows.
          </p>

          {/* Sample portfolio disclaimer as instructed */}
          <div className="mt-6 p-4 rounded-xl glass-light-card border-[#C9D9EC] text-xs text-slate-600 flex items-start gap-3 text-left max-w-2xl mx-auto shadow-sm">
            <Info className="w-5 h-5 text-[#B88E3E] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#0C1B30] block mb-0.5">Sample Portfolio Notice:</strong>
              The projects shown below are representative demonstration case studies developed to showcase technical architecture and engineering craft. They are not intended as verified historical client endorsements.
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY FILTERS & PROJECT GRID */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Interactive category buttons */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-[#C9D9EC]/60">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#285B91] text-white shadow-md'
                  : 'bg-white text-slate-600 hover:text-[#0C1B30] hover:bg-[#EAF1FA] border border-[#C9D9EC]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map(proj => (
            <div
              key={proj.id}
              className="glass-light-card rounded-2xl overflow-hidden flex flex-col justify-between hover:border-[#285B91]/40 transition-all duration-300 group shadow-sm hover:shadow-xl"
            >
              <div>
                <div className="h-56 overflow-hidden relative">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C1B30]/80 via-transparent to-transparent opacity-90" />
                  <div className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider text-[#285B91] bg-white/90 backdrop-blur-md px-2.5 py-1 rounded border border-[#C9D9EC]">
                    {proj.category}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-[#0C1B30] group-hover:text-[#285B91] transition-colors">
                    {proj.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {proj.shortDescription}
                  </p>

                  <div className="mt-4 pt-4 border-t border-[#C9D9EC]/60 space-y-2">
                    <div className="text-[11px] text-slate-500 font-medium">
                      Sector: <span className="text-[#0C1B30] font-bold">{proj.clientSector}</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {proj.techStack.map(tech => (
                        <span key={tech} className="glass-light-pill text-[10px] text-[#285B91] font-semibold px-2 py-0.5 rounded border border-[#C9D9EC] font-mono">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => navigate(`/projects/${proj.slug}`)}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#285B91] hover:bg-[#1E4570] text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <span>Read Full Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
