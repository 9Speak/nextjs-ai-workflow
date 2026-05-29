# Thư mục ai/ — spec theo từng feature

Mỗi feature có **một thư mục riêng**, tạo bằng `/new <slug>`:

```
ai/
├── DESIGN_SYSTEM.md     ← nền tảng chung toàn dự án (Designer sở hữu, /design-sync)
├── _templates/          ← mẫu gốc (đừng sửa trực tiếp)
│   ├── prd.md
│   └── feedback.md
├── quiz/                ← 1 feature = 1 thư mục = 1 branch feat/quiz
│   ├── prd.md                   ← PM điền (yêu cầu + link Figma)
│   ├── figma.md                 ← tự sinh bởi /sync
│   ├── technical_document.md    ← tự sinh bởi /spec (thiết kế kỹ thuật)
│   ├── tasks.md                 ← tự sinh bởi /tasks (task + trạng thái, engineer duyệt)
│   └── feedback.md              ← Engineer ghi bug → /fix
└── leaderboard/
    └── ...
```

**Vòng đời 1 feature:**
`/new` → PM điền `prd.md` → `/sync` (Figma) → `/spec` (→ technical_document) →
`/tasks` (→ tasks.md, engineer **duyệt**) → `/implement` → test → `/fix` (nếu bug) →
engineer **confirm** → `/confirm` (cập nhật docs + CHANGELOG).

**Vì sao tách thư mục:** hai người làm hai feature cùng lúc không ghi đè file của nhau,
mỗi feature đi ra một PR độc lập. Branch `feat/<slug>` là ngữ cảnh — các lệnh tự suy ra
feature từ tên branch.

**`DESIGN_SYSTEM.md` là toàn cục** (không thuộc feature nào): mọi feature phải dùng token
+ primitive trong đó. Cập nhật bằng `/design-sync`, đi ra PR `chore/design-system` riêng.

**`tasks.md` có cổng duyệt:** dòng `## Duyệt:` phải là `✅ ĐÃ DUYỆT` thì `/implement` mới chạy.
Trạng thái mỗi task: `⬜ todo` → `🟡 chờ confirm` (đã làm) → `✅ confirmed` (engineer OK);
`🔴 đang sửa` khi `/fix` xử lý bug.
