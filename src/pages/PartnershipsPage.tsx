import React, { useState } from 'react';
import { PARTNERSHIP_MODELS } from '../data/companyData';
import { StorageStore } from '../data/store';
import { validateContactForm } from '../utils/validation';
import {
  Building2,
  GraduationCap,
  Briefcase,
  CheckCircle2,
  ArrowRight,
  Handshake,
  ShieldCheck,
  Send
} from 'lucide-react';

export const PartnershipsPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    phone: '',
    type: 'College Partnership',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || formData.name.trim().length < 2) {
      setErrors({ name: 'Contact person name is required.' });
      return;
    }
    if (!formData.organization || formData.organization.trim().length < 2) {
      setErrors({ organization: 'Institution or company name is required.' });
      return;
    }
    if (!formData.email || !formData.email.includes('@')) {
      setErrors({ email: 'Valid email address is required.' });
      return;
    }

    setErrors({});
    const newId = `AEGIS-PART-${Date.now().toString().slice(-5)}`;
    StorageStore.saveContactMessage({
      id: newId,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      category: 'Partnership',
      subject: `Partnership Inquiry: ${formData.organization} (${formData.type})`,
      message: formData.message || `Expressed interest in ${formData.type} collaboration.`,
      submittedAt: new Date().toISOString(),
      status: 'Unread'
    });

    setSubmissionId(newId);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#071426] text-slate-100 pt-24 pb-20">
      {/* 1. HERO */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800 bg-gradient-to-b from-[#09182E] to-[#071426]">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#D5AD63] font-semibold">
            Institutional & Corporate Alliances
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Partner With Aegis Academy
          </h1>
          <p className="text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Collaborating with leading schools, colleges, universities, and technology enterprises to engineer sustainable talent pipelines and foster practical innovation.
          </p>
        </div>
      </section>

      {/* 2. WHY PARTNER WITH AEGIS */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-[#D5AD63] font-semibold">
            Value Proposition
          </span>
          <h2 className="text-3xl font-bold text-white tracking-tight mt-1">
            Why Academic Institutions Choose Aegis
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-[#0C1E36] border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#D5AD63]/10 flex items-center justify-center text-[#D5AD63]">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Elevated Campus Placements</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Equip your students with production-grade engineering portfolios and algorithmic fluency that dramatically improve offer conversions in tier-1 recruitment drives.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[#0C1E36] border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">On-Campus CoE Labs</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              We establish co-branded Centers of Excellence, furnishing your campus computer labs with cloud sandbox environments, specialized curricula, and hackathon schedules.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[#0C1E36] border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <Handshake className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Faculty Development Programs</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Empower your esteemed teaching faculties with hands-on immersion in modern tools: Docker, LangChain, RAG architecture, and microservices design.
            </p>
          </div>
        </div>
      </section>

      {/* 3. COLLABORATION MODELS */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#09182E] border-t border-b border-slate-800">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-widest text-[#D5AD63] font-semibold">
              Flexible Frameworks
            </span>
            <h2 className="text-3xl font-bold text-white tracking-tight mt-1">
              Institutional Collaboration Models
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PARTNERSHIP_MODELS.map((model, idx) => (
              <div key={idx} className="p-8 rounded-2xl bg-[#071426] border border-slate-800 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#D5AD63]">Model 0{idx + 1}</span>
                  <h3 className="text-xl font-bold text-white mt-1 mb-1">{model.title}</h3>
                  <div className="text-xs text-slate-400 mb-4">{model.target}</div>
                  <p className="text-xs text-slate-300 leading-relaxed mb-6">{model.description}</p>

                  <div className="space-y-2 text-xs text-slate-300 border-t border-slate-800 pt-4">
                    <div className="font-semibold text-white text-[11px] uppercase tracking-wider">Key Inclusions:</div>
                    {model.benefits.map((b, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#D5AD63] shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PARTNER INQUIRY FORM */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="p-8 sm:p-12 rounded-2xl bg-[#0C1E36] border border-[#D5AD63]/30 shadow-2xl">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#D5AD63]">
              Institutional Discovery
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              Initiate a Partnership Discussion
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2">
              Our academic alliances director will arrange a detailed exploratory discussion and campus visit.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 rounded-xl bg-[#09182E] border border-emerald-500/40 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Partnership Inquiry Submitted!</h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                Thank you for your interest in collaborating with Aegis Academy. Your reference ID is <strong className="text-[#D5AD63] font-mono">{submissionId}</strong>.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-5 py-2 text-xs font-semibold bg-[#D5AD63] text-[#071426] rounded-lg"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1">
                    Contact Person Name <span className="text-[#D5AD63]">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Dr. Radhika Sundaram"
                    className="w-full px-3 py-2.5 rounded-lg bg-[#071426] border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-[#D5AD63]"
                  />
                  {errors.name && <p className="text-[11px] text-red-400 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1">
                    Institution / Company Name <span className="text-[#D5AD63]">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={e => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="e.g. City College of Engineering"
                    className="w-full px-3 py-2.5 rounded-lg bg-[#071426] border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-[#D5AD63]"
                  />
                  {errors.organization && <p className="text-[11px] text-red-400 mt-1">{errors.organization}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1">
                    Official Email Address <span className="text-[#D5AD63]">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="principal@college.edu.sample"
                    className="w-full px-3 py-2.5 rounded-lg bg-[#071426] border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-[#D5AD63]"
                  />
                  {errors.email && <p className="text-[11px] text-red-400 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1">
                    Phone / Mobile
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98450 12345"
                    className="w-full px-3 py-2.5 rounded-lg bg-[#071426] border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-[#D5AD63]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1">
                  Collaboration Focus
                </label>
                <select
                  value={formData.type}
                  onChange={e => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg bg-[#071426] border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-[#D5AD63]"
                >
                  <option value="Collegiate Center of Excellence (CoE)">Collegiate Center of Excellence (CoE)</option>
                  <option value="School Innovation Alliance (Grades 6-12)">School Innovation Alliance (Grades 6-12)</option>
                  <option value="Faculty Development Program (FDP)">Faculty Development Program (FDP)</option>
                  <option value="Campus Hackathon Hosting">Campus Hackathon Hosting</option>
                  <option value="Corporate Talent Pipeline">Corporate Talent Pipeline</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1">
                  Additional Details or Objectives
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Outline expected student counts, academic calendar preferences, or specific department requirements..."
                  className="w-full px-3 py-2.5 rounded-lg bg-[#071426] border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-[#D5AD63]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#D5AD63] text-[#071426] hover:bg-[#E8CA8C] font-semibold text-xs tracking-wide transition-all shadow-md shadow-[#D5AD63]/25 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Partnership Proposal</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
