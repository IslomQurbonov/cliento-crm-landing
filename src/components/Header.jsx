import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Globe } from 'lucide-react';
import { Button } from './ui/button';
import { translations } from '../lib/translations';
import logoDark from '../assets/images/logo-dark.png';
import logoLight from '../assets/images/logo-light.png';

const Header = ({ language, setLanguage, isDarkMode, setIsDarkMode, openDemoModal }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const t = translations[language];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const languages = [
    { code: 'uz', name: 'O\'zbekcha', flagUrl: 'https://flagcdn.com/24x18/uz.png' },
    { code: 'ru', name: 'Русский', flagUrl: 'https://flagcdn.com/24x18/ru.png' },
    { code: 'en', name: 'English', flagUrl: 'https://flagcdn.com/24x18/us.png' }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-background/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src={isDarkMode ? logoDark : logoLight}
              alt="Cliento"
              className="h-[45px] w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('features')}
              className="cursor-pointer text-foreground hover:text-primary transition-colors duration-200"
            >
              {t.features}
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="cursor-pointer text-foreground hover:text-primary transition-colors duration-200"
            >
              {t.pricing}
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="cursor-pointer text-foreground hover:text-primary transition-colors duration-200"
            >
              {t.faq}
            </button>
          </nav>

          {/* Desktop Controls */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                onBlur={() => setTimeout(() => setIsLangOpen(false), 150)}
                aria-label={t.chooseLang}
                className="cursor-pointer flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors"
              >
                <Globe className="w-4 h-4" />
                <img src={languages.find(l => l.code === language)?.flagUrl} alt="" className="w-6 h-4 object-cover rounded-sm" />
              </button>
              {isLangOpen && (
                <div className="absolute top-full right-0 mt-2 min-w-[160px] bg-popover border border-border rounded-lg shadow-lg overflow-hidden">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsLangOpen(false);
                      }}
                      className={`cursor-pointer flex items-center space-x-3 px-4 py-2 text-sm hover:bg-muted transition-colors w-full text-left ${
                        language === lang.code ? 'bg-muted' : ''
                      }`}
                    >
                      <img src={lang.flagUrl} alt={lang.name} className="w-6 h-4 object-cover rounded-sm" />
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              aria-label={isDarkMode ? t.lightMode : t.darkMode}
              className="cursor-pointer p-2 rounded-lg hover:bg-muted transition-colors"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* CTA Button */}
            <Button onClick={openDemoModal} className="cursor-pointer btn-primary">
              {t.tryDemo}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? t.close : 'Menu'}
            className="cursor-pointer md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border">
            <nav className="flex flex-col space-y-4 mt-4">
              <button
                onClick={() => scrollToSection('features')}
                className="cursor-pointer text-left text-foreground hover:text-primary transition-colors duration-200"
              >
                {t.features}
              </button>
              <button
                onClick={() => scrollToSection('pricing')}
                className="cursor-pointer text-left text-foreground hover:text-primary transition-colors duration-200"
              >
                {t.pricing}
              </button>
              <button
                onClick={() => scrollToSection('faq')}
                className="cursor-pointer text-left text-foreground hover:text-primary transition-colors duration-200"
              >
                {t.faq}
              </button>

              {/* Mobile Language Switcher */}
              <div className="flex flex-wrap gap-2 pt-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`cursor-pointer flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                      language === lang.code ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'
                    }`}
                  >
                    <img src={lang.flagUrl} alt={lang.name} className="w-6 h-4 object-cover rounded-sm" />
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>

              {/* Mobile Controls */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="cursor-pointer flex items-center space-x-2 p-2 rounded-lg hover:bg-muted transition-colors"
                >
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  <span className="text-sm">{isDarkMode ? t.lightMode : t.darkMode}</span>
                </button>

                <Button onClick={openDemoModal} className="cursor-pointer btn-primary">
                  {t.tryDemo}
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
