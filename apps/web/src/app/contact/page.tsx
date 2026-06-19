"use client";

import { useState } from "react";
import { CheckCircle2, Clock, Mail, MapPin, Phone } from "lucide-react";
import { postJson } from "@/lib/api";

const contactItems = [
  { icon: Mail, title: "Email", text: "hello@dkscafe.in" },
  { icon: Phone, title: "Phone", text: "+91 98765 43210" },
  { icon: Clock, title: "Hours", text: "Open daily · 10:00 AM - 11:00 PM" },
  { icon: MapPin, title: "Location", text: "DK's Cafe, Jaipur, Rajasthan" }
];

export default function ContactPage() {
  const [status, setStatus] = useState<{ type: "idle" | "loading" | "success" | "error"; message: string }>({ type: "idle", message: "" });
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ type: "loading", message: "Sending your message..." });
    try {
      await postJson("/contact", form);
      setStatus({ type: "success", message: "Message sent. Our team will contact you soon." });
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      setStatus({ type: "error", message: error instanceof Error ? error.message : "Contact request failed." });
    }
  }

  return (
    <main className="px-5 py-16">
      <div className="page-shell">
        <div className="mx-auto mb-10 max-w-4xl text-center">
          <p className="section-label mx-auto">Visit us</p>
          <h1 className="section-heading mx-auto">Questions, events, birthdays, bulk orders.</h1>
          <p className="mx-auto mt-5 max-w-2xl text-white/60">Send us your plan and we&apos;ll help you with table setup, timing, menu suggestions and celebration details.</p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="premium-card p-6">
            <div className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {contactItems.map(({ icon: Icon, title, text }) => (
                <div key={title} className="rounded-3xl border border-white/10 bg-black/20 p-5">
                  <Icon className="text-cafe-caramel" />
                  <p className="mt-4 font-black text-white">{title}</p>
                  <p className="mt-1 text-sm text-white/55">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={submit} className="premium-card space-y-4 p-6 md:p-8">
            <div className="relative">
              <div className="grid gap-4 md:grid-cols-2">
                <input required className="input-field" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <input required className="input-field" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <input className="input-field" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                <input required className="input-field" placeholder="Subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
              </div>
              <textarea required className="input-field mt-4 min-h-40" placeholder="Message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
              <button disabled={status.type === "loading"} className="primary-btn mt-4 w-full disabled:opacity-60">{status.type === "loading" ? "Sending..." : "Send Message"}</button>
              {status.message && <p className={`mt-4 flex gap-2 rounded-2xl p-3 text-sm ${status.type === "success" ? "bg-cafe-neon/10 text-cafe-neon" : status.type === "error" ? "bg-red-500/10 text-red-100" : "bg-white/10 text-white/75"}`}>{status.type === "success" && <CheckCircle2 size={18} />} {status.message}</p>}
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
