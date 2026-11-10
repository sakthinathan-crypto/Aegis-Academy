import React from 'react';
import { useRouter } from '../context/RouterContext';
import { COMPANY_INFO } from '../data/companyData';
import { FileText, AlertCircle, ArrowLeft } from 'lucide-react';

export const TermsConditions: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <div className="min-h-screen bg-[#071426] text-slate-100 pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#D5AD63] hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return Home</span>
        </button>

        <header className="space-y-2 border-b border-slate-800 pb-6">
          <span className="text-xs uppercase tracking-widest text-[#D5AD63] font-semibold">
            Legal Terms & Conditions
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Terms of Service
          </h1>
          <p className="text-xs text-slate-400">
            Last Updated: 2026 · AEGIS ACADEMY
          </p>
        </header>

        <div className="space-y-8 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">1. Agreement to Terms</h2>
            <p>
              By accessing the website and digital portals of AEGIS ACADEMY ("AEGIS", "we", "our", or "us"), you agree to be bound by these Terms of Service. If you disagree with any part of these terms, please refrain from using our digital services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">2. Educational Program Enrollments</h2>
            <p>
              Submission of an enrollment application constitutes an expression of interest and request for academic admission. Final admission into practical cohorts remains subject to prerequisite validation, cohort availability, and successful academic coordination.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">3. Intellectual Property</h2>
            <p>
              All curriculum courseware, lab materials, technical documentation, and portal assets remain the exclusive intellectual property of AEGIS ACADEMY. Enrolled students and partners are granted personal, non-exclusive licenses to access courseware for educational purposes only.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">4. Technology Engagements & Solutions</h2>
            <p>
              Preliminary project specifications and scope inquiries generated via the portal are indicative technical estimates. Binding delivery timelines, service level commitments, and deliverables are finalized through formal service agreements executed with partner institutions and client organizations.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">5. Governing Law & Jurisdiction</h2>
            <p>
              These terms are governed in accordance with the laws of India. Any statutory disputes arising in connection with services shall be subject to the exclusive jurisdiction of the competent courts in Tamil Nadu, India.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
