"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { API_URL, saveToken } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("owner@smartcafe.ai");
  const [password, setPassword] = useState("Owner@12345");
  const [error, setError] = useState("");

  async function login(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    try {
      const response = await fetch(`${API_URL}/admin/login`, {
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
    }
  }

  return (
    <main className="grid min-h-screen place-items-center px-5">
      <form onSubmit={login} className="admin-card w-full max-w-md space-y-4">
        <p className="text-admin-gold">Protected owner area</p>
        <h1 className="text-4xl font-black">Admin Login</h1>
        <input className="admin-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="admin-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="admin-btn w-full">Login</button>
        {error && <p className="rounded-2xl bg-red-500/10 p-3 text-sm text-red-200">{error}</p>}
      </form>
    </main>
  );
}
