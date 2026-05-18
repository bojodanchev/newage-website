# T007 — Real-browser E2E evidence

Captured 2026-05-18 via Playwright MCP against `npm run dev -- -p 3031`.

## Screenshots

| File | Locale | Viewport | Calendly URL | Notes |
|---|---|---|---|---|
| `01-en-desktop-fullpage.jpg` | en | 1440×900 | none (graceful fallback) | Pre-Calendly baseline; lead form submit verified. |
| `02-en-desktop-full-funnel.jpg` | en | 1440×900 | calendly.com/bojodanchev | Full funnel, real Calendly embed. |
| `03-bg-desktop-full-funnel.jpg` | bg | 1440×900 | calendly.com/bojodanchev | BG version, full funnel. |
| `04-en-mobile-full-funnel.jpg` | en | 390×844 | calendly.com/bojodanchev | iPhone-class mobile, EN. |
| `05-bg-mobile-full-funnel.jpg` | bg | 390×844 | calendly.com/bojodanchev | iPhone-class mobile, BG. |
| `05-calendly-real-embed.jpg` | en | 1440×900 | calendly.com/bojodanchev | Close-up of booking section showing the real Calendly profile (Bojidar Danchev). |

## Verified end-to-end

- `GET /meta-ads` → HTTP 200, 9 sections rendered.
- `GET /bg/meta-ads` → HTTP 200, all sections translated.
- Lead form submit → `POST /api/leads/meta-ads` 200, then `POST /api/meta/capi` 200, success state rendered.
- With test env (`NEXT_PUBLIC_META_PIXEL_ID`, `NEXT_PUBLIC_GA4_ID`) set in T005 verification:
  - `fbq('track','Lead', {...}, {eventID: <uuid>})` fired (Privacy Sandbox trigger registered).
  - GA4 `generate_lead` event fired → 204 to `region1.google-analytics.com/g/collect`.
  - CAPI server received POST with the same `event_id` for dedup.
- With test env (`GHL_WEBHOOK_URL=https://httpbin.org/post`) set in T006 verification:
  - `POST /api/crm/ghl` → `{ok: true, skipped: false, status: 200}` (forward to httpbin observed).
  - `POST /api/leads/meta-ads` server-side fire-and-forget GHL forward observed.
- Calendly widget JS loads (window.Calendly defined), inline-widget iframe loads scoped to `calendly.com/bojodanchev`.

## Console errors (non-funnel)

The following console errors are environmental (dev-server-restart blips, Calendly's own permissions-policy warnings) and do not originate from funnel code:

- `Failed to fetch RSC payload` + `ERR_CONNECTION_REFUSED` on `__nextjs_*` paths — emitted during the dev-server restarts between T005/T006/T007 verification passes.
- `Potential permissions policy violation: payment is not allowed in this document` — emitted by Calendly's iframe attempting to use the Payment API; cosmetic, no functional impact.
- `Failed to load resource: 404 from calendly.com/newagecontent/strategy` — cached error from the earlier stub URL used during T006 verification; gone on hard refresh.

No funnel-originated errors at any point during the runs.

## Production checklist (for the operator)

Add these to Vercel env (project `newage-website`) before going live:

- `NEXT_PUBLIC_META_PIXEL_ID` — real Pixel ID from Meta Events Manager.
- `META_CAPI_ACCESS_TOKEN` — server-only, generated in Events Manager → CAPI.
- `META_CAPI_TEST_EVENT_CODE` — optional, for the Test Events tab.
- `NEXT_PUBLIC_GA4_ID` — real GA4 measurement ID (G-XXXXXXXXXX).
- `NEXT_PUBLIC_CALENDLY_URL` — `https://calendly.com/bojodanchev` (set locally; add to Vercel).
- `GHL_WEBHOOK_URL` — GoHighLevel inbound webhook URL.

Until each is set, the corresponding integration gracefully no-ops.

Note: the user's Calendly account at `/bojodanchev` currently has no public event type configured, so the embed displays the profile but no calendar grid. Once a 30-minute event type is added in the Calendly dashboard, the full booking calendar will render inline in the funnel.
