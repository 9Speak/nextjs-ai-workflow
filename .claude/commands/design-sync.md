---
description: Kéo design tokens từ Figma library về ai/DESIGN_SYSTEM.md (chạy thưa, ra PR riêng)
---

Cập nhật **nền tảng design dùng chung** cho cả dự án. Đây là việc hiếm khi làm và
ảnh hưởng mọi feature → nên đi ra **một PR riêng**, không gộp với feature nào.

1. Đọc `ai/DESIGN_SYSTEM.md`, lấy link **Figma library** ở đầu file.
   Nếu chưa có link, báo người dùng thêm vào rồi dừng.

2. Dùng **Figma MCP** để kéo published variables / styles của library:
   - màu, typography, spacing, radius, shadow, breakpoints
   - tên token đúng như trong Figma (đừng tự đổi tên)

3. Cập nhật `ai/DESIGN_SYSTEM.md`: ghi token + giá trị chính xác vào các bảng tương ứng.
   - Nếu một token **đổi giá trị** hoặc **bị xoá** so với bản cũ, ghi rõ trong phần
     tóm tắt (đây là breaking change ảnh hưởng các feature đang dùng).

4. Cập nhật luôn token trong code cho khớp — Tailwind v4: block `@theme` trong
   `front-end/src/app/globals.css` (xem mục "Token sống ở đâu" trong DESIGN_SYSTEM.md).

5. Tạo branch `chore/design-system` và commit. Mở PR bằng `gh pr create`, phần mô tả
   liệt kê token đã thêm/đổi/xoá và những feature có thể bị ảnh hưởng.

Nếu Figma MCP chưa đăng nhập: nhắc chạy `/mcp` → figma → authenticate. Không bịa token.
