"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Coffee, Send, Sparkles, Wand2 } from "lucide-react";
import { postJson } from "@/lib/api";

type ChatResponse = {
  answer: string;
  conversationId: string;
};

type ChatMessage = { role: "user" | "assistant"; text: string };

const prompts = [
  "Plan a birthday for 4",
  "Best drink under ₹200",
  "Check table availability",
  "How can I track order?",
  "Franchise details",
  "Careers/internship"
];

export function ChatWidget() {
  const [open, setOpen] = useState(true);
  const [message, setMessage] = useState("Suggest something cold and sweet");
  const [history, setHistory] = useState<ChatMessage[]>([
    {
      role: "assistant",
      text: "Hi, I’m DK’s Cafe Companion ✨ Ask me anything — menu suggestions, birthday planning, date table ideas, offers, order tracking, table availability, careers, franchise, location or timing. Hindi/Hinglish bhi chalega."
    }
  ]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, loading]);

  async function sendMessage(custom?: string) {
    const current = (custom || message).trim();
    if (!current || loading) return;

    const outgoingHistory = history
      .filter((item) => !item.text.startsWith("Hi, I’m DK’s Cafe Companion"))
      .slice(-8)
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
      <button onClick={() => setOpen(true)} className="fixed bottom-6 right-6 z-50 grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-cafe-caramel to-cafe-neon text-cafe-dark shadow-glow transition hover:-translate-y-1" aria-label="Open cafe companion">
        <Coffee />
      </button>
    );
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 w-[calc(100vw-2.5rem)] max-w-md overflow-hidden rounded-[2rem] border border-white/10 bg-[#100706]/95 shadow-[0_30px_100px_rgba(0,0,0,0.55)] backdrop-blur-2xl">
      <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.035] p-4">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-cafe-caramel text-cafe-dark"><Sparkles /></div>
          <div>
            <p className="font-black text-white">Cafe Companion</p>
            <p className="text-xs text-white/45">Ask anything · English + Hindi</p>
          </div>
        </div>
        <button onClick={() => setOpen(false)} className="grid h-10 w-10 place-items-center rounded-full bg-white/5 text-white/50 hover:text-white" aria-label="Close cafe companion"><ChevronDown size={18} /></button>
      </div>

      <div className="max-h-96 space-y-3 overflow-y-auto p-4">
        {history.map((item, index) => (
          <div key={index} className={`rounded-3xl px-4 py-3 text-sm leading-6 ${item.role === "user" ? "ml-10 bg-cafe-caramel text-cafe-dark" : "mr-6 border border-white/10 bg-white/[0.07] text-white/85"}`}>
            <p className="whitespace-pre-line">{item.text}</p>
          </div>
        ))}
        {loading && (
          <div className="mr-16 flex items-center gap-2 rounded-3xl border border-white/10 bg-white/[0.07] px-4 py-3 text-sm text-white/55">
            <Wand2 size={16} className="text-cafe-caramel" /> Thinking like your personal cafe guide...
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="border-t border-white/10 p-3">
        <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
          {prompts.map((prompt) => (
            <button key={prompt} onClick={() => sendMessage(prompt)} className="whitespace-nowrap rounded-full bg-white/[0.07] px-3 py-2 text-xs font-bold text-white/55 hover:bg-white/10 hover:text-white">
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
            placeholder="Ask menu, offers, careers, tracking..."
          />
          <button onClick={() => sendMessage()} disabled={loading} className="grid w-14 place-items-center rounded-2xl bg-cafe-caramel text-cafe-dark disabled:opacity-60" aria-label="Send message"><Send size={18} /></button>
        </div>
      </div>
    </div>
  );
}
