import Link from "next/link";
import { ArrowRight, BadgePercent, CakeSlice, Coffee, HeartHandshake, MapPin, Sparkles, Utensils } from "lucide-react";

export function Ambient3DBackground() {
  return (
    <div className="ambient-3d-bg" aria-hidden="true">
      <span className="ambient-orb ambient-orb-one" />
      <span className="ambient-orb ambient-orb-two" />
      <span className="ambient-orb ambient-orb-three" />
      <span className="floating-bean bean-one" />
      <span className="floating-bean bean-two" />
      <span className="floating-bean bean-three" />
      <span className="floating-cube cube-one" />
      <span className="floating-cube cube-two" />
    </div>
  );
}

export function ThreeDFeatureStrip() {
  const items = [
    { icon: Coffee, title: "3D coffee mood", text: "Layered motion, warm light and premium glass cards make every section feel alive." },
    { icon: CakeSlice, title: "Event-ready vibe", text: "Birthday, date and friends packages now feel more visual and presentation-ready." },
    { icon: BadgePercent, title: "Offers that pop", text: "Modern offer cards, soft lift effects and smooth hover animations for better attention." },
    { icon: MapPin, title: "Jaipur identity", text: "Location, vibe and local cafe story are highlighted with polished visual sections." }
  ];

  return (
    <section className="page-shell py-14">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="section-label"><Sparkles size={16} /> Smooth visual experience</p>
          <h2 className="section-heading text-4xl md:text-5xl">A richer 3D cafe feel without making the website heavy.</h2>
        </div>
        <Link href="/gallery" className="secondary-btn">View gallery <ArrowRight size={16} /></Link>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {items.map((item, index) => (
          <article key={item.title} className="tilt-3d-card group min-h-[250px] p-6" style={{ animationDelay: `${index * 0.12}s` }}>
            <div className="card-depth relative z-10">
              <div className="mb-5 grid h-14 w-14 place-items-center rounded-3xl bg-cafe-caramel/15 text-cafe-caramel transition duration-300 group-hover:bg-cafe-caramel group-hover:text-cafe-dark">
                <item.icon />
              </div>
              <h3 className="text-2xl font-black text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/58">{item.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function FloatingProductShowcase() {
  const products = [
    { name: "Lotus Biscoff Shake", price: "₹249", mood: "Sweet + creamy", color: "from-[#f7c26b] to-[#8a4b1f]" },
    { name: "Orange Espresso Tonic", price: "₹229", mood: "Fresh + bold", color: "from-[#ffb45c] to-[#2f170b]" },
    { name: "Rose Pistachio Frappe", price: "₹259", mood: "Premium + floral", color: "from-[#f5a8c8] to-[#5c2d39]" }
  ];

  return (
    <section className="page-shell py-14">
      <div className="showcase-3d-wrap rounded-[2.8rem] border border-white/10 bg-white/[0.045] p-6 md:p-10">
        <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="section-label"><Utensils size={16} /> Signature picks</p>
            <h2 className="section-heading text-4xl md:text-5xl">Floating menu cards that feel premium and startup-ready.</h2>
            <p className="mt-5 max-w-xl leading-7 text-white/55">
              These smooth 3D-style cards make the menu feel more interactive while staying clean, fast and mobile-friendly.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/menu" className="primary-btn">Order from menu <ArrowRight size={16} /></Link>
              <Link href="/offers" className="secondary-btn">See offers</Link>
            </div>
          </div>
          <div className="relative min-h-[360px] perspective-[1200px]">
            <div className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cafe-caramel/20 blur-3xl" />
            {products.map((item, index) => (
              <div key={item.name} className={`floating-product-card product-card-${index + 1} bg-gradient-to-br ${item.color}`}>
                <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_25%_20%,rgba(255,255,255,0.45),transparent_28%)]" />
                <div className="relative z-10">
                  <p className="text-xs font-black uppercase tracking-[0.25em] text-white/75">{item.mood}</p>
                  <h3 className="mt-4 text-3xl font-black leading-tight text-white">{item.name}</h3>
                  <p className="mt-5 inline-flex rounded-full bg-black/25 px-4 py-2 font-black text-white">{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function SmoothCTA3D() {
  return (
    <section className="page-shell py-14">
      <div className="relative overflow-hidden rounded-[2.8rem] border border-white/10 bg-gradient-to-br from-cafe-caramel/18 via-white/[0.045] to-cafe-neon/10 p-8 md:p-12">
        <div className="absolute -right-16 -top-16 h-52 w-52 rounded-[3rem] border border-white/10 bg-white/[0.08] rotate-3d-box" />
        <div className="absolute -bottom-20 left-1/2 h-64 w-64 rounded-full bg-cafe-caramel/15 blur-3xl" />
        <div className="relative z-10 max-w-3xl">
          <p className="section-label"><HeartHandshake size={16} /> Premium guest journey</p>
          <h2 className="section-heading text-4xl md:text-6xl">Smooth animations, clear actions and a cafe vibe that feels real.</h2>
          <p className="mt-5 text-white/62 leading-7">The website now uses subtle depth, floating cards, better hover motion and soft page ambience to attract customers without slowing down the experience.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/booking" className="primary-btn">Reserve a table <ArrowRight size={16} /></Link>
            <Link href="/events" className="secondary-btn">Plan an event</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
