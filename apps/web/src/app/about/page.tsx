import { CakeSlice, Coffee, Heart, MapPin, Music2, Sparkles } from "lucide-react";

const cards = [
  [Coffee, "Specialty coffee", "Creamy cold coffees, warm brews, frappes and refreshers crafted for everyday cravings."],
  [CakeSlice, "Dessert dates", "Sweet plates, brownie pairings and birthday-friendly table notes for small celebrations."],
  [Music2, "Soft ambience", "Warm lighting, calm playlists and a cozy layout for friends, dates and study breaks."],
  [Heart, "Made for moments", "A place for first meetings, casual catchups, late-evening talks and solo coffee time."],
  [Sparkles, "Gen-Z aesthetic", "Clean visuals, smooth ordering and a modern cafe mood from first click to first sip."],
  [MapPin, "Jaipur, Rajasthan", "Rooted in Jaipur with a local vibe, easy reservations and quick pickup-friendly service."]
] as const;

export default function AboutPage() {
  return (
    <main className="px-5 py-16">
      <section className="page-shell">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="section-label">About DK&apos;s Cafe</p>
            <h1 className="section-heading">Aesthetic coffee, warm corners and Jaipur&apos;s sweetest little escape.</h1>
          </div>
          <p className="text-lg leading-8 text-white/58">DK&apos;s Cafe is designed for real moments: cold coffee after class, date-night desserts, birthday tables, work breaks and chill evening plans with friends.</p>
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
