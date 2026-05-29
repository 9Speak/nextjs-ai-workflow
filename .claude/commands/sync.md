---
description: Kéo design Figma của feature hiện tại về ai/<feature>/figma.md
argument-hint: "[ten-feature]  (bỏ trống = suy từ branch)"
---

**Xác định feature đang làm:**
- Nếu `$ARGUMENTS` có tên → dùng làm slug.
- Nếu không → chạy `git branch --show-current`, bỏ tiền tố `feat/` để ra slug.
- Thư mục làm việc là `ai/<slug>/`. Nếu thư mục chưa tồn tại, báo người dùng chạy
  `/new <slug>` trước rồi dừng.

Đọc `ai/<slug>/prd.md` và tìm link Figma (dạng `https://figma.com/...` hoặc
`https://figma.com/design/...`, kèm `?node-id=` nếu có).

Nếu không tìm thấy link Figma, báo người dùng thêm vào `ai/<slug>/prd.md` rồi dừng.

Dùng các tool của **Figma MCP** để lấy design của file/node đó. Kéo về:
- cấu trúc component và tên layer
- màu, typography, spacing, bo góc, và các design token khác
- các trạng thái (default, hover, active, focus, disabled)
- nội dung text / nhãn

**Đối chiếu với design system** — đọc `ai/DESIGN_SYSTEM.md`:
- Diễn đạt giá trị bằng **tên token** của hệ thống (vd `--color-primary`, `space-4`,
  `radius-md`) thay vì hex/px thô, khi giá trị trùng khớp.
- Nếu Figma của feature dùng giá trị **không có trong design system** (màu lạ, spacing
  lệch scale), **đánh dấu "⚠️ lệch design system"** kèm giá trị thô để Designer xử lý
  (sửa design cho khớp, hoặc bổ sung token qua `/design-sync`). Không tự thêm token.
- Ưu tiên ghi chú "dùng primitive `Button`/`Card`/..." nếu component khớp primitive có sẵn.

Ghi một bản spec sạch, sẵn sàng để code, vào `ai/<slug>/figma.md` bằng Markdown:
- mỗi component một mục `##`
- giá trị theo **token** (kèm giá trị thô trong ngoặc nếu cần đối chiếu)
- mỗi component có mục con "Trạng thái"
- một mục "⚠️ Lệch design system" liệt kê các chỗ không khớp token (nếu có)

Nếu Figma MCP chưa đăng nhập, báo người dùng chạy `/mcp` → chọn `figma` →
authenticate, rồi chạy lại `/sync`. Tuyệt đối không bịa giá trị design.
