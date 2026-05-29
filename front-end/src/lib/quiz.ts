export interface Question {
  prompt: string;
  options: string[];
  correctIndex: number;
}

export interface ScoreState {
  score: number;
  streak: number;
}

export const initialState: ScoreState = { score: 0, streak: 0 };

/**
 * Tính điểm sau một câu trả lời (thuần, không đổi state đầu vào).
 * - đúng: +10 ; sai: -5 (sàn 0) ; +5 thưởng mỗi 3 câu đúng liên tiếp.
 */
export function answer(state: ScoreState, correct: boolean): ScoreState {
  if (!correct) {
    return { score: Math.max(0, state.score - 5), streak: 0 };
  }
  const streak = state.streak + 1;
  let score = state.score + 10;
  if (streak % 3 === 0) score += 5;
  return { score, streak };
}
