import React, { useEffect, useRef, useState } from 'react';
import { Check, Star, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { translations } from '../lib/translations';

const Pricing = ({ language }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [billingCycle, setBillingCycle] = useState('monthly');
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

  const plans = [
    {
      name: t.basic,
      price: t.basicPrice,
      yearlyPrice: "1,500,000 so'm/yil",
      features: t.basicFeatures,
      popular: false,
      color: 'border-border',
      buttonClass: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      delay: '0.1s'
    },
    {
      name: t.standard,
      price: t.standardPrice,
      yearlyPrice: "2,000,000 so'm/yil",
      features: t.standardFeatures,
      popular: true,
      color: 'border-primary shadow-lg shadow-primary/20',
      buttonClass: 'btn-primary',
      delay: '0.2s'
    },
    {
      name: t.pro,
      price: t.proPrice,
      yearlyPrice: "3,000,000 so'm/yil",
      features: t.proFeatures,
      popular: false,
      color: 'border-border',
      buttonClass: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      delay: '0.3s'
    }
  ];

  return (
    <section id="pricing" ref={sectionRef} className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {t.pricingTitle}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            {t.pricingSubtitle}
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4">
            <span className={`text-sm ${billingCycle === 'monthly' ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
              Oylik
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                billingCycle === 'yearly' ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                billingCycle === 'yearly' ? 'translate-x-8' : 'translate-x-1'
              }`}></div>
            </button>
            <span className={`text-sm ${billingCycle === 'yearly' ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
              Yillik
            </span>
            {billingCycle === 'yearly' && (
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                20% tejash
              </span>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-card border-2 ${plan.color} rounded-2xl p-8 ${
                plan.popular ? 'scale-105' : ''
              } hover-lift transition-all duration-300 ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: plan.delay }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-1">
                    <Star className="w-4 h-4" />
                    <span>Mashhur</span>
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">{plan.name}</h3>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-foreground">
                    {billingCycle === 'monthly' ? plan.price : plan.yearlyPrice}
                  </span>
                </div>
                <p className="text-muted-foreground">{t.freeTrialMonth}</p>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start space-x-3">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <Button className={`w-full ${plan.buttonClass} py-3`}>
                {plan.popular && <Zap className="w-4 h-4 mr-2" />}
                {t.choosePlan}
              </Button>

              {/* Background Decoration */}
              {plan.popular && (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl pointer-events-none"></div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Info */}
        <div className={`text-center mt-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.5s' }}>
          <div className="bg-card border border-border rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Barcha rejalar uchun
            </h3>
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm text-muted-foreground">SSL shifrlash</p>
              </div>
              <div>
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm text-muted-foreground">24/7 qo'llab-quvvatlash</p>
              </div>
              <div>
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm text-muted-foreground">Ma'lumotlar zaxirasi</p>
              </div>
              <div>
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm text-muted-foreground">API kirish</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;

