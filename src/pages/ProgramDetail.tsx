import React from 'react';
import { useRouter } from '../context/RouterContext';
import { PROGRAMS } from '../data/companyData';
import {
  CheckCircle2,
  Clock,
  Layers,
  Award,
  ArrowRight,
  Shield,
  HelpCircle,
  Code2,
  ChevronRight,
  GraduationCap
} from 'lucide-react';

import { NotFoundPage } from './NotFoundPage';

export const ProgramDetail: React.FC = () => {
  const { params, navigate } = useRouter();
  const slug = params.programSlug;

  // Find program by slug; if not found, render 404
  const program = slug ? PROGRAMS.find(p => p.slug === slug) : undefined;
  if (!program) {
    return <NotFoundPage />;
  }

  const relatedPrograms = PROGRAMS.filter(p => p.slug !== program.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#071426] text-slate-100 pt-24 pb-20">
      {/* 1. PROGRAM HERO */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800 bg-gradient-to-b from-[#09182E] to-[#071426]">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <button onClick={() => navigate('/education')} className="hover:text-[#D5AD63]">Education</button>
            <span>/</span>
            <span className="text-[#D5AD63] capitalize">{program.category}</span>
            <span>/</span>
            <span className="text-white truncate">{program.title}</span>
          </div>

          <div className="space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#D5AD63] font-semibold">
              Professional Engineering Curriculum
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {program.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              {program.shortDescription}
            </p>
          </div>

          {/* Key Metadata Strip */}
          <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-300 border-t border-slate-800/80">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#D5AD63]" />
              <span>Duration: <strong className="text-white">{program.duration}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#D5AD63]" />
              <span>Mode: <strong className="text-white">{program.learningMode}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-[#D5AD63]" />
              <span>Eligibility: <strong className="text-white">{program.eligibility}</strong></span>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap gap-4">
            <button
              onClick={() => navigate('/enroll')}
              className="px-6 py-3 text-xs font-semibold bg-[#D5AD63] text-[#071426] hover:bg-[#E8CA8C] rounded-xl transition-all shadow-md shadow-[#D5AD63]/25 flex items-center gap-2"
            >
              <span>Enroll in This Program</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="px-6 py-3 text-xs font-semibold bg-[#102B4E] text-slate-200 hover:text-white rounded-xl hover:bg-[#153663] transition-colors border border-slate-700"
            >
              Request Syllabus PDF
            </button>
          </div>
        </div>
      </section>

      {/* 2 & 3: OVERVIEW & WHAT YOU WILL LEARN */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-12">
            {/* Overview */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white tracking-tight">Program Overview</h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                {program.overview}
              </p>
            </div>

            {/* What you will learn */}
            <div className="p-8 rounded-2xl bg-[#0C1E36] border border-slate-800 space-y-4">
              <h3 className="text-lg font-bold text-white">What You Will Master</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {program.whatYouWillLearn.map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-[#D5AD63] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. CURRICULUM MODULES */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white tracking-tight">Curriculum Modules</h2>
              <div className="space-y-4">
                {program.curriculum.map(mod => (
                  <div key={mod.moduleNumber} className="p-6 rounded-xl bg-[#09182E] border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between text-xs text-[#D5AD63] font-mono">
                      <span>Module 0{mod.moduleNumber}</span>
                      <span className="text-slate-400">Week 0{mod.moduleNumber * 2 - 1} – 0{mod.moduleNumber * 2}</span>
                    </div>
                    <h4 className="text-base font-bold text-white">{mod.title}</h4>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {mod.topics.map((t, idx) => (
                        <span key={idx} className="text-[11px] text-slate-300 bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 8. PRACTICAL PROJECTS */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white tracking-tight">Practical Capstone Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {program.practicalProjects.map((proj, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-[#0C1E36] border border-slate-800 space-y-3">
                    <div className="text-xs uppercase font-semibold text-[#D5AD63]">Capstone {idx + 1}</div>
                    <h4 className="text-base font-bold text-white">{proj.title}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">{proj.description}</p>
                    <div className="pt-2 flex flex-wrap gap-1.5">
                      {proj.tools.map(tool => (
                        <span key={tool} className="text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 9. LEARNING OUTCOMES */}
            <div className="p-6 rounded-xl bg-[#071426] border border-[#D5AD63]/30 space-y-3">
              <h3 className="text-base font-bold text-white">Target Learning Outcomes</h3>
              <ul className="space-y-2 text-xs text-slate-300">
                {program.learningOutcomes.map((out, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#D5AD63] shrink-0 mt-0.5" />
                    <span>{out}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 10. FREQUENTLY ASKED QUESTIONS */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white tracking-tight">Program FAQs</h2>
              <div className="space-y-3">
                {program.faqs.map((faq, idx) => (
                  <div key={idx} className="p-5 rounded-xl bg-[#09182E] border border-slate-800 space-y-1.5">
                    <div className="text-sm font-semibold text-white flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-[#D5AD63] shrink-0" />
                      <span>{faq.question}</span>
                    </div>
                    <p className="text-xs text-slate-300 pl-6 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Column: Sticky Enrollment Box */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-28 p-6 rounded-2xl bg-[#0C1E36] border border-[#D5AD63]/30 space-y-6 shadow-2xl">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#D5AD63]">Admissions Open</span>
                <h3 className="text-xl font-bold text-white mt-1">Enrollment Desk</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Limited seats available per practical cohort for individual code review attention.
                </p>
              </div>

              <div className="space-y-3 text-xs text-slate-300 border-t border-b border-slate-800 py-4">
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Duration:</span>
                  <span className="text-white font-medium">{program.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Delivery Format:</span>
                  <span className="text-white font-medium">{program.learningMode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Prerequisites:</span>
                  <span className="text-white font-medium text-right max-w-[180px]">{program.prerequisites}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Certification:</span>
                  <span className="text-[#D5AD63] font-medium">Aegis Academy Verified</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/enroll')}
                className="w-full py-3 px-4 rounded-xl bg-[#D5AD63] text-[#071426] hover:bg-[#E8CA8C] font-semibold text-xs tracking-wide transition-all shadow-md shadow-[#D5AD63]/25 flex items-center justify-center gap-2"
              >
                <span>Proceed to Enrollment</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-slate-400 text-center">
                Need syllabus guidance? <button onClick={() => navigate('/contact')} className="text-[#D5AD63] underline">Speak with an advisor</button>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 12. RELATED PROGRAMS */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#09182E] border-t border-slate-800">
        <div className="max-w-7xl mx-auto space-y-8">
          <h2 className="text-2xl font-bold text-white">Related Academic Pathways</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPrograms.map(rel => (
              <div key={rel.id} className="p-6 rounded-2xl bg-[#071426] border border-slate-800 flex flex-col justify-between hover:border-[#D5AD63]/30 transition-all">
                <div>
                  <div className="text-[11px] text-[#D5AD63] font-semibold uppercase mb-1">{rel.category}</div>
                  <h4 className="text-base font-bold text-white">{rel.title}</h4>
                  <p className="text-xs text-slate-300 mt-2 line-clamp-2">{rel.shortDescription}</p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-800">
                  <button
                    onClick={() => navigate(`/programs/${rel.slug}`)}
                    className="text-xs font-semibold text-[#D5AD63] hover:text-white flex items-center gap-1"
                  >
                    <span>View Curriculum</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
