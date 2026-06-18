"use client";

import { useEffect, useState } from "react";
import { AdminShell } from "@/components/AdminShell";
import { AuthGuard } from "@/components/AuthGuard";
import { StatusSelect } from "@/components/StatusSelect";
import { apiFetch } from "@/lib/api";

type Order = { id: string; totalAmount: number; pickupTime?: string; status: string; customer: { name: string; phone?: string }; items: Array<{ quantity: number; menuItem: { name: string } }> };

export default function OrdersPage() {
  const [items, setItems] = useState<Order[]>([]);
  useEffect(() => { apiFetch<Order[]>("/admin/orders").then(setItems).catch(console.error); }, []);

  return (
    <AuthGuard><AdminShell>
      <h1 className="mb-6 text-4xl font-black">All Orders</h1>
      <div className="grid gap-4">
        {items.map((o) => <div key={o.id} className="admin-card">
          <div className="flex flex-wrap items-center justify-between gap-4"><div><h2 className="text-xl font-black">{o.customer.name}</h2><p className="text-sm text-white/45">{o.customer.phone} • Pickup {o.pickupTime || "ASAP"}</p></div><div className="flex items-center gap-3"><p className="text-2xl font-black text-admin-green">₹{o.totalAmount}</p><StatusSelect id={o.id} value={o.status} type="orders" /></div></div>
          <p className="mt-4 text-sm text-white/65">{o.items.map((item) => `${item.menuItem.name} × ${item.quantity}`).join(", ")}</p>
        </div>)}
      </div>
    </AdminShell></AuthGuard>
  );
}
