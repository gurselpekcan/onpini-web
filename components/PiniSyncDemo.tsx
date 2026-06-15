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

// Real killer cards from the production decks — relational, debate-worthy,
// the stuff that shows what Pini Sync actually is.
const QUESTIONS: Q[] = [
  { q: 'The 3am "I\'m in jail" call:', emoji: "🚔", a: "Already in the car", b: "Text me tomorrow", sam: "A" },
  { q: "Last slice, you both want it:", emoji: "🍕", a: "I take it, you laugh", b: "We split it", sam: "B" },
  { q: "Protect your feelings, or hard truth?", emoji: "🪞", a: "Protect me", b: "Truth, always", sam: "B" },
  { q: "I go quiet for weeks:", emoji: "👻", a: "You keep checking in", b: "You give me space", sam: "A" },
];

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
  const done = idx === QUESTIONS.length;

  // Anticipation beat: once all answered, hold on "syncing" before the reveal.
  useEffect(() => {
    if (!done) return;
    if (instant) {
      setRevealed(true);
      return;
    }
    const t = setTimeout(() => setRevealed(true), 1000);
    return () => clearTimeout(t);
  }, [done, instant]);

  const choose = (c: Choice) => {
    setStarted(true);
    if (instant) {
      setAnswers((prev) => [...prev, c]);
      return;
    }
    // brief tap-confirm flash before advancing
    setFlash(c);
    setTimeout(() => {
      setAnswers((prev) => [...prev, c]);
      setFlash(null);
    }, 220);
  };

  const replay = () => {
    setAnswers([]);
    setRevealed(false);
    setFlash(null);
  };

  const alignedCount = answers.filter((a, i) => a === QUESTIONS[i].sam).length;
  const headline =
    alignedCount === QUESTIONS.length
      ? "Two of a kind."
      : alignedCount <= 1
        ? "Opposites — good talk ahead."
        : "Mostly in sync — with a debate or two.";

  const phase: "play" | "syncing" | "reveal" = !done ? "play" : revealed ? "reveal" : "syncing";

  return (
    <div className={`mt-8 w-full max-w-xs mx-auto ${started ? "" : "animate-float"}`}>
      <div className="relative bg-ink rounded-[40px] p-3 border-4 border-ink shadow-brutal-lg">
        <div className="bg-cream rounded-[30px] overflow-hidden aspect-[9/19] flex flex-col">
          {/* Header */}
          <div className="bg-amber/30 px-4 pt-5 pb-3 border-b-2 border-ink/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-[var(--font-fraunces)] font-black text-lg text-ink leading-none">
                  Pini Sync<span className="text-orange">.</span>
                </p>
                <p className="text-[10px] text-ink/50 italic font-[var(--font-fraunces)] mt-1">
                  {phase === "reveal" ? "the reveal" : phase === "syncing" ? "syncing…" : "you & Sam · answer together"}
                </p>
              </div>
              <div className="flex -space-x-2">
                <span className="w-6 h-6 rounded-full bg-orange border-2 border-ink text-cream text-[10px] font-black flex items-center justify-center">
                  Y
                </span>
                <span className="w-6 h-6 rounded-full bg-amber border-2 border-ink text-ink text-[10px] font-black flex items-center justify-center">
                  S
                </span>
              </div>
            </div>
          </div>

          {/* Body */}
          {phase === "play" && (
            <div className="flex-1 flex flex-col p-3">
              <div className="flex gap-1.5 justify-center mb-4">
                {QUESTIONS.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 border border-ink ${
                      i < idx ? "w-6 bg-orange" : i === idx ? "w-6 bg-amber" : "w-1.5 bg-paper"
                    }`}
                  />
                ))}
              </div>

              <div key={idx} className="flex-1 flex flex-col justify-center animate-pop-in">
                <p className="text-[10px] font-black uppercase tracking-widest text-ink/40 mb-2 text-center">
                  Question {idx + 1} of {QUESTIONS.length}
                </p>
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
                <span className="w-12 h-12 rounded-full bg-orange border-2 border-ink text-cream text-sm font-black flex items-center justify-center animate-float">
                  You
                </span>
                <span className="w-12 h-12 rounded-full bg-amber border-2 border-ink text-ink text-sm font-black flex items-center justify-center animate-float">
                  Sam
                </span>
              </div>
              <p className="font-[var(--font-fraunces)] font-black text-lg text-ink">Syncing your takes…</p>
              <div className="flex gap-1.5 mt-3">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="w-2 h-2 rounded-full bg-orange animate-pulse"
                    style={{ animationDelay: `${i * 160}ms` }}
                  />
                ))}
              </div>
            </div>
          )}

          {phase === "reveal" && (
            <div className="flex-1 flex flex-col p-3 overflow-hidden">
              <p className="font-[var(--font-fraunces)] font-black text-lg text-ink text-center leading-tight">
                {headline}
              </p>
              <p className="text-[10px] text-ink/55 text-center mb-2.5 px-1">
                Where you click — and where you&apos;d argue.
              </p>

              <div className="space-y-1.5 flex-1">
                {QUESTIONS.map((q, i) => {
                  const mine = answers[i];
                  const aligned = mine === q.sam;
                  return (
                    <div
                      key={q.q}
                      className="rounded-xl border-2 border-ink p-2 bg-paper shadow-brutal-sm animate-pop-in"
                      style={{ animationDelay: instant ? "0ms" : `${i * 130}ms` }}
                    >
                      <div className="flex items-center justify-between gap-1.5">
                        <p className="text-[10px] font-bold text-ink truncate">
                          {q.emoji} {q.q}
                        </p>
                        <span
                          className={`shrink-0 px-1.5 py-0.5 rounded-full text-[8px] font-black border border-ink ${
                            aligned ? "bg-amber text-ink" : "bg-lilac text-ink"
                          }`}
                        >
                          {aligned ? "🤝" : "⚡"}
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

              <p className="text-[9px] text-ink/55 text-center leading-snug mt-2 mb-2 px-1">
                No scores. No rankings — just where two minds click, and where the good arguments start.
              </p>
              <div className="flex items-center gap-2">
                <a
                  href="https://app.onpini.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 h-9 rounded-full bg-ink text-cream text-[11px] font-black flex items-center justify-center border-2 border-ink active:translate-y-[1px] transition-all"
                >
                  Play it for real →
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
