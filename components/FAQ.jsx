'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { translations } from '@/lib/translations';
import { useLanguage } from '@/providers/LanguageProvider';

const FAQ = () => {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [openItems, setOpenItems] = useState(new Set([0]));
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

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <section id="faq" ref={sectionRef} className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className={`text-center mb-16 ${isVisible ? 'opacity-0 animate-fade-in-up' : 'opacity-0'}`}>
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <HelpCircle className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {t.faqTitle}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {t.faqSubtitle}
          </p>
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto">
          {t.faqItems.map((item, index) => (
            <div
              key={index}
              className={`mb-4 ${isVisible ? 'opacity-0 animate-fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: `${0.1 * (index + 1)}s` }}
            >
              <div className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <button
                  onClick={() => toggleItem(index)}
                  className="cursor-pointer w-full px-8 py-6 text-left flex items-center justify-between hover:bg-muted/50 transition-colors duration-200"
                  aria-expanded={openItems.has(index)}
                >
                  <h3 className="text-lg font-semibold text-foreground pr-4">
                    {item.question}
                  </h3>
                  <div className="flex-shrink-0">
                    {openItems.has(index) ? (
                      <ChevronUp className="w-5 h-5 text-primary" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                </button>

                <div className={`overflow-hidden transition-all duration-300 ${
                  openItems.has(index) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-8 pb-6">
                    <div className="border-t border-border pt-4">
                      <p className="text-muted-foreground leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className={`text-center mt-16 ${isVisible ? 'opacity-0 animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.8s' }}>
          <div className="bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-2xl p-8 border border-primary/20 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              {t.moreQuestions}
            </h3>
            <p className="text-muted-foreground mb-6">
              {t.moreQuestionsDesc}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:info@cliento.uz"
                className="cursor-pointer bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors inline-block"
              >
                {t.contactSupport}
              </a>
              <a
                href="https://t.me/code_mode"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer border border-border px-6 py-3 rounded-lg font-semibold hover:bg-muted transition-colors inline-block"
              >
                {t.writeTelegram}
              </a>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className={`mt-16 ${isVisible ? 'opacity-0 animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '1s' }}>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">{t.avgResponseTime}</div>
              <div className="text-muted-foreground">{t.avgResponseTimeLabel}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">{t.professionalHelp}</div>
              <div className="text-muted-foreground">{t.professionalHelpLabel}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">{t.alwaysAvailable}</div>
              <div className="text-muted-foreground">{t.alwaysAvailableLabel}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
