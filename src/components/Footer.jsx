import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Globe, Send } from 'lucide-react';
import { translations } from '../lib/translations';
import logoDark from '../assets/images/logo-dark.webp';
import logoLight from '../assets/images/logo-light.webp';

const InstagramIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
  </svg>
);

const FacebookIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const YoutubeIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const socialLinks = [
  { href: 'https://www.instagram.com/clientouz/', label: 'Instagram', Icon: InstagramIcon },
  { href: 'https://www.facebook.com/people/Cliento-CRM/61582755213337/', label: 'Facebook', Icon: FacebookIcon },
  { href: 'https://t.me/clientouz', label: 'Telegram', Icon: Send },
  { href: 'https://www.youtube.com/@clientouz', label: 'YouTube', Icon: YoutubeIcon },
];

const Footer = ({ language, setLanguage, isDarkMode }) => {
  const t = translations[language];

  const languages = [
    { code: 'uz', name: "O'zbekcha", flag: '\u{1F1FA}\u{1F1FF}' },
    { code: 'ru', name: '\u0420\u0443\u0441\u0441\u043A\u0438\u0439', flag: '\u{1F1F7}\u{1F1FA}' },
    { code: 'en', name: 'English', flag: '\u{1F1FA}\u{1F1F8}' }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* Mobile Layout */}
        <div className="md:hidden space-y-8">
          {/* Brand + Socials Row */}
          <div className="flex items-center justify-between">
            <img
              src={isDarkMode ? logoDark : logoLight}
              alt="Cliento"
              className="h-9 w-auto"
              width={160}
              height={64}
            />
            <div className="flex space-x-2">
              {socialLinks.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">
            {t.brandDescription}
          </p>

          {/* Navigation + Support in 2 columns */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">{t.navigation}</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => scrollToSection('features')}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                  >
                    {t.features}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('pricing')}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                  >
                    {t.pricing}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('faq')}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                  >
                    {t.faq}
                  </button>
                </li>
                <li>
                  <Link
                    to="/tutorial/dashboard"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                  >
                    {t.tutorial || "Qo'llanma"}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">{t.supportSection}</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="mailto:info@cliento.uz"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                  >
                    {t.contactSupport}
                  </a>
                </li>
                <li>
                  <a
                    href="https://t.me/cliento_support"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                  >
                    Telegram
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-2">
            <a href="mailto:info@cliento.uz" className="flex items-center space-x-3 text-sm text-muted-foreground hover:text-primary transition-colors">
              <Mail className="w-4 h-4 flex-shrink-0" />
              <span>info@cliento.uz</span>
            </a>
            <a href="tel:+998771147555" className="flex items-center space-x-3 text-sm text-muted-foreground hover:text-primary transition-colors">
              <Phone className="w-4 h-4 flex-shrink-0" />
              <span>+998 77 114 75 55</span>
            </a>
            <div className="flex items-center space-x-3 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span>Toshkent, O'zbekiston</span>
            </div>
          </div>

          {/* Language Switcher */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3 flex items-center">
              <Globe className="w-4 h-4 mr-2" />
              {t.chooseLang}
            </h4>
            <div className="flex gap-2">
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
                  <span className="text-base leading-none">{lang.flag}</span>
                  <span>{lang.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center">
              <img
                src={isDarkMode ? logoDark : logoLight}
                alt="Cliento"
                className="h-10 w-auto"
                width={160}
                height={64}
              />
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {t.brandDescription}
            </p>
            <div className="flex space-x-3">
              {socialLinks.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">{t.navigation}</h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection('features')}
                  className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                >
                  {t.features}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('pricing')}
                  className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                >
                  {t.pricing}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('faq')}
                  className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                >
                  {t.faq}
                </button>
              </li>
              <li>
                <Link
                  to="/tutorial/dashboard"
                  className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                >
                  {t.tutorial || "Qo'llanma"}
                </Link>
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
                  className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                >
                  {t.contactSupport}
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/cliento_support"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
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
                <a href="tel:+998771147555" className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors">
                  <Phone className="w-5 h-5" />
                  <span>+998 77 114 75 55</span>
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
                    <span className="text-base leading-none">{lang.flag}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 md:mt-12 pt-6 md:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            <div className="text-muted-foreground text-xs md:text-sm">
              &copy; {new Date().getFullYear()} Cliento CRM. {t.allRightsReserved}.
            </div>
            <div className="flex space-x-6 text-xs md:text-sm">
              <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                {t.privacy}
              </Link>
              <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                {t.terms}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
