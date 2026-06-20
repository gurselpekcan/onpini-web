import Link from "next/link";
import StoreBadges from "@/components/StoreBadges";
import CirclesBoard from "@/components/CirclesBoard";

const circles = [
  {
    emoji: "⚽",
    name: "Football Debates",
    tag: "Pick a side. Defend it to the death.",
    bg: "bg-amber",
    polls: [
      { q: "The GOAT?", a: "Messi", b: "Ronaldo", kind: "A/B" },
      { q: "“VAR ruined football.”", a: "Agree", b: "Disagree", kind: "Hot take" },
      { q: "Win ugly or lose beautifully?", a: "Win ugly", b: "Lose beautifully", kind: "A/B" },
    ],
  },
  {
    emoji: "👗",
    name: "Fashion",
    tag: "Hit or miss? You decide.",
    bg: "bg-peach",
    polls: [
      { q: "This season:", a: "Quiet luxury", b: "Maximalism", kind: "A/B" },
      { q: "“Logos are tacky.”", a: "Agree", b: "Disagree", kind: "Hot take" },
      { q: "Rate this Fashion Week look", a: "", b: "", kind: "Rate · photo" },
    ],
  },
  {
    emoji: "🚗",
    name: "Car Drops",
    tag: "New metal, real opinions.",
    bg: "bg-lilac",
    polls: [
      { q: "Your next car:", a: "EV", b: "Petrol", kind: "A/B" },
      { q: "“Touchscreens ruined interiors.”", a: "Agree", b: "Disagree", kind: "Hot take" },
      { q: "Rate the new flagship", a: "", b: "", kind: "Rate · photo" },
    ],
  },
  {
    emoji: "🎬",
    name: "Movies & TV",
    tag: "Strong opinions, no spoilers.",
    bg: "bg-highlight",
    polls: [
      { q: "Watch style:", a: "Binge it all", b: "Weekly drops", kind: "A/B" },
      { q: "“The book is always better.”", a: "Agree", b: "Disagree", kind: "Hot take" },
      { q: "Subtitles or dubbed?", a: "Subtitles", b: "Dubbed", kind: "A/B" },
    ],
  },
];

const steps = [
  { emoji: "🎯", title: "Pick your arena", body: "Join the circles that are you — football, fashion, cars, screen, and more." },
  { emoji: "🔥", title: "Vote and argue", body: "Fast A/B takes, hot-takes, and ratings. Defend your side, see who's with you." },
  { emoji: "⚡", title: "A Host runs each room", body: "Every circle has a Host who seeds the debates, sets the tone, and racks up ⚡ every time the room kicks off." },
];

export default function Circles() {
  return (
    <>
      {/* Hero */}
      <section className="border-b-[3px] border-ink py-20 relative overflow-hidden">
        <div className="absolute top-[-50px] right-[-50px] w-80 h-80 rounded-full bg-amber opacity-30 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-lilac border-2 border-ink shadow-brutal-sm text-sm font-black uppercase tracking-widest mb-8">
            Communities
          </div>
          <h1 className="font-[var(--font-fraunces)] font-black text-5xl md:text-6xl leading-[0.95] mb-6">
            Find your arena<span className="text-orange">.</span>
          </h1>
          <p className="text-xl text-ink/70 max-w-2xl leading-relaxed">
            Circles are tribes built on takes, not topics. Drop into the ones that are
            you, vote and argue with people who actually care, and if a circle&apos;s
            yours to run, become its Host.
          </p>
        </div>
      </section>

      {/* The circles */}
      <section className="border-b-[3px] border-ink py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="reveal grid grid-cols-1 md:grid-cols-2 gap-6">
            {circles.map((c) => (
              <div key={c.name} className={`${c.bg} border-2 border-ink rounded-3xl p-6 shadow-brutal`}>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-4xl">{c.emoji}</span>
                  <h2 className="font-[var(--font-fraunces)] font-black text-2xl">{c.name}</h2>
                </div>
                <p className="text-ink/70 font-bold mb-4">{c.tag}</p>

                {/* sample polls */}
                <div className="space-y-2 mb-5">
                  {c.polls.map((p) => (
                    <div key={p.q} className="bg-paper border-2 border-ink rounded-2xl p-3 shadow-brutal-sm">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <p className="text-sm font-black text-ink leading-snug">{p.q}</p>
                        <span className="shrink-0 text-[9px] font-black uppercase tracking-widest text-ink/40">{p.kind}</span>
                      </div>
                      {p.a ? (
                        <div className="flex gap-2">
                          <span className="flex-1 text-center text-xs font-black bg-amber border-2 border-ink rounded-full py-1.5">{p.a}</span>
                          <span className="flex-1 text-center text-xs font-black bg-peach border-2 border-ink rounded-full py-1.5">{p.b}</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-1.5 text-[11px] font-black text-ink/45 border-2 border-dashed border-ink/25 rounded-xl py-2">
                          ⭐ Rate 1–10 · photo
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* circle host slot */}
                <div className="flex items-center justify-between gap-2 bg-ink text-cream rounded-2xl px-4 py-2.5 border-2 border-ink">
                  <span className="text-xs font-black flex items-center gap-2">
                    <span aria-hidden>🪑</span> Circle Host: <span className="text-amber">open</span>
                  </span>
                  <a
                    href="https://app.onpini.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-black bg-amber text-ink rounded-full px-3 py-1 border-2 border-amber hover:-translate-y-0.5 transition-all"
                  >
                    Run this room →
                  </a>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-ink/50 text-sm font-bold mt-8">
            More circles dropping every week. Don&apos;t see yours? Start it and host it.
          </p>
        </div>
      </section>

      {/* Circles forming — scrolling registry board */}
      <CirclesBoard />

      {/* Bring OnPini to your campus — the university wedge */}
      <section className="border-b-[3px] border-ink py-20 bg-lilac relative overflow-hidden">
        <div className="absolute bottom-[-60px] left-[-40px] w-72 h-72 rounded-full bg-amber opacity-30 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ink text-cream text-xs font-black uppercase tracking-widest mb-6">
            🎓 Campus · the fastest way in
          </div>
          <h2 className="font-[var(--font-fraunces)] font-black text-4xl md:text-5xl leading-[0.95] mb-5 max-w-2xl">
            Bring OnPini to your campus<span className="text-orange">.</span>
          </h2>
          <p className="text-ink/75 text-lg mb-8 max-w-2xl leading-relaxed">
            Start a circle for your class, your course, your dorm. One person opens it, the
            whole group chat piles in, and suddenly every debate that runs your year lives
            in one place. Be the one who plants the flag.
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {["🎓 Film Studies '27", "🏛️ Law School '26", "🛏️ Dorm Debates", "🔥 Campus Hot Takes"].map((c) => (
              <span key={c} className="bg-paper border-2 border-ink rounded-full px-4 py-1.5 text-sm font-black shadow-brutal-sm">
                {c}
              </span>
            ))}
          </div>

          <a
            href="https://app.onpini.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-ink text-cream font-black text-lg border-2 border-ink shadow-brutal hover:-translate-y-1 hover:shadow-brutal-md active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
          >
            Start your class circle →
          </a>
        </div>
      </section>

      {/* How circles work */}
      <section className="border-b-[3px] border-ink py-20 bg-ink text-cream">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="reveal font-[var(--font-fraunces)] font-black text-3xl text-amber mb-10">
            How circles work<span className="text-orange">.</span>
          </h2>
          <div className="reveal grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((s) => (
              <div key={s.title} className="border border-cream/10 rounded-3xl p-7 hover:border-cream/30 transition-colors">
                <div className="text-3xl mb-4">{s.emoji}</div>
                <h3 className="font-[var(--font-fraunces)] font-black text-xl mb-2 text-cream">{s.title}</h3>
                <p className="text-cream/60 text-sm leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Become a Circle Host */}
      <section className="border-b-[3px] border-ink py-20 bg-amber">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ink text-cream text-xs font-black uppercase tracking-widest mb-6">
            ⚡ Founding Circle Hosts
          </div>
          <h2 className="font-[var(--font-fraunces)] font-black text-4xl md:text-5xl mb-5 leading-tight">
            Every circle needs a Host.
          </h2>
          <p className="text-ink/70 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
            Run the room: seed the debates, set the tone, and rack up ⚡ for every argument
            you spark. The seats are open right now — grab one before someone else does.
          </p>
          <a
            href="https://app.onpini.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-ink text-cream font-black text-lg border-2 border-ink shadow-brutal hover:-translate-y-1 hover:shadow-brutal-md active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
          >
            Become a Circle Host →
          </a>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center">
        <div className="max-w-xl mx-auto px-6">
          <h2 className="font-[var(--font-fraunces)] font-black text-4xl mb-6">
            Your people are already arguing<span className="text-orange">.</span>
          </h2>
          <p className="text-ink/60 text-lg mb-8">Get the app and walk into your arena.</p>
          <StoreBadges className="justify-center" />
          <p className="mt-8">
            <Link href="/" className="text-sm font-black underline decoration-orange decoration-2 underline-offset-2">
              Back home
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
