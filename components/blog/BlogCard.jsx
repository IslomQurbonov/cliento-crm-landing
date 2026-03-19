'use client';

import Link from 'next/link';
import { Calendar, Clock, User } from 'lucide-react';
import { useLanguage } from '@/providers/LanguageProvider';
import {
  blogCategories,
  blogTranslations,
  calculateReadingTime,
} from '@/lib/blogData';

/* ─────────────────────── helpers ─────────────────────── */

function formatDate(dateStr) {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

/* ─────────────────────── BlogCard ─────────────────────── */

export default function BlogCard({ post }) {
  const { language } = useLanguage();
  const blogT = blogTranslations[language] || blogTranslations.uz;
  const postData = post[language] || post.uz;
  const category = blogCategories.find((c) => c.id === post.category);
  const categoryName = category ? category[language] || category.uz : '';
  const readingTime = calculateReadingTime(postData.content);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block bg-card border border-border rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1"
    >
      {/* Cover image */}
      <div className="aspect-video overflow-hidden">
        <img
          src={post.coverImage}
          alt={postData.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category badge */}
        {category && (
          <span
            className="inline-block px-3 py-1 text-xs font-medium rounded-full mb-3"
            style={{
              backgroundColor: `${category.color}20`,
              color: category.color,
            }}
          >
            {categoryName}
          </span>
        )}

        {/* Title */}
        <h2 className="text-lg font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {postData.title}
        </h2>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {postData.description}
        </p>

        {/* Footer */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <User className="w-3.5 h-3.5" />
            {post.author}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {formatDate(post.publishedAt)}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {readingTime} {blogT.readingTimeUnit}
          </span>
        </div>
      </div>
    </Link>
  );
}
