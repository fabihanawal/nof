import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { DonationModal } from './components/DonationModal';
import { NewsModal } from './components/NewsModal';
import { ImageLightbox } from './components/ImageLightbox';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { VisionMissionPage } from './pages/VisionMissionPage';
import { LeadershipPage } from './pages/LeadershipPage';
import { DivisionsPage } from './pages/DivisionsPage';
import { DistrictsPage } from './pages/DistrictsPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { NewsPage } from './pages/NewsPage';
import { GalleryPage } from './pages/GalleryPage';
import { JoinPage } from './pages/JoinPage';
import { ContactPage } from './pages/ContactPage';
import { AdminCMS } from './components/AdminCMS';

const MainLayout: React.FC = () => {
  const { currentPage } = useApp();

  // Automatically scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'about':
        return <AboutPage />;
      case 'vision':
        return <VisionMissionPage />;
      case 'leadership':
        return <LeadershipPage />;
      case 'divisions':
        return <DivisionsPage />;
      case 'districts':
        return <DistrictsPage />;
      case 'projects':
        return <ProjectsPage />;
      case 'news':
        return <NewsPage />;
      case 'gallery':
        return <GalleryPage />;
      case 'join':
        return <JoinPage />;
      case 'contact':
        return <ContactPage />;
      case 'admin':
        return <AdminCMS />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-bengali selection:bg-emerald-200 selection:text-emerald-900">
      {/* Global Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow">
        {renderPage()}
      </main>

      {/* Global Footer (shown on all pages except full-screen admin) */}
      {currentPage !== 'admin' && <Footer />}

      {/* Global Interactive Modals */}
      <DonationModal />
      <NewsModal />
      <ImageLightbox />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
