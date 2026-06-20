"use client";

import { useState } from "react";
import { PackageCheck, Search } from "lucide-react";
import { getApiUrl } from "@/lib/api";

type TrackedOrder = {
  id: string;
  status: string;
  totalAmount: number;
  pickupTime?: string | null;
  createdAt: string;
  items: Array<{ quantity: number; menuItem: { name: string } }>;
};

export default function TrackOrderPage() {
  const [query, setQuery] = useState("");
  const [orders, setOrders] = useState<TrackedOrder[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function track() {
    setLoading(true);
    setMessage("");
    setOrders([]);
    try {
      const params = new URLSearchParams(query.includes("@") ? { email: query } : { phone: query });
      const response = await fetch(`${getApiUrl()}/orders/track?${params.toString()}`);
      const json = await response.json();
      if (!response.ok || !json.success) throw new Error(json.message || "Could not find orders.");
      setOrders(json.data);
      if (!json.data.length) setMessage("No recent orders found for this detail. Please check phone/email or place a fresh order.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Tracking failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page-shell py-14">
      <section className="mx-auto max-w-4xl text-center">
        <p className="section-label mx-auto"><PackageCheck size={16} /> Order status</p>
        <h1 className="section-heading mx-auto">Track your DK&apos;s Cafe order.</h1>
        <p className="mt-5 text-lg leading-8 text-white/58">Enter the phone number or email used while placing the order. You will see the latest order status from the cafe team.</p>
      </section>

      <section className="premium-card mx-auto mt-10 max-w-4xl p-6 md:p-8">
        <div className="relative">
          <div className="grid gap-3 md:grid-cols-[1fr_auto]">
            <input className="input-field" placeholder="Phone or email used in order" value={query} onChange={(e) => setQuery(e.target.value)} />
            <button onClick={track} disabled={loading || query.trim().length < 4} className="primary-btn disabled:opacity-60"><Search size={16} /> {loading ? "Checking..." : "Track"}</button>
          </div>
          {message && <p className="mt-4 rounded-2xl bg-white/10 p-3 text-sm text-white/65">{message}</p>}
          <div className="mt-6 grid gap-4">
            {orders.map((order) => (
              <article key={order.id} className="rounded-3xl border border-white/10 bg-black/20 p-5">
                <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
                  <div>
                    <p className="text-sm text-white/45">Order #{order.id.slice(-8).toUpperCase()} • {new Date(order.createdAt).toLocaleString()}</p>
                    <h2 className="mt-2 text-2xl font-black text-white">{order.status.replaceAll("_", " ")}</h2>
                    <p className="mt-1 text-white/50">Pickup: {order.pickupTime || "Cafe counter"}</p>
                  </div>
                  <p className="rounded-full bg-cafe-caramel px-5 py-3 text-xl font-black text-cafe-dark">₹{order.totalAmount}</p>
                </div>
                <div className="mt-4 grid gap-2 text-sm text-white/65">
                  {order.items.map((item, index) => <p key={`${order.id}-${index}`} className="rounded-2xl bg-white/[0.055] p-3">{item.menuItem.name} × {item.quantity}</p>)}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
