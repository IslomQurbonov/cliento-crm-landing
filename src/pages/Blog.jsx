import React, { useState, useMemo, useEffect } from "react";
import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Tag,
  Share2,
  Newspaper,
  Globe,
  Sun,
  Moon,
  ChevronRight,
} from "lucide-react";
import SEOHead from "../components/SEOHead";
import {
  blogPosts,
  blogCategories,
  blogTranslations,
  calculateReadingTime,
  getPostsByCategory,
  getRelatedPosts,
} from "../lib/blogData";
import Footer from "../components/Footer";
import logoDark from "../assets/images/logo-dark.webp";
import logoLight from "../assets/images/logo-light.webp";

/* ─────────────────────── helpers ─────────────────────── */

const LANGUAGES = [
  { code: "uz", label: "O'zbek" },
  { code: "ru", label: "Русский" },
  { code: "en", label: "English" },
];

function formatDate(dateStr, language) {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

/* ─────────────────────── ContentRenderer ─────────────────────── */

function ContentRenderer({ blocks }) {
  if (!blocks || !Array.isArray(blocks)) return null;

  return (
    <>
      {blocks.map((block, index) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p
                key={index}
                className="text-lg leading-relaxed text-foreground/90 mb-6"
              >
                {block.text}
              </p>
            );

          case "heading":
            if (block.level === 2) {
              return (
                <h2
                  key={index}
                  className="text-2xl md:text-3xl font-bold text-foreground mb-4 mt-10"
                >
                  {block.text}
                </h2>
              );
            }
            if (block.level === 3) {
              return (
                <h3
                  key={index}
                  className="text-xl md:text-2xl font-semibold text-foreground mb-3 mt-8"
                >
                  {block.text}
                </h3>
              );
            }
            return null;

          case "image":
            return (
              <figure key={index} className="my-8">
                <img
                  src={block.src}
                  alt={block.alt || ""}
                  className="w-full rounded-xl"
                  loading="lazy"
                />
                {block.caption && (
                  <figcaption className="text-center text-sm text-muted-foreground mt-3">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );

          case "quote":
            return (
              <blockquote
                key={index}
                className="border-l-4 border-primary/40 pl-6 my-8 italic text-foreground/80 text-lg"
              >
                {block.text}
              </blockquote>
            );

          case "list": {
            const isOrdered = block.ordered;
            const ListTag = isOrdered ? "ol" : "ul";
            const listStyle = isOrdered ? "list-decimal" : "list-disc";
            return (
              <ListTag
                key={index}
                className={`${listStyle} ml-6 space-y-2 mb-6 text-lg text-foreground/90`}
              >
                {block.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ListTag>
            );
          }

          default:
            return null;
        }
      })}
    </>
  );
}

/* ─────────────────────── BlogCard ─────────────────────── */

function BlogCard({ post, language, blogT }) {
  const postData = post[language] || post.uz;
  const category = blogCategories.find((c) => c.id === post.category);
  const categoryName = category ? category[language] || category.uz : "";
  const readingTime = calculateReadingTime(post, language);

  return (
    <Link
      to={`/blog/${post.slug}`}
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
            {postData.author}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {formatDate(post.publishedAt, language)}
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

/* ─────────────────────── LanguageSwitcher ─────────────────────── */

function LanguageSwitcher({ language, setLanguage }) {
  const [isOpen, setIsOpen] = useState(false);
  const current = LANGUAGES.find((l) => l.code === language);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors"
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">{current?.label}</span>
      </button>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-full mt-1 z-50 bg-card border border-border rounded-lg shadow-lg py-1 min-w-[120px]">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                  language === lang.code
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ─────────────────────── BlogListing ─────────────────────── */

function BlogListing({ language, setLanguage, isDarkMode, setIsDarkMode }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const blogT = blogTranslations[language] || blogTranslations.uz;

  const filteredPosts = useMemo(() => {
    if (activeCategory === "all") return blogPosts;
    return getPostsByCategory(activeCategory);
  }, [activeCategory]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: blogT.pageTitle,
    description: blogT.pageDescription,
    url: "https://cliento.uz/blog",
    isPartOf: {
      "@type": "WebSite",
      name: "Cliento CRM",
      url: "https://cliento.uz",
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <SEOHead
        title={`${blogT.pageTitle} — Cliento CRM`}
        description={blogT.pageDescription}
        path="/blog"
        type="website"
        jsonLd={jsonLd}
        language={language}
      />

      {/* Header */}
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-14 px-4">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2">
              <img
                src={isDarkMode ? logoDark : logoLight}
                alt="Cliento"
                className="h-7 w-auto"
              />
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link
              to="/blog"
              className="flex items-center gap-1.5 text-sm font-medium text-foreground"
            >
              <Newspaper className="w-4 h-4" />
              {blogT.pageTitle}
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <LanguageSwitcher language={language} setLanguage={setLanguage} />
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
            <Link
              to="/"
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors"
            >
              <span className="hidden sm:inline">{blogT.backToHome}</span>
            </Link>
          </div>
        </div>
      </header>

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
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === "all"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
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
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
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
              <BlogCard
                key={post.slug}
                post={post}
                language={language}
                blogT={blogT}
              />
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
      <Footer language={language} setLanguage={setLanguage} isDarkMode={isDarkMode} />
    </div>
  );
}

/* ─────────────────────── BlogPost ─────────────────────── */

function BlogPost({ language, setLanguage, isDarkMode, setIsDarkMode }) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const blogT = blogTranslations[language] || blogTranslations.uz;
  const [copied, setCopied] = useState(false);

  const post = useMemo(
    () => blogPosts.find((p) => p.slug === slug),
    [slug]
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
      const textarea = document.createElement("textarea");
      textarea.value = url;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
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
            <Link to="/" className="flex items-center gap-2">
              <img
                src={isDarkMode ? logoDark : logoLight}
                alt="Cliento"
                className="h-7 w-auto"
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
            to="/blog"
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
  const categoryName = category ? category[language] || category.uz : "";
  const readingTime = calculateReadingTime(post, language);
  const relatedPosts = getRelatedPosts(post.slug, post.category, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: postData.title,
    description: postData.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      "@type": "Organization",
      name: postData.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Cliento CRM",
      logo: {
        "@type": "ImageObject",
        url: "https://cliento.uz/og-image.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://cliento.uz/blog/${post.slug}`,
    },
    image: post.coverImage,
    keywords: post.tags ? post.tags.join(", ") : undefined,
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <SEOHead
        title={`${postData.title} — Cliento Blog`}
        description={postData.description}
        path={`/blog/${post.slug}`}
        image={post.coverImage}
        type="article"
        jsonLd={jsonLd}
        language={language}
      />

      {/* Header */}
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-14 px-4">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2">
              <img
                src={isDarkMode ? logoDark : logoLight}
                alt="Cliento"
                className="h-7 w-auto"
              />
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link
              to="/blog"
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {blogT.backToBlog}
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <LanguageSwitcher language={language} setLanguage={setLanguage} />
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </header>

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
                {postData.author}
              </span>

              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDate(post.publishedAt, language)}
              </span>

              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {readingTime} {blogT.readingTimeUnit}
              </span>

              {/* Share button */}
              <button
                onClick={handleShare}
                className="flex items-center gap-1 px-3 py-1 rounded-full bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors ml-auto"
              >
                <Share2 className="w-4 h-4" />
                <span>{copied ? blogT.copied : blogT.share}</span>
              </button>
            </div>

            {/* Content */}
            <div className="prose-like">
              <ContentRenderer blocks={postData.content} />
            </div>

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
                  <BlogCard
                    key={relPost.slug}
                    post={relPost}
                    language={language}
                    blogT={blogT}
                  />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <Footer language={language} setLanguage={setLanguage} isDarkMode={isDarkMode} />
    </div>
  );
}

/* ─────────────────────── Blog (default export) ─────────────────────── */

export default function Blog({ language, setLanguage, isDarkMode, setIsDarkMode }) {
  return (
    <Routes>
      <Route
        index
        element={
          <BlogListing
            language={language}
            setLanguage={setLanguage}
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
          />
        }
      />
      <Route
        path=":slug"
        element={
          <BlogPost
            language={language}
            setLanguage={setLanguage}
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
          />
        }
      />
    </Routes>
  );
}
