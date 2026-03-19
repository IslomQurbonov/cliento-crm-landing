'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Menu, X, Home } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useLanguage } from '@/providers/LanguageProvider';
import { tutorialTranslations } from '@/lib/tutorialData';
import TutorialSidebar from './TutorialSidebar';

export default function TutorialLayout({ children, activeId }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { resolvedTheme } = useTheme();
  const { language } = useLanguage();
  const router = useRouter();

  const isDarkMode = resolvedTheme === 'dark';
  const t = tutorialTranslations[language];

  const handleSelect = (id) => {
    router.push(`/tutorial/${id}`);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar */}
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-between h-14 px-4">
          <div className="flex items-center gap-3">
            {/* Mobile menu toggle */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            >
              {sidebarOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>

            <Link href="/" className="flex items-center gap-2">
              <Image
                src={isDarkMode ? '/images/logo-dark.webp' : '/images/logo-light.webp'}
                alt="Cliento"
                width={112}
                height={28}
                className="h-7 w-auto"
              />
            </Link>

            <span className="hidden sm:inline text-muted-foreground">/</span>
            <span className="hidden sm:inline text-sm font-medium text-foreground">
              {t.pageTitle}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors"
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">{t.backToHome}</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`
            fixed lg:sticky top-14 z-50 lg:z-10 h-[calc(100vh-3.5rem)]
            w-72 bg-background border-r border-border
            transition-transform duration-200
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}
        >
          <TutorialSidebar
            activeId={activeId}
            onSelect={handleSelect}
          />
        </aside>

        {/* Content */}
        <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
