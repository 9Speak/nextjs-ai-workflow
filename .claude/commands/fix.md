---
description: Engineer mô tả bug → AI tự dò task sai → sửa → chờ confirm
argument-hint: "[mô tả bug ngắn, hoặc để trống nếu đã ghi trong feedback.md]"
---

**Xác định feature** (như `/spec`). Thư mục `ai/<slug>/`. App nằm trong `front-end/`.

Lấy mô tả bug từ `$ARGUMENTS` và/hoặc `ai/<slug>/feedback.md`.
Nếu không có mô tả nào → nhắc engineer ghi bug vào `feedback.md` rồi dừng.

1. **Tự dò task liên quan**: đọc `tasks.md` + `technical_document.md` + code trong
   `front-end/src/`, xác định task (và file/đoạn code) nào gây ra bug.
   Nêu rõ kết luận trước khi sửa: *"Bug thuộc task Tx — vì ..."*.
   Nếu bug không khớp task nào → báo có thể thiếu task, hỏi engineer.

2. Đổi trạng thái task đó trong `tasks.md`: `🟡/✅` → `🔴 đang sửa`.

3. Sửa code (chỉ trong phạm vi bug). **Thêm test tái hiện bug** để khỏi tái phát.
   Vẫn bám design system (không hardcode).

4. `cd front-end && bun run lint && bun run test` — phải xanh.

5. Đổi trạng thái task: `🔴` → `🟡 chờ confirm`, ghi 1 dòng "đã sửa gì". Tick mục bug
   trong `feedback.md`.

6. Commit + push lên branch (cùng PR hiện có).

**KHÔNG cập nhật docs/CHANGELOG.** Kết thúc: báo task nào đã sửa, nhắc engineer kiểm
tra lại rồi `/confirm`.
