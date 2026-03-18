/**
 * Lightweight Prerender Script — Puppeteer KERAK EMAS
 *
 * index.html ni o'qib, har bir route uchun to'g'ri meta taglarni inject qiladi.
 * Natija: dist/ ichida har bir route uchun o'z index.html fayli.
 *
 * Telegram, Facebook, Google crawler — tayyor HTML dagi meta taglarni ko'radi.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DIST = join(__dirname, '..', 'dist')
const SITE_URL = 'https://cliento.uz'

// blogData.js dan postlarni import qilamiz
// ESM import ishlamasa (chunki blogData JSX emas, oddiy JS), dynamic import
const blogDataPath = join(__dirname, '..', 'src', 'lib', 'blogData.js')
const blogDataContent = readFileSync(blogDataPath, 'utf-8')

// blogPosts array ni parse qilish (eval o'rniga regex bilan)
function extractBlogPosts() {
  const posts = []
  // slug larni topamiz
  const slugRegex = /slug:\s*"([^"]+)"/g
  const slugs = []
  let m
  while ((m = slugRegex.exec(blogDataContent)) !== null) {
    slugs.push(m[1])
  }

  for (const slug of slugs) {
    // Bu slug atrofidagi ma'lumotlarni topish
    const slugIdx = blogDataContent.indexOf(`slug: "${slug}"`)
    // slug dan keyingi 3000 belgi ichida uz: { title, description } ni topish
    const chunk = blogDataContent.substring(slugIdx, slugIdx + 3000)

    const coverMatch = chunk.match(/coverImage:\s*(?:"([^"]+)"|[\s\S]*?"([^"]+)")/)
    const coverImage = coverMatch ? (coverMatch[1] || coverMatch[2]) : ''

    const authorMatch = chunk.match(/author:\s*"([^"]+)"/)
    const author = authorMatch ? authorMatch[1] : 'Cliento'

    const dateMatch = chunk.match(/publishedAt:\s*"([^"]+)"/)
    const publishedAt = dateMatch ? dateMatch[1] : ''

    const tagsMatch = chunk.match(/tags:\s*\[([^\]]+)\]/)
    const tags = tagsMatch ? tagsMatch[1].replace(/"/g, '').split(',').map(t => t.trim()) : []

    // uz blokidan title va description ni olish
    const uzIdx = chunk.indexOf('uz: {')
    if (uzIdx === -1) continue
    const uzChunk = chunk.substring(uzIdx, uzIdx + 500)

    const titleMatch = uzChunk.match(/title:\s*"([^"]+)"/)
    const descMatch = uzChunk.match(/description:\s*(?:"([^"]+)"|[\s\S]*?"([^"]+)")/)

    posts.push({
      slug,
      coverImage,
      author,
      publishedAt,
      tags,
      title: titleMatch ? titleMatch[1] : slug,
      description: descMatch ? (descMatch[1] || descMatch[2]) : '',
    })
  }
  return posts
}

// Sahifa ma'lumotlari — har bir route uchun meta taglar
function getRoutesMeta() {
  const blogPosts = extractBlogPosts()

  const routes = [
    // Asosiy sahifa — index.html dagi default taglar yetarli
    // /demo — asosiy sahifa bilan bir xil
    {
      path: '/demo',
      title: 'Bepul Demo — Cliento CRM',
      description: 'Cliento CRM ni 24 soat bepul sinab ko\'ring. Ro\'yxatdan o\'tish shart emas. O\'z sohangizga mos demo ma\'lumotlar bilan.',
      image: `${SITE_URL}/og-image.png`,
      type: 'website',
    },
    // Blog listing
    {
      path: '/blog',
      title: 'Blog — Cliento CRM',
      description: 'CRM, biznes boshqaruvi va Cliento yangiliklari haqida foydali maqolalar.',
      image: `${SITE_URL}/og-image.png`,
      type: 'website',
    },
    // Tutorial
    {
      path: '/tutorial',
      title: 'Foydalanish qo\'llanmasi — Cliento CRM',
      description: 'Cliento CRM tizimini qanday ishlatishni bosqichma-bosqich o\'rganing. Dashboard, mijozlar, leadlar, vazifalar va boshqa modullar.',
      image: `${SITE_URL}/og-image.png`,
      type: 'website',
    },
  ]

  // Blog postlar
  for (const post of blogPosts) {
    const image = post.coverImage
      ? `${SITE_URL}${post.coverImage}`
      : `${SITE_URL}/og-image.png`

    routes.push({
      path: `/blog/${post.slug}`,
      title: `${post.title} — Cliento CRM Blog`,
      description: post.description,
      image,
      type: 'article',
      author: post.author,
      publishedAt: post.publishedAt,
      tags: post.tags,
    })
  }

  return routes
}

// index.html ichidagi meta taglarni almashtirish
// Vite build `/>` (self-closing) ishlatadi, shuning uchun regex `\s*/?>` bilan tugaydi
function injectMeta(html, meta) {
  let result = html

  // <title> almashtirish
  result = result.replace(
    /<title>[^<]*<\/title>/,
    `<title>${meta.title}</title>`
  )

  // meta description
  result = result.replace(
    /<meta name="description" content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${meta.description}" />`
  )

  // canonical URL
  result = result.replace(
    /<link rel="canonical" href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${SITE_URL}${meta.path}" />`
  )

  // og:url
  result = result.replace(
    /<meta property="og:url" content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${SITE_URL}${meta.path}" />`
  )

  // og:title
  result = result.replace(
    /<meta property="og:title" content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${meta.title}" />`
  )

  // og:description
  result = result.replace(
    /<meta property="og:description" content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${meta.description}" />`
  )

  // og:image
  result = result.replace(
    /<meta property="og:image" content="[^"]*"\s*\/?>/,
    `<meta property="og:image" content="${meta.image}" />`
  )

  // og:type
  result = result.replace(
    /<meta property="og:type" content="[^"]*"\s*\/?>/,
    `<meta property="og:type" content="${meta.type || 'website'}" />`
  )

  // Article uchun: JSON-LD ni Article ga almashtirish + qo'shimcha meta taglar
  if (meta.type === 'article') {
    const articleTags = []
    if (meta.publishedAt) {
      articleTags.push(`<meta property="article:published_time" content="${meta.publishedAt}">`)
    }
    if (meta.author) {
      articleTags.push(`<meta property="article:author" content="${meta.author}">`)
    }
    if (meta.tags && meta.tags.length > 0) {
      for (const tag of meta.tags) {
        articleTags.push(`<meta property="article:tag" content="${tag}">`)
      }
    }
    if (articleTags.length > 0) {
      result = result.replace('</head>', `    ${articleTags.join('\n    ')}\n  </head>`)
    }

    // SoftwareApplication JSON-LD ni Article JSON-LD ga almashtirish
    const articleJsonLd = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": meta.title,
      "description": meta.description,
      "image": meta.image,
      "datePublished": meta.publishedAt || '',
      "author": {
        "@type": "Organization",
        "name": meta.author || "Cliento",
        "url": SITE_URL
      },
      "publisher": {
        "@type": "Organization",
        "name": "Cliento",
        "url": SITE_URL,
        "logo": {
          "@type": "ImageObject",
          "url": `${SITE_URL}/android-chrome-512x512.png`
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${SITE_URL}${meta.path}`
      },
      "keywords": (meta.tags || []).join(', ')
    }, null, 2)

    result = result.replace(
      /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
      `<script type="application/ld+json">\n${articleJsonLd}\n    </script>`
    )
  }

  // Blog listing uchun: CollectionPage JSON-LD
  if (meta.path === '/blog') {
    const blogJsonLd = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": meta.title,
      "description": meta.description,
      "url": `${SITE_URL}/blog`,
      "publisher": {
        "@type": "Organization",
        "name": "Cliento",
        "url": SITE_URL
      }
    }, null, 2)

    result = result.replace(
      /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
      `<script type="application/ld+json">\n${blogJsonLd}\n    </script>`
    )
  }

  return result
}

function prerender() {
  console.log('\n🔄 Prerender boshlandi (Puppeteer\'siz)...\n')

  // dist/index.html ni o'qish
  const indexPath = join(DIST, 'index.html')
  if (!existsSync(indexPath)) {
    console.error('❌ dist/index.html topilmadi. Avval "vite build" ishga tushiring.')
    process.exit(1)
  }
  const baseHtml = readFileSync(indexPath, 'utf-8')

  // Route ma'lumotlarni olish
  const routes = getRoutesMeta()

  let success = 0

  for (const meta of routes) {
    const html = injectMeta(baseHtml, meta)

    // Papka yaratish va fayl saqlash
    const filePath = join(DIST, meta.path, 'index.html')
    const dir = dirname(filePath)
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true })
    }
    writeFileSync(filePath, html)

    console.log(`  ✅ ${meta.path} → ${meta.title}`)
    success++
  }

  console.log(`\n✅ Prerender tugadi: ${success} ta sahifa yaratildi\n`)
}

prerender()
