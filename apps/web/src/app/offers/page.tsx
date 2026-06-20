import Link from "next/link";
import { ArrowRight, BadgePercent, CakeSlice, Coffee, Sparkles, UsersRound } from "lucide-react";
import { CafeMotionScene } from "@/components/CafeMotionScene";

const offers = [
  { icon: Coffee, title: "Cold Coffee Duo", price: "₹329", text: "Any two cold coffee signatures for evening plans and casual dates.", tag: "Most picked" },
  { icon: CakeSlice, title: "Birthday Mini Table", price: "₹899", text: "Reserved cozy table, dessert plate, candle moment and team note.", tag: "Events" },
  { icon: UsersRound, title: "Friends Snack Combo", price: "₹749", text: "Loaded nachos, garlic toast, iced tea jar and four mini brownie bites.", tag: "Group" },
  { icon: Sparkles, title: "Study Break Saver", price: "₹249", text: "One hot brew or iced tea with a comfort snack during calm afternoon hours.", tag: "Weekdays" }
];

export default function OffersPage() {
  return (
    <main className="page-shell py-14">
      <section className="grid items-center gap-10 lg:grid-cols-[1fr_0.85fr]">
        <div>
          <p className="section-label"><BadgePercent size={16} /> Fresh cafe offers</p>
          <h1 className="section-heading">Offers made for coffee dates, birthdays and everyday cravings.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/58">Pick a combo, reserve your table and enjoy a smooth DK&apos;s Cafe experience in Jaipur. Offers can change by season and availability.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/menu" className="primary-btn">Order from menu <ArrowRight size={16} /></Link>
            <Link href="/booking" className="secondary-btn">Reserve for offer</Link>
          </div>
        </div>
        <CafeMotionScene compact />
      </section>

      <section className="mt-14 grid gap-6 md:grid-cols-2">
        {offers.map((offer) => (
          <article key={offer.title} className="premium-card p-6 transition duration-300 hover:-translate-y-2">
            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div className="grid h-16 w-16 place-items-center rounded-[1.4rem] bg-cafe-caramel/15 text-cafe-caramel"><offer.icon size={28} /></div>
              <div className="flex-1">
                <p className="chip w-fit">{offer.tag}</p>
                <h2 className="mt-3 text-3xl font-black text-white">{offer.title}</h2>
                <p className="mt-3 leading-7 text-white/58">{offer.text}</p>
              </div>
              <p className="rounded-full bg-cafe-caramel px-5 py-3 text-2xl font-black text-cafe-dark">{offer.price}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="mt-16 rounded-[2.5rem] border border-white/10 bg-white/[0.055] p-8 md:p-10">
        <p className="section-label">How to redeem</p>
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {["Choose offer", "Reserve table", "Mention offer in notes", "Pay at cafe"].map((step, index) => (
            <div key={step} className="rounded-3xl border border-white/10 bg-black/20 p-5">
              <p className="text-sm font-black text-cafe-caramel">0{index + 1}</p>
              <p className="mt-2 text-xl font-black text-white">{step}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
