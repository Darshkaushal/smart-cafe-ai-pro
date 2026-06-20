import Link from "next/link";
import { ArrowRight, Building2, CheckCircle2, Coffee, MapPin, Store, UsersRound } from "lucide-react";

const pillars = [
  { icon: Coffee, title: "Menu playbook", text: "Signature coffee, coolers, desserts and snack combinations designed for quick operations." },
  { icon: Store, title: "Cafe identity", text: "Aesthetic brand guidelines, store vibe, customer journey and staff interaction standards." },
  { icon: UsersRound, title: "Community focus", text: "Events, reviews, local collaborations and repeat-customer experiences for neighbourhood growth." }
];

export default function FranchisePage() {
  return (
    <main className="page-shell py-14">
      <section className="rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-cafe-caramel/20 to-white/[0.04] p-8 md:p-12">
        <p className="section-label"><Building2 size={16} /> Franchise interest</p>
        <h1 className="section-heading">Bring the DK&apos;s Cafe vibe to another neighbourhood.</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-white/62">This page is prepared as a realistic business expansion concept for future partners. DK&apos;s Cafe focuses on compact stores, photogenic ambience, repeatable menus and smooth digital operations.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/contact" className="primary-btn">Send franchise enquiry <ArrowRight size={16} /></Link>
          <Link href="/gallery" className="secondary-btn">View cafe mood</Link>
        </div>
      </section>

      <section className="mt-12 grid gap-5 md:grid-cols-3">
        {pillars.map((item) => (
          <article key={item.title} className="premium-card p-6">
            <div className="relative">
              <item.icon className="text-cafe-caramel" size={32} />
              <h2 className="mt-5 text-2xl font-black text-white">{item.title}</h2>
              <p className="mt-3 leading-7 text-white/58">{item.text}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[2rem] border border-white/10 bg-black/20 p-6">
          <MapPin className="text-cafe-caramel" />
          <h2 className="mt-5 text-3xl font-black text-white">Ideal partner profile</h2>
          <p className="mt-4 leading-7 text-white/58">People who understand hospitality, local taste, clean operations and community marketing. Ideal for high-footfall neighbourhoods, near colleges, offices and lifestyle streets.</p>
        </div>
        <div className="grid gap-3">
          {["350–900 sq ft compact cafe model", "Signature beverage and dessert-first menu", "Training checklist for staff and service flow", "Launch content plan for Instagram and local discovery", "Digital ordering, reservation and review flow"].map((item) => (
            <p key={item} className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/[0.055] p-4 text-white/70"><CheckCircle2 className="text-cafe-neon" size={18} /> {item}</p>
          ))}
        </div>
      </section>
    </main>
  );
}
