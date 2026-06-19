import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Camera,
  CheckCircle2,
  Coffee,
  Heart,
  Image as ImageIcon,
  MapPin,
  Sparkles,
  Star,
  UsersRound
} from "lucide-react";

const heroStats = [
  { value: "18+", label: "signature frames" },
  { value: "4", label: "cafe moods" },
  { value: "Jaipur", label: "warm city vibe" }
];

const moods = [
  {
    icon: Coffee,
    title: "Coffee bar mood",
    text: "Fresh brews, iced cups and counter-side shots with warm caramel lighting."
  },
  {
    icon: Heart,
    title: "Date table glow",
    text: "Soft corners, pretty desserts and calm seating for two-person plans."
  },
  {
    icon: UsersRound,
    title: "Friends table energy",
    text: "Shareable snacks, cold coolers and easy weekend hangout scenes."
  },
  {
    icon: Camera,
    title: "Photo-ready corners",
    text: "Aesthetic backdrops, clean tables and natural frames for reels and stories."
  }
];

const featuredShots = [
  {
    title: "Golden hour coffee counter",
    tag: "Coffee Bar",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1400&q=85"
  },
  {
    title: "Dessert date table",
    tag: "Sweet Plans",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1400&q=85"
  },
  {
    title: "Friends evening table",
    tag: "Hangout",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=85"
  }
];

const gallery = [
  {
    title: "Iced latte moment",
    category: "Drinks",
    text: "Cold, creamy and made for Jaipur afternoons.",
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=1000&q=80"
  },
  {
    title: "Warm table lights",
    category: "Ambience",
    text: "Soft seating and warm tones for long conversations.",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=80"
  },
  {
    title: "Study break setup",
    category: "Work Friendly",
    text: "Peaceful corners for laptop sessions and coffee refills.",
    image: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1000&q=80"
  },
  {
    title: "Celebration table",
    category: "Occasions",
    text: "Small birthday setups with dessert-first energy.",
    image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1000&q=80"
  },
  {
    title: "Signature toast plate",
    category: "Food",
    text: "Crispy, cheesy and perfect with cold coffee.",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=1000&q=80"
  },
  {
    title: "Weekend cafe mood",
    category: "Lifestyle",
    text: "Easy music, cozy tables and relaxed weekend plans.",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1000&q=80"
  },
  {
    title: "Dessert spoon shot",
    category: "Desserts",
    text: "Pretty plates, soft cream and sweet endings.",
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=1000&q=80"
  },
  {
    title: "Cafe window seat",
    category: "Corners",
    text: "A calm frame for solo coffee and city watching.",
    image: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=1000&q=80"
  },
  {
    title: "Mocktail pop",
    category: "Coolers",
    text: "Bright, refreshing and made for hot days.",
    image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=1000&q=80"
  }
];

const storyPoints = [
  "Warm caramel lighting for a premium evening feel",
  "Photo-friendly table styling for reels and stories",
  "Comfort seating for dates, friends and solo coffee time",
  "Jaipur-inspired mood with relaxed modern cafe energy"
];

export default function GalleryPage() {
  return (
    <main className="px-5 py-16">
      <section className="page-shell">
        <div className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-white/[0.045] p-6 shadow-2xl md:p-10 lg:p-12">
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-cafe-caramel/20 blur-3xl" />
          <div className="absolute -bottom-28 left-12 h-72 w-72 rounded-full bg-cafe-neon/10 blur-3xl" />
          <div className="relative grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <p className="section-label"><Sparkles size={16} /> Gallery</p>
              <h1 className="section-heading">A visual taste of DK&apos;s Cafe.</h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/60">
                Explore warm corners, signature drinks, dessert tables and cozy Jaipur cafe moments designed for real conversations, reels, dates and weekend plans.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/booking" className="primary-btn">Book your table <ArrowRight size={18} /></Link>
                <Link href="/menu" className="secondary-btn">Explore menu</Link>
              </div>
              <div className="mt-10 grid grid-cols-3 gap-3">
                {heroStats.map((stat) => (
                  <div key={stat.label} className="rounded-3xl border border-white/10 bg-black/20 p-4">
                    <p className="text-2xl font-black text-white md:text-3xl">{stat.value}</p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/42">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-4">
                <div className="relative h-72 overflow-hidden rounded-[2rem] border border-white/10">
                  <Image src={featuredShots[0].image} alt={featuredShots[0].title} fill className="object-cover" priority />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
                  <p className="absolute bottom-5 left-5 rounded-full bg-white/15 px-4 py-2 text-sm font-bold text-white backdrop-blur">{featuredShots[0].tag}</p>
                </div>
                <div className="rounded-[2rem] border border-white/10 bg-cafe-caramel/15 p-6">
                  <ImageIcon className="text-cafe-caramel" />
                  <p className="mt-4 text-2xl font-black text-white">Designed to feel premium before the first sip.</p>
                </div>
              </div>
              <div className="space-y-4 pt-10">
                {featuredShots.slice(1).map((shot) => (
                  <div key={shot.title} className="relative h-56 overflow-hidden rounded-[2rem] border border-white/10">
                    <Image src={shot.image} alt={shot.title} fill className="object-cover transition duration-700 hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                    <div className="absolute bottom-5 left-5 right-5">
                      <p className="text-xs font-black uppercase tracking-[0.22em] text-cafe-caramel">{shot.tag}</p>
                      <h2 className="mt-1 text-xl font-black text-white">{shot.title}</h2>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {moods.map(({ icon: Icon, title, text }) => (
            <article key={title} className="premium-card p-6 transition duration-300 hover:-translate-y-1">
              <div className="relative">
                <div className="grid h-14 w-14 place-items-center rounded-3xl bg-cafe-caramel/15 text-cafe-caramel"><Icon /></div>
                <h2 className="mt-5 text-xl font-black text-white">{title}</h2>
                <p className="mt-3 text-sm leading-6 text-white/55">{text}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-label"><Camera size={16} /> Cafe frames</p>
            <h2 className="section-heading max-w-3xl">Moments worth saving.</h2>
          </div>
          <p className="max-w-md text-white/55">Every frame is chosen to feel like a real modern cafe: clean, warm, calm and social.</p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {gallery.map((item, index) => (
            <article key={item.title} className={`premium-card group overflow-hidden transition duration-300 hover:-translate-y-2 ${index === 1 || index === 5 ? "lg:row-span-2" : ""}`}>
              <div className={`${index === 1 || index === 5 ? "h-[34rem]" : "h-80"} relative overflow-hidden`}>
                <Image src={item.image} alt={item.title} fill className="object-cover transition duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-cafe-dark via-black/15 to-transparent" />
                <p className="absolute left-5 top-5 rounded-full border border-white/15 bg-black/30 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-white/75 backdrop-blur">{item.category}</p>
              </div>
              <div className="relative p-6">
                <h3 className="text-2xl font-black text-white">{item.title}</h3>
                <p className="mt-3 leading-7 text-white/58">{item.text}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="premium-card p-8 md:p-10">
            <div className="relative">
              <p className="section-label"><MapPin size={16} /> Jaipur, Rajasthan</p>
              <h2 className="mt-5 text-4xl font-black leading-tight text-white">A cozy cafe mood in the heart of Jaipur.</h2>
              <p className="mt-4 leading-7 text-white/58">
                DK&apos;s Cafe is built around simple pleasures: a beautiful cup, a comfortable seat, an easy playlist and a table that feels good to return to.
              </p>
            </div>
          </div>
          <div className="premium-card p-8 md:p-10">
            <div className="relative grid gap-4 sm:grid-cols-2">
              {storyPoints.map((point) => (
                <div key={point} className="flex gap-3 rounded-3xl border border-white/10 bg-black/20 p-4">
                  <CheckCircle2 className="mt-1 shrink-0 text-cafe-caramel" size={20} />
                  <p className="text-sm font-semibold leading-6 text-white/65">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-cafe-caramel/20 via-white/[0.055] to-cafe-neon/10 p-8 text-center md:p-12">
          <Star className="mx-auto text-cafe-caramel" size={34} />
          <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-black leading-tight tracking-tight text-white md:text-5xl">Come for the coffee. Stay for the mood.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/58">Reserve your table, bring your people and make your next cafe plan feel effortless.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/booking" className="primary-btn">Reserve now <ArrowRight size={18} /></Link>
            <Link href="/events" className="secondary-btn">Plan an event</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
