import Link from "next/link";
import { ArrowRight, Coffee, Sparkles, Star } from "lucide-react";

export function CafeMotionScene({ compact = false }: { compact?: boolean }) {
  const orbitCards = [
    { title: "Cold Cloud", note: "signature sip", delay: "0s", angle: "0deg", counter: "0deg" },
    { title: "Date Table", note: "evening glow", delay: "-2.2s", angle: "72deg", counter: "-72deg" },
    { title: "Study Corner", note: "wifi + calm", delay: "-4.4s", angle: "144deg", counter: "-144deg" },
    { title: "Birthday Setup", note: "sweet moments", delay: "-6.6s", angle: "216deg", counter: "-216deg" },
    { title: "Jaipur Mood", note: "warm lights", delay: "-8.8s", angle: "288deg", counter: "-288deg" }
  ];

  return (
    <div className={`relative mx-auto ${compact ? "min-h-[360px]" : "min-h-[570px]"} w-full max-w-[620px] perspective-[1400px]`}>
      <div className="absolute inset-x-8 bottom-0 h-20 rounded-full bg-cafe-caramel/25 blur-3xl" />
      <div className="absolute left-1/2 top-1/2 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cafe-caramel/15 bg-[radial-gradient(circle,rgba(226,163,84,0.16),transparent_62%)] cafe-orbit-ring" />
      <div className="absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5 cafe-orbit-ring-reverse" />

      <div className="cafe-3d-cup absolute left-1/2 top-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-[3.5rem] border border-white/15 bg-gradient-to-br from-cafe-caramel via-[#ffd89a] to-[#9b4f20] shadow-[0_40px_120px_rgba(226,163,84,0.32)]">
        <div className="absolute -inset-4 rounded-[4rem] bg-cafe-caramel/10 blur-2xl" />
        <div className="absolute left-1/2 top-7 h-28 w-32 -translate-x-1/2 rounded-full bg-[#2b120b] shadow-inner" />
        <div className="absolute left-1/2 top-10 h-20 w-24 -translate-x-1/2 rounded-full bg-gradient-to-br from-[#74381f] via-[#3a170d] to-[#100605]" />
        <div className="absolute left-12 top-12 h-4 w-16 rounded-full bg-white/35 blur-[1px]" />
        <div className="absolute -right-14 top-20 h-28 w-28 rounded-full border-[18px] border-cafe-caramel/70 bg-transparent shadow-[inset_0_0_30px_rgba(0,0,0,0.3)]" />
        <div className="absolute bottom-8 left-1/2 h-28 w-36 -translate-x-1/2 rounded-b-[2.2rem] bg-gradient-to-b from-white/22 to-black/10" />
        <div className="absolute bottom-8 left-1/2 h-5 w-40 -translate-x-1/2 rounded-full bg-black/20 blur-sm" />
      </div>

      <div className="absolute left-1/2 top-[9%] flex -translate-x-1/2 gap-4 text-cafe-caramel/70">
        {[0, 1, 2, 3].map((item) => <span key={item} className="steam-line h-20 w-2 rounded-full bg-cafe-caramel/25" style={{ animationDelay: `${item * 0.28}s` }} />)}
      </div>

      {orbitCards.map((card, index) => (
        <div
          key={card.title}
          className="orbit-card absolute left-1/2 top-1/2 rounded-[1.7rem] border border-white/10 bg-white/[0.085] p-4 shadow-glow backdrop-blur-xl"
          style={{ animationDelay: card.delay, transform: `rotate(${card.angle}) translateX(${compact ? "160px" : "220px"}) rotate(${card.counter})` }}
        >
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-cafe-caramel">{card.note}</p>
          <p className="mt-1 whitespace-nowrap text-lg font-black text-white">{card.title}</p>
        </div>
      ))}

      <div className="absolute bottom-3 right-8 rounded-[1.8rem] border border-white/10 bg-black/35 p-4 backdrop-blur-xl smooth-lift-card">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-cafe-neon text-cafe-dark"><Sparkles size={19} /></span>
          <div>
            <p className="font-black text-white">Live cafe vibe</p>
            <p className="text-xs text-white/45">Aesthetic, cozy, Jaipur</p>
          </div>
        </div>
      </div>

      <div className="absolute left-5 top-10 hidden rounded-[1.8rem] border border-white/10 bg-black/35 p-4 backdrop-blur-xl smooth-lift-card md:block">
        <div className="flex items-center gap-1 text-cafe-caramel">{[1,2,3,4,5].map((s) => <Star key={s} size={14} fill="currentColor" />)}</div>
        <p className="mt-2 text-sm font-black text-white">4.8 guest vibe</p>
        <p className="text-xs text-white/45">Premium cafe feel</p>
      </div>

      {!compact && (
        <Link href="/menu" className="secondary-btn absolute bottom-10 left-8 hidden bg-black/35 backdrop-blur-xl md:inline-flex">
          See signatures <ArrowRight size={16} />
        </Link>
      )}
      <Coffee className="absolute right-10 top-3 text-cafe-caramel/40 floating-spin" size={36} />
    </div>
  );
}
