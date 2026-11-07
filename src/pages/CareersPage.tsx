import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { CAREER_OPENINGS } from '../data/companyData';
import { JobPosting } from '../types';
import {
  Briefcase,
  MapPin,
  Clock,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Heart,
  Send,
  X,
  Building
} from 'lucide-react';

import { careerService, fileToBase64 } from '../services/careerService';

export const CareersPage: React.FC = () => {
  const { navigate } = useRouter();
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
  const [appSubmitted, setAppSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [applicationId, setApplicationId] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [appForm, setAppForm] = useState({
    candidateName: '',
    email: '',
    phone: '',
    experienceYears: '2',
    linkedInOrPortfolio: '',
    coverNote: ''
  });

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);

    if (!selectedJob) return;

    setIsSubmitting(true);
    try {
      let filePayload: { name: string; type: string; size: number; base64: string } | undefined;
      if (resumeFile) {
        filePayload = await fileToBase64(resumeFile);
      }

      const res = await careerService.submitApplication({
        fullName: appForm.candidateName,
        email: appForm.email,
        phone: appForm.phone,
        roleApplied: selectedJob.title,
        department: selectedJob.department,
        experienceYears: appForm.experienceYears,
        linkedinUrl: appForm.linkedInOrPortfolio,
        portfolioUrl: appForm.linkedInOrPortfolio,
        coverNote: appForm.coverNote,
        resumeFile: filePayload
      });

      if (res.success && (res.applicationId || res.data?.applicationId)) {
        setApplicationId(res.applicationId || res.data?.applicationId);
        setAppSubmitted(true);
      } else {
        setApiError(res.error || 'Failed to submit application. Please try again.');
      }
    } catch (err: any) {
      setApiError(err.message || 'An error occurred while uploading your resume.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#071426] text-slate-100 pt-24 pb-20">
      {/* 1. HERO */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800 bg-gradient-to-b from-[#09182E] to-[#071426]">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#D5AD63] font-semibold">
            Join Our Mission
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Careers & Technical Fellowships
          </h1>
          <p className="text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Build the next generation of engineers. Work alongside visionary educators and senior architects pushing the boundaries of applied technology.
          </p>
        </div>
      </section>

      {/* 2. CULTURE & VALUES */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-[#D5AD63] font-semibold">
            Workplace Ethos
          </span>
          <h2 className="text-3xl font-bold text-white tracking-tight mt-1">
            Life at Aegis Academy
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-[#0C1E36] border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#D5AD63]/10 flex items-center justify-center text-[#D5AD63]">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Dual Practice Exposure</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Our engineers split time between training high-caliber cohorts and architecting real enterprise production client projects.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[#0C1E36] border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Continuous Growth & Research</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              We allocate dedicated weekly research hours and cloud computing credits for self-directed AI experimentation and paper publications.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[#0C1E36] border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <Building className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">High Institutional Impact</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Directly transform thousands of student lives by equipping them with industry-grade engineering skills and placement offers.
            </p>
          </div>
        </div>
      </section>

      {/* 3. OPEN POSITIONS */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#09182E] border-t border-slate-800">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#D5AD63] font-semibold">
                Current Opportunities
              </span>
              <h2 className="text-3xl font-bold text-white tracking-tight mt-1">
                Open Positions
              </h2>
            </div>
            <span className="text-xs text-slate-400">
              Representative Openings (Demo Listings)
            </span>
          </div>

          <div className="space-y-6">
            {CAREER_OPENINGS.map(job => (
              <div
                key={job.id}
                className="p-8 rounded-2xl bg-[#071426] border border-slate-800 hover:border-[#D5AD63]/30 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                <div className="space-y-3 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#D5AD63] bg-[#0C1E36] px-2.5 py-1 rounded border border-[#D5AD63]/25">
                      {job.department}
                    </span>
                    <span className="text-xs text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                      {job.type}
                    </span>
                    <span className="text-xs text-slate-400">
                      Experience: {job.experience}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white">{job.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{job.overview}</p>

                  <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#D5AD63]" />
                    <span>{job.location}</span>
                  </div>
                </div>

                <div className="shrink-0">
                  <button
                    onClick={() => {
                      setSelectedJob(job);
                      setAppSubmitted(false);
                    }}
                    className="w-full sm:w-auto px-6 py-3 text-xs font-semibold bg-[#D5AD63] text-[#071426] hover:bg-[#E8CA8C] rounded-xl transition-all shadow-md shadow-[#D5AD63]/25 flex items-center justify-center gap-2"
                  >
                    <span>Apply for Role</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. APPLICATION MODAL */}
      {selectedJob && (
        <div
          className="fixed inset-0 z-50 bg-[#071426]/90 backdrop-blur-md p-4 sm:p-8 flex items-center justify-center animate-in fade-in duration-200"
          onClick={() => setSelectedJob(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-[#0C1E36] border border-[#D5AD63]/30 rounded-2xl p-8 shadow-2xl overflow-y-auto max-h-[90vh]"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedJob(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            {appSubmitted ? (
              <div className="text-center space-y-4 py-8">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Application Received!</h3>
                <div className="inline-block px-3.5 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs font-mono text-[#D5AD63]">
                  Reference ID: {applicationId || 'AEG-JOB-PENDING'}
                </div>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  Thank you for applying for <strong className="text-white">{selectedJob.title}</strong>. Your resume has been uploaded to our Google Drive repository and our talent acquisition team will review your credentials.
                </p>
                <button
                  onClick={() => {
                    setSelectedJob(null);
                    setAppSubmitted(false);
                    setResumeFile(null);
                  }}
                  className="px-6 py-2 text-xs font-semibold bg-[#D5AD63] text-[#071426] hover:bg-[#E8CA8C] rounded-lg transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleApply} className="space-y-4">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#D5AD63] font-semibold">{selectedJob.department}</span>
                  <h3 className="text-xl font-bold text-white mt-0.5">{selectedJob.title}</h3>
                  <div className="text-xs text-slate-400 mt-1">{selectedJob.location} · {selectedJob.type}</div>
                </div>

                <div className="border-t border-slate-800 pt-4 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={appForm.candidateName}
                      onChange={e => setAppForm({ ...appForm, candidateName: e.target.value })}
                      placeholder="e.g. Vikramaditya S."
                      className="w-full px-3 py-2 rounded-lg bg-[#071426] border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-[#D5AD63]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={appForm.email}
                        onChange={e => setAppForm({ ...appForm, email: e.target.value })}
                        placeholder="vikram@sample.in"
                        className="w-full px-3 py-2 rounded-lg bg-[#071426] border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-[#D5AD63]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1">Phone Number *</label>
                      <input
                        type="text"
                        required
                        value={appForm.phone}
                        onChange={e => setAppForm({ ...appForm, phone: e.target.value })}
                        placeholder="+91 98450 12345"
                        className="w-full px-3 py-2 rounded-lg bg-[#071426] border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-[#D5AD63]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1">Relevant Experience</label>
                      <select
                        value={appForm.experienceYears}
                        onChange={e => setAppForm({ ...appForm, experienceYears: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-[#071426] border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-[#D5AD63]"
                      >
                        <option value="0-1">0–1 Years (Entry Level / Fresh Graduate)</option>
                        <option value="1-3">1–3 Years (Junior Engineer / Instructor)</option>
                        <option value="3-5">3–5 Years (Mid-level Practitioner)</option>
                        <option value="5+">5+ Years (Senior Architect / Lead)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1">LinkedIn or GitHub Profile URL *</label>
                      <input
                        type="url"
                        required
                        value={appForm.linkedInOrPortfolio}
                        onChange={e => setAppForm({ ...appForm, linkedInOrPortfolio: e.target.value })}
                        placeholder="https://linkedin.com/in/... or github.com/..."
                        className="w-full px-3 py-2 rounded-lg bg-[#071426] border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-[#D5AD63]"
                      />
                    </div>
                  </div>

                  {/* Resume File Upload to Google Drive */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1">
                      Upload Resume / Curriculum Vitae (PDF or DOCX, max 5MB)
                    </label>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      onChange={e => {
                        const file = e.target.files?.[0] || null;
                        if (file && file.size > 5 * 1024 * 1024) {
                          setApiError('File is too large. Please upload a resume under 5MB.');
                          e.target.value = '';
                          return;
                        }
                        setResumeFile(file);
                        setApiError(null);
                      }}
                      className="w-full px-3 py-2 rounded-lg bg-[#071426] border border-slate-700 text-xs text-slate-300 file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-[#D5AD63] file:text-[#071426] hover:file:bg-[#E8CA8C] cursor-pointer"
                    />
                    {resumeFile && (
                      <p className="text-[11px] text-emerald-400 mt-1">
                        Selected: {resumeFile.name} ({(resumeFile.size / 1024).toFixed(0)} KB)
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1">Brief Introduction & Why Aegis?</label>
                    <textarea
                      rows={3}
                      value={appForm.coverNote}
                      onChange={e => setAppForm({ ...appForm, coverNote: e.target.value })}
                      placeholder="Tell us about your background, favorite projects, and what excites you about this role..."
                      className="w-full px-3 py-2 rounded-lg bg-[#071426] border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-[#D5AD63]"
                    />
                  </div>

                  {apiError && (
                    <div className="p-3 rounded-lg bg-rose-500/20 border border-rose-500/50 text-rose-300 text-xs">
                      {apiError}
                    </div>
                  )}

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 rounded-xl bg-[#D5AD63] text-[#071426] hover:bg-[#E8CA8C] font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <Send className={`w-4 h-4 ${isSubmitting ? 'animate-spin' : ''}`} />
                      <span>{isSubmitting ? 'Uploading Resume to Drive & Submitting...' : 'Submit Candidacy'}</span>
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
