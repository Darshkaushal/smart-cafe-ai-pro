"use client";

import { useEffect, useState } from "react";
import { AuthGuard } from "@/components/AuthGuard";
import { AdminShell } from "@/components/AdminShell";
import { apiFetch } from "@/lib/api";
import { BotMessageSquare, CalendarCheck, IndianRupee, ShoppingBag, UsersRound } from "lucide-react";

type Overview = {
  stats: { bookings: number; orders: number; customers: number; conversations: number; revenue: number };
  predictions: Array<{ id: string; targetDate: string; expectedOccupancy: number; expectedBookings: number; confidence: number }>;
};

export default function DashboardPage() {
  const [data, setData] = useState<Overview | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    apiFetch<Overview>("/admin/overview").then(setData).catch((err) => setError(err instanceof Error ? err.message : "Failed to load dashboard"));
  }, []);

  const stats = data ? [
    { label: "Bookings", value: data.stats.bookings, icon: CalendarCheck, tone: "text-admin-gold" },
    { label: "Orders", value: data.stats.orders, icon: ShoppingBag, tone: "text-admin-green" },
    { label: "Customers", value: data.stats.customers, icon: UsersRound, tone: "text-sky-300" },
    { label: "Messages", value: data.stats.conversations, icon: BotMessageSquare, tone: "text-purple-300" },
    { label: "Revenue", value: `₹${data.stats.revenue}`, icon: IndianRupee, tone: "text-admin-green" }
  ] : [];

  return (
    <AuthGuard>
      <AdminShell>
        <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <p className="text-admin-gold">Live business control center</p>
            <h1 className="mt-2 text-4xl font-black tracking-tight md:text-6xl">Owner Dashboard</h1>
            <p className="mt-3 max-w-2xl text-white/50">Private dashboard for orders, customers, reservations, messages and preparation insights.</p>
          </div>
          <div className="admin-soft p-4 text-sm text-white/55">
            <p className="font-bold text-white">System status</p>
            <p className="mt-1">Cafe systems connected</p>
          </div>
        </div>

        {error && <p className="admin-card mb-5 border-red-500/20 bg-red-500/10 text-red-100">{error}</p>}
        {!data ? <p className="text-white/60">Loading dashboard...</p> : (
          <>
            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {stats.map(({ label, value, icon: Icon, tone }) => (
                <div key={label} className="admin-card overflow-hidden">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-white/50">{label}</p>
                    <Icon className={tone} size={22} />
                  </div>
                  <p className="mt-4 text-3xl font-black">{value}</p>
                  <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/5"><div className="h-full w-3/4 rounded-full bg-gradient-to-r from-admin-gold to-admin-green" /></div>
                </div>
              ))}
            </section>

            <section className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
              <div className="admin-card">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-admin-gold">Demand insights</p>
                    <h2 className="mt-1 text-2xl font-black">Upcoming Demand Notes</h2>
                  </div>
                  <p className="rounded-full bg-admin-green/10 px-4 py-2 text-sm font-bold text-admin-green">Weekly retraining</p>
                </div>
                <div className="mt-5 grid gap-3 md:grid-cols-2">
                  {data.predictions.slice(0, 4).map((prediction) => (
                    <div key={prediction.id} className="rounded-3xl border border-admin-line bg-white/[0.035] p-4">
                      <p className="text-sm text-white/50">{new Date(prediction.targetDate).toDateString()}</p>
                      <div className="mt-3 flex items-end gap-3"><p className="text-5xl font-black text-admin-green">{prediction.expectedOccupancy}%</p><p className="pb-2 text-sm text-white/45">occupancy</p></div>
                      <p className="mt-2 text-sm text-white/60">{prediction.expectedBookings} expected bookings • {(prediction.confidence * 100).toFixed(0)}% confidence</p>
                    </div>
                  ))}
                  {!data.predictions.length && <p className="text-white/60">Run the demand tool to see upcoming demand notes.</p>}
                </div>
              </div>

              <div className="admin-card bg-gradient-to-br from-admin-gold/15 to-white/[0.035]">
                <p className="text-admin-gold">Action plan</p>
                <h2 className="mt-1 text-2xl font-black">Owner preparation tips</h2>
                <div className="mt-5 grid gap-3">
                  {[
                    "Check pending slot bookings before evening rush.",
                    "Review customer messages to understand taste preferences.",
                    "Prepare extra stock when demand is above 75%.",
                    "Update order status to keep operations clean."
                  ].map((tip) => <p key={tip} className="rounded-2xl border border-admin-line bg-black/15 p-4 text-sm text-white/65">{tip}</p>)}
                </div>
              </div>
            </section>
          </>
        )}
      </AdminShell>
    </AuthGuard>
  );
}
