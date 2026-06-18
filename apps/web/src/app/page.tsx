import Link from "next/link";
import { ArrowRight, Bot, CalendarCheck, ChartNoAxesCombined, ShieldCheck } from "lucide-react";

const features = [
  { icon: CalendarCheck, title: "Slot Booking", text: "Customers reserve cafe tables and every booking is stored in MySQL." },
  { icon: Bot, title: "AI Drink Chatbot", text: "Suggests 2–3 best drinks from the real menu in English and Hindi." },
  { icon: ChartNoAxesCombined, title: "ML Demand Predictor", text: "Forecasts future seat occupancy so the owner can prepare stock and staff." },
  { icon: ShieldCheck, title: "Secure Admin Panel", text: "JWT protected owner dashboard for orders, customers, chats, and predictions." }
];

export default function HomePage() {
  return (
    <main>
      <section className="relative overflow-hidden px-5 py-20 md:py-28">
        <div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-cafe-caramel/20 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="mb-5 inline-flex rounded-full border border-cafe-caramel/40 bg-cafe-caramel/10 px-4 py-2 text-sm font-semibold text-cafe-caramel">
              Gen-Z ready smart cafe platform
            </p>
            <h1 className="text-5xl font-black leading-tight text-white md:text-7xl">
              Cafe website that books, sells, chats and predicts demand.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/65">
              Smart Cafe AI gives customers a beautiful experience and gives the owner a powerful admin panel with all bookings, orders, customers, chat history and ML predictions.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/booking" className="primary-btn">Book a Slot <ArrowRight className="ml-2" size={18} /></Link>
              <Link href="/menu" className="secondary-btn">Explore Menu</Link>
            </div>
          </div>
          <div className="glass-card rounded-[2.5rem] p-6">
            <div className="rounded-[2rem] bg-gradient-to-br from-cafe-caramel/30 to-white/5 p-6">
              <p className="text-sm text-white/60">AI Demand Forecast</p>
              <h2 className="mt-2 text-5xl font-black text-white">90%</h2>
              <p className="mt-2 text-white/70">Seats predicted to be filled this Friday.</p>
              <div className="mt-8 grid gap-3">
                {['Cold coffee stock +25%', 'Extra staff from 6 PM', 'Prepare brownie shake combo'].map((item) => (
                  <div key={item} className="rounded-2xl bg-cafe-dark/60 p-4 text-white/80">{item}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-16">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.title} className="glass-card rounded-[2rem] p-6">
              <feature.icon className="mb-5 text-cafe-caramel" />
              <h3 className="text-xl font-black text-white">{feature.title}</h3>
              <p className="mt-3 text-sm text-white/60">{feature.text}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
