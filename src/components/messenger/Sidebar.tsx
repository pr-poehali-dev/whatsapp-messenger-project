import Icon from "@/components/ui/icon";
import { Section, NAV_ITEMS, CURRENT_USER } from "./data";

interface SidebarProps {
  section: Section;
  setSection: (s: Section) => void;
}

export default function Sidebar({ section, setSection }: SidebarProps) {
  return (
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
  );
}
