import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — OnPini",
  description:
    "How OnPini collects, uses, protects, and monetizes data — transparently, with your consent, and never by selling your identity or messages.",
};

const lastUpdated = "June 14, 2026";

const tldr = [
  "Your DMs and identity (name, email, phone) stay private. We never sell them.",
  "We turn opinions into aggregated, anonymized insights (never your individual profile) and that is part of how OnPini makes money.",
  "Anything sensitive (relationship, intimacy, money, the personality traits Pini Sync infers) is opt-in and only ever monetized in aggregate.",
  "You control consent anytime in Settings › Privacy, and you can export or delete your data whenever you want.",
];

type Section = { title: string; body: string[] };

const sections: Section[] = [
  {
    title: "1. Who we are",
    body: [
      "OnPini is operated by GPM Holding B.V., a company registered in the Netherlands (KVK 89817583). “OnPini”, “we”, “us” refer to that entity. For data-protection law (GDPR), GPM Holding B.V. is the data controller.",
      "This policy explains what we collect, why, who we share it with, how we make money from data without selling you out, and the rights you have over all of it.",
    ],
  },
  {
    title: "2. Information we collect",
    body: [
      "Information you give us: your username, email, profile details, and the things you post: the pinis you drop, your votes and reactions, comments, and the answers you give inside Pini Sync.",
      "Information from using OnPini: app events and interactions (which screens you open, what you tap, how long a session lasts), device and crash information, and your approximate region.",
      "Location: if you enable Radar, we use your location to show nearby activity. You can turn this off in your device settings at any time.",
      "We do not read or scan the content of your direct messages.",
    ],
  },
  {
    title: "3. Sensitive and special-category data",
    body: [
      "Some OnPini features, especially Pini Sync, ask about relationships, intimacy, money, and values, and we infer personality signals (for example how someone leans on loyalty, honesty, or attachment) to make the experience feel personal. Under GDPR some of this counts as special-category data.",
      "We treat it accordingly. Inferred personality and relationship signals are used to personalize your experience, and we ask for your explicit, separate consent before using them for anything beyond running the app.",
      "We never sell or share this sensitive data at an individual level. If it ever informs a partner insight, it does so only in aggregated, anonymized form that cannot be traced back to you. You can withdraw this consent at any time in Settings › Privacy.",
    ],
  },
  {
    title: "4. How we use your data",
    body: [
      "To run OnPini: build your feed, surface people and topics you care about, fight spam and abuse, send notifications, and improve the product.",
      "Pini Sync never produces a compatibility score or ranking. It shows your answers and a friend's side by side, where you align and where you'd argue. There is no “match percentage.”",
      "With your consent, we use limited signals to show more relevant ads inside the app, and we use aggregated patterns to understand what the OnPini community thinks.",
    ],
  },
  {
    title: "5. Sharing and monetization",
    body: [
      "Opinion data is valuable, and we are direct about that. Here is exactly where the line sits.",
      "We never sell your direct messages or your identifying information (name, email, phone, exact location).",
      "We do share aggregated, anonymized insights with research and brand partners, for example “50% of users picked option A.” Every shared insight is built from a minimum number of responses so it can never single you out.",
      "With your consent, we share limited advertising signals with ad partners. Under laws like CCPA/CPRA, some of this may be classified as a “sale” or “share,” and you can opt out anytime via Settings › Privacy.",
      "We also share data with the service providers that help us run OnPini (see Analytics and providers below), under contracts that limit them to working on our behalf.",
    ],
  },
  {
    title: "6. Analytics and providers",
    body: [
      "We measure how OnPini is used so we can make it better. Product analytics are processed through PostHog and our own servers. These record events and interactions, not the content of your messages.",
      "We use additional trusted providers for hosting, infrastructure, crash reporting, and push notifications. Each is bound by contract to protect your data and use it only to provide their service to us.",
      "Analytics and personalization are governed by your consent choices in Settings › Privacy. Turning a category off stops that processing.",
    ],
  },
  {
    title: "7. Your choices and rights",
    body: [
      "You can edit your profile, manage cookie and ad consent, opt out of personalized ads, withdraw consent for sensitive-data processing, request a copy of your data, or delete your account at any time from Settings › Privacy.",
      "EU/UK users have GDPR rights: access, rectification, erasure, portability, restriction, and objection. Where we rely on consent, you can withdraw it at any time.",
      "California residents have CCPA/CPRA rights, including “Do Not Sell or Share My Personal Information” and the right not to be discriminated against for exercising them.",
    ],
  },
  {
    title: "8. Data retention",
    body: [
      "We keep your account data while your account is active. When you delete your account, we purge your personal data within 30 days, except where we are legally required to keep it (for example fraud, abuse, or financial records).",
      "Aggregated, anonymized insights that can no longer identify you may be retained, because they are no longer personal data.",
    ],
  },
  {
    title: "9. Children's privacy",
    body: [
      "OnPini is for users 13 and older. We do not knowingly collect data from children under 13. If you believe a child has signed up, email privacy@onpini.com and we will remove the account.",
    ],
  },
  {
    title: "10. Data security",
    body: [
      "We use industry-standard encryption in transit and at rest, along with access controls. Direct messages are encrypted end-to-end where supported. No system is perfectly secure, but we work hard to protect you.",
    ],
  },
  {
    title: "11. International transfers",
    body: [
      "OnPini operates internationally, so your data may be processed outside your home country. Where we transfer personal data out of the EEA or UK, we rely on appropriate safeguards such as the European Commission's Standard Contractual Clauses.",
    ],
  },
  {
    title: "12. Changes to this policy",
    body: [
      "We will update this policy as OnPini evolves. When we make material changes, we will let you know in the app or by email before they take effect.",
    ],
  },
  {
    title: "13. Contact",
    body: [
      "Questions, requests, or concerns? Email privacy@onpini.com. EU/UK users may also reach our Data Protection Officer at dpo@onpini.com.",
      "GPM Holding B.V., Netherlands · KVK 89817583.",
    ],
  },
];

export default function Privacy() {
  return (
    <>
      {/* Hero */}
      <section className="border-b-[3px] border-ink py-20 relative overflow-hidden">
        <div className="absolute top-[-50px] right-[-50px] w-80 h-80 rounded-full bg-lilac opacity-30 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber border-2 border-ink shadow-brutal-sm text-sm font-black uppercase tracking-widest mb-8">
            Privacy
          </div>
          <h1 className="font-[var(--font-fraunces)] font-black text-5xl md:text-6xl leading-[0.95] mb-6">
            Your opinions are gold<span className="text-orange">.</span> We treat them that way<span className="text-orange">.</span>
          </h1>
          <p className="text-xl text-ink/70 max-w-2xl leading-relaxed">
            Most apps bury how they make money from your data. We are not going to.
            Here is exactly what we collect, what we never touch, and how consent puts you in control.
          </p>
          <p className="text-sm text-ink/50 mt-6 font-bold uppercase tracking-widest">
            Last updated {lastUpdated}
          </p>
        </div>
      </section>

      {/* TL;DR */}
      <section className="border-b-[3px] border-ink py-16 bg-amber/40">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-[var(--font-fraunces)] font-black text-2xl mb-6">
            The short version<span className="text-orange">.</span>
          </h2>
          <ul className="space-y-3">
            {tldr.map((t) => (
              <li
                key={t}
                className="bg-cream border-2 border-ink rounded-2xl shadow-brutal-sm px-5 py-4 flex gap-3 font-bold text-ink"
              >
                <span className="text-orange shrink-0">→</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Sections */}
      <section className="border-b-[3px] border-ink py-16">
        <div className="max-w-3xl mx-auto px-6 space-y-10">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="font-[var(--font-fraunces)] font-black text-2xl mb-3">
                {s.title}
              </h2>
              <div className="space-y-3">
                {s.body.map((p, i) => (
                  <p key={i} className="text-ink/75 leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 text-center">
        <div className="max-w-xl mx-auto px-6">
          <h2 className="font-[var(--font-fraunces)] font-black text-3xl mb-4">
            Questions about your data<span className="text-orange">?</span>
          </h2>
          <p className="text-ink/60 text-lg mb-8">
            Email{" "}
            <a href="mailto:privacy@onpini.com" className="font-black underline decoration-orange decoration-2 underline-offset-2">
              privacy@onpini.com
            </a>{" "}
            and a real human will reply.
          </p>
          <Link
            href="/support"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-ink text-cream font-black text-lg border-2 border-ink shadow-brutal hover:-translate-y-1 hover:shadow-brutal-md active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
          >
            Visit Support
          </Link>
        </div>
      </section>
    </>
  );
}
