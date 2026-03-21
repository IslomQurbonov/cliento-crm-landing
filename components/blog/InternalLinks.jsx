'use client';

/* ─────────────────────── InternalLinks ─────────────────────── */
/* Maqola ichida cross-article SEO linklar ko'rsatish.
   relatedSlugs asosida boshqa maqolalarga havolalar chiqaradi.  */

import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';
import { useLanguage } from '@/providers/LanguageProvider';
import {
  blogCategories,
  blogTranslations,
  getInternalLinks,
} from '@/lib/blogData';

export default function InternalLinks({ slug }) {
  const { language } = useLanguage();
  const blogT = blogTranslations[language] || blogTranslations.uz;
  const links = getInternalLinks(slug, language);

  if (!links || links.length === 0) return null;

  return (
    <div className="mt-10 mb-8 p-6 rounded-2xl bg-muted/50 border border-border">
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">
          {blogT.alsoRead}
        </h3>
      </div>
      <div className="space-y-3">
        {links.map((link) => {
          const category = blogCategories.find((c) => c.id === link.category);
          return (
            <Link
              key={link.slug}
              href={`/blog/${link.slug}`}
              className="group flex items-start gap-3 p-3 rounded-xl hover:bg-background transition-colors"
            >
              {category && (
                <span
                  className="shrink-0 mt-1 w-2 h-2 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
                  {link.title}
                </p>
                <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                  {link.description}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 shrink-0 mt-1 text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
