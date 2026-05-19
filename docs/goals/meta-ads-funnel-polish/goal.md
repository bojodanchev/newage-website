# Meta Ads Funnel — interactivity, real case-study articles, and AI editorial imagery

## Objective

Lift `/meta-ads` from a static landing page to an interactive, content-backed funnel:

1. **Medium interactivity** — scroll-triggered reveals (replace mount-time animate on below-the-fold sections), animated count-up metric values in the Case Studies section, hover micro-interactions on cards, animated/progressive Process timeline. Respect `prefers-reduced-motion`.
2. **3 real blog articles** — one per case study, methodology framing (not "we did X for client Y"). Wired to `/meta-ads` via `Read the breakdown →` CTAs on each card. EN required; BG decision locked by T001.
3. **AI editorial imagery** — 3 case-study cover images + 1 Process/Solution diagram, generated via the `gpt-image-2-prompt` skill, cinematic editorial aesthetic (dark moody photographic, NewAge palette, no text in image).

Verified end-to-end in a real browser at port 3031 (EN+BG, desktop+mobile), then shipped via the standard `git push` → Vercel auto-deploy.

## Original Request

> "get the landing page more interactive - make sure the results are backed by a real blog article for example, and use /gpt-image-2-prompt for more visual stuff like images, cases etc. to have a more visual example in as well and see where we can add AI generated content (we can also add reference images for things needed)"

## Intake Summary

- Input shape: `existing_plan` (improvement on a shipped tranche)
- Audience: `/meta-ads` visitors + owner Bojo
- Authority: `approved`
- Proof type: `demo`
- Completion proof: real-browser pass at port 3031 — scroll reveals + metric counters + hover states fire, all 3 case-study CTAs reach a working blog article, AI imagery renders on case-study cards + Solution section, EN+BG both work, mobile+desktop both pass, screenshots captured.
- Likely misfire: shipping decorative animation polish while case-study CTAs still dead-end; OR over-building one interactive feature; OR AI imagery drifting off-brand.
- Blind spots: blog data shape (locked by T001), bilingual blog budget, gpt-image-2-prompt is a prompt-writer (not an end-to-end image gen API), accessibility (reduced-motion), brand cohesion on AI imagery.

## Goal Kind

`existing_plan`

## Current Tranche

T001 (Judge) → T002 (interactive polish) → T003 (3 blog articles + CTA wiring) → T004 (4 AI images via gpt-image-2-prompt) → T005 (real-browser E2E) → T999 (audit). Continuous execution; advance to the next slice on each Worker receipt unless verification fails or scope ambiguity surfaces.

T100 (owner reference images) is **explicit out-of-tranche**: stays blocked, does not gate completion.

## Non-Negotiable Constraints

- Build inside `src/app/[locale]/(meta-ads)/` and `src/components/meta-ads/`. Do **not** edit `(marketing)` core layout (blog routes are fine to extend).
- Dev port: **3031**.
- AI imagery aesthetic: cinematic editorial, dark moody photographic, NewAge palette (`#0A0A0A` bg, `#6C3AFF` purple, `#00E5A0` mint, `#FF6B35` orange accents), **no text in image**.
- Blog articles must use the existing data shape (locked by T001 Judge).
- `prefers-reduced-motion` must short-circuit scroll reveals and counter animations.
- Per-task `allowed_files` boundaries are real — Worker stops if a write goes outside.
- `gpt-image-2-prompt` skill is invoked **only** during T004 — not at `$goal-prep` time.

## Stop Rule

Stop only when T999 returns `complete` with `full_outcome_complete: true`, evidenced by:

- T001 Judge receipt locking T002/T003/T004 specs.
- T002–T005 Worker receipts with passing verify commands.
- T005 evidence under `notes/T005-e2e/` (8+ screenshots).
- T100 (owner refs) may stay blocked — does not gate completion.

Do **not** stop because the owner has not supplied reference images. Mark T100 blocked and ship the placeholder AI imagery; re-run T100 later when refs arrive.

## Slice Sizing

Each Worker task is a vertical slice that produces a working capability:

| Slice | Working capability |
|---|---|
| T002 | Interactive polish — scroll reveals + counter animations + hover states + progressive process timeline, EN+BG |
| T003 | 3 blog articles live at `/blog/<slug>`, CTAs wired from Case Studies section |
| T004 | 4 AI images live in `public/meta-ads/`, rendered in Case Studies + Solution sections |
| T005 | Real-browser E2E proof — 8+ screenshots, zero funnel-originated console errors |

## Canonical Board

`docs/goals/meta-ads-funnel-polish/state.yaml`

If this charter and `state.yaml` disagree, `state.yaml` wins.

## Run Command

```text
/goal Follow docs/goals/meta-ads-funnel-polish/goal.md.
```

## PM Loop

1. Read this charter and `state.yaml`.
2. Run GoalBuddy update checker (mention newer versions without blocking).
3. Re-check intake (original request, likely misfire, blind spots).
4. Work only on the active task.
5. Assign Scout / Judge / Worker / PM per the task `assignee`.
6. Compact receipt with `changed_files`, verify command results, one-line summary.
7. Update the board; pick the next active task.
8. T002 onwards: every Worker receipt must include at least one Chrome MCP / Playwright artifact OR an explicit reason it could not run.
9. Treat owner-blocked T100 as non-blocking.
10. Final completion is T999 Judge audit only.

## Out of Scope (this tranche)

- Flagship interactive feature (ROI calculator) — deferred.
- Hero background AI image — deferred.
- Blog post hero AI images — deferred.
- Real customer logos / case-study replacement copy.
- Phase 2–4 of the parent PRD (creative production, campaign launch, optimization) — still owner-blocked at the original `meta-ads-agency-funnel` goal.
