# Thư mục product/ — PRD do PM viết

Khu vực của **PM**. Mỗi feature một file PRD: `product/<feature>.md`.

- `_template.md` — mẫu để bắt đầu (lệnh `/new` tự copy thành `product/<feature>.md`).
- PM điền: mục tiêu, tính năng, business logic, *Out of scope*, acceptance criteria, và
  **link Figma** (nếu có) để `/sync` kéo design.

Tài liệu **kỹ thuật** (technical_document, tasks) do AI/engineer sinh ra nằm ở
`ai/<feature>/` — không lẫn vào đây.

Vòng đời: PM viết `product/<feature>.md` → engineer chạy `/spec` → `/tasks` → duyệt →
`/implement` → confirm. Chi tiết: [../docs/WORKFLOW.md](../docs/WORKFLOW.md).
