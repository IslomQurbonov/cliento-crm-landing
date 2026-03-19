import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import SEOHead from "../components/SEOHead";
import { translations } from "../lib/translations";
import logoDark from "../assets/images/logo-dark.webp";
import logoLight from "../assets/images/logo-light.webp";

const TermsOfService = ({ language, isDarkMode }) => {
  const t = translations[language];
  const legal = t.legal || {};

  return (
    <>
      <SEOHead
        title={`${legal.termsTitle || "Foydalanish shartlari"} — Cliento CRM`}
        description={legal.termsMetaDesc || "Cliento CRM platformasidan foydalanish shartlari va qoidalari"}
        path="/terms"
        language={language}
      />

      <div className="min-h-screen bg-background text-foreground">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center">
              <img
                src={isDarkMode ? logoDark : logoLight}
                alt="Cliento"
                className="h-8 w-auto"
                width={128}
                height={48}
              />
            </Link>
            <Link
              to="/"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {legal.backToHome || "Bosh sahifa"}
            </Link>
          </div>
        </header>

        {/* Content */}
        <main className="container mx-auto px-4 py-12 md:py-16 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {legal.termsTitle || "Foydalanish shartlari"}
          </h1>
          <p className="text-muted-foreground mb-8">
            {legal.lastUpdated || "Oxirgi yangilanish"}: 2026-03-13
          </p>

          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
            {/* 1. Umumiy qoidalar */}
            <section>
              <h2 className="text-xl font-semibold mb-3">
                {legal.termsGeneral || "1. Umumiy qoidalar"}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {legal.termsGeneralText || "Ushbu foydalanish shartlari (keyingi o'rinlarda \"Shartlar\") Cliento CRM platformasidan (keyingi o'rinlarda \"Platforma\") foydalanish qoidalarini belgilaydi. Platformadan foydalanish orqali siz ushbu Shartlarga rozilik bildirasiz. Agar siz ushbu Shartlarga rozi bo'lmasangiz, Platformadan foydalanmasligingiz so'raladi."}
              </p>
            </section>

            {/* 2. Xizmatlar ta'rifi */}
            <section>
              <h2 className="text-xl font-semibold mb-3">
                {legal.termsServices || "2. Xizmatlar ta'rifi"}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {legal.termsServicesText || "Cliento CRM — kichik va o'rta bizneslar uchun mo'ljallangan mijozlar bilan munosabatlarni boshqarish (CRM) platformasi. Platforma mijozlar bazasini yuritish, vazifalar, uchrashuvlar, eslatmalar, bitimlar va boshqa biznes jarayonlarini boshqarish imkoniyatini beradi."}
              </p>
            </section>

            {/* 3. Ro'yxatdan o'tish */}
            <section>
              <h2 className="text-xl font-semibold mb-3">
                {legal.termsRegistration || "3. Ro'yxatdan o'tish va hisob"}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {legal.termsRegistrationText || "Platformadan foydalanish uchun ro'yxatdan o'tish talab etiladi. Siz hisob ma'lumotlaringizning (login, parol) xavfsizligini ta'minlash uchun javobgarsiz. Hisob ma'lumotlaringizni uchinchi shaxslarga bermasligingiz shart. Noto'g'ri yoki soxta ma'lumotlar bilan ro'yxatdan o'tish taqiqlanadi."}
              </p>
            </section>

            {/* 4. To'lov shartlari */}
            <section>
              <h2 className="text-xl font-semibold mb-3">
                {legal.termsPayment || "4. To'lov shartlari"}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {legal.termsPaymentText || "Platforma pullik va bepul (demo) rejimlarni taqdim etadi. Pullik obuna tanlaganda, to'lov tanlangan tarifga muvofiq amalga oshiriladi. To'lovlar qaytarilmasligi mumkin, bundan maxsus hollar mustasno. Tariflar va narxlar o'zgarishi mumkin — bu haqda foydalanuvchilar oldindan xabardor qilinadi."}
              </p>
            </section>

            {/* 5. Foydalanuvchi majburiyatlari */}
            <section>
              <h2 className="text-xl font-semibold mb-3">
                {legal.termsObligations || "5. Foydalanuvchi majburiyatlari"}
              </h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>{legal.termsObligation1 || "Platformadan qonuniy maqsadlarda foydalanish"}</li>
                <li>{legal.termsObligation2 || "Boshqa foydalanuvchilar huquqlarini hurmat qilish"}</li>
                <li>{legal.termsObligation3 || "Platformaga zarar yetkazuvchi harakatlar qilmaslik"}</li>
                <li>{legal.termsObligation4 || "Hisob ma'lumotlarini xavfsiz saqlash"}</li>
                <li>{legal.termsObligation5 || "Noqonuniy kontent joylashtirmaslik"}</li>
              </ul>
            </section>

            {/* 6. Intellektual mulk */}
            <section>
              <h2 className="text-xl font-semibold mb-3">
                {legal.termsIP || "6. Intellektual mulk huquqlari"}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {legal.termsIPText || "Platformaning barcha kontent, dizayn, logotip, dasturiy ta'minot va boshqa intellektual mulk elementlari Cliento CRM ga tegishli. Ularni ruxsatsiz nusxalash, tarqatish yoki o'zgartirish taqiqlanadi."}
              </p>
            </section>

            {/* 7. Javobgarlikni cheklash */}
            <section>
              <h2 className="text-xl font-semibold mb-3">
                {legal.termsLiability || "7. Javobgarlikni cheklash"}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {legal.termsLiabilityText || "Platforma \"mavjud holda\" taqdim etiladi. Biz Platformaning uzluksiz va xatosiz ishlashiga kafolat bermaymiz. Texnik nosozliklar, ma'lumotlar yo'qotilishi yoki uchinchi tomon xizmatlari bilan bog'liq muammolar uchun javobgarlik chegaralangan."}
              </p>
            </section>

            {/* 8. Shartlarni o'zgartirish */}
            <section>
              <h2 className="text-xl font-semibold mb-3">
                {legal.termsChanges || "8. Shartlarni o'zgartirish"}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {legal.termsChangesText || "Biz ushbu Shartlarni istalgan vaqtda o'zgartirish huquqini saqlab qolamiz. O'zgarishlar haqida Platforma orqali yoki elektron pochta orqali xabar beriladi. O'zgarishlardan keyin Platformadan foydalanishni davom ettirish yangi Shartlarga rozilik hisoblanadi."}
              </p>
            </section>

            {/* 9. Hisobni to'xtatish */}
            <section>
              <h2 className="text-xl font-semibold mb-3">
                {legal.termsTermination || "9. Hisobni to'xtatish"}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {legal.termsTerminationText || "Siz istalgan vaqtda hisobingizni o'chirishingiz mumkin. Biz Shartlar buzilgan taqdirda hisobingizni ogohlantirish bilan yoki ogohlantirishsiz to'xtatish huquqiga egamiz. Hisob to'xtatilganda ma'lumotlaringiz ma'lum muddat saqlanadi, so'ngra o'chiriladi."}
              </p>
            </section>

            {/* 10. Bog'lanish */}
            <section>
              <h2 className="text-xl font-semibold mb-3">
                {legal.termsContact || "10. Bog'lanish"}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {legal.termsContactText || "Ushbu Shartlar bo'yicha savollar yoki takliflar bo'lsa, biz bilan bog'laning:"}
              </p>
              <ul className="mt-2 space-y-1 text-muted-foreground">
                <li>Email: <a href="mailto:info@cliento.uz" className="text-primary hover:underline">info@cliento.uz</a></li>
                <li>Telegram: <a href="https://t.me/code_mode" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">@code_mode</a></li>
                <li>{legal.termsContactPhone || "Telefon"}: <a href="tel:+998771147555" className="text-primary hover:underline">+998 77 114 75 55</a></li>
              </ul>
            </section>
          </div>

          {/* Back link */}
          <div className="mt-12 pt-8 border-t border-border">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              {legal.backToHome || "Bosh sahifaga qaytish"}
            </Link>
          </div>
        </main>
      </div>
    </>
  );
};

export default TermsOfService;
