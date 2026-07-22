# Decision: Influencer ecosystem as a bilingual marketing subsystem

**Date:** 2026-07-22
**Status:** Accepted

## Context

NewAge Content is adding an influencer-marketing agency arm serving three
different audiences: brands, represented influencers, and UGC creators. Each
audience needs its own commercial message and qualification flow, while the
site still needs to feel like one coherent NewAge property.

The source brief (`INFLUENCER ECOSYSTEM.md`) also describes later-stage CRM,
dashboard, AI, automation, events, and media capabilities. This implementation
covers the public marketing and lead-capture surface; it does not pretend that
the future operational products already exist.

## Decision

### Route and layout boundary

Build the public arm inside the existing `(marketing)` route group so it shares
the global navbar, footer, locale switcher, scroll progress, and exit-intent
behavior:

- `/influencer-marketing`
- `/influencer-marketing/brands`
- `/influencer-marketing/influencers`
- `/influencer-marketing/ugc`
- Bulgarian equivalents under `/bg/...`

The ecosystem page routes visitors to one of three dedicated funnels. Brand,
influencer, and UGC pages share `InfluencerFunnel`, while their content and hero
assets vary by audience.

### Content model

Keep all bilingual influencer copy in the typed module
`src/data/influencer.ts`. The accessor functions are:

- `getInfluencerLanding(locale)`
- `getInfluencerFunnel(locale, audience)`

This is a deliberate local exception to the site's JSON message namespaces:
the subsystem passes a complete typed content object from its server page into
the client composition. Shared chrome still uses next-intl messages.

### Visual system

Use an editorial sub-brand rather than the main site's generic glass-card
language:

- ink-black and warm-ivory surfaces;
- coral as the primary influence accent;
- lilac for represented talent and mint for UGC pathway cues;
- full-bleed creator photography;
- cardless lists, dividers, large type, and restrained Framer Motion reveals.

Three original images live under `public/influencer/` as optimized WebP files.
They were generated through the built-in image generation path and compressed
locally; the complete set is approximately 256 KB.

### Lead model

All audience forms submit to `POST /api/leads/influencer` and store in the
existing Turso `leads` table. The API assigns one of three sources:

- `influencer-brands`
- `influencer-talent`
- `influencer-ugc`

Audience-specific data is serialized into `leads.extra` with
`kind: "influencer-ecosystem"`. The shared `influencerLeadSchema` applies email,
length, URL, honeypot, speed-trap, and brand-company validation. The public UI
has explicit loading, success, and error states.

No email notification or external CRM synchronization is part of this phase.

### Evidence policy

Do not invent case-study results, testimonials, creator counts, or ROI claims.
Until approved evidence exists, communicate supported campaign capabilities,
process, outcomes, industries, and event formats without fabricated proof.

## Consequences

- The new arm is independently art-directed while preserving the global site
  shell and bilingual routing.
- Adding another influencer audience requires updating the audience union,
  typed content, route, visual asset mapping, schema, and API source mapping.
- CRM reporting can segment the three lead types without a new database table.
- Operational dashboards, matching AI, creator portals, payments, contracts,
  automations, and event administration remain future work.

## Verification record

- `npm run type-check` passed.
- `npm run lint` passed with only pre-existing unrelated warnings.
- `npm run build` passed; 88 static pages were generated.
- All eight EN/BG influencer routes returned HTTP 200 in browser checks.
- Desktop and 390 px mobile layouts had no horizontal overflow or broken
  images; browser console errors were zero.
- The brand form reached its success state with the expected intercepted CRM
  payload.
- With Turso credentials explicitly blanked, a real valid UGC API request
  returned 200 and a honeypot request returned 400; no production row was
  written.
