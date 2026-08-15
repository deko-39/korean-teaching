"use client";

import { useState } from "react";
import { RefreshCw, Volume2 } from "lucide-react";
import { phrases } from "@/lib/data";

export function PhraseOfDay() {
  const [index, setIndex] = useState(0);
  const phrase = phrases[index];

  const next = () => setIndex((i) => (i + 1) % phrases.length);

  const speak = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const utter = new SpeechSynthesisUtterance(phrase.hangeul);
    utter.lang = "ko-KR";
    utter.rate = 0.8;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  };

  return (
    <section className="border-y border-border bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-10 sm:flex-row sm:justify-between sm:px-6">
        <div className="text-center sm:text-left">
          <p className="text-xs font-medium uppercase tracking-widest text-primary-foreground/60">
            오늘의 표현 · Câu trong ngày
          </p>
          <div className="mt-2 flex items-center justify-center gap-3 sm:justify-start">
            <p
              key={phrase.hangeul}
              className="animate-fade-up font-serif text-3xl font-bold sm:text-4xl"
            >
              {phrase.hangeul}
            </p>
            <button
              type="button"
              onClick={speak}
              className="inline-flex size-9 items-center justify-center rounded-full bg-primary-foreground/10 text-primary-foreground transition-colors hover:bg-primary-foreground/20"
              aria-label="Phát âm"
            >
              <Volume2 className="size-4" />
            </button>
          </div>
          <p className="mt-1 text-sm text-primary-foreground/70">
            {phrase.romanization} — &ldquo;{phrase.meaning}&rdquo;
          </p>
        </div>

        <button
          type="button"
          onClick={next}
          className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 px-5 py-2.5 text-sm font-medium transition-colors hover:bg-primary-foreground/10"
        >
          <RefreshCw className="size-4" />
          Câu tiếp theo
        </button>
      </div>
    </section>
  );
}
