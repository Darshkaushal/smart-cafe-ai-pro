"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Coffee, Send, Sparkles, Wand2 } from "lucide-react";
import { postJson } from "@/lib/api";

type ChatResponse = {
  answer: string;
  conversationId: string;
};

const prompts = ["cold and sweet", "chocolate shake", "refreshing mango", "less sugar coffee"];

export function ChatWidget() {
  const [open, setOpen] = useState(true);
  const [message, setMessage] = useState("I want cold and sweet");
  const [history, setHistory] = useState<Array<{ role: "user" | "assistant"; text: string }>>([
    { role: "assistant", text: "Hi! Tell me your mood: cold, sweet, coffee, chocolate, spicy, refreshing... I will suggest 2–3 DK's Cafe picks in English + Hindi." }
  ]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, loading]);

  async function sendMessage(custom?: string) {
    const current = (custom || message).trim();
    if (!current) return;
    setHistory((h) => [...h, { role: "user", text: current }]);
    setMessage("");
    setLoading(true);
    try {
      const data = await postJson<ChatResponse>("/chat", { message: current });
      setHistory((h) => [...h, { role: "assistant", text: data.answer }]);
    } catch (error) {
      setHistory((h) => [...h, { role: "assistant", text: error instanceof Error ? error.message : "Recommendation failed. Please try again." }]);
    } finally {
      setLoading(false);
    }
  }

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="fixed bottom-6 right-6 z-50 grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-cafe-caramel to-cafe-neon text-cafe-dark shadow-glow transition hover:-translate-y-1" aria-label="Open sip guide">
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
            <p className="font-black text-white">Sip Guide</p>
            <p className="text-xs text-white/45">English + Hindi menu helper</p>
          </div>
        </div>
        <button onClick={() => setOpen(false)} className="grid h-10 w-10 place-items-center rounded-full bg-white/5 text-white/50 hover:text-white" aria-label="Close sip guide"><ChevronDown size={18} /></button>
      </div>

      <div className="max-h-96 space-y-3 overflow-y-auto p-4">
        {history.map((item, index) => (
          <div key={index} className={`rounded-3xl px-4 py-3 text-sm leading-6 ${item.role === "user" ? "ml-10 bg-cafe-caramel text-cafe-dark" : "mr-6 border border-white/10 bg-white/[0.07] text-white/85"}`}>
            <p className="whitespace-pre-line">{item.text}</p>
          </div>
        ))}
        {loading && (
          <div className="mr-16 flex items-center gap-2 rounded-3xl border border-white/10 bg-white/[0.07] px-4 py-3 text-sm text-white/55">
            <Wand2 size={16} className="text-cafe-caramel" /> Picking the best DK&apos;s Cafe matches...
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="border-t border-white/10 p-3">
        <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
          {prompts.map((prompt) => (
            <button key={prompt} onClick={() => sendMessage(`I want ${prompt}`)} className="whitespace-nowrap rounded-full bg-white/[0.07] px-3 py-2 text-xs font-bold text-white/55 hover:bg-white/10 hover:text-white">
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
            placeholder="I want cold and sweet..."
          />
          <button onClick={() => sendMessage()} disabled={loading} className="grid w-14 place-items-center rounded-2xl bg-cafe-caramel text-cafe-dark disabled:opacity-60" aria-label="Send message"><Send size={18} /></button>
        </div>
      </div>
    </div>
  );
}
