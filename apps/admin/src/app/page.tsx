"use client";

import { useEffect, useState } from "react";
import { AuthGuard } from "@/components/AuthGuard";
import { AdminShell } from "@/components/AdminShell";
import { apiFetch } from "@/lib/api";

type Overview = {
  stats: { bookings: number; orders: number; customers: number; conversations: number; revenue: number };
  predictions: Array<{ id: string; targetDate: string; expectedOccupancy: number; expectedBookings: number; confidence: number }>;
};

export default function DashboardPage() {
  const [data, setData] = useState<Overview | null>(null);

  useEffect(() => {
    apiFetch<Overview>("/admin/overview").then(setData).catch(console.error);
  }, []);

  return (
    <AuthGuard>
      <AdminShell>
        <div className="mb-8">
          <p className="text-admin-gold">Live business control center</p>
          <h1 className="text-4xl font-black">Owner Dashboard</h1>
        </div>
        {!data ? <p className="text-white/60">Loading...</p> : (
          <>
            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {[
                ["Bookings", data.stats.bookings],
                ["Orders", data.stats.orders],
                ["Customers", data.stats.customers],
                ["AI Chats", data.stats.conversations],
                ["Revenue", `₹${data.stats.revenue}`]
              ].map(([label, value]) => (
                <div key={label} className="admin-card">
                  <p className="text-sm text-white/50">{label}</p>
                  <p className="mt-2 text-3xl font-black">{value}</p>
                </div>
              ))}
            </section>
            <section className="admin-card mt-6">
              <h2 className="text-2xl font-black">Next ML Predictions</h2>
              <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                {data.predictions.map((prediction) => (
                  <div key={prediction.id} className="rounded-2xl bg-white/5 p-4">
                    <p className="text-sm text-white/50">{new Date(prediction.targetDate).toDateString()}</p>
                    <p className="mt-2 text-3xl font-black text-admin-green">{prediction.expectedOccupancy}%</p>
                    <p className="text-sm text-white/60">{prediction.expectedBookings} expected bookings</p>
                  </div>
                ))}
                {!data.predictions.length && <p className="text-white/60">Run ML predictor to see demand forecasts.</p>}
              </div>
            </section>
          </>
        )}
      </AdminShell>
    </AuthGuard>
  );
}
