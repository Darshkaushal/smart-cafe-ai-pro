"use client";

import { useEffect, useState } from "react";
import { AdminShell } from "@/components/AdminShell";
import { AuthGuard } from "@/components/AuthGuard";
import { StatusSelect } from "@/components/StatusSelect";
import { apiFetch } from "@/lib/api";

type Booking = { id: string; date: string; timeSlot: string; guests: number; status: string; customer: { name: string; email?: string; phone?: string } };

export default function BookingsPage() {
  const [items, setItems] = useState<Booking[]>([]);
  useEffect(() => { apiFetch<Booking[]>("/admin/bookings").then(setItems).catch(console.error); }, []);

  return (
    <AuthGuard><AdminShell>
      <h1 className="mb-6 text-4xl font-black">All Bookings</h1>
      <div className="admin-card overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-white/50"><tr><th className="p-3">Customer</th><th>Date</th><th>Slot</th><th>Guests</th><th>Status</th></tr></thead>
          <tbody>
            {items.map((b) => <tr key={b.id} className="border-t border-admin-line"><td className="p-3 font-semibold">{b.customer.name}<br/><span className="text-white/45">{b.customer.phone}</span></td><td>{new Date(b.date).toDateString()}</td><td>{b.timeSlot}</td><td>{b.guests}</td><td><StatusSelect id={b.id} value={b.status} type="bookings" /></td></tr>)}
          </tbody>
        </table>
      </div>
    </AdminShell></AuthGuard>
  );
}
