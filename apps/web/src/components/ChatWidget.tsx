"use client";

import { useState } from "react";
import { Bot, Send, Sparkles } from "lucide-react";
import { postJson } from "@/lib/api";

type ChatResponse = {
  answer: string;
  conversationId: string;
};

export function ChatWidget() {
  const [open, setOpen] = useState(true);
  const [message, setMessage] = useState("I want cold and sweet");
  const [history, setHistory] = useState<Array<{ role: "user" | "ai"; text: string }>>([
    { role: "ai", text: "Hi! Tell me your mood: cold, sweet, coffee, chocolate, spicy, refreshing... I will suggest 2–3 best cafe items in English + Hindi." }
  ]);
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!message.trim()) return;
    const current = message.trim();
    setHistory((h) => [...h, { role: "user", text: current }]);
    setMessage("");
    setLoading(true);
    try {
      const data = await postJson<ChatResponse>("/chat", { message: current });
      setHistory((h) => [...h, { role: "ai", text: data.answer }]);
    } catch (error) {
      setHistory((h) => [...h, { role: "ai", text: error instanceof Error ? error.message : "Chat failed." }]);
    } finally {
      setLoading(false);
    }
  }

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="fixed bottom-6 right-6 z-50 rounded-full bg-cafe-caramel p-4 text-cafe-dark shadow-glow">
        <Bot />
      </button>
    );
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 w-[calc(100vw-2.5rem)] max-w-sm overflow-hidden rounded-3xl border border-white/10 bg-cafe-dark/95 shadow-glow backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-white/10 p-4">
        <div className="flex items-center gap-2 font-bold text-white"><Sparkles className="text-cafe-caramel" /> Drink AI</div>
        <button onClick={() => setOpen(false)} className="text-white/50 hover:text-white">×</button>
      </div>
      <div className="max-h-80 space-y-3 overflow-y-auto p-4">
        {history.map((item, index) => (
          <div key={index} className={`rounded-2xl px-4 py-3 text-sm ${item.role === "user" ? "ml-10 bg-cafe-caramel text-cafe-dark" : "mr-6 bg-white/10 text-white/85"}`}>
            <p className="whitespace-pre-line">{item.text}</p>
          </div>
        ))}
        {loading && <p className="text-sm text-white/50">AI is selecting best drinks...</p>}
      </div>
      <div className="flex gap-2 border-t border-white/10 p-3">
        <input
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={(event) => event.key === "Enter" && sendMessage()}
          className="input-field"
          placeholder="I want cold and sweet..."
        />
        <button onClick={sendMessage} className="rounded-2xl bg-cafe-caramel px-4 text-cafe-dark"><Send size={18} /></button>
      </div>
    </div>
  );
}
