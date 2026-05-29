# Quy trình đầy đủ

Giải thích pipeline chạy thế nào, ai làm gì, 2 cổng duyệt của con người, làm feature
mới vs sửa bug, và **nhiều người làm song song không đụng nhau**. Cài đặt: xem [SETUP.md](SETUP.md).

## Ý tưởng cốt lõi

Claude Code **chính là engine**. Các lệnh trong `.claude/commands/` là "prompt mẫu" viết
sẵn — bạn gõ lệnh, Claude đọc đúng file của feature và làm đúng việc.

PRD **không build thẳng**. Nó đi qua một pipeline có kiểm soát, với **2 cổng duyệt của
engineer** để AI không tự tung tự tác:

```
/new <feature>     tạo product/<feature>.md (PRD) + ai/<feature>/ + branch feat/<feature>
      │
      PM điền product/<feature>.md ──(/sync)──► ai/<feature>/figma.md   (design, nếu có Figma)
      │
      ├─(/spec)──►  technical_document.md           (thiết kế kỹ thuật từ PRD)
      ├─(/tasks)─►  tasks.md                         (chia nhỏ thành task)
      │
      ⟵ Engineer XEM & DUYỆT tasks ────────────  CỔNG 1 (đổi "Duyệt: ✅ ĐÃ DUYỆT")
      │
      ├─(/implement)─► code + test → task "🟡 chờ confirm"
      │
      ⟵ Engineer test. Có bug? ghi feedback.md ──
      ├─(/fix)──► AI tự dò task sai → sửa → "🟡 chờ confirm"
      │
      ⟵ Engineer CONFIRM đã ổn ─────────────────  CỔNG 2
      │
      └─(/confirm)─► task "✅ confirmed" + cập nhật docs/<feature>.md + CHANGELOG
```

**Đơn vị công việc = 1 feature = 1 thư mục `ai/<slug>/` = 1 branch `feat/<slug>` = 1 PR.**

## RACI — ai làm gì

| Việc | PM | Designer | Engineer | Claude |
|------|----|----------|----------|--------|
| Design system (`ai/DESIGN_SYSTEM.md`) + `/design-sync` | I | **R** | C | hỗ trợ |
| Viết yêu cầu (`product/<f>.md`) | **R** | C | C | — |
| Thiết kế Figma + dán link | C | **R** | I | — |
| `/spec` → `/tasks` (sinh tài liệu KT + task) | C | I | **A** | **R** |
| **Duyệt tasks** (cổng 1) | C | I | **R** | — |
| `/implement`, `/fix` (code + test) | I | I | **A** | **R** |
| Test & **confirm** (cổng 2) | C | C | **R** | — |
| `/confirm` (docs + CHANGELOG) | I | I | **A** | **R** |
| Merge PR vào main | C | C | **R** | — |

*R = làm, A = duyệt/chịu trách nhiệm, C = góp ý, I = được thông báo.*

## Design System — nền tảng chung

Bộ token dùng chung (màu, typography, spacing, radius, shadow) + component primitive
(Button, Card, Input). `ai/DESIGN_SYSTEM.md` là **bản hợp đồng**, **Designer sở hữu**.

- **Nguồn:** Figma library. Link ở đầu `ai/DESIGN_SYSTEM.md`.
- **Cập nhật:** `/design-sync` kéo token về + cập nhật token trong code (`webapp/src/app/globals.css`, `@theme`). Chạy **thưa**, đi ra **PR riêng** `chore/design-system` (vì ảnh hưởng mọi feature).
- **Ràng buộc:** `/spec` thiết kế bám token; `/implement` chỉ dùng token + primitive, không hardcode `#hex`/`px`; thiếu token → báo Designer bổ sung, không bịa.

---

## Luồng 1 — Tính năng MỚI

```
/new quiz                # ai/quiz/ + branch feat/quiz
# PM điền product/quiz.md (mục tiêu, tính năng, business logic, out of scope, AC) + link Figma
/sync                    # (nếu có Figma) → ai/quiz/figma.md
/spec                    # PRD → ai/quiz/technical_document.md  ← engineer review thiết kế
/tasks                   # → ai/quiz/tasks.md
#   ⟵ Engineer xem tasks.md, chỉnh nếu cần, đổi "## Duyệt: ✅ ĐÃ DUYỆT"   (CỔNG 1)
/implement               # làm task đã duyệt → lint + test → commit → PR; task → 🟡 chờ confirm
#   ⟵ Engineer test trên browser
/confirm                 # nếu OK → task ✅ confirmed + cập nhật docs/CHANGELOG   (CỔNG 2)
# → merge PR vào main
```

## Luồng 2 — SỬA BUG

```
git checkout -b fix/quiz-scoring         # branch mới cho đợt sửa
# Engineer mô tả bug rõ ràng vào ai/quiz/feedback.md (tái hiện, kỳ vọng vs thực tế)
/fix                                      # AI tự dò task nào sai → sửa → test → 🟡 chờ confirm
#   ⟵ Engineer kiểm tra lại
/confirm                                  # OK → ✅ confirmed + cập nhật docs/CHANGELOG
```

Điểm mấu chốt: **engineer không cần chỉ tay vào code** — chỉ mô tả bug, `/fix` tự đọc
`tasks.md` + `technical_document.md` + code để tìm task/đoạn sai, rồi sửa và thêm test
tái hiện. Sửa xong **chờ engineer confirm** mới đụng tới docs.

**Mở rộng feature đã có:** cập nhật `product/<f>.md` → `/spec` (cập nhật technical_document) →
`/tasks` (thêm task mới) → duyệt → `/implement` → confirm.

**Sửa vặt 1–2 dòng** (typo, đổi 1 màu): khỏi cần pipeline — sửa thẳng rồi commit.

---

## Vì sao docs cập nhật ở CUỐI (sau confirm)

Docs/CHANGELOG chỉ ghi **sau khi engineer confirm đúng** → tài liệu luôn phản ánh
trạng thái đã kiểm chứng, không phải bản nháp. Mục đích: **lần sau quay lại còn đọc để
tối ưu / sửa code**. Mỗi feature để lại:
- `ai/<slug>/` — spec + thiết kế kỹ thuật + tasks (vì sao & làm gì)
- `docs/features/<slug>.md` — cách hoạt động cho người mới
- `docs/CHANGELOG.md` — đã ship gì, khi nào

---

## Nhiều người làm song song — vì sao KHÔNG xung đột

**1. Tách file theo feature.** Mỗi feature ghi vào `ai/<slug>/` riêng — hai người không chạm cùng file spec.

**2. Tách branch theo feature.** Mỗi feature một branch `feat/<slug>`. Code chỉ gặp nhau lúc merge PR. Không sửa thẳng `main`.

**3. Một người "lái" một branch.** Đừng để hai người cùng `/implement` trên cùng branch.

**4. Rebase main thường xuyên.** Trước khi mở PR: `git checkout main && git pull` rồi `git rebase main`.

**5. Tránh đụng "vùng chung".** File lõi nhiều feature cùng cần (vd `globals.css` tokens, layout gốc) → tách PR nhỏ làm trước, cả hai rebase. Design system đã theo đúng cách này (`/design-sync` ra PR riêng).

### Dính merge conflict ở code
Lành: nhờ Claude — `git rebase main`, rồi *"giải quyết conflict, giữ đúng cả hai thay đổi"*. Test lại trước khi push.

### (Tùy chọn) git worktree
Chạy 2 feature cùng lúc không cần checkout qua lại:
```
git worktree add ../app-leaderboard feat/leaderboard
```

---

## Mẹo dùng tốt

**Nên**
- PM viết PRD cụ thể (business logic + *Out of scope*) — đầu vào càng rõ, `/spec` và `/tasks` càng đúng.
- **Đọc kỹ tasks.md trước khi duyệt** — đây là lúc nắn hướng rẻ nhất, trước khi code.
- Mô tả bug đo được (tái hiện, số liệu) để `/fix` dò trúng task.
- Rebase main trước khi mở PR.

**Tránh**
- Chạy `/implement` khi tasks **chưa duyệt** (lệnh sẽ tự dừng).
- Hai người cùng làm một branch.
- Sửa code tay song song với Claude trên cùng file — ghi vào `feedback.md` rồi `/fix`.
- PRD mơ hồ ("làm đẹp lên").

## Tùy biến

Các lệnh chỉ là file Markdown trong `.claude/commands/`. Đổi quy tắc (bắt buộc coverage,
convention đặt tên branch, mẫu technical_document...) → sửa thẳng file `.md`, không cần code.
