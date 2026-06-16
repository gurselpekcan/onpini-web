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

// A real themed deck from production: "The Loyalty Test" (Friends).
const DECK = { title: "The Loyalty Test", emoji: "🤝", tag: "Friends" };

const QUESTIONS: Q[] = [
  { q: 'The 3am "I\'m in jail" call:', emoji: "🚔", a: "Already in the car", b: "Text me tomorrow", sam: "A" },
  { q: "You find out my partner's cheating:", emoji: "👀", a: "Tell me immediately", b: "Stay out of it", sam: "A" },
  { q: "I bail last-minute — third time:", emoji: "🚫", a: "You call me out", b: "You let it slide", sam: "B" },
  { q: "A wild rumour about me reaches you:", emoji: "🐍", a: "Come straight to me", b: "Wait and watch", sam: "A" },
  { q: "I do something genuinely wrong:", emoji: "⚖️", a: "Tell me to my face", b: "Loyalty over judgment", sam: "B" },
  { q: "I vent for an hour, no advice wanted:", emoji: "🗣️", a: "You just listen", b: "You fix it", sam: "A" },
  { q: "I ghost the group for months:", emoji: "👻", a: "You drag me back in", b: "You give me space", sam: "A" },
];

const TOTAL = QUESTIONS.length;
const labelFor = (q: Q, c: Choice) => (c === "A" ? q.a : q.b);

export default function PiniSyncDemo() {
  const [answers, setAnswers] = useState<Choice[]>([]);
  const [started, setStarted] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [flash, setFlash] = useState<Choice | null>(null);
  const [instant, setInstant] = useState(false);

  useEffect(() => {
    setInstant(!!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const idx = answers.length;
  const done = idx === TOTAL;

  useEffect(() => {
    if (!done) return;
    if (instant) { setRevealed(true); return; }
    const t = setTimeout(() => setRevealed(true), 1050);
    return () => clearTimeout(t);
  }, [done, instant]);

  const choose = (c: Choice) => {
    setStarted(true);
    if (instant) { setAnswers((prev) => [...prev, c]); return; }
    setFlash(c);
    setTimeout(() => { setAnswers((prev) => [...prev, c]); setFlash(null); }, 200);
  };
  const replay = () => { setAnswers([]); setRevealed(false); setFlash(null); };

  const aligned = answers.filter((a, i) => a === QUESTIONS[i].sam).length;
  const headline =
    aligned === TOTAL ? "Two of a kind."
    : aligned >= TOTAL - 2 ? "Mostly in sync — with a debate or two."
    : aligned <= 2 ? "Opposites — good talk ahead."
    : "A real mix. Plenty to talk about.";

  const phase: "play" | "syncing" | "reveal" = !done ? "play" : revealed ? "reveal" : "syncing";
  const pct = Math.round((idx / TOTAL) * 100);

  return (
    <div className={`mt-8 w-full max-w-xs mx-auto ${started ? "" : "animate-float"}`}>
      <div className="relative bg-ink rounded-[40px] p-3 border-4 border-ink shadow-brutal-lg">
        <div className="bg-cream rounded-[30px] overflow-hidden aspect-[9/19] flex flex-col">
          {/* Header — real deck identity */}
          <div className="bg-amber/30 px-4 pt-4 pb-3 border-b-2 border-ink/10">
            <div className="flex items-center justify-between">
              <div className="min-w-0">
                <p className="text-[8px] font-black uppercase tracking-[0.2em] text-ink/40">Pini Sync</p>
                <p className="font-[var(--font-fraunces)] font-black text-base text-ink leading-none truncate">
                  {DECK.emoji} {DECK.title}
                </p>
                <p className="text-[10px] text-ink/50 italic font-[var(--font-fraunces)] mt-0.5">
                  {phase === "reveal" ? "the reveal" : phase === "syncing" ? "syncing…" : `${DECK.tag} · you & Sam`}
                </p>
              </div>
              <div className="flex -space-x-2 shrink-0">
                <span className="w-6 h-6 rounded-full bg-orange border-2 border-ink text-cream text-[10px] font-black flex items-center justify-center">Y</span>
                <span className="w-6 h-6 rounded-full bg-amber border-2 border-ink text-ink text-[10px] font-black flex items-center justify-center">S</span>
              </div>
            </div>
          </div>

          {/* Body */}
          {phase === "play" && (
            <div className="flex-1 flex flex-col p-3">
              {/* progress bar */}
              <div className="mb-4">
                <div className="h-1.5 rounded-full bg-paper border border-ink overflow-hidden">
                  <div className="h-full bg-orange transition-all duration-300" style={{ width: `${pct}%` }} />
                </div>
                <p className="text-[9px] font-black uppercase tracking-widest text-ink/40 mt-1.5 text-center">
                  Card {idx + 1} of {TOTAL}
                </p>
              </div>

              <div key={idx} className="flex-1 flex flex-col justify-center animate-pop-in">
                <div className="text-3xl text-center mb-2">{QUESTIONS[idx].emoji}</div>
                <p className="text-base font-black text-ink text-center leading-snug mb-5 px-1">
                  {QUESTIONS[idx].q}
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
                      {c === "A" ? QUESTIONS[idx].a : QUESTIONS[idx].b}
                    </button>
                  ))}
                </div>
              </div>

              <p className="text-[9px] text-ink/40 text-center mt-3">Tap your take — no right answers.</p>
            </div>
          )}

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

          {phase === "reveal" && (
            <div className="flex-1 flex flex-col p-3 min-h-0">
              <p className="font-[var(--font-fraunces)] font-black text-base text-ink text-center leading-tight shrink-0">
                {headline}
              </p>
              <p className="text-[10px] text-ink/55 text-center mb-2 px-1 shrink-0">
                Where you click — and where you&apos;d argue.
              </p>

              <div className="space-y-1.5 flex-1 overflow-y-auto min-h-0 pr-0.5">
                {QUESTIONS.map((q, i) => {
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
                No scores. No rankings — just where two minds click, and where the good arguments start.
              </p>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href="https://app.onpini.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 h-9 rounded-full bg-ink text-cream text-[11px] font-black flex items-center justify-center border-2 border-ink active:translate-y-[1px] transition-all"
                >
                  Play the full deck →
                </a>
                <button
                  onClick={replay}
                  aria-label="Replay the demo"
                  className="w-9 h-9 shrink-0 rounded-full bg-cream border-2 border-ink text-sm font-black flex items-center justify-center active:translate-y-[1px] transition-all"
                >
                  ↻
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
