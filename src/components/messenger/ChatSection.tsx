import { useState } from "react";
import Icon from "@/components/ui/icon";
import { CHATS, MESSAGES } from "./data";

export default function ChatSection() {
  const [activeChat, setActiveChat] = useState(CHATS[1]);
  const [message, setMessage] = useState("");

  return (
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
  );
}
