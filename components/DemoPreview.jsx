'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Play, ChevronLeft, ChevronRight, Users, Smartphone, Tablet, Rocket, Monitor } from 'lucide-react';
import { translations } from '@/lib/translations';
import { useLanguage } from '@/providers/LanguageProvider';

const DemoPreview = () => {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [deviceView, setDeviceView] = useState('desktop');
  const sectionRef = useRef(null);
  const t = translations[language];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const slides = [
    {
      images: {
        desktop: '/images/Dashboard desktop.webp',
        tablet: '/images/Dashboard Tablet.webp',
        mobile: '/images/Dashboard Mobile.webp'
      },
      title: t.slideDashboardTitle,
      description: t.slideDashboardDesc
    },
    {
      images: {
        desktop: '/images/Lead desktop.webp',
        tablet: '/images/Lead tablet.webp',
        mobile: '/images/Lead mobile.webp'
      },
      title: t.slideLeadTitle,
      description: t.slideLeadDesc
    },
    {
      images: {
        desktop: '/images/Task desktop.webp',
        tablet: '/images/Task tablet.webp',
        mobile: '/images/Task mobile.webp'
      },
      title: t.slideTaskTitle,
      description: t.slideTaskDesc
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const deviceSizes = {
    desktop: 'w-full max-w-4xl',
    tablet: 'w-full max-w-2xl',
    mobile: 'w-full max-w-sm'
  };

  return (
    <section id="demo-preview" ref={sectionRef} className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className={`text-center mb-16 ${isVisible ? 'opacity-0 animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {t.demoTitle}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {t.demoSubtitle}
          </p>
        </div>

        {/* Device Selector */}
        <div className={`flex justify-center mb-8 ${isVisible ? 'opacity-0 animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
          <div className="flex bg-muted rounded-lg p-1">
            <button
              onClick={() => setDeviceView('desktop')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                deviceView === 'desktop' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Monitor className="w-4 h-4" />
              <span>Desktop</span>
            </button>
            <button
              onClick={() => setDeviceView('tablet')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                deviceView === 'tablet' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Tablet className="w-4 h-4" />
              <span>Tablet</span>
            </button>
            <button
              onClick={() => setDeviceView('mobile')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                deviceView === 'mobile' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>Mobile</span>
            </button>
          </div>
        </div>

        {/* Demo Carousel */}
        <div className={`relative ${isVisible ? 'opacity-0 animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
          <div className="flex justify-center">
            <div className={`relative ${deviceSizes[deviceView]} transition-all duration-500`}>
              {/* Device Frame */}
              <div className={`relative bg-gray-800 rounded-2xl p-4 ${
                deviceView === 'mobile' ? 'rounded-3xl p-2' : deviceView === 'tablet' ? 'rounded-2xl p-3' : 'rounded-xl p-4'
              }`}>
                {/* Screen */}
                <div className={`relative bg-white rounded-lg overflow-hidden ${
                  deviceView === 'desktop' ? 'aspect-video' : ''
                }`}>
                  <img
                    src={slides[currentSlide].images[deviceView]}
                    alt={slides[currentSlide].title}
                    className="w-full h-auto transition-opacity duration-500"
                    width={deviceView === 'mobile' ? 768 : 1536}
                    height={deviceView === 'mobile' ? 1376 : deviceView === 'tablet' ? 1024 : 768}
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                {/* Device Details */}
                {deviceView === 'mobile' && (
                  <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gray-600 rounded-full"></div>
                )}
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                aria-label="Previous slide"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-card/90 dark:bg-gray-800/90 rounded-full flex items-center justify-center shadow-lg hover:bg-card dark:hover:bg-gray-800 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={nextSlide}
                aria-label="Next slide"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-card/90 dark:bg-gray-800/90 rounded-full flex items-center justify-center shadow-lg hover:bg-card dark:hover:bg-gray-800 transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Slide Info */}
          <div className="text-center mt-8">
            <h3 className="text-2xl font-bold text-foreground mb-2">
              {slides[currentSlide].title}
            </h3>
            <p className="text-muted-foreground">
              {slides[currentSlide].description}
            </p>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center space-x-2 mt-6">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Slide ${index + 1}`}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-primary' : 'bg-muted-foreground/30'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Features List */}
        <div className={`mt-16 ${isVisible ? 'opacity-0 animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="text-center">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4">
                <Users className="w-7 h-7 md:w-8 md:h-8 text-white" />
              </div>
              <h4 className="text-base md:text-lg font-semibold text-foreground mb-1 md:mb-2">{t.responsiveDesign}</h4>
              <p className="text-sm md:text-base text-muted-foreground">{t.responsiveDesignDesc}</p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4">
                <Play className="w-7 h-7 md:w-8 md:h-8 text-white" />
              </div>
              <h4 className="text-base md:text-lg font-semibold text-foreground mb-1 md:mb-2">{t.interactiveDemo}</h4>
              <p className="text-sm md:text-base text-muted-foreground">{t.interactiveDemoDesc}</p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4">
                <Smartphone className="w-7 h-7 md:w-8 md:h-8 text-white" />
              </div>
              <h4 className="text-base md:text-lg font-semibold text-foreground mb-1 md:mb-2">{t.mobileOptimization}</h4>
              <p className="text-sm md:text-base text-muted-foreground">{t.mobileOptimizationDesc}</p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4">
                <Rocket className="w-7 h-7 md:w-8 md:h-8 text-white" />
              </div>
              <h4 className="text-base md:text-lg font-semibold text-foreground mb-1 md:mb-2">{t.dataSecurity}</h4>
              <p className="text-sm md:text-base text-muted-foreground">{t.dataSecurityDesc}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoPreview;
