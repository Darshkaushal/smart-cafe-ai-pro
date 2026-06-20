import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-black/20">
      <div className="page-shell grid gap-8 py-10 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <p className="text-2xl font-black text-white">DK&apos;s <span className="text-cafe-caramel">Cafe</span></p>
          <p className="mt-3 max-w-md text-sm leading-6 text-white/55">An aesthetic cafe in Jaipur, Rajasthan for cold coffees, warm brews, dessert dates, quick orders and cozy table reservations.</p>
          <p className="mt-4 text-sm font-bold text-cafe-caramel">Jaipur, Rajasthan</p>
        </div>
        <div>
          <p className="font-bold text-white">Explore</p>
          <div className="mt-3 grid gap-2 text-sm text-white/55">
            <Link href="/menu" className="hover:text-cafe-caramel">Menu</Link>
            <Link href="/booking" className="hover:text-cafe-caramel">Reserve</Link>
            <Link href="/gallery" className="hover:text-cafe-caramel">Gallery</Link>
            <Link href="/events" className="hover:text-cafe-caramel">Events</Link>
            <Link href="/offers" className="hover:text-cafe-caramel">Offers</Link>
            <Link href="/reviews" className="hover:text-cafe-caramel">Reviews</Link>
            <Link href="/availability" className="hover:text-cafe-caramel">Table Availability</Link>
            <Link href="/track-order" className="hover:text-cafe-caramel">Track Order</Link>
            <Link href="/careers" className="hover:text-cafe-caramel">Careers</Link>
            <Link href="/franchise" className="hover:text-cafe-caramel">Franchise</Link>
            <Link href="/contact" className="hover:text-cafe-caramel">Visit</Link>
          </div>
        </div>
        <div>
          <p className="font-bold text-white">Cafe hours</p>
          <p className="mt-3 text-sm leading-6 text-white/55">Open daily from 10:00 AM to 11:00 PM. Perfect for study breaks, birthdays, date nights and late evening coffee plans.</p>
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-white/35">Owner links are kept private for a cleaner customer experience.</p>
        </div>
      </div>
    </footer>
  );
}
