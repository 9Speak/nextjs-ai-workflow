# Quy trình đầy đủ

Giải thích quy trình chạy thế nào, ai làm gì, làm feature mới vs sửa feature cũ, và
**nhiều người làm song song không đụng nhau**. Cài đặt trước: xem [SETUP.md](SETUP.md).

## Ý tưởng cốt lõi

Claude Code **chính là engine** — không có script trung gian in prompt để copy-paste.
Bốn lệnh trong `.claude/commands/` là các "prompt mẫu" viết sẵn. Bạn gõ lệnh, Claude
đọc đúng file của feature và làm đúng việc.

**Đơn vị công việc = 1 feature = 1 thư mục `ai/<slug>/` = 1 branch `feat/<slug>` = 1 PR.**
Đây là điều giữ cho mọi thứ không xung đột (xem mục cuối).

```
/new quiz-engine
        │  tạo ai/quiz-engine/ (prd, feedback)  +  branch feat/quiz-engine
        ▼
ai/quiz-engine/prd.md ──(/sync)──► ai/quiz-engine/figma.md
        │                                  │
        └────────(/audit)──────────────────┴──► ai/quiz-engine/gaps.md
                                                        │
                                      (/build)──────────┘──► code + test + PR
                                                        ▲
                              ai/quiz-engine/feedback.md (sửa vòng sau)
```

## RACI — ai làm gì

| Việc | PM | Designer | Engineer |
|------|----|----------|----------|
| Giữ design system (`ai/DESIGN_SYSTEM.md`) + `/design-sync` | I | **R** | C |
| Viết yêu cầu (`ai/<slug>/prd.md`) | **R** | C | C |
| Thiết kế Figma feature + dán link vào PRD | C | **R** | I |
| `/new` `/sync` `/audit` `/build` | I | I | **R** |
| Review PR & merge | C | C | **R** |

*R = làm, C = góp ý, I = được thông báo.*

## Design System — nền tảng chung

Trước khi làm feature, dự án cần một **design system**: bộ token dùng chung (màu,
typography, spacing, radius, shadow) + các component primitive (Button, Card, Input).
File `ai/DESIGN_SYSTEM.md` là **bản hợp đồng** đó, **do Designer sở hữu**.

- **Nguồn:** Figma library (published variables/styles). Link nằm ở đầu `ai/DESIGN_SYSTEM.md`.
- **Cập nhật:** `/design-sync` kéo token từ Figma library về, cập nhật `DESIGN_SYSTEM.md`
  (và file token trong code nếu có). Chạy **thưa** — chỉ khi hệ thống đổi.
- **Cô lập:** vì nó ảnh hưởng *mọi* feature, `/design-sync` đi ra **một PR riêng**
  (`chore/design-system`). Cả team rebase sau khi merge. Đây chính là cách xử "vùng
  chung" để hai feature không đánh nhau ở token.
- **Ràng buộc:** mọi feature phải **adapt** theo nó — `/sync` diễn đạt design feature
  bằng token (đánh dấu chỗ lệch), `/audit` bắt lỗi hardcode/không tuân thủ, `/build`
  chỉ dùng token + primitive, không bịa giá trị mới.

> Nếu Figma của một feature dùng màu/spacing chưa có trong hệ thống: `/sync` sẽ đánh
> dấu "⚠️ lệch design system". Designer quyết định — sửa design cho khớp, hoặc bổ sung
> token vào hệ thống qua `/design-sync`. Engineer **không** tự hardcode để cho xong.

---

## Luồng 1 — Code tính năng MỚI

### Ngày 1 — Spec
1. **Engineer** (hoặc PM nếu dùng Claude Code): `/new quiz-engine`
   → tạo `ai/quiz-engine/` và branch `feat/quiz-engine`.
2. **PM** mở `ai/quiz-engine/prd.md`: điền mục tiêu, tính năng, business logic,
   *Out of scope*, acceptance criteria.
3. **Designer** thiết kế trên Figma, dán link (kèm `node-id` của frame) vào mục Figma.

### Ngày 2 — Build (Engineer, đang ở branch feat/quiz-engine)
- **`/sync`** — Claude đọc link Figma trong PRD, dùng Figma MCP kéo về cấu trúc
  component, màu, spacing, typography, các state → ghi `ai/quiz-engine/figma.md`.
- **`/audit`** — so PRD + figma.md với code trong `src/`. Vì là feature mới, gap =
  gần như toàn bộ → `ai/quiz-engine/gaps.md`. *Không sửa code ở bước này.*
- **`/build`** — Claude implement (🔴 trước), bám Figma, rồi
  `bun run lint` → `bun run test` → commit lên `feat/quiz-engine` → `gh pr create`.

### Ngày 2–3 — Review & vòng lặp
- Engineer mở PR, test trên browser.
- Có lỗi? Ghi từng dòng cụ thể vào `ai/quiz-engine/feedback.md`
  (vd: *"hover quá chậm, 300→150ms"*).
- `/build` lại → Claude ưu tiên feedback, sửa, đẩy commit mới lên **cùng PR**.
- Hết lỗi → merge vào main.

---

## Luồng 2 — SỬA / mở rộng tính năng đã có

Thư mục `ai/<slug>/` vẫn còn trên main từ lần build trước → tái sử dụng nó.

**A. Đổi yêu cầu hoặc đổi design** (PM/Designer cập nhật spec)
```
git checkout main && git pull
git checkout -b feat/quiz-engine-v2     # branch mới cho đợt sửa
# PM sửa ai/quiz-engine/prd.md (hoặc Designer đổi Figma)
/sync        # nếu Figma đổi
/audit       # gap giờ = phần lệch giữa spec MỚI và code CŨ
/build       # Claude chỉ sửa đúng phần chênh
```

**B. Bug phát hiện khi QA / sau khi đã merge**
```
git checkout -b fix/quiz-engine-scoring
# ghi bug vào ai/quiz-engine/feedback.md
/build       # Claude đọc feedback, sửa, test, mở PR
```

**C. Sửa vặt 1–2 dòng** (typo, đổi màu nhỏ): không cần cả quy trình — cứ sửa tay
hoặc nhờ Claude sửa trực tiếp rồi commit. Quy trình dành cho việc có spec.

> Mẹo: `/audit` so spec với code hiện tại, nên nó là cách an toàn để biết "sửa cái
> này có làm hỏng phần khác của feature không" trước khi `/build`.

---

## Nhiều người làm song song — vì sao KHÔNG xung đột

Đây là phần quan trọng nhất khi team đông hơn 1 người.

**1. Tách file theo feature.** Mỗi feature ghi vào `ai/<slug>/` riêng. Người làm
`quiz-engine` và người làm `leaderboard` không bao giờ chạm cùng một file spec.

**2. Tách branch theo feature.** Mỗi feature một branch `feat/<slug>`. Code chỉ gặp
nhau lúc merge qua PR — đúng cơ chế git sinh ra để xử lý. Không ai sửa thẳng `main`.

**3. Một người "lái" một branch tại một thời điểm.** Đừng để hai người cùng chạy
`/build` trên cùng một branch. Một feature → một engineer phụ trách vòng đời của nó.

**4. Rebase main thường xuyên.** Trước khi mở PR: `git checkout main && git pull`
rồi `git rebase main` trên branch của bạn — giải quyết chênh lệch sớm, PR sạch.

**5. Tránh đụng "vùng chung".** Nếu hai feature cùng phải sửa một file lõi
(vd: `src/lib/db.ts`, layout gốc), tách phần đó thành một PR nhỏ làm trước rồi cả
hai cùng rebase — thay vì để hai PR lớn đánh nhau ở file đó.

### Khi vẫn dính merge conflict ở code
Bình thường và lành: git báo conflict lúc merge/rebase. Có thể nhờ Claude xử:
mở branch, chạy `git rebase main`, rồi bảo Claude *"giải quyết conflict, giữ cả hai
thay đổi cho đúng ý"* — nó đọc cả hai phía và hoà lại. Test lại trước khi push.

### (Tùy chọn) Làm song song thật bằng git worktree
Muốn chạy hai feature cùng lúc mà không phải `git checkout` qua lại:
```
git worktree add ../app-leaderboard feat/leaderboard
```
Mỗi worktree là một thư mục làm việc riêng, mở một cửa sổ Claude Code riêng. Hai
feature chạy hoàn toàn độc lập trên cùng một repo.

---

## Vì sao cách này gọn hơn

- **Không copy-paste prompt** — logic nằm trong file lệnh, Claude tự đọc `ai/<slug>/...`.
- **Figma tự động** qua MCP — không token, không export tay.
- **Ít bước thủ công** — Engineer gõ lệnh; lint/test/commit/PR Claude tự làm.
- **Không xung đột** — feature = thư mục = branch = PR; git lo phần gộp.
- **Một nguồn sự thật** — `prd.md` là yêu cầu, `gaps.md` là việc cần làm, PR là kết quả.

## Mẹo dùng tốt

**Nên**
- Mỗi feature một `/new` riêng, đặt slug ngắn gọn dễ hiểu.
- PM viết PRD cụ thể, ghi rõ business logic và *Out of scope*.
- Đọc `gaps.md` trước khi `/build` — nắm Claude sắp đổi gì.
- Feedback ghi từng dòng đo được (số px, ms, màu).
- Rebase main trước khi mở PR.

**Tránh**
- Hai người cùng `/build` trên một branch.
- Sửa code tay song song với Claude trên cùng file (ghi vào `feedback.md` thay vì tự sửa).
- PRD mơ hồ ("làm đẹp lên") — gap sẽ khó tìm.
- Bỏ qua `/sync` khi Figma vừa đổi (spec cũ → audit sai).

## Tùy biến

Các lệnh chỉ là file Markdown trong `.claude/commands/`. Muốn đổi quy tắc (bắt buộc
test coverage, đổi convention đặt tên branch...), sửa thẳng file `.md` tương ứng —
không cần code.
