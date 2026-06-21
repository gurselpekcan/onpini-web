// "Circles forming" board — a vertical auto-scrolling registry of niche circle
// archetypes (departures-board feel). Motion makes it feel alive; the content
// is framed as circles you can START, not a fabricated log of real activity —
// so it's honest pre-launch and doubles as a niche-targeting + lead-capture
// surface (every row is a "claim the Circle Host seat" CTA).

const forming = [
  { emoji: "🎓", name: "Film Studies '27", cat: "Campus" },
  { emoji: "👟", name: "Sneakerhead Society", cat: "Style" },
  { emoji: "🚗", name: "EV Owners Club", cat: "Cars" },
  { emoji: "⚽", name: "Sunday League Debates", cat: "Football" },
  { emoji: "🎬", name: "A24 Stans", cat: "Film" },
  { emoji: "👗", name: "Quiet Luxury Club", cat: "Fashion" },
  { emoji: "🎓", name: "Law School '26", cat: "Campus" },
  { emoji: "🎮", name: "Speedrun Society", cat: "Gaming" },
  { emoji: "🍜", name: "Ramen Snobs", cat: "Food" },
  { emoji: "🏎️", name: "JDM Legends", cat: "Cars" },
  { emoji: "🎧", name: "Vinyl Heads", cat: "Music" },
  { emoji: "💼", name: "Startup Hot Takes", cat: "Work" },
  { emoji: "📚", name: "BookTok Court", cat: "Books" },
  { emoji: "🎓", name: "Campus Hot Takes", cat: "Campus" },
];

function BoardRow({ emoji, name, cat }: { emoji: string; name: string; cat: string }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 border-b border-cream/10">
      <span className="text-xl shrink-0">{emoji}</span>
      <span className="font-black text-cream truncate flex-1">{name}</span>
      <span className="hidden sm:inline text-[10px] font-black uppercase tracking-widest text-cream/40 shrink-0">{cat}</span>
      <a
        href="https://web.onpini.com"
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 text-[11px] font-black bg-amber text-ink rounded-full px-3 py-1 border-2 border-amber hover:-translate-y-0.5 transition-transform whitespace-nowrap"
      >
        Run this room →
      </a>
    </div>
  );
}

export default function CirclesBoard() {
  return (
    <section className="border-b-[3px] border-ink py-20 overflow-hidden">
      {/* Vertical ticker keyframe kept self-contained to this component. */}
      <style>{`
        @keyframes circles-up { from { transform: translateY(0); } to { transform: translateY(-50%); } }
        .animate-marquee-up { animation: circles-up 32s linear infinite; }
        @media (prefers-reduced-motion: reduce) { .animate-marquee-up { animation: none !important; } }
      `}</style>
      <div className="max-w-4xl mx-auto px-6">
        <div className="reveal text-center mb-10">
          <h2 className="font-[var(--font-fraunces)] font-black text-4xl md:text-5xl mb-4">
            Circles forming on OnPini<span className="text-orange">.</span>
          </h2>
          <p className="text-ink/60 text-lg max-w-lg mx-auto">
            The kinds of tribes taking shape. Find yours, or plant the flag and start it.
          </p>
        </div>

        {/* The board — dark "registry" panel with a vertically scrolling list. */}
        <div className="reveal max-w-2xl mx-auto bg-ink rounded-3xl border-[3px] border-ink shadow-brutal overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b-2 border-cream/15 bg-ink">
            <span className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-amber">
              <span className="w-2 h-2 rounded-full bg-orange inline-block animate-wiggle" />
              Find your circle
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest text-cream/40">Host seats open</span>
          </div>

          <div className="relative h-[22rem] overflow-hidden group">
            {/* duplicated list so the -50% translate loops seamlessly */}
            <div className="animate-marquee-up group-hover:[animation-play-state:paused]">
              {[...forming, ...forming].map((c, i) => (
                <BoardRow key={i} {...c} />
              ))}
            </div>
            {/* top/bottom fade so rows enter/leave softly */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-ink to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-ink to-transparent" />
          </div>
        </div>

        <p className="text-center text-ink/50 text-sm font-bold mt-8">
          Don&apos;t see your tribe? Start it, host it.
        </p>
      </div>
    </section>
  );
}
