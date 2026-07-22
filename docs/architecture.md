# Architecture

## Tech Stack
- **Framework**: Next.js 15 (App Router), TypeScript
- **Styling**: Tailwind CSS 4 (`@theme` block in `globals.css`)
- **Animation**: Framer Motion (standard) + GSAP (premium, dynamically imported)
- **3D**: @react-three/fiber + drei (hero section only, `ssr: false`)
- **Forms**: React Hook Form + Zod validation
- **Database**: Turso (libSQL) via `@libsql/client/web`
- **i18n**: next-intl — locales `['en','bg']`, `localePrefix: 'as-needed'` (EN at root, BG at `/bg/*`). Config in `src/i18n/routing.ts` + `src/i18n/request.ts`, `src/middleware.ts`. Messages in `messages/{locale}/{namespace}.json`, registered in `request.ts`.
- **Email**: Resend REST API via `fetch` (no SDK) in `src/lib/email.ts` — graceful no-op without `RESEND_API_KEY`
- **Deploy**: Vercel

## Directory Structure
```
src/
├── app/
│   ├── [locale]/                 # All public pages (en at root, bg under /bg)
│   │   ├── (marketing)/          # Full layout: nav, footer, animations, exit-intent
│   │   │                         #   home page renders the TierPicker self-selector
│   │   │   └── influencer-marketing/ # Ecosystem home + brands/influencers/ugc funnels
│   │   ├── (legal)/              # Minimal layout, no animation JS
│   │   ├── (meta-ads)/           # No-nav funnel layout + Pixel/GA4 loaders
│   │   │   ├── banking/          # Mortgage-broker funnel (renamed from meta-ads)
│   │   │   └── meta-ads/         # 308 redirect → /banking (legacy ad links)
│   │   └── (tiers)/              # No-nav funnel layout; the 3-tier system
│   │       ├── start/  grow/  scale/   # beginner / intermediate / pro funnels
│   ├── admin/                    # Lead viewer (password-gated)
│   └── api/
│       ├── contact/  newsletter/  leads/   # → Turso (source=contact/newsletter/popup)
│       ├── leads/meta-ads/  leads/booking/ # meta-ads funnel + Calendly booking
│       ├── leads/tier/          # 3-tier forms → Turso (source=start|grow|scale) + email
│       ├── leads/influencer/    # Influencer arm → Turso (3 audience-specific sources)
│       ├── meta/capi/           # Meta Conversions API (server-side dedup)
│       └── og/                  # OG image generation
├── components/
│   ├── ui/                       # Design system atoms (Input, Select, Button, etc.)
│   ├── animation/                # Framer Motion wrappers
│   ├── features/                 # Page compositions (ExitIntentPopup, home/TierPicker, ...)
│   ├── tiers/                    # Shared theme-aware tier sections + bespoke per-tier
│   │   ├── (shared)             # TierHero/Pains/Services/Proof/LeadSection/LeadForm/...
│   │   ├── start/  grow/  scale/ # bespoke sections (StartSteps, GrowFunnel, ScaleCapabilities, ...)
│   ├── meta-ads/                 # Funnel components + Pixel/GA4 loaders
│   ├── influencer/               # Ecosystem home, shared audience funnel, lead form
│   └── layout/                   # Navbar, Footer, LocaleSwitcher, ScrollProgress, BackToTop
├── data/                         # Typed content accessor functions (no CMS)
├── hooks/  lib/  types/          # hooks; utils/fonts/animations/db/email; Zod schemas
└── (messages/ at repo root)      # next-intl JSON per locale+namespace
```

## Key Patterns & Conventions
- Self-hosted fonts only (woff2 in `/public/fonts/`)
- All pages SSG via `generateStaticParams`
- Three.js dynamically imported with `ssr: false`
- Content accessed via typed functions: `getServiceBySlug()`, `getCaseStudyBySlug()`
- `cn()` from `@/lib/utils` for className merging (clsx + tailwind-merge)
- Animation variants centralized in `@/lib/animations`
- Easing curve: `[0.16, 1, 0.3, 1]` used project-wide

## 3-Tier Conversion System (`/start`, `/grow`, `/scale`)
Awareness-tier funnels: one focused, single-CTA landing per buyer sophistication
level, sharing one component set, distinguished by a color theme + copy depth.
- **Theming**: each tier page wraps its content in a `.tier-start|grow|scale` class
  (set in `globals.css`) that defines `--tier-*` CSS vars; shared components use
  tier utilities (`tier-grad-text`, `tier-cta-grad`, `tier-chip`, `tier-card`,
  `tier-glow`, …) that read those vars. Same components → different color per tier.
- **Content**: `messages/{en,bg}/{start,grow,scale}.json`. Shared section components
  take an `ns` prop (e.g. `<TierHero ns="start" />`) and read their tier namespace.
- **Lead flow**: `TierLeadForm` → `POST /api/leads/tier` → Turso (`source=<tier>`,
  `extra` JSON holds tier fields + a preferred call time) → `sendLeadNotification`
  (Resend, both inboxes). Schema: `tierLeadSchema` in `src/types/forms.ts`
  (tier-conditional required fields; honeypot + speed-trap spam guards).
- **Homepage router**: `components/features/home/TierPicker.tsx` — 3 locale-aware
  cards routing to the tiers (each card self-themes via its own `.tier-*` class).

## Influencer Ecosystem (`/influencer-marketing`)

The influencer-marketing arm is a complete bilingual subsystem inside the
shared marketing layout:

- **Routes**: ecosystem home plus `/brands`, `/influencers`, and `/ugc`; BG
  equivalents use the normal `/bg` prefix.
- **Composition**: `InfluencerLanding` owns the ecosystem narrative and audience
  router. `InfluencerFunnel` renders the three audience journeys from typed
  content. `InfluencerLeadForm` handles each conversion state.
- **Content**: `src/data/influencer.ts` contains typed EN/BG content and exports
  `getInfluencerLanding()` / `getInfluencerFunnel()`. This subsystem does not
  register an additional next-intl JSON namespace; global chrome still uses
  next-intl.
- **Visuals**: original, optimized WebP assets live in `public/influencer/`.
  The sub-brand uses editorial composition, coral/lilac/mint audience cues,
  cardless dividers, and motion that respects `prefers-reduced-motion`.
- **Lead flow**: form → `POST /api/leads/influencer` → `influencerLeadSchema` →
  Turso `leads`. Source is `influencer-brands`, `influencer-talent`, or
  `influencer-ugc`; audience details are stored in `extra` JSON.
- **Evidence boundary**: no unapproved testimonials, case-study numbers, creator
  counts, or ROI claims. Capability and process copy must remain distinct from
  verified proof.

See `docs/decisions/2026-07-22-influencer-ecosystem.md` for the full rationale
and phase boundary.

## Important Files
- `src/lib/db.ts` — Turso client singleton (returns null if env vars missing)
- `src/lib/db-schema.ts` — Auto-creates/migrates `leads` table on first request (uses `db.batch`)
- `src/lib/email.ts` — Resend lead-notification email (fetch-based, graceful)
- `src/types/forms.ts` — All Zod schemas (contact/newsletter/exitIntent/metaAdsLead/tierLead/influencerLead)
- `src/data/influencer.ts` — Typed EN/BG influencer ecosystem and funnel content
- `src/app/api/leads/influencer/route.ts` — Audience-aware influencer lead intake
- `src/i18n/routing.ts` + `request.ts` — next-intl config + namespace registration
- `next.config.ts` — `redirects()` for /meta-ads → /banking (308)
- `src/hooks/use-exit-intent.ts` — Exit-intent detection with session gating
- `src/app/(marketing)/layout.tsx` — Marketing layout (renders ExitIntentPopup)
- `src/lib/animations.ts` — Shared Framer Motion variants
- `src/app/icon.svg` — Favicon (Next.js auto-detected, geometric N monogram)
- `src/app/apple-icon.tsx` — Apple touch icon (180x180 PNG via ImageResponse)

## Design System
- **Dark-first**: Primary bg `#0A0A0A`, text `#F0F0F5`
- **Accents**: Purple `#6C3AFF`, Mint `#00E5A0`, Orange `#FF6B35`
- **Glass cards**: `glass` utility (bg-white/5 backdrop-blur-xl border-white/10)
- **Gradient text**: `gradient-text` utility class
- **Fonts**: Plus Jakarta Sans (headings), Inter (body), JetBrains Mono (code)
- **Tier accents** (3-tier system): green `#1A7A3C` (start), blue `#1A56FF` (grow),
  gold `#FFB800` (scale) — applied via `.tier-*` classes + `--tier-*` vars (see above)
- **Influencer sub-brand**: ink `#0B0A0A`, ivory `#F2EDE5`, coral `#FF725E`,
  with lilac/mint cues for talent and UGC. Keep this system scoped to influencer
  components rather than replacing global tokens.
