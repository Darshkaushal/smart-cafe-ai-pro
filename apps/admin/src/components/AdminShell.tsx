"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { clearToken } from "@/lib/api";

const links = [
  ["/", "Overview"],
  ["/bookings", "Bookings"],
  ["/orders", "Orders"],
  ["/customers", "Customers"],
  ["/conversations", "Conversations"],
  ["/predictions", "Predictions"]
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
      <aside className="border-r border-admin-line bg-admin-panel p-5 lg:w-72">
        <h1 className="text-2xl font-black">SmartCafe <span className="text-admin-gold">Owner</span></h1>
        <nav className="mt-8 grid gap-2">
          {links.map(([href, label]) => (
            <Link key={href} href={href} className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${pathname === href ? "bg-admin-gold text-admin-dark" : "text-white/65 hover:bg-white/10 hover:text-white"}`}>
              {label}
            </Link>
          ))}
        </nav>
        <button onClick={logout} className="mt-8 w-full rounded-2xl border border-admin-line px-4 py-3 text-sm font-semibold text-white/70 hover:bg-white/10">Logout</button>
      </aside>
      <main className="flex-1 p-5 lg:p-8">{children}</main>
    </div>
  );
}
