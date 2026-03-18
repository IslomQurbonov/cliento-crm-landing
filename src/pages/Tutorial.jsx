import React, { useState, useMemo, useEffect } from "react";
import { Routes, Route, Navigate, useParams, useNavigate, Link } from "react-router-dom";
import {
  Search,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Lightbulb,
  ImageOff,
  BookOpen,
  Home,
} from "lucide-react";
import {
  tutorialSections,
  tutorialGroups,
  tutorialTranslations,
} from "../lib/tutorialData";
import SEOHead from "../components/SEOHead";
import logoDark from "../assets/images/logo-dark.webp";
import logoLight from "../assets/images/logo-light.webp";

/* ─────────────────────── Sidebar ─────────────────────── */

function TutorialSidebar({ language, activeId, onSelect, search, setSearch, isMobile, onClose }) {
  const t = tutorialTranslations[language];
  const groups = tutorialGroups[language];

  const filtered = useMemo(() => {
    if (!search.trim()) return tutorialSections;
    const q = search.toLowerCase();
    return tutorialSections.filter((s) => {
      const data = s[language];
      return (
        data.title.toLowerCase().includes(q) ||
        data.shortDesc.toLowerCase().includes(q)
      );
    });
  }, [search, language]);

  const mainSections = filtered.filter((s) => s.group === "main");
  const adminSections = filtered.filter((s) => s.group === "admin");

  const renderGroup = (label, sections) => {
    if (sections.length === 0) return null;
    return (
      <div className="mb-4">
        <h3 className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </h3>
        <ul className="space-y-0.5">
          {sections.map((section) => {
            const data = section[language];
            const Icon = section.icon;
            const isActive = section.id === activeId;
            return (
              <li key={section.id}>
                <button
                  onClick={() => {
                    onSelect(section.id);
                    if (isMobile) onClose();
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors text-left cursor-pointer ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="font-medium truncate">{data.title}</div>
                    {!isMobile && (
                      <div className={`text-xs truncate ${isActive ? "text-primary-foreground/70" : "text-muted-foreground/70"}`}>
                        {data.shortDesc}
                      </div>
                    )}
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col">
      {/* Search */}
      <div className="p-3 border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-9 pr-3 py-2 text-sm bg-muted rounded-lg border-none outline-none focus:ring-2 focus:ring-primary/30 text-foreground placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Sections */}
      <div className="flex-1 overflow-y-auto p-2">
        {renderGroup(groups.main, mainSections)}
        {renderGroup(groups.admin, adminSections)}
        {filtered.length === 0 && (
          <p className="text-center text-sm text-muted-foreground py-8">
            {language === "uz" ? "Hech narsa topilmadi" : language === "ru" ? "Ничего не найдено" : "Nothing found"}
          </p>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────── Section Content ─────────────────────── */

function TutorialContent({ language }) {
  const { sectionId } = useParams();
  const navigate = useNavigate();
  const t = tutorialTranslations[language];

  const sectionIndex = tutorialSections.findIndex((s) => s.id === sectionId);
  const section = tutorialSections[sectionIndex];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [sectionId]);

  if (!section) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <BookOpen className="w-16 h-16 text-muted-foreground/30 mb-4" />
        <h2 className="text-xl font-semibold text-foreground mb-2">
          {language === "uz" ? "Bo'lim topilmadi" : language === "ru" ? "Раздел не найден" : "Section not found"}
        </h2>
        <button
          onClick={() => navigate("/tutorial/dashboard")}
          className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90 transition-colors"
        >
          {t.backToHome}
        </button>
      </div>
    );
  }

  const data = section[language];
  const Icon = section.icon;
  const prevSection = sectionIndex > 0 ? tutorialSections[sectionIndex - 1] : null;
  const nextSection = sectionIndex < tutorialSections.length - 1 ? tutorialSections[sectionIndex + 1] : null;

  const seoTitle = `${data.title} — Cliento CRM Qo'llanma`;
  const seoDesc = data.description.length > 160 ? data.description.slice(0, 157) + "..." : data.description;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": data.title,
    "description": data.description,
    "url": `https://cliento.uz/tutorial/${section.id}`,
    "image": section.screenshots?.[0] ? `https://cliento.uz/tutorial/${section.screenshots[0]}` : "https://cliento.uz/og-image.png",
    ...(data.steps?.length > 0 && {
      "step": data.steps.map((step, i) => ({
        "@type": "HowToStep",
        "position": i + 1,
        "name": step.title,
        "text": step.text,
      })),
    }),
    "isPartOf": {
      "@type": "WebPage",
      "name": "Cliento CRM Qo'llanma",
      "url": "https://cliento.uz/tutorial",
    },
  };

  return (
    <div className="max-w-4xl mx-auto">
      <SEOHead
        title={seoTitle}
        description={seoDesc}
        path={`/tutorial/${section.id}`}
        image={section.screenshots?.[0] ? `https://cliento.uz/tutorial/${section.screenshots[0]}` : undefined}
        type="article"
        jsonLd={jsonLd}
        language={language}
      />
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">{data.title}</h1>
            <p className="text-muted-foreground">{data.shortDesc}</p>
          </div>
        </div>
        <p className="text-foreground/80 leading-relaxed mt-4">{data.description}</p>
      </div>

      {/* Main Screenshot */}
      {section.screenshots?.[0] && (
        <div className="mb-8 rounded-xl overflow-hidden border border-border bg-muted/30">
          <img
            src={`/tutorial/${section.screenshots[0]}`}
            alt={data.title}
            className="w-full h-auto"
            onError={(e) => {
              e.target.style.display = "none";
              const fallback = e.target.nextElementSibling;
              if (fallback) fallback.style.display = "flex";
            }}
          />
          <div className="hidden items-center justify-center py-20 text-muted-foreground/50 flex-col gap-2">
            <ImageOff className="w-10 h-10" />
            <span className="text-sm">{t.noScreenshot}</span>
          </div>
        </div>
      )}

      {/* Steps */}
      {data.steps?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            {t.steps}
          </h2>
          <div className="space-y-4">
            {data.steps.map((step, i) => (
              <div
                key={i}
                className="flex gap-4 p-4 rounded-xl bg-card border border-border"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Additional screenshots */}
      {section.screenshots?.length > 1 && (
        <div className="mb-8 grid gap-4 grid-cols-1 md:grid-cols-2">
          {section.screenshots.slice(1).map((src, i) => (
            <div key={i} className="rounded-xl overflow-hidden border border-border bg-muted/30">
              <img
                src={`/tutorial/${src}`}
                alt={`${data.title} - ${i + 2}`}
                className="w-full h-auto"
                onError={(e) => {
                  const parent = e.target.parentElement;
                  if (parent) parent.style.display = "none";
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Tips */}
      {data.tips?.length > 0 && (
        <div className="mb-8 p-5 rounded-xl bg-primary/5 border border-primary/10">
          <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-primary" />
            {t.tips}
          </h2>
          <ul className="space-y-2">
            {data.tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                <span className="text-primary mt-0.5">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Prev / Next navigation */}
      <div className="flex items-center justify-between pt-6 border-t border-border mt-8">
        {prevSection ? (
          <button
            onClick={() => navigate(`/tutorial/${prevSection.id}`)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm bg-muted hover:bg-muted/80 text-foreground transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <div className="text-left">
              <div className="text-xs text-muted-foreground">{t.prevSection}</div>
              <div className="font-medium">{prevSection[language].title}</div>
            </div>
          </button>
        ) : (
          <div />
        )}
        {nextSection ? (
          <button
            onClick={() => navigate(`/tutorial/${nextSection.id}`)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm bg-muted hover:bg-muted/80 text-foreground transition-colors cursor-pointer"
          >
            <div className="text-right">
              <div className="text-xs text-muted-foreground">{t.nextSection}</div>
              <div className="font-medium">{nextSection[language].title}</div>
            </div>
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}

/* ─────────────────────── Welcome Page ─────────────────────── */

function TutorialWelcome({ language }) {
  const navigate = useNavigate();
  const t = tutorialTranslations[language];
  const groups = tutorialGroups[language];

  const mainSections = tutorialSections.filter((s) => s.group === "main");
  const adminSections = tutorialSections.filter((s) => s.group === "admin");

  const welcomeSeoMeta = {
    uz: {
      title: "Qo'llanma — Cliento CRM",
      description: "Cliento CRM tizimidan foydalanish bo'yicha batafsil qo'llanma. Dashboard, mijozlar, lidlar, vazifalar, bitimlar va boshqa barcha funksiyalarni o'rganing.",
    },
    ru: {
      title: "Руководство — Cliento CRM",
      description: "Подробное руководство по использованию Cliento CRM. Узнайте о Dashboard, клиентах, лидах, задачах, сделках и всех других функциях.",
    },
    en: {
      title: "Tutorial — Cliento CRM",
      description: "Comprehensive guide to using Cliento CRM. Learn about Dashboard, clients, leads, tasks, deals, and all other features.",
    },
  };

  const welcomeJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": welcomeSeoMeta[language].title,
    "description": welcomeSeoMeta[language].description,
    "url": "https://cliento.uz/tutorial",
    "isPartOf": {
      "@type": "WebSite",
      "name": "Cliento CRM",
      "url": "https://cliento.uz",
    },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": tutorialSections.map((section, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "name": section[language].title,
        "url": `https://cliento.uz/tutorial/${section.id}`,
      })),
    },
  };

  const renderCards = (sections) =>
    sections.map((section) => {
      const data = section[language];
      const Icon = section.icon;
      return (
        <button
          key={section.id}
          onClick={() => navigate(`/tutorial/${section.id}`)}
          className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all text-left group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <div className="min-w-0">
            <div className="font-medium text-foreground">{data.title}</div>
            <div className="text-sm text-muted-foreground truncate">{data.shortDesc}</div>
          </div>
        </button>
      );
    });

  return (
    <div className="max-w-4xl mx-auto">
      <SEOHead
        title={welcomeSeoMeta[language].title}
        description={welcomeSeoMeta[language].description}
        path="/tutorial"
        jsonLd={welcomeJsonLd}
        language={language}
      />
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
          <BookOpen className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">{t.pageTitle}</h1>
        <p className="text-muted-foreground text-lg">{t.pageSubtitle}</p>
      </div>

      <div className="mb-8">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">{groups.main}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {renderCards(mainSections)}
        </div>
      </div>

      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">{groups.admin}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {renderCards(adminSections)}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────── Main Tutorial Layout ─────────────────────── */

export default function Tutorial({ language, setLanguage, isDarkMode, setIsDarkMode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { "*": splat } = useParams();
  const activeId = splat || "";
  const t = tutorialTranslations[language];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar */}
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-between h-14 px-4">
          <div className="flex items-center gap-3">
            {/* Mobile menu toggle */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <Link to="/" className="flex items-center gap-2">
              <img
                src={isDarkMode ? logoDark : logoLight}
                alt="Cliento"
                className="h-7 w-auto"
              />
            </Link>

            <span className="hidden sm:inline text-muted-foreground">/</span>
            <span className="hidden sm:inline text-sm font-medium text-foreground">{t.pageTitle}</span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors"
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">{t.backToHome}</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`
            fixed lg:sticky top-14 z-50 lg:z-10 h-[calc(100vh-3.5rem)]
            w-72 bg-background border-r border-border
            transition-transform duration-200
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          `}
        >
          <TutorialSidebar
            language={language}
            activeId={activeId}
            onSelect={(id) => navigate(`/tutorial/${id}`)}
            search={search}
            setSearch={setSearch}
            isMobile={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
        </aside>

        {/* Content */}
        <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
          <Routes>
            <Route index element={<TutorialWelcome language={language} />} />
            <Route path=":sectionId" element={<TutorialContent language={language} />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
