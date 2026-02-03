import React, { useEffect, useRef, useState } from 'react';
import { 
  Megaphone, 
  Scissors, 
  GraduationCap, 
  Car, 
  UtensilsCrossed, 
  Building2,
  ArrowRight
} from 'lucide-react';
import { translations } from '../lib/translations';

const TargetAudience = ({ language }) => {
  const [isVisible, setIsVisible] = useState(false);
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
      icon: Building2,
      title: t.otherServices,
      description: t.otherServicesDesc,
      gradient: 'from-indigo-500 to-purple-500',
      delay: '0.6s'
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {t.targetTitle}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {t.targetSubtitle}
          </p>
        </div>

        {/* Audience Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {audiences.map((audience, index) => {
            const IconComponent = audience.icon;
            return (
              <div
                key={index}
                className={`group relative bg-card border border-border rounded-2xl p-8 hover-lift transition-all duration-500 overflow-hidden ${
                  isVisible ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: audience.delay }}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${audience.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                {/* Icon Container */}
                <div className="relative mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${audience.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Floating Dots */}
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                  <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-secondary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                </div>

                {/* Content */}
                <div className="relative">
                  <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                    {audience.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {audience.description}
                  </p>
                  
                  {/* Learn More Link */}
                  <div className="flex items-center text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-sm font-medium">Batafsil</span>
                    <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-20 h-20 border border-primary/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-4 left-4 w-12 h-12 border border-secondary/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ transitionDelay: '0.2s' }}></div>
              </div>
            );
          })}
        </div>

        {/* Bottom Stats */}
        <div className={`mt-20 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.8s' }}>
          <div className="bg-gradient-to-r from-primary/5 to-purple-500/5 rounded-2xl p-8 border border-primary/10">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">6+</div>
                <div className="text-muted-foreground">Biznes turlari</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">100%</div>
                <div className="text-muted-foreground">Moslashuvchan</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                <div className="text-muted-foreground">Qo'llab-quvvatlash</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">∞</div>
                <div className="text-muted-foreground">Imkoniyatlar</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TargetAudience;

