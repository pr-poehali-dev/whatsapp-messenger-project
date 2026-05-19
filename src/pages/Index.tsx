import { useState } from "react";
import { Section } from "@/components/messenger/data";
import Sidebar from "@/components/messenger/Sidebar";
import ChatSection from "@/components/messenger/ChatSection";
import OtherSections from "@/components/messenger/OtherSections";

export default function Index() {
  const [section, setSection] = useState<Section>("chats");

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
      <Sidebar section={section} setSection={setSection} />

      <div className="flex flex-1 overflow-hidden">
        {section === "chats" && <ChatSection />}
        {section !== "chats" && <OtherSections section={section} />}
      </div>
    </div>
  );
}
