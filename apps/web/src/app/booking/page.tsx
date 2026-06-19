import { BookingForm } from "@/components/BookingForm";

export default function BookingPage() {
  return (
    <main className="px-5 py-16">
      <div className="page-shell">
        <div className="mx-auto mb-10 max-w-4xl text-center">
          <p className="section-label mx-auto">Table reservation</p>
          <h1 className="section-heading mx-auto">Book your cafe slot with a smoother reservation flow.</h1>
          <p className="mx-auto mt-5 max-w-2xl text-white/60">All bookings are stored securely in MySQL and visible only to the owner through the protected admin panel.</p>
        </div>
        <BookingForm />
      </div>
    </main>
  );
}
