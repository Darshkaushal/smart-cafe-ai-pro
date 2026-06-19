import Link from "next/link";
import { ArrowRight, CakeSlice, Coffee, Heart, MapPin, Music2, Sparkles, Star, Timer, Utensils } from "lucide-react";

const experiences = [
  { icon: Coffee, title: "Signature sips", text: "Cold coffee clouds, berry frappes, hot brews, coolers and dessert-style drinks made for every mood." },
  { icon: CakeSlice, title: "Birthday ready", text: "Cozy corners, sweet plates and table notes for birthdays, dates, hangouts and mini celebrations." },
  { icon: Music2, title: "Soft vibe evenings", text: "Warm lights, curated playlists and a calm Gen-Z ambience for long conversations." },
  { icon: MapPin, title: "Jaipur heart", text: "A fresh cafe stop in Jaipur, Rajasthan with dine-in, quick pickup and pre-booked tables." }
];

const flow = ["Pick your mood", "Choose a signature item", "Reserve your table", "Enjoy the Jaipur cafe vibe"];

export default function HomePage() {
  return (
    <main className="overflow-hidden">
      <section className="relative px-5 py-16 md:py-24">
        <div className="absolute left-[-6rem] top-20 h-80 w-80 rounded-full bg-cafe-caramel/20 blur-3xl pulse-soft" />
        <div className="absolute right-[-8rem] top-40 h-96 w-96 rounded-full bg-cafe-neon/10 blur-3xl" />
        <div className="page-shell relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="section-label"><Sparkles size={16} /> Jaipur&apos;s aesthetic sip spot</p>
            <h1 className="mt-6 max-w-5xl text-5xl font-black leading-[0.9] tracking-[-0.055em] text-white md:text-7xl xl:text-8xl">
              Where coffee dates, study breaks and sweet cravings feel cinematic.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/62">
              Welcome to DK&apos;s Cafe — a warm, Gen-Z cafe in Jaipur, Rajasthan with signature cold coffees, creamy frappes, cozy tables and smooth online reservations.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/menu" className="primary-btn">Explore Menu <ArrowRight size={18} /></Link>
              <Link href="/booking" className="secondary-btn">Reserve Table</Link>
            </div>
            <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3">
              {[["Jaipur", "Rajasthan"], ["10 AM", "Daily opening"], ["2 min", "Easy booking"]].map(([value, label]) => (
                <div key={label} className="rounded-3xl border border-white/10 bg-white/[0.05] p-4">
                  <p className="text-2xl font-black text-white md:text-3xl">{value}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-white/45">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[560px]">
            <div className="premium-card float-slow absolute right-0 top-0 w-full max-w-[520px] p-5">
              <div className="rounded-[1.7rem] bg-gradient-to-br from-cafe-caramel/35 via-white/5 to-cafe-neon/10 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/55">Today&apos;s mood</p>
                    <h2 className="mt-1 text-3xl font-black text-white">Cold + Sweet</h2>
                  </div>
                  <div className="grid h-16 w-16 place-items-center rounded-3xl bg-cafe-caramel text-cafe-dark"><Coffee size={28} /></div>
                </div>
                <div className="mt-8 grid gap-3">
                  {[
                    ["Iced Caramel Cloud", "₹189", "Creamy best-seller"],
                    ["Berry Blast Frappe", "₹219", "Sweet & chilled"],
                    ["Mango Mint Cooler", "₹169", "Fresh Jaipur summer vibe"]
                  ].map(([name, price, tag]) => (
                    <div key={name} className="flex items-center justify-between rounded-3xl border border-white/10 bg-black/25 p-4">
                      <div>
                        <p className="font-black text-white">{name}</p>
                        <p className="text-xs text-white/45">{tag}</p>
                      </div>
                      <p className="rounded-full bg-white/10 px-3 py-1 font-bold text-cafe-caramel">{price}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="premium-card absolute bottom-8 left-0 w-[82%] max-w-sm p-5">
              <p className="text-sm text-white/55">Weekend table vibe</p>
              <div className="mt-3 flex items-end gap-3">
                <p className="text-6xl font-black text-cafe-neon">Fri</p>
                <p className="pb-2 text-sm text-white/60">is perfect for cold coffee dates</p>
              </div>
              <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10"><div className="h-full w-[86%] rounded-full bg-gradient-to-r from-cafe-caramel to-cafe-neon" /></div>
              <div className="mt-5 grid gap-2 text-sm text-white/65">
                <p className="rounded-2xl bg-white/[0.06] p-3">Best time: 5 PM - 8 PM</p>
                <p className="rounded-2xl bg-white/[0.06] p-3">Recommended: Caramel Cloud + Brownie</p>
              </div>
            </div>

            <div className="absolute right-8 top-[470px] hidden rounded-full border border-white/10 bg-white/10 px-5 py-3 text-sm font-bold text-white/75 backdrop-blur-xl md:block">
              <Star className="mr-2 inline text-cafe-caramel" size={16} /> Soft lights. Warm cups.
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell py-10">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {experiences.map((item) => (
            <div key={item.title} className="premium-card group p-6 transition duration-300 hover:-translate-y-2">
              <div className="relative">
                <div className="mb-5 grid h-14 w-14 place-items-center rounded-3xl bg-cafe-caramel/15 text-cafe-caramel transition group-hover:bg-cafe-caramel group-hover:text-cafe-dark">
                  <item.icon />
                </div>
                <h3 className="text-xl font-black text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/58">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="page-shell py-16">
        <div className="grid gap-8 rounded-[2.5rem] border border-white/10 bg-white/[0.045] p-6 md:p-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="section-label">Simple and smooth</p>
            <h2 className="section-heading text-4xl md:text-5xl">From craving to cafe table in a few taps.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {flow.map((item, index) => (
              <div key={item} className="rounded-3xl border border-white/10 bg-black/20 p-5">
                <p className="text-sm font-black text-cafe-caramel">0{index + 1}</p>
                <p className="mt-3 text-xl font-black text-white">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell py-16">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { icon: Timer, title: "Quick reserve", text: "Choose date, time and guest count without calls or confusion." },
            { icon: Utensils, title: "Crave-worthy menu", text: "Search drinks, desserts and comfort bites with a clean cart flow." },
            { icon: Heart, title: "Made for moments", text: "Birthday notes, cozy corners and date-friendly ambience in one place." }
          ].map((item) => (
            <div key={item.title} className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.03] p-6">
              <item.icon className="text-cafe-caramel" />
              <h3 className="mt-5 text-2xl font-black text-white">{item.title}</h3>
              <p className="mt-3 text-white/55">{item.text}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
