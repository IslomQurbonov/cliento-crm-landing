# Blog qoidalari — Cliento Landing

## Rasmlar

### Format
- Faqat `.webp` format (eng yengil, tez yuklanadi)
- Siqish sifati: 80-85% (ko'z bilan sezilmaydigan darajada siqilgan)

### Cover rasm (muqova)
- O'lcham: **1200x630px** (OG image standarti — social mediada chiroyli ko'rinadi)
- Nomi: `{slug}-cover.webp`
- Misol: `crm-nima-cover.webp`
- Joyi: `public/blog/`

### Content rasmlar (maqola ichidagi)
- Kenglik: **1200px** (balandligi erkin)
- Nomi: `{slug}-1.webp`, `{slug}-2.webp`, ...
- Misol: `crm-nima-1.webp`, `crm-nima-2.webp`
- Joyi: `public/blog/`
- Hajmi: bitta rasm **200KB** dan oshmasin

---

## Maqola yaratish

### Slug (URL identifikator)
- Faqat kichik harf, raqam va `-` (tire)
- O'zbekcha so'zlar transliteratsiya qilinmaydi — to'g'ridan to'g'ri yoziladi
- Misol: `crm-nima`, `mijozlarni-yoqotmaslik-7-tavsiya`

### Fayl
- Barcha maqolalar `src/lib/blogData.js` ichida `blogPosts` massivida saqlanadi
- Har bir maqola 3 tilda bo'lishi kerak: `uz`, `ru`, `en`

### Majburiy maydonlar
```javascript
{
  slug: "maqola-nomi",           // URL uchun
  category: "crm-basics",        // blogCategories dan biri
  coverImage: "/blog/slug-cover.webp",  // Cover rasm yo'li
  author: "Cliento",             // Muallif nomi
  publishedAt: "2026-03-18",     // Nashr sanasi (YYYY-MM-DD)
  tags: ["crm", "biznes"],       // Teglar (SEO uchun muhim)
  uz: { title, description, content },
  ru: { title, description, content },
  en: { title, description, content },
}
```

### Description (meta tavsif)
- 150-160 belgi (Google qidiruv natijalarida to'liq ko'rinishi uchun)
- Kalit so'zlarni tabiiy ravishda qo'shish

### Content bloklari
```javascript
content: [
  { type: "paragraph", text: "Oddiy matn..." },
  { type: "heading", level: 2, text: "Katta sarlavha" },
  { type: "heading", level: 3, text: "Kichik sarlavha" },
  { type: "image", src: "/blog/slug-1.webp", alt: "Rasm tavsifi", caption: "Izoh (ixtiyoriy)" },
  { type: "quote", text: "Iqtibos matni", author: "Muallif (ixtiyoriy)" },
  { type: "list", ordered: false, items: ["1-band", "2-band"] },
  { type: "list", ordered: true, items: ["1-qadam", "2-qadam"] },
]
```

### Kelajakda qo'shiladigan blok turlari (hozir ishlamaydi)
```javascript
{ type: "video", url: "https://youtube.com/...", caption: "..." }
{ type: "embed", html: "<iframe>...</iframe>" }
{ type: "code", language: "javascript", text: "console.log('hello')" }
```

---

## Kategoriyalar

| ID | O'zbekcha | Rang |
|----|-----------|------|
| `crm-basics` | CRM asoslari | #3B82F6 (ko'k) |
| `tips` | Maslahatlar | #10B981 (yashil) |
| `updates` | Yangiliklar | #8B5CF6 (binafsha) |
| `business` | Biznes | #F59E0B (sariq) |

Yangi kategoriya qo'shish uchun `blogCategories` massiviga qo'shing.

---

## SEO qoidalari

### Har bir maqolada avtomatik
- `<title>` — `"{maqola nomi} — Cliento Blog"`
- `<meta description>` — maqolaning `description` maydoni
- `<link rel="canonical">` — `https://cliento.uz/blog/{slug}`
- hreflang taglar (uz, ru, en)
- Open Graph taglar (og:title, og:description, og:image)
- JSON-LD Article schema

### Kalit so'zlar (tags)
- Har bir maqolada kamida 3-5 ta tag
- Teglar o'zbekcha yoziladi
- Umumiy + aniq teglar aralashtiriladi: `["crm", "biznes", "mijozlar", "avtomatlashtirish"]`

### Sitemap
- Yangi maqola qo'shilganda `public/sitemap.xml` ga ham URL qo'shish kerak:
```xml
<url>
  <loc>https://cliento.uz/blog/{slug}</loc>
  <lastmod>{sana}</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.7</priority>
</url>
```

---

## Yangi maqola qo'shish bosqichlari

1. Rasmlarni tayyorlash (cover 1200x630, content 1200xN, webp format)
2. `public/blog/` ga rasmlarni yuklash
3. `src/lib/blogData.js` → `blogPosts` massiviga yangi post qo'shish (3 tilda)
4. `scripts/prerender.mjs` → `ROUTES` massiviga `/blog/{slug}` qo'shish
5. `public/sitemap.xml` ga yangi URL qo'shish
6. `npm run build` bilan tekshirish (prerender avtomatik ishlaydi)
7. Commit va push

---

## Prerender (SSG)

Build jarayoni: `npm run build` = `vite build` + `node scripts/prerender.mjs`

### Qanday ishlaydi
1. Vite odatiy SPA build qiladi (`dist/index.html`)
2. Puppeteer har bir route ni brauzerda ochadi
3. react-helmet-async meta taglarni qo'yadi
4. To'liq HTML saqlanadi: `dist/blog/{slug}/index.html`

### Nima uchun kerak
- **Telegram/Facebook/Twitter** link share qilganda to'g'ri title, rasm, tavsif ko'rsatadi
- **Google/Yandex** darhol indekslaydi (JS render kutmaydi)
- Foydalanuvchi tajribasi o'zgarmaydi — SPA odatdagidek ishlaydi

### Yangi post qo'shganda
`scripts/prerender.mjs` dagi `ROUTES` massiviga slug qo'shish:
```javascript
const ROUTES = [
  '/',
  '/blog',
  '/blog/yangi-post-slug',  // ← yangi qo'shiladi
  ...
]
```

---

## Texnik ma'lumot

- Blog sahifasi **lazy-loaded** — asosiy landing tezligiga ta'sir qilmaydi
- O'qish vaqti avtomatik hisoblanadi (200 so'z/daqiqa)
- O'xshash maqolalar bir xil kategoriyadan avtomatik tanlanadi
- Dark mode to'liq qo'llab-quvvatlanadi
- 3 tilda ishlaydi (uz, ru, en)
- **Prerender** — build vaqtida statik HTML yaratadi (SEO uchun)
- **Share tugmasi** — URL ni clipboard ga ko'chiradi, "Nusxa olindi!" feedback beradi
