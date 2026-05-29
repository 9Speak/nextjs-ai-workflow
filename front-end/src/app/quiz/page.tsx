"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { QuizCard } from "@/components/QuizCard";
import { initialState, answer, type Question } from "@/lib/quiz";
import { saveEntry } from "@/lib/leaderboard";

const QUESTIONS: Question[] = [
  { prompt: "Thủ đô của Việt Nam?", options: ["TP.HCM", "Hà Nội", "Đà Nẵng", "Huế"], correctIndex: 1 },
  { prompt: "2 + 2 = ?", options: ["3", "4", "5", "22"], correctIndex: 1 },
  { prompt: "React được tạo bởi công ty nào?", options: ["Google", "Meta", "Amazon", "Microsoft"], correctIndex: 1 },
  { prompt: "Next.js dùng ngôn ngữ chính nào?", options: ["Python", "Ruby", "TypeScript", "Go"], correctIndex: 2 },
];

export default function QuizPage() {
  const [state, setState] = useState(initialState);
  const [index, setIndex] = useState(0);
  const done = index >= QUESTIONS.length;

  const savedRef = useRef(false);
  useEffect(() => {
    if (done && !savedRef.current) {
      saveEntry(state.score); // lưu 1 lần khi kết thúc
      savedRef.current = true;
    } else if (!done) {
      savedRef.current = false; // reset cho lượt chơi sau
    }
  }, [done, state.score]);

  function handleAnswer(correct: boolean) {
    setState((s) => answer(s, correct));
    setIndex((i) => i + 1);
  }

  function restart() {
    setState(initialState);
    setIndex(0);
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col justify-center gap-6 p-6">
      <h1 className="text-center text-2xl font-bold text-primary">Quiz đố vui</h1>

      {done ? (
        <div className="rounded-lg border border-foreground/10 p-6 text-center shadow-sm">
          <p className="mb-2 text-lg">Hoàn thành! Tổng điểm:</p>
          <p className="mb-4 text-4xl font-bold text-primary">{state.score}</p>
          <div className="flex justify-center gap-4">
            <button
              type="button"
              onClick={restart}
              className="rounded-md bg-primary px-4 py-2 font-medium text-white"
            >
              Chơi lại
            </button>
            <Link
              href="/leaderboard"
              className="rounded-md border border-primary px-4 py-2 font-medium text-primary"
            >
              Bảng xếp hạng
            </Link>
          </div>
        </div>
      ) : (
        <QuizCard
          question={QUESTIONS[index]}
          score={state.score}
          index={index}
          total={QUESTIONS.length}
          onAnswer={handleAnswer}
        />
      )}
    </main>
  );
}
