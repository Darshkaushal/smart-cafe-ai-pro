export default function AboutPage() {
  return (
    <main className="px-5 py-16">
      <section className="mx-auto max-w-6xl">
        <p className="text-cafe-caramel">About Smart Cafe AI</p>
        <h1 className="mt-3 text-4xl font-black text-white md:text-6xl">A modern cafe system built for customers and owners.</h1>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            ["Customer Experience", "Responsive Gen-Z design with menu, order, booking, contact, and AI chat."],
            ["Owner Control", "Separate admin dashboard to track orders, bookings, customers, conversations, and demand."],
            ["AI + ML", "Gemini-powered recommendations plus a Python ML model for future occupancy forecasting."]
          ].map(([title, text]) => (
            <div key={title} className="glass-card rounded-[2rem] p-6">
              <h2 className="text-2xl font-black text-white">{title}</h2>
              <p className="mt-3 text-white/60">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
