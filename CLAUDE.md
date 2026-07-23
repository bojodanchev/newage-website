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
- `src/app/(marketing)/` — Full layout with nav, footer, animations, exit-intent popup
- `src/app/(legal)/` — Minimal layout, no animation JS
- `src/app/api/` — Lead capture endpoints (contact, newsletter, leads)
- `src/components/ui/` — Design system atoms (Input, Select, Button)
- `src/components/features/` — Page compositions (ExitIntentPopup, etc.)
- `src/lib/` — Utilities, fonts, animations, DB client
- `src/data/` — Typed content with accessor functions (Phase 1, no CMS)
- `src/hooks/` — Custom hooks (useExitIntent)
- `src/types/` — TypeScript definitions + Zod schemas

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
- Animation variants from `@/lib/animations`

## Gotchas (Critical)
> Full list: [docs/gotchas.md](docs/gotchas.md)

- Use `@libsql/client/web` not `@libsql/client` (native binary needs llvm@15)
- `printf '%s'` not `echo` when piping env vars to Vercel CLI (trailing `\n` breaks values)
- Do NOT add `output: 'export'` to next.config — API routes need server rendering
- Vercel CLI can't add `preview` env vars non-interactively — use dashboard

## Recent Decisions
> History: [docs/decisions/](docs/decisions/)

- [2026-03-19] Turso for lead capture — single `leads` table, 3 sources, graceful degradation

## Active Context
Favicon updated to bold geometric N monogram (purple→mint gradient). i18n refactor in progress (uncommitted `[locale]` routes, `next-intl`, `middleware.ts`).
