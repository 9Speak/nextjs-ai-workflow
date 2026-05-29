# Technical Document — Bảng xếp hạng (Leaderboard)

## Tổng quan & phạm vi
Lưu điểm mỗi lượt chơi vào **localStorage** và hiển thị top 10 ở `/leaderboard`.
Không backend, không tên người chơi (xem *Out of scope* trong product/leader-board.md).

## Kiến trúc / luồng dữ liệu
- Tách **logic thuần** (sắp xếp + giới hạn top N) khỏi truy cập localStorage để test được.
- `/quiz` (đang có) là nơi **ghi** điểm khi kết thúc; `/leaderboard` là nơi **đọc**.
- Khóa localStorage dùng chung: `quiz-leaderboard`.

## Thành phần
- `lib/leaderboard.ts`
  - `interface ScoreEntry { score: number; at: string }`  (at = ISO time)
  - `topEntries(entries: ScoreEntry[], n = 10): ScoreEntry[]`  ← **thuần**, sort giảm dần theo score, lấy n đầu
  - `loadEntries(): ScoreEntry[]`  (đọc localStorage, parse an toàn, lỗi → `[]`)
  - `saveEntry(score: number): void`  (append bản ghi mới)
  - `clearEntries(): void`
- `app/leaderboard/page.tsx` (client) — đọc `topEntries(loadEntries())`, render bảng, trạng thái rỗng, nút "Xoá lịch sử" (confirm).
- Sửa `app/quiz/page.tsx` — khi `done` chuyển true, gọi `saveEntry(state.score)` **một lần** (useEffect theo `done`); thêm link sang `/leaderboard` ở màn tổng điểm.
- Sửa `app/page.tsx` — thêm link `/leaderboard`.

## Hợp đồng chính
- `topEntries`: input mảng bất kỳ → output đã sort giảm dần, độ dài ≤ n. Không đột biến input.
- `loadEntries`: không bao giờ throw; JSON hỏng → `[]`.

## Ràng buộc design system
- Dùng token `primary` (làm nổi top 3), `Card`/`Button` style bằng class token (`bg-primary`, `text-foreground`, `border-foreground/10`...). Không hardcode hex/px.

## Test plan
- `topEntries`: sort giảm dần đúng · cắt còn tối đa 10 · không đột biến input · mảng rỗng → `[]`.
- (localStorage để kiểm thủ công trên browser vì bun test không có DOM.)

## Rủi ro / quyết định
- `saveEntry` phải chạy đúng 1 lần khi xong (useEffect phụ thuộc `done`), tránh lưu trùng mỗi render.
- "vùng chung": có sửa `app/quiz/page.tsx` và `app/page.tsx` (feature quiz đã merge vào main) — thay đổi nhỏ, khu trú ở chỗ kết thúc quiz + link.
