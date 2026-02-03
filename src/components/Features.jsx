import React, { useEffect, useRef, useState } from 'react';
import { 
  Users, 
  BarChart3, 
  Settings, 
  Bell, 
  MessageCircle, 
  Zap,
  Database,
  CheckCircle
} from 'lucide-react';
import { translations } from '../lib/translations';

const Features = ({ language }) => {
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
      icon: MessageCircle,
      title: t.telegramIntegration,
      description: t.telegramIntegrationDesc,
      color: 'bg-cyan-500',
      delay: '0.5s'
    },
    {
      icon: Zap,
      title: t.automation,
      description: t.automationDesc,
      color: 'bg-pink-500',
      delay: '0.6s'
    }
  ];

  return (
    <section id="features" ref={sectionRef} className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {t.featuresTitle}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {t.featuresSubtitle}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className={`group relative bg-card border border-border rounded-2xl p-8 hover-lift transition-all duration-300 ${
                  isVisible ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: feature.delay }}
              >
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Icon */}
                <div className={`relative w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <div className="relative">
                  <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Hover Effect */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.8s' }}>
          <div className="bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-2xl p-8 border border-primary/20">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Barcha funksiyalarni sinab ko'ring
            </h3>
            <p className="text-muted-foreground mb-6">
              Cliento CRM ning to'liq imkoniyatlarini bepul demo rejimida kashf eting
            </p>
            <button className="btn-primary px-8 py-3 rounded-lg font-semibold hover-lift">
              Demo boshlash
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;

