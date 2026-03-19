'use client';

import React, { useEffect, useState } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { translations } from '@/lib/translations';
import { useLanguage } from '@/providers/LanguageProvider';
import { useDemoModal } from '@/providers/DemoModalProvider';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { language } = useLanguage();
  const { openDemoModal } = useDemoModal();
  const t = translations[language];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-background to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className={`space-y-8 text-center lg:text-left ${isVisible ? 'opacity-0 animate-fade-in-up' : 'opacity-0'}`}>
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                {t.heroTitle}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                {t.heroSubtitle}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                onClick={openDemoModal}
                size="lg"
                className="btn-primary text-lg px-8 py-4 h-12 md:h-14 cursor-pointer"
              >
                {t.tryDemoNow}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-4 h-12 md:h-14 hover-lift cursor-pointer"
                onClick={() => document.getElementById('demo-preview')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Play className="mr-2 w-5 h-5" />
                {t.watch}
              </Button>
            </div>

            {/* Advantages instead of fake stats */}
            <div className="grid grid-cols-3 gap-4 md:gap-8 pt-8 border-t border-border">
              <div className="text-center">
                <div className="text-base md:text-2xl lg:text-3xl font-bold text-primary leading-tight">{t.heroStat1}</div>
                <div className="text-xs md:text-sm text-muted-foreground mt-1">{t.heroStat1Desc}</div>
              </div>
              <div className="text-center">
                <div className="text-base md:text-2xl lg:text-3xl font-bold text-primary leading-tight">{t.heroStat2}</div>
                <div className="text-xs md:text-sm text-muted-foreground mt-1">{t.heroStat2Desc}</div>
              </div>
              <div className="text-center">
                <div className="text-base md:text-2xl lg:text-3xl font-bold text-primary leading-tight">{t.heroStat3}</div>
                <div className="text-xs md:text-sm text-muted-foreground mt-1">{t.heroStat3Desc}</div>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className={`relative ${isVisible ? 'opacity-0 animate-slide-in-right' : 'opacity-0'}`}>
            <div className="relative">
              {/* Main Dashboard Image */}
              <div className="relative z-10 transform lg:rotate-2 hover:rotate-0 transition-transform duration-500">
                <img
                  src="/images/Dashboard desktop.webp"
                  alt="Cliento CRM Dashboard - mijozlar boshqaruv tizimi"
                  className="w-full h-auto rounded-2xl shadow-2xl hover-lift"
                  width={1536}
                  height={1024}
                  fetchPriority="high"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -left-4 z-20 w-20 h-20 bg-green-500 rounded-2xl flex items-center justify-center shadow-lg animate-float">
                <span className="text-white font-bold text-2xl">&#10003;</span>
              </div>

              <div className="absolute -bottom-4 -right-4 z-20 w-24 h-24 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg animate-float" style={{ animationDelay: '1s' }}>
                <span className="text-white font-bold text-lg">CRM</span>
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-3xl -z-10 animate-pulse"></div>
            </div>

            {/* Feature Badges */}
            <div className="absolute top-1/2 -left-8 transform -translate-y-1/2 z-20 hidden lg:block">
              <div className="bg-card dark:bg-gray-800 rounded-lg shadow-lg p-4 animate-slide-in-left stagger-1">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">{t.customerBase}</span>
                </div>
              </div>
            </div>

            <div className="absolute bottom-1/4 -right-8 z-20 hidden lg:block">
              <div className="bg-card dark:bg-gray-800 rounded-lg shadow-lg p-4 animate-slide-in-right stagger-2">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium">{t.automationBadge}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
          <div className="w-1 h-3 bg-muted-foreground rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
