"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const mainLinks = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "Offers", href: "/offers" },
  { label: "Gallery", href: "/gallery" },
  { label: "Events", href: "/events" }
];

const moreLinks = [
  { label: "Reviews", href: "/reviews" },
  { label: "Availability", href: "/availability" },
  { label: "Track order", href: "/track-order" },
  { label: "Franchise", href: "/franchise" },
  { label: "Careers", href: "/careers" },
  { label: "Visit", href: "/contact" }
];

export function Navbar() {
  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setMoreOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0d0503]/90 backdrop-blur-2xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-3xl border border-amber-200/50 bg-gradient-to-br from-amber-200 via-amber-400 to-orange-700 text-lg font-black text-black shadow-[0_18px_60px_rgba(245,158,11,0.35)] transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105">
            DK
          </div>
          <div>
            <p className="text-2xl font-black tracking-tight text-white">
              DK&apos;s <span className="text-amber-300">Cafe</span>
            </p>
            <p className="text-[10px] font-bold uppercase tracking-[0.42em] text-amber-400/80">
              Royal Jaipur Sip House
            </p>
          </div>
        </Link>

        <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 p-2 shadow-2xl lg:flex">
          {mainLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-5 py-3 text-sm font-black text-white/90 transition-all duration-300 hover:bg-amber-300 hover:text-black"
            >
              {link.label}
            </Link>
          ))}

          <div ref={moreRef} className="relative">
            <button
              type="button"
              onClick={() => setMoreOpen((value) => !value)}
              className="rounded-full border border-white/40 px-5 py-3 text-sm font-black text-white transition-all duration-300 hover:bg-white hover:text-black"
              aria-expanded={moreOpen}
              aria-haspopup="menu"
            >
              More
            </button>

            {moreOpen && (
              <div
                className="absolute right-0 top-[calc(100%+12px)] w-72 rounded-[2rem] border border-amber-200/20 bg-[#120604]/95 p-3 shadow-[0_30px_90px_rgba(0,0,0,0.65)] backdrop-blur-2xl"
                role="menu"
              >
                <div className="absolute -top-4 right-8 h-4 w-24" />
                {moreLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMoreOpen(false)}
                    className="group flex items-center justify-between rounded-2xl px-5 py-4 text-sm font-black text-white/90 transition-all duration-300 hover:bg-amber-300 hover:text-black"
                    role="menuitem"
                  >
                    <span>{link.label}</span>
                    <span className="text-amber-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-black">
                      ›
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/availability"
            className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-black text-white/80 transition-all duration-300 hover:bg-white hover:text-black"
          >
            Check tables
          </Link>
          <Link
            href="/booking"
            className="rounded-full bg-gradient-to-r from-amber-300 to-orange-400 px-6 py-3 text-sm font-black text-black shadow-[0_16px_45px_rgba(245,158,11,0.35)] transition-all duration-300 hover:scale-105"
          >
            Reserve
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((value) => !value)}
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-black text-white lg:hidden"
        >
          {mobileOpen ? "Close" : "Menu"}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-[#0d0503]/95 px-4 py-5 backdrop-blur-2xl lg:hidden">
          <div className="grid gap-2">
            {[...mainLinks, ...moreLinks].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm font-black text-white transition-all duration-300 hover:bg-amber-300 hover:text-black"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/booking"
              onClick={() => setMobileOpen(false)}
              className="mt-2 rounded-2xl bg-gradient-to-r from-amber-300 to-orange-400 px-5 py-4 text-center text-sm font-black text-black"
            >
              Reserve Table
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
