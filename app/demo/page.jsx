import LandingContent from '@/components/LandingContent';

export const metadata = {
  title: "Bepul Demo Sinab Ko'ring",
  description:
    "Cliento CRM tizimini bepul sinab ko'ring. 5 daqiqada ro'yxatdan o'ting va o'z biznesingiz uchun CRM imkoniyatlarini tekshiring.",
  alternates: {
    canonical: 'https://cliento.uz/demo',
  },
  openGraph: {
    title: "Bepul Demo Sinab Ko'ring — Cliento CRM",
    description:
      "Cliento CRM tizimini bepul sinab ko'ring. 5 daqiqada ro'yxatdan o'ting va o'z biznesingiz uchun CRM imkoniyatlarini tekshiring.",
    url: 'https://cliento.uz/demo',
  },
};

export default function DemoPage() {
  return <LandingContent autoOpenDemo />;
}
