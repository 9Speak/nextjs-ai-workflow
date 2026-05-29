# Thư mục ai/ — spec theo từng feature

Mỗi feature có **một thư mục riêng**, tạo bằng `/new <slug>`:

```
ai/
├── DESIGN_SYSTEM.md     ← nền tảng chung toàn dự án (Designer sở hữu, /design-sync)
├── _templates/          ← mẫu gốc (đừng sửa trực tiếp)
│   ├── prd.md
│   └── feedback.md
├── quiz-engine/         ← 1 feature = 1 thư mục = 1 branch feat/quiz-engine
│   ├── prd.md           ← PM điền (yêu cầu + link Figma)
│   ├── feedback.md      ← Engineer ghi lỗi khi review
│   ├── figma.md         ← tự sinh bởi /sync
│   └── gaps.md          ← tự sinh bởi /audit
└── leaderboard/
    └── ...
```

**Vì sao tách thư mục:** hai người làm hai feature cùng lúc sẽ không ghi đè file
của nhau, và mỗi feature đi ra một PR độc lập. Branch `feat/<slug>` là ngữ cảnh —
các lệnh `/sync` `/audit` `/build` tự suy ra feature từ tên branch.

**`DESIGN_SYSTEM.md` là toàn cục** (không thuộc feature nào): mọi feature phải dùng
token + primitive trong đó. Cập nhật bằng `/design-sync`, đi ra PR `chore/design-system`
riêng.
