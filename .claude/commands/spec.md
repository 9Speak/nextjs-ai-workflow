---
description: Từ PRD sinh tài liệu kỹ thuật (technical_document.md)
argument-hint: "[ten-feature]  (bỏ trống = suy từ branch)"
---

**Xác định feature:** nếu `$ARGUMENTS` có tên → dùng làm slug; nếu không → `git branch
--show-current` bỏ tiền tố `feat/`. Thư mục `ai/<slug>/`. Chưa có → nhắc `/new` rồi dừng.

Đọc:
- Yêu cầu (PRD do PM viết): `product/<slug>.md`
- Design (nếu có): `ai/<slug>/figma.md`
- Design system: `ai/DESIGN_SYSTEM.md`
- Code liên quan trong `webapp/src/` (để thiết kế bám thực tế)

Dịch yêu cầu sản phẩm thành **thiết kế kỹ thuật**, ghi vào `ai/<slug>/technical_document.md`:
- **Tổng quan & phạm vi** (bám PRD, nêu rõ ngoài phạm vi)
- **Kiến trúc / luồng dữ liệu**
- **Thành phần**: component, module, route, kiểu dữ liệu (types/interfaces)
- **Hợp đồng chính**: props / state / API
- **Ràng buộc design system**: token + primitive sẽ dùng
- **Test plan**: các ca test chính
- **Rủi ro / quyết định kỹ thuật**

Không tự thêm tính năng ngoài PRD. Chỗ PRD chưa rõ → ghi `❓ cần PM làm rõ`, đừng đoán bừa.
Không viết code ở bước này.

Kết thúc: nhắc engineer review `technical_document.md`, rồi chạy `/tasks`.
