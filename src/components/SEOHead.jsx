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
 */
export default function SEOHead({ title, description, path, image, type = "website", jsonLd }) {
  const url = `${BASE_URL}${path}`;
  const ogImage = image || `${BASE_URL}/og-image.png`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Cliento CRM" />
      <meta property="og:locale" content="uz_UZ" />

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
