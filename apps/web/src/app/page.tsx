import Link from "next/link";
import { ArrowRight, CakeSlice, CalendarCheck, Coffee, Crown, Heart, MapPin, Music2, Sparkles, Star, Timer, Utensils } from "lucide-react";
import { CafeMotionScene } from "@/components/CafeMotionScene";
import { FloatingProductShowcase, SmoothCTA3D, ThreeDFeatureStrip } from "@/components/Visual3DSections";

const experiences = [
  { icon: Crown, title: "Royal cafe mood", text: "Golden lights, premium corners and a visual experience that feels like a boutique Jaipur cafe brand." },
  { icon: Coffee, title: "Signature sips", text: "Cold coffee clouds, berry frappes, hot brews, coolers and dessert-style drinks made for every mood." },
  { icon: CakeSlice, title: "Moments ready", text: "Birthday tables, date corners, friends hangouts and mini celebrations with smooth reservation flow." },
  { icon: MapPin, title: "Jaipur, Rajasthan", text: "A stylish cafe stop with dine-in, quick pickup, table availability and customer-friendly ordering." }
];

const flow = ["Feel the 3D vibe", "Choose a signature", "Reserve your table", "Track your order"];

const reviews = [
  ["The homepage itself feels premium. The rotating coffee scene and golden vibe look like a real cafe brand.", "Aarav S.", "Birthday table"],
  ["Menu, booking and chatbot felt smooth on mobile. Very clean and modern experience.", "Megha R.", "Coffee date"],
  ["The cafe assistant suggested a proper combo under my budget. Loved the Jaipur vibe.", "Kabir J.", "Study session"]
];

export default function HomePage() {
  return (
    <main className="overflow-hidden">
      <section className="relative px-5 py-14 md:py-24">
        <div className="absolute left-[-7rem] top-20 h-96 w-96 rounded-full bg-cafe-caramel/24 blur-3xl pulse-soft" />
        <div className="absolute right-[-10rem] top-36 h-[30rem] w-[30rem] rounded-full bg-[#c98f4e]/16 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cafe-caramel/45 to-transparent" />
        <div className="page-shell relative grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
          <div>
            <p className="section-label"><Sparkles size={16} /> Jaipur&apos;s royal aesthetic sip house</p>
            <h1 className="mt-6 max-w-5xl text-5xl font-black leading-[0.88] tracking-[-0.06em] text-white md:text-7xl xl:text-8xl">
              A cafe experience that feels cinematic before the first sip.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/64">
              Welcome to DK&apos;s Cafe — a royal Gen-Z cafe in Jaipur with signature drinks, cozy event tables, smooth ordering, table availability and a personal cafe companion for every craving.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/menu" className="primary-btn">Explore Menu <ArrowRight size={18} /></Link>
              <Link href="/booking" className="secondary-btn"><CalendarCheck size={18} /> Reserve Table</Link>
              <Link href="/availability" className="secondary-btn">Check Availability</Link>
            </div>
            <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3">
              {[["Jaipur", "Rajasthan"], ["10 AM", "Daily opening"], ["4.8/5", "Guest vibe"]].map(([value, label]) => (
                <div key={label} className="royal-stat-card rounded-3xl border border-white/10 bg-white/[0.05] p-4">
                  <p className="text-2xl font-black text-white md:text-3xl">{value}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-white/45">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <CafeMotionScene />
        </div>
      </section>

      <section className="page-shell py-6">
        <div className="royal-showstopper rounded-[2.8rem] border border-cafe-caramel/18 p-6 md:p-9">
          <div className="grid items-center gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="section-label"><Crown size={16} /> Royal visual layer</p>
              <h2 className="section-heading text-4xl md:text-5xl">3D motion, soft glow and premium depth made to impress customers instantly.</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {["Rotating coffee hero", "Floating menu cards", "Mobile-smooth motion"].map((item, index) => (
                <div key={item} className="rounded-[2rem] border border-white/10 bg-black/25 p-5 backdrop-blur-xl">
                  <p className="text-sm font-black text-cafe-caramel">0{index + 1}</p>
                  <p className="mt-3 text-xl font-black text-white">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ThreeDFeatureStrip />
      <FloatingProductShowcase />

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
            <p className="section-label">Cafe story</p>
            <h2 className="section-heading text-4xl md:text-5xl">Built for the Jaipur crowd that loves taste, comfort and camera-ready corners.</h2>
            <p className="mt-5 leading-7 text-white/55">DK&apos;s Cafe blends premium drinks, cozy seating, quick pickup and small-event hospitality. The public website feels like a real cafe brand, while the private owner side quietly supports operations.</p>
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
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="section-label">Loved by guests</p>
            <h2 className="section-heading text-4xl md:text-5xl">Real cafe moments, smooth service and repeat-worthy taste.</h2>
          </div>
          <Link href="/reviews" className="secondary-btn">Read reviews <ArrowRight size={16} /></Link>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {reviews.map(([quote, name, tag]) => (
            <article key={name} className="premium-card p-6">
              <div className="relative">
                <div className="mb-4 flex text-cafe-caramel">{[1,2,3,4,5].map((s) => <Star key={s} size={16} fill="currentColor" />)}</div>
                <p className="leading-7 text-white/68">“{quote}”</p>
                <p className="mt-5 font-black text-white">{name}</p>
                <p className="text-sm text-cafe-caramel">{tag}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <SmoothCTA3D />

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
