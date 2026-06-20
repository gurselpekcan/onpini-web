"use client";

import { useEffect, useState } from "react";

type Choice = "A" | "B";

interface Q {
  q: string;
  emoji: string;
  a: string;
  b: string;
  sam: Choice; // the friend's pre-set take, so the reveal has something to meet
}

interface Topic {
  id: string;
  title: string;
  emoji: string;
  tag: string;
  bg: string;
  share: string;
  questions: Q[];
}

// Real cards from the production killer decks, grouped by what people actually
// want to find out about each other.
const TOPICS: Topic[] = [
  {
    id: "romance",
    title: "Romance",
    emoji: "💘",
    tag: "Love & dating",
    bg: "bg-peach",
    share: "Do we actually agree on love? 💘 Answer this quick OnPini deck and let's find out 👀",
    questions: [
      { q: "Good morning text:", emoji: "🌅", a: "Me, always", b: "Whoever's up first", sam: "A" },
      { q: "You catch feelings first:", emoji: "💓", a: "You say it", b: "You hide it", sam: "A" },
      { q: "Putting a label on this:", emoji: "🔒", a: "I want it now", b: "Let it breathe", sam: "B" },
      { q: "The love language you want:", emoji: "💌", a: "Words", b: "Time", sam: "B" },
      { q: "First to text after a fight:", emoji: "📲", a: "Me, every time", b: "I wait you out", sam: "A" },
    ],
  },
  {
    id: "friends",
    title: "Friends",
    emoji: "🤝",
    tag: "Ride or die",
    bg: "bg-amber",
    share: "How well do we actually know each other? 🤝 Answer this OnPini deck and let's see 👀",
    questions: [
      { q: 'The 3am "I\'m in jail" call:', emoji: "🚔", a: "Already in the car", b: "Text me tomorrow", sam: "A" },
      { q: "I bail last-minute, third time:", emoji: "🚫", a: "You call me out", b: "You let it slide", sam: "B" },
      { q: "I ghost the group for months:", emoji: "👻", a: "You drag me back in", b: "You give me space", sam: "A" },
      { q: "A wild rumour about me reaches you:", emoji: "🐍", a: "Come straight to me", b: "Wait and watch", sam: "A" },
      { q: "Protect your feelings, or hard truth?", emoji: "🪞", a: "Protect me", b: "Truth, always", sam: "B" },
    ],
  },
  {
    id: "money",
    title: "Money",
    emoji: "💰",
    tag: "Where your mouth is",
    bg: "bg-lilac",
    share: "Would you really have my back about money? 💰 Answer this OnPini deck and let's see 👀",
    questions: [
      { q: "You win the lottery:", emoji: "🎰", a: "I get a cut", b: "I get a great dinner", sam: "B" },
      { q: "I'm about to blow my savings:", emoji: "💳", a: "You say something", b: "Your money, your call", sam: "A" },
      { q: "Group splits the bill, I barely ate:", emoji: "🧾", a: "I just split it", b: "I'd say something", sam: "B" },
      { q: "I'm broke this month:", emoji: "🪙", a: "You spot me, no IOU", b: "You lend but track it", sam: "A" },
      { q: "Stranded abroad, no money:", emoji: "🌍", a: "You wire it, no questions", b: "You help me figure it out", sam: "A" },
    ],
  },
];

const APP_URL = "https://web.onpini.com";
const labelFor = (q: Q, c: Choice) => (c === "A" ? q.a : q.b);

export default function PiniSyncDemo() {
  const [topic, setTopic] = useState<Topic | null>(null);
  const [answers, setAnswers] = useState<Choice[]>([]);
  const [revealed, setRevealed] = useState(false);
  const [flash, setFlash] = useState<Choice | null>(null);
  const [instant, setInstant] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showShare, setShowShare] = useState(false);

  useEffect(() => {
    setInstant(!!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const total = topic?.questions.length ?? 0;
  const idx = answers.length;
  const done = !!topic && idx === total;

  useEffect(() => {
    if (!done) return;
    if (instant) { setRevealed(true); return; }
    const t = setTimeout(() => setRevealed(true), 1000);
    return () => clearTimeout(t);
  }, [done, instant]);

  const choose = (c: Choice) => {
    if (instant) { setAnswers((p) => [...p, c]); return; }
    setFlash(c);
    setTimeout(() => { setAnswers((p) => [...p, c]); setFlash(null); }, 200);
  };
  const restart = () => { setTopic(null); setAnswers([]); setRevealed(false); setFlash(null); setCopied(false); setShowShare(false); };
  const started = topic !== null;

  const shareText = topic?.share ?? "Answer this OnPini deck and let's see how we line up 👀";
  const shareFull = `${shareText} ${APP_URL}`;
  const waHref = `https://wa.me/?text=${encodeURIComponent(shareFull)}`;
  const xHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(APP_URL)}`;
  const challenge = async () => {
    try {
      if (navigator.share) { await navigator.share({ title: "OnPini", text: shareText, url: APP_URL }); return; }
    } catch { /* user dismissed share sheet */ }
    setShowShare(true);
  };
  const copyLink = async () => {
    try { await navigator.clipboard.writeText(shareFull); setCopied(true); setTimeout(() => setCopied(false), 2200); } catch { /* blocked */ }
  };

  const aligned = topic ? answers.filter((a, i) => a === topic.questions[i].sam).length : 0;
  const debates = total - aligned;
  const headline =
    aligned === total ? "Two of a kind."
    : aligned >= total - 1 ? "Mostly in sync, one to argue about."
    : aligned <= 1 ? "Opposites. Good talk ahead."
    : "A real mix. Plenty to talk about.";

  const phase: "pick" | "play" | "syncing" | "reveal" =
    !topic ? "pick" : !done ? "play" : revealed ? "reveal" : "syncing";
  const pct = total ? Math.round((idx / total) * 100) : 0;

  return (
    <div className={`mt-8 w-full max-w-xs mx-auto ${started ? "" : "animate-float"}`}>
      <div className="relative bg-ink rounded-[40px] p-3 border-4 border-ink shadow-brutal-lg">
        <div className="bg-cream rounded-[30px] overflow-hidden aspect-[9/19] flex flex-col">
          {/* Header */}
          <div className="bg-amber/30 px-4 pt-4 pb-3 border-b-2 border-ink/10">
            <div className="flex items-center justify-between">
              <div className="min-w-0">
                <p className="text-[8px] font-black uppercase tracking-[0.2em] text-ink/40">Pini Sync</p>
                <p className="font-[var(--font-fraunces)] font-black text-base text-ink leading-none truncate">
                  {topic ? `${topic.emoji} ${topic.title}` : "Pick a vibe"}
                </p>
                <p className="text-[10px] text-ink/50 italic font-[var(--font-fraunces)] mt-0.5">
                  {phase === "reveal" ? "the reveal" : phase === "syncing" ? "syncing…" : topic ? `${topic.tag} · you & Sam` : "what do you actually agree on?"}
                </p>
              </div>
              <div className="flex -space-x-2 shrink-0">
                <span className="w-6 h-6 rounded-full bg-orange border-2 border-ink text-cream text-[10px] font-black flex items-center justify-center">Y</span>
                <span className="w-6 h-6 rounded-full bg-amber border-2 border-ink text-ink text-[10px] font-black flex items-center justify-center">S</span>
              </div>
            </div>
          </div>

          {/* PICK A VIBE */}
          {phase === "pick" && (
            <div className="flex-1 flex flex-col justify-center p-4 animate-pop-in">
              <p className="text-base font-black text-ink text-center leading-snug mb-1">
                What do you really agree on?
              </p>
              <p className="text-[11px] text-ink/50 text-center mb-5">Pick a deck. Answer with Sam. See where you land.</p>
              <div className="space-y-2.5">
                {TOPICS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTopic(t)}
                    className={`w-full ${t.bg} border-2 border-ink shadow-brutal-sm rounded-2xl px-4 py-3 flex items-center gap-3 text-left active:translate-x-[2px] active:translate-y-[2px] active:shadow-none hover:-translate-y-0.5 transition-all`}
                  >
                    <span className="text-2xl">{t.emoji}</span>
                    <span className="leading-tight">
                      <span className="block font-black text-ink text-sm">{t.title}</span>
                      <span className="block text-[10px] font-bold uppercase tracking-widest text-ink/50">{t.tag}</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* PLAY */}
          {phase === "play" && topic && (
            <div className="flex-1 flex flex-col p-3">
              <div className="mb-4">
                <div className="h-1.5 rounded-full bg-paper border border-ink overflow-hidden">
                  <div className="h-full bg-orange transition-all duration-300" style={{ width: `${pct}%` }} />
                </div>
                <p className="text-[9px] font-black uppercase tracking-widest text-ink/40 mt-1.5 text-center">
                  Card {idx + 1} of {total}
                </p>
              </div>
              <div key={idx} className="flex-1 flex flex-col justify-center animate-pop-in">
                <div className="text-3xl text-center mb-2">{topic.questions[idx].emoji}</div>
                <p className="text-base font-black text-ink text-center leading-snug mb-5 px-1">
                  {topic.questions[idx].q}
                </p>
                <div className="space-y-2.5">
                  {(["A", "B"] as Choice[]).map((c) => (
                    <button
                      key={c}
                      onClick={() => choose(c)}
                      className={`w-full h-11 rounded-full border-2 border-ink shadow-brutal-sm text-sm font-black text-ink transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none hover:-translate-y-0.5 ${
                        c === "A" ? "bg-amber" : "bg-peach"
                      } ${flash === c ? "translate-x-[2px] translate-y-[2px] shadow-none ring-2 ring-ink" : ""}`}
                    >
                      {c === "A" ? topic.questions[idx].a : topic.questions[idx].b}
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-[9px] text-ink/40 text-center mt-3">Tap your take. No right answers.</p>
            </div>
          )}

          {/* SYNCING */}
          {phase === "syncing" && (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center animate-pop-in">
              <div className="flex -space-x-3 mb-5">
                <span className="w-12 h-12 rounded-full bg-orange border-2 border-ink text-cream text-sm font-black flex items-center justify-center animate-float">You</span>
                <span className="w-12 h-12 rounded-full bg-amber border-2 border-ink text-ink text-sm font-black flex items-center justify-center animate-float">Sam</span>
              </div>
              <p className="font-[var(--font-fraunces)] font-black text-lg text-ink">Syncing your takes…</p>
              <div className="flex gap-1.5 mt-3">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="w-2 h-2 rounded-full bg-orange animate-pulse" style={{ animationDelay: `${i * 160}ms` }} />
                ))}
              </div>
            </div>
          )}

          {/* REVEAL */}
          {phase === "reveal" && topic && (
            <div className="flex-1 flex flex-col p-3 min-h-0">
              <p className="font-[var(--font-fraunces)] font-black text-base text-ink text-center leading-tight shrink-0">
                {headline}
              </p>
              <div className="flex items-center justify-center gap-2 mb-2 shrink-0">
                <span className="px-2 py-0.5 rounded-full bg-amber border border-ink text-[9px] font-black text-ink">🤝 {aligned} clicked</span>
                <span className="px-2 py-0.5 rounded-full bg-lilac border border-ink text-[9px] font-black text-ink">⚡ {debates} to debate</span>
              </div>
              <div className="space-y-1.5 flex-1 overflow-y-auto min-h-0 pr-0.5">
                {topic.questions.map((q, i) => {
                  const mine = answers[i];
                  const ok = mine === q.sam;
                  return (
                    <div
                      key={q.q}
                      className="rounded-xl border-2 border-ink p-2 bg-paper shadow-brutal-sm animate-pop-in"
                      style={{ animationDelay: instant ? "0ms" : `${i * 90}ms` }}
                    >
                      <div className="flex items-center justify-between gap-1.5">
                        <p className="text-[10px] font-bold text-ink truncate">{q.emoji} {q.q}</p>
                        <span className={`shrink-0 px-1.5 py-0.5 rounded-full text-[8px] font-black border border-ink ${ok ? "bg-amber text-ink" : "bg-lilac text-ink"}`}>
                          {ok ? "🤝" : "⚡"}
                        </span>
                      </div>
                      <div className="mt-1 space-y-0.5 text-[9px] font-black">
                        <div className="flex items-center gap-1.5">
                          <span className="w-7 shrink-0 px-1 py-0.5 rounded-full bg-orange text-cream text-center">You</span>
                          <span className="text-ink/70 truncate">{labelFor(q, mine)}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-7 shrink-0 px-1 py-0.5 rounded-full bg-amber text-ink text-center">Sam</span>
                          <span className="text-ink/60 truncate">{labelFor(q, q.sam)}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="text-[9px] text-ink/55 text-center leading-snug mt-2 mb-2 px-1 shrink-0">
                No scores, no rankings. Just where two minds click, and where the good arguments start.
              </p>
              {!showShare ? (
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={challenge}
                    className="flex-1 h-9 rounded-full bg-ink text-cream text-[11px] font-black flex items-center justify-center gap-1.5 border-2 border-ink active:translate-y-[1px] hover:-translate-y-0.5 transition-all"
                  >
                    📨 Challenge a friend
                  </button>
                  <button
                    onClick={restart}
                    aria-label="Try another vibe"
                    className="w-9 h-9 shrink-0 rounded-full bg-cream border-2 border-ink text-sm font-black flex items-center justify-center active:translate-y-[1px] transition-all"
                  >
                    ↻
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 shrink-0 animate-pop-in">
                  <a href={waHref} target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp" className="flex-1 h-9 rounded-full bg-[#25D366] text-ink text-[10px] font-black flex items-center justify-center border-2 border-ink active:translate-y-[1px] transition-all">WhatsApp</a>
                  <a href={xHref} target="_blank" rel="noopener noreferrer" aria-label="Share on X" className="flex-1 h-9 rounded-full bg-ink text-cream text-[10px] font-black flex items-center justify-center border-2 border-ink active:translate-y-[1px] transition-all">X</a>
                  <button onClick={copyLink} className="flex-1 h-9 rounded-full bg-cream text-ink text-[10px] font-black flex items-center justify-center border-2 border-ink active:translate-y-[1px] transition-all">{copied ? "Copied ✓" : "Copy"}</button>
                </div>
              )}
              <a
                href={APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-black text-ink/50 hover:text-ink text-center mt-2 underline decoration-orange decoration-2 underline-offset-2"
              >
                Play the full deck in the app →
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
