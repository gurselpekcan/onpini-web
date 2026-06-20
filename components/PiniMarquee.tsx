// A moving showcase of example poll cards — the site's "what would I even do
// here?" answer. Motion makes it feel alive; the cards are clearly framed as
// examples (header copy, no "live" badge, no fake counts) so it stays honest.
//
// The card visuals mirror the production app poll cards 1:1:
//   - Pick  : option rows with an amber fill bar, % + vote count, checkmark
//   - Duel  : a split "arena" (orange/amber vs lilac/fuchsia) with big %
//   - Hot Take: emerald / rose stat boxes + a split confidence bar
//   - Rate  : a large average out of 10 + five summary stars

import Image from "next/image";

type Opt = { label: string; pct: number; votes: string };
type PhotoOpt = { img: string; label: string; pct: number; votes: string };

type Card =
  | { type: "duel"; emoji: string; q: string; left: Opt; right: Opt }
  | { type: "pick"; emoji: string; q: string; options: Opt[] }
  | { type: "hot"; emoji: string; q: string; agree: number; takes: string }
  | { type: "rate"; emoji: string; q: string; avg: number; votes: string; img?: string; video?: boolean }
  | { type: "photoduel"; emoji: string; q: string; left: PhotoOpt; right: PhotoOpt };

const FORMAT_LABEL: Record<Card["type"], string> = {
  duel: "Duel",
  photoduel: "Duel",
  pick: "Pick",
  hot: "Hot Take",
  rate: "Rate",
};

const rowOne: Card[] = [
  { type: "duel", emoji: "⚽", q: "Messi or Ronaldo. Settle it.", left: { label: "Messi", pct: 61, votes: "18.2k" }, right: { label: "Ronaldo", pct: 39, votes: "11.6k" } },
  { type: "rate", emoji: "🎬", q: "Rate the last film you watched.", avg: 7.4, votes: "3,011" },
  { type: "hot", emoji: "🍍", q: "Pineapple belongs on pizza.", agree: 44, takes: "9,440" },
  { type: "pick", emoji: "📺", q: "Greatest sitcom of all time?", options: [{ label: "The Office", pct: 38, votes: "4.1k" }, { label: "Friends", pct: 34, votes: "3.6k" }, { label: "Seinfeld", pct: 28, votes: "3.0k" }] },
  { type: "photoduel", emoji: "📸", q: "Which shot wins?", left: { img: "/marquee/duel-a.jpg", label: "Left", pct: 56, votes: "8.7k" }, right: { img: "/marquee/duel-b.jpg", label: "Right", pct: 44, votes: "6.8k" } },
  { type: "duel", emoji: "📱", q: "iPhone or Android, for life?", left: { label: "iPhone", pct: 53, votes: "22.4k" }, right: { label: "Android", pct: 47, votes: "19.9k" } },
];

const rowTwo: Card[] = [
  { type: "hot", emoji: "💼", q: "Working from home makes you lazy.", agree: 29, takes: "12.7k" },
  { type: "rate", emoji: "🏆", q: "Rate that World Cup final.", avg: 8.9, votes: "27.5k" },
  { type: "rate", emoji: "🎥", q: "Rate this clip.", avg: 8.2, votes: "4.4k", img: "/marquee/media-clip.jpg", video: true },
  { type: "pick", emoji: "🌮", q: "Your last meal on earth?", options: [{ label: "Pizza", pct: 41, votes: "5.2k" }, { label: "Sushi", pct: 32, votes: "4.1k" }, { label: "Burgers", pct: 27, votes: "3.4k" }] },
  { type: "rate", emoji: "📷", q: "Rate this shot.", avg: 7.1, votes: "2.6k", img: "/marquee/rate-shot.jpg" },
  { type: "duel", emoji: "☕", q: "Coffee or tea?", left: { label: "Coffee", pct: 58, votes: "15.1k" }, right: { label: "Tea", pct: 42, votes: "10.9k" } },
  { type: "hot", emoji: "📵", q: "Reply-all should be a crime.", agree: 78, takes: "6,820" },
];

function FormatChip({ type }: { type: Card["type"] }) {
  return (
    <span className="shrink-0 px-2 py-0.5 rounded-full bg-ink text-cream text-[9px] font-black uppercase tracking-widest">
      {FORMAT_LABEL[type]}
    </span>
  );
}

/* Pick — mirrors BinaryBody: amber fill bar, %, vote count, checkmark on the
   user's choice (we mark the leading option as "chosen"). */
function PickBody({ options }: { options: Opt[] }) {
  return (
    <div className="space-y-2">
      {options.map((o, i) => {
        const chosen = i === 0;
        return (
          <div
            key={o.label}
            className="relative rounded-xl border-2 border-ink overflow-hidden shadow-brutal-sm"
          >
            <div className={`absolute inset-0 ${chosen ? "bg-orange/20" : "bg-cream"}`} />
            <div className="absolute top-0 left-0 h-full bg-amber/45" style={{ width: `${o.pct}%` }} />
            <div className="relative flex items-center justify-between gap-2 px-3 py-2">
              <span className={`text-sm text-ink truncate ${chosen ? "font-black" : "font-bold"}`}>{o.label}</span>
              <span className="flex items-center gap-2 shrink-0">
                {chosen && (
                  <span className="w-5 h-5 rounded-full bg-ink text-amber flex items-center justify-center text-[11px] font-black border-2 border-ink">✓</span>
                )}
                <span className="flex flex-col items-end leading-none">
                  <span className="text-sm font-black text-ink tabular-nums">{o.pct}%</span>
                  <span className="text-[9px] font-bold text-ink/50 mt-0.5">{o.votes}</span>
                </span>
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* Duel — mirrors VersusBody: split arena, orange/amber vs lilac/fuchsia,
   widths by %, loser side dimmed. */
function DuelBody({ left, right }: { left: Opt; right: Opt }) {
  const leftWins = left.pct >= right.pct;
  return (
    <div>
      <div className="h-24 rounded-xl overflow-hidden flex border-2 border-ink select-none">
        <div
          className={`relative flex flex-col items-center justify-center bg-gradient-to-br from-orange to-amber ${leftWins ? "" : "grayscale opacity-60"}`}
          style={{ width: `${left.pct}%` }}
        >
          <span className="text-2xl font-black text-white drop-shadow">{left.pct}%</span>
          <span className="text-[9px] font-black uppercase tracking-wider text-white/85">{left.votes}</span>
        </div>
        <div
          className={`relative flex flex-col items-center justify-center bg-gradient-to-br from-lilac to-fuchsia-500 ${leftWins ? "grayscale opacity-60" : ""}`}
          style={{ width: `${right.pct}%` }}
        >
          <span className="text-2xl font-black text-white drop-shadow">{right.pct}%</span>
          <span className="text-[9px] font-black uppercase tracking-wider text-white/85">{right.votes}</span>
        </div>
      </div>
      <div className="flex items-center justify-between mt-2 px-0.5">
        <span className="text-xs font-black text-ink truncate">{left.label}</span>
        <span className="text-[10px] font-black uppercase tracking-widest text-ink/30">vs</span>
        <span className="text-xs font-black text-ink truncate text-right">{right.label}</span>
      </div>
    </div>
  );
}

/* Hot Take — mirrors HotTakeBody: emerald / rose stat boxes + split bar. */
function HotBody({ agree, takes }: { agree: number; takes: string }) {
  const disagree = 100 - agree;
  const agreeLead = agree >= 50;
  return (
    <div className="space-y-2">
      <div className="flex items-stretch gap-2">
        <div className={`flex-1 rounded-xl px-3 py-2 border-2 ${agreeLead ? "border-emerald-400 bg-emerald-500/10" : "border-ink/10 bg-cream"}`}>
          <div className="text-[10px] text-ink/50 font-black uppercase tracking-wider">Agree</div>
          <div className="text-2xl font-black text-emerald-500 leading-none">{agree}%</div>
        </div>
        <div className={`flex-1 rounded-xl px-3 py-2 border-2 text-right ${!agreeLead ? "border-rose-400 bg-rose-500/10" : "border-ink/10 bg-cream"}`}>
          <div className="text-[10px] text-ink/50 font-black uppercase tracking-wider">Disagree</div>
          <div className="text-2xl font-black text-rose-500 leading-none">{disagree}%</div>
        </div>
      </div>
      <div className="h-2.5 rounded-full overflow-hidden flex bg-ink/10">
        <span className="bg-emerald-500 block h-full" style={{ width: `${agree}%` }} />
        <span className="bg-rose-500 block h-full" style={{ width: `${disagree}%` }} />
      </div>
      <p className="text-[10px] text-center text-ink/50 font-bold">{takes} hot takes</p>
    </div>
  );
}

/* Photo Duel — image-backed VersusBody: two photos split by %, loser dimmed. */
function PhotoDuelBody({ left, right }: { left: PhotoOpt; right: PhotoOpt }) {
  const leftWins = left.pct >= right.pct;
  return (
    <div>
      <div className="h-28 rounded-xl overflow-hidden flex border-2 border-ink select-none">
        {[left, right].map((s, i) => {
          const wins = i === 0 ? leftWins : !leftWins;
          return (
            <div key={i} className="relative" style={{ width: `${s.pct}%` }}>
              <Image src={s.img} alt="" fill sizes="200px" className={`object-cover ${wins ? "" : "grayscale opacity-60"}`} />
              <div className="absolute inset-0 bg-ink/35" />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-black text-white drop-shadow">{s.pct}%</span>
                <span className="text-[9px] font-black uppercase tracking-wider text-white/85">{s.votes}</span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-between mt-2 px-0.5">
        <span className="text-xs font-black text-ink truncate">{left.label}</span>
        <span className="text-[10px] font-black uppercase tracking-widest text-ink/30">vs</span>
        <span className="text-xs font-black text-ink truncate text-right">{right.label}</span>
      </div>
    </div>
  );
}

/* Rate — mirrors RatingBody: big average out of 10 + five summary stars.
   Optional media thumbnail above (with a play badge for video polls). */
function RateBody({ avg, votes, img, video }: { avg: number; votes: string; img?: string; video?: boolean }) {
  const filled = Math.round(avg / 2); // normalize /10 to 5 stars
  return (
    <div>
      {img && (
        <div className="relative h-24 rounded-xl overflow-hidden border-2 border-ink mb-2">
          <Image src={img} alt="" fill sizes="288px" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
          {video && (
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="w-11 h-11 rounded-full bg-white/90 border-2 border-ink flex items-center justify-center text-ink text-lg pl-0.5 shadow-brutal-sm">▶</span>
            </span>
          )}
        </div>
      )}
      <div className="text-center py-0.5">
        <div className="font-[var(--font-fraunces)] font-black text-3xl text-ink leading-none">
          {avg.toFixed(1)}
          <span className="text-base text-ink/40 font-bold"> / 10</span>
        </div>
        <div className="flex justify-center gap-0.5 my-1.5 text-lg leading-none" aria-hidden>
          <span className="text-amber">{"★".repeat(filled)}</span>
          <span className="text-ink/20">{"★".repeat(5 - filled)}</span>
        </div>
        <p className="text-[10px] text-ink/50 font-bold">{votes} ratings</p>
      </div>
    </div>
  );
}

function PiniCard({ card }: { card: Card }) {
  return (
    <div className="shrink-0 w-80 rounded-3xl border-[3px] border-ink bg-paper p-4 shadow-brutal flex flex-col">
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="text-2xl leading-none">{card.emoji}</span>
        <FormatChip type={card.type} />
      </div>
      <p className="font-[var(--font-fraunces)] font-black text-base leading-tight text-ink mb-3 min-h-[2.5rem]">
        {card.q}
      </p>
      <div className="mt-auto">
        {card.type === "pick" && <PickBody options={card.options} />}
        {card.type === "duel" && <DuelBody left={card.left} right={card.right} />}
        {card.type === "photoduel" && <PhotoDuelBody left={card.left} right={card.right} />}
        {card.type === "hot" && <HotBody agree={card.agree} takes={card.takes} />}
        {card.type === "rate" && <RateBody avg={card.avg} votes={card.votes} img={card.img} video={card.video} />}
      </div>
    </div>
  );
}

function Row({ cards, reverse }: { cards: Card[]; reverse?: boolean }) {
  return (
    <div className="marquee-mask group relative">
      <div
        className={`flex gap-4 w-max px-2 group-hover:[animation-play-state:paused] ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
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
    <section className="border-b-[3px] border-ink py-20 overflow-hidden bg-cream/40">
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
