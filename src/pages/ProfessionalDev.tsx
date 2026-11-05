import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { PROGRAMS } from '../data/companyData';
import { StorageStore } from '../data/store';
import { validateQuoteRequest } from '../utils/validation';
import {
  Award,
  Briefcase,
  Users,
  CheckCircle2,
  TrendingUp,
  Cpu,
  ArrowRight,
  Send,
  Building2,
  ShieldCheck
} from 'lucide-react';

export const ProfessionalDev: React.FC = () => {
  const { navigate } = useRouter();

  const proPrograms = PROGRAMS.filter(p => p.category === 'professional');

  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    phone: '',
    serviceRequired: 'Corporate Technical Upskilling',
    projectDescription: '',
    estimatedBudget: '$5,000 - $10,000',
    expectedTimeline: '1-2 Months'
  });

  const [submitted, setSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateQuoteRequest(formData);
    if (!result.isValid) {
      setErrors(result.errors);
      return;
    }

    setErrors({});
    const newId = `AEGIS-CORP-${Date.now().toString().slice(-5)}`;
    StorageStore.saveQuoteRequest({
      id: newId,
      name: formData.name,
      organization: formData.organization,
      email: formData.email,
      phone: formData.phone,
      serviceRequired: formData.serviceRequired,
      projectDescription: formData.projectDescription,
      estimatedBudget: formData.estimatedBudget,
      expectedTimeline: formData.expectedTimeline,
      submittedAt: new Date().toISOString(),
      status: 'New'
    });

    setSubmissionId(newId);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F7F8FC] text-[#0C1B30] pt-24 pb-20">
      {/* 1. HERO */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-[#C9D9EC]/60 bg-gradient-to-b from-[#EAF1FA] to-[#F7F8FC]">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="glass-light-pill inline-block px-3.5 py-1.5 rounded-full text-xs uppercase tracking-widest text-[#285B91] font-bold border border-[#C9D9EC]">
            Enterprise & Workforce Upskilling
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0C1B30] tracking-tight">
            Professional Development & Corporate Workshops
          </h1>
          <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Accelerating engineering teams, closing enterprise skill gaps in Cloud & AI, and equipping mid-career professionals with modern architectural mastery.
          </p>
        </div>
      </section>

      {/* 2. CORPORATE TRACKS & CAPABILITIES */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="glass-light-card p-8 space-y-4 shadow-sm hover:shadow-xl transition-all">
            <div className="w-10 h-10 rounded-lg bg-[#D5AD63]/20 flex items-center justify-center text-[#B88E3E]">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#0C1B30]">Engineering Modernization</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Transition legacy codebases to TypeScript microservices, Kubernetes orchestration, and continuous integration pipelines.
            </p>
          </div>

          <div className="glass-light-card p-8 space-y-4 shadow-sm hover:shadow-xl transition-all">
            <div className="w-10 h-10 rounded-lg bg-[#285B91]/15 flex items-center justify-center text-[#285B91]">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#0C1B30]">Enterprise AI & LLM Systems</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Equip in-house developers to build private RAG pipelines, fine-tune models, and deploy autonomous agents with data governance.
            </p>
          </div>

          <div className="glass-light-card p-8 space-y-4 shadow-sm hover:shadow-xl transition-all">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/15 flex items-center justify-center text-emerald-600">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#0C1B30]">Executive Tech Fluency</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Workshops for product managers, engineering directors, and executives on technical debt, AI strategy, and cloud economics.
            </p>
          </div>
        </div>

        {/* Corporate Inquiry Form */}
        <div className="glass-light-card p-8 sm:p-12 shadow-xl border-[#C9D9EC]">
          <div className="max-w-2xl mb-8">
            <span className="glass-light-pill inline-block px-3 py-1 rounded text-xs font-bold uppercase tracking-wider text-[#B88E3E]">
              Customized Corporate Training
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0C1B30] mt-2">
              Request a Corporate Workshop Proposal
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Tell us about your organization’s tech stack, cohort size, and learning objectives. Our corporate solutions director will formulate a tailored syllabus.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 rounded-xl bg-white/90 border border-emerald-500/40 text-center space-y-4 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-emerald-500/15 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0C1B30]">Proposal Request Received!</h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Thank you for contacting Aegis Academy. Your corporate inquiry reference is <strong className="text-[#285B91] font-mono font-bold">{submissionId}</strong>. Our enterprise solutions lead will reach out to schedule an exploratory discovery call.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="btn-glossy-gold px-5 py-2 text-xs font-bold text-[#071426] rounded-lg cursor-pointer"
              >
                Submit Additional Requirements
              </button>
            </div>
          ) : (
            <form onSubmit={handleInquirySubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0C1B30] mb-1">
                    Contact Person Name <span className="text-[#B88E3E]">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ramesh V. Kulkarni"
                    className="w-full px-3 py-2.5 rounded-lg bg-white border border-[#C9D9EC] text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#285B91] shadow-xs"
                  />
                  {errors.name && <p className="text-[11px] text-red-500 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0C1B30] mb-1">
                    Company / Organization <span className="text-[#B88E3E]">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={e => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="e.g. Infosys Ltd."
                    className="w-full px-3 py-2.5 rounded-lg bg-white border border-[#C9D9EC] text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#285B91] shadow-xs"
                  />
                  {errors.organization && <p className="text-[11px] text-red-500 mt-1">{errors.organization}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0C1B30] mb-1">
                    Corporate Email <span className="text-[#B88E3E]">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ramesh@company.com"
                    className="w-full px-3 py-2.5 rounded-lg bg-white border border-[#C9D9EC] text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#285B91] shadow-xs"
                  />
                  {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0C1B30] mb-1">
                    Phone Number <span className="text-[#B88E3E]">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98450 99887"
                    className="w-full px-3 py-2.5 rounded-lg bg-white border border-[#C9D9EC] text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#285B91] shadow-xs"
                  />
                  {errors.phone && <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0C1B30] mb-1">
                  Training Requirements & Cohort Context <span className="text-[#B88E3E]">*</span>
                </label>
                <textarea
                  rows={4}
                  value={formData.projectDescription}
                  onChange={e => setFormData({ ...formData, projectDescription: e.target.value })}
                  placeholder="Outline your target team size (e.g., 25 junior engineers), key technical domains (e.g., Docker, Kubernetes, Next.js), and preferred dates..."
                  className="w-full px-3 py-2.5 rounded-lg bg-white border border-[#C9D9EC] text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#285B91] shadow-xs"
                />
                {errors.projectDescription && <p className="text-[11px] text-red-500 mt-1">{errors.projectDescription}</p>}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="btn-glossy-gold px-6 py-3 rounded-xl text-[#071426] font-bold text-xs tracking-wide transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Request Customized Proposal</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
