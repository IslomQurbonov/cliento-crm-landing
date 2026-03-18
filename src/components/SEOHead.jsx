import { Helmet } from "react-helmet-async";

const BASE_URL = "https://cliento.uz";

/**
 * SEOHead — har bir sahifa uchun dynamic meta taglar
 * @param {Object} props
 * @param {string} props.title - Sahifa sarlavhasi
 * @param {string} props.description - Meta description
 * @param {string} props.path - URL path (masalan /tutorial/clients)
 * @param {string} [props.image] - OG image URL
 * @param {string} [props.type] - OG type (default: website)
 * @param {Object} [props.jsonLd] - JSON-LD structured data
 * @param {string} [props.language] - Joriy til (uz, ru, en) — hrefLang uchun
 */
export default function SEOHead({ title, description, path, image, type = "website", jsonLd, language }) {
  const url = `${BASE_URL}${path}`;
  const ogImage = image || `${BASE_URL}/og-image.png`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* hrefLang — ko'p tilli sahifalar uchun */}
      <link rel="alternate" hrefLang="uz" href={url} />
      <link rel="alternate" hrefLang="ru" href={url} />
      <link rel="alternate" hrefLang="en" href={url} />
      <link rel="alternate" hrefLang="x-default" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Cliento CRM" />
      <meta property="og:locale" content={language === "ru" ? "ru_RU" : language === "en" ? "en_US" : "uz_UZ"} />
      {language !== "uz" && <meta property="og:locale:alternate" content="uz_UZ" />}
      {language !== "ru" && <meta property="og:locale:alternate" content="ru_RU" />}
      {language !== "en" && <meta property="og:locale:alternate" content="en_US" />}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* JSON-LD */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
}
