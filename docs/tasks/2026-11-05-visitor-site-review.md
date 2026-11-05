# Visitor review and partnership-readiness plan

- Status: done
- Human owner: Hadi Abou Daya
- Agent or harness: Codex in T3 Code
- Branch: hadi/visitor-site-review-2026-11-05
- Updated: 2026-11-05
- Verification status: passed

## Purpose

Assess how well the website helps prospective clients understand Fidret's work, trust its judgment and consider working together. Hadi requested ideas, guidance and a plan, with no immediate website implementation. The commercial purpose should guide the experience without being stated as the website's purpose in public copy. Preserve the [charter's](../foundation/charter.md) evidence boundaries.

## Scope

Review the live visitor journey, work presentation, credibility, relevance, people, collaboration expectations and next steps. Hadi expanded the review to all website aspects and growth in the Fidret design guidance. Deliver an [internal assessment and prioritized plan](../design/2026-11-05-visitor-review.md), including proposed guidance amendments. Website code, canonical design guidance, public copy, deployment and account changes are outside this task.

## Execution boundaries

- Authorized scope: Hadi's review/planning request; local internal review records only. Recommendations remain proposals.
- Worktree: existing `fidret` checkout, clean at entry, moved from `main` at `010b74b` to this task branch based on tracked `origin/main` at `ba38bc1`. No other worktree changed.
- Dependencies: [design language](../design/fidret-design-brief.md), [design skill](../../skills/fidret-design/SKILL.md), [Physical AI brief](../foundation/physical-ai.md), and current live workspaces.
- Coordination: root owns live browser inspection, report and task/register edits. Three read-only reviewers assess published evidence/commercial interpretation, design guidance and technical quality. No parallel editors.

## Plan

1. Inspect the live desktop/mobile visitor journey and compare published work with canonical sources.
2. Identify the largest gaps in relevance, confidence and a useful next step, distinguishing observations from hypotheses.
3. Produce prioritized proposals, example structures and a validation plan without implementing the website.

## Acceptance criteria

- Findings cite concrete current pages or interactions and distinguish expert judgment from measured visitor behavior.
- Explain what already works, what limits the commercial objective and why.
- Propose an ordered plan with content/evidence dependencies and observable acceptance criteria.
- Preserve truthful distinctions between conceptual writing, implemented software and client/physical validation.
- No website code, public copy, publication, deployment or account changes.

## Decisions

No company, market, offer or design decision is accepted by this review. Audience, first bounded engagement and contact destination remain human choices to resolve before future implementation.

## Verification

Completed live browser and source review on 5 November 2026. The [report](../design/2026-11-05-visitor-review.md) records covered routes, observed interaction changes, viewport coverage, exact hierarchy observations and limits. Independent read-only reviews covered evidence, design guidance and technical foundations. No visitor analytics or human user study has been supplied; the judgment is qualitative.

`COREPACK_HOME="$PWD/.local/corepack" pnpm check` passed: foundation validation, zero Astro diagnostics in 69 files, 62 Node tests, production build, public-output and SEO/GEO checks, and 100 Python tests. `git diff --check` passed. These verify the documentation/source baseline, not commercial effectiveness. The regenerated ignored `website/` output is disposable and is not a website source change.

A compact current/proposed journey comparison was prepared outside Git in `deliverables/visitor-journey-review.html` at the workspace level and shown with `html_render`. Its separate `html_preview` image check was unavailable: the tool reported that the host blocks its sandbox through AppArmor and suggested host browser setup. No privileged host setup was performed. This did not affect the live shared-browser review, which completed successfully. The review tab was closed.

## Handoff

- Checkpoint: full visitor review, site-wide growth assessment, proposed guidance amendments and phased plan completed as local internal documents. No website or canonical design-guidance changes.
- Remaining work: none for the review request. Recommendations remain proposals.
- Next action: Hadi can use phase 1 to choose the primary lead/project situation and current credible scope. Future implementation belongs to a separate task.
- Blockers: none for the review.
- Acceptance basis: Hadi's explicit review/planning request and expanded request to assess all aspects and design guidance, completed within that scope. No invented human acceptance of the recommendations.
- Publication: local report, task and task-register entry only; no commit, push, PR, merge or deployment for this review. The comparison file is outside Git. Public copy and canonical guidance remain unchanged.
- Last verified: 2026-11-05, source base `ba38bc1`, live shared-Chromium review and full local checks above. Field performance, search-account outcomes, screen-reader listening, second-engine behavior and human comprehension remain unverified in this review.
