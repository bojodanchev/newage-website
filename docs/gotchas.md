# Gotchas & Lessons Learned

## @libsql/client
- **Use `@libsql/client/web`, not `@libsql/client`**: The default import pulls in native binaries that require `llvm@15` on macOS. The `/web` import is HTTP-only and works everywhere (local dev + Vercel serverless). Fixed in `src/lib/db.ts`.

## Vercel CLI
- **`echo` pipes trailing newlines into env vars**: Using `echo "value" | vercel env add` appends `\n` to the value, breaking URLs and tokens. Always use `printf '%s' 'value' | vercel env add` instead.
- **`vercel env add` preview requires interactive TTY**: The Vercel CLI v50+ can't add preview env vars non-interactively — it always prompts for a git branch. Workaround: add via Vercel dashboard, or skip preview (production env vars are used as fallback).
- **Redeploys don't always get custom domain aliases**: `vercel redeploy` creates a new production deployment but custom domain aliases (e.g., `www.newagecontent.com`) may not show in the aliases list immediately. The domain still resolves correctly.

## Turso
- **`ensureLeadsTable()` auto-init needs a live connection**: The table creation runs on first API request, not at build time. If env vars are wrong or missing, the table silently fails to create (caught by try/catch). Can always create manually via `turso db shell newage`.

## Build
- **`output: 'export'` and API routes are incompatible**: The CLAUDE.md originally said "static export" but `next.config.ts` does NOT set `output: 'export'`. This is correct — API routes (`/api/*`) require server-side rendering. Don't add `output: 'export'` back.

## Exit-Intent Popup
- **Desktop only**: `mouseleave` with `clientY <= 0` doesn't work on mobile/touch devices. This is acceptable — mobile exit-intent requires different patterns.
- **Session gating via sessionStorage**: The popup shows once per browser session. Clearing sessionStorage (or opening a new tab) resets it.
