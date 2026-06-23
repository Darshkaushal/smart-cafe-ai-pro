"use client";

import { useEffect, useMemo, useState } from "react";
import { AuthGuard } from "@/components/AuthGuard";
import { AdminShell } from "@/components/AdminShell";
import { apiFetch } from "@/lib/api";
import { BarChart3, BotMessageSquare, BrainCircuit, CalendarCheck, Crown, IndianRupee, LineChart, MessageCircle, ShoppingBag, Sparkles, Timer, TrendingUp, UsersRound } from "lucide-react";

type Overview = {
  stats: { bookings: number; orders: number; customers: number; conversations: number; revenue: number };
  predictions: Array<{ id: string; targetDate: string; expectedOccupancy: number; expectedBookings: number; confidence: number }>;
  latestOrders?: Array<{ id: string; status: string; totalAmount: number; createdAt: string; customer?: { name: string } | null }>;
  latestBookings?: Array<{ id: string; status: string; guests: number; createdAt: string; customer?: { name: string } | null }>;
};

function formatMoney(value: number) {
  return `₹${Number(value || 0).toLocaleString("en-IN")}`;
}

export default function DashboardPage() {
  const [data, setData] = useState<Overview | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    apiFetch<Overview>("/admin/overview").then(setData).catch((err) => setError(err instanceof Error ? err.message : "Failed to load dashboard"));
  }, []);

  const stats = data ? [
    { label: "Bookings", value: data.stats.bookings, icon: CalendarCheck, tone: "text-admin-gold", width: Math.min(100, Math.max(10, data.stats.bookings * 12)), note: "table demand" },
    { label: "Orders", value: data.stats.orders, icon: ShoppingBag, tone: "text-admin-green", width: Math.min(100, Math.max(10, data.stats.orders * 12)), note: "kitchen flow" },
    { label: "Customers", value: data.stats.customers, icon: UsersRound, tone: "text-sky-300", width: Math.min(100, Math.max(10, data.stats.customers * 10)), note: "guest records" },
    { label: "Chats", value: data.stats.conversations, icon: BotMessageSquare, tone: "text-purple-300", width: Math.min(100, Math.max(10, data.stats.conversations * 10)), note: "assistant queries" },
    { label: "Revenue", value: formatMoney(data.stats.revenue), icon: IndianRupee, tone: "text-admin-green", width: Math.min(100, Math.max(12, data.stats.revenue / 80)), note: "order value" }
  ] : [];

  const orderMix = useMemo(() => {
    const orders = data?.latestOrders || [];
    const labels = ["PENDING", "PREPARING", "READY", "COMPLETED"];
    return labels.map((label) => ({ label, count: orders.filter((order) => order.status === label).length }));
  }, [data]);

  const avgOccupancy = data?.predictions.length ? Math.round(data.predictions.reduce((sum, p) => sum + p.expectedOccupancy, 0) / data.predictions.length) : 0;

  return (
    <AuthGuard>
      <AdminShell>
        <div className="mb-8 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="admin-hero-card rounded-[2.2rem] border border-admin-line p-6 md:p-8">
            <p className="flex items-center gap-2 text-admin-gold"><Crown size={18} /> Royal owner command center</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight md:text-6xl">Dashboard that feels like a real startup cockpit.</h1>
            <p className="mt-4 max-w-3xl text-white/55">Manage reservations, orders, customers, chat conversations, demand signals and cafe preparation from one premium private dashboard.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full bg-admin-gold/15 px-4 py-2 text-sm font-black text-admin-gold">Live API connected</span>
              <span className="rounded-full bg-admin-green/10 px-4 py-2 text-sm font-black text-admin-green">Private owner access</span>
              <span className="rounded-full bg-white/5 px-4 py-2 text-sm font-black text-white/60">Mobile responsive</span>
            </div>
          </div>
          <div className="admin-card overflow-hidden">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-admin-gold">Today&apos;s signal</p>
                <h2 className="mt-1 text-3xl font-black">{avgOccupancy || "--"}%</h2>
              </div>
              <TrendingUp className="text-admin-green" size={34} />
            </div>
            <p className="mt-3 text-sm text-white/48">Average upcoming occupancy from saved demand predictions.</p>
            <div className="mt-7 h-3 overflow-hidden rounded-full bg-white/5"><div className="h-full rounded-full bg-gradient-to-r from-admin-gold to-admin-green" style={{ width: `${avgOccupancy || 0}%` }} /></div>
            <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-2xl bg-white/[0.04] p-4"><p className="text-white/40">Latest orders</p><p className="mt-1 text-2xl font-black text-white">{data?.latestOrders?.length || 0}</p></div>
              <div className="rounded-2xl bg-white/[0.04] p-4"><p className="text-white/40">Latest bookings</p><p className="mt-1 text-2xl font-black text-white">{data?.latestBookings?.length || 0}</p></div>
            </div>
          </div>
        </div>

        {error && <p className="admin-card mb-5 border-red-500/20 bg-red-500/10 text-red-100">{error}</p>}
        {!data ? <p className="text-white/60">Loading dashboard...</p> : (
          <>
            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
              {stats.map(({ label, value, icon: Icon, tone, width, note }) => (
                <div key={label} className="admin-card admin-kpi-card overflow-hidden">
                  <div className="flex items-center justify-between">
                    <div><p className="text-sm text-white/48">{label}</p><p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/25">{note}</p></div>
                    <Icon className={tone} size={24} />
                  </div>
                  <p className="mt-5 text-3xl font-black">{value}</p>
                  <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/5"><div className="h-full rounded-full bg-gradient-to-r from-admin-gold to-admin-green" style={{ width: `${width}%` }} /></div>
                </div>
              ))}
            </section>

            <section className="mt-6 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
              <div className="admin-card">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <p className="text-admin-gold">Demand analytics</p>
                    <h2 className="mt-1 text-2xl font-black">Upcoming Occupancy Forecast</h2>
                  </div>
                  <p className="rounded-full bg-admin-green/10 px-4 py-2 text-sm font-bold text-admin-green">Weekly refresh ready</p>
                </div>
                <div className="mt-6 flex h-72 items-end gap-3 rounded-[1.5rem] border border-admin-line bg-black/20 p-4">
                  {data.predictions.slice(0, 7).map((prediction) => (
                    <div key={prediction.id} className="flex h-full flex-1 flex-col justify-end gap-2">
                      <p className="text-center text-xs font-bold text-white/45">{prediction.expectedOccupancy}%</p>
                      <div className="rounded-t-2xl bg-gradient-to-t from-admin-green to-admin-gold shadow-[0_0_24px_rgba(165,255,117,0.12)]" style={{ height: `${Math.max(12, prediction.expectedOccupancy)}%` }} />
                      <p className="truncate text-center text-[10px] text-white/35">{new Date(prediction.targetDate).toLocaleDateString(undefined, { weekday: "short" })}</p>
                    </div>
                  ))}
                  {!data.predictions.length && <p className="m-auto text-white/60">Run the demand tool to see upcoming demand notes.</p>}
                </div>
              </div>

              <div className="admin-card">
                <p className="text-admin-gold">Order status system</p>
                <h2 className="mt-1 text-2xl font-black">Recent Order Flow</h2>
                <div className="mt-6 grid gap-3">
                  {orderMix.map((item) => (
                    <div key={item.label} className="rounded-2xl border border-admin-line bg-white/[0.035] p-4">
                      <div className="flex items-center justify-between text-sm"><span className="font-bold text-white/70">{item.label}</span><span className="text-admin-gold">{item.count}</span></div>
                      <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/5"><div className="h-full rounded-full bg-admin-gold" style={{ width: `${Math.min(100, item.count * 25)}%` }} /></div>
                    </div>
                  ))}
                  <p className="text-xs leading-5 text-white/40">Use Orders page to move orders from pending to preparing, ready and completed.</p>
                </div>
              </div>
            </section>

            <section className="mt-6 grid gap-6 xl:grid-cols-2">
              <div className="admin-card">
                <div className="flex items-center gap-3"><Timer className="text-admin-gold" /><h2 className="text-2xl font-black">Latest bookings</h2></div>
                <div className="mt-5 grid gap-3">
                  {(data.latestBookings || []).slice(0, 5).map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between gap-4 rounded-2xl bg-white/[0.035] p-4">
                      <div><p className="font-black text-white">{booking.customer?.name || "Guest"}</p><p className="text-sm text-white/40">{booking.guests} guests · {new Date(booking.createdAt).toLocaleString()}</p></div>
                      <span className="rounded-full bg-admin-gold/10 px-3 py-1 text-xs font-black text-admin-gold">{booking.status}</span>
                    </div>
                  ))}
                  {!data.latestBookings?.length && <p className="text-white/45">No bookings yet.</p>}
                </div>
              </div>
              <div className="admin-card">
                <div className="flex items-center gap-3"><MessageCircle className="text-admin-green" /><h2 className="text-2xl font-black">Latest orders</h2></div>
                <div className="mt-5 grid gap-3">
                  {(data.latestOrders || []).slice(0, 5).map((order) => (
                    <div key={order.id} className="flex items-center justify-between gap-4 rounded-2xl bg-white/[0.035] p-4">
                      <div><p className="font-black text-white">{order.customer?.name || "Guest"}</p><p className="text-sm text-white/40">{formatMoney(order.totalAmount)} · {new Date(order.createdAt).toLocaleString()}</p></div>
                      <span className="rounded-full bg-admin-green/10 px-3 py-1 text-xs font-black text-admin-green">{order.status}</span>
                    </div>
                  ))}
                  {!data.latestOrders?.length && <p className="text-white/45">No orders yet.</p>}
                </div>
              </div>
            </section>

            <section className="mt-6 grid gap-6 xl:grid-cols-3">
              <div className="admin-card bg-gradient-to-br from-admin-gold/15 to-white/[0.035]"><BrainCircuit className="text-admin-gold" /><h2 className="mt-4 text-2xl font-black">Cafe assistant</h2><p className="mt-3 text-sm leading-6 text-white/58">Menu-aware customer concierge with Gemini-ready answers, local recommendations and cafe knowledge retrieval.</p></div>
              <div className="admin-card bg-gradient-to-br from-admin-green/10 to-white/[0.035]"><LineChart className="text-admin-green" /><h2 className="mt-4 text-2xl font-black">Prediction signals</h2><p className="mt-3 text-sm leading-6 text-white/58">Booking history is converted into date signals and rolling averages to estimate upcoming occupancy.</p></div>
              <div className="admin-card bg-gradient-to-br from-sky-400/10 to-white/[0.035]"><BarChart3 className="text-sky-300" /><h2 className="mt-4 text-2xl font-black">Manager view</h2><p className="mt-3 text-sm leading-6 text-white/58">A premium operations summary for orders, bookings, customer growth, revenue and conversations.</p></div>
            </section>
          </>
        )}
      </AdminShell>
    </AuthGuard>
  );
}
