'use client';

import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { useLanguage } from '@/providers/LanguageProvider';
import {
  tutorialSections,
  tutorialGroups,
  tutorialTranslations,
} from '@/lib/tutorialData';

export default function TutorialSidebar({ activeId, onSelect }) {
  const { language } = useLanguage();
  const [search, setSearch] = useState('');

  const t = tutorialTranslations[language];
  const groups = tutorialGroups[language];

  const filtered = useMemo(() => {
    if (!search.trim()) return tutorialSections;
    const q = search.toLowerCase();
    return tutorialSections.filter((s) => {
      const data = s[language];
      return (
        data.title.toLowerCase().includes(q) ||
        data.shortDesc.toLowerCase().includes(q)
      );
    });
  }, [search, language]);

  const mainSections = filtered.filter((s) => s.group === 'main');
  const adminSections = filtered.filter((s) => s.group === 'admin');

  const renderGroup = (label, sections) => {
    if (sections.length === 0) return null;
    return (
      <div className="mb-4">
        <h3 className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </h3>
        <ul className="space-y-0.5">
          {sections.map((section) => {
            const data = section[language];
            const Icon = section.icon;
            const isActive = section.id === activeId;
            return (
              <li key={section.id}>
                <button
                  onClick={() => onSelect(section.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors text-left cursor-pointer ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="font-medium truncate">{data.title}</div>
                    <div
                      className={`text-xs truncate hidden lg:block ${
                        isActive
                          ? 'text-primary-foreground/70'
                          : 'text-muted-foreground/70'
                      }`}
                    >
                      {data.shortDesc}
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col">
      {/* Search */}
      <div className="p-3 border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-9 pr-3 py-2 text-sm bg-muted rounded-lg border-none outline-none focus:ring-2 focus:ring-primary/30 text-foreground placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Sections */}
      <div className="flex-1 overflow-y-auto p-2">
        {renderGroup(groups.main, mainSections)}
        {renderGroup(groups.admin, adminSections)}
        {filtered.length === 0 && (
          <p className="text-center text-sm text-muted-foreground py-8">
            {language === 'uz'
              ? 'Hech narsa topilmadi'
              : language === 'ru'
                ? 'Ничего не найдено'
                : 'Nothing found'}
          </p>
        )}
      </div>
    </div>
  );
}
