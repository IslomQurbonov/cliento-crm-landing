import { blogPosts, blogTranslations } from '@/lib/blogData';
import BlogPostClient from './BlogPostClient';

/* ─────────────────────── Static Params ─────────────────────── */

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

/* ─────────────────────── SEO Metadata ─────────────────────── */

export function generateMetadata({ params }) {
  const { slug } = params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: 'Maqola topilmadi — Cliento Blog',
      description: 'Siz qidirayotgan maqola mavjud emas.',
    };
  }

  const postData = post.uz;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: postData.title,
    description: postData.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      '@type': 'Organization',
      name: post.author || 'Cliento',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Cliento CRM',
      logo: {
        '@type': 'ImageObject',
        url: 'https://cliento.uz/og-image.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://cliento.uz/blog/${post.slug}`,
    },
    image: post.coverImage,
    keywords: post.tags ? post.tags.join(', ') : undefined,
  };

  return {
    title: `${postData.title} — Cliento Blog`,
    description: postData.description,
    alternates: {
      canonical: `https://cliento.uz/blog/${post.slug}`,
    },
    openGraph: {
      title: postData.title,
      description: postData.description,
      url: `https://cliento.uz/blog/${post.slug}`,
      siteName: 'Cliento CRM',
      type: 'article',
      locale: 'uz_UZ',
      images: post.coverImage
        ? [{ url: post.coverImage, alt: postData.title }]
        : undefined,
      article: {
        publishedTime: post.publishedAt,
        modifiedTime: post.updatedAt || post.publishedAt,
        authors: [post.author || 'Cliento'],
        tags: post.tags,
      },
    },
    twitter: {
      card: 'summary_large_image',
      title: postData.title,
      description: postData.description,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
    other: {
      'script:ld+json': JSON.stringify(jsonLd),
    },
  };
}

/* ─────────────────────── Page (Server Component) ─────────── */

export default function BlogPostPage({ params }) {
  return <BlogPostClient slug={params.slug} />;
}
