"use client";

import { useEffect, useState } from "react";
import { AdminShell } from "@/components/AdminShell";
import { AuthGuard } from "@/components/AuthGuard";
import { apiFetch } from "@/lib/api";

type Customer = { id: string; name: string; email?: string; phone?: string; createdAt: string; _count: { bookings: number; orders: number; conversations: number } };

export default function CustomersPage() {
  const [items, setItems] = useState<Customer[]>([]);
  useEffect(() => { apiFetch<Customer[]>("/admin/customers").then(setItems).catch(console.error); }, []);
  return (
    <AuthGuard><AdminShell>
      <h1 className="mb-6 text-4xl font-black">All Customers</h1>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((c) => <div key={c.id} className="admin-card"><h2 className="text-xl font-black">{c.name}</h2><p className="text-sm text-white/50">{c.email || "No email"}</p><p className="text-sm text-white/50">{c.phone || "No phone"}</p><div className="mt-4 flex gap-2 text-xs text-white/60"><span className="rounded-full bg-white/5 px-3 py-1">{c._count.bookings} bookings</span><span className="rounded-full bg-white/5 px-3 py-1">{c._count.orders} orders</span><span className="rounded-full bg-white/5 px-3 py-1">{c._count.conversations} chats</span></div></div>)}
      </div>
    </AdminShell></AuthGuard>
  );
}
