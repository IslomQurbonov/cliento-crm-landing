import TermsContent from './TermsContent';

/* ─────────────────────── SEO Metadata ─────────────────────── */

export function generateMetadata() {
  return {
    title: 'Foydalanish shartlari — Cliento CRM',
    description:
      "Cliento CRM platformasidan foydalanish shartlari va qoidalari",
    alternates: {
      canonical: 'https://cliento.uz/terms',
    },
    openGraph: {
      title: 'Foydalanish shartlari — Cliento CRM',
      description:
        "Cliento CRM platformasidan foydalanish shartlari va qoidalari",
      url: 'https://cliento.uz/terms',
      siteName: 'Cliento CRM',
      type: 'website',
      locale: 'uz_UZ',
    },
    twitter: {
      card: 'summary',
      title: 'Foydalanish shartlari — Cliento CRM',
      description:
        "Cliento CRM platformasidan foydalanish shartlari va qoidalari",
    },
  };
}

/* ─────────────────────── Page (Server Component) ─────────── */

export default function TermsPage() {
  return <TermsContent />;
}
