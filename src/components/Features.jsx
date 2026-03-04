import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  BarChart3,
  Settings,
  Bell,
  Zap,
  Database,
  CheckCircle
} from 'lucide-react';
import { translations } from '../lib/translations';

const Features = ({ language, openDemoModal }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const sectionRef = useRef(null);
  const sliderRef = useRef(null);
  const autoSlideRef = useRef(null);
  const userScrollingRef = useRef(false);
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

  const features = [
    {
      icon: Database,
      title: t.customerDatabase,
      description: t.customerDatabaseDesc,
      color: 'bg-blue-500',
      delay: '0.1s'
    },
    {
      icon: BarChart3,
      title: t.statusManagement,
      description: t.statusManagementDesc,
      color: 'bg-green-500',
      delay: '0.2s'
    },
    {
      icon: Settings,
      title: t.services,
      description: t.servicesDesc,
      color: 'bg-purple-500',
      delay: '0.3s'
    },
    {
      icon: Bell,
      title: t.reminders,
      description: t.remindersDesc,
      color: 'bg-orange-500',
      delay: '0.4s'
    },
    {
      icon: Zap,
      title: t.automation,
      description: t.automationDesc,
      color: 'bg-pink-500',
      delay: '0.5s'
    }
  ];

  const scrollToSlide = useCallback((index) => {
    const slider = sliderRef.current;
    if (!slider || !slider.children[index]) return;
    const child = slider.children[index];
    const scrollPos = child.offsetLeft - (slider.offsetWidth - child.offsetWidth) / 2;
    slider.scrollTo({ left: scrollPos, behavior: 'smooth' });
  }, []);

  // Auto-slide for mobile
  const startAutoSlide = useCallback(() => {
    if (autoSlideRef.current) clearInterval(autoSlideRef.current);
    autoSlideRef.current = setInterval(() => {
      if (userScrollingRef.current) return;
      setActiveSlide(prev => {
        const next = (prev + 1) % features.length;
        scrollToSlide(next);
        return next;
      });
    }, 3500);
  }, [features.length, scrollToSlide]);

  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth >= 768) return;
    startAutoSlide();
    return () => {
      if (autoSlideRef.current) clearInterval(autoSlideRef.current);
    };
  }, [startAutoSlide]);

  // Track scroll position for active dot
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let scrollTimeout;
    const handleScroll = () => {
      userScrollingRef.current = true;
      if (autoSlideRef.current) clearInterval(autoSlideRef.current);
      clearTimeout(scrollTimeout);

      const children = Array.from(slider.children);
      const containerCenter = slider.scrollLeft + slider.offsetWidth / 2;
      let closest = 0;
      let minDist = Infinity;
      children.forEach((child, i) => {
        const childCenter = child.offsetLeft + child.offsetWidth / 2;
        const dist = Math.abs(containerCenter - childCenter);
        if (dist < minDist) {
          minDist = dist;
          closest = i;
        }
      });
      setActiveSlide(closest);

      scrollTimeout = setTimeout(() => {
        userScrollingRef.current = false;
        startAutoSlide();
      }, 5000);
    };

    slider.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      slider.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [startAutoSlide]);

  const renderFeatureCard = (feature, index, isMobile = false) => {
    const IconComponent = feature.icon;
    return (
      <div
        key={index}
        className={`group relative bg-card border border-border rounded-2xl p-6 md:p-8 ${!isMobile ? 'hover-lift' : ''} transition-all duration-300 ${
          isVisible ? 'opacity-0 animate-fade-in-up' : 'opacity-0'
        } ${isMobile ? 'h-full' : ''}`}
        style={{ animationDelay: feature.delay }}
      >
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Icon */}
        <div className={`relative w-14 h-14 md:w-16 md:h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300`}>
          <IconComponent className="w-7 h-7 md:w-8 md:h-8 text-white" />
        </div>

        {/* Content */}
        <div className="relative">
          <h3 className="text-lg md:text-xl font-bold text-foreground mb-3 md:mb-4 group-hover:text-primary transition-colors duration-300">
            {feature.title}
          </h3>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            {feature.description}
          </p>
        </div>

        {/* Hover Effect */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <CheckCircle className="w-6 h-6 text-green-500" />
        </div>
      </div>
    );
  };

  return (
    <section id="features" ref={sectionRef} className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className={`text-center mb-12 md:mb-16 ${isVisible ? 'opacity-0 animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {t.featuresTitle}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {t.featuresSubtitle}
          </p>
        </div>

        {/* Mobile Slider */}
        <div className="md:hidden">
          <div
            ref={sliderRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 no-scrollbar"
            style={{ paddingLeft: '8%', paddingRight: '8%' }}
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className="snap-center flex-shrink-0 w-[78%]"
              >
                {renderFeatureCard(feature, index, true)}
              </div>
            ))}
          </div>
          {/* Dots */}
          <div className="flex justify-center gap-1.5 mt-4">
            {features.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setActiveSlide(i);
                  scrollToSlide(i);
                }}
                aria-label={`Slide ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === activeSlide ? 'w-6 bg-primary' : 'w-2 bg-muted-foreground/30'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => renderFeatureCard(feature, index))}
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-12 md:mt-16 ${isVisible ? 'opacity-0 animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.8s' }}>
          <div className="bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-2xl p-6 md:p-8 border border-primary/20">
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4">
              {t.tryAllFeatures}
            </h3>
            <p className="text-muted-foreground mb-6">
              {t.tryAllFeaturesDesc}
            </p>
            <button
              onClick={openDemoModal}
              className="btn-primary px-8 py-3 rounded-lg font-semibold hover-lift text-white"
            >
              {t.startDemo}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
