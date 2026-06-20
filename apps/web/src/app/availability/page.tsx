"use client";

import { useState } from "react";
import { CalendarCheck, SearchCheck } from "lucide-react";
import { getApiUrl } from "@/lib/api";

const slots = ["10:00 AM", "12:00 PM", "02:00 PM", "04:00 PM", "06:00 PM", "08:00 PM"];

type Availability = { date: string; timeSlot: string; requestedGuests: number; capacity: number; reservedGuests: number; availableSeats: number; isAvailable: boolean };

export default function AvailabilityPage() {
  const [form, setForm] = useState({ date: "", timeSlot: slots[4], guests: "2" });
  const [data, setData] = useState<Availability | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function check() {
    setLoading(true);
    setError("");
    setData(null);
    try {
      const params = new URLSearchParams({ date: form.date, timeSlot: form.timeSlot, guests: form.guests });
      const response = await fetch(`${getApiUrl()}/availability?${params.toString()}`);
      const json = await response.json();
      if (!response.ok || !json.success) throw new Error(json.message || "Availability check failed.");
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Availability check failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page-shell py-14">
      <section className="mx-auto max-w-4xl text-center">
        <p className="section-label mx-auto"><CalendarCheck size={16} /> Table availability</p>
        <h1 className="section-heading mx-auto">Check your preferred cafe slot before reserving.</h1>
        <p className="mt-5 text-lg leading-8 text-white/58">Select date, time and guests. This gives a realistic availability signal based on current reservations.</p>
      </section>

      <section className="premium-card mx-auto mt-10 max-w-4xl p-6 md:p-8">
        <div className="relative grid gap-4 md:grid-cols-3">
          <input className="input-field" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
          <select className="input-field" value={form.timeSlot} onChange={(e) => setForm({ ...form, timeSlot: e.target.value })}>{slots.map((slot) => <option key={slot}>{slot}</option>)}</select>
          <input className="input-field" type="number" min="1" max="30" value={form.guests} onChange={(e) => setForm({ ...form, guests: e.target.value })} />
          <button onClick={check} disabled={loading || !form.date} className="primary-btn md:col-span-3 disabled:opacity-60"><SearchCheck size={16} /> {loading ? "Checking..." : "Check availability"}</button>
        </div>
        {error && <p className="relative mt-5 rounded-2xl bg-red-500/10 p-4 text-red-100">{error}</p>}
        {data && (
          <div className="relative mt-6 rounded-[2rem] border border-white/10 bg-black/25 p-6">
            <p className="text-sm text-white/45">{data.date} • {data.timeSlot}</p>
            <h2 className={`mt-2 text-4xl font-black ${data.isAvailable ? "text-cafe-neon" : "text-red-200"}`}>{data.isAvailable ? "Table looks available" : "Almost full"}</h2>
            <p className="mt-3 text-white/62">{data.availableSeats} seats available out of {data.capacity}. Current reserved seats: {data.reservedGuests}.</p>
            <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-cafe-caramel to-cafe-neon" style={{ width: `${Math.min(100, (data.reservedGuests / data.capacity) * 100)}%` }} /></div>
          </div>
        )}
      </section>
    </main>
  );
}
