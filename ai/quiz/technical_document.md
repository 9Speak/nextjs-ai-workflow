# Technical Document — Quiz đố vui

## Tổng quan & phạm vi
Trang `/quiz` trắc nghiệm + tính điểm thời gian thực, landing ở `/`. Câu hỏi hard-code
(không backend, không API — xem *Out of scope* trong prd.md).

## Kiến trúc / luồng dữ liệu
- Logic điểm là **hàm thuần** trong `lib/quiz.ts` → dễ test, tách khỏi UI.
- State (điểm, chỉ số câu) giữ ở `app/quiz/page.tsx` (client component), truyền xuống
  `QuizCard` qua props; `QuizCard` báo kết quả lên qua `onAnswer(correct)`.

## Thành phần
- `lib/quiz.ts`
  - `interface Question { prompt; options[]; correctIndex }`
  - `interface ScoreState { score; streak }`
  - `initialState`, `answer(state, correct): ScoreState`
- `components/QuizCard.tsx` — props: `question, score, index, total, onAnswer`
- `app/quiz/page.tsx` — bộ câu hỏi mẫu + điều phối + tổng điểm + chơi lại
- `app/page.tsx` — landing link `/quiz`

## Hợp đồng chính
- `answer`: đúng +10 (và +5 nếu streak chia hết 3); sai → `max(0, score-5)`, streak=0.

## Ràng buộc design system
- Token `primary` / `success` / `danger` khai báo trong `globals.css` `@theme`.
- Dùng class `bg-primary`, `border-success`, `text-danger`... — không hardcode hex/px.

## Test plan
- +10 khi đúng · −5 nhưng không âm · trừ điểm bình thường khi còn điểm · thưởng streak 3 câu = 35 · sai reset streak.

## Rủi ro / quyết định
- Không backend → điểm không lưu (chấp nhận cho demo). Streak bonus tính theo `streak % 3`.
