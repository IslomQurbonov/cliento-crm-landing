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
- Har 1000 so'z uchun ~2 ta rasm

---

## Maqola yaratish

### Fayl strukturasi (modular)
Har bir maqola alohida faylda saqlanadi:
```
lib/articles/
  index.js                              ← Barcha maqolalarni eksport qiladi
  crm-nima-toliq-qollanma.js            ← Maqola 1
  mijozlarni-yoqotmaslik-uchun-7-ta-tavsiya.js  ← Maqola 2
  ...
```

`blogData.js` faqat kategoriyalar, tarjimalar va yordamchi funksiyalarni saqlaydi.
Maqolalar `lib/articles/index.js` orqali import qilinadi.

### Slug (URL identifikator)
- Faqat kichik harf, raqam va `-` (tire)
- O'zbekcha so'zlar transliteratsiya qilinmaydi — to'g'ridan to'g'ri yoziladi
- Misol: `crm-nima`, `mijozlarni-yoqotmaslik-7-tavsiya`

### Majburiy maydonlar
```javascript
{
  slug: "maqola-nomi",           // URL uchun
  category: "crm-basics",        // blogCategories dan biri
  coverImage: "/blog/slug-cover.webp",  // Cover rasm yo'li
  author: "Cliento",             // Muallif nomi
  publishedAt: "2026-03-18",     // Nashr sanasi (YYYY-MM-DD)
  tags: ["crm", "biznes"],       // Teglar (SEO uchun muhim)
  relatedSlugs: ["boshqa-maqola-slug"], // Cross-article SEO linking
  uz: { title, description, content },
  ru: { title, description, content },
  en: { title, description, content },
}
```

### Description (meta tavsif)
- 150 belgidan kam (Google qidiruv natijalarida to'liq ko'rinishi uchun)
- Action-driven tilda yozish
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
- Open Graph taglar (og:title, og:description, og:image, article:section)
- JSON-LD BlogPosting schema (headline, author, datePublished, dateModified, image, publisher, wordCount)
- JSON-LD FAQPage schema (agar maqolada FAQ bo'limi bo'lsa — avtomatik aniqlanadi)

### On-page struktura
- Bitta H1 (title) — sahifa sarlavhasi
- H2 asosiy bo'limlar uchun, H3 kichik bo'limlar uchun
- Har 150-200 so'zda yangi heading
- Qisqa paragraflar (2-3 gap)
- Asosiy kalit so'z birinchi 100 so'z ichida bo'lishi kerak

### Maqola hajmi
- **1,800–2,500 so'z** har bir maqolada
- Hech qachon sun'iy to'ldirmang — har bir gap qiymatli bo'lsin

### Featured snippet optimizatsiya
- Asosiy H2 sarlavhalarni savol shaklida yozing
- Savol ostida darhol 40-60 so'zlik javob bering
- Jarayon/qadam kontent uchun tartiblangan ro'yxat ishlating
- Solishtiruv kontent uchun jadval ishlating

### Kalit so'zlar (tags)
- Har bir maqolada kamida 3-5 ta tag
- Teglar o'zbekcha yoziladi
- Umumiy + aniq teglar aralashtiriladi: `["crm", "biznes", "mijozlar", "avtomatlashtirish"]`

### Sitemap
- `app/sitemap.js` avtomatik ravishda barcha blogPosts dan URL yaratadi
- Qo'shimcha amal kerak emas

---

## Cross-article SEO linking

### relatedSlugs maydoni
Har bir maqolada `relatedSlugs` massivi bo'lishi kerak — boshqa tegishli maqolalar sluglari.
Bu "Shuningdek o'qing" bo'limida va SEO interlinking uchun ishlatiladi.

### Linking strategiyasi (10 maqola uchun)
- **Pillar page** (masalan, "CRM nima?") barcha boshqa maqolalarga link qiladi
- **CRM Basics** maqolalari (ta'lim asosi) — bir-biriga va tips/business maqolalarga link qiladi
- **Tips** maqolalari (amaliy qatlam) — pillar ga va 2-3 tegishli maqolaga link qiladi
- **Business** maqolalari (konversiya qatlami) — keng doirada link qiladi, ROI maqolasi oxirgi konversiya bo'lagi

### InternalLinks komponenti
Maqola kontentidan keyin avtomatik `InternalLinks` komponenti chiqadi.
U `relatedSlugs` dagi maqolalarning title va description ini ko'rsatadi.

---

## Yangi maqola qo'shish bosqichlari

1. Rasmlarni tayyorlash (cover 1200x630, content 1200xN, webp format)
2. `public/blog/` ga rasmlarni yuklash
3. `lib/articles/{slug}.js` — yangi maqola faylini yaratish (3 tilda)
4. `lib/articles/index.js` — import qo'shish va articles massiviga qo'shish
5. Boshqa tegishli maqolalarning `relatedSlugs` iga yangi maqola slugini qo'shish
6. `npm run build` bilan tekshirish
7. Commit va push

---

## Texnik ma'lumot

- Blog sahifasi **lazy-loaded** — asosiy landing tezligiga ta'sir qilmaydi
- O'qish vaqti avtomatik hisoblanadi (200 so'z/daqiqa)
- O'xshash maqolalar: avval `relatedSlugs` dan, keyin bir xil kategoriyadan, keyin boshqa kategoriyalardan
- Dark mode to'liq qo'llab-quvvatlanadi
- 3 tilda ishlaydi (uz, ru, en)
- Headinglar avtomatik `id` attribute oladi (anchor link uchun)
- Quote bloklarda `author` alohida `<cite>` tag bilan chiqadi
- **Share tugmasi** — URL ni clipboard ga ko'chiradi, "Nusxa olindi!" feedback beradi
- **InternalLinks** — maqola oxirida cross-article havolalar ko'rsatadi
- **FAQPage schema** — FAQ bo'limi bo'lgan maqolalarda avtomatik JSON-LD yaratiladi
