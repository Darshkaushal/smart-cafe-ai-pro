"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LockKeyhole, Sparkles } from "lucide-react";
import { getAdminApiUrl, saveToken } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("owner@smartcafe.ai");
  const [password, setPassword] = useState("Owner@12345");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function login(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch(`${getAdminApiUrl()}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const json = await response.json();
      if (!response.ok || !json.success) throw new Error(json.message || "Login failed");
      saveToken(json.data.token);
      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center overflow-hidden px-5">
      <div className="absolute left-10 top-10 h-72 w-72 rounded-full bg-admin-gold/10 blur-3xl" />
      <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-admin-green/10 blur-3xl" />
      <form onSubmit={login} className="admin-card relative w-full max-w-md space-y-5 p-7">
        <div className="grid h-16 w-16 place-items-center rounded-3xl bg-admin-gold text-admin-dark"><Sparkles /></div>
        <div>
          <p className="text-admin-gold">Protected owner area</p>
          <h1 className="mt-2 text-4xl font-black">Admin Login</h1>
          <p className="mt-2 text-sm text-white/50">Access bookings, orders, customers, AI conversations and demand predictions.</p>
        </div>
        <input className="admin-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="admin-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button disabled={loading} className="admin-btn w-full"><LockKeyhole size={18} /> {loading ? "Logging in..." : "Login"}</button>
        {error && <p className="rounded-2xl bg-red-500/10 p-3 text-sm text-red-200">{error}</p>}
        <div className="rounded-2xl border border-admin-line bg-white/[0.035] p-3 text-xs text-white/45">
          Demo login: owner@smartcafe.ai / Owner@12345
        </div>
      </form>
    </main>
  );
}
