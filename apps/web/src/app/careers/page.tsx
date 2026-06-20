import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, Coffee, HeartHandshake, Sparkles, UsersRound } from "lucide-react";

const roles = [
  { title: "Barista Trainee", type: "Full-time / Internship", text: "Learn beverage prep, counter flow, guest interaction and hygiene standards." },
  { title: "Cafe Host", type: "Part-time", text: "Manage reservations, greet guests, handle birthday/date table notes and seating comfort." },
  { title: "Content & Community Intern", type: "Internship", text: "Create reels, gallery moments, review campaigns and local event collabs." },
  { title: "Kitchen Assistant", type: "Full-time", text: "Support snacks, desserts, prep checklists and quick order packaging." }
];

export default function CareersPage() {
  return (
    <main className="page-shell py-14">
      <section className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div>
          <p className="section-label"><BriefcaseBusiness size={16} /> Careers at DK&apos;s Cafe</p>
          <h1 className="section-heading">Join a cafe team that cares about taste, vibe and guest experience.</h1>
        </div>
        <p className="text-lg leading-8 text-white/58">We value clean work, friendly communication, fast learning and a love for hospitality. Send your profile from the contact page and mention the role you want.</p>
      </section>

      <section className="mt-12 grid gap-5 md:grid-cols-2">
        {roles.map((role) => (
          <article key={role.title} className="premium-card p-6">
            <div className="relative">
              <p className="chip w-fit">{role.type}</p>
              <h2 className="mt-4 text-3xl font-black text-white">{role.title}</h2>
              <p className="mt-3 leading-7 text-white/58">{role.text}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="mt-12 grid gap-5 md:grid-cols-3">
        {[
          { icon: Coffee, title: "Hands-on learning", text: "Real cafe operations, not only theory." },
          { icon: UsersRound, title: "Guest-first culture", text: "Learn how to create repeat customers." },
          { icon: Sparkles, title: "Creative environment", text: "Events, content, menu trials and brand building." }
        ].map((item) => (
          <div key={item.title} className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-6">
            <item.icon className="text-cafe-caramel" />
            <h3 className="mt-4 text-2xl font-black text-white">{item.title}</h3>
            <p className="mt-2 text-white/55">{item.text}</p>
          </div>
        ))}
      </section>

      <div className="mt-12 rounded-[2rem] border border-white/10 bg-cafe-caramel/10 p-6 md:p-8">
        <HeartHandshake className="text-cafe-caramel" />
        <h2 className="mt-4 text-3xl font-black text-white">Apply with a short note</h2>
        <p className="mt-3 text-white/58">Tell us your role, availability, experience and why you want to join DK&apos;s Cafe.</p>
        <Link href="/contact" className="primary-btn mt-6">Apply through contact page <ArrowRight size={16} /></Link>
      </div>
    </main>
  );
}
