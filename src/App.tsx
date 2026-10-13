/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StudioProvider, useStudio } from './context/StudioContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ArrangementShowcase } from './components/ArrangementShowcase';
import { FinishesShowcase } from './components/FinishesShowcase';
import { HowItWorksSection } from './components/HowItWorksSection';
import { StudioConfigurator } from './components/StudioConfigurator';
import { ResultsGallery } from './components/ResultsGallery';
import { MyCreationsPage } from './components/MyCreationsPage';
import { DemoAdminScreen } from './components/DemoAdminScreen';
import { GenerationLoadingModal } from './components/GenerationLoadingModal';
import { AccessCodeModal } from './components/AccessCodeModal';
import { Footer } from './components/Footer';
import { CheckCircle2, AlertCircle } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeTab, toastMessage } = useStudio();

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F7F4] text-[#252525]">
      {/* Top Header Bar following Top Bar Contract */}
      <Navbar />

      {/* Main Routed Content */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <div>
            <HeroSection />
            <ArrangementShowcase />
            <FinishesShowcase />
            <HowItWorksSection />
          </div>
        )}

        {activeTab === 'studio' && <StudioConfigurator />}

        {activeTab === 'gallery' && <ResultsGallery />}

        {activeTab === 'finishes' && (
          <div className="pt-4">
            <FinishesShowcase />
          </div>
        )}

        {activeTab === 'creations' && <MyCreationsPage />}

        {activeTab === 'admin' && <DemoAdminScreen />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Dialogs */}
      <GenerationLoadingModal />
      <AccessCodeModal />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#252525] text-white text-xs px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 animate-in slide-in-from-bottom-3 duration-200 border border-white/10 max-w-md">
          <CheckCircle2 className="w-4 h-4 text-[#A78055] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <StudioProvider>
      <MainContent />
    </StudioProvider>
  );
}
