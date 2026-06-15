import Link from "next/link";

const team: {
  name: string;
  role: string;
  bio: string;
  emoji: string;
  bg: string;
}[] = [
  // Add team members here when ready
];

export default function Team() {
  return (
    <>
      {/* Hero */}
      <section className="border-b-[3px] border-ink py-20 relative overflow-hidden">
        <div className="absolute bottom-[-40px] right-[-40px] w-72 h-72 rounded-full bg-amber opacity-30 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-lilac border-2 border-ink shadow-brutal-sm text-sm font-black uppercase tracking-widest mb-8">
            The People
          </div>
          <h1 className="font-[var(--font-fraunces)] font-black text-5xl md:text-6xl leading-[0.95] mb-6">
            The humans behind<br />
            <span className="text-orange italic">the pinis.</span>
          </h1>
          <p className="text-xl text-ink/70 max-w-xl leading-relaxed">
            We&apos;re a small team with a big conviction: the world needs a social network built on what people actually think, not how they look.
          </p>
        </div>
      </section>

      {/* Team grid */}
      {team.length > 0 ? (
        <section className="border-b-[3px] border-ink py-20">
          <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member) => (
              <div
                key={member.name}
                className={`${member.bg} rounded-3xl border-2 border-ink p-8 shadow-brutal hover:-translate-y-1 hover:shadow-brutal-md transition-all`}
              >
                <div className="w-16 h-16 rounded-full bg-ink flex items-center justify-center text-2xl mb-5 shadow-brutal-sm">
                  {member.emoji}
                </div>
                <h3 className="font-[var(--font-fraunces)] font-black text-xl">{member.name}</h3>
                <p className="text-xs font-black uppercase tracking-widest text-ink/50 mb-3">{member.role}</p>
                <p className="text-ink/70 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>
      ) : (
        /* Honest small-team state — beats fake skeleton placeholders */
        <section className="border-b-[3px] border-ink py-20">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <div className="bg-cream border-2 border-ink rounded-3xl p-10 shadow-brutal">
              <div className="text-4xl mb-4">✊</div>
              <h2 className="font-[var(--font-fraunces)] font-black text-2xl mb-3">
                A small crew, heads down.
              </h2>
              <p className="text-ink/70 leading-relaxed mb-7">
                We&apos;re keeping it lean while we build. Faces and bios go up
                once the dust settles — for now, just know there are real humans
                behind every pini, and we&apos;re looking for a few more.
              </p>
              <Link
                href="/careers"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ink text-cream font-black border-2 border-ink shadow-brutal-sm hover:-translate-y-0.5 hover:shadow-brutal transition-all"
              >
                See open roles →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* We&apos;re hiring / join us */}
      <section className="border-b-[3px] border-ink py-20 bg-ink text-cream">
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <h2 className="font-[var(--font-fraunces)] font-black text-3xl md:text-4xl mb-4">
              We&apos;re building something real<span className="text-orange">.</span>
            </h2>
            <p className="text-cream/60 text-lg leading-relaxed max-w-lg">
              If you care about authentic social networks, opinion-driven design, or just have strong takes about how the internet should work — we want to hear from you.
            </p>
          </div>
          <div>
            <Link
              href="/careers"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber text-ink font-black border-2 border-amber shadow-brutal-orange hover:-translate-y-0.5 transition-all"
            >
              See open roles →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center">
        <div className="max-w-xl mx-auto px-6">
          <h2 className="font-[var(--font-fraunces)] font-black text-4xl mb-6">
            Try what we built<span className="text-orange">.</span>
          </h2>
          <a
            href="https://app.onpini.com"
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
