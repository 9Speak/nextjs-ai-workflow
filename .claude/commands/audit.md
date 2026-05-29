---
description: Tìm khoảng chênh giữa spec và code của feature, ghi ai/<feature>/gaps.md
argument-hint: "[ten-feature]  (bỏ trống = suy từ branch)"
---

**Xác định feature đang làm:**
- Nếu `$ARGUMENTS` có tên → dùng làm slug.
- Nếu không → chạy `git branch --show-current`, bỏ tiền tố `feat/` để ra slug.
- Thư mục làm việc là `ai/<slug>/`. Nếu chưa tồn tại, báo chạy `/new <slug>` trước rồi dừng.

So sánh ba nguồn và tìm mọi thứ còn thiếu, sai, hoặc chưa hoàn chỉnh.
**Không sửa code ở bước này** — chỉ tạo báo cáo.

1. **Yêu cầu** — `ai/<slug>/prd.md`
2. **Spec design** — `ai/<slug>/figma.md`  (chạy `/sync` trước nếu rỗng/cũ)
3. **Design system** — `ai/DESIGN_SYSTEM.md` (token + primitive dùng chung)
4. **Code hiện tại** — đọc các file liên quan trong `front-end/src/`

Với mỗi khoảng chênh (gap), ghi rõ:
- **Yêu cầu là gì** (theo PRD / Figma)
- **Code hiện làm gì** (hoặc thiếu hẳn)
- **Mức độ** — 🔴 nghiêm trọng (chặn feature) / 🟡 trung bình / 🟢 nhỏ
- **File cần sửa** — đường dẫn thật, kèm số dòng nếu hữu ích

Bắt buộc kiểm tra thêm **tuân thủ design system** (mỗi vi phạm là một gap 🟡):
- Code có **hardcode** màu (`#hex`), spacing/size (`16px`) thay vì dùng token của
  `ai/DESIGN_SYSTEM.md` không?
- Feature có tự dựng lại component đã có **primitive** (Button, Card, Input...) không?
- Có dùng màu/spacing **không tồn tại** trong design system không? (cần Designer bổ sung)

Ghi kết quả vào `ai/<slug>/gaps.md`:

```markdown
# Báo cáo gap — <ngày>

## Tóm tắt
- Tổng gap: N  (🔴 a · 🟡 b · 🟢 c)
- Ước tính hoàn thành: X%

## 🔴 Nghiêm trọng
### 1. <tiêu đề>
- Yêu cầu: ...
- Hiện tại: ...
- File: `src/...`

## 🟡 Trung bình
...

## 🟢 Nhỏ
...
```

Phải cụ thể và chỉ vào code thật. Bỏ qua mấy lỗi style vặt mà lint đã lo.
Kết thúc bằng việc nhắc người dùng xem `ai/<slug>/gaps.md`, rồi chạy `/build`.
