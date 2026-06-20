import Link from "next/link";
import { ArrowRight, Heart, MessageCircleHeart, Star } from "lucide-react";

const reviews = [
  { name: "Megha R.", tag: "Cold coffee date", text: "The caramel cloud coffee was smooth, the ambience was cozy, and the table lighting was perfect for photos." },
  { name: "Aarav S.", tag: "Birthday table", text: "Booked a small birthday table and the team handled the dessert timing really well. Felt premium without being too loud." },
  { name: "Tanisha K.", tag: "Study break", text: "Afternoon vibe is calm, good for laptop work and iced tea. Staff was polite and quick." },
  { name: "Kabir J.", tag: "Friends hangout", text: "Nachos bowl, mocktails and Oreo shake were perfect for a small friends plan. The ordering flow was easy." },
  { name: "Riya P.", tag: "Dessert night", text: "Tiramisu jar and Biscoff shake are repeat-order worthy. Jaipur needed a place with this mood." },
  { name: "Dev M.", tag: "Quick pickup", text: "Placed order before reaching. Pickup was smooth and the packaging looked neat." }
];

export default function ReviewsPage() {
  return (
    <main className="page-shell py-14">
      <section className="text-center">
        <p className="section-label mx-auto"><MessageCircleHeart size={16} /> Guest stories</p>
        <h1 className="section-heading mx-auto">Reviews that feel like real cafe moments.</h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/58">From birthday tables to study breaks, DK&apos;s Cafe is designed around guest comfort, photogenic corners and repeat-worthy taste.</p>
      </section>

      <section className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {reviews.map((review) => (
          <article key={review.name} className="premium-card p-6 transition duration-300 hover:-translate-y-2">
            <div className="relative">
              <div className="mb-5 flex text-cafe-caramel">{[1,2,3,4,5].map((star) => <Star key={star} size={17} fill="currentColor" />)}</div>
              <p className="leading-7 text-white/68">“{review.text}”</p>
              <div className="mt-6 flex items-center justify-between">
                <div>
                  <p className="font-black text-white">{review.name}</p>
                  <p className="text-sm text-cafe-caramel">{review.tag}</p>
                </div>
                <Heart className="text-cafe-neon" />
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="mt-14 rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-cafe-caramel/15 to-white/[0.04] p-8 text-center md:p-10">
        <h2 className="text-4xl font-black text-white">Had a great DK&apos;s Cafe moment?</h2>
        <p className="mx-auto mt-3 max-w-2xl text-white/58">Send your review, birthday photo request or event feedback. The cafe team uses guest feedback to improve ambience, menu and service.</p>
        <Link href="/contact" className="primary-btn mt-6">Share feedback <ArrowRight size={16} /></Link>
      </section>
    </main>
  );
}
