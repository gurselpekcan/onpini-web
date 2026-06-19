import Link from "next/link";
import Image from "next/image";
import PiniSyncDemo from "@/components/PiniSyncDemo";
import StoreBadges from "@/components/StoreBadges";
import HeroBackdrop from "@/components/HeroBackdrop";
import DeckMarquee from "@/components/DeckMarquee";
import PiniMarquee from "@/components/PiniMarquee";

const shots = [
  { src: "/screens/home.png", cap: "Your Today", alt: "OnPini home, your daily pini and the Pini Sync hub" },
  { src: "/screens/sync-question.png", cap: "Pini Sync, live", alt: "Two friends answering the same Pini Sync deck in real time" },
  { src: "/screens/feed.png", cap: "The opinion feed", alt: "A poll moving through the OnPini feed" },
  { src: "/screens/deck.png", cap: "Killer decks", alt: "A Pini Sync deck opening" },
];

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
    body: "You see what people close to you actually think, not what a feed algorithm decides.",
    bg: "bg-peach",
  },
  {
    emoji: "⚡",
    title: "Pini Sync",
    body: "Answer the same deck as a friend, then see every take side by side, where your minds click, and where you'd argue. No score.",
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
        <HeroBackdrop />

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
            are your profile. Connect with people who think like you, or don&apos;t.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm md:text-base font-bold text-ink/70">
            <span className="inline-flex items-center gap-1.5">🧠 Your takes, not your looks</span>
            <span className="text-ink/25" aria-hidden>•</span>
            <span className="inline-flex items-center gap-1.5">🔗 Friends, not followers</span>
            <span className="text-ink/25" aria-hidden>•</span>
            <span className="inline-flex items-center gap-1.5">🪞 No scores, no rankings</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://app.onpini.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full bg-ink text-cream font-black text-lg border-2 border-ink shadow-brutal hover:-translate-y-1 hover:shadow-brutal-md active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
            >
              Get Early Access →
            </a>
            <Link
              href="/about"
              className="px-8 py-4 rounded-full bg-cream font-black text-lg border-2 border-ink shadow-brutal hover:-translate-y-1 hover:shadow-brutal-md active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
            >
              Learn more
            </Link>
          </div>

          {/* Interactive Pini Sync demo, the flagship, playable right here */}
          <div className="mt-6 flex flex-col items-center gap-1">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-lilac border-2 border-ink shadow-brutal-sm text-xs font-black uppercase tracking-widest animate-wiggle">
              👇 Live demo · tap to play
            </span>
          </div>
          <PiniSyncDemo />
        </div>
      </section>

      {/* What people pini about — moving showcase of example poll formats */}
      <PiniMarquee />

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
          <div className="reveal text-center mb-16">
            <h2 className="font-[var(--font-fraunces)] font-black text-4xl md:text-5xl mb-4">
              How it works<span className="text-orange">.</span>
            </h2>
            <p className="text-ink/60 text-lg max-w-lg mx-auto">
              No algorithms. No vanity metrics. Just real opinions moving through real friendships.
            </p>
          </div>

          <div className="reveal grid grid-cols-1 md:grid-cols-2 gap-6">
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

      {/* See it for real */}
      <section className="border-b-[3px] border-ink py-24 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="reveal text-center mb-12">
            <h2 className="font-[var(--font-fraunces)] font-black text-4xl md:text-5xl mb-4">
              See it for real<span className="text-orange">.</span>
            </h2>
            <p className="text-ink/60 text-lg max-w-lg mx-auto">
              Not mockups, this is the actual app. Your takes, your syncs, your feed.
            </p>
          </div>
          <div className="reveal flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory md:flex-wrap md:justify-center md:overflow-visible">
            {shots.map((s) => (
              <figure key={s.src} className="shrink-0 snap-center w-[230px]">
                <div className="bg-ink rounded-[36px] p-2.5 border-4 border-ink shadow-brutal-lg">
                  <Image
                    src={s.src}
                    alt={s.alt}
                    width={1170}
                    height={2532}
                    sizes="230px"
                    className="rounded-[26px] w-full h-auto"
                  />
                </div>
                <figcaption className="text-center text-sm font-black text-ink/70 mt-3">{s.cap}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Deck marquee */}
      <DeckMarquee />

      {/* Pini Sync highlight */}
      <section className="border-b-[3px] border-ink py-24 bg-ink text-cream overflow-hidden relative">
        <div
          className="absolute top-[-40px] right-[-40px] w-72 h-72 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #fbbf24, #f97316)" }}
        />
        <div className="relative max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
          <div className="reveal flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber/40 text-amber text-xs font-black uppercase tracking-widest mb-6">
              ✦ Flagship Feature
            </div>
            <h2 className="font-[var(--font-fraunces)] font-black text-4xl md:text-5xl mb-6 leading-tight">
              Pini Sync<span className="text-orange">.</span>
            </h2>
            <p className="text-cream/70 text-lg leading-relaxed mb-8 max-w-md">
              You and a friend answer the same deck, separately. Then a reveal
              puts every take side by side: where your minds click, and where
              you&apos;d happily argue all night. No score. No ranking. The most
              honest conversation starter ever built.
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

          <div className="reveal flex-1 flex justify-center">
            <div className="bg-amber/10 border-2 border-cream/20 rounded-3xl p-7 max-w-xs w-full" style={{ boxShadow: "6px 6px 0 #fbbf24" }}>
              <p className="font-[var(--font-fraunces)] font-black text-2xl text-amber leading-tight">
                Two minds,<br />side by side.
              </p>
              <p className="text-cream/45 text-[11px] font-black uppercase tracking-widest mb-5">
                The reveal · no score
              </p>
              <div className="space-y-2.5">
                {[
                  { q: "Pineapple on pizza?", you: "Yes", sam: "Yes", aligned: true },
                  { q: "Night owl or early bird?", you: "Night owl", sam: "Night owl", aligned: true },
                  { q: "Logic over feelings?", you: "Logic", sam: "Feelings", aligned: false },
                ].map((item) => (
                  <div key={item.q} className="rounded-2xl bg-cream/5 border border-cream/15 p-2.5">
                    <div className="flex items-center justify-between gap-1.5">
                      <p className="text-[11px] font-bold text-cream/80 truncate">{item.q}</p>
                      <span
                        className={`shrink-0 px-1.5 py-0.5 rounded-full text-[8px] font-black ${
                          item.aligned ? "bg-amber text-ink" : "bg-lilac text-ink"
                        }`}
                      >
                        {item.aligned ? "🤝 same mind" : "⚡ great debate"}
                      </span>
                    </div>
                    <div className="mt-1.5 flex items-center gap-1.5 text-[9px] font-black">
                      <span className="px-2 py-0.5 rounded-full bg-orange text-cream">You · {item.you}</span>
                      <span className="px-2 py-0.5 rounded-full bg-cream/10 border border-cream/25 text-cream/70">Sam · {item.sam}</span>
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
        <div className="reveal max-w-2xl mx-auto px-6 text-center">
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

          <p className="text-xs font-black uppercase tracking-widest text-ink/40 mt-12 mb-4">
            Get the app
          </p>
          <StoreBadges className="justify-center" />
        </div>
      </section>
    </>
  );
}
