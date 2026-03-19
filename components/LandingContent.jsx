'use client';

import { Suspense } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import TargetAudience from '@/components/TargetAudience';
import DemoPreview from '@/components/DemoPreview';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import DemoModal from '@/components/DemoModal';
import ScrollToTop from '@/components/ScrollToTop';
import ScrollToSection from '@/components/ScrollToSection';
import { useDemoModal } from '@/providers/DemoModalProvider';

export default function LandingContent({ autoOpenDemo = false }) {
  const { isDemoModalOpen, selectedPlan, openDemoModal, closeDemoModal } = useDemoModal();

  // Auto-open demo modal for /demo route
  if (autoOpenDemo && !isDemoModalOpen) {
    // Use effect-free approach — will trigger on next render
    setTimeout(() => openDemoModal(), 0);
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Suspense fallback={null}>
        <ScrollToSection />
      </Suspense>
      <Header />
      <main>
        <Hero />
        <Features />
        <TargetAudience />
        <DemoPreview />
        <Pricing />
        <FAQ />
      </main>
      <Footer />

      {isDemoModalOpen && (
        <DemoModal isOpen={isDemoModalOpen} onClose={closeDemoModal} selectedPlan={selectedPlan} />
      )}

      <ScrollToTop />
    </div>
  );
}
