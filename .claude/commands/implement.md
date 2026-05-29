---
description: Làm các task ĐÃ DUYỆT trong tasks.md → code + test → chờ confirm
argument-hint: "[T số mấy / phần nào cần làm]"
---

**Xác định feature** (như `/spec`). Thư mục `ai/<slug>/`. App nằm trong `webapp/`.

1. Mở `ai/<slug>/tasks.md`, kiểm tra dòng `## Duyệt:`
   - Nếu CHƯA `✅ ĐÃ DUYỆT` → **DỪNG**, nhắc engineer review & duyệt tasks trước.

2. Làm các task `⬜ todo` (theo thứ tự; nếu `$ARGUMENTS` chỉ định task cụ thể thì làm task đó):
   - Bám `ai/<slug>/technical_document.md` + `product/<slug>.md` + `ai/<slug>/figma.md` + `ai/DESIGN_SYSTEM.md`.
   - **Chỉ dùng token/primitive** của design system, không hardcode màu/spacing.
   - Code trong `webapp/src/`, đúng style sẵn có. Chỉ động vào phạm vi của task.
   - Thêm/sửa test cho từng task.

3. `cd webapp && bun run lint && bun run test` — sửa hết lỗi trước khi đi tiếp.

4. Mỗi task xong: đổi trạng thái trong `tasks.md` `⬜ todo` → `🟡 chờ confirm`, ghi 1 dòng "đã làm gì".

5. Đảm bảo ở branch `feat/<slug>`. Commit rõ ràng (liệt kê task đã làm). Push.
   Chưa có PR cho branch → mở bằng `gh pr create` (chưa có `gh` thì báo + hiện diff).

**KHÔNG cập nhật docs/CHANGELOG** ở bước này — để dành `/confirm`.

Kết thúc: liệt kê task đang `🟡 chờ confirm`, nhắc engineer test rồi `/confirm`
(hoặc `/fix` nếu phát hiện bug).
