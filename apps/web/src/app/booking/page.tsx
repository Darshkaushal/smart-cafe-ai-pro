import { BookingForm } from "@/components/BookingForm";

export default function BookingPage() {
  return (
    <main className="px-5 py-16">
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <p className="text-cafe-caramel">Table reservation</p>
        <h1 className="mt-3 text-4xl font-black text-white md:text-6xl">Book your cafe slot instantly.</h1>
        <p className="mt-4 text-white/60">All bookings are stored securely in MySQL and visible only to the owner through the protected admin panel.</p>
      </div>
      <BookingForm />
    </main>
  );
}
