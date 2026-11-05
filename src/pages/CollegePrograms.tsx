import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { PROGRAMS } from '../data/companyData';
import {
  Code,
  Terminal,
  Cpu,
  ShieldCheck,
  Brain,
  MessageSquare,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  Laptop
} from 'lucide-react';

export const CollegePrograms: React.FC = () => {
  const { navigate } = useRouter();
  const [filter, setFilter] = useState<'all' | 'technical' | 'career'>('all');

  const collegePrograms = PROGRAMS.filter(p => p.category === 'college');

  const technicalSlugs = [
    'full-stack-web-development',
    'generative-ai',
    'cybersecurity',
    'python-programming',
    'app-development',
    'data-structures-algorithms'
  ];

  const careerSlugs = ['aptitude-training', 'communication-skills'];

  const filteredPrograms = collegePrograms.filter(p => {
    if (filter === 'technical') return technicalSlugs.includes(p.slug);
    if (filter === 'career') return careerSlugs.includes(p.slug);
    return true;
  });

  return (
    <div className="min-h-screen bg-[#F7F8FC] text-[#0C1B30] pt-24 pb-20">
      {/* 1. HERO */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-[#C9D9EC]/60 bg-gradient-to-b from-[#EAF1FA] to-[#F7F8FC]">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="glass-light-pill inline-block px-3.5 py-1.5 rounded-full text-xs uppercase tracking-widest text-[#285B91] font-bold border border-[#C9D9EC]">
            Undergraduate & Postgraduate Finishing School
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0C1B30] tracking-tight">
            College Technical & Career Acceleration Bootcamps
          </h1>
          <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Transition from academic theory to industry-grade production. Master modern software engineering, generative AI, cybersecurity, and tier-1 campus placement assessments.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate('/enroll')}
              className="btn-glossy-gold px-6 py-3 text-xs font-bold text-[#071426] rounded-xl transition-all shadow-md cursor-pointer"
            >
              Apply for Upcoming Cohort
            </button>
            <button
              onClick={() => navigate('/programs/full-stack-web-development')}
              className="btn-glossy-blue px-6 py-3 text-xs font-semibold text-white rounded-xl transition-all shadow-md cursor-pointer"
            >
              Explore Full Stack Track
            </button>
          </div>
        </div>
      </section>

      {/* 2. FILTER TABS & PROGRAM GRID */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-4">
          <div>
            <span className="glass-light-pill inline-block px-3 py-1 rounded text-xs uppercase tracking-widest text-[#B88E3E] font-bold">
              Curriculum Tracks
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0C1B30] tracking-tight mt-2">
              Engineered for Industry Readiness
            </h2>
          </div>

          {/* Interactive filter controls */}
          <div className="flex items-center gap-1.5 p-1 bg-[#EAF1FA] rounded-xl border border-[#C9D9EC] self-start sm:self-auto">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                filter === 'all'
                  ? 'bg-[#285B91] text-white shadow-sm'
                  : 'text-slate-600 hover:text-[#0C1B30]'
              }`}
            >
              All College Tracks ({collegePrograms.length})
            </button>
            <button
              onClick={() => setFilter('technical')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                filter === 'technical'
                  ? 'bg-[#285B91] text-white shadow-sm'
                  : 'text-slate-600 hover:text-[#0C1B30]'
              }`}
            >
              Technical Core
            </button>
            <button
              onClick={() => setFilter('career')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                filter === 'career'
                  ? 'bg-[#285B91] text-white shadow-sm'
                  : 'text-slate-600 hover:text-[#0C1B30]'
              }`}
            >
              Career & Aptitude
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPrograms.map(prog => (
            <div
              key={prog.id}
              className="glass-light-card rounded-2xl overflow-hidden flex flex-col justify-between hover:border-[#285B91]/40 transition-all duration-300 group shadow-sm hover:shadow-xl"
            >
              <div>
                <div className="h-44 overflow-hidden relative">
                  <img
                    src={prog.image || '/src/assets/images/aegis_tech_engineering_1793890910041.jpg'}
                    alt={prog.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C1B30]/80 via-transparent to-transparent" />
                  <div className="absolute top-3 right-3 text-[10px] font-mono font-bold bg-white/90 backdrop-blur-md text-[#285B91] px-2.5 py-1 rounded border border-[#C9D9EC]">
                    {prog.duration}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-[#0C1B30] group-hover:text-[#285B91] transition-colors">
                    {prog.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {prog.shortDescription}
                  </p>

                  <div className="mt-4 pt-4 border-t border-[#C9D9EC]/60 space-y-1.5 text-xs text-slate-600">
                    <div className="font-bold text-[#285B91] text-[11px] uppercase tracking-wider">
                      What you will build:
                    </div>
                    {prog.practicalProjects.slice(0, 1).map((proj, idx) => (
                      <div key={idx} className="text-slate-600 text-xs font-medium">
                        · {proj.title}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => navigate(`/programs/${prog.slug}`)}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#285B91] hover:bg-[#1E4570] text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <span>View Syllabus & Defense Criteria</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. METHODOLOGY & INDUSTRY-ORIENTED LEARNING */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#EAF1FA] border-t border-b border-[#C9D9EC]/70">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="max-w-3xl">
            <span className="glass-light-pill inline-block px-3 py-1 rounded text-xs uppercase tracking-widest text-[#285B91] font-bold">
              Training Methodology
            </span>
            <h2 className="text-3xl font-extrabold text-[#0C1B30] tracking-tight mt-2 mb-4">
              How Aegis College Bootcamps Operate
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              We replace monotonous PowerPoint lectures with interactive paired coding, simulated sprint standups, continuous GitHub PR reviews, and live architectural defenses.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-light-card p-6 space-y-2">
              <div className="text-sm font-bold text-[#B88E3E]">01. Concept Sprints</div>
              <p className="text-xs text-slate-600 leading-relaxed">Interactive architectural breakdowns of underlying algorithms and database schemas.</p>
            </div>
            <div className="glass-light-card p-6 space-y-2">
              <div className="text-sm font-bold text-[#B88E3E]">02. Sandbox Labs</div>
              <p className="text-xs text-slate-600 leading-relaxed">Students code in cloud sandboxes with automated unit tests and immediate feedback.</p>
            </div>
            <div className="glass-light-card p-6 space-y-2">
              <div className="text-sm font-bold text-[#B88E3E]">03. Capstone Projects</div>
              <p className="text-xs text-slate-600 leading-relaxed">Building production-grade applications that solve non-trivial business problems.</p>
            </div>
            <div className="glass-light-card p-6 space-y-2">
              <div className="text-sm font-bold text-[#B88E3E]">04. Placement Readiness</div>
              <p className="text-xs text-slate-600 leading-relaxed">Timed LeetCode-style problem drills, speed math, and STAR-method mock interviews.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ENROLLMENT CTA (CONTRAST BANNER) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-r from-[#0C1B30] to-[#17385F] text-white">
        <div className="max-w-2xl mx-auto space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Ready to Accelerate Your Career?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Submit your student profile today to receive the program curriculum and schedule.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigate('/enroll')}
              className="btn-glossy-gold px-8 py-3.5 text-xs font-bold text-[#071426] rounded-xl transition-all shadow-xl cursor-pointer"
            >
              Start Student Enrollment
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
