# Website clarity and lasting design discipline

- Status: active
- Human owner: Hadi Abou Daya
- Agent or harness: Codex
- Branch: hadi/website-craft
- Updated: 2026-11-03
- Verification status: not-run

## Purpose

Remove generic UI and copy patterns so a reader can understand Fidret, inspect its actual work and judge its limits. Preserve the [charter](../foundation/charter.md) and established identity.

## Scope

Public company and Lab presentation, navigation, shared footer, em dashes in public output, and durable guidance in the canonical [design brief](../design/fidret-design-brief.md) and project skill. No new commercial claims, equipment behavior, dependencies or publishing architecture.

## Execution boundaries

- Authorized scope: Hadi requested incremental UI/UX refinement, em-dash removal and lasting rules. Standing contribution authorization covers checked branch publication and merge. No account or manual deployment changes.
- Worktree: existing clean `fidret` checkout, task branch above.
- Dependencies: [design language decision](../decisions/0010-evidence-design-language.md), [onsite knowledge convention](../decisions/0011-onsite-knowledge-and-evidence.md).
- Coordination: root agent owns all edits and integration. `design_audit` provides read-only review in this checkout; no parallel editing.

## Plan

1. Inventory public routes, review Hadi's three linked references, establish baseline and record findings.
2. Simplify Home and footer, then refine company/reading surfaces and verify each coherent increment.
3. Record shared rules and add a public-output em-dash guard with meaningful failure tests.
4. Review desktop/mobile/zoom/keyboard states, run shared checks and publish under standing authorization.

## Acceptance criteria

- Home names the developing Physical AI practice plainly and leads to actual work.
- Repeated slogans, decorative feature icons and marketing-sized shared footer are removed; other pages use descriptive headings and natural wrapping.
- Public prose, titles, accessible labels, sources and downloads contain no em dashes. Missing data has an explicit label.
- Shared guidance requires page-specific purpose, supportable claims, purposeful figures, clear actions and visual verification; CI enforces only objective text constraints.
- Existing routes, publication filtering, download bytes, native walkthrough controls and static/CSP contracts remain valid.
- Shared checks pass, visual evidence and limitations are recorded, and publication status is explicit.

## Findings and increments

Initial source audit: generic Home h1, repeated mission fragments, redundant purpose section/hero footnote, three decorative icon questions, oversized site-wide footer, forced heading breaks, slogan-heavy secondary pages. The existing palette, self-hosted typography, source-backed writing and fixed signal model are useful foundations to retain.

## Decisions

Keep the accepted identity and static architecture. Adapt the references into Fidret's existing shared system instead of installing competing rule systems. Record the enduring convention in a numbered decision when implemented.

## Verification

Baseline `pnpm check` passed on 2026-11-03 with Node 24.22.1/pnpm 11.28.9: Astro 0 diagnostics, Node suite passed and 83 Python tests passed. Bootstrap obtained the pinned runtime after a transient archive timeout. First increment build passed; before/after Home rendered and visually inspected at 1440 and 390 CSS px using local headless Chromium. Final combined checks pending.

## Handoff

- Checkpoint: Home and compact shared footer implemented; first desktop/phone visual pass completed.
- Remaining work: implementation, persistent rules, visual and automated verification, publication.
- Next action: refine remaining public surfaces, then add lasting rules and output guard.
- Blockers: none; project runtime bootstrap is in progress.
- Acceptance basis: Hadi's 2026-11-03 request and standing checked-publication authorization; no Elie review asserted.
- Publication: local task branch only; no commit, push, PR, merge or deployment from this task.
- Last verified: 2026-11-03 source/Git inspection at base `8182e9c`; baseline check pending.
