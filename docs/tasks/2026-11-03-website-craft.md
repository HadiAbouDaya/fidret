# Website clarity and lasting design discipline

- Status: active
- Human owner: Hadi Abou Daya
- Agent or harness: Codex
- Branch: hadi/website-craft
- Updated: 2026-11-03
- Verification status: partial

- Issue: [#25](https://github.com/HadiAbouDaya/fidret/issues/25)

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

Second increment: descriptive headings and natural wraps across company, Lab, method, contributor and planning pages; Lab writing now precedes the larger exploration feature; consistent title separators/source labels and explicit missing-data labels. The article update date records source-label edits, without changing technical claims.

Initial source audit: generic Home h1, repeated mission fragments, redundant purpose section/hero footnote, three decorative icon questions, oversized site-wide footer, forced heading breaks, slogan-heavy secondary pages. The existing palette, self-hosted typography, source-backed writing and fixed signal model are useful foundations to retain.

## Decisions

[Decision 0012](../decisions/0012-website-craft.md) records the active craft convention under Hadi’s explicit request. Keep the accepted identity and static architecture; adapt the references into Fidret’s existing shared system instead of installing competing rule systems.

## Verification

2026-11-03 integrated review: `pnpm check` passed (Astro 0 errors/warnings/hints, 41 Node tests, 88 Python tests and real site build/output validation). The added tests reject literal/entity-encoded em dashes in text, titles, alt labels, SVG and Markdown, CSS generated text/hex escapes, and absent keyboard skip destinations; normal punctuation still passes. No dependencies or lockfile changes.

Read-only independent source review corrected Home recovery wording, an unconditional article-specific Lab intro and CSS-generated-text guard coverage. Native skip-link focus was found deficient in rendered QA and corrected with focusable main destinations across all pages. Isolated empty-Lab build and 390 px render passed with the article withdrawn and exploration reachable. Final cross-browser pass and minor copy polish verification in progress.

Baseline `pnpm check` passed on 2026-11-03 with Node 24.22.1/pnpm 11.28.9: Astro 0 diagnostics, Node suite passed and 83 Python tests passed. Bootstrap obtained the pinned runtime after a transient archive timeout. First increment build passed; before/after Home rendered and visually inspected at 1440 and 390 CSS px using local headless Chromium. Final combined checks pending.

## Handoff

- Checkpoint: UI/copy refinements and shared rules implemented in three increments; integrated automated checks passed; final cross-browser render review in progress.
- Remaining work: final visual checks, task evidence and remote publication.
- Next action: finish Chromium/WebKit checks and publish the verified branch.
- Blockers: none.
- Acceptance basis: Hadi's 2026-11-03 request and standing checked-publication authorization; no Elie review asserted.
- Publication: first local checkpoint `08ecc7b`; remaining edits local. Issue #25 created. No push, PR, merge or deployment from this task.
- Last verified: 2026-11-03 full shared checks passed after implementation; final render coverage pending. Base `8182e9c`, task branch above.
