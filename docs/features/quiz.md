# Feature: Quiz đố vui

## Tóm tắt
Trắc nghiệm nhiều câu, tính điểm theo thời gian thực.

## Route
- `/` — landing, nút "Bắt đầu quiz"
- `/quiz` — màn chơi: câu hỏi + 4 lựa chọn, hiện điểm, hết câu → tổng điểm + "Chơi lại"

## Cách hoạt động
- **Logic điểm** (`src/lib/quiz.ts`, thuần): +10 đúng / −5 sai (sàn 0) / +5 thưởng mỗi 3 câu đúng liên tiếp; sai reset streak.
- **UI** (`src/components/QuizCard.tsx`): 1 câu + 4 nút; chọn đúng → màu `success`, sai → `danger`; rồi sang câu kế.
- **Điều phối** (`src/app/quiz/page.tsx`): giữ state điểm + chỉ số câu, bộ câu hỏi hard-code, nút chơi lại.
- **Design**: chỉ dùng token design system qua class Tailwind (`bg-primary`, `border-success`, `text-danger`); token khai báo trong `globals.css` `@theme`.

## File chính
- `front-end/src/lib/quiz.ts` (+ `quiz.test.ts` — 5 test)
- `front-end/src/components/QuizCard.tsx`
- `front-end/src/app/quiz/page.tsx`
- `front-end/src/app/page.tsx` (landing)
- `front-end/src/app/globals.css` (token)

## Cách test
```bash
cd front-end
bun run test    # 5/5 pass (các quy tắc tính điểm)
bun run dev     # mở http://localhost:3000
```

## Spec gốc
- PRD (PM): [product/quiz.md](../../product/quiz.md)
- Kỹ thuật: [ai/quiz/](../../ai/quiz/) — technical_document.md, tasks.md
