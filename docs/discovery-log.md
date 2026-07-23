# Discovery Log

Reverse-chronological. Most recent first.

## [2026-03-21] Favicon modernization
**Context**: Replacing placeholder "NA" text favicon with a proper brand mark
**Learnings**:
- Next.js App Router auto-detects `icon.svg` and `apple-icon.tsx` in `src/app/` — generates `<link>` tags automatically
- SVG favicons with `linearGradient` render well across all modern browsers
- `apple-icon.tsx` uses `ImageResponse` from `next/og` to generate 180x180 PNG
- Bold geometric single-letter monograms (like Netflix "N") are the current trend over full-text marks
**Files touched**: `public/favicon.svg`, `src/app/icon.svg`, `src/app/apple-icon.tsx`

## [2026-03-19] Turso + Vercel env var wiring
**Context**: Shipping exit-intent popup and Turso lead capture to production
**Learnings**:
- `@libsql/client` native binary fails on macOS without llvm@15 — must use `@libsql/client/web`
- `echo` piping into `vercel env add` appends trailing `\n` to values, silently breaking DB connections
- `printf '%s'` is the correct way to pipe values into Vercel CLI
- Vercel CLI v50 `preview` env requires interactive branch prompt — no non-interactive workaround
- `ensureLeadsTable()` auto-init pattern works but table can also be created manually via `turso db shell`
**Files touched**: `src/lib/db.ts`, `.env.example`, Vercel env vars

## [2026-03-19] Exit-intent popup implementation
**Context**: Adding lead capture popup for visitors about to leave
**Learnings**:
- `mouseleave` with `clientY <= 0` is desktop-only (no mobile equivalent)
- sessionStorage for "shown once" gating resets per tab, not per browser session
- ExitIntentPopup is 'use client' but renders fine inside server component layout
- Framer Motion `AnimatePresence` handles mount/unmount animations cleanly for modal overlays
**Files touched**: `src/hooks/use-exit-intent.ts`, `src/components/features/ExitIntentPopup.tsx`, `src/app/(marketing)/layout.tsx`
