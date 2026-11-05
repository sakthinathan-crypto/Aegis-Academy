import React from 'react';
import { useRouter } from '../../context/RouterContext';
import { BrandLogo } from './BrandLogo';
import { COMPANY_INFO } from '../../data/companyData';
import { ArrowUp, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate } = useRouter();

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#050E1B] border-t border-[#D5AD63]/15 text-slate-400 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-800/80">
          {/* Column 1: Brand & Identity */}
          <div className="lg:col-span-1 space-y-4">
            <button
              onClick={() => navigate('/')}
              className="text-left focus:outline-none"
              aria-label="Aegis Academy Home"
            >
              <BrandLogo size="md" />
            </button>
            <p className="text-xs text-slate-300 font-medium leading-relaxed">
              {COMPANY_INFO.fullForm}
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Empowering students, academic institutions, and growing businesses with applied technical education and modern software engineering.
            </p>
            <div className="pt-2">
              <span className="text-[11px] text-[#D5AD63] font-medium tracking-wide block">
                "{COMPANY_INFO.tagline}"
              </span>
            </div>
          </div>

          {/* Column 2: Explore */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => navigate('/about')} className="hover:text-[#D5AD63] transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/leadership')} className="hover:text-[#D5AD63] transition-colors">
                  Leadership
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/projects')} className="hover:text-[#D5AD63] transition-colors">
                  Featured Projects
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/events')} className="hover:text-[#D5AD63] transition-colors">
                  Events & Workshops
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/gallery')} className="hover:text-[#D5AD63] transition-colors">
                  Campus Gallery
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/insights')} className="hover:text-[#D5AD63] transition-colors">
                  Insights & Articles
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Education */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Aegis Education
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => navigate('/education')} className="hover:text-[#D5AD63] transition-colors">
                  Education Overview
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/education/schools')} className="hover:text-[#D5AD63] transition-colors">
                  School Programs (Ages 10–15)
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/education/colleges')} className="hover:text-[#D5AD63] transition-colors">
                  College Technical Bootcamps
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/education/professional')} className="hover:text-[#D5AD63] transition-colors">
                  Professional Development
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/programs/full-stack-web-development')} className="hover:text-[#D5AD63] transition-colors">
                  Full Stack Web Development
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/programs/generative-ai')} className="hover:text-[#D5AD63] transition-colors">
                  Applied Generative AI
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Technologies */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Aegis Technologies
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => navigate('/technologies')} className="hover:text-[#D5AD63] transition-colors">
                  Technologies Overview
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/services/web-development')} className="hover:text-[#D5AD63] transition-colors">
                  Web Development
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/services/app-development')} className="hover:text-[#D5AD63] transition-colors">
                  Mobile App Development
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/services/ai-solutions')} className="hover:text-[#D5AD63] transition-colors">
                  AI & Machine Learning
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/services/cloud-solutions')} className="hover:text-[#D5AD63] transition-colors">
                  Cloud Infrastructure
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/services/automation')} className="hover:text-[#D5AD63] transition-colors">
                  Business Automation
                </button>
              </li>
            </ul>
          </div>

          {/* Column 5: Connect */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Connect
            </h4>
            <ul className="space-y-2.5 text-xs mb-4">
              <li>
                <button onClick={() => navigate('/contact')} className="hover:text-[#D5AD63] transition-colors">
                  Contact Us
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/partnerships')} className="hover:text-[#D5AD63] transition-colors">
                  Institutional Partnerships
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/careers')} className="hover:text-[#D5AD63] transition-colors">
                  Careers & Fellowships
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/admin')} className="text-slate-400 hover:text-[#D5AD63] transition-colors">
                  Admin Management
                </button>
              </li>
            </ul>

            <div className="pt-2 flex flex-col gap-2 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-[11px]">
                <Mail className="w-3.5 h-3.5 text-[#D5AD63] shrink-0" />
                <span className="truncate">{COMPANY_INFO.contact.email}</span>
              </span>
              <span className="flex items-center gap-1.5 text-[11px]">
                <Phone className="w-3.5 h-3.5 text-[#D5AD63] shrink-0" />
                <span>{COMPANY_INFO.contact.phone}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Disclaimer Banner on Sample Data */}
        <div className="py-4 px-4 my-6 rounded-lg bg-[#0C1E36]/60 border border-slate-800 text-[11px] text-slate-400 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span>
            <strong className="text-slate-200">Corporate Demo Notice:</strong> Representative company profiles, statistics, partner listings, and contact coordinates on this portal are structured demonstration content designed for institutional preview.
          </span>
          <span className="text-[#D5AD63] shrink-0 font-medium">Aegis Academy Pvt. Ltd.</span>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 pt-2">
          <div>
            © {new Date().getFullYear()} Aegis Academy Pvt. Ltd. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate('/privacy-policy')}
              className="hover:text-slate-300 transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => navigate('/terms')}
              className="hover:text-slate-300 transition-colors"
            >
              Terms & Conditions
            </button>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-slate-300 hover:text-[#D5AD63] transition-colors py-1 px-2.5 rounded bg-slate-900 border border-slate-800 hover:border-[#D5AD63]/30"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
