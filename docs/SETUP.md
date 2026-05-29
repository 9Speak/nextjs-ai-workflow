# Setup (một lần)

Mỗi thành viên làm 3 bước này một lần khi clone repo.

## 1. Claude Code

Cài Claude Code (CLI hoặc extension VS Code/JetBrains). Mở terminal **trong thư mục
dự án** rồi chạy `claude`. Các lệnh `/new` `/sync` `/audit` `/build` đã nằm sẵn trong
`.claude/commands/` nên có ngay khi mở dự án.

## 2. Bun + dependencies

```bash
curl -fsSL https://bun.sh/install | bash   # cài Bun (nhanh hơn npm)
bun install                                 # cài dependencies của dự án
```

Nếu `bun: command not found` sau khi cài, thêm vào `~/.zshrc`:

```bash
export PATH="$HOME/.bun/bin:$PATH"
```

## 3. Kết nối Figma (MCP)

Repo đã có sẵn `.mcp.json` trỏ tới Figma MCP — không cần cấu hình thêm. Chỉ cần
đăng nhập một lần:

1. Trong Claude Code gõ: `/mcp`
2. Chọn **figma** → **authenticate**
3. Trình duyệt mở ra → cho phép quyền → xong.

Sau bước này, `/sync` sẽ tự kéo design từ link Figma trong `ai/prd.md`. Không cần
Figma API token, không cần copy-paste design thủ công.

> `.claude/settings.json` đã bật `enableAllProjectMcpServers`, nên Claude Code không
> hỏi lại mỗi lần mở dự án.

## Kiểm tra nhanh

```bash
bun --version          # ra số phiên bản
```

Trong Claude Code: gõ `/` thấy `new`, `sync`, `audit`, `build` trong danh sách → sẵn sàng.

## (Tùy chọn) GitHub CLI

`/build` dùng `gh pr create` để mở PR tự động. Nếu chưa có:

```bash
brew install gh && gh auth login
```

Chưa cài cũng không sao — `/build` sẽ dừng lại và đưa diff để bạn commit tay.
