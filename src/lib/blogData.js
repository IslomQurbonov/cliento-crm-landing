export const blogCategories = [
  { id: "crm-basics", color: "#3B82F6", uz: "CRM asoslari", ru: "Основы CRM", en: "CRM Basics" },
  { id: "tips", color: "#10B981", uz: "Maslahatlar", ru: "Советы", en: "Tips" },
  { id: "updates", color: "#8B5CF6", uz: "Yangiliklar", ru: "Обновления", en: "Updates" },
  { id: "business", color: "#F59E0B", uz: "Biznes", ru: "Бизнес", en: "Business" },
];

export const blogTranslations = {
  uz: {
    pageTitle: "Blog",
    pageDescription: "CRM, biznes boshqaruvi va Cliento yangiliklari haqida foydali maqolalar",
    title: "Blog",
    subtitle: "CRM, biznes boshqaruvi va Cliento yangiliklari haqida foydali maqolalar",
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
  },
  ru: {
    pageTitle: "Блог",
    pageDescription: "Полезные статьи о CRM, управлении бизнесом и новостях Cliento",
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
  },
  en: {
    pageTitle: "Blog",
    pageDescription: "Useful articles about CRM, business management, and Cliento updates",
    title: "Blog",
    subtitle: "Useful articles about CRM, business management, and Cliento updates",
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
    postNotFoundDesc: "The article you are looking for does not exist or has been removed.",
    publishedOn: "Published on",
    author: "Author",
    tags: "Tags",
    searchPlaceholder: "Search articles...",
    minutes: "minutes",
  },
};

export const blogPosts = [
  {
    slug: "crm-nima-va-biznesingizga-qanday-yordam-beradi",
    category: "crm-basics",
    coverImage: "/blog/crm-nima-va-biznesingizga-qanday-yordam-beradi-cover.webp",
    author: "Cliento",
    publishedAt: "2026-02-10",
    tags: ["crm", "biznes", "avtomatlashtirish", "mijozlar"],
    uz: {
      title: "CRM nima va u biznesingizga qanday yordam beradi?",
      description:
        "CRM tizimi nima ekanligini, uning asosiy vazifalari va kichik biznes uchun qanday foyda keltirishini batafsil tushuntiramiz.",
      content: [
        {
          type: "paragraph",
          text: "Bugungi raqobatbardosh bozorda mijozlar bilan munosabatlarni samarali boshqarish har qanday biznesning muvaffaqiyati uchun muhim ahamiyatga ega. Aynan shu yerda CRM tizimlari o'z o'rnini topadi. CRM (Customer Relationship Management) — bu mijozlar bilan munosabatlarni boshqarish tizimi bo'lib, u barcha mijoz ma'lumotlarini bir joyda saqlash, sotish jarayonlarini kuzatish va xizmat ko'rsatish sifatini oshirish imkonini beradi.",
        },
        {
          type: "heading",
          level: 2,
          text: "CRM tizimi qanday ishlaydi?",
        },
        {
          type: "paragraph",
          text: "CRM tizimi sizning barcha mijozlaringiz haqidagi ma'lumotlarni yagona bazada saqlaydi. Bu ma'lumotlar orasida ism, telefon raqami, elektron pochta, xarid tarixi, muloqot yozuvlari va boshqa muhim tafsilotlar bor. Har bir mijoz bilan bo'lgan aloqa — telefon qo'ng'iroqlari, uchrashuv natijalari, yuborilgan takliflar — hammasini bir joyda ko'rishingiz mumkin.",
        },
        {
          type: "image",
          src: "/blog/crm-dashboard-example.webp",
          alt: "CRM tizimi boshqaruv paneli namunasi",
          caption:
            "Cliento CRM boshqaruv paneli — barcha muhim ko'rsatkichlar bir joyda",
        },
        {
          type: "heading",
          level: 2,
          text: "CRM tizimining asosiy vazifalari",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "Mijozlar bazasini markazlashtirilgan holda saqlash va boshqarish",
            "Sotish jarayonini bosqichma-bosqich kuzatish (lead, deal, to'lov)",
            "Vazifalar va eslatmalarni belgilash, jamoaga taqsimlash",
            "Telefon qo'ng'iroqlari va uchrashuvlarni qayd qilish",
            "Hisobotlar va tahlillar orqali biznes ko'rsatkichlarini kuzatish",
            "Ma'lumotlarni import va eksport qilish",
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "Kichik biznes uchun CRM nima uchun kerak?",
        },
        {
          type: "paragraph",
          text: "Ko'plab kichik biznes egalari mijozlar ma'lumotlarini Excel jadvallari yoki oddiy daftarlarda saqlashadi. Bu usul boshida qulay tuyulishi mumkin, lekin biznes o'sgan sari jiddiy muammolarga olib keladi: ma'lumotlar yo'qolishi, takroriy ishlar, mijozlarga o'z vaqtida javob bermaslik va natijada ularni yo'qotish.",
        },
        {
          type: "quote",
          text: "Mijozni yo'qotish yangi mijoz topishdan 5-7 baravar qimmatga tushadi. CRM tizimi mavjud mijozlarni saqlab qolishning eng samarali vositasidir.",
          author: "Harvard Business Review tadqiqoti",
        },
        {
          type: "heading",
          level: 2,
          text: "CRM tizimining biznesga foydasi raqamlarda",
        },
        {
          type: "paragraph",
          text: "Tadqiqotlarga ko'ra, CRM tizimini joriy etgan kompaniyalar savdo samaradorligini o'rtacha 29% ga oshirgan. Bundan tashqari, mijozlarni saqlab qolish darajasi 27% ga yaxshilangan va har bir sotuvchining mahsuldorligi 34% ga oshgan. Bu raqamlar CRM tizimiga sarflangan investitsiyaning qanchalik tez qaytishini ko'rsatadi.",
        },
        {
          type: "heading",
          level: 2,
          text: "Cliento CRM qanday yordam beradi?",
        },
        {
          type: "paragraph",
          text: "Cliento CRM O'zbekistondagi kichik va o'rta biznes uchun maxsus ishlab chiqilgan. U o'zbek tilidagi interfeysga ega va mahalliy biznes ehtiyojlarini hisobga olgan holda yaratilgan. Cliento orqali siz mijozlar bazasini boshqarishingiz, sotish jarayonini kuzatishingiz, vazifalarni jamoangizga taqsimlashingiz va moliyaviy ko'rsatkichlarni tahlil qilishingiz mumkin.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Ro'yxatdan o'ting va demo rejimda tizimni sinab ko'ring",
            "Mavjud mijozlar bazangizni import qiling",
            "Jamoangiz a'zolarini qo'shing va vazifalarni taqsimlang",
            "Sotish jarayonini bosqichma-bosqich kuzatishni boshlang",
            "Hisobotlar orqali biznesingiz o'sishini kuzating",
          ],
        },
        {
          type: "heading",
          level: 3,
          text: "Xulosa",
        },
        {
          type: "paragraph",
          text: "CRM tizimi zamonaviy biznesning ajralmas qismidir. U nafaqat mijozlar ma'lumotlarini tartibga soladi, balki butun jamoaning samarali ishlashini ta'minlaydi. Agar siz hali CRM tizimidan foydalanmayotgan bo'lsangiz, hozir boshlash uchun eng yaxshi vaqt. Cliento CRM bilan biznesingizni yangi bosqichga olib chiqing.",
        },
      ],
    },
    ru: {
      title: "Что такое CRM и как она помогает вашему бизнесу?",
      description:
        "Подробно объясняем, что такое CRM-система, её основные функции и какую пользу она приносит малому бизнесу.",
      content: [
        {
          type: "paragraph",
          text: "В условиях современной конкуренции эффективное управление отношениями с клиентами является ключевым фактором успеха любого бизнеса. CRM (Customer Relationship Management) — это система управления взаимоотношениями с клиентами, которая позволяет хранить все данные о клиентах в одном месте, отслеживать процессы продаж и повышать качество обслуживания.",
        },
        {
          type: "heading",
          level: 2,
          text: "Как работает CRM-система?",
        },
        {
          type: "paragraph",
          text: "CRM хранит всю информацию о ваших клиентах в единой базе данных: имена, контакты, историю покупок, записи общения. Каждое взаимодействие с клиентом — звонки, встречи, предложения — можно просмотреть в одном интерфейсе.",
        },
        {
          type: "heading",
          level: 2,
          text: "Основные функции CRM",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "Централизованное хранение и управление базой клиентов",
            "Пошаговое отслеживание процесса продаж",
            "Назначение задач и напоминаний команде",
            "Фиксация звонков и встреч",
            "Отчёты и аналитика бизнес-показателей",
          ],
        },
        {
          type: "quote",
          text: "Потеря клиента обходится в 5-7 раз дороже, чем привлечение нового. CRM — самый эффективный инструмент для удержания существующих клиентов.",
          author: "Исследование Harvard Business Review",
        },
        {
          type: "heading",
          level: 2,
          text: "Как Cliento CRM помогает бизнесу?",
        },
        {
          type: "paragraph",
          text: "Cliento CRM разработана специально для малого и среднего бизнеса в Узбекистане. Система имеет интерфейс на узбекском языке и учитывает потребности местного бизнеса. С Cliento вы можете управлять клиентской базой, отслеживать продажи, распределять задачи и анализировать финансовые показатели.",
        },
        {
          type: "paragraph",
          text: "CRM-система — неотъемлемая часть современного бизнеса. Если вы ещё не используете CRM, самое время начать. Попробуйте Cliento CRM и выведите свой бизнес на новый уровень.",
        },
      ],
    },
    en: {
      title: "What is CRM and how does it help your business?",
      description:
        "A detailed explanation of what a CRM system is, its core functions, and how it benefits small businesses.",
      content: [
        {
          type: "paragraph",
          text: "In today's competitive market, effectively managing customer relationships is crucial for any business's success. CRM (Customer Relationship Management) is a system that allows you to store all customer data in one place, track sales processes, and improve service quality.",
        },
        {
          type: "heading",
          level: 2,
          text: "How does a CRM system work?",
        },
        {
          type: "paragraph",
          text: "A CRM stores all your customer information in a unified database: names, contacts, purchase history, and communication records. Every interaction with a client — calls, meetings, proposals — can be viewed in a single interface.",
        },
        {
          type: "heading",
          level: 2,
          text: "Key CRM functions",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "Centralized customer database management",
            "Step-by-step sales process tracking",
            "Task and reminder assignment for teams",
            "Call and meeting logging",
            "Reports and business analytics",
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "How Cliento CRM helps your business",
        },
        {
          type: "paragraph",
          text: "Cliento CRM is designed specifically for small and medium businesses in Uzbekistan. It features an Uzbek-language interface and addresses the needs of local businesses. With Cliento, you can manage your client base, track sales, assign tasks, and analyze financial performance.",
        },
        {
          type: "paragraph",
          text: "A CRM system is an essential part of modern business. If you haven't started using one yet, now is the perfect time. Try Cliento CRM and take your business to the next level.",
        },
      ],
    },
  },
  {
    slug: "mijozlarni-yoqotmaslik-uchun-7-ta-tavsiya",
    category: "tips",
    coverImage: "/blog/mijozlarni-yoqotmaslik-uchun-7-ta-tavsiya-cover.webp",
    author: "Cliento",
    publishedAt: "2026-02-25",
    tags: ["mijozlar", "maslahatlar", "sotish", "xizmat"],
    uz: {
      title: "Mijozlarni yo'qotmaslik uchun 7 ta tavsiya",
      description:
        "Mijozlarni saqlab qolish va ular bilan uzoq muddatli munosabat o'rnatish uchun amaliy maslahatlar to'plami.",
      content: [
        {
          type: "paragraph",
          text: "Har qanday biznes uchun yangi mijozlar jalb qilish muhim, lekin mavjud mijozlarni saqlab qolish bundan ham muhimroqdir. Statistikaga ko'ra, mavjud mijozga qayta sotish ehtimoli 60-70% ni tashkil etadi, yangi mijozga esa bu ko'rsatkich atigi 5-20%. Quyida mijozlarni yo'qotmaslik uchun 7 ta amaliy tavsiyani keltiramiz.",
        },
        {
          type: "heading",
          level: 2,
          text: "1. Har bir mijoz bilan shaxsiy munosabat o'rnating",
        },
        {
          type: "paragraph",
          text: "Mijozlar o'zlarini qadrlanayotganini his qilishni xohlaydi. Ularning ismini eslang, oldingi xaridlari va afzalliklarini yodda tuting. CRM tizimida har bir mijoz haqida batafsil ma'lumot saqlash orqali siz keyingi muloqotda shaxsiy yondashuvni namoyish eta olasiz. Masalan, tug'ilgan kunida tabrik yuborish yoki oldingi xaridiga mos yangi taklif berish kabi oddiy harakatlar katta farq yaratadi.",
        },
        {
          type: "heading",
          level: 2,
          text: "2. Muammolarni tezkor hal qiling",
        },
        {
          type: "paragraph",
          text: "Mijoz shikoyat qilganda, bu aslida sizga ikkinchi imkoniyat berayotgani. Tadqiqotlarga ko'ra, muammosi tezda hal qilingan mijozlarning 70% dan ortig'i qayta xarid qiladi. Shikoyatlarni e'tiborsiz qoldirmang — ularni biznesni yaxshilash uchun imkoniyat sifatida qabul qiling. Cliento CRM da vazifalar va eslatmalar orqali mijoz muammolarini kuzatib borish va o'z vaqtida hal qilish oson.",
        },
        {
          type: "image",
          src: "/blog/client-retention-stats.webp",
          alt: "Mijozlarni saqlab qolish statistikasi",
          caption:
            "Mijozni saqlab qolish xarajati yangi mijoz jalb qilishdan kamroq",
        },
        {
          type: "heading",
          level: 2,
          text: "3. Muntazam aloqada bo'ling",
        },
        {
          type: "paragraph",
          text: "Mijoz sizni unutmasligi uchun muntazam aloqada bo'lish kerak. Bu har kuni qo'ng'iroq qilish degani emas — ortiqcha bosim ham yoqimsiz. Maqsadli va foydali aloqa o'rnating: yangi xizmatlar haqida xabar bering, maxsus takliflar yuboring, yoki oddiygina hal-ahvol so'rang. CRM tizimdagi eslatmalar bu jarayonni avtomatlashtirishga yordam beradi.",
        },
        {
          type: "heading",
          level: 2,
          text: "4. Xizmat sifatini doimiy ravishda oshiring",
        },
        {
          type: "paragraph",
          text: "Mijozlarning kutishlari doimo o'sib boradi. Agar siz bir joyda to'xtab qolsangiz, raqobatchilar sizni ortda qoldiradi. Mijozlardan fikr-mulohaza so'rang, ularning takliflarini hisobga oling va xizmatlaringizni muntazam ravishda yaxshilab boring. Kichik, lekin izchil yaxshilanishlar vaqt o'tishi bilan katta farq yaratadi.",
        },
        {
          type: "quote",
          text: "Eng yaxshi marketing — bu mamnun mijozning tavsiyasi. Mijoz tajribasiga investitsiya qilish eng samarali reklama strategiyasidir.",
          author: "Jeff Bezos",
        },
        {
          type: "heading",
          level: 2,
          text: "5. Sodiqlik dasturlari yarating",
        },
        {
          type: "paragraph",
          text: "Doimiy mijozlarni rag'batlantirish uchun sodiqlik dasturlarini joriy eting. Bu chegirmalar, bonuslar, maxsus takliflar yoki ustuvor xizmat ko'rsatish shaklida bo'lishi mumkin. Mijoz sizning xizmatlaringizdan foydalangani uchun qo'shimcha qiymat olayotganini his qilishi kerak. CRM tizimida har bir mijozning xarid tarixini kuzatish orqali shaxsiy takliflar tayyorlash oson.",
        },
        {
          type: "heading",
          level: 2,
          text: "6. Jamoangizni mijozlarga xizmat ko'rsatishga o'rgating",
        },
        {
          type: "paragraph",
          text: "Sizning xodimlaringiz biznesingizning yuzi. Ular mijozlar bilan qanday muloqot qilishi, muammolarga qanday yondashishi va xizmat ko'rsatish sifati to'g'ridan-to'g'ri mijozning qaytib kelish yoki ketish qaroriga ta'sir qiladi. Jamoangizga muntazam treninglar o'tkazing va mijozlarga xizmat ko'rsatish standartlarini belgilang.",
        },
        {
          type: "heading",
          level: 2,
          text: "7. Ma'lumotlarga asoslangan qarorlar qabul qiling",
        },
        {
          type: "paragraph",
          text: "Sezgi va tajribaga tayanish yaxshi, lekin raqamlar yanada ishonchliroq. CRM tizimidagi hisobotlar va tahlillar orqali qaysi mijozlar ketish xavfi ostida ekanini, qaysi xizmatlar eng mashhur ekanini va qaysi jarayonlarda muammo borligini aniqlashingiz mumkin. Cliento CRM ning dashboard funksiyasi biznesingizning to'liq rasmini ko'rishga yordam beradi.",
        },
        {
          type: "heading",
          level: 3,
          text: "Xulosa",
        },
        {
          type: "paragraph",
          text: "Mijozlarni saqlab qolish izchil va tizimli yondashuvni talab qiladi. Yuqoridagi 7 ta tavsiyani amaliyotga joriy etish orqali siz mijozlaringiz bilan mustahkam va uzoq muddatli munosabat o'rnata olasiz. Cliento CRM bu jarayonda sizning ishonchli yordamchingiz bo'ladi — har bir mijoz haqida batafsil ma'lumot saqlash, vazifalarni kuzatish va samaradorlikni tahlil qilish orqali.",
        },
      ],
    },
    ru: {
      title: "7 советов, чтобы не потерять клиентов",
      description:
        "Практические советы по удержанию клиентов и построению долгосрочных отношений с ними.",
      content: [
        {
          type: "paragraph",
          text: "Привлечение новых клиентов важно для любого бизнеса, но удержание существующих ещё важнее. По статистике, вероятность повторной продажи существующему клиенту составляет 60-70%, тогда как для нового клиента — всего 5-20%. Ниже приводим 7 практических советов по удержанию клиентов.",
        },
        {
          type: "heading",
          level: 2,
          text: "1. Установите личные отношения с каждым клиентом",
        },
        {
          type: "paragraph",
          text: "Клиенты хотят чувствовать себя ценными. Запоминайте их имена, предыдущие покупки и предпочтения. Хранение подробной информации о каждом клиенте в CRM-системе позволяет демонстрировать персональный подход при каждом взаимодействии.",
        },
        {
          type: "heading",
          level: 2,
          text: "2. Решайте проблемы оперативно",
        },
        {
          type: "paragraph",
          text: "Когда клиент жалуется — это на самом деле второй шанс. Более 70% клиентов, чьи проблемы были быстро решены, совершают повторные покупки. Не игнорируйте жалобы — воспринимайте их как возможность для улучшения.",
        },
        {
          type: "heading",
          level: 2,
          text: "3. Поддерживайте регулярный контакт",
        },
        {
          type: "paragraph",
          text: "Чтобы клиент не забыл о вас, поддерживайте регулярную связь. Это не значит звонить каждый день — чрезмерное давление тоже неприятно. Информируйте о новых услугах, отправляйте специальные предложения или просто интересуйтесь делами.",
        },
        {
          type: "quote",
          text: "Лучший маркетинг — это рекомендация довольного клиента. Инвестирование в клиентский опыт — самая эффективная рекламная стратегия.",
          author: "Джефф Безос",
        },
        {
          type: "heading",
          level: 2,
          text: "4-7. Качество, лояльность, обучение команды и аналитика",
        },
        {
          type: "paragraph",
          text: "Постоянно повышайте качество услуг, создавайте программы лояльности для постоянных клиентов, обучайте свою команду стандартам обслуживания и принимайте решения на основе данных. CRM-система Cliento поможет отслеживать все эти аспекты и выявлять клиентов, которые рискуют уйти.",
        },
        {
          type: "paragraph",
          text: "Удержание клиентов требует системного подхода. Внедряя эти 7 советов, вы построите крепкие долгосрочные отношения с клиентами. Cliento CRM станет вашим надёжным помощником в этом процессе.",
        },
      ],
    },
    en: {
      title: "7 tips to stop losing clients",
      description:
        "A collection of practical tips for retaining clients and building long-term relationships with them.",
      content: [
        {
          type: "paragraph",
          text: "Attracting new clients is important for any business, but retaining existing ones is even more so. Statistics show that the probability of selling to an existing client is 60-70%, while for a new prospect it's only 5-20%. Here are 7 practical tips for client retention.",
        },
        {
          type: "heading",
          level: 2,
          text: "1. Build personal relationships with each client",
        },
        {
          type: "paragraph",
          text: "Clients want to feel valued. Remember their names, previous purchases, and preferences. Storing detailed information about each client in a CRM system lets you demonstrate a personal approach with every interaction.",
        },
        {
          type: "heading",
          level: 2,
          text: "2. Resolve problems quickly",
        },
        {
          type: "paragraph",
          text: "When a client complains, they're actually giving you a second chance. Over 70% of clients whose problems were resolved quickly make repeat purchases. Don't ignore complaints — treat them as opportunities for improvement.",
        },
        {
          type: "heading",
          level: 2,
          text: "3. Stay in regular contact",
        },
        {
          type: "paragraph",
          text: "To keep clients from forgetting about you, maintain regular communication. This doesn't mean calling every day — too much pressure is also unpleasant. Share new services, send special offers, or simply check in on how they're doing.",
        },
        {
          type: "heading",
          level: 2,
          text: "4-7. Quality, loyalty, team training, and analytics",
        },
        {
          type: "paragraph",
          text: "Continuously improve service quality, create loyalty programs, train your team on service standards, and make data-driven decisions. Cliento CRM helps you track all these aspects and identify at-risk clients before they leave.",
        },
        {
          type: "paragraph",
          text: "Client retention requires a systematic approach. By implementing these 7 tips, you'll build strong, lasting relationships. Cliento CRM will be your reliable partner in this process.",
        },
      ],
    },
  },
  {
    slug: "cliento-crm-yangi-imkoniyatlari-2026-mart",
    category: "updates",
    coverImage: "/blog/cliento-crm-yangi-imkoniyatlari-2026-mart-cover.webp",
    author: "Cliento",
    publishedAt: "2026-03-05",
    tags: ["yangilik", "update", "deals", "calendar", "import"],
    uz: {
      title: "Cliento CRM yangi imkoniyatlari — 2026 mart",
      description:
        "Cliento CRM ning 2026-yil mart oyidagi yangilanishlari: bitimlar, to'lovlar, kalendar, import va boshqa yaxshilanishlar.",
      content: [
        {
          type: "paragraph",
          text: "Cliento CRM jamoasi doimo tizimni yaxshilash va yangi imkoniyatlar qo'shish ustida ishlaydi. 2026-yil mart oyida biz bir nechta muhim yangilanishlarni taqdim etamiz. Ushbu maqolada barcha o'zgarishlar haqida batafsil ma'lumot beramiz.",
        },
        {
          type: "heading",
          level: 2,
          text: "Bitimlar (Deals) moduli",
        },
        {
          type: "paragraph",
          text: "Eng ko'p kutilgan yangilik — bitimlar moduli. Endi siz har bir mijoz yoki lead bilan bog'liq bitimlarni yaratishingiz, ularni bosqichma-bosqich kuzatishingiz mumkin. Bitim 6 ta bosqichdan o'tadi: Yangi, Kvalifikatsiya, Taklif, Muzokaralar, Yutilgan va Yo'qotilgan. Kanban ko'rinishida barcha bitimlarni vizual ravishda boshqarish imkoniyati mavjud.",
        },
        {
          type: "image",
          src: "/blog/deals-pipeline.webp",
          alt: "Bitimlar pipeline ko'rinishi",
          caption:
            "Yangi bitimlar moduli — Kanban ko'rinishida sotish jarayonini kuzating",
        },
        {
          type: "heading",
          level: 2,
          text: "To'lovlar tizimi",
        },
        {
          type: "paragraph",
          text: "Bitimlar moduli bilan birga to'lovlarni boshqarish imkoniyati ham qo'shildi. Har bir bitim uchun to'lov jadvalini belgilashingiz, qisman to'lovlarni qayd qilishingiz va muddati o'tgan to'lovlarni kuzatishingiz mumkin. To'lov usullari orasida naqd pul, karta, bank o'tkazmasi, Payme, Click va Uzum mavjud.",
        },
        {
          type: "heading",
          level: 2,
          text: "Kalendar ko'rinishi",
        },
        {
          type: "paragraph",
          text: "Yangi kalendar funksiyasi barcha vazifalar, uchrashuvlar, eslatmalar va qo'ng'iroqlarni yagona kalendar ko'rinishida ko'rsatadi. Kun va hafta ko'rinishlari mavjud. Har bir hodisani bosganda tafsilotlarni ko'rishingiz va tezkor o'zgartirishlar kiritishingiz mumkin. Bu funksiya jamoangizning kun tartibini rejalashtirish va boshqarishni ancha osonlashtiradi.",
        },
        {
          type: "heading",
          level: 2,
          text: "Ma'lumotlarni import qilish",
        },
        {
          type: "paragraph",
          text: "Excel yoki CSV fayllardan mijozlar, leadlar va vazifalarni import qilish imkoniyati qo'shildi. Import jarayoni bir necha bosqichdan iborat: fayl yuklash, ustunlarni moslashtirish, oldindan ko'rish va tasdiqlash. Sun'iy intellekt yordamida ustunlarni avtomatik moslashtirish taklif etiladi, bu esa jarayonni yanada tezlashtiradi.",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "Excel (.xlsx) va CSV formatlarini qo'llab-quvvatlash",
            "AI yordamida ustunlarni avtomatik moslashtirish",
            "Import qilishdan oldin ma'lumotlarni ko'rish va tahrirlash",
            "Shablon saqlash — keyingi importlarda vaqtni tejash",
            "Mijozlar, leadlar va vazifalarni import qilish",
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "Leadlar modulidagi yaxshilanishlar",
        },
        {
          type: "paragraph",
          text: "Leadlar moduli bir nechta muhim yaxshilanishlarni oldi. Endi leadlarni mijozlarga konvertatsiya qilish bir tugma bilan amalga oshiriladi. Lead manbalari kengaytirildi: Instagram, Telegram, veb-forma, tavsiya, import va qo'lda kiritish. Shuningdek, lead yo'qotish sabablari ham qo'shildi — bu sizga sotish jarayonidagi zaif nuqtalarni aniqlashga yordam beradi.",
        },
        {
          type: "heading",
          level: 2,
          text: "Bildirishnomalar tizimi",
        },
        {
          type: "paragraph",
          text: "Bildirishnomalar tizimi to'liq qayta ishlab chiqildi. Endi siz vazifa tayinlanganda, bitim bosqichi o'zgarganda, eslatma muddati kelganda va to'lov muddati yaqinlashganda bildirishnoma olasiz. Brauzer bildirishnomalari ham qo'llab-quvvatlanadi — ilova ochiq bo'lmasa ham muhim xabarlarni ko'rasiz.",
        },
        {
          type: "heading",
          level: 3,
          text: "Boshqa yaxshilanishlar",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "Maxsus maydonlar (custom fields) — mijozlarga qo'shimcha ma'lumot maydonlari qo'shish",
            "Eksport funksiyasi — ma'lumotlarni Excel formatida yuklab olish",
            "Qo'ng'iroqlar jurnali — kiruvchi va chiquvchi qo'ng'iroqlarni qayd qilish",
            "Uchrashuvlar moduli — uchrashuvlarni rejalashtirish va natijalarini qayd qilish",
            "Qorong'u rejim (Dark mode) — ko'zni charchatmaydigan tungi ko'rinish",
          ],
        },
        {
          type: "heading",
          level: 3,
          text: "Keyingi rejalar",
        },
        {
          type: "paragraph",
          text: "Biz kelgusi oylarda Telegram bot integratsiyasini kengaytirish, mobil ilova yaratish va hisobotlar tizimini yanada kuchaytirish ustida ishlamoqdamiz. Cliento CRM ni tanlagan ishonchingiz uchun rahmat — biz sizning biznesingiz muvaffaqiyati uchun doimo yaxshilanib boramiz.",
        },
      ],
    },
    ru: {
      title: "Новые возможности Cliento CRM — март 2026",
      description:
        "Обновления Cliento CRM за март 2026: сделки, платежи, календарь, импорт данных и другие улучшения.",
      content: [
        {
          type: "paragraph",
          text: "Команда Cliento CRM постоянно работает над улучшением системы. В марте 2026 года мы представляем несколько важных обновлений. В этой статье подробно расскажем обо всех изменениях.",
        },
        {
          type: "heading",
          level: 2,
          text: "Модуль сделок (Deals)",
        },
        {
          type: "paragraph",
          text: "Самое ожидаемое обновление — модуль сделок. Теперь вы можете создавать сделки, привязанные к клиентам или лидам, и отслеживать их по 6 этапам: Новая, Квалификация, Предложение, Переговоры, Выиграна и Проиграна. Доступно визуальное управление в формате Kanban.",
        },
        {
          type: "heading",
          level: 2,
          text: "Система платежей",
        },
        {
          type: "paragraph",
          text: "Вместе с модулем сделок добавлено управление платежами. Для каждой сделки можно задать график платежей, фиксировать частичные оплаты и отслеживать просроченные платежи. Поддерживаются способы оплаты: наличные, карта, банковский перевод, Payme, Click и Uzum.",
        },
        {
          type: "heading",
          level: 2,
          text: "Календарь, импорт и другие улучшения",
        },
        {
          type: "paragraph",
          text: "Новый календарь объединяет задачи, встречи, напоминания и звонки в едином виде. Импорт данных из Excel и CSV теперь поддерживает AI-подсказки для сопоставления столбцов. Также добавлены кастомные поля, экспорт в Excel, журнал звонков, модуль встреч и тёмная тема.",
        },
        {
          type: "paragraph",
          text: "В ближайшие месяцы мы планируем расширить интеграцию с Telegram-ботом, создать мобильное приложение и усилить систему отчётов. Спасибо за доверие к Cliento CRM.",
        },
      ],
    },
    en: {
      title: "Cliento CRM new features — March 2026",
      description:
        "Cliento CRM March 2026 updates: deals, payments, calendar, data import, and other improvements.",
      content: [
        {
          type: "paragraph",
          text: "The Cliento CRM team continuously works on improving the system. In March 2026, we're introducing several important updates. This article covers all the changes in detail.",
        },
        {
          type: "heading",
          level: 2,
          text: "Deals module",
        },
        {
          type: "paragraph",
          text: "The most anticipated update is the deals module. You can now create deals linked to clients or leads and track them through 6 stages: New, Qualification, Proposal, Negotiation, Won, and Lost. Visual Kanban-style management is available for easy pipeline tracking.",
        },
        {
          type: "heading",
          level: 2,
          text: "Payment system",
        },
        {
          type: "paragraph",
          text: "Alongside the deals module, payment management has been added. You can set payment schedules for each deal, record partial payments, and track overdue payments. Supported methods include cash, card, bank transfer, Payme, Click, and Uzum.",
        },
        {
          type: "heading",
          level: 2,
          text: "Calendar, import, and other improvements",
        },
        {
          type: "paragraph",
          text: "The new calendar view unifies tasks, meetings, reminders, and calls. Data import from Excel and CSV now supports AI-powered column matching. Additional features include custom fields, Excel export, call logging, meetings module, and dark mode.",
        },
        {
          type: "paragraph",
          text: "In the coming months, we plan to expand Telegram bot integration, build a mobile app, and enhance the reporting system. Thank you for choosing Cliento CRM.",
        },
      ],
    },
  },
];

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

export function getRelatedPosts(slug, limit = 3) {
  const currentPost = blogPosts.find((post) => post.slug === slug);
  if (!currentPost) return [];

  return blogPosts
    .filter(
      (post) =>
        post.slug !== slug && post.category === currentPost.category
    )
    .slice(0, limit);
}
