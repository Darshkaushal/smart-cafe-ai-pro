"use client";

import { useEffect, useMemo, useState } from "react";
import { AuthGuard } from "@/components/AuthGuard";
import { AdminShell } from "@/components/AdminShell";
import { apiFetch } from "@/lib/api";
import { BarChart3, BotMessageSquare, BrainCircuit, CalendarCheck, IndianRupee, LineChart, ShoppingBag, UsersRound } from "lucide-react";

type Overview = {
  stats: { bookings: number; orders: number; customers: number; conversations: number; revenue: number };
  predictions: Array<{ id: string; targetDate: string; expectedOccupancy: number; expectedBookings: number; confidence: number }>;
  latestOrders?: Array<{ id: string; status: string; totalAmount: number; createdAt: string }>;
  latestBookings?: Array<{ id: string; status: string; guests: number; createdAt: string }>;
};

export default function DashboardPage() {
  const [data, setData] = useState<Overview | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    apiFetch<Overview>("/admin/overview").then(setData).catch((err) => setError(err instanceof Error ? err.message : "Failed to load dashboard"));
  }, []);

  const stats = data ? [
    { label: "Bookings", value: data.stats.bookings, icon: CalendarCheck, tone: "text-admin-gold", width: Math.min(100, data.stats.bookings * 12) },
    { label: "Orders", value: data.stats.orders, icon: ShoppingBag, tone: "text-admin-green", width: Math.min(100, data.stats.orders * 12) },
    { label: "Customers", value: data.stats.customers, icon: UsersRound, tone: "text-sky-300", width: Math.min(100, data.stats.customers * 10) },
    { label: "Messages", value: data.stats.conversations, icon: BotMessageSquare, tone: "text-purple-300", width: Math.min(100, data.stats.conversations * 10) },
    { label: "Revenue", value: `₹${data.stats.revenue}`, icon: IndianRupee, tone: "text-admin-green", width: Math.min(100, data.stats.revenue / 80) }
  ] : [];

  const orderMix = useMemo(() => {
    const orders = data?.latestOrders || [];
    const labels = ["PENDING", "PREPARING", "READY", "COMPLETED"];
    return labels.map((label) => ({ label, count: orders.filter((order) => order.status === label).length }));
  }, [data]);

  return (
    <AuthGuard>
      <AdminShell>
        <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <p className="text-admin-gold">Live business control center</p>
            <h1 className="mt-2 text-4xl font-black tracking-tight md:text-6xl">Owner Dashboard</h1>
            <p className="mt-3 max-w-2xl text-white/50">Private dashboard for orders, customers, reservations, cafe messages, order flow and preparation insights.</p>
          </div>
          <div className="admin-soft p-4 text-sm text-white/55">
            <p className="font-bold text-white">System status</p>
            <p className="mt-1">Storefront, cafe assistant and dashboard connected</p>
          </div>
        </div>

        {error && <p className="admin-card mb-5 border-red-500/20 bg-red-500/10 text-red-100">{error}</p>}
        {!data ? <p className="text-white/60">Loading dashboard...</p> : (
          <>
            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {stats.map(({ label, value, icon: Icon, tone, width }) => (
                <div key={label} className="admin-card overflow-hidden">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-white/50">{label}</p>
                    <Icon className={tone} size={22} />
                  </div>
                  <p className="mt-4 text-3xl font-black">{value}</p>
                  <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/5"><div className="h-full rounded-full bg-gradient-to-r from-admin-gold to-admin-green" style={{ width: `${width}%` }} /></div>
                </div>
              ))}
            </section>

            <section className="mt-6 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
              <div className="admin-card">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-admin-gold">Demand analytics</p>
                    <h2 className="mt-1 text-2xl font-black">Upcoming Occupancy Forecast</h2>
                  </div>
                  <p className="rounded-full bg-admin-green/10 px-4 py-2 text-sm font-bold text-admin-green">Weekly model refresh</p>
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

            <section className="mt-6 grid gap-6 xl:grid-cols-3">
              <div className="admin-card bg-gradient-to-br from-admin-gold/15 to-white/[0.035]">
                <BrainCircuit className="text-admin-gold" />
                <h2 className="mt-4 text-2xl font-black">Assistant intelligence</h2>
                <p className="mt-3 text-sm leading-6 text-white/58">Hybrid cafe assistant with Gemini-ready responses, local recommendation scoring and small knowledge retrieval for offers, careers, franchise, tracking and availability.</p>
              </div>
              <div className="admin-card bg-gradient-to-br from-admin-green/10 to-white/[0.035]">
                <LineChart className="text-admin-green" />
                <h2 className="mt-4 text-2xl font-black">Prediction model</h2>
                <p className="mt-3 text-sm leading-6 text-white/58">Booking history is transformed into date features and rolling averages so the demand tool can estimate future occupancy.</p>
              </div>
              <div className="admin-card bg-gradient-to-br from-sky-400/10 to-white/[0.035]">
                <BarChart3 className="text-sky-300" />
                <h2 className="mt-4 text-2xl font-black">Manager view</h2>
                <p className="mt-3 text-sm leading-6 text-white/58">The dashboard converts operations into quick signals: revenue, order flow, customers, conversations and table demand.</p>
              </div>
            </section>
          </>
        )}
      </AdminShell>
    </AuthGuard>
  );
}
