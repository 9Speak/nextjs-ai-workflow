# Báo cáo gap — quiz

## Tóm tắt
- Tổng gap: 5  (🔴 3 · 🟡 2 · 🟢 0)
- ✅ Đã đóng toàn bộ 5/5 trong PR (test 5/5 pass, lint sạch, build OK)

## 🔴 Nghiêm trọng

### 1. Logic tính điểm chưa tồn tại
- Yêu cầu: +10 đúng / −5 sai / sàn 0 / +5 mỗi 3 câu đúng liên tiếp
- Hiện tại: không có `src/lib/quiz.ts`, chưa có test nào
- File: `front-end/src/lib/quiz.ts` (+ `quiz.test.ts`)

### 2. Component QuizCard chưa có
- Yêu cầu: hiện câu hỏi + 4 lựa chọn, phản hồi đúng/sai bằng màu success/danger, hiện điểm
- Hiện tại: không có
- File: `front-end/src/components/QuizCard.tsx`

### 3. Trang /quiz chưa có
- Yêu cầu: render QuizCard với bộ câu hỏi mẫu, hết câu hiện tổng điểm + "Chơi lại"
- Hiện tại: chỉ có trang chủ mặc định
- File: `front-end/src/app/quiz/page.tsx`

## 🟡 Trung bình (tuân thủ design system)

### 4. Thiếu token màu của design system trong code
- Yêu cầu: dùng token `primary` / `success` / `danger` (ai/DESIGN_SYSTEM.md)
- Hiện tại: `globals.css` có `@theme` mặc định nhưng **chưa khai báo** 3 token này
- File: `front-end/src/app/globals.css`

### 5. Rủi ro hardcode màu/spacing
- Yêu cầu: feature không được hardcode `#hex`/`px`, phải qua token
- Hiện tại: chưa có code → cần đảm bảo khi build (QuizCard dùng class `bg-success`/`bg-danger`...)
- File: `front-end/src/components/QuizCard.tsx`

## Khuyến nghị thứ tự
1. Khai báo token (#4) trước → 2. Logic + test (#1) → 3. QuizCard (#2, #5) → 4. Trang /quiz (#3)
