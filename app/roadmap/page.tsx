const shipped = [
  { label: "Core poll feed (Today screen)", desc: "Daily pinis, vote and see what your network thinks." },
  { label: "Pini Sync — live co-play", desc: "Answer the same deck in real time, then a side-by-side reveal." },
  { label: "Pini Sync — solo & share link", desc: "Create a frozen deck, share a link, get a guest to play." },
  { label: "Friend graph & DMs", desc: "Mutual connections, inbox, conversations." },
  { label: "Notifications & activity feed", desc: "See who voted on your pinis, who replied, who synced with you." },
  { label: "Circles (Groups)", desc: "Answer pinis together inside a private group." },
  { label: "Profile & take history", desc: "Your takes, your voting history, every pini you've made." },
  { label: "Early Access launch", desc: "iOS + Android, live to real users." },
];

const inProgress = [
  { label: "Pass pinis around", desc: "New ways to send a take to a friend and keep it moving." },
  { label: "Friends-first feed", desc: "More from the people close to you. No algorithm deciding for you." },
  { label: "Question of the Day", desc: "One question everyone answers — a shared daily moment." },
];

// Kept intentionally vague — direction, not a feature spec.
const upcoming = [
  { label: "Deeper Pini Sync", desc: "More ways to play, and more moments with the people who matter." },
  { label: "A daily reason to show up", desc: "Little rituals that make OnPini part of your day." },
  { label: "Find your people", desc: "Ways to discover minds beyond your circle." },
];

export default function Roadmap() {
  return (
    <>
      {/* Hero */}
      <section className="border-b-[3px] border-ink py-20 relative overflow-hidden">
        <div className="absolute top-[-60px] left-[-60px] w-80 h-80 rounded-full bg-amber opacity-30 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-highlight border-2 border-ink shadow-brutal-sm text-sm font-black uppercase tracking-widest mb-8">
            🗺 Building in Public
          </div>
          <h1 className="font-[var(--font-fraunces)] font-black text-5xl md:text-6xl leading-[0.95] mb-6">
            Where we&apos;re going<span className="text-orange">.</span>
          </h1>
          <p className="text-xl text-ink/70 max-w-2xl leading-relaxed">
            We build in public. This is the honest picture of what&apos;s shipped, what&apos;s being built right now, and what&apos;s coming next. Last updated June 2026.
          </p>
        </div>
      </section>

      {/* Shipped */}
      <section className="border-b-[3px] border-ink py-20 bg-ink text-cream">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-3 h-3 rounded-full bg-amber" />
            <h2 className="font-[var(--font-fraunces)] font-black text-3xl text-amber">
              Shipped
            </h2>
          </div>
          <div className="reveal space-y-3">
            {shipped.map((item) => (
              <div key={item.label} className="flex items-start gap-4 border border-cream/10 rounded-2xl p-5 hover:border-cream/30 transition-colors">
                <div className="w-5 h-5 rounded-full bg-amber flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-ink" fill="none" viewBox="0 0 12 12">
                    <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <p className="font-black text-cream">{item.label}</p>
                  <p className="text-cream/50 text-sm mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* In progress */}
      <section className="border-b-[3px] border-ink py-20 bg-amber">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-3 h-3 rounded-full bg-orange animate-pulse" />
            <h2 className="font-[var(--font-fraunces)] font-black text-3xl text-ink">
              In progress
            </h2>
          </div>
          <div className="reveal space-y-3">
            {inProgress.map((item) => (
              <div key={item.label} className="flex items-start gap-4 bg-paper border-2 border-ink rounded-2xl p-5 shadow-brutal-sm">
                <div className="w-5 h-5 rounded-full bg-orange border-2 border-ink flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-paper" />
                </div>
                <div>
                  <p className="font-black text-ink">{item.label}</p>
                  <p className="text-ink/60 text-sm mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming */}
      <section className="border-b-[3px] border-ink py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-3 h-3 rounded-full bg-ink/30" />
            <h2 className="font-[var(--font-fraunces)] font-black text-3xl text-ink">
              Coming next
            </h2>
          </div>
          <div className="reveal space-y-3">
            {upcoming.map((item) => (
              <div key={item.label} className="flex items-start gap-4 border-2 border-ink/20 rounded-2xl p-5 hover:border-ink/50 hover:bg-cream/50 transition-all">
                <div className="w-5 h-5 rounded-full border-2 border-ink/30 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-black text-ink">{item.label}</p>
                  <p className="text-ink/50 text-sm mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Build in public note */}
      <section className="py-20 text-center">
        <div className="max-w-xl mx-auto px-6">
          <div className="bg-peach border-2 border-ink rounded-3xl p-8 shadow-brutal">
            <div className="text-3xl mb-4">💬</div>
            <h3 className="font-[var(--font-fraunces)] font-black text-2xl mb-3">
              Have a feature idea?
            </h3>
            <p className="text-ink/70 mb-6 leading-relaxed">
              We&apos;re early access. Your feedback directly shapes what we build next. Reach out — we read everything.
            </p>
            <a
              href="mailto:hello@onpini.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ink text-cream font-black border-2 border-ink shadow-brutal-sm hover:-translate-y-0.5 hover:shadow-brutal transition-all"
            >
              Share feedback →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
