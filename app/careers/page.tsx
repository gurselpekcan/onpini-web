const roles = [
  {
    title: "Founding Designer",
    tag: "Brand · Product · Motion",
    bg: "bg-amber",
    blurb:
      "Own the look and feel end-to-end, the playful neobrutalist system, the product UI, and the small motions that make it feel alive. You'll set the visual language the whole product speaks in.",
  },
  {
    title: "Product Engineer",
    tag: "React · TypeScript · FastAPI",
    bg: "bg-lilac",
    blurb:
      "Ship features across the whole stack, fast. The feed, Pini Sync, profiles, Circles, you'll build it and watch it go live to real users the same week.",
  },
  {
    title: "Mobile Engineer",
    tag: "React Native · Capacitor · iOS/Android",
    bg: "bg-peach",
    blurb:
      "Make OnPini feel native on every phone. Gestures, performance, notifications, the polish people feel but can't name.",
  },
];

const why = [
  {
    emoji: "🛠",
    title: "Real ownership",
    body: "We're tiny, so your work ships in days, and it's yours, not buried under six layers of sign-off.",
  },
  {
    emoji: "🔥",
    title: "Opinions are the point",
    body: "We're building the anti-algorithm, anti-vanity-metric network. Strong takes encouraged, especially the unpopular ones.",
  },
  {
    emoji: "🤝",
    title: "No hiring theater",
    body: "No seven-round loops, no take-home marathons. A real conversation, a bit of real work together, a real decision.",
  },
];

export default function Careers() {
  return (
    <>
      {/* Hero */}
      <section className="border-b-[3px] border-ink py-20 relative overflow-hidden">
        <div className="absolute top-[-50px] right-[-50px] w-80 h-80 rounded-full bg-amber opacity-30 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber border-2 border-ink shadow-brutal-sm text-sm font-black uppercase tracking-widest mb-8">
            <span className="w-2 h-2 rounded-full bg-orange" />
            We&apos;re hiring
          </div>
          <h1 className="font-[var(--font-fraunces)] font-black text-5xl md:text-6xl leading-[0.95] mb-6">
            Build OnPini<br />
            <span className="text-orange italic">with us.</span>
          </h1>
          <p className="text-xl text-ink/70 max-w-2xl leading-relaxed">
            We&apos;re a tiny team with a big idea, and we&apos;d rather tell you
            that than pretend to be a hundred people. No corporate theater, no
            endless interview loops. Just real work on a product we genuinely
            believe in. If you&apos;ve got strong takes about how the internet
            should work, you&apos;ll fit right in.
          </p>
        </div>
      </section>

      {/* Why join */}
      <section className="border-b-[3px] border-ink py-20 bg-ink text-cream">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-[var(--font-fraunces)] font-black text-3xl text-amber mb-10">
            Why join this early<span className="text-orange">.</span>
          </h2>
          <div className="reveal grid grid-cols-1 md:grid-cols-3 gap-6">
            {why.map((w) => (
              <div
                key={w.title}
                className="border border-cream/10 rounded-3xl p-7 hover:border-cream/30 transition-colors"
              >
                <div className="text-3xl mb-4">{w.emoji}</div>
                <h3 className="font-[var(--font-fraunces)] font-black text-xl mb-2 text-cream">
                  {w.title}
                </h3>
                <p className="text-cream/60 text-sm leading-relaxed">{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open roles */}
      <section className="border-b-[3px] border-ink py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-3 h-3 rounded-full bg-orange animate-pulse" />
            <h2 className="font-[var(--font-fraunces)] font-black text-3xl text-ink">
              Open roles
            </h2>
          </div>

          <div className="reveal space-y-4">
            {roles.map((r) => (
              <div
                key={r.title}
                className={`${r.bg} border-2 border-ink rounded-3xl p-7 shadow-brutal flex flex-col md:flex-row md:items-center gap-5`}
              >
                <div className="flex-1">
                  <h3 className="font-[var(--font-fraunces)] font-black text-2xl mb-1">
                    {r.title}
                  </h3>
                  <p className="text-xs font-black uppercase tracking-widest text-ink/50 mb-3">
                    {r.tag}
                  </p>
                  <p className="text-ink/70 leading-relaxed max-w-xl">{r.blurb}</p>
                </div>
                <a
                  href={`mailto:hello@onpini.com?subject=${encodeURIComponent(
                    `Applying: ${r.title}`,
                  )}`}
                  className="shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-ink text-cream font-black border-2 border-ink shadow-brutal-sm hover:-translate-y-0.5 hover:shadow-brutal transition-all"
                >
                  Apply →
                </a>
              </div>
            ))}

            {/* Catch-all */}
            <div className="border-2 border-dashed border-ink/30 rounded-3xl p-7 flex flex-col md:flex-row md:items-center gap-5">
              <div className="flex-1">
                <h3 className="font-[var(--font-fraunces)] font-black text-2xl mb-1">
                  Don&apos;t see your role?
                </h3>
                <p className="text-ink/60 leading-relaxed max-w-xl">
                  We&apos;re small enough that a great person can write their own
                  job. If you&apos;d be wasted anywhere else, pitch us.
                </p>
              </div>
              <a
                href="mailto:hello@onpini.com?subject=Pitch:%20I%20want%20to%20work%20at%20OnPini"
                className="shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-cream text-ink font-black border-2 border-ink shadow-brutal-sm hover:-translate-y-0.5 hover:shadow-brutal transition-all"
              >
                Pitch us →
              </a>
            </div>
          </div>

          <p className="text-ink/50 text-sm mt-8 leading-relaxed">
            Send a line about what you&apos;d want to build (a link to your work
            beats a CV). We read everything and reply to real ones.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center">
        <div className="max-w-xl mx-auto px-6">
          <h2 className="font-[var(--font-fraunces)] font-black text-4xl mb-6">
            Curious first<span className="text-orange">?</span>
          </h2>
          <p className="text-ink/60 text-lg mb-8">
            Best way to get us is to use the thing we built.
          </p>
          <a
            href="https://app.onpini.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-ink text-cream font-black text-lg border-2 border-ink shadow-brutal hover:-translate-y-1 hover:shadow-brutal-md transition-all"
          >
            Try OnPini →
          </a>
        </div>
      </section>
    </>
  );
}
