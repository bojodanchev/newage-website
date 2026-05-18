# Meta Ads Agency Client Funnel — end-to-end implementation

## Objective

Implement every in-code part of PRD Phase 1 (Foundation) inside `src/app/(meta-ads)/`: a working landing page (Hero · Problem · Solution · Case Studies · Offer + Process · FAQ · CTA), bilingual EN+BG, lead capture to Turso, Calendly embed, GoHighLevel webhook hand-off, Meta Pixel + CAPI + GA4 tracking — verified end-to-end in a **real browser** at `http://localhost:3031/meta-ads` (and `/bg/meta-ads`).

External service credentials (real Pixel ID, Calendly URL, GHL webhook URL, Meta Ad Account) are owner-blocked but the code is integration-ready and gated by env-var placeholders so missing creds do **not** stop the goal.

## Original Request

> "turn the prd into proper plan end to end fully implementing everything and testing in the real UI, if dev server - use less crowded port like 3031"

Source PRD: `docs/prd/meta-ads-agency-funnel.md` (17 sections).

## Intake Summary

- Input shape: `existing_plan`
- Audience: NewAge agency — funnel attracts Meta Ads clients (service businesses, personal brands, local businesses, high-ticket experts).
- Authority: `approved`
- Proof type: `demo`
- Completion proof: Real-browser run of `/meta-ads` and `/bg/meta-ads` at port 3031 with all 6 sections, working lead form (Turso row), Calendly embed, Pixel+GA4+CAPI events firing, GHL webhook returning 200, mobile + desktop both pass — captured via Chrome MCP / Playwright screenshots and network logs.
- Likely misfire: building a generic landing page in the existing `(marketing)` shell instead of a distinct funnel; OR shipping 6 section components without lead capture, Calendly, tracking, and CRM wiring; OR skipping real-browser verification.
- Blind spots considered:
  - External service creds (Pixel, Calendly, GHL) need owner — code must be env-var gated.
  - Existing `/` homepage and `(marketing)` layout must not regress.
  - Bilingual EN+BG must work via existing `next-intl`.
  - Turso `leads` schema must accept `source='meta-ads'`.
  - Port 3031 explicit (not 3000).
  - "Real UI" = Chrome MCP / Playwright, not curl.
- Existing plan facts: see `state.yaml` → `goal.intake.existing_plan_facts` (PRD pinned and preserved).

## Goal Kind

`existing_plan`

## Current Tranche

PRD Phase 1 (Foundation) — every in-code part: route group scaffold → 6 landing sections → lead capture API + form → tracking layer → Calendly + GHL → real-browser E2E. Continuous execution: after each verified Worker package, advance immediately to the next until T999 audit proves `full_outcome_complete: true`.

PRD Phases 2–4 (creative production, campaign launch, optimization) and owner-provided creds are queued as **explicitly blocked** tasks (T100, T200, T300, T400) and do **not** block the tranche.

## Non-Negotiable Constraints

- Build inside `src/app/(meta-ads)/` route group. Do **not** edit `src/app/(marketing)/` or `src/app/(legal)/`.
- Dev server runs on **port 3031**: `npm run dev -- -p 3031`.
- Bilingual EN+BG via existing `next-intl`; do not break the in-progress `[locale]` middleware refactor.
- Use `@libsql/client/web` (not native binary) for Turso — per `docs/gotchas.md`.
- Do **not** add `output: 'export'` to `next.config` — API routes need server rendering.
- All external services (Pixel, Calendly, GHL, GA4) gated by env vars with graceful no-op fallback.
- Dark-first NewAge palette `#0A0A0A`, `glass` utility, `gradient-text`, fonts Plus Jakarta Sans + Inter + JetBrains Mono, easing `[0.16, 1, 0.3, 1]`.
- Real-browser verification on T003, T004, T005, T006, T007 using Chrome MCP or Playwright (`pw` skill).
- No mocks for the E2E verification step (T007).

## Stop Rule

Stop only when T999 audit returns `complete` with `full_outcome_complete: true`, evidenced by:

- T001 Judge receipt approving plan + first Worker package.
- T002–T007 Worker receipts with passing verify commands.
- T007 evidence under `notes/T007-e2e/` (screenshots EN+BG, desktop+mobile, network logs).
- Owner-blocked T100/T200/T300/T400 remain blocked but do not gate completion.

Do not stop on missing owner creds. Mark the specific slice blocked and continue local work.

## Slice Sizing

Each Worker task is a vertical slice that produces a working capability:

| Slice | Working capability |
|---|---|
| T002 | Route group + reachable `/meta-ads` page shell EN+BG |
| T003 | All 6 mandatory landing sections rendered EN+BG |
| T004 | Lead capture API + working form → Turso row |
| T005 | Pixel + CAPI + GA4 firing on Lead event |
| T006 | Calendly embed + GHL webhook hand-off |
| T007 | Real-browser E2E proof for the full funnel |

No more than 2 consecutive tiny tasks; if a slice splits, PM reorients.

## Canonical Board

`docs/goals/meta-ads-agency-funnel/state.yaml`

If this charter and `state.yaml` disagree, `state.yaml` wins.

## Run Command

```text
/goal Follow docs/goals/meta-ads-agency-funnel/goal.md.
```

## PM Loop

On every `/goal` continuation:

1. Read this charter and `state.yaml`.
2. Run the GoalBuddy update checker; mention newer versions without blocking.
3. Re-check intake (original request, input shape, authority, proof, likely misfire).
4. Work only on the active task.
5. Assign Scout / Judge / Worker / PM per the task `assignee`.
6. Write a compact receipt with `changed_files`, verify command results, and a one-line summary.
7. Update the board; pick the next active task.
8. After T003 onwards, every Worker receipt must include at least one Chrome MCP / Playwright artifact OR an explicit reason it could not run (then create a follow-up Scout to unblock).
9. Treat owner-blocked tasks (T100/T200/T300/T400) as non-blocking — never set `goal.status: blocked` because of them.
10. Final completion is the T999 Judge audit only; it must check the §16 Success criteria in the PRD.

## Out of Scope (this tranche)

Per PRD §17: SEO, Google/LinkedIn Ads, affiliate program, white-label resell.
Per PRD §11 (deferred to owner tranches): Phase 2 creative production, Phase 3 campaign launch, Phase 4 optimization.
