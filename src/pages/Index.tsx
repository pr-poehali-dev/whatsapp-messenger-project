import { useState } from "react";
import Icon from "@/components/ui/icon";

type Section = "chats" | "contacts" | "calls" | "status" | "settings" | "archive";

const CURRENT_USER = { name: "Алексей Громов", role: "Директор по развитию", initials: "АГ" };

const CHATS = [
  { id: 1, name: "Совет директоров", type: "group", lastMsg: "Встреча перенесена на пятницу", time: "09:41", unread: 3, online: true, initials: "СД" },
  { id: 2, name: "Мария Колесникова", type: "direct", lastMsg: "Отчёт отправлен на согласование", time: "09:15", unread: 0, online: true, initials: "МК" },
  { id: 3, name: "Отдел безопасности", type: "group", lastMsg: "Аудит завершён успешно", time: "Вчера", unread: 1, online: false, initials: "ОБ" },
  { id: 4, name: "Игорь Савельев", type: "direct", lastMsg: "Документы готовы к подписанию", time: "Вчера", unread: 0, online: false, initials: "ИС" },
  { id: 5, name: "Юридический отдел", type: "group", lastMsg: "Контракт на рассмотрении", time: "Пн", unread: 0, online: false, initials: "ЮО" },
  { id: 6, name: "Наталья Орлова", type: "direct", lastMsg: "Спасибо, принято", time: "Пн", unread: 0, online: true, initials: "НО" },
];

const MESSAGES = [
  { id: 1, from: "Мария Колесникова", initials: "МК", text: "Алексей, добрый день. Квартальный отчёт готов к проверке.", time: "09:00", out: false },
  { id: 2, from: "me", initials: "АГ", text: "Получил. Когда можно обсудить детали?", time: "09:03", out: true },
  { id: 3, from: "Мария Колесникова", initials: "МК", text: "В любое удобное время. Документы уже отправлены на согласование финансовому директору.", time: "09:10", out: false },
  { id: 4, from: "me", initials: "АГ", text: "Отлично. Назначим встречу на завтра в 11:00, пригласим всех заинтересованных.", time: "09:12", out: true },
  { id: 5, from: "Мария Колесникова", initials: "МК", text: "Отчёт отправлен на согласование", time: "09:15", out: false },
];

const CONTACTS = [
  { id: 1, name: "Мария Колесникова", role: "Финансовый директор", dept: "Финансы", online: true, initials: "МК" },
  { id: 2, name: "Игорь Савельев", role: "Руководитель IT", dept: "Технологии", online: false, initials: "ИС" },
  { id: 3, name: "Наталья Орлова", role: "Директор по персоналу", dept: "HR", online: true, initials: "НО" },
  { id: 4, name: "Виктор Петров", role: "Коммерческий директор", dept: "Продажи", online: false, initials: "ВП" },
  { id: 5, name: "Елена Морозова", role: "Главный юрист", dept: "Юридический отдел", online: true, initials: "ЕМ" },
  { id: 6, name: "Дмитрий Чернов", role: "Директор по безопасности", dept: "Безопасность", online: false, initials: "ДЧ" },
];

const CALLS = [
  { id: 1, name: "Мария Колесникова", initials: "МК", type: "video", dir: "in", time: "Сегодня, 08:50", duration: "14 мин", missed: false },
  { id: 2, name: "Совет директоров", initials: "СД", type: "voice", dir: "conf", time: "Вчера, 17:00", duration: "45 мин", missed: false },
  { id: 3, name: "Игорь Савельев", initials: "ИС", type: "voice", dir: "out", time: "Вчера, 14:30", duration: "8 мин", missed: false },
  { id: 4, name: "Наталья Орлова", initials: "НО", type: "video", dir: "in", time: "Пн, 11:00", duration: "-", missed: true },
  { id: 5, name: "Виктор Петров", initials: "ВП", type: "voice", dir: "out", time: "Пн, 09:15", duration: "22 мин", missed: false },
];

const STATUSES = [
  { id: 1, name: "Мария Колесникова", initials: "МК", text: "Готовлю квартальный отчёт", time: "10 мин назад", online: true },
  { id: 2, name: "Наталья Орлова", initials: "НО", text: "Провожу собеседования до 14:00", time: "1 ч назад", online: true },
  { id: 3, name: "Виктор Петров", initials: "ВП", text: "В командировке до пятницы", time: "3 ч назад", online: false },
  { id: 4, name: "Елена Морозова", initials: "ЕМ", text: "Изучаю контракт. Не беспокоить.", time: "Вчера", online: true },
];

const ARCHIVE = [
  { id: 1, name: "Проект Альфа 2024", type: "group", lastMsg: "Проект успешно завершён", date: "15 апр 2025", initials: "ПА" },
  { id: 2, name: "Тендер №47", type: "group", lastMsg: "Тендер выигран", date: "02 мар 2025", initials: "Т4" },
  { id: 3, name: "Борис Лавров", type: "direct", lastMsg: "Удачи на новом месте!", date: "10 янв 2025", initials: "БЛ" },
];

const NAV_ITEMS: { id: Section; icon: string; label: string }[] = [
  { id: "chats", icon: "MessageSquare", label: "Чаты" },
  { id: "contacts", icon: "Users", label: "Контакты" },
  { id: "calls", icon: "Phone", label: "Вызовы" },
  { id: "status", icon: "Activity", label: "Статус" },
  { id: "archive", icon: "Archive", label: "Архив" },
];

export default function Index() {
  const [section, setSection] = useState<Section>("chats");
  const [activeChat, setActiveChat] = useState(CHATS[1]);
  const [message, setMessage] = useState("");

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
      {/* Левая навигация */}
      <nav className="flex flex-col items-center w-16 h-full border-r border-border flex-shrink-0" style={{ background: "hsl(220 13% 7%)" }}>
        {/* Логотип */}
        <div className="flex items-center justify-center w-16 h-14 border-b border-border mb-1">
          <div className="w-7 h-7 bg-primary flex items-center justify-center" style={{ clipPath: "polygon(0 0, 100% 0, 100% 75%, 75% 100%, 0 100%)" }}>
            <span className="text-white font-bold text-xs tracking-tight">SC</span>
          </div>
        </div>

        {/* Основные разделы */}
        <div className="flex flex-col flex-1 w-full">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => setSection(item.id)}
              className={`nav-item ${section === item.id ? "active" : ""}`}
              title={item.label}
            >
              <Icon name={item.icon} size={18} />
              <span className="text-[9px] mt-0.5 tracking-wide">{item.label}</span>
              {item.id === "chats" && (
                <span className="absolute top-2 right-2 w-4 h-4 bg-primary text-white text-[9px] flex items-center justify-center font-medium" style={{ borderRadius: 0 }}>4</span>
              )}
            </button>
          ))}
        </div>

        {/* Настройки и аватар внизу */}
        <div className="flex flex-col items-center w-full border-t border-border pb-2">
          <button
            onClick={() => setSection("settings")}
            className={`nav-item ${section === "settings" ? "active" : ""}`}
            title="Настройки"
          >
            <Icon name="Settings" size={18} />
            <span className="text-[9px] mt-0.5 tracking-wide">Настройки</span>
          </button>
          <div className="w-8 h-8 bg-primary/20 border border-primary/40 flex items-center justify-center cursor-pointer" title={CURRENT_USER.name}>
            <span className="text-primary text-xs font-semibold">{CURRENT_USER.initials}</span>
          </div>
        </div>
      </nav>

      {/* Основное содержимое */}
      <div className="flex flex-1 overflow-hidden">

        {/* === ЧАТЫ === */}
        {section === "chats" && (
          <>
            <div className="w-72 flex-shrink-0 flex flex-col border-r border-border bg-card">
              <div className="panel-header">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold tracking-wide">ЧАТЫ</span>
                  <span className="encrypt-badge">E2E</span>
                </div>
                <button className="text-muted-foreground hover:text-foreground transition-colors">
                  <Icon name="Plus" size={16} />
                </button>
              </div>
              <div className="px-3 py-2 border-b border-border">
                <div className="relative">
                  <Icon name="Search" size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    className="w-full bg-input border border-border text-sm pl-8 pr-3 py-1.5 outline-none text-foreground placeholder:text-muted-foreground focus:border-primary/50"
                    placeholder="Поиск чатов..."
                    style={{ borderRadius: 0, fontFamily: "inherit" }}
                  />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                <div className="section-label">ЛИЧНЫЕ</div>
                {CHATS.filter(c => c.type === "direct").map(chat => (
                  <div key={chat.id} className={`chat-item ${activeChat.id === chat.id ? "active" : ""}`} onClick={() => setActiveChat(chat)}>
                    <div className="flex items-center gap-2.5">
                      <div className="relative flex-shrink-0">
                        <div className="w-9 h-9 bg-secondary border border-border flex items-center justify-center text-xs font-semibold">
                          {chat.initials}
                        </div>
                        <span className={`status-dot absolute -bottom-0.5 -right-0.5 border-2 border-card ${chat.online ? "status-online" : "status-offline"}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline">
                          <span className="text-sm font-medium truncate">{chat.name}</span>
                          <span className="text-[11px] text-muted-foreground ml-2 flex-shrink-0">{chat.time}</span>
                        </div>
                        <div className="flex justify-between items-center mt-0.5">
                          <span className="text-xs text-muted-foreground truncate">{chat.lastMsg}</span>
                          {chat.unread > 0 && (
                            <span className="ml-2 flex-shrink-0 min-w-[16px] h-4 bg-primary text-white text-[10px] flex items-center justify-center font-medium px-1">{chat.unread}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="section-label mt-1">ГРУППОВЫЕ</div>
                {CHATS.filter(c => c.type === "group").map(chat => (
                  <div key={chat.id} className={`chat-item ${activeChat.id === chat.id ? "active" : ""}`} onClick={() => setActiveChat(chat)}>
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 bg-primary/15 border border-primary/30 flex items-center justify-center text-xs font-semibold text-primary flex-shrink-0">
                        {chat.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline">
                          <span className="text-sm font-medium truncate">{chat.name}</span>
                          <span className="text-[11px] text-muted-foreground ml-2 flex-shrink-0">{chat.time}</span>
                        </div>
                        <div className="flex justify-between items-center mt-0.5">
                          <span className="text-xs text-muted-foreground truncate">{chat.lastMsg}</span>
                          {chat.unread > 0 && (
                            <span className="ml-2 flex-shrink-0 min-w-[16px] h-4 bg-primary text-white text-[10px] flex items-center justify-center font-medium px-1">{chat.unread}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Окно чата */}
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="panel-header border-b border-border flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-8 h-8 bg-secondary border border-border flex items-center justify-center text-xs font-semibold">
                      {activeChat.initials}
                    </div>
                    {activeChat.online && <span className="status-dot status-online absolute -bottom-0.5 -right-0.5 border-2 border-card" />}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{activeChat.name}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      {activeChat.type === "group" ? (
                        <><Icon name="Users" size={10} /> <span>8 участников</span></>
                      ) : (
                        <span style={{ color: activeChat.online ? "hsl(142 71% 55%)" : undefined }}>
                          {activeChat.online ? "В сети" : "Не в сети"}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <span className="encrypt-badge mr-2">E2E шифрование</span>
                  {["Phone", "Video", "Search", "MoreVertical"].map(ico => (
                    <button key={ico} className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
                      <Icon name={ico} size={16} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                <div className="flex justify-center mb-4">
                  <span className="text-[11px] text-muted-foreground bg-secondary px-3 py-1 tracking-widest">СЕГОДНЯ</span>
                </div>
                {MESSAGES.map(msg => (
                  <div key={msg.id} className={`flex gap-2.5 ${msg.out ? "flex-row-reverse" : ""}`}>
                    {!msg.out && (
                      <div className="w-7 h-7 bg-secondary border border-border flex items-center justify-center text-[10px] font-semibold flex-shrink-0 mt-1">
                        {msg.initials}
                      </div>
                    )}
                    <div className="max-w-[65%]">
                      {!msg.out && <div className="text-[11px] text-muted-foreground mb-1 font-medium">{msg.from}</div>}
                      <div className={`px-3 py-2 text-sm leading-relaxed ${msg.out ? "msg-bubble-out" : "msg-bubble-in"}`}>
                        {msg.text}
                      </div>
                      <div className={`text-[10px] text-muted-foreground mt-1 flex items-center gap-1 ${msg.out ? "justify-end" : ""}`}>
                        {msg.time}
                        {msg.out && <Icon name="CheckCheck" size={12} className="text-primary" />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="px-4 py-3 border-t border-border bg-card flex-shrink-0">
                <div className="flex items-center gap-2">
                  <button className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors flex-shrink-0">
                    <Icon name="Paperclip" size={16} />
                  </button>
                  <input
                    className="flex-1 bg-input border border-border text-sm px-3 py-2 outline-none focus:border-primary/50 text-foreground placeholder:text-muted-foreground"
                    placeholder="Введите сообщение..."
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    style={{ borderRadius: 0, fontFamily: "inherit" }}
                  />
                  <button className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors flex-shrink-0">
                    <Icon name="Smile" size={16} />
                  </button>
                  <button className="w-8 h-8 bg-primary flex items-center justify-center text-white hover:bg-primary/90 transition-colors flex-shrink-0">
                    <Icon name="Send" size={15} />
                  </button>
                </div>
                <div className="flex items-center gap-1 mt-1.5">
                  <Icon name="Lock" size={10} style={{ color: "hsl(142 71% 45%)" }} />
                  <span className="text-[10px]" style={{ color: "hsl(142 71% 45%)" }}>Сообщение защищено end-to-end шифрованием</span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* === КОНТАКТЫ === */}
        {section === "contacts" && (
          <>
            <div className="w-72 flex-shrink-0 flex flex-col border-r border-border bg-card">
              <div className="panel-header">
                <span className="text-sm font-semibold tracking-wide">КОНТАКТЫ</span>
                <button className="text-muted-foreground hover:text-foreground transition-colors">
                  <Icon name="UserPlus" size={16} />
                </button>
              </div>
              <div className="px-3 py-2 border-b border-border">
                <div className="relative">
                  <Icon name="Search" size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    className="w-full bg-input border border-border text-sm pl-8 pr-3 py-1.5 outline-none text-foreground placeholder:text-muted-foreground focus:border-primary/50"
                    placeholder="Поиск контактов..."
                    style={{ borderRadius: 0, fontFamily: "inherit" }}
                  />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                <div className="section-label">ОНЛАЙН — {CONTACTS.filter(c => c.online).length}</div>
                {CONTACTS.filter(c => c.online).map(c => (
                  <div key={c.id} className="chat-item">
                    <div className="flex items-center gap-2.5">
                      <div className="relative flex-shrink-0">
                        <div className="w-9 h-9 bg-secondary border border-border flex items-center justify-center text-xs font-semibold">{c.initials}</div>
                        <span className="status-dot status-online absolute -bottom-0.5 -right-0.5 border-2 border-card" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">{c.name}</div>
                        <div className="text-xs text-muted-foreground">{c.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="section-label mt-1">НЕ В СЕТИ</div>
                {CONTACTS.filter(c => !c.online).map(c => (
                  <div key={c.id} className="chat-item">
                    <div className="flex items-center gap-2.5">
                      <div className="relative flex-shrink-0">
                        <div className="w-9 h-9 bg-secondary border border-border flex items-center justify-center text-xs font-semibold opacity-60">{c.initials}</div>
                        <span className="status-dot status-offline absolute -bottom-0.5 -right-0.5 border-2 border-card" />
                      </div>
                      <div>
                        <div className="text-sm font-medium opacity-80">{c.name}</div>
                        <div className="text-xs text-muted-foreground">{c.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 flex items-center justify-center bg-background">
              <div className="text-center space-y-3">
                <div className="w-14 h-14 bg-secondary border border-border flex items-center justify-center mx-auto">
                  <Icon name="Users" size={24} className="text-muted-foreground" />
                </div>
                <div className="text-sm text-muted-foreground">Выберите контакт для просмотра профиля</div>
                <div className="encrypt-badge inline-block">Все данные защищены E2E</div>
              </div>
            </div>
          </>
        )}

        {/* === ВЫЗОВЫ === */}
        {section === "calls" && (
          <>
            <div className="w-80 flex-shrink-0 flex flex-col border-r border-border bg-card">
              <div className="panel-header">
                <span className="text-sm font-semibold tracking-wide">ВЫЗОВЫ</span>
                <div className="flex gap-1">
                  <button className="text-muted-foreground hover:text-foreground transition-colors p-1"><Icon name="Phone" size={15} /></button>
                  <button className="text-muted-foreground hover:text-foreground transition-colors p-1"><Icon name="Video" size={15} /></button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                <div className="section-label">ИСТОРИЯ</div>
                {CALLS.map(call => (
                  <div key={call.id} className="chat-item">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 flex items-center justify-center text-xs font-semibold flex-shrink-0 border ${call.missed ? "bg-destructive/10 border-destructive/30 text-destructive" : "bg-secondary border-border"}`}>
                        {call.initials}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className={`text-sm font-medium ${call.missed ? "text-destructive" : ""}`}>{call.name}</span>
                          <div className="flex items-center gap-1">
                            <Icon name={call.type === "video" ? "Video" : "Phone"} size={11} className="text-muted-foreground" />
                            <span className="text-[11px] text-muted-foreground">{call.duration}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <Icon name={call.dir === "in" ? "PhoneIncoming" : call.dir === "out" ? "PhoneOutgoing" : "PhoneCall"} size={11} className={call.missed ? "text-destructive" : "text-muted-foreground"} />
                          <span className="text-xs text-muted-foreground">{call.time}</span>
                          {call.missed && <span className="text-[10px] text-destructive font-medium">ПРОПУЩЕН</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 flex items-center justify-center bg-background">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-secondary border border-border flex items-center justify-center mx-auto">
                  <Icon name="PhoneCall" size={28} className="text-muted-foreground" />
                </div>
                <div>
                  <div className="text-base font-medium">Голосовые и видеозвонки</div>
                  <div className="text-sm text-muted-foreground mt-1">Все звонки защищены E2E шифрованием</div>
                </div>
                <div className="flex gap-3 justify-center">
                  <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 text-sm font-medium hover:bg-primary/90 transition-colors">
                    <Icon name="Phone" size={14} /> Голосовой
                  </button>
                  <button className="flex items-center gap-2 bg-secondary border border-border text-foreground px-4 py-2 text-sm font-medium hover:bg-muted transition-colors">
                    <Icon name="Video" size={14} /> Видеозвонок
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* === СТАТУС === */}
        {section === "status" && (
          <>
            <div className="w-72 flex-shrink-0 flex flex-col border-r border-border bg-card">
              <div className="panel-header">
                <span className="text-sm font-semibold tracking-wide">СТАТУСЫ</span>
              </div>
              <div className="flex-1 overflow-y-auto">
                <div className="section-label">МОЙ СТАТУС</div>
                <div className="px-3 pb-3">
                  <div className="bg-secondary border border-border p-3 space-y-2">
                    <div className="flex items-center gap-2.5">
                      <div className="relative">
                        <div className="w-10 h-10 bg-primary/20 border border-primary/40 flex items-center justify-center text-xs font-semibold text-primary">{CURRENT_USER.initials}</div>
                        <span className="status-dot status-online absolute -bottom-0.5 -right-0.5 border-2 border-secondary" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">{CURRENT_USER.name}</div>
                        <div className="text-xs text-muted-foreground">В сети</div>
                      </div>
                    </div>
                    <input
                      className="w-full bg-input border border-border text-sm px-3 py-1.5 outline-none text-foreground placeholder:text-muted-foreground focus:border-primary/50"
                      placeholder="Напишите статус..."
                      defaultValue="Доступен для звонков"
                      style={{ borderRadius: 0, fontFamily: "inherit" }}
                    />
                    <div className="flex gap-1.5 flex-wrap">
                      {["🟢 Доступен", "🟡 Занят", "🔴 Не беспокоить"].map(s => (
                        <button key={s} className="text-[11px] px-2 py-1 bg-muted border border-border hover:border-primary/50 transition-colors">{s}</button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="section-label">ОБНОВЛЕНИЯ КОМАНДЫ</div>
                {STATUSES.map(s => (
                  <div key={s.id} className="chat-item">
                    <div className="flex gap-2.5">
                      <div className="relative flex-shrink-0">
                        <div className="w-9 h-9 bg-secondary border border-border flex items-center justify-center text-xs font-semibold">{s.initials}</div>
                        <span className={`status-dot absolute -bottom-0.5 -right-0.5 border-2 border-card ${s.online ? "status-online" : "status-offline"}`} />
                      </div>
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-sm font-medium">{s.name}</span>
                          <span className="text-[10px] text-muted-foreground">{s.time}</span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5">{s.text}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center bg-background">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-secondary border border-border flex items-center justify-center mx-auto">
                  <Icon name="Activity" size={22} className="text-muted-foreground" />
                </div>
                <div className="text-sm text-muted-foreground">Отслеживайте активность команды</div>
              </div>
            </div>
          </>
        )}

        {/* === АРХИВ === */}
        {section === "archive" && (
          <>
            <div className="w-72 flex-shrink-0 flex flex-col border-r border-border bg-card">
              <div className="panel-header">
                <span className="text-sm font-semibold tracking-wide">АРХИВ</span>
              </div>
              <div className="flex-1 overflow-y-auto">
                <div className="section-label">АРХИВИРОВАННЫЕ ЧАТЫ</div>
                {ARCHIVE.map(a => (
                  <div key={a.id} className="chat-item opacity-75 hover:opacity-100 transition-opacity">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 bg-muted border border-border flex items-center justify-center text-xs font-semibold">{a.initials}</div>
                      <div className="flex-1">
                        <div className="flex justify-between items-baseline">
                          <span className="text-sm font-medium">{a.name}</span>
                          <span className="text-[11px] text-muted-foreground">{a.date}</span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5">{a.lastMsg}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center bg-background">
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-secondary border border-border flex items-center justify-center mx-auto">
                  <Icon name="Archive" size={22} className="text-muted-foreground" />
                </div>
                <div className="text-sm text-muted-foreground">Архивированные чаты сохраняются бессрочно</div>
                <div className="encrypt-badge inline-block">Защищены E2E</div>
              </div>
            </div>
          </>
        )}

        {/* === НАСТРОЙКИ === */}
        {section === "settings" && (
          <div className="flex-1 overflow-y-auto p-8">
            <div className="max-w-xl">
              <h1 className="text-sm font-semibold tracking-widest text-muted-foreground mb-6">НАСТРОЙКИ</h1>

              <div className="space-y-5">
                {/* Профиль */}
                <div className="bg-card border border-border p-5">
                  <div className="text-[10px] font-medium tracking-widest text-muted-foreground mb-4">ПРОФИЛЬ</div>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-primary/20 border-2 border-primary/40 flex items-center justify-center text-lg font-bold text-primary">АГ</div>
                    <div className="flex-1">
                      <div className="font-semibold">{CURRENT_USER.name}</div>
                      <div className="text-sm text-muted-foreground">{CURRENT_USER.role}</div>
                    </div>
                    <button className="text-xs px-3 py-1.5 border border-border hover:border-primary/50 text-muted-foreground hover:text-foreground transition-colors">
                      Изменить
                    </button>
                  </div>
                </div>

                {/* Безопасность */}
                <div className="bg-card border border-border p-5">
                  <div className="text-[10px] font-medium tracking-widest text-muted-foreground mb-4">БЕЗОПАСНОСТЬ</div>
                  <div className="space-y-1">
                    {[
                      { label: "End-to-end шифрование", desc: "Все сообщения зашифрованы", enabled: true, icon: "Lock" },
                      { label: "Двухфакторная аутентификация", desc: "Защита входа в аккаунт", enabled: true, icon: "Shield" },
                      { label: "Автоудаление сообщений", desc: "Через 90 дней", enabled: false, icon: "Trash2" },
                    ].map(item => (
                      <div key={item.label} className="flex items-center justify-between py-2.5 border-b border-border/40 last:border-0">
                        <div className="flex items-center gap-3">
                          <Icon name={item.icon} size={15} className="text-muted-foreground" />
                          <div>
                            <div className="text-sm font-medium">{item.label}</div>
                            <div className="text-xs text-muted-foreground">{item.desc}</div>
                          </div>
                        </div>
                        <div className={`w-9 h-5 flex items-center px-0.5 cursor-pointer transition-colors ${item.enabled ? "bg-primary" : "bg-muted border border-border"}`}>
                          <div className={`w-4 h-4 bg-white transition-transform ${item.enabled ? "translate-x-4" : "translate-x-0"}`} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Уведомления */}
                <div className="bg-card border border-border p-5">
                  <div className="text-[10px] font-medium tracking-widest text-muted-foreground mb-4">УВЕДОМЛЕНИЯ</div>
                  <div className="space-y-1">
                    {["Новые сообщения", "Упоминания", "Входящие звонки", "Обновления статуса"].map(item => (
                      <div key={item} className="flex items-center justify-between py-2.5 border-b border-border/40 last:border-0">
                        <span className="text-sm">{item}</span>
                        <div className="w-9 h-5 bg-primary flex items-center px-0.5 cursor-pointer">
                          <div className="w-4 h-4 bg-white translate-x-4" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <Icon name="Lock" size={11} style={{ color: "hsl(142 71% 45%)" }} />
                  <span className="text-[11px]" style={{ color: "hsl(142 71% 45%)" }}>SecureChat v1.0 — сертифицированное E2E шифрование</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
