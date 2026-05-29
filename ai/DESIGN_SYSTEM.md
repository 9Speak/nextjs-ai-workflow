# Design System

> **Nền tảng chung cho cả dự án — Designer sở hữu.** Mọi feature phải dùng token ở
> đây, không hardcode màu/spacing. File này cập nhật bằng `/design-sync` (kéo từ
> Figma library) và đi ra **một PR riêng** vì nó ảnh hưởng toàn bộ feature.

## Figma library
<!-- Link tới Figma file chứa published variables / styles của design system.
     /design-sync đọc link ở đây để kéo token về. -->
https://figma.com/design/XXXX/Design-System

## Token sống ở đâu trong code
<!-- Nơi token được khai báo thật trong code. /build phải dùng các biến này, KHÔNG viết hex/px thẳng. -->
- Tailwind v4: khai báo token trong `front-end/src/app/globals.css` ở block `@theme { --color-...: ...; }`
- Dùng qua class Tailwind (vd `bg-primary`, `p-4`, `rounded-md`) hoặc `var(--color-primary)`

---

## Màu (Color)
| Token | Giá trị | Dùng cho |
|-------|---------|----------|
| `--color-primary` | `#0066FF` | nút chính, link |
| `--color-success` | `#00AA55` | đúng / thành công |
| `--color-danger`  | `#FF3B30` | sai / lỗi |
| `--color-fg`      | `#111827` | chữ chính |
| `--color-muted`   | `#6B7280` | chữ phụ |
| `--color-bg`      | `#FFFFFF` | nền |

## Typography
| Token | Size / Weight / Line-height |
|-------|------------------------------|
| `text-h1` | 32 / 700 / 40 |
| `text-h2` | 24 / 600 / 32 |
| `text-body` | 16 / 400 / 24 |
| `text-caption` | 14 / 400 / 20 |

Font family: `Inter, system-ui, sans-serif`

## Spacing scale (8px base)
`space-1=4` · `space-2=8` · `space-3=12` · `space-4=16` · `space-6=24` · `space-8=32`

## Radius
`radius-sm=4` · `radius-md=8` · `radius-lg=16` · `radius-full=9999`

## Shadow / Elevation
| Token | Giá trị |
|-------|---------|
| `shadow-sm` | `0 1px 2px rgba(0,0,0,.06)` |
| `shadow-md` | `0 4px 12px rgba(0,0,0,.10)` |

## Breakpoints
`sm=640` · `md=768` · `lg=1024` · `xl=1280`

---

## Component primitives
<!-- Các component dùng chung. Feature nên TÁI SỬ DỤNG, không tự dựng lại. -->
| Component | Vị trí | Variants / States |
|-----------|--------|-------------------|
| `Button` | `src/components/ui/Button.tsx` | primary · secondary · ghost / hover · disabled · loading |
| `Card`   | `src/components/ui/Card.tsx`   | default · interactive |
| `Input`  | `src/components/ui/Input.tsx`  | default · error · disabled |

---

## Quy tắc tuân thủ
1. **Chỉ dùng token** ở trên (qua CSS vars / Tailwind theme). Không viết `#hex` hay `16px` thẳng trong feature.
2. **Tái sử dụng primitive** trước khi tự dựng component mới.
3. Cần giá trị/màu **chưa có token**? → Báo Designer bổ sung vào hệ thống (qua `/design-sync`), **đừng tự bịa**.
