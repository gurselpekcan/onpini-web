import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — OnPini",
  description:
    "How OnPini looks after your data, in plain language: what we collect, what stays completely private, and the simple controls you have over all of it.",
};

const lastUpdated = "June 19, 2026";

const tldr = [
  "Your private messages and who you are (name, email, phone) stay private. We never sell them. Full stop.",
  "The broad patterns in what people pick — always grouped together and stripped of names — help us improve OnPini and keep it free to use.",
  "Anything personal (relationships, values, the vibe Pini Sync picks up) is yours. We only ever use it beyond your own experience if you say yes first.",
  "You stay in control. Adjust anything in Settings › Privacy, and export or remove your data whenever you like.",
];

type Section = { title: string; body: string[] };

const sections: Section[] = [
  {
    title: "1. Who we are",
    body: [
      "OnPini is made by GPM Holding B.V., a company registered in the Netherlands (KVK 89817583). When this policy says “OnPini”, “we”, or “us”, that is who we mean. For European data-protection law, GPM Holding B.V. is the data controller.",
      "We wrote this the way we would explain it to a friend: what we collect, why, who we ever share things with, and the controls you have. No fine print games.",
    ],
  },
  {
    title: "2. What we collect",
    body: [
      "The things you give us: your username, email, profile details, and the things you create — the pinis you drop, your votes and reactions, comments, and the answers you give inside Pini Sync.",
      "The basics of how you use the app: which screens you open, what you tap, and how long a visit lasts, plus device and crash information and your approximate region. This is what lets us spot what is working and fix what is not.",
      "Location, only if you turn on Radar: we use it to show nearby activity, and you can switch it off in your device settings whenever you want.",
      "One thing we want to be clear about: we do not read or scan the contents of your direct messages.",
    ],
  },
  {
    title: "3. The personal stuff, handled with care",
    body: [
      "Some Pini Sync decks get personal — relationships, intimacy, values — and the app picks up on the vibe of your answers to make the experience feel like yours. Under European law, some of this is treated as a special, more protected kind of information, and we treat it that way too.",
      "Here is the simple version: we use it to give you your own experience, and that is it — unless you specifically tell us otherwise. Before any of it is ever used beyond your own experience, we ask you separately and clearly, and the answer stays no until you say yes.",
      "We never hand this kind of information to anyone in a way that points back to you. If it ever helps shape a broader, grouped insight, it does so only after being combined with many other people and stripped of anything identifying. You can change your mind anytime in Settings › Privacy.",
    ],
  },
  {
    title: "4. How we use what we collect",
    body: [
      "To run OnPini: build your feed, surface people and topics you might like, keep spam and bad actors out, send the notifications you ask for, and keep making the app better.",
      "A quick note on Pini Sync: it never gives you a compatibility score or a ranking. It simply shows your answers next to a friend’s — where you line up and where you would happily argue. There is no “match percentage.”",
      "With your permission, we use a few signals to make the ads inside the app feel more relevant than random, and we look at broad, grouped patterns to understand what the OnPini community is thinking.",
    ],
  },
  {
    title: "5. Keeping OnPini running and free",
    body: [
      "Running a social network costs real money, and we would rather be open about how we cover that than tuck it away somewhere you would never look.",
      "First, the things we will never do: we will never sell your direct messages, and we will never sell your identifying details (your name, email, phone, or exact location). Those are yours.",
      "What we do share is the bigger picture — aggregated, anonymized insights, like “half of voters leaned one way,” shared with research and brand partners who help support OnPini. Every one of these is built from enough responses that it could never be traced back to any single person.",
      "With your permission, we also share limited advertising signals with partners so the ads you see are more relevant. Some privacy laws (such as California’s CCPA/CPRA) describe certain kinds of this sharing using specific legal terms, and you will always find a clear way to opt out — see “Your choices” below.",
      "We also rely on a handful of trusted providers to keep the lights on (see “The help we rely on”), each held to contracts that limit them to working on our behalf.",
    ],
  },
  {
    title: "6. The help we rely on",
    body: [
      "To understand how OnPini is used so we can keep improving it, we work with product-analytics tools, including PostHog, alongside our own servers. These record actions and interactions within the app, never the contents of your messages.",
      "We also use trusted providers for hosting, infrastructure, crash reporting, and notifications. Each is bound by contract to protect your information and use it only to provide their service to us.",
      "What flows to any of this is governed by the choices you make in Settings › Privacy. Switch a category off and that processing stops.",
    ],
  },
  {
    title: "7. Your choices",
    body: [
      "You can edit your profile, manage cookie and ad preferences, opt out of personalized ads, change your mind on the personal-topics setting, ask for a copy of your data, or close your account at any time from Settings › Privacy.",
      "In the EU and UK you have full GDPR rights: access, correction, deletion, portability, restriction, and objection. Where we rely on your permission, you can withdraw it at any point.",
      "If you are in California, you have CCPA/CPRA rights, including the option labeled “Do Not Sell or Share My Personal Information,” and the right not to be treated differently for using any of these choices.",
    ],
  },
  {
    title: "8. How long we keep things",
    body: [
      "We hold on to your account information while your account is active. When you close it, we remove your personal data within 30 days, apart from the few things the law requires us to keep for a while (for example, records tied to fraud, abuse, or finances).",
      "Grouped, anonymized insights that can no longer identify you may stay with us, since at that point they are no longer personal information.",
    ],
  },
  {
    title: "9. Younger users",
    body: [
      "OnPini is for people 13 and older. We do not knowingly collect information from children under 13. If you think a child has signed up, email privacy@onpini.com and we will take care of it.",
    ],
  },
  {
    title: "10. Keeping your data safe",
    body: [
      "We use up-to-date encryption while your data travels and while it rests, along with access controls. Direct messages are end-to-end encrypted where supported. No system is ever perfectly secure, but protecting you is something we take seriously every day.",
    ],
  },
  {
    title: "11. Where your data lives",
    body: [
      "OnPini works across borders, so your information may be handled outside your home country. When we move personal data out of the EEA or UK, we rely on recognized safeguards such as the European Commission’s Standard Contractual Clauses.",
    ],
  },
  {
    title: "12. Updates to this policy",
    body: [
      "OnPini will keep growing, and this policy will grow with it. Whenever we make a meaningful change, we will let you know in the app or by email before it takes effect, so nothing happens behind your back.",
    ],
  },
  {
    title: "13. Talk to us",
    body: [
      "Questions, requests, or anything on your mind? Email privacy@onpini.com. In the EU or UK, you can also reach our Data Protection Officer at dpo@onpini.com.",
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
            Your data, in plain language<span className="text-orange">.</span>
          </h1>
          <p className="text-xl text-ink/70 max-w-2xl leading-relaxed">
            No jargon, no surprises. Here is what we collect, what stays
            completely private, and the simple controls you have over all of it.
            Take your time, or skip to the short version just below.
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
