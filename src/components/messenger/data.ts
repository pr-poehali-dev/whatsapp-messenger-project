export type Section = "chats" | "contacts" | "calls" | "status" | "settings" | "archive";

export const CURRENT_USER = { name: "Алексей Громов", role: "Директор по развитию", initials: "АГ" };

export const CHATS = [
  { id: 1, name: "Совет директоров", type: "group", lastMsg: "Встреча перенесена на пятницу", time: "09:41", unread: 3, online: true, initials: "СД" },
  { id: 2, name: "Мария Колесникова", type: "direct", lastMsg: "Отчёт отправлен на согласование", time: "09:15", unread: 0, online: true, initials: "МК" },
  { id: 3, name: "Отдел безопасности", type: "group", lastMsg: "Аудит завершён успешно", time: "Вчера", unread: 1, online: false, initials: "ОБ" },
  { id: 4, name: "Игорь Савельев", type: "direct", lastMsg: "Документы готовы к подписанию", time: "Вчера", unread: 0, online: false, initials: "ИС" },
  { id: 5, name: "Юридический отдел", type: "group", lastMsg: "Контракт на рассмотрении", time: "Пн", unread: 0, online: false, initials: "ЮО" },
  { id: 6, name: "Наталья Орлова", type: "direct", lastMsg: "Спасибо, принято", time: "Пн", unread: 0, online: true, initials: "НО" },
];

export const MESSAGES = [
  { id: 1, from: "Мария Колесникова", initials: "МК", text: "Алексей, добрый день. Квартальный отчёт готов к проверке.", time: "09:00", out: false },
  { id: 2, from: "me", initials: "АГ", text: "Получил. Когда можно обсудить детали?", time: "09:03", out: true },
  { id: 3, from: "Мария Колесникова", initials: "МК", text: "В любое удобное время. Документы уже отправлены на согласование финансовому директору.", time: "09:10", out: false },
  { id: 4, from: "me", initials: "АГ", text: "Отлично. Назначим встречу на завтра в 11:00, пригласим всех заинтересованных.", time: "09:12", out: true },
  { id: 5, from: "Мария Колесникова", initials: "МК", text: "Отчёт отправлен на согласование", time: "09:15", out: false },
];

export const CONTACTS = [
  { id: 1, name: "Мария Колесникова", role: "Финансовый директор", dept: "Финансы", online: true, initials: "МК" },
  { id: 2, name: "Игорь Савельев", role: "Руководитель IT", dept: "Технологии", online: false, initials: "ИС" },
  { id: 3, name: "Наталья Орлова", role: "Директор по персоналу", dept: "HR", online: true, initials: "НО" },
  { id: 4, name: "Виктор Петров", role: "Коммерческий директор", dept: "Продажи", online: false, initials: "ВП" },
  { id: 5, name: "Елена Морозова", role: "Главный юрист", dept: "Юридический отдел", online: true, initials: "ЕМ" },
  { id: 6, name: "Дмитрий Чернов", role: "Директор по безопасности", dept: "Безопасность", online: false, initials: "ДЧ" },
];

export const CALLS = [
  { id: 1, name: "Мария Колесникова", initials: "МК", type: "video", dir: "in", time: "Сегодня, 08:50", duration: "14 мин", missed: false },
  { id: 2, name: "Совет директоров", initials: "СД", type: "voice", dir: "conf", time: "Вчера, 17:00", duration: "45 мин", missed: false },
  { id: 3, name: "Игорь Савельев", initials: "ИС", type: "voice", dir: "out", time: "Вчера, 14:30", duration: "8 мин", missed: false },
  { id: 4, name: "Наталья Орлова", initials: "НО", type: "video", dir: "in", time: "Пн, 11:00", duration: "-", missed: true },
  { id: 5, name: "Виктор Петров", initials: "ВП", type: "voice", dir: "out", time: "Пн, 09:15", duration: "22 мин", missed: false },
];

export const STATUSES = [
  { id: 1, name: "Мария Колесникова", initials: "МК", text: "Готовлю квартальный отчёт", time: "10 мин назад", online: true },
  { id: 2, name: "Наталья Орлова", initials: "НО", text: "Провожу собеседования до 14:00", time: "1 ч назад", online: true },
  { id: 3, name: "Виктор Петров", initials: "ВП", text: "В командировке до пятницы", time: "3 ч назад", online: false },
  { id: 4, name: "Елена Морозова", initials: "ЕМ", text: "Изучаю контракт. Не беспокоить.", time: "Вчера", online: true },
];

export const ARCHIVE = [
  { id: 1, name: "Проект Альфа 2024", type: "group", lastMsg: "Проект успешно завершён", date: "15 апр 2025", initials: "ПА" },
  { id: 2, name: "Тендер №47", type: "group", lastMsg: "Тендер выигран", date: "02 мар 2025", initials: "Т4" },
  { id: 3, name: "Борис Лавров", type: "direct", lastMsg: "Удачи на новом месте!", date: "10 янв 2025", initials: "БЛ" },
];

export const NAV_ITEMS: { id: Section; icon: string; label: string }[] = [
  { id: "chats", icon: "MessageSquare", label: "Чаты" },
  { id: "contacts", icon: "Users", label: "Контакты" },
  { id: "calls", icon: "Phone", label: "Вызовы" },
  { id: "status", icon: "Activity", label: "Статус" },
  { id: "archive", icon: "Archive", label: "Архив" },
];
