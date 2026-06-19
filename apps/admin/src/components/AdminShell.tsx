"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BarChart3, BotMessageSquare, CalendarCheck, LayoutDashboard, LogOut, ShoppingBag, Sparkles, UsersRound } from "lucide-react";
import { clearToken } from "@/lib/api";

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

  function logout() {
    clearToken();
    router.push("/login");
  }

  return (
    <div className="min-h-screen lg:flex">
      <aside className="border-b border-admin-line bg-admin-panel/70 p-4 backdrop-blur-xl lg:sticky lg:top-0 lg:h-screen lg:w-80 lg:border-b-0 lg:border-r lg:p-5">
        <div className="flex items-center justify-between lg:block">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-admin-gold text-admin-dark"><Sparkles /></span>
            <span className="text-xl font-black">SmartCafe <span className="text-admin-gold">Owner</span></span>
          </Link>
          <button onClick={logout} className="grid h-11 w-11 place-items-center rounded-2xl border border-admin-line bg-white/5 text-white/60 lg:hidden"><LogOut size={18} /></button>
        </div>

        <div className="mt-6 hidden rounded-3xl border border-admin-line bg-white/[0.035] p-4 lg:block">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/35">Control center</p>
          <p className="mt-2 text-sm leading-6 text-white/55">Track bookings, orders, customer data, AI conversations and ML predictions from one dashboard.</p>
        </div>

        <nav className="mt-5 flex gap-2 overflow-x-auto pb-1 lg:grid lg:gap-2 lg:overflow-visible lg:pb-0">
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link key={href} href={href} className={`flex min-w-fit items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition ${active ? "bg-admin-gold text-admin-dark" : "text-white/60 hover:bg-white/10 hover:text-white"}`}>
                <Icon size={18} /> {label}
              </Link>
            );
          })}
        </nav>

        <button onClick={logout} className="mt-8 hidden w-full items-center justify-center gap-2 rounded-2xl border border-admin-line px-4 py-3 text-sm font-bold text-white/65 transition hover:bg-white/10 lg:flex"><LogOut size={18} /> Logout</button>
      </aside>
      <main className="flex-1 p-5 lg:p-8">{children}</main>
    </div>
  );
}
