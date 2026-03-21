/* ─────────────────────── Blog Articles Index ─────────────────────── */
/* Har bir maqola alohida faylda saqlanadi va shu yerdan eksport qilinadi.
   Yangi maqola qo'shish uchun:
   1. lib/articles/{slug}.js faylini yarating
   2. Shu faylga import va articles massiviga qo'shing
   3. Maqolalar publishedAt bo'yicha yangi → eski tartibda chiqadi       */

import crmNimaToliqQollanma from './crm-nima-toliq-qollanma';
import crmNimaVaBiznesingizga from './crm-nima-va-biznesingizga-qanday-yordam-beradi';
import mijozlarniYoqotmaslik from './mijozlarni-yoqotmaslik-uchun-7-ta-tavsiya';
import clientoCrmYangiImkoniyatlari from './cliento-crm-yangi-imkoniyatlari-2026-mart';

/**
 * Barcha maqolalar massivi.
 * Tartib: yangi → eski (publishedAt bo'yicha sort qilinadi blogData.js da)
 */
export const articles = [
  crmNimaToliqQollanma,
  clientoCrmYangiImkoniyatlari,
  mijozlarniYoqotmaslik,
  crmNimaVaBiznesingizga,
];
