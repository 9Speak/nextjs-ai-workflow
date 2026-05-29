# Thư mục ai/ — workspace AI/engineering theo feature

> **PRD do PM viết nằm ở `product/<feature>.md`, KHÔNG ở đây.** Thư mục `ai/` chỉ chứa
> thứ **AI/engineer** sinh ra từ PRD + thiết kế chung.

```
product/
├── _template.md             ← mẫu PRD (PM copy khi /new)
├── quiz.md                  ← PRD do PM viết
└── leader-board.md

ai/
├── DESIGN_SYSTEM.md         ← nền tảng chung (Designer sở hữu, /design-sync)
├── _templates/
│   └── feedback.md
├── quiz/
│   ├── figma.md                 ← /sync (từ link Figma trong product/quiz.md)
│   ├── technical_document.md    ← /spec (từ product/quiz.md)
│   ├── tasks.md                 ← /tasks (task + trạng thái, engineer duyệt)
│   └── feedback.md              ← engineer ghi bug → /fix
└── leader-board/
    └── ...
```

**Vì sao tách `product/` và `ai/`:** PRD là tài liệu **sản phẩm của PM**; technical_document
+ tasks là tài liệu **kỹ thuật do AI/engineer sinh**. Tách khu giúp rõ ai sở hữu cái gì,
PM không phải lội vào file kỹ thuật.

**Vòng đời 1 feature:**
`/new` → PM điền `product/<f>.md` → `/sync` (Figma) → `/spec` (→ technical_document) →
`/tasks` (→ tasks.md, engineer **duyệt**) → `/implement` → `/fix` (nếu bug) →
engineer **confirm** → `/confirm` (docs + CHANGELOG).

**Cô lập xung đột:** mỗi feature = `product/<f>.md` + `ai/<f>/` + branch `feat/<f>` + 1 PR.
Hai người làm hai feature không đụng file của nhau.

**`tasks.md` có cổng duyệt:** dòng `## Duyệt:` phải `✅ ĐÃ DUYỆT` thì `/implement` mới chạy.
Trạng thái task: `⬜ todo` → `🟡 chờ confirm` → `✅ confirmed`; `🔴 đang sửa` khi `/fix`.
