"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/booking", label: "Slot Booking" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
];

function getAdminUrl() {
  if (process.env.NEXT_PUBLIC_ADMIN_URL) return process.env.NEXT_PUBLIC_ADMIN_URL;
  if (typeof window !== "undefined" && window.location.hostname.includes("-3000.app.github.dev")) {
    return `${window.location.protocol}//${window.location.hostname.replace("-3000.", "-3001.")}`;
  }
  return "http://localhost:3001";
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const adminUrl = getAdminUrl();

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#090403]/75 backdrop-blur-2xl">
      <nav className="page-shell flex items-center justify-between py-4">
        <Link href="/" className="group flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-cafe-caramel to-cafe-neon font-black text-cafe-dark shadow-glow transition group-hover:rotate-6">SC</span>
          <span className="text-xl font-black tracking-tight text-white">
            Smart<span className="text-cafe-caramel">Cafe</span> AI
          </span>
        </Link>

        <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.045] p-1 md:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${active ? "bg-cafe-caramel text-cafe-dark" : "text-white/65 hover:bg-white/10 hover:text-white"}`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <a href={adminUrl} className="secondary-btn px-5 py-2 text-sm">
            Owner Login
          </a>
        </div>

        <button onClick={() => setOpen((value) => !value)} className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/5 md:hidden">
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
            <a href={adminUrl} className="primary-btn mt-2 w-full">
              Owner Login
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
