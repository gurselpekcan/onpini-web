import Link from "next/link";

// NOTE TO OWNER: everything here is real and shippable. When you have them,
// add the facts we intentionally left as "on request": founder name(s) + bio,
// founding year, HQ/location, and hi-res product screenshots. Search "on request".

const facts = [
  { k: "Tagline", v: "Swipe minds, not faces." },
  { k: "What it is", v: "A social network where your opinions are your profile." },
  { k: "Flagship feature", v: "Pini Sync, answer a deck with a friend, reveal your takes side by side." },
  { k: "Platforms", v: "iOS + Android" },
  { k: "Stage", v: "Early Access" },
  { k: "Press contact", v: "hello@onpini.com" },
];

const palette = [
  { name: "Ink", hex: "#1a1a1a", text: "text-cream" },
  { name: "Cream", hex: "#fef3c7", text: "text-ink" },
  { name: "Amber", hex: "#fbbf24", text: "text-ink" },
  { name: "Orange", hex: "#f97316", text: "text-cream" },
  { name: "Peach", hex: "#fecaca", text: "text-ink" },
  { name: "Lilac", hex: "#ddd6fe", text: "text-ink" },
];

export default function Press() {
  return (
    <>
      {/* Hero */}
      <section className="border-b-[3px] border-ink py-20 relative overflow-hidden">
        <div className="absolute top-[-50px] right-[-50px] w-80 h-80 rounded-full bg-amber opacity-30 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-highlight border-2 border-ink shadow-brutal-sm text-sm font-black uppercase tracking-widest mb-8">
            For Press
          </div>
          <h1 className="font-[var(--font-fraunces)] font-black text-5xl md:text-6xl leading-[0.95] mb-6">
            Press &amp; brand kit<span className="text-orange">.</span>
          </h1>
          <p className="text-xl text-ink/70 max-w-2xl leading-relaxed">
            Everything you need to write about OnPini, the story, the facts, the
            logos and colours. Need something that isn&apos;t here? Email{" "}
            <a href="mailto:hello@onpini.com?subject=Press%20enquiry" className="font-black underline decoration-orange decoration-2 underline-offset-2">
              hello@onpini.com
            </a>{" "}
            and we&apos;ll get it to you fast.
          </p>
        </div>
      </section>

      {/* Boilerplate */}
      <section className="border-b-[3px] border-ink py-20 bg-ink text-cream">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-[var(--font-fraunces)] font-black text-3xl text-amber mb-8">
            Boilerplate<span className="text-orange">.</span>
          </h2>

          <p className="text-xs font-black uppercase tracking-widest text-cream/40 mb-2">
            One-liner
          </p>
          <div className="border border-cream/15 rounded-2xl p-5 mb-8 text-cream/90 leading-relaxed select-all">
            OnPini is a social network where your opinions, not your photos, are
            your profile.
          </div>

          <p className="text-xs font-black uppercase tracking-widest text-cream/40 mb-2">
            Short paragraph
          </p>
          <div className="border border-cream/15 rounded-2xl p-5 text-cream/90 leading-relaxed select-all">
            OnPini flips the social model. Instead of a follower graph built on
            photos and vanity metrics, it&apos;s a friend graph built on what you
            actually think. You answer &ldquo;pini&apos;s&rdquo;, quick takes on
            questions that matter, and connect with people through shared (and
            clashing) opinions. Its flagship feature, Pini Sync, lets two friends
            answer the same deck separately, then see their takes side by side:
            no score, no ranking, just the most honest conversation starter on
            the internet.
          </div>
          <p className="text-cream/40 text-xs mt-3">Tip: both blocks are click-to-select.</p>
        </div>
      </section>

      {/* Fast facts */}
      <section className="border-b-[3px] border-ink py-20 bg-amber">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-[var(--font-fraunces)] font-black text-3xl text-ink mb-8">
            Fast facts<span className="text-orange">.</span>
          </h2>
          <div className="reveal grid grid-cols-1 sm:grid-cols-2 gap-4">
            {facts.map((f) => (
              <div key={f.k} className="bg-paper border-2 border-ink rounded-2xl p-5 shadow-brutal-sm">
                <p className="text-xs font-black uppercase tracking-widest text-ink/50 mb-1">{f.k}</p>
                <p className="font-bold text-ink leading-snug">{f.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand assets */}
      <section className="border-b-[3px] border-ink py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-[var(--font-fraunces)] font-black text-3xl text-ink mb-8">
            Logos &amp; colours<span className="text-orange">.</span>
          </h2>

          {/* Logos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            <div className="bg-cream border-2 border-ink rounded-3xl p-8 shadow-brutal flex flex-col items-center gap-5">
              <div className="flex items-center gap-2 font-[var(--font-fraunces)] font-black text-3xl">
                <span className="w-3.5 h-3.5 rounded-full bg-orange inline-block" />
                OnPini
              </div>
              <a
                href="/press/onpini-wordmark.svg"
                download
                className="px-5 py-2.5 rounded-full bg-ink text-cream text-sm font-black border-2 border-ink shadow-brutal-sm hover:-translate-y-0.5 hover:shadow-brutal transition-all"
              >
                Download wordmark (SVG)
              </a>
            </div>
            <div className="bg-ink border-2 border-ink rounded-3xl p-8 shadow-brutal flex flex-col items-center gap-5">
              <div className="w-12 h-12 rounded-full bg-orange" />
              <a
                href="/press/onpini-mark.svg"
                download
                className="px-5 py-2.5 rounded-full bg-amber text-ink text-sm font-black border-2 border-amber shadow-brutal-orange hover:-translate-y-0.5 transition-all"
              >
                Download mark (SVG)
              </a>
            </div>
          </div>

          {/* Colours */}
          <p className="text-xs font-black uppercase tracking-widest text-ink/50 mb-3">Brand palette</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {palette.map((c) => (
              <div key={c.name} className="rounded-2xl border-2 border-ink overflow-hidden shadow-brutal-sm">
                <div className={`h-20 flex items-end p-2 ${c.text}`} style={{ backgroundColor: c.hex }}>
                  <span className="text-xs font-black">{c.name}</span>
                </div>
                <div className="bg-paper px-2 py-1.5 text-[11px] font-bold text-ink/70 select-all">{c.hex}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* On request */}
      <section className="border-b-[3px] border-ink py-20 bg-lilac">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-[var(--font-fraunces)] font-black text-3xl text-ink mb-8">
            Available on request<span className="text-orange">.</span>
          </h2>
          <div className="reveal grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { t: "Founder interviews & bios", d: "Happy to put you in touch and share headshots." },
              { t: "Hi-res product screenshots", d: "App stills and the Pini Sync reveal, full resolution." },
              { t: "Demo access", d: "A guided walkthrough or a sandbox login for review." },
            ].map((x) => (
              <div key={x.t} className="bg-paper border-2 border-ink rounded-2xl p-5 shadow-brutal-sm">
                <p className="font-black text-ink mb-1">{x.t}</p>
                <p className="text-ink/60 text-sm leading-relaxed">{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24 text-center">
        <div className="max-w-xl mx-auto px-6">
          <h2 className="font-[var(--font-fraunces)] font-black text-4xl mb-6">
            Working on a story<span className="text-orange">?</span>
          </h2>
          <p className="text-ink/60 text-lg mb-8">
            We reply to press fast, and we love a good question.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:hello@onpini.com?subject=Press%20enquiry"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-ink text-cream font-black text-lg border-2 border-ink shadow-brutal hover:-translate-y-1 hover:shadow-brutal-md transition-all"
            >
              Email press →
            </a>
            <Link
              href="/about"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-cream font-black text-lg border-2 border-ink shadow-brutal hover:-translate-y-1 hover:shadow-brutal-md transition-all"
            >
              Read our story
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
