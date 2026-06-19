// A moving showcase of example poll cards — the site's "what would I even do
// here?" answer. Motion makes it feel alive; the cards are clearly framed as
// examples (header copy, no "live" badge, no fake counts) so it stays honest.
// Each card is a real OnPini format, so the belt doubles as a format tour.

type Bar = { label: string; pct: number };

type Card =
  | { type: "duel"; emoji: string; q: string; a: Bar; b: Bar; bg: string }
  | { type: "rate"; emoji: string; q: string; stars: number; avg: string; bg: string }
  | { type: "hot"; emoji: string; q: string; agree: number; bg: string }
  | { type: "pick"; emoji: string; q: string; options: Bar[]; bg: string };

const FORMAT_LABEL: Record<Card["type"], string> = {
  duel: "Duel",
  rate: "Rate",
  hot: "Hot Take",
  pick: "Pick",
};

const rowOne: Card[] = [
  { type: "duel", emoji: "🏆", q: "World Cup final: Argentina vs France?", a: { label: "Argentina", pct: 58 }, b: { label: "France", pct: 42 }, bg: "bg-amber" },
  { type: "rate", emoji: "📺", q: "Rate the season finale", stars: 4, avg: "4.1", bg: "bg-peach" },
  { type: "hot", emoji: "🍕", q: "Pineapple on pizza is a crime.", agree: 47, bg: "bg-lilac" },
  { type: "pick", emoji: "🎬", q: "Best Nolan film?", options: [{ label: "Inception", pct: 38 }, { label: "Interstellar", pct: 34 }, { label: "The Dark Knight", pct: 28 }], bg: "bg-highlight" },
  { type: "duel", emoji: "📱", q: "iPhone vs Android?", a: { label: "iPhone", pct: 51 }, b: { label: "Android", pct: 49 }, bg: "bg-amber" },
  { type: "rate", emoji: "🎧", q: "Rate that plot twist", stars: 5, avg: "4.6", bg: "bg-peach" },
];

const rowTwo: Card[] = [
  { type: "hot", emoji: "🏠", q: "Remote work beats the office.", agree: 68, bg: "bg-lilac" },
  { type: "duel", emoji: "⚽", q: "Messi vs Ronaldo: the GOAT?", a: { label: "Messi", pct: 62 }, b: { label: "Ronaldo", pct: 38 }, bg: "bg-highlight" },
  { type: "rate", emoji: "💿", q: "Rate the new album", stars: 3, avg: "3.4", bg: "bg-amber" },
  { type: "pick", emoji: "🌙", q: "Friday night, honestly?", options: [{ label: "Stay in", pct: 41 }, { label: "Dinner out", pct: 37 }, { label: "Big night", pct: 22 }], bg: "bg-peach" },
  { type: "duel", emoji: "☕", q: "Coffee vs tea?", a: { label: "Coffee", pct: 55 }, b: { label: "Tea", pct: 45 }, bg: "bg-lilac" },
  { type: "hot", emoji: "🧦", q: "Socks with sandals, ever?", agree: 19, bg: "bg-highlight" },
];

function FormatChip({ type }: { type: Card["type"] }) {
  return (
    <span className="shrink-0 px-2 py-0.5 rounded-full bg-ink text-cream text-[9px] font-black uppercase tracking-widest">
      {FORMAT_LABEL[type]}
    </span>
  );
}

function BarRow({ bar, lead }: { bar: Bar; lead?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`w-20 shrink-0 text-[11px] font-black truncate ${lead ? "text-ink" : "text-ink/55"}`}>{bar.label}</span>
      <span className="flex-1 h-2.5 rounded-full bg-ink/15 overflow-hidden">
        <span className={`block h-full rounded-full ${lead ? "bg-ink" : "bg-ink/40"}`} style={{ width: `${bar.pct}%` }} />
      </span>
      <span className={`w-8 shrink-0 text-right text-[11px] font-black ${lead ? "text-ink" : "text-ink/55"}`}>{bar.pct}%</span>
    </div>
  );
}

function PiniCard({ card }: { card: Card }) {
  return (
    <div className={`${card.bg} shrink-0 w-72 rounded-3xl border-2 border-ink p-5 shadow-brutal flex flex-col`}>
      <div className="flex items-start justify-between gap-2 mb-3">
        <span className="text-3xl leading-none">{card.emoji}</span>
        <FormatChip type={card.type} />
      </div>
      <p className="font-[var(--font-fraunces)] font-black text-lg leading-tight text-ink mb-4 min-h-[3.25rem]">
        {card.q}
      </p>

      {card.type === "duel" && (
        <div className="space-y-2 mt-auto">
          <BarRow bar={card.a} lead={card.a.pct >= card.b.pct} />
          <BarRow bar={card.b} lead={card.b.pct > card.a.pct} />
        </div>
      )}

      {card.type === "pick" && (
        <div className="space-y-2 mt-auto">
          {card.options.map((o, i) => (
            <BarRow key={o.label} bar={o} lead={i === 0} />
          ))}
        </div>
      )}

      {card.type === "hot" && (
        <div className="space-y-2 mt-auto">
          <BarRow bar={{ label: "Agree", pct: card.agree }} lead={card.agree >= 50} />
          <BarRow bar={{ label: "Disagree", pct: 100 - card.agree }} lead={card.agree < 50} />
        </div>
      )}

      {card.type === "rate" && (
        <div className="mt-auto flex items-center gap-2">
          <span className="text-xl tracking-tight" aria-hidden>
            {"★".repeat(card.stars)}
            <span className="text-ink/25">{"★".repeat(5 - card.stars)}</span>
          </span>
          <span className="text-[11px] font-black text-ink/60">avg {card.avg} / 5</span>
        </div>
      )}
    </div>
  );
}

function Row({ cards, reverse }: { cards: Card[]; reverse?: boolean }) {
  return (
    <div className="marquee-mask group relative">
      <div
        className={`flex gap-4 w-max animate-marquee group-hover:[animation-play-state:paused] px-2 ${
          reverse ? "[animation-direction:reverse]" : ""
        }`}
      >
        {[...cards, ...cards].map((c, i) => (
          <div key={i} aria-hidden={i >= cards.length}>
            <PiniCard card={c} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PiniMarquee() {
  return (
    <section className="border-b-[3px] border-ink py-20 overflow-hidden">
      <div className="reveal max-w-6xl mx-auto px-6 text-center mb-10">
        <h2 className="font-[var(--font-fraunces)] font-black text-4xl md:text-5xl mb-4">
          What people pini about<span className="text-orange">.</span>
        </h2>
        <p className="text-ink/60 text-lg max-w-lg mx-auto">
          A taste of the kinds of takes you&apos;ll be voting on. Duels, ratings, hot takes, the lot.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <Row cards={rowOne} />
        <Row cards={rowTwo} reverse />
      </div>
    </section>
  );
}
