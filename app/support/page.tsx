import Link from "next/link";

const faqs = [
  {
    q: "What is OnPini?",
    a: "A social network where your opinions are your profile. You answer “pinis” (quick takes on questions that matter) and connect with people through what you actually think.",
  },
  {
    q: "How does Pini Sync work?",
    a: "You and a friend answer the same deck of questions separately, then a reveal shows your takes side by side: where you align and where you’d argue. No score, no ranking, just a conversation starter.",
  },
  {
    q: "Is my data private?",
    a: "Your Pini Sync picks stay private until you both finish. We don’t sell your data. Full details are in our Privacy Policy (link below), and you can request your data or delete your account anytime.",
  },
  {
    q: "How do I delete my account?",
    a: "In the app: Settings → Account → Delete account. That removes your profile and associated data. You can also email us and we’ll handle it for you.",
  },
  {
    q: "How do I find people to play with?",
    a: "Add friends from your network, share a Pini Sync link with anyone (they don’t need an account to play), or get matched in a Circle around a topic you care about.",
  },
  {
    q: "Is OnPini free?",
    a: "Yes, OnPini is free during Early Access.",
  },
  {
    q: "Which devices does it work on?",
    a: "iOS, Android, and the web.",
  },
  {
    q: "How do I report a bug or something offensive?",
    a: "Email us at hello@onpini.com, or use the in-app report option on any pini, profile, or message. We read everything.",
  },
];

export default function Support() {
  return (
    <>
      {/* Hero */}
      <section className="border-b-[3px] border-ink py-20 relative overflow-hidden">
        <div className="absolute top-[-50px] right-[-50px] w-80 h-80 rounded-full bg-amber opacity-30 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber border-2 border-ink shadow-brutal-sm text-sm font-black uppercase tracking-widest mb-8">
            Support
          </div>
          <h1 className="font-[var(--font-fraunces)] font-black text-5xl md:text-6xl leading-[0.95] mb-6">
            Need a hand<span className="text-orange">?</span>
          </h1>
          <p className="text-xl text-ink/70 max-w-2xl leading-relaxed">
            Stuck, confused, or found a bug? We&apos;re a small team and we read every
            message. Reach out and we&apos;ll get back to you fast.
          </p>
        </div>
      </section>

      {/* Contact cards */}
      <section className="border-b-[3px] border-ink py-16">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
          <a
            href="mailto:hello@onpini.com?subject=OnPini%20support"
            className="bg-cream border-2 border-ink rounded-3xl p-7 shadow-brutal hover:-translate-y-1 hover:shadow-brutal-md transition-all"
          >
            <div className="text-3xl mb-3">✉️</div>
            <h2 className="font-[var(--font-fraunces)] font-black text-xl mb-1">Email us</h2>
            <p className="text-ink/60 text-sm leading-relaxed">
              hello@onpini.com for questions, account help, anything.
            </p>
          </a>
          <a
            href="mailto:hello@onpini.com?subject=Bug%20report"
            className="bg-peach border-2 border-ink rounded-3xl p-7 shadow-brutal hover:-translate-y-1 hover:shadow-brutal-md transition-all"
          >
            <div className="text-3xl mb-3">🐛</div>
            <h2 className="font-[var(--font-fraunces)] font-black text-xl mb-1">Report a problem</h2>
            <p className="text-ink/60 text-sm leading-relaxed">
              Hit a bug or something off? Tell us what happened and we&apos;ll fix it.
            </p>
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b-[3px] border-ink py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-[var(--font-fraunces)] font-black text-3xl mb-8">
            Common questions<span className="text-orange">.</span>
          </h2>
          <div className="space-y-3">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group bg-paper border-2 border-ink rounded-2xl shadow-brutal-sm overflow-hidden"
              >
                <summary className="cursor-pointer list-none px-5 py-4 flex items-center justify-between gap-3 font-black text-ink">
                  {f.q}
                  <span className="shrink-0 text-orange transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="px-5 pb-4 -mt-1 text-ink/70 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 text-center">
        <div className="max-w-xl mx-auto px-6">
          <h2 className="font-[var(--font-fraunces)] font-black text-3xl mb-4">
            Still stuck<span className="text-orange">?</span>
          </h2>
          <p className="text-ink/60 text-lg mb-8">
            Email us at{" "}
            <a href="mailto:hello@onpini.com" className="font-black underline decoration-orange decoration-2 underline-offset-2">
              hello@onpini.com
            </a>{" "}
            and a real human will reply.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-ink text-cream font-black text-lg border-2 border-ink shadow-brutal hover:-translate-y-1 hover:shadow-brutal-md active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
          >
            Back home
          </Link>
        </div>
      </section>
    </>
  );
}
