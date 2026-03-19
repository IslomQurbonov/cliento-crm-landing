/** @type {import('next').NextConfig} */
const nextConfig = {
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.googletagmanager.com https://*.google-analytics.com https://mc.yandex.ru https://yastatic.net https://mc.yandex.az",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https: blob:",
              "font-src 'self' data:",
              "connect-src 'self' https://api.cliento.uz https://api.crmcha.uz https://*.google-analytics.com https://*.googletagmanager.com https://mc.yandex.ru wss://mc.yandex.ru https://mc.yandex.az wss://mc.yandex.az",
              "frame-src https://*.googletagmanager.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join('; '),
          },
        ],
      },
    ];
  },

  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cliento.uz',
      },
    ],
  },

  // Redirect /demo to /?demo=true (client-side modal handling)
  async redirects() {
    return [];
  },

  // Proxy API requests to backend (avoids CORS & CSP issues)
  async rewrites() {
    const apiUrl = process.env.API_URL || 'http://localhost:4010';
    return [
      {
        source: '/api/:path*',
        destination: `${apiUrl}/api/:path*`,
      },
    ];
  },

  poweredByHeader: false,
};

export default nextConfig;
