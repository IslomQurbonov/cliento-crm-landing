import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Globe } from 'lucide-react';
import { Button } from './ui/button';
import { translations } from '../lib/translations';

const Header = ({ language, setLanguage, isDarkMode, setIsDarkMode, openDemoModal }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
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
    { code: 'uz', name: 'O\'zbekcha', flag: '🇺🇿' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'en', name: 'English', flag: '🇺🇸' }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-background/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">C</span>
            </div>
            <span className="text-xl font-bold text-foreground">Cliento</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('features')}
              className="text-foreground hover:text-primary transition-colors duration-200"
            >
              {t.features}
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="text-foreground hover:text-primary transition-colors duration-200"
            >
              {t.pricing}
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-foreground hover:text-primary transition-colors duration-200"
            >
              {t.faq}
            </button>
          </nav>

          {/* Desktop Controls */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="relative group">
              <button className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors">
                <Globe className="w-4 h-4" />
                <span className="text-sm">{languages.find(l => l.code === language)?.flag}</span>
              </button>
              <div className="absolute top-full right-0 mt-2 bg-popover border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`flex items-center space-x-3 px-4 py-2 text-sm hover:bg-muted transition-colors w-full text-left ${
                      language === lang.code ? 'bg-muted' : ''
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* CTA Button */}
            <Button onClick={openDemoModal} className="btn-primary">
              {t.tryDemo}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
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
                className="text-left text-foreground hover:text-primary transition-colors duration-200"
              >
                {t.features}
              </button>
              <button
                onClick={() => scrollToSection('pricing')}
                className="text-left text-foreground hover:text-primary transition-colors duration-200"
              >
                {t.pricing}
              </button>
              <button
                onClick={() => scrollToSection('faq')}
                className="text-left text-foreground hover:text-primary transition-colors duration-200"
              >
                {t.faq}
              </button>
              
              {/* Mobile Language Switcher */}
              <div className="flex flex-wrap gap-2 pt-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                      language === lang.code ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>

              {/* Mobile Controls */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted transition-colors"
                >
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  <span className="text-sm">{isDarkMode ? 'Light' : 'Dark'}</span>
                </button>
                
                <Button onClick={openDemoModal} className="btn-primary">
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

