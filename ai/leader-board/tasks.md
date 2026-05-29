# Tasks — Bảng xếp hạng (Leaderboard)

## Duyệt: ✅ ĐÃ DUYỆT

### T1 — Logic leaderboard + test
- Trạng thái: 🟡 chờ confirm
- Mục tiêu: `lib/leaderboard.ts` với `topEntries` (thuần) + `loadEntries`/`saveEntry`/`clearEntries`
- File dự kiến: `front-end/src/lib/leaderboard.ts`, `leaderboard.test.ts`
- Tiêu chí xong: test phủ sort giảm dần, cắt top 10, không đột biến input, mảng rỗng

### T2 — Trang /leaderboard
- Trạng thái: 🟡 chờ confirm
- Mục tiêu: render top 10, top 3 nổi bật (token `primary`), trạng thái rỗng + link `/quiz`, nút "Xoá lịch sử" (confirm)
- File dự kiến: `front-end/src/app/leaderboard/page.tsx`
- Tiêu chí xong: hiển thị đúng thứ hạng/điểm/thời gian; rỗng không crash; chỉ dùng token

### T3 — Lưu điểm khi kết thúc quiz
- Trạng thái: 🟡 chờ confirm
- Mục tiêu: ở `app/quiz/page.tsx`, khi `done` → `saveEntry(state.score)` một lần (useEffect); thêm link sang `/leaderboard` ở màn tổng điểm
- File dự kiến: `front-end/src/app/quiz/page.tsx`
- Tiêu chí xong: chơi xong → có bản ghi mới; không lưu trùng mỗi render

### T4 — Link điều hướng ở trang chủ
- Trạng thái: 🟡 chờ confirm
- Mục tiêu: thêm link `/leaderboard` ở `app/page.tsx`
- File dự kiến: `front-end/src/app/page.tsx`
- Tiêu chí xong: từ `/` bấm được sang bảng xếp hạng
