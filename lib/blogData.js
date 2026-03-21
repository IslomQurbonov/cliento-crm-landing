/* ─────────────────────── Blog Data ─────────────────────── */
/* Maqolalar lib/articles/ papkasida alohida fayllarda saqlanadi.
   Bu fayl faqat kategoriyalar, tarjimalar va yordamchi funksiyalarni saqlaydi. */

import { articles } from './articles';

/* ─────────────────────── Categories ─────────────────────── */

export const blogCategories = [
  {
    id: "crm-basics",
    color: "#3B82F6",
    uz: "CRM asoslari",
    ru: "Основы CRM",
    en: "CRM Basics",
  },
  { id: "tips", color: "#10B981", uz: "Maslahatlar", ru: "Советы", en: "Tips" },
  {
    id: "updates",
    color: "#8B5CF6",
    uz: "Yangiliklar",
    ru: "Обновления",
    en: "Updates",
  },
  {
    id: "business",
    color: "#F59E0B",
    uz: "Biznes",
    ru: "Бизнес",
    en: "Business",
  },
];

/* ─────────────────────── Translations ─────────────────────── */

export const blogTranslations = {
  uz: {
    pageTitle: "Blog",
    pageDescription:
      "CRM, biznes boshqaruvi va Cliento yangiliklari haqida foydali maqolalar",
    title: "Blog",
    subtitle:
      "CRM, biznes boshqaruvi va Cliento yangiliklari haqida foydali maqolalar",
    allCategories: "Barchasi",
    readMore: "Batafsil o'qish",
    readingTime: "o'qish vaqti",
    readingTimeUnit: "daq",
    backToBlog: "Blogga qaytish",
    backToHome: "Bosh sahifa",
    share: "Ulashish",
    copied: "Link nusxalandi!",
    shareArticle: "Maqolani ulashish",
    relatedPosts: "O'xshash maqolalar",
    noPosts: "Hozircha maqolalar yo'q",
    postNotFound: "Maqola topilmadi",
    postNotFoundDesc: "Siz qidirayotgan maqola mavjud emas yoki o'chirilgan.",
    publishedOn: "Nashr etilgan",
    author: "Muallif",
    tags: "Teglar",
    searchPlaceholder: "Maqolalarni qidirish...",
    minutes: "daqiqa",
    alsoRead: "Shuningdek o'qing",
  },
  ru: {
    pageTitle: "Блог",
    pageDescription:
      "Полезные статьи о CRM, управлении бизнесом и новостях Cliento",
    title: "Блог",
    subtitle: "Полезные статьи о CRM, управлении бизнесом и новостях Cliento",
    allCategories: "Все",
    readMore: "Читать далее",
    readingTime: "время чтения",
    readingTimeUnit: "мин",
    backToBlog: "Вернуться в блог",
    backToHome: "Главная",
    share: "Поделиться",
    copied: "Ссылка скопирована!",
    shareArticle: "Поделиться статьёй",
    relatedPosts: "Похожие статьи",
    noPosts: "Пока нет статей",
    postNotFound: "Статья не найдена",
    postNotFoundDesc: "Запрашиваемая статья не существует или была удалена.",
    publishedOn: "Опубликовано",
    author: "Автор",
    tags: "Теги",
    searchPlaceholder: "Поиск статей...",
    minutes: "минут",
    alsoRead: "Читайте также",
  },
  en: {
    pageTitle: "Blog",
    pageDescription:
      "Useful articles about CRM, business management, and Cliento updates",
    title: "Blog",
    subtitle:
      "Useful articles about CRM, business management, and Cliento updates",
    allCategories: "All",
    readMore: "Read more",
    readingTime: "reading time",
    readingTimeUnit: "min",
    backToBlog: "Back to blog",
    backToHome: "Home",
    share: "Share",
    copied: "Link copied!",
    shareArticle: "Share article",
    relatedPosts: "Related posts",
    noPosts: "No posts yet",
    postNotFound: "Post not found",
    postNotFoundDesc:
      "The article you are looking for does not exist or has been removed.",
    publishedOn: "Published on",
    author: "Author",
    tags: "Tags",
    searchPlaceholder: "Search articles...",
    minutes: "minutes",
    alsoRead: "Also read",
  },
};

/* ─────────────────────── Blog Posts ─────────────────────── */
/* Articles importdan keladi, publishedAt bo'yicha yangi → eski tartibda */

export const blogPosts = [...articles].sort(
  (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt),
);

/* ─────────────────────── Utility Functions ─────────────────────── */

export function calculateReadingTime(content) {
  if (!content || !Array.isArray(content)) return 1;

  let wordCount = 0;

  for (const block of content) {
    if (block.text) {
      wordCount += block.text.split(/\s+/).filter(Boolean).length;
    }
    if (block.items && Array.isArray(block.items)) {
      for (const item of block.items) {
        wordCount += item.split(/\s+/).filter(Boolean).length;
      }
    }
    if (block.author) {
      wordCount += block.author.split(/\s+/).filter(Boolean).length;
    }
    if (block.caption) {
      wordCount += block.caption.split(/\s+/).filter(Boolean).length;
    }
  }

  const minutes = Math.ceil(wordCount / 200);
  return Math.max(1, minutes);
}

export function getPostsByCategory(categoryId) {
  if (!categoryId || categoryId === "all") {
    return blogPosts;
  }
  return blogPosts.filter((post) => post.category === categoryId);
}

/**
 * Tegishli maqolalarni topish.
 * Avval relatedSlugs dan, keyin bir xil kategoriyadan.
 */
export function getRelatedPosts(slug, limit = 3) {
  const currentPost = blogPosts.find((post) => post.slug === slug);
  if (!currentPost) return [];

  const related = [];
  const addedSlugs = new Set([slug]);

  // 1. Avval relatedSlugs dan (agar bor bo'lsa)
  if (currentPost.relatedSlugs && currentPost.relatedSlugs.length > 0) {
    for (const relatedSlug of currentPost.relatedSlugs) {
      if (related.length >= limit) break;
      const post = blogPosts.find((p) => p.slug === relatedSlug);
      if (post && !addedSlugs.has(post.slug)) {
        related.push(post);
        addedSlugs.add(post.slug);
      }
    }
  }

  // 2. Keyin bir xil kategoriyadan to'ldirish
  if (related.length < limit) {
    const sameCategoryPosts = blogPosts.filter(
      (post) => post.category === currentPost.category && !addedSlugs.has(post.slug),
    );
    for (const post of sameCategoryPosts) {
      if (related.length >= limit) break;
      related.push(post);
      addedSlugs.add(post.slug);
    }
  }

  // 3. Hali ham yetmasa, boshqa kategoriyalardan
  if (related.length < limit) {
    const otherPosts = blogPosts.filter(
      (post) => !addedSlugs.has(post.slug),
    );
    for (const post of otherPosts) {
      if (related.length >= limit) break;
      related.push(post);
      addedSlugs.add(post.slug);
    }
  }

  return related;
}

/**
 * Maqola ichidagi cross-linklar uchun post ma'lumotlarini olish.
 * relatedSlugs dagi postlarning title va slug ini qaytaradi.
 */
export function getInternalLinks(slug, language = 'uz') {
  const currentPost = blogPosts.find((post) => post.slug === slug);
  if (!currentPost || !currentPost.relatedSlugs) return [];

  return currentPost.relatedSlugs
    .map((relatedSlug) => {
      const post = blogPosts.find((p) => p.slug === relatedSlug);
      if (!post) return null;
      const postData = post[language] || post.uz;
      return {
        slug: post.slug,
        title: postData.title,
        description: postData.description,
        category: post.category,
      };
    })
    .filter(Boolean);
}
