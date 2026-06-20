"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/offers", label: "Offers" },
  { href: "/booking", label: "Reserve" },
  { href: "/gallery", label: "Gallery" },
  { href: "/events", label: "Events" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Visit" }
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#090403]/75 backdrop-blur-2xl">
      <nav className="page-shell flex items-center justify-between py-4">
        <Link href="/" className="group flex items-center gap-3" aria-label="DK's Cafe home">
          <span className="relative grid h-12 w-12 place-items-center overflow-hidden rounded-[1.35rem] border border-white/15 bg-gradient-to-br from-cafe-caramel via-[#ffd28a] to-cafe-neon text-lg font-black text-cafe-dark shadow-glow transition duration-300 group-hover:-rotate-6 group-hover:scale-105">
            <span className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(255,255,255,0.9),transparent_26%)]" />
            <span className="relative tracking-[-0.12em]">DK</span>
          </span>
          <span className="leading-none">
            <span className="block text-xl font-black tracking-tight text-white">DK&apos;s <span className="text-cafe-caramel">Cafe</span></span>
            <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.28em] text-white/38">Jaipur Sip Studio</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.045] p-1 md:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-3 py-2 text-sm font-semibold transition ${active ? "bg-cafe-caramel text-cafe-dark" : "text-white/65 hover:bg-white/10 hover:text-white"}`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <Link href="/track-order" className="hidden rounded-full border border-cafe-caramel/30 bg-cafe-caramel/10 px-5 py-2 text-sm font-black text-cafe-caramel transition hover:bg-cafe-caramel hover:text-cafe-dark md:inline-flex">
          Track Order
        </Link>

        <button onClick={() => setOpen((value) => !value)} className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/5 md:hidden" aria-label="Open menu">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <div className="page-shell pb-4 md:hidden">
          <div className="glass-card grid gap-2 rounded-3xl p-3">
            {links.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="rounded-2xl px-4 py-3 font-semibold text-white/80 hover:bg-white/10">
                {link.label}
              </Link>
            ))}
            <Link href="/track-order" onClick={() => setOpen(false)} className="primary-btn mt-2 w-full">
              Track Order
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
