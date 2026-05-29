export interface ScoreEntry {
  score: number;
  at: string; // ISO timestamp
}

const KEY = "quiz-leaderboard";

/** Thuần: sort giảm dần theo điểm, lấy tối đa n. Không đột biến input. */
export function topEntries(entries: ScoreEntry[], n = 10): ScoreEntry[] {
  return [...entries].sort((a, b) => b.score - a.score).slice(0, n);
}

/** Đọc localStorage an toàn — JSON hỏng / không phải mảng → []. */
export function loadEntries(): ScoreEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (e): e is ScoreEntry =>
        !!e && typeof e.score === "number" && typeof e.at === "string",
    );
  } catch {
    return [];
  }
}

export function saveEntry(score: number): void {
  if (typeof window === "undefined") return;
  const entries = loadEntries();
  entries.push({ score, at: new Date().toISOString() });
  window.localStorage.setItem(KEY, JSON.stringify(entries));
}

export function clearEntries(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEY);
}
