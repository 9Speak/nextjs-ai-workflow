# AI Workflow cho team Next.js

Quy trình để team 2–3 người ship feature bằng **Claude Code**: PM viết PRD, Designer
thiết kế Figma, Engineer gõ vài **lệnh** — Claude tự đọc spec, lấy Figma, viết code,
chạy test, mở PR.

> Không ai phải viết prompt. Không ai copy-paste. Mọi thứ chạy ngay trong Claude Code.
> Mỗi feature một branch riêng ⇒ nhiều người làm song song không đụng nhau.

## Cách hoạt động (pipeline có cổng duyệt)

```
/design-sync → Designer kéo design tokens từ Figma → ai/DESIGN_SYSTEM.md (nền tảng chung)

── Mỗi feature ──
/new <ten>   → tạo thư mục spec + branch feat/<ten>
/sync        → kéo design Figma → ai/<ten>/figma.md            (nếu có Figma)
/spec        → PRD → ai/<ten>/technical_document.md            (thiết kế kỹ thuật)
/tasks       → technical_document → ai/<ten>/tasks.md          (chia task)
      ⟵ Engineer DUYỆT tasks ───────────────────────  cổng 1
/implement   → làm task đã duyệt → code + test → "chờ confirm"
      ⟵ Engineer test. Có bug? ghi feedback.md ──────
/fix         → AI tự dò task sai → sửa → "chờ confirm"
      ⟵ Engineer CONFIRM ───────────────────────────  cổng 2
/confirm     → cập nhật docs/<ten>.md + CHANGELOG (chốt feature)
```

Mọi feature **bám `ai/DESIGN_SYSTEM.md`** (không hardcode màu/spacing, dùng primitive).
Các lệnh **tự biết** đang làm feature nào dựa trên branch. Hai cổng con người: **duyệt
tasks** trước khi code, **confirm** trước khi cập nhật docs.

## Ai làm gì

| Vai trò | Việc | File |
|---------|------|------|
| **Designer** | Giữ design system + thiết kế Figma | `ai/DESIGN_SYSTEM.md` |
| **PM** | Viết yêu cầu + dán link Figma | `product/<ten>.md` |
| **Engineer** | Chạy lệnh, **duyệt tasks**, test, **confirm**, ghi bug | `ai/<ten>/tasks.md`, `feedback.md` |
| **Claude** | spec → tasks → code → test → fix → docs | (tự động) |

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
   /new quiz               # tạo product/quiz.md + ai/quiz/ + branch feat/quiz
   # → PM mở product/quiz.md, điền yêu cầu + dán link Figma
   /sync                   # kéo design về (nếu có Figma)
   /spec                   # PRD → technical_document.md
   /tasks                  # → tasks.md, rồi engineer đổi "Duyệt: ✅ ĐÃ DUYỆT"
   /implement              # code + test → PR
   # test thử; có bug → ghi feedback.md → /fix
   /confirm                # OK rồi → cập nhật docs + CHANGELOG
```

Chi tiết: **[docs/SETUP.md](docs/SETUP.md)** (cài đặt) · **[docs/WORKFLOW.md](docs/WORKFLOW.md)** (quy trình + cách tránh xung đột khi nhiều người làm).

## Cấu trúc

```
.
├── README.md              ← bạn đang ở đây
├── .mcp.json              ← cấu hình Figma MCP (chia sẻ cả team)
├── .claude/
│   ├── settings.json      ← quyền chạy lệnh cho cả team
│   └── commands/          ← 8 lệnh: design-sync, new, sync, spec, tasks, implement, fix, confirm
├── product/               ← PM viết PRD ở đây
│   ├── _template.md        ← mẫu PRD
│   └── <ten-feature>.md    ← PRD mỗi feature
├── ai/
│   ├── DESIGN_SYSTEM.md    ← nền tảng chung (Designer sở hữu)
│   ├── _templates/         ← mẫu feedback.md
│   └── <ten-feature>/      ← AI/eng sinh: figma, technical_document, tasks, feedback
├── docs/
│   ├── SETUP.md
│   ├── WORKFLOW.md
│   ├── CHANGELOG.md        ← /confirm thêm entry mỗi feature
│   ├── FEATURES.md         ← danh sách feature
│   └── features/<ten>.md   ← doc kỹ thuật từng feature
└── front-end/             ← app Next.js thật (code nằm ở đây)
    └── src/...
```
