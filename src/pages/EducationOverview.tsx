import React from 'react';
import { useRouter } from '../context/RouterContext';
import { PROGRAMS } from '../data/companyData';
import {
  GraduationCap,
  BookOpen,
  CheckCircle2,
  Cpu,
  Layers,
  ArrowRight,
  Shield,
  Award,
  Terminal,
  Brain,
  Sparkles
} from 'lucide-react';
import { GlassCard } from '../components/common/GlassCard';

export const EducationOverview: React.FC = () => {
  const { navigate } = useRouter();

  const schoolPrograms = PROGRAMS.filter(p => p.category === 'school');
  const collegePrograms = PROGRAMS.filter(p => p.category === 'college');
  const proPrograms = PROGRAMS.filter(p => p.category === 'professional');

  return (
    <div className="min-h-screen bg-[#F7F8FC] text-[#0C1B30] pt-24 pb-20 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute -top-40 right-0 w-[500px] h-[500px] rounded-full blur-[140px] bg-[#EAF1FA] pointer-events-none" />
      <div className="absolute top-1/2 -left-40 w-[500px] h-[500px] rounded-full blur-[140px] bg-[#D5AD63]/10 pointer-events-none" />

      {/* 1. EDUCATION HERO */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-[#C9D9EC]/60 bg-gradient-to-b from-[#EAF1FA] to-[#F7F8FC] overflow-hidden relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-4 relative z-10">
          <span className="glass-light-pill inline-block px-3.5 py-1.5 rounded-full text-xs uppercase tracking-widest text-[#285B91] font-bold border border-[#C9D9EC]">
            Aegis Education Division
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#0C1B30] tracking-tight leading-tight">
            Education Grounded in Reality.{' '}
            <span className="text-[#285B91] block sm:inline">Skills Engineered for Tomorrow.</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Bridging the gap between traditional academic curricula and modern frontier industry realities through hands-on technical labs, practical capstones, and certified instruction.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate('/enroll')}
              className="btn-glossy-gold px-6 py-3.5 text-xs font-semibold text-[#071426] rounded-xl transition-all shadow-lg cursor-pointer"
            >
              Enroll in Upcoming Cohorts
            </button>
            <button
              onClick={() => navigate('/education/colleges')}
              className="btn-glossy-blue px-6 py-3.5 text-xs font-semibold text-white rounded-xl transition-all shadow-md cursor-pointer"
            >
              Explore College Tracks
            </button>
          </div>
        </div>
      </section>

      {/* 2 & 3: EDUCATIONAL PHILOSOPHY */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="glass-light-pill inline-block px-3 py-1 rounded text-xs uppercase tracking-widest text-[#B88E3E] font-bold">
              Pedagogical Framework
            </span>
            <h2 className="text-3xl font-extrabold text-[#0C1B30] tracking-tight">
              Why Learn With Aegis Academy?
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Traditional computer science and technical education prioritizes syntactic memorization over systemic understanding. At Aegis, learners build real-world software from day one: writing automated tests, deploying microservices, and debugging production issues.
            </p>
            <div className="space-y-3 text-xs text-slate-700 pt-2 font-medium">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#B88E3E] shrink-0" />
                <span>Zero toy projects: Every capstone mirrors realistic industry architecture</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#B88E3E] shrink-0" />
                <span>Mentors with proven engineering credentials shipping production systems</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#B88E3E] shrink-0" />
                <span>Rigorous interview preparation & algorithmic speed assessments</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden border border-[#C9D9EC] shadow-xl">
              <img
                src="/src/assets/images/aegis_education_campus_1793890911409.jpg"
                alt="Aegis Education Labs"
                referrerPolicy="no-referrer"
                className="w-full h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. THREE ACADEMIC TIERS */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#EAF1FA] border-t border-b border-[#C9D9EC]/70">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <span className="glass-light-pill inline-block px-3 py-1 rounded text-xs uppercase tracking-widest text-[#285B91] font-bold">
              Comprehensive Pathways
            </span>
            <h2 className="text-3xl font-extrabold text-[#0C1B30] tracking-tight mt-2">
              Three Distinct Academic Divisions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* School Programs */}
            <GlassCard variant="light" tiltEnabled={true} className="p-8 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#D5AD63]/20 border border-[#D5AD63]/40 flex items-center justify-center text-[#B88E3E] mb-4">
                  <Brain className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold text-[#B88E3E] uppercase tracking-wider">Ages 10–15</div>
                <h3 className="text-xl font-bold text-[#0C1B30] mt-1 mb-2">School Programs</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Igniting computational curiosity through AI awareness, visual logic modeling, digital safety, and creative coding puzzles.
                </p>
                <div className="text-xs text-slate-500 space-y-1 mb-6 font-medium">
                  <div>· AI & Generative AI Awareness</div>
                  <div>· Computational Thinking & Logic</div>
                  <div>· Digital Citizenship & Safety</div>
                </div>
              </div>
              <button
                onClick={() => navigate('/education/schools')}
                className="btn-glossy-glass w-full py-2.5 px-4 rounded-xl text-[#0C1B30] text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-[#C9D9EC]"
              >
                <span>View School Programs</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#285B91]" />
              </button>
            </GlassCard>

            {/* College Programs */}
            <GlassCard variant="light" tiltEnabled={true} glossIntensity="high" className="p-8 flex flex-col justify-between shadow-md hover:shadow-xl border-[#285B91]/30">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#285B91]/15 border border-[#285B91]/30 flex items-center justify-center text-[#285B91] mb-4">
                  <Terminal className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold text-[#285B91] uppercase tracking-wider">Undergraduate / Graduate</div>
                <h3 className="text-xl font-bold text-[#0C1B30] mt-1 mb-2">College Bootcamps</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Intensive technical tracks covering Full Stack, Generative AI, Cybersecurity, DSA, Python, Mobile App Dev, and Placement Prep.
                </p>
                <div className="text-xs text-slate-500 space-y-1 mb-6 font-medium">
                  <div>· Full Stack Web Development</div>
                  <div>· Applied Generative AI & LLMs</div>
                  <div>· Cybersecurity & Ethical Hacking</div>
                </div>
              </div>
              <button
                onClick={() => navigate('/education/colleges')}
                className="btn-glossy-gold w-full py-2.5 px-4 rounded-xl text-[#071426] text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
              >
                <span>View College Bootcamps</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </GlassCard>

            {/* Professional Development */}
            <GlassCard variant="light" tiltEnabled={true} className="p-8 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-600 mb-4">
                  <Award className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Corporate & Engineering</div>
                <h3 className="text-xl font-bold text-[#0C1B30] mt-1 mb-2">Professional Training</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Corporate technical upskilling, cloud architecture modernization, executive AI fluency, and workplace leadership workshops.
                </p>
                <div className="text-xs text-slate-500 space-y-1 mb-6 font-medium">
                  <div>· Enterprise AI Integration</div>
                  <div>· Cloud Architecture & DevOps</div>
                  <div>· Executive Tech Leadership</div>
                </div>
              </div>
              <button
                onClick={() => navigate('/education/professional')}
                className="btn-glossy-glass w-full py-2.5 px-4 rounded-xl text-[#0C1B30] text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-[#C9D9EC]"
              >
                <span>View Corporate Upskilling</span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-600" />
              </button>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* 5. ALL ACTIVE PROGRAMS DIRECTORY */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="glass-light-pill inline-block px-3 py-1 rounded text-xs uppercase tracking-widest text-[#B88E3E] font-bold">
              Curriculum Directory
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0C1B30] tracking-tight mt-2">
              Active Educational Programs
            </h2>
          </div>
          <button
            onClick={() => navigate('/enroll')}
            className="text-xs font-bold text-[#285B91] hover:text-[#0C1B30] flex items-center gap-1 cursor-pointer"
          >
            <span>Direct Enrollment Form</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROGRAMS.map(prog => (
            <div
              key={prog.id}
              className="glass-light-card p-6 flex flex-col justify-between hover:border-[#285B91]/40 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 mb-2 font-medium">
                  <span className="uppercase text-[#285B91] font-bold">{prog.category}</span>
                  <span>{prog.duration.split(' ')[0]} {prog.duration.split(' ')[1]}</span>
                </div>
                <h3 className="text-base font-bold text-[#0C1B30] group-hover:text-[#285B91] transition-colors">
                  {prog.title}
                </h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {prog.shortDescription}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#C9D9EC]/60 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-medium">{prog.learningMode}</span>
                <button
                  onClick={() => navigate(`/programs/${prog.slug}`)}
                  className="text-xs font-bold text-[#285B91] hover:text-[#0C1B30] flex items-center gap-1 cursor-pointer"
                >
                  <span>Details</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. ENROLLMENT CTA (CONTRAST BANNER) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-r from-[#0C1B30] to-[#17385F] text-white">
        <div className="max-w-2xl mx-auto space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Ready to Accelerate Your Technical Journey?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Apply online in minutes. Academic scholarships and institutional cohort registrations are currently open.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigate('/enroll')}
              className="btn-glossy-gold px-8 py-3.5 text-xs font-bold text-[#071426] rounded-xl transition-all shadow-xl cursor-pointer"
            >
              Open Student Enrollment Form
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
