import { test, expect } from "bun:test";
import { initialState, answer } from "./quiz";

test("trả lời đúng được +10", () => {
  expect(answer(initialState, true).score).toBe(10);
});

test("sai bị -5 nhưng không xuống dưới 0", () => {
  expect(answer(initialState, false).score).toBe(0);
});

test("trừ điểm bình thường khi còn điểm", () => {
  let s = answer(initialState, true); // 10
  s = answer(s, false); // 5
  expect(s.score).toBe(5);
});

test("thưởng streak: 3 câu đúng liên tiếp = 35", () => {
  let s = initialState;
  s = answer(s, true); // 10
  s = answer(s, true); // 20
  s = answer(s, true); // 30 + 5 thưởng = 35
  expect(s.score).toBe(35);
  expect(s.streak).toBe(3);
});

test("trả lời sai reset streak", () => {
  let s = answer(initialState, true);
  s = answer(s, false);
  expect(s.streak).toBe(0);
});
