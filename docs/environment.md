# Environment

## Prerequisites
- Node.js 22+ (via nvm)
- npm

## Setup
```bash
npm install
cp .env.example .env.local   # Then fill in values
npm run dev
```

## Commands
| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run type-check` | TypeScript check |
| `npm run lint` | ESLint |
| `npm start` | Start production server |

## Environment Variables
| Variable | Required | Description |
|----------|----------|-------------|
| `TURSO_DATABASE_URL` | Yes (for DB) | Turso database URL (`libsql://...turso.io`) |
| `TURSO_AUTH_TOKEN` | Yes (for DB) | Turso JWT auth token |
| `RESEND_API_KEY` | No (Phase 2) | Email sending via Resend |
| `CONTACT_EMAIL` | No | Destination for contact form emails |
| `NEXT_PUBLIC_GA_ID` | No | Google Analytics ID |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | No | Plausible analytics domain |
| `NEXT_PUBLIC_CALENDLY_URL` | No | Calendly booking URL |
| `HUBSPOT_API_KEY` | No (Phase 2) | HubSpot CRM integration |

Note: DB env vars use graceful degradation — forms still work if Turso is unavailable.

## External Services
- **Turso**: libSQL database for lead capture (`newage` database, EU West 1)
- **Vercel**: Hosting and deployment (project: `newage-website`)
- **Domain**: `www.newagecontent.com` / `newagecontent.com`

## CLI Tools
- `turso` — Turso CLI (database management, shell access)
- `vercel` — Vercel CLI (deployments, env vars)
