"use client";

import { useState } from "react";

type Choice = "A" | "B";

interface Q {
  q: string;
  a: string;
  b: string;
  sam: Choice; // the friend's pre-set take, so the reveal has something to meet
}

const QUESTIONS: Q[] = [
  { q: "Pineapple on pizza?", a: "Yes", b: "No", sam: "A" },
  { q: "Night owl or early bird?", a: "Night owl", b: "Early bird", sam: "B" },
  { q: "Texts back instantly?", a: "Always", b: "…eventually", sam: "B" },
];

export default function PiniSyncDemo() {
  const [answers, setAnswers] = useState<Choice[]>([]);
  const [started, setStarted] = useState(false);

  const idx = answers.length;
  const done = idx === QUESTIONS.length;

  const choose = (c: Choice) => {
    setStarted(true);
    setAnswers((prev) => [...prev, c]);
  };
  const replay = () => {
    setAnswers([]);
  };

  const labelFor = (q: Q, c: Choice) => (c === "A" ? q.a : q.b);

  return (
    // Float only while idle — a moving target is annoying to tap once you engage.
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
                  {done ? "the reveal" : "you & Sam · answer together"}
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
          {!done ? (
            <div className="flex-1 flex flex-col p-3">
              {/* progress dots */}
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

              {/* question */}
              <div key={idx} className="flex-1 flex flex-col justify-center animate-pop-in">
                <p className="text-[10px] font-black uppercase tracking-widest text-ink/40 mb-1 text-center">
                  Question {idx + 1} of {QUESTIONS.length}
                </p>
                <p className="text-base font-black text-ink text-center leading-snug mb-5 px-1">
                  {QUESTIONS[idx].q}
                </p>
                <div className="space-y-2.5">
                  <button
                    onClick={() => choose("A")}
                    className="w-full h-11 rounded-full bg-amber border-2 border-ink shadow-brutal-sm text-sm font-black text-ink active:translate-x-[2px] active:translate-y-[2px] active:shadow-none hover:-translate-y-0.5 transition-all"
                  >
                    {QUESTIONS[idx].a}
                  </button>
                  <button
                    onClick={() => choose("B")}
                    className="w-full h-11 rounded-full bg-peach border-2 border-ink shadow-brutal-sm text-sm font-black text-ink active:translate-x-[2px] active:translate-y-[2px] active:shadow-none hover:-translate-y-0.5 transition-all"
                  >
                    {QUESTIONS[idx].b}
                  </button>
                </div>
              </div>

              <p className="text-[9px] text-ink/40 text-center mt-3">
                Tap your take — no right answers.
              </p>
            </div>
          ) : (
            <div className="flex-1 flex flex-col p-3 overflow-hidden">
              <p className="font-[var(--font-fraunces)] font-black text-lg text-ink text-center leading-tight">
                Two minds, side by side.
              </p>
              <p className="text-[10px] text-ink/55 text-center mb-3 px-1">
                Where you click — and where you&apos;d argue.
              </p>

              <div className="space-y-2 flex-1">
                {QUESTIONS.map((q, i) => {
                  const mine = answers[i];
                  const aligned = mine === q.sam;
                  return (
                    <div
                      key={q.q}
                      className="rounded-2xl border-2 border-ink p-2.5 bg-paper shadow-brutal-sm animate-pop-in"
                      style={{ animationDelay: `${i * 110}ms` }}
                    >
                      <div className="flex items-center justify-between gap-1.5">
                        <p className="text-[10px] font-bold text-ink truncate">{q.q}</p>
                        <span
                          className={`shrink-0 px-1.5 py-0.5 rounded-full text-[8px] font-black border border-ink ${
                            aligned ? "bg-amber text-ink" : "bg-lilac text-ink"
                          }`}
                        >
                          {aligned ? "🤝 same mind" : "⚡ great debate"}
                        </span>
                      </div>
                      <div className="mt-1.5 flex items-center gap-1.5 text-[9px] font-black">
                        <span className="px-2 py-0.5 rounded-full bg-orange text-cream">
                          You · {labelFor(q, mine)}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-cream border border-ink/30 text-ink/70">
                          Sam · {labelFor(q, q.sam)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <p className="text-[9px] text-ink/55 text-center leading-snug mt-2 mb-2 px-1">
                No scores. No rankings — just where two minds click, and where the
                good arguments start.
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
