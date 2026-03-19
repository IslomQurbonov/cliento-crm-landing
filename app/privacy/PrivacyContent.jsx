'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useLanguage } from '@/providers/LanguageProvider';
import { translations } from '@/lib/translations';

export default function PrivacyContent() {
  const { language } = useLanguage();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDarkMode = mounted ? resolvedTheme === 'dark' : false;

  const t = translations[language];
  const legal = t.legal || {};

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src={isDarkMode ? '/images/logo-dark.webp' : '/images/logo-light.webp'}
              alt="Cliento"
              className="h-8 w-auto"
              width={128}
              height={48}
            />
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {legal.backToHome || 'Bosh sahifa'}
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-12 md:py-16 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          {legal.privacyTitle || 'Maxfiylik siyosati'}
        </h1>
        <p className="text-muted-foreground mb-8">
          {legal.lastUpdated || 'Oxirgi yangilanish'}: 2026-03-13
        </p>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
          {/* 1. Kirish */}
          <section>
            <h2 className="text-xl font-semibold mb-3">
              {legal.privacyIntro || '1. Kirish'}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {legal.privacyIntroText ||
                'Cliento CRM (keyingi o\'rinlarda "biz" yoki "Platforma") foydalanuvchilarning shaxsiy ma\'lumotlarini himoya qilishga jiddiy yondashadi. Ushbu Maxfiylik siyosati qanday ma\'lumotlar to\'planishi, qanday ishlatilishi va qanday himoya qilinishini tushuntiradi.'}
            </p>
          </section>

          {/* 2. To'planadigan ma'lumotlar */}
          <section>
            <h2 className="text-xl font-semibold mb-3">
              {legal.privacyDataCollected || "2. To'planadigan ma'lumotlar"}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              {legal.privacyDataCollectedText ||
                "Biz quyidagi turdagi ma'lumotlarni to'plashimiz mumkin:"}
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>
                {legal.privacyData1 ||
                  "Shaxsiy ma'lumotlar: ism, familiya, elektron pochta, telefon raqami"}
              </li>
              <li>
                {legal.privacyData2 || "Kompaniya ma'lumotlari: kompaniya nomi, faoliyat turi"}
              </li>
              <li>
                {legal.privacyData3 ||
                  "Foydalanish ma'lumotlari: Platformaga kirish vaqti, foydalanilgan funksiyalar"}
              </li>
              <li>
                {legal.privacyData4 ||
                  "Texnik ma'lumotlar: IP manzil, brauzer turi, qurilma ma'lumotlari"}
              </li>
              <li>
                {legal.privacyData5 ||
                  "Cookie fayllar va shunga o'xshash texnologiyalar orqali to'plangan ma'lumotlar"}
              </li>
            </ul>
          </section>

          {/* 3. Ma'lumotlardan foydalanish */}
          <section>
            <h2 className="text-xl font-semibold mb-3">
              {legal.privacyDataUsage || "3. Ma'lumotlardan foydalanish maqsadlari"}
            </h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>
                {legal.privacyUsage1 || 'Platforma xizmatlarini taqdim etish va yaxshilash'}
              </li>
              <li>
                {legal.privacyUsage2 || 'Foydalanuvchi hisobini yaratish va boshqarish'}
              </li>
              <li>{legal.privacyUsage3 || "Texnik yordam ko'rsatish"}</li>
              <li>
                {legal.privacyUsage4 ||
                  "Yangiliklar va muhim o'zgarishlar haqida xabar berish"}
              </li>
              <li>
                {legal.privacyUsage5 || "Platformaning xavfsizligini ta'minlash"}
              </li>
              <li>{legal.privacyUsage6 || 'Qonuniy talablarni bajarish'}</li>
            </ul>
          </section>

          {/* 4. Ma'lumotlarni himoya qilish */}
          <section>
            <h2 className="text-xl font-semibold mb-3">
              {legal.privacyProtection || "4. Ma'lumotlarni himoya qilish"}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {legal.privacyProtectionText ||
                "Biz shaxsiy ma'lumotlaringizni himoya qilish uchun zamonaviy xavfsizlik choralarini qo'llaymiz: ma'lumotlarni shifrlash (SSL/TLS), xavfsiz serverlardan foydalanish, muntazam xavfsizlik tekshiruvlari va kirish huquqlarini boshqarish. Ammo, internet orqali ma'lumot uzatishda 100% xavfsizlikni kafolatlash mumkin emasligini e'tiboringizga havola qilamiz."}
            </p>
          </section>

          {/* 5. Uchinchi tomonlar */}
          <section>
            <h2 className="text-xl font-semibold mb-3">
              {legal.privacyThirdParty || "5. Uchinchi tomonlar bilan ma'lumot almashish"}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {legal.privacyThirdPartyText ||
                "Biz shaxsiy ma'lumotlaringizni uchinchi tomonlarga sotmaymiz. Quyidagi hollarda ma'lumotlar ulashilishi mumkin: qonun talabiga binoan davlat organlariga, Platforma xizmatlarini ta'minlovchi ishonchli hamkorlarga (hosting, to'lov tizimlari), foydalanuvchining roziligi bilan."}
            </p>
          </section>

          {/* 6. Cookie */}
          <section>
            <h2 className="text-xl font-semibold mb-3">
              {legal.privacyCookies || '6. Cookie fayllar'}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {legal.privacyCookiesText ||
                "Platforma cookie fayllardan foydalanadi. Cookie fayllar Platformaning to'g'ri ishlashi, foydalanuvchi tajribasini yaxshilash va statistik tahlil qilish uchun ishlatiladi. Siz brauzer sozlamalarida cookie fayllarni boshqarishingiz mumkin."}
            </p>
          </section>

          {/* 7. Foydalanuvchi huquqlari */}
          <section>
            <h2 className="text-xl font-semibold mb-3">
              {legal.privacyRights || '7. Foydalanuvchi huquqlari'}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              {legal.privacyRightsText || 'Siz quyidagi huquqlarga egasiz:'}
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>
                {legal.privacyRight1 ||
                  "O'zingiz haqidagi to'plangan ma'lumotlarni bilish huquqi"}
              </li>
              <li>
                {legal.privacyRight2 ||
                  "Ma'lumotlaringizni tuzatish yoki yangilash huquqi"}
              </li>
              <li>
                {legal.privacyRight3 || "Ma'lumotlaringizni o'chirish so'rash huquqi"}
              </li>
              <li>
                {legal.privacyRight4 ||
                  "Ma'lumotlarni qayta ishlashga e'tiroz bildirish huquqi"}
              </li>
              <li>
                {legal.privacyRight5 || "Hisobingizni to'liq o'chirish huquqi"}
              </li>
            </ul>
          </section>

          {/* 8. Ma'lumotlarni saqlash */}
          <section>
            <h2 className="text-xl font-semibold mb-3">
              {legal.privacyRetention || "8. Ma'lumotlarni saqlash muddati"}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {legal.privacyRetentionText ||
                "Shaxsiy ma'lumotlaringiz hisob faol bo'lgan davr mobaynida saqlanadi. Hisob o'chirilgandan so'ng, ma'lumotlar 30 kun ichida tizimdan butunlay o'chiriladi, qonun talablari bundan mustasno."}
            </p>
          </section>

          {/* 9. Bolalar maxfiyligi */}
          <section>
            <h2 className="text-xl font-semibold mb-3">
              {legal.privacyChildren || '9. Bolalar maxfiyligi'}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {legal.privacyChildrenText ||
                "Platforma 18 yoshdan kichik shaxslar uchun mo'ljallanmagan. Biz bila turib voyaga yetmaganlardan shaxsiy ma'lumotlarni to'plamaymiz."}
            </p>
          </section>

          {/* 10. O'zgarishlar */}
          <section>
            <h2 className="text-xl font-semibold mb-3">
              {legal.privacyChanges || "10. Siyosatni o'zgartirish"}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {legal.privacyChangesText ||
                "Biz ushbu Maxfiylik siyosatini vaqti-vaqti bilan yangilashimiz mumkin. O'zgarishlar Platformada e'lon qilinadi. Muhim o'zgarishlar haqida elektron pochta orqali xabar beriladi."}
            </p>
          </section>

          {/* 11. Bog'lanish */}
          <section>
            <h2 className="text-xl font-semibold mb-3">
              {legal.privacyContact || "11. Bog'lanish"}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {legal.privacyContactText ||
                "Maxfiylik siyosati bo'yicha savollar yoki so'rovlar uchun biz bilan bog'laning:"}
            </p>
            <ul className="mt-2 space-y-1 text-muted-foreground">
              <li>
                Email:{' '}
                <a href="mailto:info@cliento.uz" className="text-primary hover:underline">
                  info@cliento.uz
                </a>
              </li>
              <li>
                Telegram:{' '}
                <a
                  href="https://t.me/code_mode"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  @code_mode
                </a>
              </li>
              <li>
                {legal.termsContactPhone || 'Telefon'}:{' '}
                <a href="tel:+998771147555" className="text-primary hover:underline">
                  +998 77 114 75 55
                </a>
              </li>
            </ul>
          </section>
        </div>

        {/* Back link */}
        <div className="mt-12 pt-8 border-t border-border">
          <Link href="/" className="inline-flex items-center gap-2 text-primary hover:underline">
            <ArrowLeft className="w-4 h-4" />
            {legal.backToHome || 'Bosh sahifaga qaytish'}
          </Link>
        </div>
      </main>
    </div>
  );
}
