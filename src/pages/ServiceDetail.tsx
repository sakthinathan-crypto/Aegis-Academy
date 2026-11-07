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
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  HelpCircle,
  Package,
  Calendar,
  Send
} from 'lucide-react';

import { NotFoundPage } from './NotFoundPage';

export const ServiceDetail: React.FC = () => {
  const { params, navigate } = useRouter();
  const slug = params.serviceSlug;

  const service = slug ? SERVICES.find(s => s.slug === slug) : undefined;
  if (!service) {
    return <NotFoundPage />;
  }

  const techIcons: Record<string, any> = {
    Code2,
    Smartphone,
    Cpu,
    Cloud,
    Zap,
    Layers
  };
  const Icon = techIcons[service.icon] || Code2;

  const otherServices = SERVICES.filter(s => s.slug !== service.slug);

  return (
    <div className="min-h-screen bg-[#071426] text-slate-100 pt-24 pb-20">
      {/* 1. SERVICE HERO */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800 bg-gradient-to-b from-[#09182E] to-[#071426]">
        <div className="max-w-5xl mx-auto space-y-4">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <button onClick={() => navigate('/technologies')} className="hover:text-[#D5AD63]">Technologies</button>
            <span>/</span>
            <button onClick={() => navigate('/services')} className="hover:text-[#D5AD63]">Services</button>
            <span>/</span>
            <span className="text-white truncate">{service.title}</span>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <div className="w-12 h-12 rounded-xl bg-[#D5AD63]/10 border border-[#D5AD63]/25 flex items-center justify-center text-[#D5AD63]">
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-[#D5AD63] font-semibold block">
                {service.category} Practice
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                {service.title}
              </h1>
            </div>
          </div>

          <p className="text-base text-slate-300 max-w-3xl leading-relaxed pt-2">
            {service.shortDescription}
          </p>

          <div className="pt-4 flex flex-wrap gap-4">
            <button
              onClick={() => navigate('/request-quote')}
              className="px-6 py-3 text-xs font-semibold bg-[#D5AD63] text-[#071426] hover:bg-[#E8CA8C] rounded-xl transition-all shadow-md shadow-[#D5AD63]/25 flex items-center gap-2"
            >
              <span>Request Quote for {service.title}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="px-6 py-3 text-xs font-semibold bg-[#102B4E] text-slate-200 hover:text-white rounded-xl hover:bg-[#153663] transition-colors border border-slate-700"
            >
              Consult an Architect
            </button>
          </div>
        </div>
      </section>

      {/* 2 & 3: PROBLEMS WE SOLVE & OUR SOLUTIONS */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
        {/* Overview narrative */}
        <div className="max-w-4xl space-y-4">
          <h2 className="text-2xl font-bold text-white tracking-tight">Practice Overview</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            {service.overview}
          </p>
        </div>

        {/* Problems vs Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Problems */}
          <div className="p-8 rounded-2xl bg-[#09182E] border border-red-500/20 space-y-4">
            <div className="flex items-center gap-2 text-red-400 font-semibold text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>Challenges & Friction Points We Address</span>
            </div>
            <div className="space-y-3">
              {service.problemsWeSolve.map((prob, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                  <span className="text-red-400 font-mono">✕</span>
                  <span>{prob}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Solutions */}
          <div className="p-8 rounded-2xl bg-[#0C1E36] border border-[#D5AD63]/30 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-[#D5AD63] font-semibold text-sm">
              <CheckCircle2 className="w-4 h-4" />
              <span>Aegis Engineering Solutions</span>
            </div>
            <div className="space-y-3">
              {service.ourSolutions.map((sol, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-slate-200 leading-relaxed">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D5AD63] shrink-0 mt-0.5" />
                  <span>{sol}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4. TECHNOLOGIES USED */}
        <div className="p-8 rounded-2xl bg-[#09182E] border border-slate-800 space-y-4">
          <h3 className="text-lg font-bold text-white">Technologies & Frameworks Deployed</h3>
          <div className="flex flex-wrap gap-2">
            {service.technologiesUsed.map(t => (
              <span key={t} className="text-xs text-slate-200 bg-[#071426] px-3.5 py-1.5 rounded-lg border border-slate-700 font-mono">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* 5. DEVELOPMENT PROCESS */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white tracking-tight">Our Structured Delivery Lifecycle</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {service.developmentProcess.map(proc => (
              <div key={proc.step} className="p-6 rounded-xl bg-[#0C1E36] border border-slate-800 space-y-2">
                <span className="text-xs font-mono font-bold text-[#D5AD63]">{proc.step}.</span>
                <h4 className="text-sm font-bold text-white">{proc.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{proc.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 6 & 7: DELIVERABLES & SAMPLE PROJECTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Deliverables */}
          <div className="p-8 rounded-2xl bg-[#0C1E36] border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-[#D5AD63] font-semibold text-sm">
              <Package className="w-4 h-4" />
              <span>Standard Enterprise Deliverables</span>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-300">
              {service.deliverables.map((del, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D5AD63] shrink-0 mt-0.5" />
                  <span>{del}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sample Projects */}
          <div className="p-8 rounded-2xl bg-[#0C1E36] border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-blue-400 font-semibold text-sm">
              <Code2 className="w-4 h-4" />
              <span>Sample Implementation Case Studies</span>
            </div>
            <div className="space-y-4">
              {service.sampleProjects.map((proj, i) => (
                <div key={i} className="p-4 rounded-xl bg-[#071426] border border-slate-800 space-y-1">
                  <div className="text-sm font-bold text-white">{proj.name}</div>
                  <p className="text-xs text-slate-400 leading-relaxed">{proj.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 8. FAQS */}
        <div className="space-y-4 max-w-4xl">
          <h2 className="text-2xl font-bold text-white tracking-tight">Service FAQs</h2>
          <div className="space-y-3">
            {service.faqs.map((faq, i) => (
              <div key={i} className="p-5 rounded-xl bg-[#09182E] border border-slate-800 space-y-1.5">
                <div className="text-sm font-semibold text-white flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-[#D5AD63] shrink-0" />
                  <span>{faq.question}</span>
                </div>
                <p className="text-xs text-slate-300 pl-6 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 9. REQUEST A QUOTE CTA */}
        <div className="p-10 rounded-2xl bg-gradient-to-r from-[#102B4E] to-[#0C1E36] border border-[#D5AD63]/30 text-center space-y-4 shadow-2xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Initiate Your {service.title} Project
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Submit your technical scope to receive an estimated timeline, team allocation matrix, and fixed-price quotation.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <button
              onClick={() => navigate('/request-quote')}
              className="px-8 py-3.5 text-xs font-semibold bg-[#D5AD63] text-[#071426] hover:bg-[#E8CA8C] rounded-xl transition-all shadow-md shadow-[#D5AD63]/25"
            >
              Request a Formal Project Quote
            </button>
          </div>
        </div>

        {/* Other Services Navigation */}
        <div className="border-t border-slate-800 pt-12 space-y-4">
          <h3 className="text-base font-bold text-white">Other Technology Services</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {otherServices.map(oth => (
              <button
                key={oth.id}
                onClick={() => navigate(`/services/${oth.slug}`)}
                className="p-3 text-left rounded-xl bg-[#09182E] border border-slate-800 hover:border-[#D5AD63]/40 text-xs text-slate-300 hover:text-white transition-colors"
              >
                <div className="font-semibold">{oth.title}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">{oth.category}</div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
