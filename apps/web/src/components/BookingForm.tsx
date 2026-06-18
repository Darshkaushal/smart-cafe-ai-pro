"use client";

import { useState } from "react";
import { CalendarCheck } from "lucide-react";
import { postJson } from "@/lib/api";

const slots = ["10:00 AM", "12:00 PM", "02:00 PM", "04:00 PM", "06:00 PM", "08:00 PM"];

export function BookingForm() {
  const [status, setStatus] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", date: "", timeSlot: slots[0], guests: "2", notes: "" });

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Booking your slot...");
    try {
      await postJson("/bookings", {
        customer: { name: form.name, email: form.email, phone: form.phone },
        date: form.date,
        timeSlot: form.timeSlot,
        guests: Number(form.guests),
        notes: form.notes
      });
      setStatus("Slot booked successfully. Owner can now see it in admin dashboard.");
      setForm({ name: "", email: "", phone: "", date: "", timeSlot: slots[0], guests: "2", notes: "" });
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Booking failed.");
    }
  }

  return (
    <form onSubmit={submit} className="glass-card mx-auto max-w-3xl space-y-4 rounded-[2rem] p-6 md:p-8">
      <div className="flex items-center gap-3 text-2xl font-black text-white"><CalendarCheck className="text-cafe-caramel" /> Reserve Your Vibe</div>
      <div className="grid gap-4 md:grid-cols-2">
        <input required className="input-field" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input required className="input-field" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input required className="input-field" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <input required className="input-field" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
        <select className="input-field" value={form.timeSlot} onChange={(e) => setForm({ ...form, timeSlot: e.target.value })}>
          {slots.map((slot) => <option key={slot} value={slot}>{slot}</option>)}
        </select>
        <input required className="input-field" type="number" min="1" max="30" value={form.guests} onChange={(e) => setForm({ ...form, guests: e.target.value })} />
      </div>
      <textarea className="input-field min-h-28" placeholder="Notes: birthday, window seat, less sugar..." value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
      <button className="primary-btn w-full">Book Slot</button>
      {status && <p className="rounded-2xl bg-white/10 p-3 text-sm text-white/80">{status}</p>}
    </form>
  );
}
