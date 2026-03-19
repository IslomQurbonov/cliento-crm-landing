import { TutorialWelcomeClient } from './TutorialWelcomeClient';

export function generateMetadata() {
  return {
    title: "Qo'llanma — Cliento CRM",
    description:
      "Cliento CRM tizimidan foydalanish bo'yicha batafsil qo'llanma. Dashboard, mijozlar, lidlar, vazifalar, bitimlar va boshqa barcha funksiyalarni o'rganing.",
    alternates: {
      canonical: 'https://cliento.uz/tutorial',
    },
    openGraph: {
      title: "Qo'llanma — Cliento CRM",
      description:
        "Cliento CRM tizimidan foydalanish bo'yicha batafsil qo'llanma.",
      url: 'https://cliento.uz/tutorial',
      siteName: 'Cliento CRM',
      type: 'website',
    },
  };
}

export default function TutorialPage() {
  return <TutorialWelcomeClient />;
}
