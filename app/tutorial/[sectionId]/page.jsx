import { tutorialSections } from '@/lib/tutorialData';
import { TutorialSectionClient } from './TutorialSectionClient';

export function generateStaticParams() {
  return tutorialSections.map((section) => ({
    sectionId: section.id,
  }));
}

export async function generateMetadata({ params }) {
  const { sectionId } = await params;
  const section = tutorialSections.find((s) => s.id === sectionId);

  if (!section) {
    return {
      title: "Bo'lim topilmadi — Cliento CRM",
    };
  }

  const data = section.uz;
  const title = `${data.title} — Cliento CRM Qo'llanma`;
  const description =
    data.description.length > 160
      ? data.description.slice(0, 157) + '...'
      : data.description;
  const image = section.screenshots?.[0]
    ? `https://cliento.uz/tutorial/${section.screenshots[0]}`
    : 'https://cliento.uz/og-image.png';

  return {
    title,
    description,
    alternates: {
      canonical: `https://cliento.uz/tutorial/${sectionId}`,
    },
    openGraph: {
      title,
      description,
      url: `https://cliento.uz/tutorial/${sectionId}`,
      siteName: 'Cliento CRM',
      type: 'article',
      images: [{ url: image }],
    },
  };
}

export default async function TutorialSectionPage({ params }) {
  const { sectionId } = await params;
  return <TutorialSectionClient sectionId={sectionId} />;
}
