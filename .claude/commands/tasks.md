---
description: Từ tài liệu kỹ thuật chia nhỏ thành tasks.md để engineer duyệt
argument-hint: "[ten-feature]"
---

**Xác định feature** (như `/spec`: `$ARGUMENTS` hoặc branch `feat/<slug>`). Thư mục `ai/<slug>/`.

Đọc `ai/<slug>/technical_document.md` (tham chiếu thêm `product/<slug>.md`, `ai/<slug>/figma.md`).
Nếu chưa có `technical_document.md` → nhắc chạy `/spec` trước rồi dừng.

Chia thiết kế thành các **task nhỏ, làm & test được độc lập**, theo thứ tự hợp lý.
Ghi vào `ai/<slug>/tasks.md`:

```markdown
# Tasks — <feature>

## Duyệt: 🔵 CHỜ DUYỆT
<!-- Engineer xem xong, chỉnh nếu cần, rồi đổi dòng trên thành: ## Duyệt: ✅ ĐÃ DUYỆT -->

### T1 — <tiêu đề ngắn>
- Trạng thái: ⬜ todo
- Mục tiêu: ...
- File dự kiến: `webapp/src/...`
- Tiêu chí xong: ...

### T2 — ...
```

Mỗi task đủ nhỏ để review & test riêng; ghi rõ tiêu chí xong để sau /implement và
/fix biết task nào ứng với phần nào. **Không viết code ở bước này.**

Kết thúc: nhắc engineer XEM `tasks.md`, chỉnh/bổ sung, rồi đổi `Duyệt:` thành
`✅ ĐÃ DUYỆT` và chạy `/implement`.
