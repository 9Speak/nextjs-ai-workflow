"use client";

import { useState } from "react";
import type { Question } from "@/lib/quiz";

interface QuizCardProps {
  question: Question;
  score: number;
  index: number;
  total: number;
  onAnswer: (correct: boolean) => void;
}

export function QuizCard({ question, score, index, total, onAnswer }: QuizCardProps) {
  const [selected, setSelected] = useState<number | null>(null);

  function choose(i: number) {
    if (selected !== null) return;
    setSelected(i);
    const correct = i === question.correctIndex;
    setTimeout(() => {
      setSelected(null);
      onAnswer(correct);
    }, 600);
  }

  return (
    <div className="rounded-lg border border-foreground/10 p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between text-sm">
        <span>Câu {index + 1}/{total}</span>
        <span className="font-semibold text-primary">Điểm: {score}</span>
      </div>

      <h2 className="mb-4 text-xl font-semibold">{question.prompt}</h2>

      <div className="grid gap-3">
        {question.options.map((opt, i) => {
          const isCorrect = i === question.correctIndex;
          const cls =
            selected === null
              ? "border-foreground/15 hover:border-primary"
              : isCorrect
                ? "border-success bg-success/10 text-success"
                : selected === i
                  ? "border-danger bg-danger/10 text-danger"
                  : "border-foreground/10 opacity-60";

          return (
            <button
              key={i}
              type="button"
              onClick={() => choose(i)}
              disabled={selected !== null}
              className={`rounded-md border p-3 text-left transition-colors ${cls}`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
