import { test, expect } from "bun:test";
import { topEntries, type ScoreEntry } from "./leaderboard";

const make = (scores: number[]): ScoreEntry[] =>
  scores.map((s, i) => ({ score: s, at: `2026-01-0${(i % 9) + 1}T00:00:00.000Z` }));

test("sort giảm dần theo điểm", () => {
  expect(topEntries(make([10, 30, 20])).map((e) => e.score)).toEqual([30, 20, 10]);
});

test("cắt còn tối đa 10 (mặc định)", () => {
  const r = topEntries(make([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]));
  expect(r.length).toBe(10);
  expect(r[0].score).toBe(12);
});

test("tôn trọng tham số n", () => {
  expect(topEntries(make([5, 9, 1]), 2).length).toBe(2);
});

test("không đột biến mảng đầu vào", () => {
  const input = make([1, 2, 3]);
  const copy = [...input];
  topEntries(input);
  expect(input).toEqual(copy);
});

test("mảng rỗng → rỗng", () => {
  expect(topEntries([])).toEqual([]);
});
