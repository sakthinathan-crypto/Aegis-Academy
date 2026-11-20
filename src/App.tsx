import React, { Component, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { RouterProvider, useRouter } from './context/RouterContext';
import { CustomCursor } from './components/common/CustomCursor';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { SplashScreen } from './components/common/SplashScreen';

// Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Leadership } from './pages/Leadership';
import { Contact } from './pages/Contact';
import { EducationOverview } from './pages/EducationOverview';
import { SchoolPrograms } from './pages/SchoolPrograms';
import { CollegePrograms } from './pages/CollegePrograms';
import { ProfessionalDev } from './pages/ProfessionalDev';
import { ProgramDetail } from './pages/ProgramDetail';
import { TechnologiesOverview } from './pages/TechnologiesOverview';
import { ServicesOverview } from './pages/ServicesOverview';
import { ServiceDetail } from './pages/ServiceDetail';
import { ProjectsPortfolio } from './pages/ProjectsPortfolio';
import { ProjectDetail } from './pages/ProjectDetail';
import { EventsPage } from './pages/EventsPage';
import { GalleryPage } from './pages/GalleryPage';
import { PartnershipsPage } from './pages/PartnershipsPage';
import { StudentEnrollment } from './pages/StudentEnrollment';
import { RequestQuote } from './pages/RequestQuote';
import { InsightsBlog } from './pages/InsightsBlog';
import { CareersPage } from './pages/CareersPage';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsConditions } from './pages/TermsConditions';
import { NotFoundPage } from './pages/NotFoundPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';

const INTRO_SESSION_KEY = 'aegis_intro_seen_v1';

function readHasSeenIntro(isAdminRoute: boolean): boolean {
  if (isAdminRoute || typeof window === 'undefined') return true;
  if (window.location.search.includes('autostart=1')) return true;
  try {
    return window.sessionStorage.getItem(INTRO_SESSION_KEY) === '1';
  } catch {
    return false;
  }
}

function persistIntroSeen(): void {
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.setItem(INTRO_SESSION_KEY, '1');
  } catch {
    // Ignore storage restrictions in sandboxed/private contexts
  }
}

interface SplashErrorBoundaryProps {
  onFail: () => void;
  children: ReactNode;
}

interface SplashErrorBoundaryState {
  hasError: boolean;
}

class SplashErrorBoundary extends Component<SplashErrorBoundaryProps, SplashErrorBoundaryState> {
  state: SplashErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): SplashErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(): void {
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    this.props.onFail();
  }

  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

const AppContent: React.FC = () => {
  const { currentPath } = useRouter();

  // Normalize path by stripping hash and query params for route matching
  const basePath = currentPath.split('#')[0].split('?')[0];
  const isAdminRoute = basePath === '/admin' || basePath.startsWith('/admin/');

  // Session-level splash state (runs once per browser session, never replays on internal navigation)
  const [hasSeenIntro, setHasSeenIntro] = useState<boolean>(() => readHasSeenIntro(isAdminRoute));
  const [isSplashVisible, setIsSplashVisible] = useState<boolean>(() => !readHasSeenIntro(isAdminRoute));
  const [isHomepageRevealing, setIsHomepageRevealing] = useState<boolean>(false);
  const [isHomepageSettled, setIsHomepageSettled] = useState<boolean>(() => readHasSeenIntro(isAdminRoute));

  const settleTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (settleTimerRef.current !== null) {
        window.clearTimeout(settleTimerRef.current);
      }
    };
  }, []);

  const handleRevealStart = useCallback(() => {
    persistIntroSeen();
    setHasSeenIntro(true);
    setIsHomepageRevealing(true);

    if (settleTimerRef.current !== null) {
      window.clearTimeout(settleTimerRef.current);
    }
    // Wait for the full 820ms homepage fade-in/translateY reveal before clearing transform
    settleTimerRef.current = window.setTimeout(() => {
      setIsHomepageRevealing(false);
      setIsHomepageSettled(true);
      settleTimerRef.current = null;
    }, 860);
  }, []);

  const handleSplashComplete = useCallback(() => {
    persistIntroSeen();
    setHasSeenIntro(true);
    setIsSplashVisible(false);
  }, []);

  const handleSplashFail = useCallback(() => {
    if (settleTimerRef.current !== null) {
      window.clearTimeout(settleTimerRef.current);
      settleTimerRef.current = null;
    }
    persistIntroSeen();
    setHasSeenIntro(true);
    setIsSplashVisible(false);
    setIsHomepageRevealing(false);
    setIsHomepageSettled(true);
  }, []);

  // Determine current view
  const renderCurrentRoute = () => {
    // Admin route
    if (isAdminRoute) {
      return <AdminDashboard />;
    }

    // Public pages
    if (basePath === '/') return <Home />;
    if (basePath === '/about') return <About />;
    if (basePath === '/leadership') return <Leadership />;
    if (basePath === '/contact') return <Contact />;

    // Education division
    if (basePath === '/education') return <EducationOverview />;
    if (basePath === '/education/schools') return <SchoolPrograms />;
    if (basePath === '/education/colleges') return <CollegePrograms />;
    if (basePath === '/education/professional') return <ProfessionalDev />;
    if (basePath.startsWith('/programs/')) return <ProgramDetail />;

    // Technologies division
    if (basePath === '/technologies') return <TechnologiesOverview />;
    if (basePath === '/services') return <ServicesOverview />;
    if (basePath.startsWith('/services/')) return <ServiceDetail />;
    if (basePath === '/projects') return <ProjectsPortfolio />;
    if (basePath.startsWith('/projects/')) return <ProjectDetail />;

    // Community & Conversion
    if (basePath === '/events') return <EventsPage />;
    if (basePath === '/gallery') return <GalleryPage />;
    if (basePath === '/partnerships') return <PartnershipsPage />;
    if (basePath === '/enroll') return <StudentEnrollment />;
    if (basePath === '/request-quote') return <RequestQuote />;

    // Insights & Careers
    if (basePath === '/insights' || basePath.startsWith('/insights/')) return <InsightsBlog />;
    if (basePath === '/careers') return <CareersPage />;

    // Legal
    if (basePath === '/privacy-policy') return <PrivacyPolicy />;
    if (basePath === '/terms') return <TermsConditions />;

    // 404
    return <NotFoundPage />;
  };

  // Once settled, remove transform/opacity classes so fixed headers/modals attach cleanly to viewport
  const revealStateClass = isHomepageSettled
    ? ''
    : isHomepageRevealing
      ? 'homepage-reveal-entering'
      : isSplashVisible && !hasSeenIntro
        ? 'homepage-reveal-hidden'
        : '';

  return (
    <>
      {isSplashVisible && !isAdminRoute && (
        <SplashErrorBoundary onFail={handleSplashFail}>
          <SplashScreen
            onRevealStart={handleRevealStart}
            onComplete={handleSplashComplete}
          />
        </SplashErrorBoundary>
      )}

      <div
        aria-hidden={isSplashVisible && !isHomepageRevealing ? true : undefined}
        className={`min-h-screen bg-[#020617] text-slate-900 flex flex-col font-sans selection:bg-[#D5AD63]/30 selection:text-slate-900 ${revealStateClass}`}
      >
        <CustomCursor />

        {!isAdminRoute && <Navbar />}

        <main className="flex-1 w-full overflow-x-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={basePath}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{
                duration: 0.36,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="w-full flex-1"
            >
              {renderCurrentRoute()}
            </motion.div>
          </AnimatePresence>
        </main>

        {!isAdminRoute && <Footer />}
      </div>
    </>
  );
};

export default function App() {
  return (
    <RouterProvider>
      <AppContent />
    </RouterProvider>
  );
}
