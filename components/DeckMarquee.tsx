// Real decks from the production killer decks — breadth + "which would I play?"
const decks = [
  { t: "Pick Up At 3AM", e: "🚨", c: "Friends", bg: "bg-amber" },
  { t: "Situationship Court", e: "💘", c: "Love & dating", bg: "bg-peach" },
  { t: "The Ex Files", e: "💔", c: "Love & dating", bg: "bg-lilac" },
  { t: "The Loyalty Test", e: "🤝", c: "Friends", bg: "bg-highlight" },
  { t: "Money Where Your Mouth Is", e: "💰", c: "Money", bg: "bg-amber" },
  { t: "The Honest Mirror", e: "🪞", c: "Mental health", bg: "bg-peach" },
  { t: "Group Chat Confessions", e: "💬", c: "Friends", bg: "bg-lilac" },
  { t: "Job Offer From Hell", e: "💼", c: "Work", bg: "bg-highlight" },
  { t: "Travel Together, Stay Together?", e: "✈️", c: "Travel", bg: "bg-amber" },
  { t: "Foodie or Fraud", e: "🍕", c: "Food", bg: "bg-peach" },
  { t: "The Petty Olympics", e: "😤", c: "Spicy & random", bg: "bg-lilac" },
  { t: "First Date Autopsy", e: "🍷", c: "Love & dating", bg: "bg-highlight" },
];

export default function DeckMarquee() {
  return (
    <section className="border-b-[3px] border-ink py-20 overflow-hidden">
      <div className="reveal max-w-6xl mx-auto px-6 text-center mb-10">
        <h2 className="font-[var(--font-fraunces)] font-black text-4xl md:text-5xl mb-4">
          A deck for every kind of person<span className="text-orange">.</span>
        </h2>
        <p className="text-ink/60 text-lg max-w-lg mx-auto">
          From your ride-or-die to your situationship. Pick a vibe, challenge anyone.
        </p>
      </div>

      <div className="marquee-mask group relative">
        <div className="flex gap-4 w-max animate-marquee group-hover:[animation-play-state:paused] px-2">
          {[...decks, ...decks].map((d, i) => (
            <div
              key={i}
              aria-hidden={i >= decks.length}
              className={`${d.bg} shrink-0 w-56 rounded-3xl border-2 border-ink p-5 shadow-brutal`}
            >
              <div className="text-3xl mb-3">{d.e}</div>
              <p className="font-[var(--font-fraunces)] font-black text-lg leading-tight text-ink">{d.t}</p>
              <p className="text-[11px] font-black uppercase tracking-widest text-ink/50 mt-2">{d.c}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
