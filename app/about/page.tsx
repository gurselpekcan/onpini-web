export default function About() {
  return (
    <>
      {/* Hero */}
      <section className="border-b-[3px] border-ink py-20 relative overflow-hidden">
        <div className="absolute top-[-60px] right-[-60px] w-80 h-80 rounded-full bg-lilac opacity-40 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-peach border-2 border-ink shadow-brutal-sm text-sm font-black uppercase tracking-widest mb-8">
            Our Story
          </div>
          <h1 className="font-[var(--font-fraunces)] font-black text-5xl md:text-6xl leading-[0.95] mb-8">
            Built on a simple bet<span className="text-orange">.</span>
          </h1>
          <p className="text-xl text-ink/70 max-w-2xl leading-relaxed">
            Every social network asks the same question: <em>who are you?</em> And every one of them answers it the same way, a photo, a bio, a follower count. We think that&apos;s wrong. Who you are is what you think. What you believe. What you&apos;d argue for at 2am.
          </p>
        </div>
      </section>

      {/* The problem */}
      <section className="border-b-[3px] border-ink py-20 bg-ink text-cream">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-[var(--font-fraunces)] font-black text-3xl md:text-4xl mb-8">
            Social networks got it wrong<span className="text-orange">.</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "They optimise for attention",
                body: "Algorithms surface content that keeps you scrolling, not content that actually matters to you.",
              },
              {
                title: "They reward performance",
                body: "You curate yourself. The real you, your unpopular opinions, your hot takes, gets filtered out.",
              },
              {
                title: "They build audiences, not friendships",
                body: "Follower graphs are asymmetric by design. That's not how real relationships work.",
              },
              {
                title: "They don't tell you who thinks like you",
                body: "You find out someone agrees with you by accident, years in. That's a missed connection.",
              },
            ].map((item) => (
              <div key={item.title} className="border border-cream/20 rounded-2xl p-6">
                <h3 className="font-black text-lg mb-2 text-amber">{item.title}</h3>
                <p className="text-cream/60 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The answer */}
      <section className="border-b-[3px] border-ink py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-[var(--font-fraunces)] font-black text-3xl md:text-4xl mb-6">
            So we built OnPini<span className="text-orange">.</span>
          </h2>
          <div className="space-y-8">
            <p className="text-lg text-ink/70 leading-relaxed max-w-2xl">
              OnPini flips the model. Your pini&apos;s, your takes on questions that matter, <em>are</em> your profile. Not a curated highlight reel. Your actual positions.
            </p>
            <p className="text-lg text-ink/70 leading-relaxed max-w-2xl">
              We use a friend graph, not a follower graph. Connections are mutual. You see what people close to you actually think. And you discover new people through shared takes, not shared aesthetics.
            </p>
            <p className="text-lg text-ink/70 leading-relaxed max-w-2xl">
              Pini Sync, our flagship feature, is the most honest conversation starter ever built. You and a friend answer the same deck separately, then a cinematic reveal shows your match. No gaming it. No performance. Just alignment, or the beautiful lack of it.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-b-[3px] border-ink py-20 bg-amber">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-[var(--font-fraunces)] font-black text-3xl md:text-4xl mb-12 text-center">
            What we believe<span className="text-orange">.</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                emoji: "🎯",
                title: "Authenticity over performance",
                body: "We design for real takes, not viral ones. Hot takes that you'd actually defend.",
              },
              {
                emoji: "🤝",
                title: "Friendship over followership",
                body: "Mutual connection is the unit of the network. Not reach. Not influence.",
              },
              {
                emoji: "🚢",
                title: "Ship fast, stay honest",
                body: "We're building in public. Early access means you shape what this becomes.",
              },
            ].map((v) => (
              <div key={v.title} className="bg-paper rounded-3xl border-2 border-ink p-6 shadow-brutal">
                <div className="text-3xl mb-3">{v.emoji}</div>
                <h3 className="font-[var(--font-fraunces)] font-black text-lg mb-2">{v.title}</h3>
                <p className="text-ink/70 text-sm leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center">
        <div className="max-w-xl mx-auto px-6">
          <h2 className="font-[var(--font-fraunces)] font-black text-4xl mb-6">
            Be part of the bet<span className="text-orange">.</span>
          </h2>
          <p className="text-ink/60 text-lg mb-8">
            Early access is live. Your takes are waiting.
          </p>
          <a
            href="https://web.onpini.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-ink text-cream font-black text-lg border-2 border-ink shadow-brutal hover:-translate-y-1 hover:shadow-brutal-md transition-all"
          >
            Get Early Access →
          </a>
        </div>
      </section>
    </>
  );
}
