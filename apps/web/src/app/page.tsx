import Link from "next/link";
import { ArrowRight, Bot, CalendarCheck, ChartNoAxesCombined, Coffee, ShieldCheck, Sparkles, Star, Timer, Utensils } from "lucide-react";

const features = [
  { icon: CalendarCheck, title: "Smart slot booking", text: "Customers reserve tables instantly and the owner sees every booking in MySQL-powered admin." },
  { icon: Bot, title: "Bilingual Drink AI", text: "Understands mood like cold, sweet, coffee, chocolate and recommends 2–3 best drinks in English + Hindi." },
  { icon: ChartNoAxesCombined, title: "Demand prediction", text: "Forecasts high-demand days so the cafe can prepare stock, seats, and staff before rush hour." },
  { icon: ShieldCheck, title: "Owner control room", text: "JWT protected admin dashboard for bookings, orders, customers, chats, and ML forecasts." }
];

const timeline = ["Choose your drink mood", "AI suggests best menu picks", "Book table or place order", "Owner tracks everything live"];

export default function HomePage() {
  return (
    <main className="overflow-hidden">
      <section className="relative px-5 py-16 md:py-24">
        <div className="absolute left-[-6rem] top-20 h-80 w-80 rounded-full bg-cafe-caramel/20 blur-3xl pulse-soft" />
        <div className="absolute right-[-8rem] top-40 h-96 w-96 rounded-full bg-cafe-neon/10 blur-3xl" />
        <div className="page-shell relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="section-label"><Sparkles size={16} /> Premium Gen-Z cafe experience</p>
            <h1 className="mt-6 max-w-5xl text-5xl font-black leading-[0.9] tracking-[-0.05em] text-white md:text-7xl xl:text-8xl">
              Order, book, chat and predict demand with one smooth cafe platform.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/62">
              A professional full-stack cafe system with polished customer UI, secure MySQL storage, AI drink assistant, separate owner dashboard, and machine learning demand insights.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/menu" className="primary-btn">Explore Menu <ArrowRight size={18} /></Link>
              <Link href="/booking" className="secondary-btn">Reserve Table</Link>
            </div>
            <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3">
              {[["20+", "Cafe actions"], ["2 lang", "English + Hindi"], ["90%", "Forecast ready"]].map(([value, label]) => (
                <div key={label} className="rounded-3xl border border-white/10 bg-white/[0.05] p-4">
                  <p className="text-3xl font-black text-white">{value}</p>
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
                    <p className="text-sm text-white/55">Live customer mood</p>
                    <h2 className="mt-1 text-3xl font-black text-white">Cold + Sweet</h2>
                  </div>
                  <div className="grid h-16 w-16 place-items-center rounded-3xl bg-cafe-caramel text-cafe-dark"><Coffee size={28} /></div>
                </div>
                <div className="mt-8 grid gap-3">
                  {[
                    ["Iced Caramel Cloud", "₹189", "Best match"],
                    ["Berry Blast Frappe", "₹219", "Sweet & creamy"],
                    ["Mango Mint Cooler", "₹169", "Refreshing"]
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
              <p className="text-sm text-white/55">AI Demand Forecast</p>
              <div className="mt-3 flex items-end gap-3">
                <p className="text-6xl font-black text-cafe-neon">90%</p>
                <p className="pb-2 text-sm text-white/60">seats filled this Friday</p>
              </div>
              <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10"><div className="h-full w-[90%] rounded-full bg-gradient-to-r from-cafe-caramel to-cafe-neon" /></div>
              <div className="mt-5 grid gap-2 text-sm text-white/65">
                <p className="rounded-2xl bg-white/[0.06] p-3">Extra staff from 6 PM</p>
                <p className="rounded-2xl bg-white/[0.06] p-3">Prepare cold coffee stock +25%</p>
              </div>
            </div>

            <div className="absolute right-8 top-[470px] hidden rounded-full border border-white/10 bg-white/10 px-5 py-3 text-sm font-bold text-white/75 backdrop-blur-xl md:block">
              <Star className="mr-2 inline text-cafe-caramel" size={16} /> Smooth UI/UX
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell py-10">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.title} className="premium-card group p-6 transition duration-300 hover:-translate-y-2">
              <div className="relative">
                <div className="mb-5 grid h-14 w-14 place-items-center rounded-3xl bg-cafe-caramel/15 text-cafe-caramel transition group-hover:bg-cafe-caramel group-hover:text-cafe-dark">
                  <feature.icon />
                </div>
                <h3 className="text-xl font-black text-white">{feature.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/58">{feature.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="page-shell py-16">
        <div className="grid gap-8 rounded-[2.5rem] border border-white/10 bg-white/[0.045] p-6 md:p-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="section-label">How it works</p>
            <h2 className="section-heading text-4xl md:text-5xl">From customer mood to owner dashboard.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {timeline.map((item, index) => (
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
            { icon: Timer, title: "Fast booking", text: "Less typing, clear time slots, instant confirmation." },
            { icon: Utensils, title: "Premium menu", text: "Visual cards, filters, cart summary, and smooth ordering." },
            { icon: ShieldCheck, title: "Secure owner data", text: "Every action is stored safely and visible only in admin." }
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
