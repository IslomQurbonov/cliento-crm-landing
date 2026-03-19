import { blogTranslations } from '@/lib/blogData';
import BlogListingClient from './BlogListingClient';

/* ─────────────────────── SEO Metadata ─────────────────────── */

export function generateMetadata() {
  const blogT = blogTranslations.uz;

  return {
    title: `${blogT.pageTitle} — Cliento CRM`,
    description: blogT.pageDescription,
    alternates: {
      canonical: 'https://cliento.uz/blog',
    },
    openGraph: {
      title: `${blogT.pageTitle} — Cliento CRM`,
      description: blogT.pageDescription,
      url: 'https://cliento.uz/blog',
      siteName: 'Cliento CRM',
      type: 'website',
      locale: 'uz_UZ',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${blogT.pageTitle} — Cliento CRM`,
      description: blogT.pageDescription,
    },
    other: {
      'script:ld+json': JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: blogT.pageTitle,
        description: blogT.pageDescription,
        url: 'https://cliento.uz/blog',
        isPartOf: {
          '@type': 'WebSite',
          name: 'Cliento CRM',
          url: 'https://cliento.uz',
        },
      }),
    },
  };
}

/* ─────────────────────── Page (Server Component) ─────────── */

export default function BlogPage() {
  return <BlogListingClient />;
}
