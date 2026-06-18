"use client";

import { useState } from "react";
import { postJson } from "@/lib/api";

export default function ContactPage() {
  const [status, setStatus] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Sending...");
    try {
      await postJson("/contact", form);
      setStatus("Message sent. Owner can read it in admin panel.");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Contact request failed.");
    }
  }

  return (
    <main className="px-5 py-16">
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <p className="text-cafe-caramel">Contact us</p>
        <h1 className="mt-3 text-4xl font-black text-white md:text-6xl">Questions, events, birthdays, bulk orders.</h1>
      </div>
      <form onSubmit={submit} className="glass-card mx-auto max-w-3xl space-y-4 rounded-[2rem] p-6 md:p-8">
        <div className="grid gap-4 md:grid-cols-2">
          <input required className="input-field" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input required className="input-field" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input className="input-field" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <input required className="input-field" placeholder="Subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
        </div>
        <textarea required className="input-field min-h-36" placeholder="Message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
        <button className="primary-btn w-full">Send Message</button>
        {status && <p className="rounded-2xl bg-white/10 p-3 text-sm text-white/75">{status}</p>}
      </form>
    </main>
  );
}
