---
description: Code các gap (+ feedback) của feature, chạy test, mở PR
argument-hint: "[gap số mấy / phần nào cần tập trung]"
---

**Xác định feature đang làm:**
- Chạy `git branch --show-current`, bỏ tiền tố `feat/` để ra slug. Đây là feature đang build.
- Thư mục làm việc là `ai/<slug>/`. Nếu không xác định được branch hoặc thư mục chưa
  tồn tại, hỏi người dùng đang làm feature nào rồi dừng.

Implement các bản sửa cho feature này. Nguồn, theo thứ tự ưu tiên:

1. Feedback của reviewer (làm trước nếu có) — `ai/<slug>/feedback.md`
2. Các gap cần đóng — `ai/<slug>/gaps.md`
3. Yêu cầu — `ai/<slug>/prd.md`
4. Spec design — `ai/<slug>/figma.md`
5. Design system (token + primitive bắt buộc dùng) — `ai/DESIGN_SYSTEM.md`

Tập trung vào: $ARGUMENTS
(Nếu dòng trên trống thì xử lý lần lượt tất cả gap 🔴 rồi đến 🟡.)

**Quy tắc**
- App Next.js nằm trong `front-end/`. Code trong `front-end/src/`, chạy lệnh trong đó.
- Next.js App Router + TypeScript (strict). Bám theo code style và cấu trúc thư mục sẵn có.
- Chỉ động vào file cần cho gap/feedback đang làm — không refactor lan man.
- Bám sát spec Figma: màu, spacing, typography, và mọi trạng thái.
- **Chỉ dùng token/primitive từ `ai/DESIGN_SYSTEM.md`** (qua Tailwind theme / CSS vars).
  Tuyệt đối KHÔNG hardcode `#hex` hay `16px`. Tái dùng primitive (Button/Card...) thay vì dựng lại.
  Thiếu token cần thiết? → **dừng và báo** để Designer bổ sung qua `/design-sync`, đừng tự bịa.
- Thêm/sửa test cho phần vừa làm.

**Sau đó, theo thứ tự**
1. `cd front-end && bun run lint && bun run test` — sửa hết lỗi trước khi đi tiếp.
2. Đảm bảo đang ở branch `feat/<slug>` (nếu đang ở `main` thì tạo branch trước khi commit).
3. Commit với message rõ ràng: đã đổi gì và đóng những gap nào.
4. Mở PR bằng `gh pr create` — mô tả liệt kê gap đã đóng và cách test. Nếu PR cho
   branch này đã tồn tại, chỉ cần push commit mới lên (không tạo PR trùng).

Khi một gap hoặc mục feedback đã xong, tick nó trong file tương ứng.
Kết thúc bằng việc trả về link PR. Nếu chưa cài `gh`/git, dừng sau bước 1 và hiện
diff để engineer tự commit.
