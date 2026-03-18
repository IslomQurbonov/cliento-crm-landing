/**
 * Prerender Script — build dan keyin ishga tushadi
 * Har bir route uchun puppeteer orqali to'liq HTML yaratadi
 * Natija: dist/ ichida tayyor HTML fayllar (SEO meta taglar bilan)
 *
 * Foydalanish: npm run build (avtomatik build:prerender ishga tushadi)
 */
import { launch } from 'puppeteer'
import { createServer } from 'http'
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DIST = join(__dirname, '..', 'dist')
const PORT = 45678

// Prerender qilinadigan routelar
const ROUTES = [
  '/',
  '/demo',
  '/blog',
  '/blog/crm-nima-va-biznesingizga-qanday-yordam-beradi',
  '/blog/mijozlarni-yoqotmaslik-uchun-7-ta-tavsiya',
  '/blog/cliento-crm-yangi-imkoniyatlari-2026-mart',
  '/tutorial',
  '/terms',
  '/privacy',
]

// Oddiy statik server — dist papkasini serve qiladi
function createStaticServer() {
  const indexHtml = readFileSync(join(DIST, 'index.html'), 'utf-8')

  return createServer((req, res) => {
    const url = req.url.split('?')[0]
    const filePath = join(DIST, url)

    // Statik fayllarni berish (js, css, webp, png...)
    if (url.includes('.')) {
      try {
        const content = readFileSync(filePath)
        const ext = url.split('.').pop()
        const mimeTypes = {
          js: 'application/javascript',
          css: 'text/css',
          html: 'text/html',
          webp: 'image/webp',
          png: 'image/png',
          jpg: 'image/jpeg',
          svg: 'image/svg+xml',
          json: 'application/json',
          woff2: 'font/woff2',
          woff: 'font/woff',
        }
        res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' })
        res.end(content)
      } catch {
        res.writeHead(404)
        res.end('Not found')
      }
      return
    }

    // SPA fallback — har qanday route uchun index.html
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(indexHtml)
  })
}

async function prerender() {
  console.log('\n🔄 Prerender boshlandi...\n')

  // 1. Statik server ishga tushirish
  const server = createStaticServer()
  await new Promise(resolve => server.listen(PORT, resolve))
  console.log(`📡 Statik server: http://localhost:${PORT}`)

  // 2. Puppeteer ishga tushirish
  const browser = await launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  let success = 0
  let failed = 0

  for (const route of ROUTES) {
    try {
      const page = await browser.newPage()

      // Console xatolarni yig'ish
      const errors = []
      page.on('pageerror', err => errors.push(err.message))

      // Sahifani ochish va render bo'lishini kutish
      await page.goto(`http://localhost:${PORT}${route}`, {
        waitUntil: 'networkidle0',
        timeout: 30000,
      })

      // react-helmet-async tomonidan meta taglar yangilanishini kutish
      // Lazy-loaded komponentlar yuklanishi uchun qo'shimcha vaqt beramiz
      await new Promise(resolve => setTimeout(resolve, 3000))

      // Yana helmet tag update bo'lganini tekshirish
      await page.waitForFunction(
        () => {
          const titles = document.querySelectorAll('title')
          const ogTitle = document.querySelector('meta[property="og:title"]')
          // Helmet ishlasa — 2+ title bo'ladi yoki og:title paydo bo'ladi
          return titles.length > 1 || (ogTitle && ogTitle.content !== '')
        },
        { timeout: 5000 }
      ).catch(() => {})

      // To'liq HTML olish
      let html = await page.content()

      // react-helmet-async dublikat title taglarni tozalash
      // Helmet birinchi title qo'shadi, lekin original title qoladi
      // Faqat birinchi (helmet) title ni saqlaymiz
      const titleMatches = [...html.matchAll(/<title[^>]*>([^<]*)<\/title>/g)]
      if (titleMatches.length > 1) {
        // Birinchi title — helmet (sahifaga xos), ikkinchi — default
        // Ikkinchi va keyingi titlelarni o'chiramiz
        let count = 0
        html = html.replace(/<title[^>]*>[^<]*<\/title>/g, (match) => {
          count++
          return count === 1 ? match : '' // faqat birinchisini saqla
        })
      }

      // Helmet taglarni saqlash, default taglarni o'chirish
      // Helmet oxiriga qo'shadi — shuning uchun OXIRGI dublikatni saqlaymiz
      const metaCounts = {}

      // 1-pass: nechta bor sanash
      html.replace(/<meta\s+([^>]+)>/g, (match, attrs) => {
        const propMatch = attrs.match(/(?:property|name)="([^"]+)"/)
        if (propMatch) {
          metaCounts[propMatch[1]] = (metaCounts[propMatch[1]] || 0) + 1
        }
        return match
      })

      // 2-pass: dublikatlardan BIRINCHISINI o'chirish (oxirgisi = helmet tagi qoladi)
      const metaSeen = {}
      html = html.replace(/<meta\s+([^>]+)>/g, (match, attrs) => {
        const propMatch = attrs.match(/(?:property|name)="([^"]+)"/)
        if (propMatch) {
          const key = propMatch[1]
          metaSeen[key] = (metaSeen[key] || 0) + 1
          if (metaCounts[key] > 1 && metaSeen[key] < metaCounts[key]) {
            return '' // birinchi (default) ni o'chirish
          }
        }
        return match
      })

      // Dublikat link[rel=canonical] tozalash — oxirgisini saqlash
      const canonicals = [...html.matchAll(/<link\s+rel="canonical"[^>]*>/g)]
      if (canonicals.length > 1) {
        let canonicalIdx = 0
        html = html.replace(/<link\s+rel="canonical"[^>]*>/g, (match) => {
          canonicalIdx++
          return canonicalIdx < canonicals.length ? '' : match // faqat oxirgisini saqla
        })
      }

      // Prerender belgisi qo'shish
      html = html.replace(
        '</head>',
        '<meta name="prerender-status" content="200" />\n</head>'
      )

      // Faylga saqlash
      const filePath = route === '/'
        ? join(DIST, 'index.html')
        : join(DIST, route, 'index.html')

      const dir = dirname(filePath)
      if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true })
      }
      writeFileSync(filePath, html)

      // OG title tekshirish
      const ogTitle = await page.$eval(
        'meta[property="og:title"]',
        el => el.content
      ).catch(() => null)

      console.log(`  ✅ ${route} → ${ogTitle || 'default title'}`)
      success++

      if (errors.length > 0) {
        console.log(`     ⚠️  JS xatoliklar: ${errors.length}`)
      }

      await page.close()
    } catch (err) {
      console.log(`  ❌ ${route} — ${err.message}`)
      failed++
    }
  }

  await browser.close()
  server.close()

  console.log(`\n✅ Prerender tugadi: ${success} muvaffaqiyatli, ${failed} xato\n`)
}

prerender().catch(err => {
  console.error('❌ Prerender xatosi:', err)
  process.exit(1)
})
