'use client';

import Link from 'next/link';
import Script from 'next/script';
import { BookOpen } from 'lucide-react';
import { useLanguage } from '@/providers/LanguageProvider';
import {
  tutorialSections,
  tutorialGroups,
  tutorialTranslations,
} from '@/lib/tutorialData';
import TutorialLayout from '@/components/tutorial/TutorialLayout';

export function TutorialWelcomeClient() {
  const { language } = useLanguage();
  const t = tutorialTranslations[language];
  const groups = tutorialGroups[language];

  const mainSections = tutorialSections.filter((s) => s.group === 'main');
  const adminSections = tutorialSections.filter((s) => s.group === 'admin');

  const welcomeJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: t.pageTitle + ' — Cliento CRM',
    description: t.pageSubtitle,
    url: 'https://cliento.uz/tutorial',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Cliento CRM',
      url: 'https://cliento.uz',
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: tutorialSections.map((section, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: section[language].title,
        url: `https://cliento.uz/tutorial/${section.id}`,
      })),
    },
  };

  const renderCards = (sections) =>
    sections.map((section) => {
      const data = section[language];
      const Icon = section.icon;
      return (
        <Link
          key={section.id}
          href={`/tutorial/${section.id}`}
          className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all text-left group"
        >
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <div className="min-w-0">
            <div className="font-medium text-foreground">{data.title}</div>
            <div className="text-sm text-muted-foreground truncate">
              {data.shortDesc}
            </div>
          </div>
        </Link>
      );
    });

  return (
    <TutorialLayout activeId="">
      <Script
        id="tutorial-welcome-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(welcomeJsonLd) }}
      />

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
            <BookOpen className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            {t.pageTitle}
          </h1>
          <p className="text-muted-foreground text-lg">{t.pageSubtitle}</p>
        </div>

        <div className="mb-8">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
            {groups.main}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {renderCards(mainSections)}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
            {groups.admin}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {renderCards(adminSections)}
          </div>
        </div>
      </div>
    </TutorialLayout>
  );
}
