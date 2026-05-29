# PRD — Bảng xếp hạng (Leaderboard)

## Figma
(không dùng Figma cho demo — bám design system)

## Mục tiêu
Lưu lại điểm mỗi lần chơi quiz và hiển thị bảng xếp hạng top điểm cao, để người chơi
có động lực phá kỷ lục.

## Tính năng

1. **Lưu điểm sau khi chơi**
   - Khi kết thúc quiz (màn tổng điểm ở `/quiz`), tự lưu 1 bản ghi vào localStorage.
   - Bản ghi gồm: điểm + thời điểm chơi.

2. **Trang `/leaderboard`**
   - Hiện **top 10** điểm cao nhất, sắp giảm dần.
   - Mỗi dòng: hạng (#1, #2...), điểm, thời gian chơi.
   - Trống (chưa có lượt nào) → hiện thông báo "Chưa có điểm, chơi quiz ngay" + link `/quiz`.
   - Nút **"Xoá lịch sử"** (xoá toàn bộ bản ghi, có xác nhận).

3. **Liên kết điều hướng**
   - Trang chủ `/` và màn tổng điểm `/quiz` có link sang `/leaderboard`.

## Business logic / Edge cases
- Lưu tối đa giữ lại tất cả bản ghi, nhưng chỉ hiển thị top 10.
- localStorage rỗng / lỗi parse → coi như chưa có điểm (không crash).
- Top 3 làm nổi bật (màu `primary`).

## Out of scope
- Backend / đăng nhập / xếp hạng nhiều người (chỉ localStorage trên máy người dùng).
- Tên người chơi (chỉ điểm + thời gian).

## Acceptance criteria
- [ ] Chơi xong quiz → điểm xuất hiện trong `/leaderboard`
- [ ] Top sắp giảm dần đúng, hiển thị tối đa 10
- [ ] Trạng thái rỗng hiển thị đúng, không crash khi localStorage hỏng
- [ ] Nút "Xoá lịch sử" hoạt động (có xác nhận)
- [ ] Chỉ dùng token design system, `bun run test` + `lint` xanh
