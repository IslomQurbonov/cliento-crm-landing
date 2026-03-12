import {
  LayoutDashboard,
  Users,
  Target,
  CheckSquare,
  Handshake,
  Bell as BellIcon,
  Phone,
  Calendar,
  Briefcase,
  BarChart3,
  BellRing,
  Settings,
  UserCog,
  Palette,
  Puzzle,
} from "lucide-react";

export const tutorialSections = [
  {
    id: "dashboard",
    icon: LayoutDashboard,
    group: "main",
    screenshots: ["dashboard-main.png"],
    uz: {
      title: "Bosh sahifa (Dashboard)",
      shortDesc: "Asosiy statistikalar va tezkor amallar",
      description:
        "Dashboard — CRM tizimingizning bosh sahifasi. Bu yerda barcha muhim ma'lumotlar bir joyda ko'rinadi: jami mijozlar soni, yangi mijozlar, haftalik/oylik statistikalar va tezkor havolalar.",
      steps: [
        {
          title: "Statistika kartalarini ko'rish",
          text: "Sahifaning yuqori qismida 4 ta statistika kartasi bor: jami mijozlar, bu oy yangi, bu hafta yangi va bugun yangi mijozlar.",
        },
        {
          title: "Grafiklar",
          text: "Pastroqda mijozlar status bo'yicha taqsimoti va oxirgi qo'shilgan mijozlar ro'yxatini ko'rishingiz mumkin.",
        },
        {
          title: "Tezkor amallar",
          text: "Tezkor amallar orqali bir bosish bilan Lidlar, Mijozlar, Vazifalar yoki Bitimlar sahifasiga o'tishingiz mumkin.",
        },
      ],
      tips: [
        "Dashboard har safar tizimga kirganingizda birinchi bo'lib ochiladi",
        "Statistikalar real vaqtda yangilanadi",
      ],
    },
    ru: {
      title: "Главная (Dashboard)",
      shortDesc: "Основная статистика и быстрые действия",
      description:
        "Dashboard — главная страница вашей CRM системы. Здесь собрана вся важная информация: общее количество клиентов, новые клиенты, статистика по неделям/месяцам и быстрые ссылки.",
      steps: [
        {
          title: "Просмотр карточек статистики",
          text: "В верхней части страницы расположены 4 карточки статистики: всего клиентов, новых за месяц, за неделю и за сегодня.",
        },
        {
          title: "Графики",
          text: "Ниже можно увидеть распределение клиентов по статусам и список последних добавленных клиентов.",
        },
        {
          title: "Быстрые действия",
          text: "С помощью быстрых действий можно одним кликом перейти на страницу Лидов, Клиентов, Задач или Сделок.",
        },
      ],
      tips: [
        "Dashboard открывается первым при каждом входе в систему",
        "Статистика обновляется в реальном времени",
      ],
    },
    en: {
      title: "Dashboard",
      shortDesc: "Key statistics and quick actions",
      description:
        "Dashboard is your CRM system's home page. All important information is displayed here: total customers, new customers, weekly/monthly statistics, and quick links.",
      steps: [
        {
          title: "View statistics cards",
          text: "At the top of the page, there are 4 statistics cards: total clients, new this month, new this week, and new today.",
        },
        {
          title: "Charts",
          text: "Below you can see client distribution by status and a list of recently added clients.",
        },
        {
          title: "Quick actions",
          text: "Quick actions let you jump to Leads, Clients, Tasks, or Deals pages with a single click.",
        },
      ],
      tips: [
        "Dashboard opens first every time you log in",
        "Statistics are updated in real time",
      ],
    },
  },
  {
    id: "clients",
    icon: Users,
    group: "main",
    screenshots: ["clients-main.png", "clients-add.png"],
    uz: {
      title: "Mijozlar",
      shortDesc: "Mijozlar bazasini boshqarish",
      description:
        "Mijozlar sahifasi — CRM ning eng asosiy bo'limi. Bu yerda barcha mijozlaringizni qo'shishingiz, tahrirlashingiz, statuslarini o'zgartirishingiz va ular haqida batafsil ma'lumot ko'rishingiz mumkin.",
      steps: [
        {
          title: "Ko'rinishni tanlang",
          text: "Sahifa yuqorisida 3 ta ko'rinish mavjud: Grid (kartochkalar), Table (jadval) va Kanban (ustunlar). O'zingizga qulayini tanlang.",
        },
        {
          title: "Yangi mijoz qo'shish",
          text: "'+ Yangi mijoz' tugmasini bosing. Modal oynada mijoz ismi, telefon raqami, email va boshqa ma'lumotlarni kiriting.",
        },
        {
          title: "Mijozni tahrirlash",
          text: "Mijoz kartasini bosib uning batafsil sahifasiga o'ting. Bu yerda eslatmalar, faoliyat jurnali va xizmatlarni ko'rishingiz mumkin.",
        },
        {
          title: "Status bo'yicha filtrlash",
          text: "Yuqoridagi tablar orqali mijozlarni status bo'yicha filtrlang: Yangi, Faol, Tugallangan va h.k.",
        },
      ],
      tips: [
        "Kanban ko'rinishida mijozlarni bir statusdan boshqasiga sudrab o'tkazishingiz mumkin",
        "Qidiruv orqali mijozni ism yoki telefon raqami bo'yicha toping",
        "Mijoz sahifasida barcha bog'liq ma'lumotlar ko'rinadi: eslatmalar, vazifalar, bitimlar",
      ],
    },
    ru: {
      title: "Клиенты",
      shortDesc: "Управление базой клиентов",
      description:
        "Страница клиентов — основной раздел CRM. Здесь вы можете добавлять, редактировать клиентов, менять их статусы и просматривать подробную информацию.",
      steps: [
        {
          title: "Выберите вид отображения",
          text: "В верхней части страницы есть 3 вида: Grid (карточки), Table (таблица) и Kanban (колонки). Выберите удобный для вас.",
        },
        {
          title: "Добавление нового клиента",
          text: "Нажмите кнопку '+ Новый клиент'. В модальном окне введите имя, телефон, email и другие данные.",
        },
        {
          title: "Редактирование клиента",
          text: "Нажмите на карточку клиента для перехода на подробную страницу. Здесь доступны заметки, журнал активности и услуги.",
        },
        {
          title: "Фильтрация по статусу",
          text: "Используйте вкладки для фильтрации клиентов по статусу: Новый, Активный, Завершённый и т.д.",
        },
      ],
      tips: [
        "В Kanban-виде можно перетаскивать клиентов между статусами",
        "Поиск позволяет найти клиента по имени или номеру телефона",
        "На странице клиента видны все связанные данные: заметки, задачи, сделки",
      ],
    },
    en: {
      title: "Clients",
      shortDesc: "Client database management",
      description:
        "The Clients page is the core section of CRM. Here you can add, edit clients, change their statuses, and view detailed information about each one.",
      steps: [
        {
          title: "Choose a view mode",
          text: "At the top of the page, there are 3 views: Grid (cards), Table, and Kanban (columns). Pick whichever suits you best.",
        },
        {
          title: "Add a new client",
          text: "Click the '+ New client' button. In the modal window, enter the client's name, phone, email, and other details.",
        },
        {
          title: "Edit a client",
          text: "Click on a client card to go to their detail page. Here you can see notes, activity log, and services.",
        },
        {
          title: "Filter by status",
          text: "Use the tabs above to filter clients by status: New, Active, Completed, etc.",
        },
      ],
      tips: [
        "In Kanban view, you can drag clients between statuses",
        "Use search to find clients by name or phone number",
        "The client page shows all related data: notes, tasks, deals",
      ],
    },
  },
  {
    id: "leads",
    icon: Target,
    group: "main",
    screenshots: ["leads-main.png"],
    uz: {
      title: "Lidlar",
      shortDesc: "Potensial mijozlarni boshqarish",
      description:
        "Lidlar — bu hali mijozga aylanmagan potensial xaridorlar. Bu sahifada yangi lidlarni qo'shish, ular bilan ishlash va mijozga konvertatsiya qilish mumkin.",
      steps: [
        {
          title: "Lid qo'shish",
          text: "'+ Yangi lid' tugmasini bosib yangi lid yarating. Ism, telefon, manba (Instagram, Telegram, web) va prioritetni belgilang.",
        },
        {
          title: "Status bo'yicha kuzatish",
          text: "Lidlar statuslari: Yangi, Bog'lanildi, Malakali, Nomuvofiq, Konvertatsiya. Tablar orqali filtrlang.",
        },
        {
          title: "Mijozga aylantirish",
          text: "Lid tayyor bo'lganda 'Konvertatsiya' tugmasini bosing — lid avtomatik mijozga aylanadi va barcha ma'lumotlar saqlanadi.",
        },
      ],
      tips: [
        "Statistikada konversiya darajasini kuzating",
        "Prioritet bo'yicha filtrlash — shoshilinch lidlarni birinchi ko'ring",
        "Import/Export funksiyasi mavjud",
      ],
    },
    ru: {
      title: "Лиды",
      shortDesc: "Управление потенциальными клиентами",
      description:
        "Лиды — потенциальные покупатели, которые ещё не стали клиентами. На этой странице можно добавлять новых лидов, работать с ними и конвертировать в клиентов.",
      steps: [
        {
          title: "Добавление лида",
          text: "Нажмите '+ Новый лид'. Укажите имя, телефон, источник (Instagram, Telegram, web) и приоритет.",
        },
        {
          title: "Отслеживание по статусу",
          text: "Статусы лидов: Новый, Связались, Квалифицированный, Неподходящий, Конвертирован. Фильтруйте через вкладки.",
        },
        {
          title: "Конвертация в клиента",
          text: "Когда лид готов, нажмите 'Конвертировать' — лид автоматически станет клиентом с сохранением всех данных.",
        },
      ],
      tips: [
        "Отслеживайте конверсию в статистике",
        "Фильтрация по приоритету — срочные лиды в первую очередь",
        "Доступны функции импорта/экспорта",
      ],
    },
    en: {
      title: "Leads",
      shortDesc: "Manage potential customers",
      description:
        "Leads are potential buyers who haven't become clients yet. On this page you can add new leads, work with them, and convert them to clients.",
      steps: [
        {
          title: "Add a lead",
          text: "Click '+ New lead'. Enter the name, phone, source (Instagram, Telegram, web), and priority.",
        },
        {
          title: "Track by status",
          text: "Lead statuses: New, Contacted, Qualified, Unqualified, Converted. Filter using tabs.",
        },
        {
          title: "Convert to client",
          text: "When the lead is ready, click 'Convert' — the lead automatically becomes a client with all data preserved.",
        },
      ],
      tips: [
        "Track conversion rate in statistics",
        "Filter by priority — see urgent leads first",
        "Import/Export functionality available",
      ],
    },
  },
  {
    id: "tasks",
    icon: CheckSquare,
    group: "main",
    screenshots: ["tasks-main.png"],
    uz: {
      title: "Vazifalar",
      shortDesc: "Vazifalarni yaratish va boshqarish",
      description:
        "Vazifalar sahifasida jamoa a'zolariga topshiriqlar berish, ularning bajarilishini kuzatish va muddatlarni nazorat qilish mumkin.",
      steps: [
        {
          title: "Vazifa yaratish",
          text: "'+ Yangi vazifa' tugmasini bosing. Sarlavha, tavsif, bajariladigan vaqt, prioritet va mas'ul xodimni belgilang.",
        },
        {
          title: "Kanban ko'rinishi",
          text: "Vazifalarni Kanban ko'rinishida bosqichlar bo'yicha ko'ring: Bajarilishi kerak, Jarayonda, Bajarildi, Bekor qilindi.",
        },
        {
          title: "Filtrlash",
          text: "'Mening vazifalarim' tugmasi bilan faqat sizga tayinlangan vazifalarni ko'ring. 'Muddati o'tgan' filtri ham mavjud.",
        },
      ],
      tips: [
        "Kanban da vazifalarni sudrab bosqichlar orasida ko'chiring",
        "Prioritet: Shoshilinch, Yuqori, O'rta, Past",
        "Import/Export funksiyasi mavjud",
      ],
    },
    ru: {
      title: "Задачи",
      shortDesc: "Создание и управление задачами",
      description:
        "На странице задач можно назначать задания членам команды, отслеживать их выполнение и контролировать сроки.",
      steps: [
        {
          title: "Создание задачи",
          text: "Нажмите '+ Новая задача'. Укажите заголовок, описание, срок, приоритет и ответственного сотрудника.",
        },
        {
          title: "Kanban вид",
          text: "Просматривайте задачи по этапам: К выполнению, В процессе, Выполнено, Отменено.",
        },
        {
          title: "Фильтрация",
          text: "Кнопка 'Мои задачи' покажет только назначенные вам. Есть фильтр 'Просроченные'.",
        },
      ],
      tips: [
        "В Kanban перетаскивайте задачи между этапами",
        "Приоритеты: Срочный, Высокий, Средний, Низкий",
        "Доступны импорт/экспорт",
      ],
    },
    en: {
      title: "Tasks",
      shortDesc: "Create and manage tasks",
      description:
        "On the Tasks page you can assign tasks to team members, track their progress, and monitor deadlines.",
      steps: [
        {
          title: "Create a task",
          text: "Click '+ New task'. Enter a title, description, due date, priority, and assignee.",
        },
        {
          title: "Kanban view",
          text: "View tasks by stage: To Do, In Progress, Done, Cancelled.",
        },
        {
          title: "Filtering",
          text: "The 'My Tasks' button shows only tasks assigned to you. There's also an 'Overdue' filter.",
        },
      ],
      tips: [
        "In Kanban, drag tasks between stages",
        "Priorities: Urgent, High, Medium, Low",
        "Import/Export functionality available",
      ],
    },
  },
  {
    id: "deals",
    icon: Handshake,
    group: "main",
    screenshots: ["deals-main.png"],
    uz: {
      title: "Bitimlar",
      shortDesc: "Savdo pipeline boshqarish",
      description:
        "Bitimlar sahifasida savdo jarayonini bosqichma-bosqich kuzatishingiz mumkin. Pipeline ko'rinishida bitimlar qaysi bosqichda ekanini real vaqtda ko'rasiz.",
      steps: [
        {
          title: "Bitim yaratish",
          text: "'+ Yangi bitim' tugmasini bosing. Bitim nomi, summasi, mijoz, mas'ul xodim va bosqichni belgilang.",
        },
        {
          title: "Pipeline ko'rinishi",
          text: "Bitimlar bosqichlari: Yangi, Malakali, Taklif, Muzokara, Yutildi, Yo'qotildi. Sudrab o'tkazish bilan bosqichni o'zgartiring.",
        },
        {
          title: "Statistikalar",
          text: "Yuqorida umumiy qiymat, yutish foizi, bashorat va bu oy yutilgan bitimlar ko'rinadi.",
        },
      ],
      tips: [
        "Jadval ko'rinishiga ham o'tishingiz mumkin",
        "Eksport funksiyasi mavjud",
        "Bitim sahifasida bog'liq mijoz va xodim ko'rinadi",
      ],
    },
    ru: {
      title: "Сделки",
      shortDesc: "Управление воронкой продаж",
      description:
        "На странице сделок можно пошагово отслеживать процесс продаж. В виде Pipeline вы видите статус каждой сделки в реальном времени.",
      steps: [
        {
          title: "Создание сделки",
          text: "Нажмите '+ Новая сделка'. Укажите название, сумму, клиента, ответственного и этап.",
        },
        {
          title: "Pipeline вид",
          text: "Этапы: Новая, Квалификация, Предложение, Переговоры, Выиграна, Проиграна. Перетаскивайте для смены этапа.",
        },
        {
          title: "Статистика",
          text: "Вверху отображаются общая стоимость, процент побед, прогноз и выигранные за месяц.",
        },
      ],
      tips: [
        "Можно переключиться на табличный вид",
        "Доступна функция экспорта",
        "На странице сделки видны связанный клиент и сотрудник",
      ],
    },
    en: {
      title: "Deals",
      shortDesc: "Sales pipeline management",
      description:
        "On the Deals page you can track the sales process step by step. In Pipeline view, you see each deal's current stage in real time.",
      steps: [
        {
          title: "Create a deal",
          text: "Click '+ New deal'. Enter a name, amount, client, assignee, and stage.",
        },
        {
          title: "Pipeline view",
          text: "Stages: New, Qualification, Proposal, Negotiation, Won, Lost. Drag to change stages.",
        },
        {
          title: "Statistics",
          text: "At the top you'll see total value, win rate, forecast, and deals won this month.",
        },
      ],
      tips: [
        "You can switch to Table view",
        "Export functionality available",
        "Deal page shows the linked client and assignee",
      ],
    },
  },
  {
    id: "reminders",
    icon: BellIcon,
    group: "main",
    screenshots: ["reminders-main.png"],
    uz: {
      title: "Eslatmalar",
      shortDesc: "Eslatmalar yaratish va kuzatish",
      description:
        "Eslatmalar sahifasida muhim ishlar, uchrashuvlar va qo'ng'iroqlar uchun eslatmalar yaratishingiz mumkin. Eslatmalar vaqti kelganda bildirishnoma olasiz.",
      steps: [
        {
          title: "Eslatma yaratish",
          text: "'+ Yangi eslatma' tugmasini bosing. Sarlavha, sana/vaqt va ixtiyoriy ravishda mijozni tanlang.",
        },
        {
          title: "Eslatmalarni ko'rish",
          text: "Barcha eslatmalar ro'yxat ko'rinishida chiqadi. Har birini bosib batafsil ko'rishingiz mumkin.",
        },
      ],
      tips: [
        "Eslatmalar mijozlarga bog'liq bo'lishi mumkin",
        "Bildirishnoma vaqti kelganda bell iconida ko'rinadi",
      ],
    },
    ru: {
      title: "Напоминания",
      shortDesc: "Создание и отслеживание напоминаний",
      description:
        "На странице напоминаний можно создавать напоминания для важных дел, встреч и звонков. Вы получите уведомление, когда наступит время.",
      steps: [
        {
          title: "Создание напоминания",
          text: "Нажмите '+ Новое напоминание'. Укажите заголовок, дату/время и опционально выберите клиента.",
        },
        {
          title: "Просмотр напоминаний",
          text: "Все напоминания отображаются в виде списка. Нажмите на любое для подробного просмотра.",
        },
      ],
      tips: [
        "Напоминания могут быть привязаны к клиентам",
        "Уведомление появится в иконке колокольчика",
      ],
    },
    en: {
      title: "Reminders",
      shortDesc: "Create and track reminders",
      description:
        "On the Reminders page you can create reminders for important tasks, meetings, and calls. You'll receive a notification when the time comes.",
      steps: [
        {
          title: "Create a reminder",
          text: "Click '+ New reminder'. Enter a title, date/time, and optionally select a client.",
        },
        {
          title: "View reminders",
          text: "All reminders appear in a list view. Click any to see details.",
        },
      ],
      tips: [
        "Reminders can be linked to clients",
        "Notifications show up on the bell icon",
      ],
    },
  },
  {
    id: "call-logs",
    icon: Phone,
    group: "main",
    screenshots: ["call-logs-main.png"],
    uz: {
      title: "Qo'ng'iroqlar",
      shortDesc: "Qo'ng'iroq jurnalini yuritish",
      description:
        "Qo'ng'iroqlar sahifasida mijozlar bilan bo'lgan telefon qo'ng'iroqlarini qayd etishingiz mumkin: qo'ng'iroq turi, davomiyligi va natijasi.",
      steps: [
        {
          title: "Qo'ng'iroq qo'shish",
          text: "'+ Yangi qo'ng'iroq' tugmasini bosing. Mijoz, turi (kiruvchi/chiquvchi), davomiylik va eslatmani kiriting.",
        },
        {
          title: "Jurnalni ko'rish",
          text: "Barcha qo'ng'iroqlar vaqt bo'yicha tartiblangan ro'yxatda ko'rinadi.",
        },
      ],
      tips: [
        "Qo'ng'iroq yozuvlari mijoz sahifasida ham ko'rinadi",
        "Har bir qo'ng'iroqqa izoh qo'shish mumkin",
      ],
    },
    ru: {
      title: "Звонки",
      shortDesc: "Ведение журнала звонков",
      description:
        "На странице звонков можно фиксировать телефонные разговоры с клиентами: тип звонка, длительность и результат.",
      steps: [
        {
          title: "Добавление звонка",
          text: "Нажмите '+ Новый звонок'. Выберите клиента, тип (входящий/исходящий), длительность и заметку.",
        },
        {
          title: "Просмотр журнала",
          text: "Все звонки отображаются в хронологическом порядке.",
        },
      ],
      tips: [
        "Записи звонков также видны на странице клиента",
        "К каждому звонку можно добавить комментарий",
      ],
    },
    en: {
      title: "Call Logs",
      shortDesc: "Manage call records",
      description:
        "On the Call Logs page you can record phone calls with clients: call type, duration, and outcome.",
      steps: [
        {
          title: "Add a call",
          text: "Click '+ New call'. Select a client, type (incoming/outgoing), duration, and notes.",
        },
        {
          title: "View the log",
          text: "All calls are displayed in chronological order.",
        },
      ],
      tips: [
        "Call records also appear on the client's page",
        "You can add a comment to each call",
      ],
    },
  },
  {
    id: "meetings",
    icon: Calendar,
    group: "main",
    screenshots: ["meetings-main.png"],
    uz: {
      title: "Uchrashuvlar",
      shortDesc: "Uchrashuvlarni rejalashtirish",
      description:
        "Uchrashuvlar sahifasida mijozlar bilan uchrashuvlarni rejalashtirish, vaqt va joy belgilash mumkin.",
      steps: [
        {
          title: "Uchrashuv yaratish",
          text: "'+ Yangi uchrashuv' tugmasini bosing. Sarlavha, sana, vaqt, joy va mijozni belgilang.",
        },
        {
          title: "Uchrashuvlarni boshqarish",
          text: "Ro'yxatda barcha rejalashtirilgan uchrashuvlar ko'rinadi. Har birini tahrirlash yoki o'chirish mumkin.",
        },
      ],
      tips: [
        "Uchrashuvlar mijozga bog'lanishi mumkin",
        "Eslatma uchrashuv vaqtidan oldin keladi",
      ],
    },
    ru: {
      title: "Встречи",
      shortDesc: "Планирование встреч",
      description:
        "На странице встреч можно планировать встречи с клиентами, назначать время и место.",
      steps: [
        {
          title: "Создание встречи",
          text: "Нажмите '+ Новая встреча'. Укажите заголовок, дату, время, место и клиента.",
        },
        {
          title: "Управление встречами",
          text: "В списке отображаются все запланированные встречи. Каждую можно редактировать или удалить.",
        },
      ],
      tips: [
        "Встречи могут быть привязаны к клиенту",
        "Напоминание приходит перед встречей",
      ],
    },
    en: {
      title: "Meetings",
      shortDesc: "Schedule meetings",
      description:
        "On the Meetings page you can plan meetings with clients, set time and location.",
      steps: [
        {
          title: "Create a meeting",
          text: "Click '+ New meeting'. Enter a title, date, time, location, and client.",
        },
        {
          title: "Manage meetings",
          text: "The list shows all scheduled meetings. Each can be edited or deleted.",
        },
      ],
      tips: [
        "Meetings can be linked to a client",
        "You get a reminder before the meeting",
      ],
    },
  },
  {
    id: "services",
    icon: Briefcase,
    group: "main",
    screenshots: ["services-main.png"],
    uz: {
      title: "Xizmatlar",
      shortDesc: "Xizmatlar ro'yxatini boshqarish",
      description:
        "Xizmatlar sahifasida kompaniyangiz taklif qiladigan xizmat yoki mahsulotlarni ro'yxatlashingiz mumkin. Har bir xizmatga narx, tavsif va boshqa ma'lumotlarni qo'shish mumkin.",
      steps: [
        {
          title: "Xizmat qo'shish",
          text: "'+ Yangi xizmat' tugmasini bosing. Xizmat nomi, narxi va tavsifini kiriting.",
        },
        {
          title: "Xizmatlarni boshqarish",
          text: "Barcha xizmatlar grid ko'rinishida chiqadi. Har birini tahrirlash yoki o'chirish mumkin.",
        },
      ],
      tips: [
        "Xizmatlar mijozlarga bog'lanishi mumkin",
        "Statistikada eng mashhur xizmatlarni ko'ring",
      ],
    },
    ru: {
      title: "Услуги",
      shortDesc: "Управление списком услуг",
      description:
        "На странице услуг можно вести список услуг или продуктов вашей компании. К каждой услуге можно добавить цену, описание и другие данные.",
      steps: [
        {
          title: "Добавление услуги",
          text: "Нажмите '+ Новая услуга'. Введите название, цену и описание.",
        },
        {
          title: "Управление услугами",
          text: "Все услуги отображаются в виде карточек. Каждую можно редактировать или удалить.",
        },
      ],
      tips: [
        "Услуги могут быть привязаны к клиентам",
        "В статистике видны самые популярные услуги",
      ],
    },
    en: {
      title: "Services",
      shortDesc: "Manage service listings",
      description:
        "On the Services page you can list the services or products your company offers. Each service can have a price, description, and other details.",
      steps: [
        {
          title: "Add a service",
          text: "Click '+ New service'. Enter the name, price, and description.",
        },
        {
          title: "Manage services",
          text: "All services appear in a grid view. Each can be edited or deleted.",
        },
      ],
      tips: [
        "Services can be linked to clients",
        "See the most popular services in statistics",
      ],
    },
  },
  {
    id: "analytics",
    icon: BarChart3,
    group: "main",
    screenshots: ["analytics-main.png"],
    uz: {
      title: "Analitika",
      shortDesc: "Grafiklar va hisobotlar",
      description:
        "Analitika sahifasida biznesingiz haqida chuqur ma'lumotlar: mijozlar dinamikasi, daromad, konversiya, jamoa samaradorligi va boshqa ko'plab ko'rsatkichlar.",
      steps: [
        {
          title: "Vaqt oralig'ini tanlash",
          text: "Yuqoridagi filtr orqali bugun, kecha, bu hafta, bu oy, oxirgi 30 kun yoki maxsus sana oralig'ini tanlang.",
        },
        {
          title: "Asosiy metrikalar",
          text: "Umumiy daromad, o'rtacha mijoz qiymati, konversiya darajasi va mijoz saqlanishi ko'rsatkichlari.",
        },
        {
          title: "Grafiklar",
          text: "Mijozlar dinamikasi, daromad grafigi, status taqsimoti, top xizmatlar va demografik ma'lumotlar.",
        },
        {
          title: "Jamoa samaradorligi",
          text: "Har bir xodimning ishlash ko'rsatkichlari, faol foydalanuvchilar va top ishlaydiganlar.",
        },
      ],
      tips: [
        "Maxsus sana oralig'i uchun kalendar filtrini ishlating",
        "Real vaqtda onlayn foydalanuvchilar sonini ko'ring",
        "Custom field bo'yicha ham analitika mavjud",
      ],
    },
    ru: {
      title: "Аналитика",
      shortDesc: "Графики и отчёты",
      description:
        "На странице аналитики — глубокая информация о бизнесе: динамика клиентов, доход, конверсия, эффективность команды и многие другие показатели.",
      steps: [
        {
          title: "Выбор периода",
          text: "Через фильтр вверху выберите: сегодня, вчера, эта неделя, этот месяц, последние 30 дней или свой диапазон.",
        },
        {
          title: "Основные метрики",
          text: "Общий доход, средняя стоимость клиента, конверсия и удержание клиентов.",
        },
        {
          title: "Графики",
          text: "Динамика клиентов, график дохода, распределение по статусам, топ услуг и демография.",
        },
        {
          title: "Эффективность команды",
          text: "Показатели работы каждого сотрудника, активные пользователи и лучшие работники.",
        },
      ],
      tips: [
        "Используйте календарный фильтр для произвольного периода",
        "Можно видеть количество онлайн-пользователей в реальном времени",
        "Аналитика доступна и по пользовательским полям",
      ],
    },
    en: {
      title: "Analytics",
      shortDesc: "Charts and reports",
      description:
        "The Analytics page provides deep business insights: client trends, revenue, conversion, team performance, and many other metrics.",
      steps: [
        {
          title: "Select time range",
          text: "Use the filter at the top: today, yesterday, this week, this month, last 30 days, or a custom range.",
        },
        {
          title: "Key metrics",
          text: "Total revenue, average client value, conversion rate, and client retention.",
        },
        {
          title: "Charts",
          text: "Client trends, revenue chart, status distribution, top services, and demographics.",
        },
        {
          title: "Team performance",
          text: "Each team member's performance indicators, active users, and top performers.",
        },
      ],
      tips: [
        "Use the calendar filter for custom date ranges",
        "See online users count in real time",
        "Analytics also available for custom fields",
      ],
    },
  },
  {
    id: "notifications",
    icon: BellRing,
    group: "main",
    screenshots: ["notifications-main.png"],
    uz: {
      title: "Bildirishnomalar",
      shortDesc: "Tizim bildirishnomalari",
      description:
        "Bildirishnomalar sahifasida tizimdan kelgan barcha xabarlarni ko'rishingiz mumkin: yangi vazifalar, mijoz o'zgarishlari, eslatmalar va boshqalar.",
      steps: [
        {
          title: "Bildirishnomalarni ko'rish",
          text: "Barcha bildirishnomalar vaqt bo'yicha tartiblangan. O'qilmagan xabarlar boshqacha rangda ko'rinadi.",
        },
        {
          title: "O'qildi deb belgilash",
          text: "Bitta yoki barcha bildirishnomalarni 'O'qildi' deb belgilashingiz mumkin.",
        },
      ],
      tips: [
        "Navbar dagi bell ikonida o'qilmagan bildirishnomalar soni ko'rinadi",
        "Browser bildirishnomalari ham keladi (ruxsat berilgan bo'lsa)",
      ],
    },
    ru: {
      title: "Уведомления",
      shortDesc: "Системные уведомления",
      description:
        "На странице уведомлений можно просмотреть все сообщения системы: новые задачи, изменения клиентов, напоминания и другое.",
      steps: [
        {
          title: "Просмотр уведомлений",
          text: "Все уведомления упорядочены по времени. Непрочитанные выделены другим цветом.",
        },
        {
          title: "Отметить как прочитанное",
          text: "Можно отметить одно или все уведомления как прочитанные.",
        },
      ],
      tips: [
        "В иконке колокольчика видно количество непрочитанных",
        "Браузерные уведомления тоже приходят (при наличии разрешения)",
      ],
    },
    en: {
      title: "Notifications",
      shortDesc: "System notifications",
      description:
        "On the Notifications page you can see all system messages: new tasks, client changes, reminders, and more.",
      steps: [
        {
          title: "View notifications",
          text: "All notifications are ordered by time. Unread messages appear in a different color.",
        },
        {
          title: "Mark as read",
          text: "You can mark one or all notifications as read.",
        },
      ],
      tips: [
        "The bell icon shows the unread count",
        "Browser notifications are also sent (if permission is granted)",
      ],
    },
  },
  {
    id: "settings",
    icon: Settings,
    group: "main",
    screenshots: ["settings-main.png"],
    uz: {
      title: "Sozlamalar",
      shortDesc: "Profil va tizim sozlamalari",
      description:
        "Sozlamalar sahifasida shaxsiy profilingizni, kompaniya ma'lumotlarini va tizim ko'rinishini boshqarishingiz mumkin.",
      steps: [
        {
          title: "Profil",
          text: "Profil tabida ismingiz, email, telefon va rasmingizni o'zgartirishingiz mumkin.",
        },
        {
          title: "Kompaniya",
          text: "Kompaniya tabida kompaniya nomi, manzili va boshqa ma'lumotlarni tahrirlang.",
        },
        {
          title: "Ko'rinish",
          text: "Ko'rinish tabida yorug'/qorong'u rejim va boshqa vizual sozlamalarni o'zgartiring.",
        },
      ],
      tips: [
        "Parolni ham shu yerdan o'zgartirishingiz mumkin",
        "Til sozlamasi ham mavjud",
      ],
    },
    ru: {
      title: "Настройки",
      shortDesc: "Профиль и системные настройки",
      description:
        "На странице настроек можно управлять личным профилем, данными компании и внешним видом системы.",
      steps: [
        {
          title: "Профиль",
          text: "Во вкладке Профиль можно изменить имя, email, телефон и фото.",
        },
        {
          title: "Компания",
          text: "Во вкладке Компания можно редактировать название, адрес и другие данные.",
        },
        {
          title: "Внешний вид",
          text: "Во вкладке Внешний вид можно переключить светлую/тёмную тему и другие визуальные настройки.",
        },
      ],
      tips: [
        "Здесь же можно сменить пароль",
        "Доступна настройка языка",
      ],
    },
    en: {
      title: "Settings",
      shortDesc: "Profile and system settings",
      description:
        "On the Settings page you can manage your personal profile, company information, and system appearance.",
      steps: [
        {
          title: "Profile",
          text: "In the Profile tab you can change your name, email, phone, and photo.",
        },
        {
          title: "Company",
          text: "In the Company tab you can edit the company name, address, and other details.",
        },
        {
          title: "Appearance",
          text: "In the Appearance tab you can switch between light/dark mode and other visual settings.",
        },
      ],
      tips: [
        "You can also change your password here",
        "Language settings are available",
      ],
    },
  },
  // Admin sections
  {
    id: "admin-users",
    icon: UserCog,
    group: "admin",
    screenshots: ["admin-users-main.png"],
    uz: {
      title: "Foydalanuvchilar (Admin)",
      shortDesc: "Hodimlarni boshqarish",
      description:
        "Admin paneldagi Foydalanuvchilar sahifasida kompaniya xodimlarini qo'shish, tahrirlash va rollarini boshqarish mumkin. Bu sahifa faqat Admin rolga ega foydalanuvchilarga ko'rinadi.",
      steps: [
        {
          title: "Xodim qo'shish",
          text: "'+ Yangi foydalanuvchi' tugmasini bosing. Ism, email, parol va rolni (Admin yoki Manager) belgilang.",
        },
        {
          title: "Rollarni boshqarish",
          text: "Admin — to'liq huquqlar (foydalanuvchilar, statuslar, maydonlarni boshqarish). Manager — faqat mijozlar bilan ishlash.",
        },
        {
          title: "Xodimni tahrirlash",
          text: "Ro'yxatdagi xodimni bosib uning ma'lumotlarini o'zgartiring yoki o'chiring.",
        },
      ],
      tips: [
        "Faqat Admin rolelik foydalanuvchilar bu sahifani ko'ra oladi",
        "Xodim o'chirilsa uning mijozlari boshqa xodimga o'tkazilishi kerak",
      ],
    },
    ru: {
      title: "Пользователи (Админ)",
      shortDesc: "Управление сотрудниками",
      description:
        "На странице Пользователи в админ-панели можно добавлять, редактировать сотрудников и управлять их ролями. Эта страница доступна только пользователям с ролью Админ.",
      steps: [
        {
          title: "Добавление сотрудника",
          text: "Нажмите '+ Новый пользователь'. Укажите имя, email, пароль и роль (Админ или Менеджер).",
        },
        {
          title: "Управление ролями",
          text: "Админ — полные права (пользователи, статусы, поля). Менеджер — только работа с клиентами.",
        },
        {
          title: "Редактирование сотрудника",
          text: "Нажмите на сотрудника в списке для изменения данных или удаления.",
        },
      ],
      tips: [
        "Только пользователи с ролью Админ видят эту страницу",
        "При удалении сотрудника его клиентов нужно перенести другому",
      ],
    },
    en: {
      title: "Users (Admin)",
      shortDesc: "Manage employees",
      description:
        "On the Users page in the admin panel you can add, edit employees, and manage their roles. This page is only visible to Admin users.",
      steps: [
        {
          title: "Add an employee",
          text: "Click '+ New user'. Enter name, email, password, and role (Admin or Manager).",
        },
        {
          title: "Manage roles",
          text: "Admin — full access (users, statuses, fields). Manager — client management only.",
        },
        {
          title: "Edit an employee",
          text: "Click on an employee in the list to modify their details or delete them.",
        },
      ],
      tips: [
        "Only Admin-role users can see this page",
        "When deleting an employee, their clients should be reassigned",
      ],
    },
  },
  {
    id: "admin-statuses",
    icon: Palette,
    group: "admin",
    screenshots: ["admin-statuses-main.png"],
    uz: {
      title: "Statuslar (Admin)",
      shortDesc: "Mijoz statuslarini sozlash",
      description:
        "Statuslar sahifasida mijozlar uchun maxsus statuslar yaratishingiz mumkin. Har bir statusga nom, rang va tartib raqam beriladi.",
      steps: [
        {
          title: "Status yaratish",
          text: "'+ Yangi status' tugmasini bosing. Status nomi va rangini tanlang.",
        },
        {
          title: "Statuslarni tartiblesh",
          text: "Statuslar tartibini o'zgartirishingiz mumkin — bu Kanban ko'rinishidagi ustunlar tartibiga ta'sir qiladi.",
        },
        {
          title: "Statusni o'chirish",
          text: "Statusni o'chirishdan oldin undagi mijozlarni boshqa statusga ko'chirish kerak bo'ladi.",
        },
      ],
      tips: [
        "Ranglar Kanban va filtrlarda ko'rinadi",
        "Standart statuslar: Yangi, Faol, Tugallangan",
      ],
    },
    ru: {
      title: "Статусы (Админ)",
      shortDesc: "Настройка статусов клиентов",
      description:
        "На странице статусов можно создавать пользовательские статусы для клиентов. Каждому статусу назначается имя, цвет и порядок.",
      steps: [
        {
          title: "Создание статуса",
          text: "Нажмите '+ Новый статус'. Выберите название и цвет.",
        },
        {
          title: "Порядок статусов",
          text: "Можно менять порядок статусов — это влияет на порядок колонок в Kanban.",
        },
        {
          title: "Удаление статуса",
          text: "Перед удалением нужно перенести клиентов в другой статус.",
        },
      ],
      tips: [
        "Цвета видны в Kanban и фильтрах",
        "Стандартные статусы: Новый, Активный, Завершённый",
      ],
    },
    en: {
      title: "Statuses (Admin)",
      shortDesc: "Configure client statuses",
      description:
        "On the Statuses page you can create custom statuses for clients. Each status gets a name, color, and order number.",
      steps: [
        {
          title: "Create a status",
          text: "Click '+ New status'. Choose a name and color.",
        },
        {
          title: "Reorder statuses",
          text: "You can change the status order — this affects the column order in Kanban view.",
        },
        {
          title: "Delete a status",
          text: "Before deleting, you'll need to reassign clients to another status.",
        },
      ],
      tips: [
        "Colors are shown in Kanban and filters",
        "Default statuses: New, Active, Completed",
      ],
    },
  },
  {
    id: "admin-custom-fields",
    icon: Puzzle,
    group: "admin",
    screenshots: ["admin-custom-fields-main.png"],
    uz: {
      title: "Maxsus maydonlar (Admin)",
      shortDesc: "Qo'shimcha maydonlar yaratish",
      description:
        "Maxsus maydonlar sahifasida mijoz kartasiga qo'shimcha maydonlar qo'shishingiz mumkin: matn, son, sana, tanlash va boshqa turlar.",
      steps: [
        {
          title: "Maydon yaratish",
          text: "'+ Yangi maydon' tugmasini bosing. Maydon nomi, turi (matn, son, sana, tanlash) va majburiy yoki ixtiyoriy ekanligini belgilang.",
        },
        {
          title: "Maydonlarni boshqarish",
          text: "Yaratilgan maydonlar ro'yxatda ko'rinadi. Har birini tahrirlash, ko'rinishini o'zgartirish yoki o'chirish mumkin.",
        },
      ],
      tips: [
        "Maxsus maydonlar mijoz yaratish va tahrirlash formalarida ko'rinadi",
        "Analitikada custom field bo'yicha ham hisobot olish mumkin",
      ],
    },
    ru: {
      title: "Пользовательские поля (Админ)",
      shortDesc: "Создание дополнительных полей",
      description:
        "На странице пользовательских полей можно добавить дополнительные поля в карточку клиента: текст, число, дата, выбор и другие типы.",
      steps: [
        {
          title: "Создание поля",
          text: "Нажмите '+ Новое поле'. Укажите название, тип (текст, число, дата, выбор) и обязательность.",
        },
        {
          title: "Управление полями",
          text: "Созданные поля отображаются в списке. Каждое можно редактировать, скрыть или удалить.",
        },
      ],
      tips: [
        "Пользовательские поля видны в формах создания и редактирования клиентов",
        "В аналитике доступны отчёты по пользовательским полям",
      ],
    },
    en: {
      title: "Custom Fields (Admin)",
      shortDesc: "Create additional fields",
      description:
        "On the Custom Fields page you can add extra fields to client cards: text, number, date, select, and other types.",
      steps: [
        {
          title: "Create a field",
          text: "Click '+ New field'. Enter a name, type (text, number, date, select), and whether it's required.",
        },
        {
          title: "Manage fields",
          text: "Created fields appear in a list. Each can be edited, hidden, or deleted.",
        },
      ],
      tips: [
        "Custom fields appear in client creation and editing forms",
        "Analytics reports are available for custom fields too",
      ],
    },
  },
];

export const tutorialGroups = {
  uz: {
    main: "Asosiy bo'limlar",
    admin: "Admin panel",
  },
  ru: {
    main: "Основные разделы",
    admin: "Админ панель",
  },
  en: {
    main: "Main sections",
    admin: "Admin panel",
  },
};

export const tutorialTranslations = {
  uz: {
    pageTitle: "Foydalanish qo'llanmasi",
    pageSubtitle: "Cliento CRM tizimidan qanday foydalanish kerakligi haqida batafsil qo'llanma",
    searchPlaceholder: "Bo'lim qidirish...",
    steps: "Qadamlar",
    tips: "Maslahatlar",
    prevSection: "Oldingi",
    nextSection: "Keyingi",
    backToHome: "Bosh sahifaga",
    noScreenshot: "Screenshot tez orada qo'shiladi",
    tableOfContents: "Mundarija",
  },
  ru: {
    pageTitle: "Руководство пользователя",
    pageSubtitle: "Подробное руководство по использованию системы Cliento CRM",
    searchPlaceholder: "Поиск раздела...",
    steps: "Шаги",
    tips: "Советы",
    prevSection: "Предыдущий",
    nextSection: "Следующий",
    backToHome: "На главную",
    noScreenshot: "Скриншот будет добавлен в ближайшее время",
    tableOfContents: "Содержание",
  },
  en: {
    pageTitle: "User Guide",
    pageSubtitle: "Detailed guide on how to use the Cliento CRM system",
    searchPlaceholder: "Search section...",
    steps: "Steps",
    tips: "Tips",
    prevSection: "Previous",
    nextSection: "Next",
    backToHome: "Back to Home",
    noScreenshot: "Screenshot coming soon",
    tableOfContents: "Table of Contents",
  },
};
