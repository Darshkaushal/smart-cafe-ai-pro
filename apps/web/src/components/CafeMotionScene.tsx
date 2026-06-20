import Link from "next/link";
import { ArrowRight, Coffee, Sparkles } from "lucide-react";

export function CafeMotionScene({ compact = false }: { compact?: boolean }) {
  const cards = [
    { title: "Cold Cloud", note: "signature sip", pos: "left-4 top-10 rotate-[-10deg]" },
    { title: "Date Table", note: "evening glow", pos: "right-4 top-24 rotate-[8deg]" },
    { title: "Jaipur Mood", note: "warm lights", pos: "left-12 bottom-8 rotate-[6deg]" }
  ];

  return (
    <div className={`relative mx-auto ${compact ? "min-h-[320px]" : "min-h-[520px]"} w-full max-w-[560px] perspective-[1200px]`}>
      <div className="absolute inset-x-10 bottom-4 h-16 rounded-full bg-cafe-caramel/25 blur-3xl" />
      <div className="cafe-3d-cup absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-[3rem] border border-white/15 bg-gradient-to-br from-cafe-caramel via-[#ffd89a] to-[#9b4f20] shadow-[0_35px_95px_rgba(226,163,84,0.24)]">
        <div className="absolute left-1/2 top-7 h-24 w-28 -translate-x-1/2 rounded-full bg-[#2b120b] shadow-inner" />
        <div className="absolute left-1/2 top-10 h-16 w-20 -translate-x-1/2 rounded-full bg-gradient-to-br from-[#6b311a] to-[#120707]" />
        <div className="absolute -right-12 top-20 h-24 w-24 rounded-full border-[18px] border-cafe-caramel/70 bg-transparent" />
        <div className="absolute bottom-8 left-1/2 h-24 w-32 -translate-x-1/2 rounded-b-[2rem] bg-gradient-to-b from-white/20 to-black/10" />
        <div className="absolute left-10 top-8 h-2 w-24 rounded-full bg-white/40" />
      </div>

      <div className="absolute left-1/2 top-[12%] flex -translate-x-1/2 gap-3 text-cafe-caramel/70">
        {[0, 1, 2].map((item) => <span key={item} className="steam-line h-16 w-2 rounded-full bg-cafe-caramel/25" style={{ animationDelay: `${item * 0.35}s` }} />)}
      </div>

      {cards.map((card) => (
        <div key={card.title} className={`float-slow absolute ${card.pos} rounded-[1.6rem] border border-white/10 bg-white/[0.08] p-4 shadow-glow backdrop-blur-xl`}>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cafe-caramel">{card.note}</p>
          <p className="mt-1 text-xl font-black text-white">{card.title}</p>
        </div>
      ))}

      <div className="absolute bottom-0 right-8 hidden rounded-[1.8rem] border border-white/10 bg-black/30 p-4 backdrop-blur-xl sm:block">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-cafe-neon text-cafe-dark"><Sparkles size={19} /></span>
          <div>
            <p className="font-black text-white">Live cafe vibe</p>
            <p className="text-xs text-white/45">Aesthetic, cozy, Jaipur</p>
          </div>
        </div>
      </div>

      {!compact && (
        <Link href="/menu" className="secondary-btn absolute bottom-6 left-8 hidden bg-black/35 backdrop-blur-xl md:inline-flex">
          See signatures <ArrowRight size={16} />
        </Link>
      )}
      <Coffee className="absolute right-10 top-3 text-cafe-caramel/40" size={34} />
    </div>
  );
}
