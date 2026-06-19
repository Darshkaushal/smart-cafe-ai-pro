"use client";

import { useState } from "react";
import { CalendarCheck, CheckCircle2, Minus, Plus, Sparkles } from "lucide-react";
import { postJson } from "@/lib/api";

const slots = ["10:00 AM", "12:00 PM", "02:00 PM", "04:00 PM", "06:00 PM", "08:00 PM"];
const vibes = ["Birthday", "Window seat", "Date vibe", "Work meeting", "Less sugar", "Quiet corner"];

export function BookingForm() {
  const [status, setStatus] = useState<{ type: "idle" | "loading" | "success" | "error"; message: string }>({ type: "idle", message: "" });
  const [form, setForm] = useState({ name: "", email: "", phone: "", date: "", timeSlot: slots[4], guests: "2", notes: "" });

  function addVibe(vibe: string) {
    setForm((prev) => ({ ...prev, notes: prev.notes ? `${prev.notes}, ${vibe}` : vibe }));
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ type: "loading", message: "Booking your slot..." });
    try {
      await postJson("/bookings", {
        customer: { name: form.name, email: form.email, phone: form.phone },
        date: form.date,
        timeSlot: form.timeSlot,
        guests: Number(form.guests),
        notes: form.notes
      });
      setStatus({ type: "success", message: "Slot booked successfully. Owner can now see it in admin dashboard." });
      setForm({ name: "", email: "", phone: "", date: "", timeSlot: slots[4], guests: "2", notes: "" });
    } catch (error) {
      setStatus({ type: "error", message: error instanceof Error ? error.message : "Booking failed." });
    }
  }

  return (
    <form onSubmit={submit} className="premium-card mx-auto max-w-5xl p-6 md:p-8">
      <div className="relative grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-[1.7rem] bg-gradient-to-br from-cafe-caramel/20 to-white/[0.04] p-6">
          <div className="flex items-center gap-3 text-3xl font-black text-white"><CalendarCheck className="text-cafe-caramel" /> Reserve Your Vibe</div>
          <p className="mt-4 text-sm leading-6 text-white/58">Choose your date, time, guests, and vibe. The booking goes directly to MySQL and appears in the owner admin panel.</p>
          <div className="mt-8 grid gap-3">
            {[
              ["Secure", "Stored in MySQL"],
              ["Live", "Visible in admin"],
              ["Smart", "Used by ML predictor"]
            ].map(([title, text]) => (
              <div key={title} className="rounded-3xl border border-white/10 bg-black/20 p-4">
                <p className="font-black text-white">{title}</p>
                <p className="text-sm text-white/45">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          <div className="grid gap-4 md:grid-cols-2">
            <input required className="input-field" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input required className="input-field" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <input required className="input-field" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            <input required className="input-field" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
          </div>

          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-white/45">Select time slot</p>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {slots.map((slot) => (
                <button type="button" key={slot} onClick={() => setForm({ ...form, timeSlot: slot })} className={`rounded-2xl border px-4 py-3 text-sm font-black transition ${form.timeSlot === slot ? "border-cafe-caramel bg-cafe-caramel text-cafe-dark" : "border-white/10 bg-white/[0.055] text-white/70 hover:bg-white/10"}`}>
                  {slot}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-[220px_1fr]">
            <div className="rounded-3xl border border-white/10 bg-white/[0.055] p-4">
              <p className="text-sm text-white/45">Guests</p>
              <div className="mt-3 flex items-center justify-between">
                <button type="button" onClick={() => setForm({ ...form, guests: String(Math.max(1, Number(form.guests) - 1)) })} className="grid h-10 w-10 place-items-center rounded-full bg-white/10"><Minus size={16} /></button>
                <span className="text-3xl font-black text-white">{form.guests}</span>
                <button type="button" onClick={() => setForm({ ...form, guests: String(Math.min(30, Number(form.guests) + 1)) })} className="grid h-10 w-10 place-items-center rounded-full bg-white/10"><Plus size={16} /></button>
              </div>
            </div>
            <div>
              <p className="mb-3 flex items-center gap-2 text-sm font-bold text-white/55"><Sparkles size={16} className="text-cafe-caramel" /> Quick vibe tags</p>
              <div className="flex flex-wrap gap-2">
                {vibes.map((vibe) => <button type="button" key={vibe} onClick={() => addVibe(vibe)} className="chip transition hover:border-cafe-caramel/50 hover:text-white">{vibe}</button>)}
              </div>
            </div>
          </div>

          <textarea className="input-field min-h-28" placeholder="Notes: birthday, window seat, less sugar..." value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
          <button disabled={status.type === "loading"} className="primary-btn w-full disabled:opacity-60">{status.type === "loading" ? "Booking..." : "Book Slot"}</button>
          {status.message && <p className={`flex gap-2 rounded-2xl p-3 text-sm ${status.type === "success" ? "bg-cafe-neon/10 text-cafe-neon" : status.type === "error" ? "bg-red-500/10 text-red-100" : "bg-white/10 text-white/80"}`}>{status.type === "success" && <CheckCircle2 size={18} />} {status.message}</p>}
        </div>
      </div>
    </form>
  );
}
