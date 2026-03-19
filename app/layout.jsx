import './globals.css';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { LanguageProvider } from '@/providers/LanguageProvider';
import { DemoModalProvider } from '@/providers/DemoModalProvider';
import Script from 'next/script';

export const metadata = {
  metadataBase: new URL('https://cliento.uz'),
  title: {
    default: 'Cliento CRM - Mijozlaringizni nazoratda saqlang | CRM tizimi',
    template: '%s | Cliento CRM',
  },
  description:
    'Cliento CRM - kichik bizneslar uchun mijozlar munosabatlarini boshqarish tizimi. Mijozlar bazasi, statuslar, eslatmalar, Telegram integratsiyasi. Bepul sinab ko\'ring!',
  keywords: [
    'CRM',
    'CRM tizimi',
    'mijozlar boshqarish',
    'kichik biznes CRM',
    'Cliento',
    'Uzbekistan CRM',
    'mijozlar bazasi',
    'biznes avtomatlashtirish',
    'Telegram CRM',
  ],
  authors: [{ name: 'Cliento' }],
  creator: 'Cliento',
  openGraph: {
    type: 'website',
    locale: 'uz_UZ',
    url: 'https://cliento.uz',
    siteName: 'Cliento CRM',
    title: 'Cliento CRM - Mijozlaringizni nazoratda saqlang',
    description:
      'Kichik bizneslar uchun CRM tizimi. Mijozlar bazasi, statuslar, eslatmalar va Telegram integratsiyasi.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Cliento CRM',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cliento CRM - Mijozlaringizni nazoratda saqlang',
    description:
      'Kichik bizneslar uchun CRM tizimi. Mijozlar bazasi, statuslar, eslatmalar va Telegram integratsiyasi.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://cliento.uz',
    languages: {
      uz: 'https://cliento.uz',
      ru: 'https://cliento.uz',
      en: 'https://cliento.uz',
      'x-default': 'https://cliento.uz',
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/site.webmanifest',
  other: {
    'msapplication-TileImage': '/android-chrome-192x192.png',
    'msapplication-TileColor': '#2563eb',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Cliento CRM',
  url: 'https://cliento.uz',
  description:
    'Kichik bizneslar uchun mijozlar munosabatlarini boshqarish (CRM) tizimi',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  image: 'https://cliento.uz/og-image.png',
  logo: 'https://cliento.uz/android-chrome-512x512.png',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'UZS',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Cliento',
    url: 'https://cliento.uz',
    logo: {
      '@type': 'ImageObject',
      url: 'https://cliento.uz/android-chrome-512x512.png',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+998-77-114-75-55',
      contactType: 'customer support',
      email: 'info@cliento.uz',
      availableLanguage: ['uz', 'ru', 'en'],
    },
    sameAs: [
      'https://www.instagram.com/clientouz/',
      'https://www.facebook.com/people/Cliento-CRM/61582755213337/',
      'https://t.me/clientouz',
      'https://www.youtube.com/@clientouz',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Toshkent',
      addressCountry: 'UZ',
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="uz" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#2563eb" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link
          rel="preconnect"
          href="https://www.googletagmanager.com"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PQP3D9DZ"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        <ThemeProvider>
          <LanguageProvider>
            <DemoModalProvider>
              {children}
            </DemoModalProvider>
          </LanguageProvider>
        </ThemeProvider>

        {/* Google Tag Manager */}
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-PQP3D9DZ');`}
        </Script>
      </body>
    </html>
  );
}
