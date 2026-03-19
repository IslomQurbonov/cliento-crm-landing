'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Menu, X, Sun, Moon, Globe, BookOpen, Newspaper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { translations } from '@/lib/translations';
import { useLanguage } from '@/providers/LanguageProvider';
import { useTheme } from 'next-themes';
import { useDemoModal } from '@/providers/DemoModalProvider';
const logoDark = '/images/logo-dark.webp';
const logoLight = '/images/logo-light.webp';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { openDemoModal } = useDemoModal();
  const isDarkMode = resolvedTheme === 'dark';
  const t = translations[language];

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    setIsMenuOpen(false);
    if (pathname !== '/' && pathname !== '/demo') {
      router.push('/?scrollTo=' + sectionId);
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const languages = [
    { code: 'uz', name: "O'zbekcha", flag: '\u{1F1FA}\u{1F1FF}' },
    { code: 'ru', name: '\u0420\u0443\u0441\u0441\u043A\u0438\u0439', flag: '\u{1F1F7}\u{1F1FA}' },
    { code: 'en', name: 'English', flag: '\u{1F1FA}\u{1F1F8}' }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled || isMenuOpen ? 'bg-background/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center cursor-pointer">
            <img
              src={isDarkMode ? logoDark : logoLight}
              alt="Cliento"
              className="h-[45px] w-auto"
              width={160}
              height={64}
            />
          </a>

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
            <Link
              href="/blog"
              className="flex items-center gap-1.5 text-foreground hover:text-primary transition-colors duration-200"
            >
              <Newspaper className="w-4 h-4" />
              {t.blog || "Blog"}
            </Link>
            <Link
              href="/tutorial/dashboard"
              className="flex items-center gap-1.5 text-foreground hover:text-primary transition-colors duration-200"
            >
              <BookOpen className="w-4 h-4" />
              {t.tutorial || "Qo'llanma"}
            </Link>
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
                <span className="text-base leading-none">{languages.find(l => l.code === language)?.flag}</span>
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
                      <span className="text-base leading-none">{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
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
              <Link
                href="/blog"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 text-foreground hover:text-primary transition-colors duration-200"
              >
                <Newspaper className="w-4 h-4" />
                {t.blog || "Blog"}
              </Link>
              <Link
                href="/tutorial/dashboard"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 text-foreground hover:text-primary transition-colors duration-200"
              >
                <BookOpen className="w-4 h-4" />
                {t.tutorial || "Qo'llanma"}
              </Link>

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
                    <span className="text-base leading-none">{lang.flag}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>

              {/* Mobile Controls */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
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
