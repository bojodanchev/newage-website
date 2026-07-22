# Discovery Log

Reverse-chronological. Most recent first.

## [2026-07-22] Influencer marketing ecosystem and audience funnels
**Context**: Implementing `INFLUENCER ECOSYSTEM.md` as a premium bilingual arm of the NewAge Content site
**Learnings**:
- One ecosystem router plus a shared audience-funnel renderer keeps the Brand,
  Influencer, and UGC journeys distinct without duplicating layout code.
- Passing one typed localized content object from each server page is a clean
  fit for this self-contained subsystem; only shared navigation/footer labels
  need additions to `messages/{en,bg}/common.json`.
- The existing unconstrained `leads.source` column supports new funnel sources
  without a database migration. The implementation uses
  `influencer-brands`, `influencer-talent`, and `influencer-ugc`, with structured
  audience fields in `extra` JSON.
- A real-looking, locally owned hero set can stay lightweight: the three
  generated originals were converted to WebP and total approximately 256 KB.
- The PRD asks for case studies and testimonials but provides no evidence.
  Capability, process, industry, and outcome language can communicate the offer
  without fabricating numbers or quotes.
- `.env.local` is production. Starting `next start` with explicit empty Turso
  variables on a second port safely exercises the real API success path without
  writing a lead.
- Browser locale memory matters during testing: after visiting BG, clear cookies
  before making isolated assertions about unprefixed EN URLs.
- Verified: type-check, lint, production build (88 pages), eight EN/BG routes,
  desktop and 390 px mobile layouts, zero overflow/broken images/console errors,
  intercepted success payload, real no-DB 200 response, and honeypot 400.
**Files touched**: `src/app/[locale]/(marketing)/influencer-marketing/**`, `src/components/influencer/**`, `src/data/influencer.ts`, `public/influencer/**`, `src/app/api/leads/influencer/route.ts`, `src/types/forms.ts`, `src/lib/db-schema.ts`, `src/components/layout/{Navbar,MobileMenu,Footer}.tsx`, `messages/{en,bg}/common.json`, `src/app/sitemap.ts`

## [2026-06-07] 3-tier conversion funnel system (/start, /grow, /scale)
**Context**: Building the PRD's awareness-tier funnels in EN+BG, renaming the mortgage funnel, and wiring lead email
**Learnings**:
- libsql HTTP client auto-commits each `execute()`; cross-statement `BEGIN/COMMIT` fails with `cannot commit - no transaction is active` and can lose the triggering row. Use `db.batch(stmts, 'write')`. Found while migrating away from the `leads.source` CHECK constraint.
- SSG page `redirect()`/`permanentRedirect()` renders a client `<meta refresh>` (200) that **drops the query string** — bad for ad links. `next.config` `redirects()` gives a true 308 with query preserved. Used for `/meta-ads` → `/banking`.
- Root layout's `title.template = '%s | New Age'` double-suffixes any page title that includes the brand — keep per-page titles bare.
- next-intl `localePrefix: 'as-needed'` → EN at root, BG at `/bg/*`; a returning visitor's `NEXT_LOCALE` cookie can redirect `/start` → `/bg/start` (intended).
- Tier theming via `.tier-*` classes + `--tier-*` CSS vars lets one component set render in 3 colors; per-card theming works on the homepage picker too.
- `.env.local` = production Turso — local form tests wrote real rows; cleaned them up by id afterward.
- Verified end-to-end: type-check, build (79 pages), lint, browser click-through EN+BG, real lead persisted with tier + preferred time, 308 redirect with query.
**Files touched**: `src/app/[locale]/(tiers)/*`, `src/components/tiers/*`, `src/components/features/home/TierPicker.tsx`, `src/app/api/leads/tier/route.ts`, `src/lib/email.ts`, `src/lib/db-schema.ts`, `src/types/forms.ts`, `src/app/globals.css`, `src/i18n/request.ts`, `next.config.ts`, `messages/{en,bg}/{start,grow,scale}.json`, `messages/{en,bg}/home.json`, `src/app/[locale]/(meta-ads)/banking/`, `src/app/sitemap.ts`, `.env.example`

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
