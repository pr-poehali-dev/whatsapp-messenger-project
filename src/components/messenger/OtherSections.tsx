import Icon from "@/components/ui/icon";
import { Section, CONTACTS, CALLS, STATUSES, ARCHIVE, CURRENT_USER } from "./data";

interface OtherSectionsProps {
  section: Section;
}

export default function OtherSections({ section }: OtherSectionsProps) {
  return (
    <>
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
    </>
  );
}
