# AI Workflow cho team Next.js

Quy trình để team 2–3 người ship feature bằng **Claude Code**: PM viết PRD, Designer
thiết kế Figma, Engineer gõ vài **lệnh** — Claude tự đọc spec, lấy Figma, viết code,
chạy test, mở PR.

> Không ai phải viết prompt. Không ai copy-paste. Mọi thứ chạy ngay trong Claude Code.
> Mỗi feature một branch riêng ⇒ nhiều người làm song song không đụng nhau.

## Cách hoạt động (5 lệnh)

```
/design-sync → Designer kéo design tokens từ Figma library → ai/DESIGN_SYSTEM.md
               (nền tảng chung, chạy thưa, ra PR riêng)

/new <ten>   → tạo thư mục spec + branch feat/<ten> cho 1 feature
/sync        → Claude kéo design Figma của feature về  ai/<ten>/figma.md
/audit       → Claude so PRD + Figma + design system với code → ai/<ten>/gaps.md
/build       → Claude viết code (chỉ dùng design token), chạy test, mở PR
```

Mọi feature **bám theo `ai/DESIGN_SYSTEM.md`** — không hardcode màu/spacing, tái dùng
component primitive. `/sync` `/audit` `/build` **tự biết** đang làm feature nào dựa
trên branch hiện tại. Sửa lại sau review? Ghi vào `ai/<ten>/feedback.md` rồi `/build` lại.

## Ai làm gì

| Vai trò | Việc | File |
|---------|------|------|
| **Designer** | Giữ design system + thiết kế feature trên Figma | `ai/DESIGN_SYSTEM.md` |
| **PM** | Viết yêu cầu + dán link Figma | `ai/<ten>/prd.md` |
| **Engineer** | `/new` → `/sync` → `/audit` → `/build`, review PR | `ai/<ten>/feedback.md` |

## Bắt đầu nhanh

```bash
# 1. Cài Bun + dependencies
curl -fsSL https://bun.sh/install | bash
bun install
```

```text
# 2. Mở Claude Code trong thư mục dự án, kết nối Figma 1 lần:
   /mcp  → figma → authenticate

# 3. Làm 1 feature từ đầu đến cuối:
   /new quiz-engine        # tạo ai/quiz-engine/ + branch feat/quiz-engine
   # → PM mở ai/quiz-engine/prd.md, điền yêu cầu + dán link Figma
   /sync                   # kéo design về
   /audit                  # xem ai/quiz-engine/gaps.md
   /build                  # → PR trên GitHub
```

Chi tiết: **[docs/SETUP.md](docs/SETUP.md)** (cài đặt) · **[docs/WORKFLOW.md](docs/WORKFLOW.md)** (quy trình + cách tránh xung đột khi nhiều người làm).

## Cấu trúc

```
.
├── README.md              ← bạn đang ở đây
├── .mcp.json              ← cấu hình Figma MCP (chia sẻ cả team)
├── .claude/
│   ├── settings.json      ← quyền chạy lệnh cho cả team
│   └── commands/          ← 5 lệnh: design-sync, new, sync, audit, build
├── ai/
│   ├── DESIGN_SYSTEM.md    ← nền tảng chung (Designer sở hữu)
│   ├── _templates/         ← mẫu prd.md, feedback.md
│   └── <ten-feature>/      ← mỗi feature 1 thư mục (tạo bằng /new)
├── docs/
│   ├── SETUP.md
│   └── WORKFLOW.md
└── front-end/             ← app Next.js thật (code nằm ở đây)
    └── src/...
```
