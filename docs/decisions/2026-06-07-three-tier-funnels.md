# Decision: 3-Tier Conversion Funnel System

**Date**: 2026-06-07
**Status**: accepted

## Context
A single site message can't convert three very different buyer types at once: a
local business owner who doesn't understand digital marketing, a business already
running ads that underperform, and a scaling company evaluating a strategic
partner. The plan (PRD: "Agency Website PRD ThreeTier") is to send each prospect a
URL matched to their awareness level, so the page speaks their language on arrival.

## Decision
Build three standalone, single-CTA funnels under a no-nav route group `(tiers)`:

- `/start` — Beginner, **green**, zero jargon, emotion-first, 4-step flow → free 20-min call
- `/grow` — Intermediate, **blue**, methodology + 5-layer funnel, CRM/AI add-ons → free funnel audit
- `/scale` — Pro/Enterprise, **gold**, capability stack + AI agents + custom software, scarcity → strategy session

Each exists in EN (root) and BG (`/bg/*`). The full marketing home is kept and a
`TierPicker` self-selection block routes visitors to the right tier. Implementation
shares one theme-aware component set; tiers differ by a `.tier-*` CSS-var theme +
copy depth + a few bespoke sections. Lead capture is unified at `/api/leads/tier`
(Turso + Resend email, capturing a preferred call time per the operator's request).

Also in this change set:
- Renamed the mortgage-broker funnel `/meta-ads` → `/banking` (308 redirect kept).
- Dropped the `leads.source` CHECK constraint so new funnels are code-only.

## Alternatives Considered
- **Replace the homepage with a pure router** (per the PRD) — rejected: the operator
  wanted to keep the full agency site; the path-picker block achieves the routing
  intent non-destructively.
- **One shared page, swap copy via a query param/tier flag** — rejected: every page
  would stay the same depth; tiers need genuinely different structure (4-step vs
  5-layer funnel vs capability stack) and SEO-distinct URLs.
- **Full multi-page site copy per tier** — rejected: 3× maintenance for little gain
  over focused single-page funnels.
- **Keep page-level `redirect()` for /meta-ads** — rejected: SSG `redirect()` emits a
  meta-refresh that drops ad query params; `next.config` redirects give a true 308.

## Consequences
- New funnels/campaigns are now cheap to add (new `(tiers)`-style route + message
  file + `source` value; no DB migration thanks to the dropped CHECK constraint).
- The operator's outreach must send the tier-matched URL — the system only works if
  the right link reaches the right prospect (the qualification step is the real
  leverage, per the PRD's own caveat).
- Lead emails require `RESEND_API_KEY` to actually send; until then leads persist and
  the UI succeeds silently.
- Testimonials/stats across tiers are placeholders pending real client data.
