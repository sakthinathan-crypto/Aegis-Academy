import React from 'react';
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

  // Determine current view
  const renderCurrentRoute = () => {
    // Admin route
    if (currentPath === '/admin' || currentPath.startsWith('/admin/')) {
      return <AdminDashboard />;
    }

    // Public pages
    if (currentPath === '/') return <Home />;
    if (currentPath === '/about') return <About />;
    if (currentPath === '/leadership') return <Leadership />;
    if (currentPath === '/contact') return <Contact />;

    // Education division
    if (currentPath === '/education') return <EducationOverview />;
    if (currentPath === '/education/schools') return <SchoolPrograms />;
    if (currentPath === '/education/colleges') return <CollegePrograms />;
    if (currentPath === '/education/professional') return <ProfessionalDev />;
    if (currentPath.startsWith('/programs/')) return <ProgramDetail />;

    // Technologies division
    if (currentPath === '/technologies') return <TechnologiesOverview />;
    if (currentPath === '/services') return <ServicesOverview />;
    if (currentPath.startsWith('/services/')) return <ServiceDetail />;
    if (currentPath === '/projects') return <ProjectsPortfolio />;
    if (currentPath.startsWith('/projects/')) return <ProjectDetail />;

    // Community & Conversion
    if (currentPath === '/events') return <EventsPage />;
    if (currentPath === '/gallery') return <GalleryPage />;
    if (currentPath === '/partnerships') return <PartnershipsPage />;
    if (currentPath === '/enroll') return <StudentEnrollment />;
    if (currentPath === '/request-quote') return <RequestQuote />;

    // Insights & Careers
    if (currentPath === '/insights' || currentPath.startsWith('/insights/')) return <InsightsBlog />;
    if (currentPath === '/careers') return <CareersPage />;

    // Legal
    if (currentPath === '/privacy-policy') return <PrivacyPolicy />;
    if (currentPath === '/terms') return <TermsConditions />;

    // 404
    return <NotFoundPage />;
  };

  const isAdminRoute = currentPath === '/admin' || currentPath.startsWith('/admin/');

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-[#D5AD63]/30 selection:text-slate-900">
      <CustomCursor />

      {!isAdminRoute && <Navbar />}

      <main className="flex-1">
        {renderCurrentRoute()}
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
