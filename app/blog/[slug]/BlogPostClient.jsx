'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Tag,
  Share2,
  Newspaper,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useLanguage } from '@/providers/LanguageProvider';
import {
  blogPosts,
  blogCategories,
  blogTranslations,
  calculateReadingTime,
  getRelatedPosts,
} from '@/lib/blogData';
import BlogHeader from '@/components/blog/BlogHeader';
import BlogCard from '@/components/blog/BlogCard';
import ContentRenderer from '@/components/blog/ContentRenderer';
import InternalLinks from '@/components/blog/InternalLinks';
import Footer from '@/components/Footer';

/* ─────────────────────── helpers ─────────────────────── */

function formatDate(dateStr) {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

/* ─────────────────────── BlogPostClient ─────────────────────── */

export default function BlogPostClient({ slug }) {
  const { language } = useLanguage();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDarkMode = mounted ? resolvedTheme === 'dark' : false;
  const blogT = blogTranslations[language] || blogTranslations.uz;
  const [copied, setCopied] = useState(false);

  const post = useMemo(
    () => blogPosts.find((p) => p.slug === slug),
    [slug]
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  // Share / copy URL
  const handleShare = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const textarea = document.createElement('textarea');
      textarea.value = url;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // 404
  if (!post) {
    return (
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border">
          <div className="max-w-7xl mx-auto flex items-center justify-between h-14 px-4">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src={isDarkMode ? '/images/logo-dark.webp' : '/images/logo-light.webp'}
                alt="Cliento"
                width={112}
                height={28}
                className="h-7 w-auto"
                priority
              />
            </Link>
          </div>
        </header>
        <div className="flex-1 flex flex-col items-center justify-center py-20 text-center px-4">
          <Newspaper className="w-20 h-20 text-muted-foreground/30 mb-6" />
          <h1 className="text-2xl font-bold text-foreground mb-3">
            {blogT.postNotFound}
          </h1>
          <p className="text-muted-foreground mb-6">{blogT.postNotFoundDesc}</p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {blogT.backToBlog}
          </Link>
        </div>
      </div>
    );
  }

  const postData = post[language] || post.uz;
  const category = blogCategories.find((c) => c.id === post.category);
  const categoryName = category ? category[language] || category.uz : '';
  const readingTime = calculateReadingTime(postData.content);
  const relatedPosts = getRelatedPosts(post.slug, 3);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Header */}
      <BlogHeader showBackToBlog={true} blogT={blogT} />

      {/* Article */}
      <main className="flex-1">
        <article className="max-w-3xl mx-auto px-4 py-10 md:py-16">
          {/* Cover image */}
          {post.coverImage && (
            <div className="mb-8 -mx-4 md:mx-0">
              <img
                src={post.coverImage}
                alt={postData.title}
                className="w-full rounded-none md:rounded-2xl object-cover max-h-[480px]"
              />
            </div>
          )}

          {/* Title */}
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
              {postData.title}
            </h1>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-3 mb-10 text-sm text-muted-foreground">
              {/* Category */}
              {category && (
                <span
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: `${category.color}20`,
                    color: category.color,
                  }}
                >
                  {categoryName}
                </span>
              )}

              <span className="flex items-center gap-1">
                <User className="w-4 h-4" />
                {post.author}
              </span>

              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDate(post.publishedAt)}
              </span>

              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {readingTime} {blogT.readingTimeUnit}
              </span>

              {/* Share button */}
              <button
                onClick={handleShare}
                className="cursor-pointer flex items-center gap-1 px-3 py-1 rounded-full bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors ml-auto"
              >
                <Share2 className="w-4 h-4" />
                <span>{copied ? blogT.copied : blogT.share}</span>
              </button>
            </div>

            {/* Content */}
            <div className="prose-like">
              <ContentRenderer blocks={postData.content} />
            </div>

            {/* Internal cross-article links (SEO) */}
            <InternalLinks slug={post.slug} />

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-border">
                <div className="flex items-center gap-2 flex-wrap">
                  <Tag className="w-4 h-4 text-muted-foreground" />
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 pb-16">
            <div className="border-t border-border pt-12">
              <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
                {blogT.relatedPosts}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map((relPost) => (
                  <BlogCard key={relPost.slug} post={relPost} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
