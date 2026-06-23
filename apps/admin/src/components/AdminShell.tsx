"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BarChart3, BotMessageSquare, CalendarCheck, Crown, LayoutDashboard, LogOut, Menu, MessageSquareText, ShoppingBag, Sparkles, UsersRound, X } from "lucide-react";
import { clearToken } from "@/lib/api";
import { useState } from "react";

const links = [
  { href: "/", label: "Overview", icon: LayoutDashboard },
  { href: "/bookings", label: "Bookings", icon: CalendarCheck },
  { href: "/orders", label: "Orders", icon: ShoppingBag },
  { href: "/customers", label: "Customers", icon: UsersRound },
  { href: "/conversations", label: "Conversations", icon: BotMessageSquare },
  { href: "/predictions", label: "Predictions", icon: BarChart3 }
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  function logout() {
    clearToken();
    router.push("/login");
  }

  return (
    <div className="min-h-screen lg:flex">
      <aside className="border-b border-admin-line bg-admin-panel/80 p-4 backdrop-blur-2xl lg:sticky lg:top-0 lg:h-screen lg:w-80 lg:border-b-0 lg:border-r lg:p-5">
        <div className="flex items-center justify-between lg:block">
          <Link href="/" className="flex items-center gap-3">
            <span className="admin-brand-mark grid h-12 w-12 place-items-center rounded-2xl text-admin-dark"><Crown /></span>
            <span>
              <span className="block text-xl font-black">DK&apos;s <span className="text-admin-gold">Cafe</span></span>
              <span className="block text-[10px] font-black uppercase tracking-[0.28em] text-white/35">Owner cockpit</span>
            </span>
          </Link>
          <div className="flex gap-2 lg:hidden">
            <button onClick={() => setOpen((value) => !value)} className="grid h-11 w-11 place-items-center rounded-2xl border border-admin-line bg-white/5 text-white/60">{open ? <X size={18} /> : <Menu size={18} />}</button>
            <button onClick={logout} className="grid h-11 w-11 place-items-center rounded-2xl border border-admin-line bg-white/5 text-white/60"><LogOut size={18} /></button>
          </div>
        </div>

        <div className="mt-6 hidden rounded-3xl border border-admin-line bg-white/[0.035] p-4 lg:block">
          <p className="flex items-center gap-2 text-sm font-black text-admin-gold"><Sparkles size={15} /> Private operations</p>
          <p className="mt-2 text-sm leading-6 text-white/45">Track revenue signals, reservations, customer records, cafe conversations and daily preparation flow from one clean dashboard.</p>
        </div>

        <div className={`${open ? "grid" : "hidden"} mt-6 gap-2 lg:grid`}>
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 font-bold transition ${active ? "bg-admin-gold text-admin-dark shadow-lg" : "text-white/60 hover:bg-white/5 hover:text-white"}`}
              >
                <link.icon size={19} /> {link.label}
              </Link>
            );
          })}
          <div className="mt-3 grid gap-2 rounded-3xl border border-admin-line bg-black/20 p-3">
            <Link href="/orders" onClick={() => setOpen(false)} className="flex items-center gap-2 rounded-2xl bg-white/[0.04] px-4 py-3 text-sm font-black text-white/65 hover:text-white"><ShoppingBag size={16} /> Update order status</Link>
            <Link href="/conversations" onClick={() => setOpen(false)} className="flex items-center gap-2 rounded-2xl bg-white/[0.04] px-4 py-3 text-sm font-black text-white/65 hover:text-white"><MessageSquareText size={16} /> Review chat queries</Link>
          </div>
          <button onClick={logout} className="mt-4 hidden items-center justify-center gap-2 rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 font-bold text-red-100 transition hover:bg-red-500/20 lg:flex">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>
      <main className="relative flex-1 overflow-hidden p-4 md:p-8">
        <div className="admin-ambient-one" />
        <div className="admin-ambient-two" />
        <div className="relative z-10">{children}</div>
      </main>
    </div>
  );
}
