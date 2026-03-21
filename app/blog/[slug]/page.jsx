import { blogPosts } from '@/lib/blogData';
import BlogPostClient from './BlogPostClient';

/* ─────────────────────── Static Params ─────────────────────── */

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

/* ─────────────────────── SEO Metadata ─────────────────────── */

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: 'Maqola topilmadi — Cliento Blog',
      description: 'Siz qidirayotgan maqola mavjud emas.',
    };
  }

  const postData = post.uz;

  /* ── BlogPosting Schema ── */
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: postData.title,
    description: postData.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      '@type': 'Organization',
      name: post.author || 'Cliento',
      url: 'https://cliento.uz',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Cliento CRM',
      url: 'https://cliento.uz',
      logo: {
        '@type': 'ImageObject',
        url: 'https://cliento.uz/og-image.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://cliento.uz/blog/${post.slug}`,
    },
    image: post.coverImage
      ? `https://cliento.uz${post.coverImage}`
      : 'https://cliento.uz/og-image.png',
    keywords: post.tags ? post.tags.join(', ') : undefined,
    inLanguage: 'uz',
    wordCount: countWords(postData.content),
  };

  /* ── FAQPage Schema (agar FAQ bo'limi bo'lsa) ── */
  const faqItems = extractFAQ(postData.content);
  const schemas = [blogPostingSchema];

  if (faqItems.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    });
  }

  return {
    title: `${postData.title} — Cliento Blog`,
    description: postData.description,
    alternates: {
      canonical: `https://cliento.uz/blog/${post.slug}`,
      languages: {
        'uz': `https://cliento.uz/blog/${post.slug}`,
        'ru': `https://cliento.uz/blog/${post.slug}`,
        'en': `https://cliento.uz/blog/${post.slug}`,
      },
    },
    openGraph: {
      title: postData.title,
      description: postData.description,
      url: `https://cliento.uz/blog/${post.slug}`,
      siteName: 'Cliento CRM',
      type: 'article',
      locale: 'uz_UZ',
      images: post.coverImage
        ? [{ url: `https://cliento.uz${post.coverImage}`, alt: postData.title, width: 1200, height: 630 }]
        : undefined,
      article: {
        publishedTime: post.publishedAt,
        modifiedTime: post.updatedAt || post.publishedAt,
        authors: [post.author || 'Cliento'],
        tags: post.tags,
        section: post.category,
      },
    },
    twitter: {
      card: 'summary_large_image',
      title: postData.title,
      description: postData.description,
      images: post.coverImage
        ? [`https://cliento.uz${post.coverImage}`]
        : undefined,
    },
    other: {
      'script:ld+json': JSON.stringify(schemas.length === 1 ? schemas[0] : schemas),
    },
  };
}

/* ─────────────────────── Page (Server Component) ─────────── */

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  return <BlogPostClient slug={slug} />;
}

/* ─────────────────────── Helpers ─────────────────────── */

/**
 * Content bloklardan FAQ ni ajratib olish.
 * Pattern: h3 savol → keyingi paragraph javob
 */
function extractFAQ(content) {
  if (!content || !Array.isArray(content)) return [];

  const faqs = [];
  let inFaqSection = false;

  for (let i = 0; i < content.length; i++) {
    const block = content[i];

    // FAQ bo'limi boshlanishini aniqlash
    if (
      block.type === 'heading' &&
      block.level === 2 &&
      (block.text.toLowerCase().includes('savol') ||
        block.text.toLowerCase().includes('faq') ||
        block.text.toLowerCase().includes('вопрос') ||
        block.text.toLowerCase().includes('question'))
    ) {
      inFaqSection = true;
      continue;
    }

    // FAQ bo'limidagi h3 = savol, keyingi paragraph = javob
    if (inFaqSection && block.type === 'heading' && block.level === 3) {
      // "Xulosa" yoki "Заключение" yoki "Conclusion" bo'lsa FAQ tugaydi
      if (
        block.text.toLowerCase().includes('xulosa') ||
        block.text.toLowerCase().includes('заключение') ||
        block.text.toLowerCase().includes('conclusion')
      ) {
        inFaqSection = false;
        continue;
      }

      const nextBlock = content[i + 1];
      if (nextBlock && nextBlock.type === 'paragraph') {
        faqs.push({
          question: block.text,
          answer: nextBlock.text,
        });
      }
    }

    // Yangi h2 bo'lsa FAQ bo'limi tugaydi
    if (inFaqSection && block.type === 'heading' && block.level === 2) {
      inFaqSection = false;
    }
  }

  return faqs;
}

/**
 * Content bloklardan so'zlar sonini hisoblash
 */
function countWords(content) {
  if (!content || !Array.isArray(content)) return 0;
  let count = 0;
  for (const block of content) {
    if (block.text) count += block.text.split(/\s+/).filter(Boolean).length;
    if (block.items) {
      for (const item of block.items) {
        count += item.split(/\s+/).filter(Boolean).length;
      }
    }
  }
  return count;
}
