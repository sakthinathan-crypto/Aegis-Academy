import React from 'react';
import { useRouter } from '../context/RouterContext';
import { PROGRAMS, EDUCATION_INITIATIVES, PROGRAM_DURATIONS, INTERNSHIP_POLICY } from '../data/companyData';
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
  Sparkles,
  Clock,
  Briefcase,
  Users
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
            <div className="rounded-2xl overflow-hidden border border-[#C9D9EC] shadow-xl relative group">
              <img
                src="/images/gallery/python-workshop.jpeg"
                alt="AEGIS Python Programming Workshop Lab"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src.endsWith('.jpeg')) {
                    target.src = target.src.replace('.jpeg', '.jpg');
                  } else if (target.src.endsWith('.jpg')) {
                    target.src = target.src.replace('.jpg', '.jpeg');
                  }
                }}
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C1B30]/75 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-semibold text-white bg-[#0C1B30]/85 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/20">
                <span>Hands-on Python Workshop & Code Lab</span>
                <span className="text-[11px] font-mono text-[#D5AD63]">Practical Session</span>
              </div>
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

      {/* SPECIAL EDUCATION INITIATIVE: THIRAN THEDAL THITTAM */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#EAF1FA] border-t border-b border-[#C9D9EC]/70">
        <div className="max-w-7xl mx-auto">
          {EDUCATION_INITIATIVES.map(init => (
            <GlassCard key={init.id} variant="light" tiltEnabled={false} className="p-8 sm:p-12 border-[#285B91]/30 shadow-md">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#D5AD63]" />
                    <span className="text-xs uppercase tracking-widest text-[#285B91] font-bold">
                      Flagship Education Initiative
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0C1B30]">
                    {init.title}
                  </h3>
                  <div className="text-xs font-semibold text-[#B88E3E] uppercase tracking-wider">
                    {init.subtitle}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {init.description}
                  </p>
                  <div className="pt-2">
                    <div className="text-xs font-bold text-[#0C1B30] mb-2">Key Focus Areas:</div>
                    <div className="flex flex-wrap gap-2">
                      {init.focusAreas.map(area => (
                        <span key={area} className="glass-light-pill text-xs text-[#285B91] font-semibold px-3 py-1 rounded-full border border-[#C9D9EC]">
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-4">
                  {init.image && (
                    <div className="rounded-2xl overflow-hidden border border-[#C9D9EC] shadow-md group relative">
                      <img
                        src={init.image}
                        alt={init.title}
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (target.src.endsWith('.jpeg')) {
                            target.src = target.src.replace('.jpeg', '.jpg');
                          } else if (target.src.endsWith('.jpg')) {
                            target.src = target.src.replace('.jpg', '.jpeg');
                          }
                        }}
                        className="w-full h-56 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0C1B30]/60 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-semibold bg-[#0C1B30]/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/20">
                        Classroom Mentoring & Guidance Session
                      </div>
                    </div>
                  )}

                  <div className="bg-white p-6 rounded-2xl border border-[#C9D9EC] space-y-4 shadow-sm">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#0C1B30]">
                      <Users className="w-4 h-4 text-[#285B91]" />
                      <span>Peer-to-Peer Mentoring Model</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Empowering students through accessible mentoring networks that provide candid guidance on collegiate streams, career choices, and technological skill development.
                    </p>
                    <div className="text-[11px] text-slate-500 font-mono pt-2 border-t border-[#C9D9EC]">
                      Delivery: {init.delivery}
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* PROGRAM DURATION MATRIX */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="glass-light-pill inline-block px-3 py-1 rounded text-xs uppercase tracking-widest text-[#285B91] font-bold">
            Flexible Pathways
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0C1B30] tracking-tight mt-2">
            Program Durations
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Modular program formats designed to accommodate school terms, college schedules, and institutional calendars.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {PROGRAM_DURATIONS.map((dur, idx) => (
            <GlassCard key={idx} variant="light" tiltEnabled={true} className="p-5 space-y-2 shadow-sm">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#0C1B30]">{dur.program}</span>
                <span className="font-mono text-[#285B91] font-bold bg-[#EAF1FA] px-2 py-0.5 rounded border border-[#C9D9EC]">
                  {dur.duration}
                </span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">{dur.description}</p>
            </GlassCard>
          ))}
        </div>

        {/* INTERNSHIP OPPORTUNITIES & MANDATORY UNPAID POLICY NOTICE */}
        <div className="glass-light-card p-6 sm:p-8 rounded-2xl border-[#D5AD63]/40 bg-gradient-to-r from-white to-[#FAF6EE] shadow-md">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-[#D5AD63]/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#D5AD63]/20 text-[#B88E3E] flex items-center justify-center shrink-0">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#0C1B30]">Student Internship Opportunities</h3>
                <span className="text-xs text-slate-500 font-medium">{INTERNSHIP_POLICY.eligibility}</span>
              </div>
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider bg-[#0C1B30] text-[#D5AD63] px-3 py-1 rounded-full">
              Year-Round Applications
            </span>
          </div>

          <div className="pt-4 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 space-y-3">
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed font-medium">
                <strong>Important Policy Notice:</strong> {INTERNSHIP_POLICY.notice}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                {INTERNSHIP_POLICY.benefits.map((b, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#285B91] shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:col-span-4 text-center md:text-right">
              <button
                onClick={() => navigate('/careers')}
                className="btn-glossy-gold px-6 py-3 text-xs font-bold text-[#071426] rounded-xl transition-all shadow-md cursor-pointer inline-flex items-center gap-2"
              >
                <span>View Internship Application</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
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
