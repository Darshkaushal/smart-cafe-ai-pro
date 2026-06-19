import { Bot, Database, LayoutDashboard, LineChart, LockKeyhole, Smartphone } from "lucide-react";

const cards = [
  [Smartphone, "Customer Experience", "Responsive Gen-Z design with menu, order, booking, contact, and AI chat."],
  [LayoutDashboard, "Owner Control", "Separate admin dashboard to track orders, bookings, customers, conversations, and demand."],
  [Bot, "AI Drink Assistant", "Gemini-ready recommendations plus fallback menu matching in English and Hindi."],
  [LineChart, "ML Forecasts", "Python model predicts future occupancy and writes forecasts back into MySQL."],
  [Database, "MySQL Storage", "Bookings, orders, customers, contact forms and conversations are persisted securely."],
  [LockKeyhole, "Protected Admin", "Owner dashboard uses JWT authentication and private API endpoints."]
] as const;

export default function AboutPage() {
  return (
    <main className="px-5 py-16">
      <section className="page-shell">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="section-label">About Smart Cafe AI</p>
            <h1 className="section-heading">A modern cafe operating system built for customers and owners.</h1>
          </div>
          <p className="text-lg leading-8 text-white/58">This project is designed like a professional full-stack product: polished UI, secure backend, database persistence, AI recommendations, admin analytics, and demand prediction.</p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {cards.map(([Icon, title, text]) => (
            <div key={title} className="premium-card p-6 transition hover:-translate-y-1">
              <div className="relative">
                <div className="grid h-14 w-14 place-items-center rounded-3xl bg-cafe-caramel/15 text-cafe-caramel"><Icon /></div>
                <h2 className="mt-6 text-2xl font-black text-white">{title}</h2>
                <p className="mt-3 leading-7 text-white/58">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
