import Link from "next/link";
import PiniSyncDemo from "@/components/PiniSyncDemo";

const features = [
  {
    emoji: "🧠",
    title: "Your takes are your profile",
    body: "Not your photos. Not your follower count. The things you actually believe.",
    bg: "bg-amber",
  },
  {
    emoji: "🔗",
    title: "Friend graph, not follower graph",
    body: "You see what people close to you actually think — not what a feed algorithm decides.",
    bg: "bg-peach",
  },
  {
    emoji: "⚡",
    title: "Pini Sync",
    body: "Answer the same deck as a friend, then watch a cinematic reveal of how much you match.",
    bg: "bg-lilac",
  },
  {
    emoji: "🌍",
    title: "Takes travel person-to-person",
    body: "A pini gets forwarded, remixed, replied to. Your opinion can move through a whole network.",
    bg: "bg-highlight",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b-[3px] border-ink">
        <div className="absolute inset-0 pointer-events-none select-none">
          <div
            className="absolute top-[-80px] right-[-80px] w-96 h-96 rounded-full opacity-60"
            style={{ background: "radial-gradient(circle at 30% 30%, #fff, #fbbf24 40%, #f97316 80%)" }}
          />
          <div className="absolute bottom-[-60px] left-[-60px] w-64 h-64 rounded-full bg-peach opacity-50" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-36 flex flex-col items-center text-center gap-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber border-2 border-ink shadow-brutal-sm text-sm font-black uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-orange" />
            Early Access · Now Live
          </div>

          <h1 className="font-[var(--font-fraunces)] font-black text-5xl md:text-7xl leading-[0.95] tracking-tight max-w-3xl">
            Swipe minds,<br />
            <span className="text-orange italic">not faces.</span>
          </h1>

          <p className="text-xl md:text-2xl text-ink/70 max-w-xl leading-relaxed">
            OnPini is the social network where your <strong>takes</strong>{" "}
            are your profile. Connect with people who think like you — or don&apos;t.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://app.onpini.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full bg-ink text-cream font-black text-lg border-2 border-ink shadow-brutal hover:-translate-y-1 hover:shadow-brutal-md transition-all"
            >
              Get Early Access →
            </a>
            <Link
              href="/about"
              className="px-8 py-4 rounded-full bg-cream font-black text-lg border-2 border-ink shadow-brutal hover:-translate-y-1 hover:shadow-brutal-md transition-all"
            >
              Learn more
            </Link>
          </div>

          {/* Interactive Pini Sync demo — the flagship, playable right here */}
          <PiniSyncDemo />
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-b-[3px] border-ink bg-amber">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-wrap items-center justify-center gap-8 md:gap-20">
          {[
            { value: "Early Access", label: "Status" },
            { value: "iOS + Android", label: "Available on" },
            { value: "v1.0", label: "Current version" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-[var(--font-fraunces)] font-black text-xl text-ink">{s.value}</div>
              <div className="text-xs font-black uppercase tracking-widest text-ink/60">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="border-b-[3px] border-ink py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-[var(--font-fraunces)] font-black text-4xl md:text-5xl mb-4">
              How it works<span className="text-orange">.</span>
            </h2>
            <p className="text-ink/60 text-lg max-w-lg mx-auto">
              No algorithms. No vanity metrics. Just real opinions moving through real friendships.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className={`${f.bg} rounded-3xl border-2 border-ink p-8 shadow-brutal hover:-translate-y-1 hover:shadow-brutal-md transition-all`}
              >
                <div className="text-4xl mb-4">{f.emoji}</div>
                <h3 className="font-[var(--font-fraunces)] font-black text-xl mb-2">{f.title}</h3>
                <p className="text-ink/70 leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pini Sync highlight */}
      <section className="border-b-[3px] border-ink py-24 bg-ink text-cream overflow-hidden relative">
        <div
          className="absolute top-[-40px] right-[-40px] w-72 h-72 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #fbbf24, #f97316)" }}
        />
        <div className="relative max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber/40 text-amber text-xs font-black uppercase tracking-widest mb-6">
              ✦ Flagship Feature
            </div>
            <h2 className="font-[var(--font-fraunces)] font-black text-4xl md:text-5xl mb-6 leading-tight">
              Pini Sync<span className="text-orange">.</span>
            </h2>
            <p className="text-cream/70 text-lg leading-relaxed mb-8 max-w-md">
              You and a friend answer the same deck of questions separately.
              Then — cinematic reveal. Watch your match percentage appear question by question.
              The most honest conversation starter ever built.
            </p>
            <a
              href="https://app.onpini.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber text-ink font-black border-2 border-amber shadow-brutal-orange hover:-translate-y-0.5 transition-all"
            >
              Try Pini Sync →
            </a>
          </div>

          <div className="flex-1 flex justify-center">
            <div className="bg-amber/10 border-2 border-cream/20 rounded-3xl p-8 max-w-xs w-full text-center" style={{ boxShadow: "6px 6px 0 #fbbf24" }}>
              <div className="font-[var(--font-fraunces)] font-black text-7xl text-amber mb-1">87%</div>
              <div className="text-cream/50 text-xs font-black uppercase tracking-widest mb-6">Match Score</div>
              <div className="space-y-3">
                {[
                  { q: "Pineapple on pizza?", pct: 90 },
                  { q: "Night owl or early bird?", pct: 75 },
                  { q: "Logic over feelings?", pct: 60 },
                ].map((item) => (
                  <div key={item.q} className="text-left">
                    <p className="text-xs text-cream/60 font-medium mb-1">{item.q}</p>
                    <div className="h-1.5 rounded-full bg-cream/10 overflow-hidden">
                      <div className="h-full rounded-full bg-amber" style={{ width: `${item.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="font-[var(--font-fraunces)] font-black text-4xl md:text-5xl mb-6 leading-tight">
            Your opinion matters<span className="text-orange">.</span><br />
            Now it travels.
          </h2>
          <p className="text-ink/60 text-lg mb-10">
            Join the early access community. Be part of something that&apos;s actually different.
          </p>
          <a
            href="https://app.onpini.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-ink text-cream font-black text-xl border-2 border-ink shadow-brutal-lg hover:-translate-y-1 transition-all"
          >
            Get Early Access →
          </a>
        </div>
      </section>
    </>
  );
}
