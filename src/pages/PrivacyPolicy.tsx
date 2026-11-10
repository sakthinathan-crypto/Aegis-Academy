import React from 'react';
import { useRouter } from '../context/RouterContext';
import { COMPANY_INFO } from '../data/companyData';
import { Shield, AlertCircle, ArrowLeft } from 'lucide-react';

export const PrivacyPolicy: React.FC = () => {
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
            Corporate Governance
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-400">
            Last Updated: 2026 · AEGIS ACADEMY
          </p>
        </header>

        <div className="space-y-8 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">1. Introduction</h2>
            <p>
              AEGIS ACADEMY ("AEGIS", "we", "our", or "us") respects your personal privacy and is committed to protecting the confidential information you share with us through our web platform, student portals, and institutional consultation channels.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">2. Information We Collect</h2>
            <p>We may collect information you directly provide when registering for educational programs, requesting technology quotations, or contacting our administration:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-400">
              <li>Student identity data: Full name, academic email, phone number, institutional affiliation.</li>
              <li>Academic data: Current year of study, degree stream, learning preferences.</li>
              <li>Enterprise data: Company name, corporate email, technical scope requirements, budget brackets.</li>
              <li>Device telemetry: Standard HTTP headers, browser user agent, IP address for security logging.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">3. How Information Is Used</h2>
            <p>We use collected data solely to:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-400">
              <li>Process student cohort applications and issue curriculum materials.</li>
              <li>Formulate engineering quotations and schedule technical discovery meetings.</li>
              <li>Provide verified academic certificates and capstone evaluation reports.</li>
              <li>Maintain portal operational integrity, security auditing, and fraud prevention.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">4. Data Retention & Zero Public Training Policy</h2>
            <p>
              AEGIS ACADEMY enforces strict zero-data-sharing policies. Client proprietary source code, student submissions, and private organizational documentation are never shared with third-party advertisers nor used to train public commercial AI foundation models.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">5. Contact for Privacy Inquiries</h2>
            <p>
              For questions regarding personal data access, correction, or deletion requests, please contact our Data Governance Officer at <span className="text-[#D5AD63] font-mono">{COMPANY_INFO.contact.email}</span>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
