# New Age — Premium Agency Website

## Tech Stack
- **Framework**: Next.js 15 (App Router), TypeScript
- **Styling**: Tailwind CSS 4 (`@theme` in `globals.css`)
- **Animation**: Framer Motion (standard) + GSAP (premium, dynamically imported)
- **3D**: @react-three/fiber + drei (hero only, `ssr: false`)
- **Forms**: React Hook Form + Zod
- **Deploy**: Vercel (static export)

## Commands
```bash
npm run dev          # Start dev server (Turbopack)
npm run build        # Production build (static export)
npm run type-check   # TypeScript check
npm run lint         # ESLint
```

## Architecture
- `src/app/(marketing)/` — Full layout with nav, footer, animations
- `src/app/(legal)/` — Minimal layout, no animation JS
- `src/components/ui/` — Design system atoms
- `src/components/animation/` — Framer Motion wrappers
- `src/components/features/` — Page-specific compositions
- `src/data/` — Typed content with accessor functions (Phase 1, no CMS)
- `src/lib/` — Utilities, fonts, animations, constants
- `src/types/` — TypeScript definitions

## Design System
- **Dark-first**: Primary bg `#0A0A0A`, text `#F0F0F5`
- **Accent**: Purple `#6C3AFF`, Mint `#00E5A0`, Orange `#FF6B35`
- **Glass cards**: `glass` utility class (bg-white/5 backdrop-blur-xl)
- **Gradient text**: `gradient-text` utility
- **Fonts**: Plus Jakarta Sans (headings), Inter (body), JetBrains Mono (code)

## Conventions
- Self-hosted fonts only (woff2 in /public/fonts/)
- All pages SSG via `generateStaticParams`
- Three.js dynamically imported with `ssr: false`
- Content accessed via functions: `getServiceBySlug()`, `getCaseStudyBySlug()`
- Use `cn()` from `@/lib/utils` for className merging
- Animation variants from `@/lib/animations`
