---
description: Engineer xác nhận OK → chốt task + cập nhật docs & CHANGELOG
argument-hint: "[ten-feature]"
---

**Xác định feature** (như `/spec`). Thư mục `ai/<slug>/`.

⚠️ Chỉ chạy khi **engineer đã test và hài lòng** — đây là cổng xác nhận của con người.

1. Mở `ai/<slug>/tasks.md`: đổi mọi task `🟡 chờ confirm` → `✅ confirmed`.
   - Còn task `⬜ todo` hoặc `🔴 đang sửa` → cảnh báo feature chưa xong hẳn (vẫn cho chốt
     phần đã confirmed nếu engineer muốn tiếp tục).

2. Cập nhật tài liệu (dùng ngày hôm nay):
   - **`docs/features/<slug>.md`**: feature làm gì, route, cách hoạt động, file chính,
     cách test, link spec (`ai/<slug>/`). Viết để người mới đọc hiểu nhanh — để lần sau
     quay lại còn tối ưu / sửa code.
   - **`docs/FEATURES.md`**: thêm/cập nhật 1 dòng — tên, route, trạng thái ✅, link doc.
   - **`docs/CHANGELOG.md`**: thêm entry lên đầu — ngày, feature, tóm tắt, số PR.

3. Commit `docs: chốt <feature>` + push. Cập nhật mô tả PR (đánh dấu đã confirm).

Kết thúc: báo feature đã chốt + đã cập nhật docs. Nhắc bước cuối là merge PR vào main.
