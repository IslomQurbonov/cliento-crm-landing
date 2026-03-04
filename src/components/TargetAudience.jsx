import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  Megaphone,
  Scissors,
  GraduationCap,
  Car,
  UtensilsCrossed,
  Building2,
  Dumbbell,
  Plane,
  BookOpen,
  Speaker,
  Camera
} from 'lucide-react';
import { translations } from '../lib/translations';

const TargetAudience = ({ language }) => {
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

  const audiences = [
    {
      icon: Megaphone,
      title: t.smmAgencies,
      description: t.smmAgenciesDesc,
      gradient: 'from-pink-500 to-rose-500',
      delay: '0.1s'
    },
    {
      icon: Scissors,
      title: t.beautySalons,
      description: t.beautySalonsDesc,
      gradient: 'from-purple-500 to-pink-500',
      delay: '0.2s'
    },
    {
      icon: GraduationCap,
      title: t.educationCenters,
      description: t.educationCentersDesc,
      gradient: 'from-blue-500 to-cyan-500',
      delay: '0.3s'
    },
    {
      icon: Car,
      title: t.autoServices,
      description: t.autoServicesDesc,
      gradient: 'from-orange-500 to-red-500',
      delay: '0.4s'
    },
    {
      icon: UtensilsCrossed,
      title: t.restaurants,
      description: t.restaurantsDesc,
      gradient: 'from-green-500 to-emerald-500',
      delay: '0.5s'
    },
    {
      icon: Dumbbell,
      title: t.spaFitness,
      description: t.spaFitnessDesc,
      gradient: 'from-teal-500 to-cyan-500',
      delay: '0.6s'
    },
    {
      icon: Plane,
      title: t.travelAgencies,
      description: t.travelAgenciesDesc,
      gradient: 'from-sky-500 to-blue-500',
      delay: '0.7s'
    },
    {
      icon: BookOpen,
      title: t.languageCenters,
      description: t.languageCentersDesc,
      gradient: 'from-amber-500 to-orange-500',
      delay: '0.8s'
    },
    {
      icon: Speaker,
      title: t.adAgencies,
      description: t.adAgenciesDesc,
      gradient: 'from-red-500 to-pink-500',
      delay: '0.9s'
    },
    {
      icon: Camera,
      title: t.photoEvent,
      description: t.photoEventDesc,
      gradient: 'from-violet-500 to-purple-500',
      delay: '1.0s'
    },
    {
      icon: Building2,
      title: t.otherServices,
      description: t.otherServicesDesc,
      gradient: 'from-indigo-500 to-purple-500',
      delay: '1.1s'
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
        const next = (prev + 1) % audiences.length;
        scrollToSlide(next);
        return next;
      });
    }, 3500);
  }, [audiences.length, scrollToSlide]);

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

  const renderAudienceCard = (audience, index, isMobile = false) => {
    const IconComponent = audience.icon;
    return (
      <div
        key={index}
        className={`group relative bg-card border border-border rounded-2xl p-6 md:p-8 ${!isMobile ? 'hover-lift' : ''} transition-all duration-500 overflow-hidden ${
          isVisible ? 'opacity-0 animate-fade-in-up' : 'opacity-0'
        } ${isMobile ? 'h-full' : ''}`}
        style={{ animationDelay: audience.delay }}
      >
        {/* Background Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${audience.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

        {/* Icon Container */}
        <div className="relative mb-4 md:mb-6">
          <div className={`w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br ${audience.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
            <IconComponent className="w-7 h-7 md:w-8 md:h-8 text-white" />
          </div>

          {/* Floating Dots */}
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
          <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-secondary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        </div>

        {/* Content */}
        <div className="relative">
          <h3 className="text-lg md:text-xl font-bold text-foreground mb-3 md:mb-4 group-hover:text-primary transition-colors duration-300">
            {audience.title}
          </h3>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            {audience.description}
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-4 right-4 w-20 h-20 border border-primary/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
    );
  };

  return (
    <section ref={sectionRef} className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className={`text-center mb-12 md:mb-16 ${isVisible ? 'opacity-0 animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {t.targetTitle}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {t.targetSubtitle}
          </p>
        </div>

        {/* Mobile Slider */}
        <div className="md:hidden">
          <div
            ref={sliderRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 no-scrollbar"
            style={{ paddingLeft: '8%', paddingRight: '8%' }}
          >
            {audiences.map((audience, index) => (
              <div
                key={index}
                className="snap-center flex-shrink-0 w-[78%]"
              >
                {renderAudienceCard(audience, index, true)}
              </div>
            ))}
          </div>
          {/* Dots */}
          <div className="flex justify-center gap-1 mt-4">
            {audiences.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setActiveSlide(i);
                  scrollToSlide(i);
                }}
                aria-label={`Slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeSlide ? 'w-5 bg-primary' : 'w-1.5 bg-muted-foreground/30'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {audiences.map((audience, index) => renderAudienceCard(audience, index))}
        </div>

        {/* Bottom Stats */}
        <div className={`mt-16 md:mt-20 ${isVisible ? 'opacity-0 animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.8s' }}>
          <div className="bg-gradient-to-r from-primary/5 to-purple-500/5 rounded-2xl p-6 md:p-8 border border-primary/10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
              <div>
                <div className="text-xl md:text-3xl font-bold text-primary mb-1 md:mb-2">{t.businessTypes_count}</div>
                <div className="text-xs md:text-sm text-muted-foreground">{t.businessTypes_label}</div>
              </div>
              <div>
                <div className="text-xl md:text-3xl font-bold text-primary mb-1 md:mb-2 break-words">{t.flexible}</div>
                <div className="text-xs md:text-sm text-muted-foreground">{t.flexibleLabel}</div>
              </div>
              <div>
                <div className="text-xl md:text-3xl font-bold text-primary mb-1 md:mb-2">{t.support247}</div>
                <div className="text-xs md:text-sm text-muted-foreground">{t.supportLabel}</div>
              </div>
              <div>
                <div className="text-xl md:text-3xl font-bold text-primary mb-1 md:mb-2">{t.unlimitedCapabilities}</div>
                <div className="text-sm text-muted-foreground">{t.capabilitiesLabel}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TargetAudience;
