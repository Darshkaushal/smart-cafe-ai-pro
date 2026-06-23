import Link from "next/link";
import { ArrowRight, CakeSlice, Coffee, Crown, Heart, MapPin, Sparkles, Star } from "lucide-react";

const orbitItems = [
  { title: "Royal Cold Brew", note: "signature", icon: Coffee, angle: "0deg", counter: "0deg", delay: "0s" },
  { title: "Date Corner", note: "soft lights", icon: Heart, angle: "60deg", counter: "-60deg", delay: "-1.8s" },
  { title: "Birthday Glow", note: "mini events", icon: CakeSlice, angle: "120deg", counter: "-120deg", delay: "-3.6s" },
  { title: "Jaipur Mood", note: "aesthetic", icon: MapPin, angle: "180deg", counter: "-180deg", delay: "-5.4s" },
  { title: "4.8 Guest Vibe", note: "premium", icon: Star, angle: "240deg", counter: "-240deg", delay: "-7.2s" },
  { title: "Smooth Pickup", note: "easy flow", icon: Sparkles, angle: "300deg", counter: "-300deg", delay: "-9s" }
];

export function CafeMotionScene({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`royal-hero-stage relative mx-auto ${compact ? "min-h-[390px]" : "min-h-[620px]"} w-full max-w-[680px] perspective-[1600px]`}>
      <div className="absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(226,163,84,0.22),transparent_62%)] blur-2xl" />
      <div className="royal-floor absolute bottom-0 left-1/2 h-44 w-[92%] -translate-x-1/2 rounded-[100%] border border-cafe-caramel/15 bg-cafe-caramel/10 blur-sm" />

      <div className="royal-rotator absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cafe-caramel/20">
        <div className="royal-rotator-inner absolute inset-0 rounded-full border border-white/8" />
        {orbitItems.map((item) => (
          <div
            key={item.title}
            className="royal-orbit-card absolute left-1/2 top-1/2 flex items-center gap-3 rounded-[1.6rem] border border-white/12 bg-[#120706]/70 px-4 py-3 shadow-[0_22px_70px_rgba(0,0,0,0.44)] backdrop-blur-xl"
            style={{ transform: `rotate(${item.angle}) translateX(${compact ? "158px" : "235px"}) rotate(${item.counter})`, animationDelay: item.delay }}
          >
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-cafe-caramel/18 text-cafe-caramel"><item.icon size={18} /></span>
            <span>
              <span className="block whitespace-nowrap text-[10px] font-black uppercase tracking-[0.22em] text-cafe-caramel/75">{item.note}</span>
              <span className="block whitespace-nowrap text-sm font-black text-white">{item.title}</span>
            </span>
          </div>
        ))}
      </div>

      <div className="royal-cup-3d absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-[4.2rem] border border-white/15 bg-gradient-to-br from-[#ffe3a5] via-cafe-caramel to-[#6b2c16] shadow-[0_44px_140px_rgba(226,163,84,0.42)]">
        <div className="absolute -inset-8 rounded-[5rem] bg-cafe-caramel/12 blur-3xl" />
        <div className="absolute left-1/2 top-7 h-36 w-40 -translate-x-1/2 rounded-full bg-[#2a1108] shadow-[inset_0_20px_45px_rgba(0,0,0,.75)]" />
        <div className="absolute left-1/2 top-12 h-24 w-28 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_35%_25%,#c47b3b,#2c1008_58%,#090202)]" />
        <div className="absolute -right-16 top-24 h-32 w-32 rounded-full border-[20px] border-[#f6bc6a]/85 bg-transparent shadow-[inset_0_0_36px_rgba(0,0,0,.35)]" />
        <div className="absolute bottom-9 left-1/2 h-32 w-44 -translate-x-1/2 rounded-b-[2.7rem] bg-gradient-to-b from-white/24 to-black/12" />
        <div className="absolute left-12 top-14 h-5 w-24 rotate-[-14deg] rounded-full bg-white/42 blur-[1px]" />
        <div className="absolute left-1/2 top-32 -translate-x-1/2 rounded-full border border-white/18 bg-black/18 px-5 py-2 text-xs font-black uppercase tracking-[0.26em] text-white/78">DK Royal</div>
      </div>

      <div className="absolute left-1/2 top-[7%] flex -translate-x-1/2 gap-5 text-cafe-caramel/75">
        {[0, 1, 2, 3, 4].map((item) => <span key={item} className="steam-line h-24 w-2 rounded-full bg-cafe-caramel/25" style={{ animationDelay: `${item * 0.24}s` }} />)}
      </div>

      <div className="royal-floating-chip left-4 top-10 hidden md:flex">
        <Crown size={18} className="text-cafe-caramel" />
        <span>Royal Gen-Z ambience</span>
      </div>
      <div className="royal-floating-chip bottom-16 right-4">
        <Star size={17} className="text-cafe-caramel" fill="currentColor" />
        <span>4.8 guest vibe</span>
      </div>

      {!compact && (
        <Link href="/menu" className="secondary-btn absolute bottom-7 left-6 hidden bg-black/35 backdrop-blur-xl md:inline-flex">
          Explore signatures <ArrowRight size={16} />
        </Link>
      )}
    </div>
  );
}
