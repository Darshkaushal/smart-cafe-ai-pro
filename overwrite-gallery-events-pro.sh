#!/usr/bin/env bash
set -euo pipefail
mkdir -p apps/web/src/app/gallery apps/web/src/app/events
cat > apps/web/src/app/gallery/page.tsx <<'EOF_GALLERY'
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
EOF_GALLERY
cat > apps/web/src/app/events/page.tsx <<'EOF_EVENTS'
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CakeSlice,
  CalendarDays,
  Clock3,
  Coffee,
  Gift,
  HeartHandshake,
  MapPin,
  MessageCircleHeart,
  Music2,
  PartyPopper,
  Sparkles,
  Star,
  UsersRound
} from "lucide-react";

const eventPackages = [
  {
    icon: CakeSlice,
    title: "Birthday Table",
    price: "From ₹799",
    text: "A cozy table setup for 2–6 guests with dessert suggestions, candle moment and birthday notes.",
    image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1200&q=85",
    includes: ["Reserved corner", "Dessert pairing", "Birthday note", "Photo-friendly setup"]
  },
  {
    icon: HeartHandshake,
    title: "Date Evening",
    price: "From ₹599",
    text: "Soft lights, calm seating and a two-person drink + dessert mood for relaxed coffee dates.",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=85",
    includes: ["Quiet table", "Two drink suggestions", "Dessert add-on", "Warm ambience"]
  },
  {
    icon: UsersRound,
    title: "Friends Hangout",
    price: "From ₹999",
    text: "Group table plan with loaded snacks, coolers and easy ordering for weekend catchups.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85",
    includes: ["4–10 guest seating", "Snack combos", "Cooler picks", "Fast service notes"]
  }
];

const calendar = [
  { day: "Mon - Thu", title: "Calm Work Cafe", time: "11 AM - 4 PM", detail: "Best for study sessions, laptops and peaceful coffee breaks." },
  { day: "Friday", title: "After-Class Catchups", time: "4 PM - 8 PM", detail: "Friends, snacks, iced drinks and relaxed weekend-start energy." },
  { day: "Saturday", title: "Dessert & Date Night", time: "5 PM - 10 PM", detail: "Soft lights, premium desserts and warm table ambience." },
  { day: "Sunday", title: "Family Coffee Hour", time: "12 PM - 5 PM", detail: "Comfort food, coolers and sweet plates for easy Sunday plans." }
];

const process = [
  { icon: CalendarDays, title: "Choose your slot", text: "Pick date, time and number of guests from the booking page." },
  { icon: MessageCircleHeart, title: "Add your vibe", text: "Mention birthday, date, study, friends or any seating preference." },
  { icon: Coffee, title: "Select food mood", text: "Choose drinks, snacks, desserts or ask the cafe assistant for suggestions." },
  { icon: PartyPopper, title: "Arrive & enjoy", text: "We keep it simple so your plan feels smooth, warm and memorable." }
];

const addOns = [
  { icon: Gift, title: "Mini surprise note", text: "A small handwritten-style table note for birthdays or dates." },
  { icon: Music2, title: "Playlist mood", text: "Soft acoustic, chill pop or calm study vibe based on your event." },
  { icon: Star, title: "Dessert pairing", text: "Tiramisu, cheesecake cup or brownie shake pairings for your table." },
  { icon: MapPin, title: "Jaipur local vibe", text: "Warm hospitality with a modern cafe experience in Rajasthan." }
];

const faq = [
  {
    q: "Can I book a birthday table?",
    a: "Yes. Choose your date and add birthday details in booking notes. For small groups, reserve at least a few hours early."
  },
  {
    q: "Do you support small group events?",
    a: "Yes. DK's Cafe is best for small, cozy plans like birthdays, dates, friends meetups and study groups."
  },
  {
    q: "Can I request a quiet table?",
    a: "Yes. Add your request while booking and the team will try to arrange a calm corner based on availability."
  },
  {
    q: "Is the event page connected to booking?",
    a: "Yes. Click Reserve Event Plan and add your event note while booking your slot."
  }
];

export default function EventsPage() {
  return (
    <main className="px-5 py-16">
      <section className="page-shell">
        <div className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-white/[0.045] p-6 md:p-10 lg:p-12">
          <div className="absolute -left-20 -top-24 h-80 w-80 rounded-full bg-cafe-caramel/20 blur-3xl" />
          <div className="absolute -bottom-24 right-10 h-72 w-72 rounded-full bg-cafe-neon/10 blur-3xl" />
          <div className="relative grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-center">
            <div>
              <p className="section-label"><Sparkles size={16} /> Events at DK&apos;s</p>
              <h1 className="section-heading">Small celebrations, cozy plans and cafe moments made premium.</h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/60">
                Plan birthdays, dates, study sessions and friends meetups with warm seating, easy booking and a modern Jaipur cafe mood.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/booking" className="primary-btn">Reserve event plan <ArrowRight size={18} /></Link>
                <Link href="/contact" className="secondary-btn">Ask a question</Link>
              </div>
            </div>
            <div className="premium-card p-5">
              <div className="relative h-[28rem] overflow-hidden rounded-[2rem]">
                <Image src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1400&q=85" alt="DK's Cafe event table" fill className="object-cover" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-cafe-dark via-black/10 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 rounded-[1.5rem] border border-white/10 bg-black/35 p-5 backdrop-blur-xl">
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-cafe-caramel">Most booked</p>
                  <h2 className="mt-2 text-3xl font-black text-white">Birthday Table + Dessert Pairing</h2>
                  <p className="mt-2 text-white/60">Perfect for 2–6 guests with a cozy photo-ready table.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-label"><PartyPopper size={16} /> Event plans</p>
            <h2 className="section-heading max-w-3xl">Pick the mood. We&apos;ll make the table feel right.</h2>
          </div>
          <p className="max-w-md text-white/55">Simple, realistic cafe event options for birthdays, dates and friend circles.</p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {eventPackages.map(({ icon: Icon, title, price, text, image, includes }) => (
            <article key={title} className="premium-card group overflow-hidden transition duration-300 hover:-translate-y-2">
              <div className="relative h-72 overflow-hidden">
                <Image src={image} alt={title} fill className="object-cover transition duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-cafe-dark via-black/10 to-transparent" />
                <div className="absolute left-5 top-5 grid h-14 w-14 place-items-center rounded-3xl bg-black/35 text-cafe-caramel backdrop-blur"><Icon /></div>
              </div>
              <div className="relative p-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-2xl font-black text-white">{title}</h3>
                  <p className="rounded-full bg-cafe-caramel/15 px-4 py-2 text-sm font-black text-cafe-caramel">{price}</p>
                </div>
                <p className="mt-4 leading-7 text-white/58">{text}</p>
                <div className="mt-5 grid gap-3">
                  {includes.map((item) => (
                    <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3 text-sm font-semibold text-white/65">
                      <BadgeCheck size={18} className="text-cafe-caramel" /> {item}
                    </div>
                  ))}
                </div>
                <Link href="/booking" className="primary-btn mt-6 w-full">Reserve this plan <ArrowRight size={18} /></Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="premium-card p-8 md:p-10">
            <div className="relative">
              <p className="section-label"><Clock3 size={16} /> Weekly mood calendar</p>
              <h2 className="mt-5 text-4xl font-black leading-tight text-white">Choose the best time for your plan.</h2>
              <p className="mt-4 leading-7 text-white/58">
                Morning and afternoon are calm. Evenings are warmer and more social. Weekends are best for celebrations.
              </p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {calendar.map((item) => (
              <article key={item.title} className="premium-card p-6">
                <div className="relative">
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-cafe-caramel">{item.day}</p>
                  <h3 className="mt-3 text-2xl font-black text-white">{item.title}</h3>
                  <p className="mt-2 font-bold text-white/70">{item.time}</p>
                  <p className="mt-3 text-sm leading-6 text-white/52">{item.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <p className="section-label"><CalendarDays size={16} /> Simple process</p>
          <h2 className="section-heading max-w-3xl">From idea to table in four easy steps.</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {process.map(({ icon: Icon, title, text }, index) => (
              <article key={title} className="premium-card p-6">
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div className="grid h-14 w-14 place-items-center rounded-3xl bg-cafe-caramel/15 text-cafe-caramel"><Icon /></div>
                    <span className="text-5xl font-black text-white/10">0{index + 1}</span>
                  </div>
                  <h3 className="mt-6 text-xl font-black text-white">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/55">{text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="premium-card p-8 md:p-10">
            <div className="relative">
              <p className="section-label"><Gift size={16} /> Add-ons</p>
              <h2 className="mt-5 text-4xl font-black leading-tight text-white">Small touches that make the plan feel personal.</h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {addOns.map(({ icon: Icon, title, text }) => (
                  <div key={title} className="rounded-3xl border border-white/10 bg-black/20 p-5">
                    <Icon className="text-cafe-caramel" />
                    <h3 className="mt-4 text-lg font-black text-white">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-white/52">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="premium-card overflow-hidden">
            <div className="relative h-full min-h-[34rem]">
              <Image src="https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1200&q=85" alt="Cafe celebration" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-cafe-dark via-black/25 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <p className="rounded-full bg-white/15 px-4 py-2 text-sm font-bold text-white backdrop-blur w-fit">Jaipur cafe celebrations</p>
                <h3 className="mt-4 text-4xl font-black leading-tight text-white">Make it simple, warm and worth remembering.</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-2">
          {faq.map((item) => (
            <article key={item.q} className="premium-card p-6">
              <div className="relative">
                <h3 className="text-xl font-black text-white">{item.q}</h3>
                <p className="mt-3 leading-7 text-white/55">{item.a}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-cafe-caramel/20 via-white/[0.055] to-cafe-neon/10 p-8 text-center md:p-12">
          <h2 className="mx-auto max-w-3xl text-4xl font-black leading-tight tracking-tight text-white md:text-5xl">Ready to plan your DK&apos;s Cafe moment?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/58">Reserve a table, add your occasion in notes and let the cafe team prepare a better experience for you.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/booking" className="primary-btn">Book event table <ArrowRight size={18} /></Link>
            <Link href="/gallery" className="secondary-btn">See gallery</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
EOF_EVENTS
echo "Gallery and Events pages upgraded successfully."
