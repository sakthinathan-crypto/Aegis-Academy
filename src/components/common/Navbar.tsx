import React, { useState, useEffect } from 'react';
import { useRouter } from '../../context/RouterContext';
import { BrandLogo } from './BrandLogo';
import { ChevronDown, Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentPath, navigate } = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [currentPath]);

  const toggleMobileGroup = (key: string) => {
    setMobileExpanded(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const isCurrent = (path: string) => {
    if (path === '/') return currentPath === '/';
    return currentPath.startsWith(path);
  };

  return (
    <header className="fixed top-2 sm:top-4 inset-x-0 z-50 flex justify-center px-3 sm:px-6 pointer-events-none select-none">
      {/* Horizontal Floating Glass Pill Navbar (Reference 2) */}
      <div
        className={`pointer-events-auto max-w-7xl w-full rounded-2xl sm:rounded-full px-4 sm:px-6 py-2.5 sm:py-3 transition-all duration-300 flex items-center justify-between gap-4 border shadow-2xl backdrop-blur-2xl ${
          scrolled
            ? 'bg-[#0C1B30]/92 border-white/25 shadow-black/70'
            : 'bg-[#0C1B30]/80 border-white/20 shadow-black/50'
        }`}
        style={{
          boxShadow: '0 16px 40px -8px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.25)',
        }}
      >
        {/* LEFT: Aegis Academy Brand Logo */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D5AD63] rounded-lg cursor-pointer shrink-0"
          aria-label="Aegis Academy Home"
        >
          <BrandLogo size="md" theme="dark" />
        </button>

        {/* CENTRE: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-7 text-sm font-medium text-slate-200">
          <button
            onClick={() => navigate('/')}
            className={`hover:text-[#D5AD63] transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer ${
              currentPath === '/' ? 'text-[#D5AD63] font-semibold' : ''
            }`}
          >
            Home
          </button>

          {/* Education Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown('education')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              onClick={() => navigate('/education')}
              className={`flex items-center gap-1 hover:text-[#D5AD63] transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer ${
                currentPath.startsWith('/education') || currentPath.startsWith('/programs')
                  ? 'text-[#D5AD63] font-semibold'
                  : ''
              }`}
            >
              Education
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {activeDropdown === 'education' && (
              <div className="absolute top-full left-0 w-64 pt-3 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="glass-dark-card border border-white/25 bg-[#0C1B30]/95 backdrop-blur-2xl rounded-2xl p-2.5 shadow-2xl shadow-black/80">
                  <button
                    onClick={() => navigate('/education')}
                    className="w-full text-left px-3 py-2 text-xs rounded-xl font-semibold text-white hover:bg-white/10 hover:text-[#D5AD63] transition-colors cursor-pointer"
                  >
                    Education Division Overview
                  </button>
                  <div className="my-1 border-t border-white/10" />
                  <button
                    onClick={() => navigate('/education/schools')}
                    className="w-full text-left px-3 py-1.5 text-xs rounded-lg text-slate-300 hover:bg-white/10 hover:text-[#D5AD63] transition-colors cursor-pointer"
                  >
                    School Programs (Ages 10–15)
                  </button>
                  <button
                    onClick={() => navigate('/education/colleges')}
                    className="w-full text-left px-3 py-1.5 text-xs rounded-lg text-slate-300 hover:bg-white/10 hover:text-[#D5AD63] transition-colors cursor-pointer"
                  >
                    College Technical Bootcamps
                  </button>
                  <button
                    onClick={() => navigate('/education/professional')}
                    className="w-full text-left px-3 py-1.5 text-xs rounded-lg text-slate-300 hover:bg-white/10 hover:text-[#D5AD63] transition-colors cursor-pointer"
                  >
                    Professional Upskilling
                  </button>
                  <button
                    onClick={() => navigate('/programs/full-stack-web-development')}
                    className="w-full text-left px-3 py-1.5 text-xs rounded-lg text-[#D5AD63] hover:bg-white/10 transition-colors font-medium flex items-center justify-between cursor-pointer"
                  >
                    <span>Explore All Programs</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Technologies Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown('tech')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              onClick={() => navigate('/technologies')}
              className={`flex items-center gap-1 hover:text-[#D5AD63] transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer ${
                currentPath.startsWith('/technologies') || currentPath.startsWith('/services')
                  ? 'text-[#D5AD63] font-semibold'
                  : ''
              }`}
            >
              Technologies
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {activeDropdown === 'tech' && (
              <div className="absolute top-full left-0 w-64 pt-3 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="glass-dark-card border border-white/25 bg-[#0C1B30]/95 backdrop-blur-2xl rounded-2xl p-2.5 shadow-2xl shadow-black/80">
                  <button
                    onClick={() => navigate('/technologies')}
                    className="w-full text-left px-3 py-2 text-xs rounded-xl font-semibold text-white hover:bg-white/10 hover:text-[#D5AD63] transition-colors cursor-pointer"
                  >
                    Technologies Division Overview
                  </button>
                  <button
                    onClick={() => navigate('/services')}
                    className="w-full text-left px-3 py-1.5 text-xs rounded-lg font-medium text-slate-300 hover:bg-white/10 hover:text-[#D5AD63] transition-colors cursor-pointer"
                  >
                    All Services Directory
                  </button>
                  <div className="my-1 border-t border-white/10" />
                  <button
                    onClick={() => navigate('/services/web-development')}
                    className="w-full text-left px-3 py-1.5 text-xs rounded-lg text-slate-300 hover:bg-white/10 hover:text-[#D5AD63] transition-colors cursor-pointer"
                  >
                    Web Applications
                  </button>
                  <button
                    onClick={() => navigate('/services/app-development')}
                    className="w-full text-left px-3 py-1.5 text-xs rounded-lg text-slate-300 hover:bg-white/10 hover:text-[#D5AD63] transition-colors cursor-pointer"
                  >
                    Mobile Apps
                  </button>
                  <button
                    onClick={() => navigate('/services/ai-solutions')}
                    className="w-full text-left px-3 py-1.5 text-xs rounded-lg text-slate-300 hover:bg-white/10 hover:text-[#D5AD63] transition-colors cursor-pointer"
                  >
                    AI & Machine Learning
                  </button>
                  <button
                    onClick={() => navigate('/services/cloud-solutions')}
                    className="w-full text-left px-3 py-1.5 text-xs rounded-lg text-slate-300 hover:bg-white/10 hover:text-[#D5AD63] transition-colors cursor-pointer"
                  >
                    Cloud & DevOps
                  </button>
                  <button
                    onClick={() => navigate('/services/automation')}
                    className="w-full text-left px-3 py-1.5 text-xs rounded-lg text-slate-300 hover:bg-white/10 hover:text-[#D5AD63] transition-colors cursor-pointer"
                  >
                    Business Automation
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* About Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown('about')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              onClick={() => navigate('/about')}
              className={`flex items-center gap-1 hover:text-[#D5AD63] transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer ${
                currentPath.startsWith('/about') || currentPath === '/leadership' || currentPath === '/partnerships'
                  ? 'text-[#D5AD63] font-semibold'
                  : ''
              }`}
            >
              About
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {activeDropdown === 'about' && (
              <div className="absolute top-full left-0 w-52 pt-3 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="glass-dark-card border border-white/25 bg-[#0C1B30]/95 backdrop-blur-2xl rounded-2xl p-2.5 shadow-2xl shadow-black/80">
                  <button
                    onClick={() => navigate('/about')}
                    className="w-full text-left px-3 py-2 text-xs rounded-lg text-white hover:bg-white/10 hover:text-[#D5AD63] transition-colors cursor-pointer"
                  >
                    About Aegis Academy
                  </button>
                  <button
                    onClick={() => navigate('/leadership')}
                    className="w-full text-left px-3 py-2 text-xs rounded-lg text-white hover:bg-white/10 hover:text-[#D5AD63] transition-colors cursor-pointer"
                  >
                    Leadership Team
                  </button>
                  <button
                    onClick={() => navigate('/partnerships')}
                    className="w-full text-left px-3 py-2 text-xs rounded-lg text-white hover:bg-white/10 hover:text-[#D5AD63] transition-colors cursor-pointer"
                  >
                    Institutional Alliances
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => navigate('/projects')}
            className={`hover:text-[#D5AD63] transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer ${
              isCurrent('/projects') ? 'text-[#D5AD63] font-semibold' : ''
            }`}
          >
            Projects
          </button>

          <button
            onClick={() => navigate('/events')}
            className={`hover:text-[#D5AD63] transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer ${
              isCurrent('/events') ? 'text-[#D5AD63] font-semibold' : ''
            }`}
          >
            Events
          </button>

          <button
            onClick={() => navigate('/insights')}
            className={`hover:text-[#D5AD63] transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer ${
              isCurrent('/insights') ? 'text-[#D5AD63] font-semibold' : ''
            }`}
          >
            Insights
          </button>

          <button
            onClick={() => navigate('/contact')}
            className={`hover:text-[#D5AD63] transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer ${
              isCurrent('/contact') ? 'text-[#D5AD63] font-semibold' : ''
            }`}
          >
            Contact
          </button>
        </nav>

        {/* RIGHT: Admin Portal & Get Started CTA */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <button
            onClick={() => navigate('/admin')}
            className="text-xs text-slate-300 hover:text-white transition-colors px-2 py-1 rounded cursor-pointer font-medium"
            title="Aegis Admin Management Portal"
          >
            Admin Portal
          </button>

          <button
            onClick={() => navigate('/enroll')}
            className="btn-glossy-gold px-5 py-2 text-xs font-bold tracking-wide text-[#071426] rounded-full whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer shadow-lg hover:shadow-xl transition-all"
          >
            <span>Get Started</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => navigate('/enroll')}
            className="px-3.5 py-1.5 text-xs font-bold text-[#071426] bg-[#D5AD63] rounded-full cursor-pointer shadow-sm"
          >
            Enroll
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-200 hover:text-white rounded-lg focus:outline-none cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-in Drawer */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto lg:hidden fixed inset-x-3 top-[76px] bottom-6 bg-[#0C1B30]/98 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 overflow-y-auto shadow-2xl z-50">
          <div className="flex flex-col gap-2">
            <button
              onClick={() => navigate('/')}
              className="w-full text-left py-2.5 px-3 text-base font-medium text-white hover:bg-white/10 rounded-xl cursor-pointer"
            >
              Home
            </button>

            {/* Mobile Education */}
            <div>
              <button
                onClick={() => toggleMobileGroup('education')}
                className="w-full flex items-center justify-between py-2.5 px-3 text-base font-medium text-white hover:bg-white/10 rounded-xl cursor-pointer"
              >
                <span>Education Division</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded.education ? 'rotate-180' : ''}`} />
              </button>
              {mobileExpanded.education && (
                <div className="pl-6 py-1 flex flex-col gap-1 border-l border-[#D5AD63]/30 ml-3 mt-1">
                  <button onClick={() => navigate('/education')} className="text-left py-1.5 text-sm text-slate-300 hover:text-[#D5AD63]">Education Overview</button>
                  <button onClick={() => navigate('/education/schools')} className="text-left py-1.5 text-sm text-slate-300 hover:text-[#D5AD63]">School Programs</button>
                  <button onClick={() => navigate('/education/colleges')} className="text-left py-1.5 text-sm text-slate-300 hover:text-[#D5AD63]">College Programs</button>
                  <button onClick={() => navigate('/education/professional')} className="text-left py-1.5 text-sm text-slate-300 hover:text-[#D5AD63]">Professional Development</button>
                  <button onClick={() => navigate('/programs/full-stack-web-development')} className="text-left py-1.5 text-sm text-[#D5AD63] font-medium">Explore All Programs</button>
                </div>
              )}
            </div>

            {/* Mobile Technologies */}
            <div>
              <button
                onClick={() => toggleMobileGroup('tech')}
                className="w-full flex items-center justify-between py-2.5 px-3 text-base font-medium text-white hover:bg-white/10 rounded-xl cursor-pointer"
              >
                <span>Technologies Division</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded.tech ? 'rotate-180' : ''}`} />
              </button>
              {mobileExpanded.tech && (
                <div className="pl-6 py-1 flex flex-col gap-1 border-l border-[#D5AD63]/30 ml-3 mt-1">
                  <button onClick={() => navigate('/technologies')} className="text-left py-1.5 text-sm text-slate-300 hover:text-[#D5AD63]">Technologies Overview</button>
                  <button onClick={() => navigate('/services')} className="text-left py-1.5 text-sm text-slate-300 hover:text-[#D5AD63]">All Services</button>
                  <button onClick={() => navigate('/services/web-development')} className="text-left py-1.5 text-sm text-slate-300 hover:text-[#D5AD63]">Web Development</button>
                  <button onClick={() => navigate('/services/app-development')} className="text-left py-1.5 text-sm text-slate-300 hover:text-[#D5AD63]">App Development</button>
                  <button onClick={() => navigate('/services/ai-solutions')} className="text-left py-1.5 text-sm text-slate-300 hover:text-[#D5AD63]">AI & Machine Learning</button>
                  <button onClick={() => navigate('/services/cloud-solutions')} className="text-left py-1.5 text-sm text-slate-300 hover:text-[#D5AD63]">Cloud Solutions</button>
                </div>
              )}
            </div>

            {/* Mobile About */}
            <div>
              <button
                onClick={() => toggleMobileGroup('about')}
                className="w-full flex items-center justify-between py-2.5 px-3 text-base font-medium text-white hover:bg-white/10 rounded-xl cursor-pointer"
              >
                <span>About</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded.about ? 'rotate-180' : ''}`} />
              </button>
              {mobileExpanded.about && (
                <div className="pl-6 py-1 flex flex-col gap-1 border-l border-[#D5AD63]/30 ml-3 mt-1">
                  <button onClick={() => navigate('/about')} className="text-left py-1.5 text-sm text-slate-300 hover:text-[#D5AD63]">About Us</button>
                  <button onClick={() => navigate('/leadership')} className="text-left py-1.5 text-sm text-slate-300 hover:text-[#D5AD63]">Leadership</button>
                  <button onClick={() => navigate('/partnerships')} className="text-left py-1.5 text-sm text-slate-300 hover:text-[#D5AD63]">Partnerships</button>
                </div>
              )}
            </div>

            <button onClick={() => navigate('/projects')} className="w-full text-left py-2.5 px-3 text-base font-medium text-white hover:bg-white/10 rounded-xl cursor-pointer">Projects</button>
            <button onClick={() => navigate('/events')} className="w-full text-left py-2.5 px-3 text-base font-medium text-white hover:bg-white/10 rounded-xl cursor-pointer">Events</button>
            <button onClick={() => navigate('/gallery')} className="w-full text-left py-2.5 px-3 text-base font-medium text-white hover:bg-white/10 rounded-xl cursor-pointer">Gallery</button>
            <button onClick={() => navigate('/insights')} className="w-full text-left py-2.5 px-3 text-base font-medium text-white hover:bg-white/10 rounded-xl cursor-pointer">Insights</button>
            <button onClick={() => navigate('/careers')} className="w-full text-left py-2.5 px-3 text-base font-medium text-white hover:bg-white/10 rounded-xl cursor-pointer">Careers</button>
            <button onClick={() => navigate('/contact')} className="w-full text-left py-2.5 px-3 text-base font-medium text-white hover:bg-white/10 rounded-xl cursor-pointer">Contact</button>
            <button onClick={() => navigate('/admin')} className="w-full text-left py-2.5 px-3 text-base font-medium text-slate-300 hover:text-white rounded-xl flex items-center gap-2 cursor-pointer">
              <ShieldCheck className="w-4 h-4 text-[#D5AD63]" />
              <span>Admin Dashboard</span>
            </button>

            <div className="pt-4 mt-2 border-t border-white/15 flex flex-col gap-2.5">
              <button
                onClick={() => navigate('/enroll')}
                className="w-full py-3 text-center text-sm font-bold text-[#071426] bg-[#D5AD63] rounded-full cursor-pointer shadow-md"
              >
                Enroll in Programs
              </button>
              <button
                onClick={() => navigate('/request-quote')}
                className="w-full py-2.5 text-center text-xs font-semibold text-white border border-white/20 hover:border-white/40 rounded-full cursor-pointer"
              >
                Request Enterprise Quote
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
