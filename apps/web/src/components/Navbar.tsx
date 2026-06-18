import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/booking", label: "Slot Booking" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-cafe-dark/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <Link href="/" className="text-xl font-black tracking-tight text-white">
          Smart<span className="text-cafe-caramel">Cafe</span> AI
        </Link>
        <div className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm text-white/70 transition hover:text-cafe-caramel">
              {link.label}
            </Link>
          ))}
        </div>
        <a href="http://localhost:3001" className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white/80 transition hover:bg-white/10">
          Owner Login
        </a>
      </nav>
    </header>
  );
}
