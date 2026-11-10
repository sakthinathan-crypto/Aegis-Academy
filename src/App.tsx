import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { RouterProvider, useRouter } from './context/RouterContext';
import { CustomCursor } from './components/common/CustomCursor';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';

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

const AppContent: React.FC = () => {
  const { currentPath } = useRouter();

  // Normalize path by stripping hash and query params for route matching
  const basePath = currentPath.split('#')[0].split('?')[0];

  // Determine current view
  const renderCurrentRoute = () => {
    // Admin route
    if (basePath === '/admin' || basePath.startsWith('/admin/')) {
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

  const isAdminRoute = basePath === '/admin' || basePath.startsWith('/admin/');

  return (
    <div className="min-h-screen bg-[#020617] text-slate-900 flex flex-col font-sans selection:bg-[#D5AD63]/30 selection:text-slate-900">
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
  );
};

export default function App() {
  return (
    <RouterProvider>
      <AppContent />
    </RouterProvider>
  );
}
