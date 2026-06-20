import Link from "next/link";
import { BookingForm } from "@/components/BookingForm";

export default function BookingPage() {
  return (
    <main className="px-5 py-16">
      <div className="page-shell">
        <div className="mx-auto mb-10 max-w-4xl text-center">
          <p className="section-label mx-auto">Table reservation</p>
          <h1 className="section-heading mx-auto">Reserve your corner for coffee, conversations and celebrations.</h1>
          <p className="mx-auto mt-5 max-w-2xl text-white/60">Choose your date, time, guest count and vibe notes. We&apos;ll keep your table ready at DK&apos;s Cafe, Jaipur.</p>
        </div>
        <div className="mb-8 text-center"><Link href="/availability" className="secondary-btn">Check table availability first</Link></div>
      <BookingForm />
      </div>
    </main>
  );
}
