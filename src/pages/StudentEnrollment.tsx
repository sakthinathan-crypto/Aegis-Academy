import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { PROGRAMS } from '../data/companyData';
import { StorageStore } from '../data/store';
import { validateEnrollmentForm, generateApplicationId } from '../utils/validation';
import {
  GraduationCap,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Send,
  Sparkles,
  Info
} from 'lucide-react';

export const StudentEnrollment: React.FC = () => {
  const { navigate } = useRouter();

  const [formData, setFormData] = useState({
    studentName: '',
    phone: '',
    whatsapp: '',
    email: '',
    institutionName: '',
    department: '',
    yearOfStudy: '3rd Year Undergraduate',
    district: '',
    selectedProgram: 'full-stack-web-development',
    learningMode: 'Hybrid',
    additionalInfo: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateEnrollmentForm(formData);
    if (!result.isValid) {
      setErrors(result.errors);
      return;
    }

    setErrors({});
    const newAppId = generateApplicationId('AEGIS-STU');
    StorageStore.saveEnrollment({
      id: newAppId,
      studentName: formData.studentName,
      phone: formData.phone,
      whatsapp: formData.whatsapp,
      email: formData.email,
      institutionName: formData.institutionName,
      department: formData.department,
      yearOfStudy: formData.yearOfStudy,
      district: formData.district,
      selectedProgram: formData.selectedProgram,
      learningMode: formData.learningMode,
      additionalInfo: formData.additionalInfo,
      submittedAt: new Date().toISOString(),
      status: 'Pending'
    });

    setApplicationId(newAppId);
    setSubmitted(true);
  };

  const selectedProgramObj = PROGRAMS.find(p => p.slug === formData.selectedProgram);

  return (
    <div className="min-h-screen bg-[#F7F8FC] text-[#0C1B30] pt-24 pb-20">
      {/* 1. HERO */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-[#C9D9EC]/60 bg-gradient-to-b from-[#EAF1FA] to-[#F7F8FC]">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="glass-light-pill inline-block px-3.5 py-1.5 rounded-full text-xs uppercase tracking-widest text-[#285B91] font-bold border border-[#C9D9EC]">
            Admissions & Cohort Registration
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0C1B30] tracking-tight">
            Student Application & Enrollment Portal
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Take the definitive leap towards modern technical mastery. Complete the enrollment form below to reserve your cohort seat.
          </p>
        </div>
      </section>

      {/* 2. ENROLLMENT CONTAINER */}
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
                  Registration Successful
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0C1B30]">
                  Welcome, {formData.studentName}!
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                  Your enrollment application has been recorded in the Aegis admissions ledger.
                </p>
              </div>

              <div className="max-w-md mx-auto p-6 rounded-xl bg-white/95 border border-[#C9D9EC] text-left space-y-3 text-xs shadow-sm">
                <div className="flex justify-between border-b border-[#C9D9EC]/60 pb-2">
                  <span className="text-slate-500 font-medium">Application Reference ID:</span>
                  <span className="font-mono font-bold text-[#285B91]">{applicationId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Student Name:</span>
                  <span className="text-[#0C1B30] font-bold">{formData.studentName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Selected Program:</span>
                  <span className="text-[#0C1B30] font-bold">{selectedProgramObj?.title || formData.selectedProgram}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Learning Format:</span>
                  <span className="text-[#0C1B30] font-bold">{formData.learningMode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Institution:</span>
                  <span className="text-[#0C1B30] font-bold truncate max-w-[200px]">{formData.institutionName}</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => navigate('/admin')}
                  className="btn-glossy-blue px-6 py-2.5 text-xs font-bold text-white rounded-xl shadow-md cursor-pointer"
                >
                  Verify in Admin Management Console
                </button>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      studentName: '',
                      phone: '',
                      whatsapp: '',
                      email: '',
                      institutionName: '',
                      department: '',
                      yearOfStudy: '3rd Year Undergraduate',
                      district: '',
                      selectedProgram: 'full-stack-web-development',
                      learningMode: 'Hybrid',
                      additionalInfo: ''
                    });
                  }}
                  className="btn-glossy-gold px-6 py-2.5 text-xs font-bold text-[#071426] rounded-xl cursor-pointer"
                >
                  Submit Another Application
                </button>
              </div>
            </div>
          ) : (
            /* Enrollment Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border-b border-[#C9D9EC]/60 pb-4">
                <h3 className="text-lg font-extrabold text-[#0C1B30]">Student Personal Details</h3>
                <p className="text-xs text-slate-500 mt-0.5">Please provide accurate contact coordinates for cohort communications.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0C1B30] mb-1">
                    Full Student Name <span className="text-[#B88E3E]">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.studentName}
                    onChange={e => setFormData({ ...formData, studentName: e.target.value })}
                    placeholder="e.g. Priya Narayanan"
                    className={`w-full px-3 py-2.5 rounded-lg bg-white border text-xs text-slate-800 focus:outline-none shadow-xs ${
                      errors.studentName ? 'border-red-500' : 'border-[#C9D9EC] focus:border-[#285B91]'
                    }`}
                  />
                  {errors.studentName && <p className="text-[11px] text-red-500 mt-1">{errors.studentName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0C1B30] mb-1">
                    Email Address <span className="text-[#B88E3E]">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. priya@university.sample.in"
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
                    Phone Number <span className="text-[#B88E3E]">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. +91 98450 12345"
                    className={`w-full px-3 py-2.5 rounded-lg bg-white border text-xs text-slate-800 focus:outline-none shadow-xs ${
                      errors.phone ? 'border-red-500' : 'border-[#C9D9EC] focus:border-[#285B91]'
                    }`}
                  />
                  {errors.phone && <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0C1B30] mb-1">
                    WhatsApp Number <span className="text-[#B88E3E]">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.whatsapp}
                    onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
                    placeholder="e.g. +91 98450 12345"
                    className={`w-full px-3 py-2.5 rounded-lg bg-white border text-xs text-slate-800 focus:outline-none shadow-xs ${
                      errors.whatsapp ? 'border-red-500' : 'border-[#C9D9EC] focus:border-[#285B91]'
                    }`}
                  />
                  {errors.whatsapp && <p className="text-[11px] text-red-500 mt-1">{errors.whatsapp}</p>}
                </div>
              </div>

              <div className="border-b border-[#C9D9EC]/60 pb-4 pt-2">
                <h3 className="text-lg font-extrabold text-[#0C1B30]">Academic Affiliation</h3>
                <p className="text-xs text-slate-500 mt-0.5">Your current school, college, or university details.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0C1B30] mb-1">
                    School / College Name <span className="text-[#B88E3E]">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.institutionName}
                    onChange={e => setFormData({ ...formData, institutionName: e.target.value })}
                    placeholder="e.g. National Institute of Technology"
                    className={`w-full px-3 py-2.5 rounded-lg bg-white border text-xs text-slate-800 focus:outline-none shadow-xs ${
                      errors.institutionName ? 'border-red-500' : 'border-[#C9D9EC] focus:border-[#285B91]'
                    }`}
                  />
                  {errors.institutionName && <p className="text-[11px] text-red-500 mt-1">{errors.institutionName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0C1B30] mb-1">
                    Department / Stream <span className="text-[#B88E3E]">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={e => setFormData({ ...formData, department: e.target.value })}
                    placeholder="e.g. Computer Science / Grade 9"
                    className={`w-full px-3 py-2.5 rounded-lg bg-white border text-xs text-slate-800 focus:outline-none shadow-xs ${
                      errors.department ? 'border-red-500' : 'border-[#C9D9EC] focus:border-[#285B91]'
                    }`}
                  />
                  {errors.department && <p className="text-[11px] text-red-500 mt-1">{errors.department}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0C1B30] mb-1">
                    Current Year / Grade <span className="text-[#B88E3E]">*</span>
                  </label>
                  <select
                    value={formData.yearOfStudy}
                    onChange={e => setFormData({ ...formData, yearOfStudy: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg bg-white border border-[#C9D9EC] text-xs text-slate-800 focus:outline-none focus:border-[#285B91] shadow-xs"
                  >
                    <option value="School Grade 5 - 8">School Grade 5 – 8</option>
                    <option value="School Grade 9 - 10">School Grade 9 – 10</option>
                    <option value="1st Year Undergraduate">1st Year Undergraduate</option>
                    <option value="2nd Year Undergraduate">2nd Year Undergraduate</option>
                    <option value="3rd Year Undergraduate">3rd Year Undergraduate</option>
                    <option value="Final Year Undergraduate">Final Year Undergraduate</option>
                    <option value="Postgraduate / Master's">Postgraduate / Master's</option>
                    <option value="Working Professional">Working Professional</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0C1B30] mb-1">
                    District / City <span className="text-[#B88E3E]">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.district}
                    onChange={e => setFormData({ ...formData, district: e.target.value })}
                    placeholder="e.g. Bengaluru Urban / Pune"
                    className={`w-full px-3 py-2.5 rounded-lg bg-white border text-xs text-slate-800 focus:outline-none shadow-xs ${
                      errors.district ? 'border-red-500' : 'border-[#C9D9EC] focus:border-[#285B91]'
                    }`}
                  />
                  {errors.district && <p className="text-[11px] text-red-500 mt-1">{errors.district}</p>}
                </div>
              </div>

              <div className="border-b border-[#C9D9EC]/60 pb-4 pt-2">
                <h3 className="text-lg font-extrabold text-[#0C1B30]">Program Preferences</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0C1B30] mb-1">
                    Selected Program <span className="text-[#B88E3E]">*</span>
                  </label>
                  <select
                    value={formData.selectedProgram}
                    onChange={e => setFormData({ ...formData, selectedProgram: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg bg-white border border-[#C9D9EC] text-xs text-slate-800 focus:outline-none focus:border-[#285B91] shadow-xs"
                  >
                    {PROGRAMS.map(prog => (
                      <option key={prog.id} value={prog.slug}>
                        {prog.title} ({prog.duration})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0C1B30] mb-1">
                    Preferred Learning Mode <span className="text-[#B88E3E]">*</span>
                  </label>
                  <select
                    value={formData.learningMode}
                    onChange={e => setFormData({ ...formData, learningMode: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg bg-white border border-[#C9D9EC] text-xs text-slate-800 focus:outline-none focus:border-[#285B91] shadow-xs"
                  >
                    <option value="Hybrid">Hybrid (Classroom Labs + Online Mentorship)</option>
                    <option value="In-Person">In-Person (On-Campus Laboratory)</option>
                    <option value="Virtual Live">Virtual Live (Interactive Remote Studio)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0C1B30] mb-1">
                  Additional Information or Learning Goals
                </label>
                <textarea
                  rows={3}
                  value={formData.additionalInfo}
                  onChange={e => setFormData({ ...formData, additionalInfo: e.target.value })}
                  placeholder="Tell us about your technical aspirations, past coding experience, or placement targets..."
                  className="w-full px-3 py-2.5 rounded-lg bg-white border border-[#C9D9EC] text-xs text-slate-800 focus:outline-none focus:border-[#285B91] shadow-xs"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="btn-glossy-gold w-full py-3.5 px-4 rounded-xl text-[#071426] font-bold text-xs tracking-wide transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Enrollment Application</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
