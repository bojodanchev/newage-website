# New Age — Premium Agency Website

Digital agency site for NewAge Content. (Next.js 15 App Router, TypeScript, Tailwind CSS 4, Framer Motion, Turso)

## Quick Start
```bash
npm install
cp .env.example .env.local   # Fill in TURSO_DATABASE_URL + TURSO_AUTH_TOKEN
npm run dev
```

## Key Commands
| Command | Purpose |
|---------|---------|
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run type-check` | TypeScript check |
| `npm run lint` | ESLint |

## Project Structure
- `src/app/[locale]/` — All public pages (EN at root, BG under `/bg`; next-intl `as-needed`)
  - `(marketing)/` — Full layout (nav, footer, exit-intent); home renders the `TierPicker`
    - `influencer-marketing/` — ecosystem home + Brand/Influencer/UGC funnels (EN+BG)
  - `(tiers)/{start,grow,scale}/` — 3-tier awareness funnels (no-nav, single CTA)
  - `(meta-ads)/banking/` — mortgage funnel (was `/meta-ads`, now 308-redirects here)
  - `(legal)/` — Minimal layout, no animation JS
- `src/app/api/` — Lead endpoints: contact, newsletter, leads, leads/tier, leads/influencer, leads/meta-ads, meta/capi
- `src/components/ui/` — Design system atoms · `features/` — page compositions (TierPicker, ExitIntentPopup)
- `src/components/tiers/` — Shared theme-aware tier sections + bespoke per-tier (start/grow/scale)
- `src/components/influencer/` — Editorial ecosystem home, shared audience funnel, lead form
- `src/lib/` — utils, fonts, animations, db, **email** (Resend) · `src/data/` — typed content (no CMS)
- `src/i18n/` — next-intl routing/request · `messages/{locale}/*.json` — translations · `src/types/` — Zod schemas

## Architecture
> Deep dive: [docs/architecture.md](docs/architecture.md)

- Dark-first design: bg `#0A0A0A`, accents Purple/Mint/Orange
- Glass cards: `glass` utility, gradient text: `gradient-text` utility
- Fonts: Plus Jakarta Sans (headings), Inter (body), JetBrains Mono (code)
- Animation easing: `[0.16, 1, 0.3, 1]` project-wide
- `cn()` from `@/lib/utils` for className merging

## Environment & Services
> Details: [docs/environment.md](docs/environment.md)

- **Turso**: `newage` database (EU West 1) — lead capture for all forms
- **Vercel**: project `newage-website`, domain `www.newagecontent.com`
- DB env vars: `TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN` (graceful if missing)

## Conventions
- Self-hosted fonts only (woff2 in /public/fonts/)
- All pages SSG via `generateStaticParams`
- Three.js dynamically imported with `ssr: false`
- Content via functions: `getServiceBySlug()`, `getCaseStudyBySlug()`
- Influencer content via `getInfluencerLanding()` / `getInfluencerFunnel()` in `src/data/influencer.ts`
- Animation variants from `@/lib/animations`

## Gotchas (Critical)
> Full list: [docs/gotchas.md](docs/gotchas.md)

- Use `@libsql/client/web` not `@libsql/client` (native binary needs llvm@15)
- Multi-statement DB transactions: use `db.batch(stmts, 'write')` — cross-statement `BEGIN/COMMIT` fails on libsql HTTP
- Route renames: use `next.config` `redirects()` (true 308 + query); SSG `redirect()` emits a meta-refresh that drops query params
- Don't put `| New Age` in page meta titles — root layout's `title.template` already appends it
- `.env.local` = **production** Turso; local form runs write to the live `leads` table
- Safe influencer API test: blank Turso vars on a separate port (exact command in `docs/environment.md`)
- `printf '%s'` not `echo` when piping env vars to Vercel CLI (trailing `\n` breaks values)
- Do NOT add `output: 'export'` to next.config — API routes need server rendering

## Recent Decisions
> History: [docs/decisions/](docs/decisions/)

- [2026-07-22] [Influencer ecosystem](docs/decisions/2026-07-22-influencer-ecosystem.md) — bilingual ecosystem + 3 audience funnels; shared lead API; no fabricated proof
- [2026-06-07] [3-tier conversion funnels](docs/decisions/2026-06-07-three-tier-funnels.md) — /start /grow /scale (EN+BG); /meta-ads→/banking; dropped leads CHECK constraint
- [2026-03-19] Turso for lead capture — single `leads` table, graceful degradation

## Active Context
3-tier funnels and the influencer ecosystem are implemented in EN+BG. The
influencer arm currently covers public marketing + lead capture; CRM dashboards,
matching AI, contracts/payments, automation, and creator portals remain future
phases. To finish wider activation: set `RESEND_API_KEY` (+ verified
`LEAD_FROM_EMAIL`) on Vercel and replace any site-wide placeholder proof with
approved first-party evidence.
