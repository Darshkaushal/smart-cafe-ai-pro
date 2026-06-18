"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api";

export function StatusSelect({ id, value, type }: { id: string; value: string; type: "bookings" | "orders" }) {
  const [status, setStatus] = useState(value);
  const options = type === "bookings"
    ? ["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"]
    : ["PENDING", "PREPARING", "READY", "COMPLETED", "CANCELLED"];

  async function update(next: string) {
    setStatus(next);
    await apiFetch(`/admin/${type}/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status: next })
    });
  }

  return (
    <select className="rounded-xl border border-admin-line bg-white/5 px-3 py-2 text-sm" value={status} onChange={(e) => update(e.target.value)}>
      {options.map((option) => <option key={option} value={option}>{option}</option>)}
    </select>
  );
}
