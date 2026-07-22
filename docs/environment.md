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
| `RESEND_API_KEY` | No | Enables lead-notification emails (tier forms) via Resend. Without it, leads still persist and the form succeeds — email is skipped (logged). |
| `LEAD_FROM_EMAIL` | No | Resend-verified sender for tier lead emails (default `New Age Leads <leads@newagecontent.com>`) |
| `LEAD_NOTIFY_TO` | No | Comma-separated recipients for tier leads (default `hello@newagecontent.com,bojodanchev@gmail.com`) |
| `CONTACT_EMAIL` | No | Destination for contact form emails |
| `NEXT_PUBLIC_GA_ID` | No | Google Analytics ID |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | No | Plausible analytics domain |
| `NEXT_PUBLIC_CALENDLY_URL` | No | Calendly booking URL |
| `HUBSPOT_API_KEY` | No (Phase 2) | HubSpot CRM integration |

Note: DB env vars use graceful degradation — forms still work if Turso is unavailable.

### Safe influencer form testing

`.env.local` contains production Turso credentials. To exercise the real
influencer API without persisting a test lead, start an isolated production
server with explicit empty DB variables:

```bash
env TURSO_DATABASE_URL='' TURSO_AUTH_TOKEN='' npm run start -- -p 3001
```

Then post to `http://localhost:3001/api/leads/influencer`. A valid request should
return `{"success":true}` and log `accepted but not persisted`. This checks the
real schema and route without touching the live `leads` table. Use an unused
port and stop the server after verification.

## External Services
- **Turso**: libSQL database for lead capture (`newage` database, EU West 1). ⚠️ `.env.local` holds **production** credentials — local runs write to the live `leads` table (see gotchas.md).
- **Resend**: transactional email for tier lead notifications (`src/lib/email.ts`). Sender domain must be verified in Resend for delivery.
- **Vercel**: Hosting and deployment (project: `newage-website`)
- **Domain**: `www.newagecontent.com` / `newagecontent.com`

## CLI Tools
- `turso` — Turso CLI (database management, shell access)
- `vercel` — Vercel CLI (deployments, env vars)
