# Architecture

## Tech Stack
- **Framework**: Next.js 15 (App Router), TypeScript
- **Styling**: Tailwind CSS 4 (`@theme` block in `globals.css`)
- **Animation**: Framer Motion (standard) + GSAP (premium, dynamically imported)
- **3D**: @react-three/fiber + drei (hero section only, `ssr: false`)
- **Forms**: React Hook Form + Zod validation
- **Database**: Turso (libSQL) via `@libsql/client/web`
- **i18n**: next-intl (in progress)
- **Deploy**: Vercel

## Directory Structure
```
src/
├── app/
│   ├── (marketing)/     # Full layout: nav, footer, animations, exit-intent popup
│   ├── (legal)/         # Minimal layout, no animation JS
│   └── api/
│       ├── contact/     # Contact form → Turso (source='contact')
│       ├── newsletter/  # Newsletter signup → Turso (source='newsletter')
│       ├── leads/       # Exit-intent popup → Turso (source='popup')
│       └── og/          # OG image generation
├── components/
│   ├── ui/              # Design system atoms (Input, Select, Button, etc.)
│   ├── animation/       # Framer Motion wrappers
│   ├── features/        # Page-specific compositions (ExitIntentPopup, etc.)
│   └── layout/          # Navbar, Footer, ScrollProgress, BackToTop
├── data/                # Typed content with accessor functions (no CMS)
├── hooks/               # Custom React hooks (useExitIntent, etc.)
├── lib/                 # Utilities, fonts, animations, constants, DB client
└── types/               # TypeScript definitions (forms.ts, etc.)
```

## Key Patterns & Conventions
- Self-hosted fonts only (woff2 in `/public/fonts/`)
- All pages SSG via `generateStaticParams`
- Three.js dynamically imported with `ssr: false`
- Content accessed via typed functions: `getServiceBySlug()`, `getCaseStudyBySlug()`
- `cn()` from `@/lib/utils` for className merging (clsx + tailwind-merge)
- Animation variants centralized in `@/lib/animations`
- Easing curve: `[0.16, 1, 0.3, 1]` used project-wide

## Important Files
- `src/lib/db.ts` — Turso client singleton (returns null if env vars missing)
- `src/lib/db-schema.ts` — Auto-creates `leads` table on first request
- `src/types/forms.ts` — All Zod schemas (contactFormSchema, newsletterSchema, exitIntentSchema)
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
