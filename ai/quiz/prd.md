# PRD — Quiz đố vui

## Figma
<!-- Demo không có Figma thật → mô tả design inline, bám token trong ai/DESIGN_SYSTEM.md.
     Thực tế: dán link Figma ở đây rồi chạy /sync. -->
(không dùng Figma cho demo — bám design system)

## Mục tiêu
Trang `/quiz` cho user trả lời câu hỏi trắc nghiệm và xem điểm theo thời gian thực.

## Tính năng

1. **Logic tính điểm** (`src/lib/quiz.ts`)
   - Trả lời **đúng**: +10 điểm
   - Trả lời **sai**: −5 điểm
   - Điểm **không bao giờ âm** (sàn = 0)
   - **Thưởng streak**: cứ **3 câu đúng liên tiếp** thì +5 điểm thưởng (trả lời sai reset streak)

2. **QuizCard** (`src/components/QuizCard.tsx`)
   - Hiện 1 câu hỏi + 4 lựa chọn (nút bấm)
   - Bấm đúng → màu **success**; bấm sai → màu **danger**
   - Sau khi chọn, hiện câu tiếp theo
   - Hiện điểm hiện tại

3. **Trang `/quiz`** (`src/app/quiz/page.tsx`)
   - Render QuizCard với bộ câu hỏi mẫu (3–4 câu hard-code)
   - Hết câu → hiện tổng điểm + nút "Chơi lại"

## Ràng buộc design
- **Chỉ dùng token** trong `ai/DESIGN_SYSTEM.md`: `primary`, `success`, `danger`, spacing, radius.
- Không hardcode `#hex` hay `px` — dùng class Tailwind ánh xạ tới `@theme` trong `globals.css`.

## Out of scope
- Lưu điểm vào database / backend
- Đăng nhập, bảng xếp hạng
- Câu hỏi lấy từ API (demo dùng câu hỏi hard-code)

## Acceptance criteria
- [ ] `bun run test` xanh: phủ các quy tắc +10 / −5 / sàn 0 / thưởng streak
- [ ] Truy cập `/quiz` chơi được, điểm cập nhật đúng
- [ ] Không có giá trị màu/spacing hardcode (đều qua token)
- [ ] `bun run lint` sạch
