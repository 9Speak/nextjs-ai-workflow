---
description: Bắt đầu feature mới — tạo thư mục spec riêng + branch riêng
argument-hint: "<ten-feature-kebab>  (vd: quiz-engine)"
---

Tên feature (slug): $ARGUMENTS

Nếu trống hoặc không phải kebab-case, hỏi người dùng đặt tên (chữ thường, nối bằng
gạch ngang) rồi dừng.

Các bước:

1. Tạo thư mục `ai/<slug>/`. Copy:
   - `ai/_templates/prd.md` → `ai/<slug>/prd.md`
   - `ai/_templates/feedback.md` → `ai/<slug>/feedback.md`
   Nếu `ai/<slug>/` đã tồn tại thì báo người dùng và dừng (tránh ghi đè).

2. Tạo branch riêng từ main mới nhất:
   `git checkout main && git pull && git checkout -b feat/<slug>`
   (Nếu chưa phải git repo, bỏ qua bước này và nhắc người dùng tự tạo branch.)

3. Báo người dùng: mở `ai/<slug>/prd.md`, điền yêu cầu + dán link Figma, rồi chạy `/sync`.

> Mỗi feature một thư mục + một branch ⇒ nhiều người làm song song không đụng file
> của nhau, và mỗi feature đi ra một PR riêng.
