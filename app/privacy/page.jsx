import PrivacyContent from './PrivacyContent';

/* ─────────────────────── SEO Metadata ─────────────────────── */

export function generateMetadata() {
  return {
    title: 'Maxfiylik siyosati — Cliento CRM',
    description:
      "Cliento CRM platformasining maxfiylik siyosati va shaxsiy ma'lumotlarni himoya qilish qoidalari",
    alternates: {
      canonical: 'https://cliento.uz/privacy',
    },
    openGraph: {
      title: 'Maxfiylik siyosati — Cliento CRM',
      description:
        "Cliento CRM platformasining maxfiylik siyosati va shaxsiy ma'lumotlarni himoya qilish qoidalari",
      url: 'https://cliento.uz/privacy',
      siteName: 'Cliento CRM',
      type: 'website',
      locale: 'uz_UZ',
    },
    twitter: {
      card: 'summary',
      title: 'Maxfiylik siyosati — Cliento CRM',
      description:
        "Cliento CRM platformasining maxfiylik siyosati va shaxsiy ma'lumotlarni himoya qilish qoidalari",
    },
  };
}

/* ─────────────────────── Page (Server Component) ─────────── */

export default function PrivacyPage() {
  return <PrivacyContent />;
}
