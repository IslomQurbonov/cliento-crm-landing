import React from 'react';
import { Mail, Phone, MapPin, Globe, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { translations } from '../lib/translations';

const Footer = ({ language, setLanguage }) => {
  const t = translations[language];

  const languages = [
    { code: 'uz', name: 'O\'zbekcha', flag: '🇺🇿' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'en', name: 'English', flag: '🇺🇸' }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">C</span>
              </div>
              <span className="text-xl font-bold text-foreground">Cliento</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Kichik bizneslar uchun mo'ljallangan CRM tizimi. Mijozlaringizni boshqaring, statuslarni kuzating va biznesingizni avtomatlashtiring.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Navigatsiya</h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection('features')}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t.features}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('pricing')}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t.pricing}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('faq')}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t.faq}
                </button>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  {t.aboutUs}
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Qo'llab-quvvatlash</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Yordam markazi
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  {t.contact}
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  API hujjatlari
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Yangiliklar
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Aloqa</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <span className="text-muted-foreground">info@cliento.uz</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-muted-foreground" />
                <span className="text-muted-foreground">+998 90 123 45 67</span>
              </li>
              <li className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-muted-foreground" />
                <span className="text-muted-foreground">Toshkent, O'zbekiston</span>
              </li>
            </ul>

            {/* Language Switcher */}
            <div className="mt-6">
              <h4 className="text-sm font-medium text-foreground mb-3 flex items-center">
                <Globe className="w-4 h-4 mr-2" />
                Til tanlash
              </h4>
              <div className="flex flex-wrap gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                      language === lang.code 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-muted-foreground text-sm">
              © 2024 Cliento CRM. {t.allRightsReserved}.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                {t.privacy}
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                {t.terms}
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Cookie siyosati
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

