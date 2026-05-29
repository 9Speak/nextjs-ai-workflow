"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { loadEntries, clearEntries, topEntries, type ScoreEntry } from "@/lib/leaderboard";

export default function LeaderboardPage() {
  const [entries, setEntries] = useState<ScoreEntry[]>([]);

  useEffect(() => {
    // Đọc localStorage (client-only) SAU khi mount để tránh hydration mismatch —
    // setState ở đây là cố ý, nên tắt rule cho đúng 1 dòng.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEntries(topEntries(loadEntries()));
  }, []);

  function handleClear() {
    if (!window.confirm("Xoá toàn bộ lịch sử điểm?")) return;
    clearEntries();
    setEntries([]);
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col justify-center gap-6 p-6">
      <h1 className="text-center text-2xl font-bold text-primary">Bảng xếp hạng</h1>

      {entries.length === 0 ? (
        <div className="rounded-lg border border-foreground/10 p-6 text-center shadow-sm">
          <p className="mb-4 text-foreground/70">Chưa có điểm nào.</p>
          <Link href="/quiz" className="rounded-md bg-primary px-4 py-2 font-medium text-white">
            Chơi quiz ngay
          </Link>
        </div>
      ) : (
        <ol className="flex flex-col gap-2">
          {entries.map((e, i) => (
            <li
              key={`${e.at}-${i}`}
              className={`flex items-center justify-between rounded-md border p-3 ${
                i < 3 ? "border-primary/40 bg-primary/5" : "border-foreground/10"
              }`}
            >
              <span className={`font-semibold ${i < 3 ? "text-primary" : ""}`}>#{i + 1}</span>
              <span className="text-lg font-bold">{e.score}</span>
              <span className="text-sm text-foreground/60">
                {new Date(e.at).toLocaleString("vi-VN")}
              </span>
            </li>
          ))}
        </ol>
      )}

      <div className="flex justify-center gap-4 text-sm">
        <Link href="/quiz" className="text-primary hover:underline">
          ← Chơi quiz
        </Link>
        {entries.length > 0 && (
          <button type="button" onClick={handleClear} className="text-danger hover:underline">
            Xoá lịch sử
          </button>
        )}
      </div>
    </main>
  );
}
