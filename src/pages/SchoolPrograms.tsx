import React from 'react';
import { useRouter } from '../context/RouterContext';
import { PROGRAMS } from '../data/companyData';
import {
  Brain,
  Sparkles,
  Shield,
  Lightbulb,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  GraduationCap,
  MessageCircle,
  Puzzle,
  Laptop
} from 'lucide-react';

export const SchoolPrograms: React.FC = () => {
  const { navigate } = useRouter();
  const schoolPrograms = PROGRAMS.filter(p => p.category === 'school');

  const schoolCategories = [
    { title: 'Artificial Intelligence Awareness', desc: 'Understanding how computers perceive images, process voices, and recognize patterns.', icon: Brain },
    { title: 'Generative AI Fundamentals', desc: 'Introduction to prompt crafting, safe AI tool usage, and creative digital storytelling.', icon: Sparkles },
    { title: 'Computational Thinking', desc: 'Breaking intricate challenges into step-by-step algorithms through puzzles and mazes.', icon: Puzzle },
    { title: 'Digital Literacy & Online Safety', desc: 'Navigating cyberspace responsibly: password hygiene, privacy, and cyberbullying prevention.', icon: Shield },
    { title: 'Communication & Expression', desc: 'Articulating complex ideas clearly, presenting school projects, and active listening.', icon: MessageCircle },
    { title: 'Creative Problem Solving', desc: 'Hands-on STEM maker challenges combining physical tinkering with digital logic.', icon: Lightbulb }
  ];

  const faqs = [
    { q: 'What age group are these programs designed for?', a: 'Our school curricula are tailored specifically for students aged 10 to 15 (Grades 5 through 10).' },
    { q: 'Is prior coding knowledge required?', a: 'No prior background is required. We begin with intuitive unplugged activities and block-based visual environments before introducing code syntax.' },
    { q: 'How can our school partner with Aegis Academy?', a: 'Schools can schedule an institutional consultation. We provide trained on-campus instructors, student workbooks, and software lab setup.' }
  ];

  return (
    <div className="min-h-screen bg-[#F7F8FC] text-[#0C1B30] pt-24 pb-20">
      {/* 1. HERO */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-[#C9D9EC]/60 bg-gradient-to-b from-[#EAF1FA] to-[#F7F8FC]">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="glass-light-pill inline-block px-3.5 py-1.5 rounded-full text-xs uppercase tracking-widest text-[#285B91] font-bold border border-[#C9D9EC]">
            Grades 5 – 10 · Ages 10–15
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0C1B30] tracking-tight">
            School Programs: Future-Ready Young Minds
          </h1>
          <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Nurturing computational thinking, artificial intelligence literacy, and creative logic in young learners through experiential, age-appropriate learning.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate('/enroll')}
              className="btn-glossy-gold px-6 py-3 text-xs font-bold text-[#071426] rounded-xl transition-all shadow-md cursor-pointer"
            >
              Enroll Student in Cohort
            </button>
            <button
              onClick={() => navigate('/partnerships')}
              className="btn-glossy-glass px-6 py-3 text-xs font-bold text-[#0C1B30] rounded-xl transition-colors border border-[#C9D9EC] cursor-pointer"
            >
              School Institutional Partnership
            </button>
          </div>
        </div>
      </section>

      {/* 2. PROGRAM CATEGORIES */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="glass-light-pill inline-block px-3 py-1 rounded text-xs uppercase tracking-widest text-[#B88E3E] font-bold">
            Core Pillars
          </span>
          <h2 className="text-3xl font-extrabold text-[#0C1B30] tracking-tight mt-2">
            Program Categories for Young Learners
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schoolCategories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <div key={i} className="glass-light-card p-6 space-y-3 hover:border-[#285B91]/40 transition-all">
                <div className="w-10 h-10 rounded-lg bg-[#D5AD63]/20 flex items-center justify-center text-[#B88E3E]">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#0C1B30]">{cat.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{cat.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. PRACTICAL ACTIVITIES & LEARNING OUTCOMES */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#EAF1FA] border-t border-b border-[#C9D9EC]/70">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="glass-light-pill inline-block px-3 py-1 rounded text-xs uppercase tracking-widest text-[#285B91] font-bold">
              Hands-On Learning
            </span>
            <h2 className="text-3xl font-extrabold text-[#0C1B30] tracking-tight">
              Interactive Activities & Clear Outcomes
            </h2>
            <div className="space-y-4 text-xs text-slate-700">
              <div className="glass-light-card p-4 space-y-1">
                <div className="text-[#285B91] font-bold text-sm">Visual Machine Learning Experiments</div>
                <p className="text-slate-600">Students train computer vision models using webcam inputs to classify objects, observing how machine learning accuracy improves with quality training data.</p>
              </div>

              <div className="glass-light-card p-4 space-y-1">
                <div className="text-[#285B91] font-bold text-sm">Algorithmic Storytelling & Game Design</div>
                <p className="text-slate-600">Transforming math coordinates and logical loops into interactive animated games and digital stories using block programming.</p>
              </div>

              <div className="glass-light-card p-4 space-y-1">
                <div className="text-[#285B91] font-bold text-sm">Digital Ethics & Safe Internet Debates</div>
                <p className="text-slate-600">Structured peer discussions evaluating deepfakes, copyright, online privacy, and responsible algorithmic interactions.</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl overflow-hidden border border-[#C9D9EC] shadow-xl">
              <img
                src="/src/assets/images/aegis_education_campus_1793890911409.jpg"
                alt="School students in AI lab"
                referrerPolicy="no-referrer"
                className="w-full h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. ACTIVE SCHOOL PROGRAMS */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-2xl font-extrabold text-[#0C1B30] mb-8">
          Featured School Learning Modules
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {schoolPrograms.map(prog => (
            <div key={prog.id} className="glass-light-card p-8 flex flex-col justify-between hover:border-[#285B91]/40 transition-all">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2 font-medium">
                  <span className="text-[#B88E3E] font-bold">{prog.duration}</span>
                  <span>{prog.learningMode}</span>
                </div>
                <h3 className="text-xl font-bold text-[#0C1B30] mb-2">{prog.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">{prog.overview}</p>

                <div className="space-y-1.5 text-xs text-slate-600 border-t border-[#C9D9EC]/60 pt-3">
                  <div className="font-bold text-[#0C1B30] mb-1">Key Outcomes:</div>
                  {prog.learningOutcomes.map((out, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#B88E3E] shrink-0" />
                      <span>{out}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[#C9D9EC]/60 flex items-center justify-between">
                <button
                  onClick={() => navigate(`/programs/${prog.slug}`)}
                  className="text-xs font-bold text-[#285B91] hover:text-[#0C1B30] flex items-center gap-1 cursor-pointer"
                >
                  <span>View Full Syllabus</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => navigate('/enroll')}
                  className="btn-glossy-gold px-4 py-2 text-xs font-bold text-[#071426] rounded-lg cursor-pointer"
                >
                  Enroll
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. FAQS */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#EAF1FA] border-t border-[#C9D9EC]/70">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center mb-8">
            <span className="glass-light-pill inline-block px-3 py-1 rounded text-xs uppercase tracking-widest text-[#285B91] font-bold">
              Parent & Educator Questions
            </span>
            <h2 className="text-2xl font-extrabold text-[#0C1B30] mt-2">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((f, i) => (
              <div key={i} className="glass-light-card p-6 space-y-2">
                <div className="text-sm font-bold text-[#0C1B30] flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-[#B88E3E] shrink-0" />
                  <span>{f.q}</span>
                </div>
                <p className="text-xs text-slate-600 pl-6 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
