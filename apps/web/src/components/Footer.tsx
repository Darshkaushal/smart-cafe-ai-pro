import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-black/20">
      <div className="page-shell grid gap-8 py-10 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <p className="text-2xl font-black text-white">Smart<span className="text-cafe-caramel">Cafe</span> AI</p>
          <p className="mt-3 max-w-md text-sm leading-6 text-white/55">A premium cafe experience with online orders, slot booking, AI drink recommendations, owner dashboard, and ML demand forecasting.</p>
        </div>
        <div>
          <p className="font-bold text-white">Explore</p>
          <div className="mt-3 grid gap-2 text-sm text-white/55">
            <Link href="/menu" className="hover:text-cafe-caramel">Menu</Link>
            <Link href="/booking" className="hover:text-cafe-caramel">Slot Booking</Link>
            <Link href="/contact" className="hover:text-cafe-caramel">Contact</Link>
          </div>
        </div>
        <div>
          <p className="font-bold text-white">Owner features</p>
          <p className="mt-3 text-sm leading-6 text-white/55">Bookings, orders, customers, conversations, and predictions are stored in MySQL and visible inside the admin panel.</p>
        </div>
      </div>
    </footer>
  );
}
