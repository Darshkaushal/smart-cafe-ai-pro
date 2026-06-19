"use client";

import { useEffect, useState } from "react";
import { AdminShell } from "@/components/AdminShell";
import { AuthGuard } from "@/components/AuthGuard";
import { apiFetch } from "@/lib/api";

type Prediction = { id: string; targetDate: string; expectedOccupancy: number; expectedBookings: number; confidence: number; modelVersion: string; notes: string };

export default function PredictionsPage() {
  const [items, setItems] = useState<Prediction[]>([]);
  useEffect(() => { apiFetch<Prediction[]>("/admin/predictions").then(setItems).catch(console.error); }, []);
  return (
    <AuthGuard><AdminShell>
      <h1 className="mb-6 text-4xl font-black">Demand Planning Notes</h1>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((p) => <div key={p.id} className="admin-card"><p className="text-white/50">{new Date(p.targetDate).toDateString()}</p><p className="mt-2 text-5xl font-black text-admin-green">{p.expectedOccupancy}%</p><p className="mt-2 text-white/70">{p.expectedBookings} bookings expected</p><p className="mt-3 text-sm text-white/45">Confidence: {(p.confidence * 100).toFixed(0)}% • {p.modelVersion}</p><p className="mt-3 text-sm text-white/60">{p.notes}</p></div>)}
        {!items.length && <p className="text-white/60">No demand notes yet. Run `python apps/ml/train_predict.py`.</p>}
      </div>
    </AdminShell></AuthGuard>
  );
}
