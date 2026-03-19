'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import {
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  ImageOff,
  BookOpen,
} from 'lucide-react';
import { useLanguage } from '@/providers/LanguageProvider';
import {
  tutorialSections,
  tutorialTranslations,
} from '@/lib/tutorialData';
import TutorialLayout from '@/components/tutorial/TutorialLayout';

export function TutorialSectionClient({ sectionId }) {
  const { language } = useLanguage();
  const t = tutorialTranslations[language];

  const sectionIndex = tutorialSections.findIndex((s) => s.id === sectionId);
  const section = tutorialSections[sectionIndex];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [sectionId]);

  if (!section) {
    return (
      <TutorialLayout activeId="">
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <BookOpen className="w-16 h-16 text-muted-foreground/30 mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">
            {language === 'uz'
              ? "Bo'lim topilmadi"
              : language === 'ru'
                ? 'Раздел не найден'
                : 'Section not found'}
          </h2>
          <Link
            href="/tutorial/dashboard"
            className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90 transition-colors"
          >
            {t.backToHome}
          </Link>
        </div>
      </TutorialLayout>
    );
  }

  const data = section[language];
  const Icon = section.icon;
  const prevSection =
    sectionIndex > 0 ? tutorialSections[sectionIndex - 1] : null;
  const nextSection =
    sectionIndex < tutorialSections.length - 1
      ? tutorialSections[sectionIndex + 1]
      : null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: data.title,
    description: data.description,
    url: `https://cliento.uz/tutorial/${section.id}`,
    image: section.screenshots?.[0]
      ? `https://cliento.uz/tutorial/${section.screenshots[0]}`
      : 'https://cliento.uz/og-image.png',
    ...(data.steps?.length > 0 && {
      step: data.steps.map((step, i) => ({
        '@type': 'HowToStep',
        position: i + 1,
        name: step.title,
        text: step.text,
      })),
    }),
    isPartOf: {
      '@type': 'WebPage',
      name: "Cliento CRM Qo'llanma",
      url: 'https://cliento.uz/tutorial',
    },
  };

  return (
    <TutorialLayout activeId={sectionId}>
      <Script
        id={`tutorial-section-${sectionId}-jsonld`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Icon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                {data.title}
              </h1>
              <p className="text-muted-foreground">{data.shortDesc}</p>
            </div>
          </div>
          <p className="text-foreground/80 leading-relaxed mt-4">
            {data.description}
          </p>
        </div>

        {/* Main Screenshot */}
        {section.screenshots?.[0] && (
          <div className="mb-8 rounded-xl overflow-hidden border border-border bg-muted/30">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/tutorial/${section.screenshots[0]}`}
              alt={data.title}
              className="w-full h-auto"
              onError={(e) => {
                e.target.style.display = 'none';
                const fallback = e.target.nextElementSibling;
                if (fallback) fallback.style.display = 'flex';
              }}
            />
            <div className="hidden items-center justify-center py-20 text-muted-foreground/50 flex-col gap-2">
              <ImageOff className="w-10 h-10" />
              <span className="text-sm">{t.noScreenshot}</span>
            </div>
          </div>
        )}

        {/* Steps */}
        {data.steps?.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              {t.steps}
            </h2>
            <div className="space-y-4">
              {data.steps.map((step, i) => (
                <div
                  key={i}
                  className="flex gap-4 p-4 rounded-xl bg-card border border-border"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Additional screenshots */}
        {section.screenshots?.length > 1 && (
          <div className="mb-8 grid gap-4 grid-cols-1 md:grid-cols-2">
            {section.screenshots.slice(1).map((src, i) => (
              <div
                key={i}
                className="rounded-xl overflow-hidden border border-border bg-muted/30"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/tutorial/${src}`}
                  alt={`${data.title} - ${i + 2}`}
                  className="w-full h-auto"
                  onError={(e) => {
                    const parent = e.target.parentElement;
                    if (parent) parent.style.display = 'none';
                  }}
                />
              </div>
            ))}
          </div>
        )}

        {/* Tips */}
        {data.tips?.length > 0 && (
          <div className="mb-8 p-5 rounded-xl bg-primary/5 border border-primary/10">
            <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-primary" />
              {t.tips}
            </h2>
            <ul className="space-y-2">
              {data.tips.map((tip, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-foreground/80"
                >
                  <span className="text-primary mt-0.5">&#8226;</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Prev / Next navigation */}
        <div className="flex items-center justify-between pt-6 border-t border-border mt-8">
          {prevSection ? (
            <Link
              href={`/tutorial/${prevSection.id}`}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm bg-muted hover:bg-muted/80 text-foreground transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <div className="text-left">
                <div className="text-xs text-muted-foreground">
                  {t.prevSection}
                </div>
                <div className="font-medium">
                  {prevSection[language].title}
                </div>
              </div>
            </Link>
          ) : (
            <div />
          )}
          {nextSection ? (
            <Link
              href={`/tutorial/${nextSection.id}`}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm bg-muted hover:bg-muted/80 text-foreground transition-colors"
            >
              <div className="text-right">
                <div className="text-xs text-muted-foreground">
                  {t.nextSection}
                </div>
                <div className="font-medium">
                  {nextSection[language].title}
                </div>
              </div>
              <ChevronRight className="w-4 h-4" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </TutorialLayout>
  );
}
