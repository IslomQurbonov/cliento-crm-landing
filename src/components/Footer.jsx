import React from 'react';
import { Mail, Phone, MapPin, Globe, Send } from 'lucide-react';
import { translations } from '../lib/translations';
import logoDark from '../assets/images/logo-dark.png';
import logoLight from '../assets/images/logo-light.png';

const Footer = ({ language, setLanguage, isDarkMode }) => {
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
            <div className="flex items-center">
              <img
                src={isDarkMode ? logoDark : logoLight}
                alt="Cliento"
                className="h-10 w-auto"
              />
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {t.brandDescription}
            </p>
            <div className="flex space-x-4">
              <a
                href="https://t.me/cliento_uz"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Telegram"
              >
                <Send className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">{t.navigation}</h3>
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
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">{t.supportSection}</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:info@cliento.uz"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t.contactSupport}
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/cliento_support"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Telegram
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">{t.contactSection}</h3>
            <ul className="space-y-3">
              <li>
                <a href="mailto:info@cliento.uz" className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors">
                  <Mail className="w-5 h-5" />
                  <span>info@cliento.uz</span>
                </a>
              </li>
              <li>
                <a href="tel:+998901234567" className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors">
                  <Phone className="w-5 h-5" />
                  <span>+998 90 123 45 67</span>
                </a>
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
                {t.chooseLang}
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
              &copy; {new Date().getFullYear()} Cliento CRM. {t.allRightsReserved}.
            </div>
            <div className="flex space-x-6 text-sm">
              <span className="text-muted-foreground">
                {t.privacy}
              </span>
              <span className="text-muted-foreground">
                {t.terms}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
