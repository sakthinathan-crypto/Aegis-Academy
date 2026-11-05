import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/companyData';
import { StorageStore } from '../data/store';
import { validateContactForm } from '../utils/validation';
import { Mail, Phone, MapPin, MessageSquare, Clock, CheckCircle2, AlertCircle, Send, ArrowRight } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'General Inquiry',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateContactForm(formData);
    if (!result.isValid) {
      setErrors(result.errors);
      return;
    }

    setErrors({});
    const newId = `AEGIS-MSG-${Date.now().toString().slice(-5)}`;
    StorageStore.saveContactMessage({
      id: newId,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      category: formData.category as any,
      subject: formData.subject,
      message: formData.message,
      submittedAt: new Date().toISOString(),
      status: 'Unread'
    });

    setSubmissionId(newId);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F7F8FC] text-[#0C1B30] pt-24 pb-20">
      {/* Contact Hero */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-[#C9D9EC]/60 bg-gradient-to-b from-[#EAF1FA] to-[#F7F8FC]">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="glass-light-pill inline-block px-3.5 py-1.5 rounded-full text-xs uppercase tracking-widest text-[#285B91] font-bold border border-[#C9D9EC]">
            Get in Touch
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0C1B30] tracking-tight">
            Contact Aegis Academy
          </h1>
          <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Have questions about student enrollment, corporate training cohorts, enterprise software engineering, or institutional partnerships? Our advisory team is here to assist.
          </p>
        </div>
      </section>

      {/* Main Grid: Info + Form */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Coordinates & Channels */}
          <div className="lg:col-span-5 space-y-8">
            <div className="glass-light-card p-6 space-y-6 shadow-sm border-[#C9D9EC]">
              <h3 className="text-lg font-bold text-[#0C1B30] border-b border-[#C9D9EC]/60 pb-3">
                Corporate Headquarters
              </h3>

              <div className="space-y-5 text-xs text-slate-600">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#B88E3E] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[#0C1B30] font-bold">Physical Address</div>
                    <div className="text-slate-600 mt-0.5">{COMPANY_INFO.contact.address}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#B88E3E] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[#0C1B30] font-bold">Electronic Mail</div>
                    <div className="text-slate-600 mt-0.5">General: {COMPANY_INFO.contact.email}</div>
                    <div className="text-slate-600">Admissions: {COMPANY_INFO.contact.admissionsEmail}</div>
                    <div className="text-slate-600">Solutions: {COMPANY_INFO.contact.techEmail}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#B88E3E] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[#0C1B30] font-bold">Telephone Inquiries</div>
                    <div className="text-slate-600 mt-0.5">{COMPANY_INFO.contact.phone}</div>
                    <div className="text-slate-600">WhatsApp Desk: {COMPANY_INFO.contact.whatsapp}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#B88E3E] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[#0C1B30] font-bold">Operational Hours</div>
                    <div className="text-slate-600 mt-0.5">{COMPANY_INFO.contact.hours}</div>
                  </div>
                </div>
              </div>

              {/* WhatsApp Direct CTA */}
              <div className="pt-2">
                <a
                  href={`https://wa.me/${COMPANY_INFO.contact.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp Directly</span>
                </a>
              </div>
            </div>

            {/* Embedded Google Maps Placeholder */}
            <div className="rounded-2xl overflow-hidden border border-[#C9D9EC] glass-light-card">
              <div className="p-3 text-xs font-bold text-[#0C1B30] bg-[#EAF1FA] border-b border-[#C9D9EC] flex items-center justify-between">
                <span>Location Map Placeholder</span>
                <span className="text-[10px] text-slate-500 font-medium">Bengaluru Innovation Campus</span>
              </div>
              <div className="h-60 w-full bg-slate-100 relative">
                <iframe
                  title="Aegis Academy Location Map"
                  src={COMPANY_INFO.contact.googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Editable sample content disclaimer */}
            <p className="text-[11px] text-slate-500 italic">
              Notice: {COMPANY_INFO.contact.isSampleNotice}
            </p>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="glass-light-card p-8 rounded-2xl shadow-xl border-[#C9D9EC]">
              <h3 className="text-xl font-extrabold text-[#0C1B30] mb-2">
                Send Us a Direct Message
              </h3>
              <p className="text-xs text-slate-600 mb-6">
                Please complete the form below. Your message will be routed directly to the appropriate academic or technical team.
              </p>

              {submitted ? (
                <div className="p-8 rounded-xl bg-white/95 border border-emerald-500/40 text-center space-y-4 animate-in fade-in zoom-in-95 shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/15 text-emerald-600 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold text-[#0C1B30]">Thank You, {formData.name}!</h4>
                  <p className="text-xs text-slate-600 max-w-md mx-auto">
                    Your inquiry has been successfully recorded under reference ID <strong className="text-[#285B91] font-mono font-bold">{submissionId}</strong>. An Aegis Academy representative will contact you within 24 business hours.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          category: 'General Inquiry',
                          subject: '',
                          message: ''
                        });
                      }}
                      className="btn-glossy-gold px-5 py-2 text-xs font-bold text-[#071426] rounded-lg cursor-pointer"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#0C1B30] mb-1">
                      Inquiry Category <span className="text-[#B88E3E]">*</span>
                    </label>
                    <select
                      value={formData.category}
                      onChange={e => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg bg-white border border-[#C9D9EC] text-xs text-slate-800 focus:outline-none focus:border-[#285B91] shadow-xs"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Education Inquiry">Education & Student Program Enrollment</option>
                      <option value="Technology Services">Aegis Technologies & Software Solutions</option>
                      <option value="Partnership">Institutional or Corporate Partnership</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#0C1B30] mb-1">
                        Full Name <span className="text-[#B88E3E]">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Priya Narayanan"
                        className={`w-full px-3 py-2.5 rounded-lg bg-white border text-xs text-slate-800 focus:outline-none shadow-xs ${
                          errors.name ? 'border-red-500' : 'border-[#C9D9EC] focus:border-[#285B91]'
                        }`}
                      />
                      {errors.name && <p className="text-[11px] text-red-500 mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0C1B30] mb-1">
                        Email Address <span className="text-[#B88E3E]">*</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. priya@sample.in"
                        className={`w-full px-3 py-2.5 rounded-lg bg-white border text-xs text-slate-800 focus:outline-none shadow-xs ${
                          errors.email ? 'border-red-500' : 'border-[#C9D9EC] focus:border-[#285B91]'
                        }`}
                      />
                      {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#0C1B30] mb-1">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98450 12345"
                        className="w-full px-3 py-2.5 rounded-lg bg-white border border-[#C9D9EC] text-xs text-slate-800 focus:outline-none focus:border-[#285B91] shadow-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0C1B30] mb-1">
                        Subject <span className="text-[#B88E3E]">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={e => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="Inquiry regarding workshop cohorts"
                        className={`w-full px-3 py-2.5 rounded-lg bg-white border text-xs text-slate-800 focus:outline-none shadow-xs ${
                          errors.subject ? 'border-red-500' : 'border-[#C9D9EC] focus:border-[#285B91]'
                        }`}
                      />
                      {errors.subject && <p className="text-[11px] text-red-500 mt-1">{errors.subject}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0C1B30] mb-1">
                      Message <span className="text-[#B88E3E]">*</span>
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please provide context on your institution, requirement, or questions..."
                      className={`w-full px-3 py-2.5 rounded-lg bg-white border text-xs text-slate-800 focus:outline-none shadow-xs ${
                        errors.message ? 'border-red-500' : 'border-[#C9D9EC] focus:border-[#285B91]'
                      }`}
                    />
                    {errors.message && <p className="text-[11px] text-red-500 mt-1">{errors.message}</p>}
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="btn-glossy-gold w-full py-3 px-4 rounded-xl text-[#071426] font-bold text-xs tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Inquiries Directly</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
