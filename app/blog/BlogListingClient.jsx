'use client';

import { useState, useMemo } from 'react';
import { Newspaper } from 'lucide-react';
import { useLanguage } from '@/providers/LanguageProvider';
import {
  blogPosts,
  blogCategories,
  blogTranslations,
  getPostsByCategory,
} from '@/lib/blogData';
import BlogHeader from '@/components/blog/BlogHeader';
import BlogCard from '@/components/blog/BlogCard';
import Footer from '@/components/Footer';

/* ─────────────────────── BlogListingClient ─────────────────── */

export default function BlogListingClient() {
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');
  const blogT = blogTranslations[language] || blogTranslations.uz;

  const filteredPosts = useMemo(() => {
    if (activeCategory === 'all') return blogPosts;
    return getPostsByCategory(activeCategory);
  }, [activeCategory]);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Header */}
      <BlogHeader showBackToBlog={false} blogT={blogT} />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-12">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {blogT.title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {blogT.subtitle}
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === 'all'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
            }`}
          >
            {blogT.allCategories}
          </button>
          {blogCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
              }`}
            >
              {cat[language] || cat.uz}
            </button>
          ))}
        </div>

        {/* Posts grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Newspaper className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-lg text-muted-foreground">{blogT.noPosts}</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
