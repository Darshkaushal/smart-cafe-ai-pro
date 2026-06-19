"use client";

import { useEffect, useState } from "react";
import { AdminShell } from "@/components/AdminShell";
import { AuthGuard } from "@/components/AuthGuard";
import { apiFetch } from "@/lib/api";

type Conversation = { id: string; demandText: string; userLanguage: string; createdAt: string; customer?: { name: string }; messages: Array<{ role: string; content: string }> };

export default function ConversationsPage() {
  const [items, setItems] = useState<Conversation[]>([]);
  useEffect(() => { apiFetch<Conversation[]>("/admin/conversations").then(setItems).catch(console.error); }, []);
  return (
    <AuthGuard><AdminShell>
      <h1 className="mb-6 text-4xl font-black">Tracked Cafe Conversations</h1>
      <div className="grid gap-4">
        {items.map((c) => <div key={c.id} className="admin-card"><div className="flex justify-between gap-4"><h2 className="font-black">{c.customer?.name || "Website visitor"}</h2><span className="text-sm text-white/45">{new Date(c.createdAt).toLocaleString()}</span></div><p className="mt-2 rounded-2xl bg-white/5 p-3 text-admin-gold">Demand: {c.demandText}</p><div className="mt-3 space-y-2">{c.messages.map((m, i) => <p key={i} className="whitespace-pre-line rounded-2xl bg-white/[0.04] p-3 text-sm text-white/70"><b>{m.role}:</b> {m.content}</p>)}</div></div>)}
      </div>
    </AdminShell></AuthGuard>
  );
}
