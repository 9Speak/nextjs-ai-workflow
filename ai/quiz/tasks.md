# Tasks — Quiz đố vui

## Duyệt: ✅ ĐÃ DUYỆT

### T1 — Token design system
- Trạng thái: ✅ confirmed
- Mục tiêu: thêm `primary`/`success`/`danger` vào `globals.css` `@theme`
- File: `front-end/src/app/globals.css`
- Đã làm: thêm block `@theme` với 3 token.

### T2 — Logic tính điểm + test
- Trạng thái: ✅ confirmed
- Mục tiêu: `answer()` đúng quy tắc (+10/−5/sàn 0/thưởng streak) + test
- File: `front-end/src/lib/quiz.ts`, `quiz.test.ts`
- Đã làm: hàm thuần + 5 test pass.

### T3 — QuizCard
- Trạng thái: ✅ confirmed
- Mục tiêu: câu hỏi + 4 lựa chọn, phản hồi success/danger, hiện điểm
- File: `front-end/src/components/QuizCard.tsx`
- Đã làm: client component, chỉ dùng token.

### T4 — Trang /quiz + landing /
- Trạng thái: ✅ confirmed
- Mục tiêu: điều phối quiz + tổng điểm + chơi lại; landing dẫn sang quiz
- File: `front-end/src/app/quiz/page.tsx`, `front-end/src/app/page.tsx`
- Đã làm: page điều phối + landing.

> Ghi chú: quiz được làm trước khi có pipeline /spec→/tasks; hồ sơ này được bổ sung lại
> cho khớp model mới (tất cả task đã confirmed).
