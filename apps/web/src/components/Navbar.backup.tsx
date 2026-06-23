"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarCheck, ChevronRight, Coffee, Menu, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";

const primaryLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/offers", label: "Offers" },
  { href: "/gallery", label: "Gallery" },
  { href: "/events", label: "Events" }
];

const moreLinks = [
  { href: "/reviews", label: "Reviews" },
  { href: "/availability", label: "Availability" },
  { href: "/track-order", label: "Track order" },
  { href: "/franchise", label: "Franchise" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Visit" }
];

function NavLink({ href, label, onClick }: { href: string; label: string; onClick?: () => void }) {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-black transition duration-300 ${active ? "bg-cafe-caramel text-cafe-dark shadow-glow" : "text-white/67 hover:bg-white/10 hover:text-white"}`}
    >
      {label}
    </Link>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 border-b transition duration-500 ${scrolled ? "border-cafe-caramel/20 bg-[#070201]/88 shadow-[0_16px_80px_rgba(0,0,0,0.42)] backdrop-blur-2xl" : "border-white/8 bg-[#070201]/60 backdrop-blur-xl"}`}>
      <nav className="page-shell flex items-center justify-between py-3 lg:py-4">
        <Link href="/" className="group flex items-center gap-3" aria-label="DK's Cafe home">
          <span className="brand-mark-royal relative grid h-12 w-12 place-items-center rounded-[1.35rem] text-lg font-black text-cafe-dark transition duration-500 group-hover:-rotate-6 group-hover:scale-105 md:h-14 md:w-14">
            <span className="relative tracking-[-0.12em]">DK</span>
          </span>
          <span className="leading-none">
            <span className="block text-xl font-black tracking-tight text-white md:text-2xl">DK&apos;s <span className="text-cafe-caramel">Cafe</span></span>
            <span className="mt-1 hidden text-[10px] font-black uppercase tracking-[0.32em] text-cafe-caramel/70 sm:block">Royal Jaipur Sip House</span>
          </span>
        </Link>

        <div className="hidden items-center rounded-full border border-white/10 bg-white/[0.045] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl lg:flex">
          {primaryLinks.map((link) => <NavLink key={link.href} {...link} />)}
          <div className="group relative">
            <button className="rounded-full px-4 py-2 text-sm font-black text-white/67 transition hover:bg-white/10 hover:text-white">More</button>
            <div className="invisible absolute right-0 top-12 w-64 translate-y-2 rounded-[1.7rem] border border-white/10 bg-[#100604]/95 p-3 opacity-0 shadow-[0_30px_90px_rgba(0,0,0,0.55)] backdrop-blur-2xl transition duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              {moreLinks.map((link) => (
                <Link key={link.href} href={link.href} className="flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-bold text-white/68 transition hover:bg-white/10 hover:text-white">
                  {link.label}<ChevronRight size={15} className="text-cafe-caramel/70" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/availability" className="rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-sm font-black text-white/65 transition hover:border-cafe-caramel/40 hover:text-white">Check tables</Link>
          <Link href="/booking" className="primary-btn !px-5 !py-2.5"><CalendarCheck size={17} /> Reserve</Link>
        </div>

        <button onClick={() => setOpen((value) => !value)} className="relative grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/5 text-white shadow-lg lg:hidden" aria-label="Open menu">
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </nav>

      {open && (
        <div className="page-shell pb-5 lg:hidden">
          <div className="royal-mobile-menu grid gap-2 rounded-[2rem] border border-white/10 bg-[#100604]/96 p-3 shadow-[0_30px_90px_rgba(0,0,0,0.55)] backdrop-blur-2xl">
            <div className="mb-2 flex items-center gap-3 rounded-3xl bg-white/[0.055] p-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-cafe-caramel text-cafe-dark"><Coffee size={20} /></span>
              <div>
                <p className="font-black text-white">Choose your vibe</p>
                <p className="text-xs text-white/45">Menu, tables, events and reviews</p>
              </div>
            </div>
            {[...primaryLinks, ...moreLinks].map((link) => <NavLink key={link.href} {...link} onClick={() => setOpen(false)} />)}
            <Link href="/booking" onClick={() => setOpen(false)} className="primary-btn mt-2 w-full"><Sparkles size={17} /> Reserve a royal table</Link>
          </div>
        </div>
      )}
    </header>
  );
}
