"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Coffee, Crown, Send, Sparkles, Wand2 } from "lucide-react";
import { postJson } from "@/lib/api";

type ChatResponse = {
  answer: string;
  conversationId: string;
};

type ChatMessage = { role: "user" | "assistant"; text: string };

const promptGroups = [
  {
    title: "Taste",
    prompts: ["Cold and sweet under ₹250", "Best royal coffee", "Less sugar drink", "Snack combo for 2"]
  },
  {
    title: "Plan",
    prompts: ["Plan a birthday for 6", "Date table idea", "Study corner timing", "Check table availability"]
  },
  {
    title: "Help",
    prompts: ["How can I track order?", "Payment options", "Franchise details", "Careers/internship"]
  }
];

export function ChatWidget() {
  const [open, setOpen] = useState(true);
  const [activeGroup, setActiveGroup] = useState(0);
  const [message, setMessage] = useState("Suggest something cold and sweet");
  const [history, setHistory] = useState<ChatMessage[]>([
    {
      role: "assistant",
      text: "Hi, I’m your DK’s Cafe Concierge ✨ Ask anything — menu suggestions, birthday/date planning, table availability, offers, order tracking, careers, franchise, timing, location or budget combos. Hindi/Hinglish bhi chalega."
    }
  ]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const activePrompts = useMemo(() => promptGroups[activeGroup]?.prompts || [], [activeGroup]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, loading]);

  async function sendMessage(custom?: string) {
    const current = (custom || message).trim();
    if (!current || loading) return;

    const outgoingHistory = history
      .filter((item) => !item.text.startsWith("Hi, I’m your DK’s Cafe Concierge"))
      .slice(-10)
      .map((item) => ({ role: item.role, content: item.text }));

    setHistory((h) => [...h, { role: "user", text: current }]);
    setMessage("");
    setLoading(true);

    try {
      const data = await postJson<ChatResponse>("/chat", { message: current, history: outgoingHistory });
      setHistory((h) => [...h, { role: "assistant", text: data.answer }]);
    } catch (error) {
      setHistory((h) => [
        ...h,
        {
          role: "assistant",
          text: error instanceof Error ? error.message : "I couldn’t reply right now. Please try again."
        }
      ]);
    } finally {
      setLoading(false);
    }
  }

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="chat-royal-launcher fixed bottom-6 right-6 z-50 grid h-16 w-16 place-items-center rounded-full text-cafe-dark shadow-glow transition hover:-translate-y-1" aria-label="Open cafe concierge">
        <Coffee />
      </button>
    );
  }

  return (
    <div className="chat-royal-panel fixed bottom-4 right-4 z-50 w-[calc(100vw-2rem)] max-w-[460px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#100604]/96 shadow-[0_34px_110px_rgba(0,0,0,0.6)] backdrop-blur-2xl sm:bottom-5 sm:right-5">
      <div className="relative border-b border-white/10 bg-gradient-to-r from-cafe-caramel/18 via-white/[0.045] to-cafe-neon/8 p-4">
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cafe-caramel/18 blur-2xl" />
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-cafe-caramel text-cafe-dark shadow-glow"><Crown /></div>
            <div>
              <p className="font-black text-white">Royal Cafe Concierge</p>
              <p className="text-xs text-white/48">Fast answers · English + Hindi · Menu-aware</p>
            </div>
          </div>
          <button onClick={() => setOpen(false)} className="grid h-10 w-10 place-items-center rounded-full bg-white/5 text-white/50 hover:text-white" aria-label="Close cafe concierge"><ChevronDown size={18} /></button>
        </div>
      </div>

      <div className="max-h-[24rem] space-y-3 overflow-y-auto p-4 sm:max-h-[28rem]">
        {history.map((item, index) => (
          <div key={index} className={`rounded-3xl px-4 py-3 text-sm leading-6 ${item.role === "user" ? "ml-8 bg-cafe-caramel text-cafe-dark shadow-glow" : "mr-5 border border-white/10 bg-white/[0.07] text-white/86"}`}>
            <p className="whitespace-pre-line">{item.text}</p>
          </div>
        ))}
        {loading && (
          <div className="mr-14 flex items-center gap-2 rounded-3xl border border-white/10 bg-white/[0.07] px-4 py-3 text-sm text-white/55">
            <Wand2 size={16} className="text-cafe-caramel" /> Creating a polished cafe answer...
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="border-t border-white/10 p-3">
        <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
          {promptGroups.map((group, index) => (
            <button key={group.title} onClick={() => setActiveGroup(index)} className={`whitespace-nowrap rounded-full px-3 py-2 text-xs font-black transition ${activeGroup === index ? "bg-cafe-caramel text-cafe-dark" : "bg-white/[0.07] text-white/55 hover:bg-white/10 hover:text-white"}`}>
              {group.title}
            </button>
          ))}
        </div>
        <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
          {activePrompts.map((prompt) => (
            <button key={prompt} onClick={() => sendMessage(prompt)} className="whitespace-nowrap rounded-full bg-white/[0.07] px-3 py-2 text-xs font-bold text-white/58 hover:bg-white/10 hover:text-white">
              {prompt}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            onKeyDown={(event) => event.key === "Enter" && sendMessage()}
            className="input-field"
            placeholder="Ask anything about DK’s Cafe..."
          />
          <button onClick={() => sendMessage()} disabled={loading} className="grid w-14 place-items-center rounded-2xl bg-cafe-caramel text-cafe-dark disabled:opacity-60" aria-label="Send message"><Send size={18} /></button>
        </div>
        <p className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-white/35"><Sparkles size={12} /> With Gemini key, replies become more natural and conversational.</p>
      </div>
    </div>
  );
}
