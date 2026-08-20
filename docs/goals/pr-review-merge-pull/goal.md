# Review Open PRs, Merge, Resolve Conflicts, and Pull Locally

## Objective

Bring this repo to a clean, current local state by responsibly handling every open pull request: read each diff, perform a full code review, merge the safe ones, resolve conflicts (auto when trivial, escalate when semantic), and pull the final `main` to the local working tree.

## Original Request

> review prs, merge, resolve conflicts and pull locally

## Intake Summary

- Input shape: `specific`
- Audience: repo owner (bojo)
- Authority: `approved` (user explicitly asked for review + merge + conflict resolution + local pull)
- Proof type: `artifact` (merged/closed PRs, current local `main`, clean working tree)
- Completion proof: Every open PR at start of run is resolved (merged, closed with reason, or explicitly deferred with receipt); local `main` is fast-forwarded to `origin/main`; working tree has no uncommitted/unstashed changes from the merge work itself; no orphaned merge-in-progress state (`.git/MERGE_HEAD`, etc.).
- Likely misfire: Merging without genuine review (rubber-stamp), auto-resolving a semantic conflict the wrong way, force-pushing or destroying work, skipping CI verification, leaving local in a half-pulled state, or missing PRs filed against non-default branches.
- Blind spots considered:
  - Some PRs may target branches other than `main` — Scout must surface base branches.
  - CI status matters (do not merge red PRs without an explicit override decision).
  - Draft PRs should be flagged but not merged.
  - There may be untracked/staged local changes (see `git status` in initial context — many untracked screenshot/asset files) that must not be lost during the local pull.
  - Some PRs may require dependent merge order.
  - Branch protection rules or required reviewers may block merges from CLI.
- Existing plan facts: User-specified workflow is `review → merge → resolve conflicts → pull locally`, with reviews at "full code review" depth and conflict policy "auto-resolve when obvious, escalate ambiguous".

## Goal Kind

`specific`

## Current Tranche

Process the set of open PRs that exist when Scout runs `gh pr list`. For each PR: full code review, merge decision, conflict resolution per policy. After all PRs are handled, pull `main` locally. Done when a final audit confirms every PR has a terminal receipt (merged, closed, deferred with reason) and `git status` on local `main` is clean and current.

This is execution, not planning. The default after Judge selection is to immediately activate the next Worker, not to stop.

## Non-Negotiable Constraints

- Full code review depth per PR (read the diff, check correctness/security/regressions). No rubber-stamp merges.
- Conflict policy: auto-resolve trivial conflicts (formatting, ordering, non-overlapping additions); STOP and escalate any semantic/logic conflict.
- Never force-push to `main` or any shared branch.
- Never use `git reset --hard`, `git checkout --`, `git clean -f`, or `branch -D` on shared/in-flight work without explicit operator approval.
- Do not merge a red-CI PR without an explicit Judge decision and recorded rationale.
- Preserve uncommitted local changes — the untracked files listed in the session's initial `git status` must survive the run, or be explicitly addressed with the operator before destructive action.
- Draft PRs are NOT merged. They are noted and deferred.
- PRs against non-default base branches require an explicit Judge decision before merging.
- Respect branch protection: if a merge requires approvals/CI we cannot provide, mark the specific PR blocked with a receipt and continue with the rest.

## Stop Rule

Stop only when a final audit proves every open PR at start has a terminal state and the local `main` matches `origin/main` with no leftover merge state.

Do not stop because a single PR needs operator approval, has a semantic conflict, or fails CI. Mark that exact PR blocked with a receipt and keep processing the rest.

## Slice Sizing

A good Worker slice is "fully review + merge one PR" or "fully review + merge a small batch of trivial PRs that touch disjoint files". Do NOT split into "review PR #N" and "merge PR #N" as separate Worker tasks unless the review surfaces a real blocker. The final local `git pull` + verification is one PM slice.

## Canonical Board

Machine truth lives at:

`docs/goals/pr-review-merge-pull/state.yaml`

If this charter and `state.yaml` disagree, `state.yaml` wins.

## Run Command

```text
/goal Follow docs/goals/pr-review-merge-pull/goal.md.
```

## PM Loop

On every `/goal` continuation:

1. Read this charter and `state.yaml`.
2. Re-check intake: list of open PRs may have changed since Scout ran — re-enumerate if stale.
3. Work only on the active board task.
4. After Judge picks the next PR, immediately activate the Worker for that PR (review + merge).
5. After each merge, PM expands the board with the next per-PR task until the queue is empty.
6. When all PRs are terminal, activate the local-sync PM task (`git pull`, verify clean tree).
7. Final Judge audits against completion proof.
8. Goal completes only when `full_outcome_complete: true`.
