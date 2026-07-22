# Gotchas & Lessons Learned

## @libsql/client
- **Use `@libsql/client/web`, not `@libsql/client`**: The default import pulls in native binaries that require `llvm@15` on macOS. The `/web` import is HTTP-only and works everywhere (local dev + Vercel serverless). Fixed in `src/lib/db.ts`.

## Vercel CLI
- **`echo` pipes trailing newlines into env vars**: Using `echo "value" | vercel env add` appends `\n` to the value, breaking URLs and tokens. Always use `printf '%s' 'value' | vercel env add` instead.
- **`vercel env add` preview requires interactive TTY**: The Vercel CLI v50+ can't add preview env vars non-interactively — it always prompts for a git branch. Workaround: add via Vercel dashboard, or skip preview (production env vars are used as fallback).
- **Redeploys don't always get custom domain aliases**: `vercel redeploy` creates a new production deployment but custom domain aliases (e.g., `www.newagecontent.com`) may not show in the aliases list immediately. The domain still resolves correctly.

## Turso
- **`ensureLeadsTable()` auto-init needs a live connection**: The table creation runs on first API request, not at build time. If env vars are wrong or missing, the table silently fails to create (caught by try/catch). Can always create manually via `turso db shell newage`.
- **Multi-statement transactions need `db.batch(stmts, 'write')` — NOT cross-statement `BEGIN/COMMIT`**: The libsql HTTP client (`@libsql/client/web`) auto-commits every `db.execute()` as its own implicit transaction, so issuing `BEGIN TRANSACTION` / `COMMIT` as separate `execute()` calls fails with `cannot commit - no transaction is active` (and leaves the work half-done / loses the triggering row). Use `await db.batch([sql1, sql2, ...], 'write')` for atomicity. Fixed in `src/lib/db-schema.ts` (the CHECK-constraint migration).
- **`leads.source` has NO `CHECK` constraint anymore**: It used to be `CHECK(source IN (...))`, which made every new funnel a fragile table migration. As of 2026-06-07 the column is plain `TEXT NOT NULL`; valid sources are validated in app code (`ALLOWED_SOURCES` + `isValidLeadSource` in `db-schema.ts`, plus Zod). `ensureLeadsTable()` auto-migrates any old constrained table on first request.
- **`.env.local` points at the LIVE production DB**: Running `npm run dev` / `npm start` locally writes real rows to the production `leads` table. When testing forms, use clearly-labeled data and delete those rows by id afterward (`/admin` viewer or a small `@libsql/client/web` script).
- **Safe no-write API verification**: For influencer forms, start a separate
  server with `env TURSO_DATABASE_URL='' TURSO_AUTH_TOKEN='' npm run start -- -p
  3001`. Process env overrides `.env.local`; valid submissions exercise the real
  route and return success while the DB client remains disabled. Do not use the
  normal local server for disposable form tests unless you intend to clean the
  production row.

## Routing / next-intl
- **Route renames need `next.config` `redirects()`, not page-level `redirect()`**: Calling `redirect()`/`permanentRedirect()` inside a statically-prerendered (SSG) page emits a client-side `<meta http-equiv="refresh">` (200, **drops the query string** — kills `fbclid`/`utm` on ad links). Use `async redirects()` in `next.config.ts` for a true **308** that preserves the query string. Example: `/meta-ads` → `/banking` (both locales).
- **Locale prefix is `as-needed`**: EN lives at the root (`/start`), BG is prefixed (`/bg/start`). A returning visitor's `NEXT_LOCALE` cookie can redirect `/start` → `/bg/start` — that's intended.
- **Clear the locale cookie before isolated EN browser assertions**: After
  visiting `/bg/*`, an unprefixed influencer URL can resolve back to BG because
  next-intl remembers `NEXT_LOCALE`. In Playwright, use
  `await page.context().clearCookies()` before asserting EN routes independently.

## Metadata
- **Don't put `| New Age` in page meta titles**: The root layout (`src/app/layout.tsx`) sets `title.template = '%s | New Age'`, so any per-page `title` that already includes the brand renders doubled (`… | New Age | New Age`). Page titles should be the bare headline.

## Build
- **`output: 'export'` and API routes are incompatible**: The CLAUDE.md originally said "static export" but `next.config.ts` does NOT set `output: 'export'`. This is correct — API routes (`/api/*`) require server-side rendering. Don't add `output: 'export'` back.

## Exit-Intent Popup
- **Desktop only**: `mouseleave` with `clientY <= 0` doesn't work on mobile/touch devices. This is acceptable — mobile exit-intent requires different patterns.
- **Session gating via sessionStorage**: The popup shows once per browser session. Clearing sessionStorage (or opening a new tab) resets it.

## Influencer Ecosystem

- **Typed bilingual copy is not a next-intl namespace**: Influencer page content
  lives in `src/data/influencer.ts` and is selected by `locale` in server pages.
  Do not add translation keys for this subsystem to `request.ts` unless the
  content architecture is deliberately migrated. Navbar/footer labels remain in
  `messages/{en,bg}/common.json`.
- **Keep all source mappings aligned**: A new influencer audience must update
  `InfluencerAudience`, its content, the funnel asset map, the Zod enum, the API
  `sourceByAudience` map, and `ALLOWED_SOURCES` in `src/lib/db-schema.ts`.
- **Do not manufacture proof**: The source PRD names case studies and
  testimonials but supplies no verified evidence. Do not add invented results,
  client quotes, creator counts, or ROI numbers. Use approved first-party proof
  only.
- **Generated originals are not shipped**: The site references only the
  optimized WebP files under `public/influencer/`. Keep uncompressed generation
  outputs outside the repository unless they are intentionally needed as source
  masters.
