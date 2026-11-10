import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { SERVICES } from '../data/companyData';
import { StorageStore } from '../data/store';
import { validateQuoteRequest, generateApplicationId } from '../utils/validation';
import {
  Send,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Building2,
  FileText
} from 'lucide-react';

import { quoteService } from '../services/quoteService';

export const RequestQuote: React.FC = () => {
  const { navigate } = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    phone: '',
    serviceRequired: 'Web Application Development',
    projectDescription: '',
    estimatedBudget: '$15,000 - $30,000',
    expectedTimeline: '2-3 Months',
    additionalRequirements: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [quoteId, setQuoteId] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    const result = validateQuoteRequest(formData);
    if (!result.isValid) {
      setErrors(result.errors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const res = await quoteService.submitQuote({
        fullName: formData.name,
        workEmail: formData.email,
        phone: formData.phone,
        companyName: formData.organization,
        companyType: 'Enterprise / Institution',
        serviceRequired: formData.serviceRequired,
        budgetRange: formData.estimatedBudget,
        targetTimeline: formData.expectedTimeline,
        requirements: formData.additionalRequirements 
          ? `${formData.projectDescription} | Infrastructure notes: ${formData.additionalRequirements}`
          : formData.projectDescription
      });

      const confirmedId = res.data?.quoteId || (res as any).quoteId;
      if (res.success && confirmedId) {
        setQuoteId(confirmedId);
        setSubmitted(true);
      } else {
        const errMsg = typeof res.error === 'object' && res.error ? res.error.message : String(res.error || res.message || 'Failed to submit quote request. Please try again.');
        setApiError(errMsg);
      }
    } catch (err: any) {
      setApiError(err.message || 'Network error occurred while submitting quotation.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F8FC] text-[#0C1B30] pt-24 pb-20">
      {/* 1. HERO */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-[#C9D9EC]/60 bg-gradient-to-b from-[#EAF1FA] to-[#F7F8FC]">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="glass-light-pill inline-block px-3.5 py-1.5 rounded-full text-xs uppercase tracking-widest text-[#285B91] font-bold border border-[#C9D9EC]">
            Enterprise Client Services Desk
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0C1B30] tracking-tight">
            Request an Enterprise Technology Quote
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Collaborate with Aegis Technologies architects. Share your engineering scope to receive an estimated timeline, technical stack proposal, and transparent budget structure.
          </p>
        </div>
      </section>

      {/* 2. FORM CONTAINER */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="glass-light-card rounded-2xl p-8 sm:p-12 shadow-xl border-[#C9D9EC]">
          {submitted ? (
            /* Confirmation Screen */
            <div className="text-center space-y-6 py-6 animate-in fade-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="glass-light-pill inline-block px-3 py-1 rounded text-xs font-bold uppercase tracking-wider text-[#B88E3E]">
                  Quotation Request Logged
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0C1B30]">
                  Thank You, {formData.name}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                  Your project scope has been dispatched to the Aegis Technologies Solutions Architecture team.
                </p>
              </div>

              <div className="max-w-md mx-auto p-6 rounded-xl bg-white/95 border border-[#C9D9EC] text-left space-y-3 text-xs shadow-sm">
                <div className="flex justify-between border-b border-[#C9D9EC]/60 pb-2">
                  <span className="text-slate-500 font-medium">Quotation Ticket ID:</span>
                  <span className="font-mono font-bold text-[#285B91]">{quoteId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Organization:</span>
                  <span className="text-[#0C1B30] font-bold">{formData.organization}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Service Required:</span>
                  <span className="text-[#0C1B30] font-bold">{formData.serviceRequired}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Budget Range:</span>
                  <span className="text-[#0C1B30] font-bold">{formData.estimatedBudget}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Expected Timeline:</span>
                  <span className="text-[#0C1B30] font-bold">{formData.expectedTimeline}</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => navigate('/admin')}
                  className="btn-glossy-blue px-6 py-2.5 text-xs font-bold text-white rounded-xl shadow-md cursor-pointer"
                >
                  Verify in Admin Leads Table
                </button>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      organization: '',
                      email: '',
                      phone: '',
                      serviceRequired: 'Web Application Development',
                      projectDescription: '',
                      estimatedBudget: '$15,000 - $30,000',
                      expectedTimeline: '2-3 Months',
                      additionalRequirements: ''
                    });
                  }}
                  className="btn-glossy-gold px-6 py-2.5 text-xs font-bold text-[#071426] rounded-xl cursor-pointer"
                >
                  Submit Another Scope
                </button>
              </div>
            </div>
          ) : (
            /* Request Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border-b border-[#C9D9EC]/60 pb-4">
                <h3 className="text-lg font-extrabold text-[#0C1B30]">Client & Organization Coordinates</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0C1B30] mb-1">
                    Contact Person Name <span className="text-[#B88E3E]">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Suresh Kumar Menon"
                    className={`w-full px-3 py-2.5 rounded-lg bg-white border text-xs text-slate-800 focus:outline-none shadow-xs ${
                      errors.name ? 'border-red-500' : 'border-[#C9D9EC] focus:border-[#285B91]'
                    }`}
                  />
                  {errors.name && <p className="text-[11px] text-red-500 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0C1B30] mb-1">
                    Company / Organization Name <span className="text-[#B88E3E]">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={e => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="e.g. Apex Logistics Solutions"
                    className={`w-full px-3 py-2.5 rounded-lg bg-white border text-xs text-slate-800 focus:outline-none shadow-xs ${
                      errors.organization ? 'border-red-500' : 'border-[#C9D9EC] focus:border-[#285B91]'
                    }`}
                  />
                  {errors.organization && <p className="text-[11px] text-red-500 mt-1">{errors.organization}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0C1B30] mb-1">
                    Corporate Email Address <span className="text-[#B88E3E]">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="suresh@apexlogistics.sample.in"
                    className={`w-full px-3 py-2.5 rounded-lg bg-white border text-xs text-slate-800 focus:outline-none shadow-xs ${
                      errors.email ? 'border-red-500' : 'border-[#C9D9EC] focus:border-[#285B91]'
                    }`}
                  />
                  {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0C1B30] mb-1">
                    Contact Phone Number <span className="text-[#B88E3E]">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 94470 12890"
                    className={`w-full px-3 py-2.5 rounded-lg bg-white border text-xs text-slate-800 focus:outline-none shadow-xs ${
                      errors.phone ? 'border-red-500' : 'border-[#C9D9EC] focus:border-[#285B91]'
                    }`}
                  />
                  {errors.phone && <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div className="border-b border-[#C9D9EC]/60 pb-4 pt-2">
                <h3 className="text-lg font-extrabold text-[#0C1B30]">Project Scope & Specifications</h3>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0C1B30] mb-1">
                  Primary Service Required <span className="text-[#B88E3E]">*</span>
                </label>
                <select
                  value={formData.serviceRequired}
                  onChange={e => setFormData({ ...formData, serviceRequired: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg bg-white border border-[#C9D9EC] text-xs text-slate-800 focus:outline-none focus:border-[#285B91] shadow-xs"
                >
                  {SERVICES.map(serv => (
                    <option key={serv.id} value={serv.title}>
                      {serv.title} ({serv.category})
                    </option>
                  ))}
                  <option value="Custom Engineering Architecture">Custom Engineering Architecture (Multi-Service)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0C1B30] mb-1">
                  Project Description & Key Technical Requirements <span className="text-[#B88E3E]">*</span>
                </label>
                <textarea
                  rows={4}
                  value={formData.projectDescription}
                  onChange={e => setFormData({ ...formData, projectDescription: e.target.value })}
                  placeholder="Describe your current system bottleneck, desired platform capabilities, user scale, and any legacy data integrations..."
                  className={`w-full px-3 py-2.5 rounded-lg bg-white border text-xs text-slate-800 focus:outline-none shadow-xs ${
                    errors.projectDescription ? 'border-red-500' : 'border-[#C9D9EC] focus:border-[#285B91]'
                  }`}
                />
                {errors.projectDescription && <p className="text-[11px] text-red-500 mt-1">{errors.projectDescription}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0C1B30] mb-1">
                    Estimated Budget Bracket <span className="text-[#B88E3E]">*</span>
                  </label>
                  <select
                    value={formData.estimatedBudget}
                    onChange={e => setFormData({ ...formData, estimatedBudget: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg bg-white border border-[#C9D9EC] text-xs text-slate-800 focus:outline-none focus:border-[#285B91] shadow-xs"
                  >
                    <option value="$5,000 - $15,000">$5,000 – $15,000 (Early Proof of Concept)</option>
                    <option value="$15,000 - $30,000">$15,000 – $30,000 (Production Minimum Viable Product)</option>
                    <option value="$30,000 - $60,000">$30,000 – $60,000 (Enterprise Scale Solution)</option>
                    <option value="$60,000+">$60,000+ (Multi-Tenant Platform / Full Migration)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0C1B30] mb-1">
                    Expected Delivery Timeline <span className="text-[#B88E3E]">*</span>
                  </label>
                  <select
                    value={formData.expectedTimeline}
                    onChange={e => setFormData({ ...formData, expectedTimeline: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg bg-white border border-[#C9D9EC] text-xs text-slate-800 focus:outline-none focus:border-[#285B91] shadow-xs"
                  >
                    <option value="1-2 Months">1–2 Months (Accelerated MVP)</option>
                    <option value="2-3 Months">2–3 Months (Standard Enterprise Sprint)</option>
                    <option value="4-6 Months">4–6 Months (Complex Multi-Module Platform)</option>
                    <option value="Ongoing Retainer">Ongoing Architecture Retainer</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0C1B30] mb-1">
                  Additional Infrastructure / Security Requirements
                </label>
                <input
                  type="text"
                  value={formData.additionalRequirements}
                  onChange={e => setFormData({ ...formData, additionalRequirements: e.target.value })}
                  placeholder="e.g. Must run in private AWS VPC, SSO integration, HIPAA / GDPR compliance"
                  className="w-full px-3 py-2.5 rounded-lg bg-white border border-[#C9D9EC] text-xs text-slate-800 focus:outline-none focus:border-[#285B91] shadow-xs"
                />
              </div>

              {apiError && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                  {apiError}
                </div>
              )}

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-glossy-gold w-full py-3.5 px-4 rounded-xl text-[#071426] font-bold text-xs tracking-wide transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <Send className={`w-4 h-4 ${isSubmitting ? 'animate-spin' : ''}`} />
                  <span>{isSubmitting ? 'Submitting Technical Quote Request...' : 'Submit Technical Quotation Request'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
