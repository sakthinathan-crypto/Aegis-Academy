import React from 'react';
import { useRouter } from '../context/RouterContext';
import { PROJECTS } from '../data/companyData';
import {
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Layers,
  Clock,
  Building,
  Code2,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

import { NotFoundPage } from './NotFoundPage';

export const ProjectDetail: React.FC = () => {
  const { params, navigate } = useRouter();
  const slug = params.projectSlug;

  const project = slug ? PROJECTS.find(p => p.slug === slug) : undefined;
  if (!project) {
    return <NotFoundPage />;
  }
  const relatedProjects = PROJECTS.filter(p => p.slug !== project.slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-[#071426] text-slate-100 pt-24 pb-20">
      {/* 1. PROJECT HERO */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800 bg-gradient-to-b from-[#09182E] to-[#071426]">
        <div className="max-w-5xl mx-auto space-y-4">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <button onClick={() => navigate('/projects')} className="hover:text-[#D5AD63]">Projects</button>
            <span>/</span>
            <span className="text-[#D5AD63]">{project.category}</span>
            <span>/</span>
            <span className="text-white truncate">{project.title}</span>
          </div>

          <div className="space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#D5AD63] font-semibold">
              Architecture Case Study
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {project.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              {project.shortDescription}
            </p>
          </div>

          {/* Metadata Strip */}
          <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-300 border-t border-slate-800/80">
            <div>
              Sector: <strong className="text-white">{project.clientSector}</strong>
            </div>
            <div>
              Duration: <strong className="text-white">{project.duration}</strong>
            </div>
            <div>
              Classification: <strong className="text-[#D5AD63]">Demonstration Prototype</strong>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CASE STUDY BODY */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
        {/* Full Visual Feature */}
        <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-2xl relative max-h-[500px]">
          <img
            src={project.image}
            alt={project.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071426]/80 via-transparent to-transparent" />
        </div>

        {/* Problem Statement vs Proposed Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-2xl bg-[#09182E] border border-red-500/20 space-y-3">
            <div className="flex items-center gap-2 text-red-400 font-semibold text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>Problem Statement</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {project.problemStatement}
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[#0C1E36] border border-[#D5AD63]/30 space-y-3 shadow-xl">
            <div className="flex items-center gap-2 text-[#D5AD63] font-semibold text-sm">
              <CheckCircle2 className="w-4 h-4" />
              <span>Proposed Architectural Solution</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {project.proposedSolution}
            </p>
          </div>
        </div>

        {/* Key Features */}
        <div className="p-8 rounded-2xl bg-[#0C1E36] border border-slate-800 space-y-6">
          <h2 className="text-2xl font-bold text-white tracking-tight">System Capabilities & Key Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {project.keyFeatures.map((feat, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-[#071426] border border-slate-800 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-[#D5AD63] shrink-0 mt-0.5" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Stack & Outcomes */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6 p-8 rounded-2xl bg-[#09182E] border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-white">Technology Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map(tech => (
                <span key={tech} className="text-xs text-slate-200 bg-[#071426] px-3.5 py-1.5 rounded-lg border border-slate-700 font-mono">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 p-8 rounded-2xl bg-[#09182E] border border-[#D5AD63]/25 space-y-4">
            <h3 className="text-lg font-bold text-white">Measured Demonstration Outcomes</h3>
            <ul className="space-y-2.5 text-xs text-slate-300">
              {project.outcomes.map((out, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D5AD63] shrink-0 mt-0.5" />
                  <span>{out}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Related Projects */}
        <div className="pt-8 border-t border-slate-800 space-y-6">
          <h2 className="text-2xl font-bold text-white tracking-tight">Explore Related Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedProjects.map(rel => (
              <div
                key={rel.id}
                className="p-6 rounded-2xl bg-[#0C1E36] border border-slate-800 flex flex-col justify-between hover:border-[#D5AD63]/30 transition-all"
              >
                <div>
                  <div className="text-[11px] text-[#D5AD63] font-semibold uppercase mb-1">{rel.category}</div>
                  <h4 className="text-base font-bold text-white">{rel.title}</h4>
                  <p className="text-xs text-slate-300 mt-2 line-clamp-2">{rel.shortDescription}</p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-800">
                  <button
                    onClick={() => navigate(`/projects/${rel.slug}`)}
                    className="text-xs font-semibold text-[#D5AD63] hover:text-white flex items-center gap-1"
                  >
                    <span>View Case Study</span>
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
