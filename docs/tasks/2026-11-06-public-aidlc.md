# Explain AI-DLC adoption on the website

- Status: review
- Human owner: Hadi Abou Daya
- Agent or harness: Codex in T3 Code
- Branch: hadi/public-aidlc-approach
- Updated: 2026-11-06
- Verification status: partial
- AI-DLC: 1
- Issue: https://github.com/HadiAbouDaya/fidret/issues/70

## Purpose

Help a visitor understand how Fidret uses AI in its website work and what AI-DLC adoption actually changes. Explain the method in plain language, consistent with [Trust earned](../foundation/charter.md).

## Scope

Add an anchored section on Approach and a contextual link from the existing publishing-system Work example. Describe the actual repository methodology adaptation from [decision 0016](../decisions/0016-default-aidlc.md), not a client delivery result, certification or operating AI engine. Preserve page identity, navigation, initial HTML and existing styling.

## Execution boundaries

- Authorized scope: Hadi requested a public section explaining adoption and delegated placement on 6 November 2026. Standing authority covers reversible implementation, checked PR publication and merge. No account changes, manual deployment or outreach.
- Worktree: existing root checkout, task branch from clean origin/main 3239b2e. Other worktrees remain untouched.
- Dependencies: decision 0016; design/search skills and standards; existing publishing-system example and static build.
- Coordination: root owns all edits, verification and integration. aidlc_public_placement performs read-only placement/content review; public_aidlc_review independently reviews the implementation and claims. No concurrent editor.

## Plan

1. Inspect existing surfaces and actual adoption; select the smallest coherent location.
2. Add plain-language definition, practical consequences, current scope and source, with a relevant Work cross-link.
3. Run shared validation, inspect responsive/enlarged/keyboard/print output and review claims.
4. Publish a checked PR and merge under existing authority; report merge and live observation separately.

## Acceptance criteria

- A1: Approach explains AI-DLC in plain language and states its current website-work scope.
- A2: The section describes actual adaptive planning, ownership/authority, acceptance traceability and checked delivery without claiming a native engine, client outcomes or measured productivity gains.
- A3: The publishing-system Work example links directly to the visible section; external methodology attribution is accurate and existing discovery/canonical identities remain coherent.
- A4: Initial HTML, no-JavaScript reading, narrow/enlarged layouts, keyboard focus and print preserve a readable explanation within the existing design system.
- A5: Full local gate and relevant review pass; the final PR head must pass required GitHub checks with no unresolved feedback before merge.

## AI-DLC

- Profile: express
- Depth: Minimal
- Rationale: A bounded content addition using existing section composition. Add intent/scope/practices/planning analysis for truthful placement, with a read-only review. No new Lab publication or application feature is required.
- Current phase: operation
- Gate basis: Hadi explicitly requested the public explanation and delegated placement; existing authority covers checked implementation/publication. No fresh approval is invented.
- Operation status: Publish through the existing protected PR and main-triggered Pages path. No manual deployment or new service.

| Stages | Disposition | Evidence or reason |
| --- | --- | --- |
| delivery-planning, intent-capture, practices-discovery, requirements-analysis, reverse-engineering, scope-definition, state-init, workspace-detection, workspace-scaffold | complete | Requested section, existing page contracts, implemented adoption and canonical sources inspected; criteria and placement recorded. |
| code-generation, build-and-test | complete | Anchored section, Work link and map implemented. Shared gate, browser/print review and independent claims review passed. |
| deployment-pipeline, feedback-optimization | planned | Exact-head required GitHub checks and protected publication remain. |
| approval-handoff, ci-pipeline, contract-design, deployment-execution, domain-design, environment-provisioning, feasibility, functional-design, incident-response, infrastructure-design, market-research, nfr-design, nfr-requirements, observability-setup, performance-validation, refined-mockups, rough-mockups, team-formation, units-generation, user-stories | skipped | Bounded public explanation of an existing method: no new product, experiment, UI system, application logic, infrastructure or manual deployment. Existing section styles and named owner suffice. |

## Traceability

| Criterion | Implementation | Verification | Result |
| --- | --- | --- | --- |
| A1 | U1: Approach section | Definition, adoption date and explicit website scope verified against implementation and primary source. | pass |
| A2 | U1: scoped adoption explanation | Independent read-only source review found no corrections; copy matches decision 0016 and actual adaptation. | pass |
| A3 | U1: publishing-system cross-link and source attribution | Native link round trip passed; primary attribution checked; shared SEO/GEO gate passed. Canonical routes remain unchanged. | pass |
| A4 | U1: existing static section styles | Chromium: 8 width/text layouts, native keyboard round trip, no-JS reading and 0 axe violations. Printed section visually inspected intact on page 4 of a five-page A4 export. | pass |
| A5 | Shared gate and protected PR publication | Local/full and exact-head GitHub checks planned. | pending |

## Decisions

Approach is canonical because this is how we work. Work already presents the implemented publishing system, so its existing next-step link can point to this explanation. A separate Lab publication would add a publication artifact without a new technical investigation. This is a routine content-placement choice within decision 0016, not a change to company direction or architecture.

## Verification

Baseline gate passed with pinned Node 24.22.1 and pnpm 11.28.9: zero diagnostics, 67 Node tests, 122 Python tests. Combined gate passed for the public content: zero diagnostics, 67 Node tests, 122 Python tests, website and SEO/GEO checks passed. Before editing source, inspected current pages, design/search standards, actual adoption and upstream profile. Primary methodology attribution reviewed on 6 November: [AWS Labs introduction](https://awslabs.github.io/aidlc-workflows/guide/00-introduction/) and [AWS methodology overview](https://aws.amazon.com/blogs/devops/ai-driven-development-life-cycle/). Local decision 0016 is authoritative for Fidret-specific claims.

### Render, source and output verification

The isolated Chromium review used the built site with its existing security headers. All eight combinations of 320, 390, 768 and 1440 px with default/doubled root text passed no-overflow checks. The desktop/phone whole page and new section, including narrow doubled text, were visually inspected. The keyboard path from the publishing-system link to the section, then back to verification, passed with visible focus. No-JavaScript reading retains all copy and both links. One full-page WCAG/best-practice axe scan reported zero violations; this is not whole-site accessibility conformance or screen-reader listening.

A read-only print inspection generated a five-page A4 export with disclosures initially closed. Extracted text retains the whole method; visual page-4 inspection confirms the added section is intact and legible on one page. No new public PDF is introduced. Review fixtures and results are ignored under .local/public-aidlc and .local/public-aidlc-review.mjs. The first enlargement fixture attempted an inline style tag and was blocked by the existing CSP; the corrected fixture uses CSSOM text-size adjustment, without weakening page policy. These are Chromium rendering checks, not a real-reader study or a cross-engine claim.

Independent source/claims review found no concrete changes needed. Shared gate passed; git diff --check passed. Comparison to the preserved pre-adoption public-output hashes finds exactly two changed HTML files (Approach and publishing-system Work), no added/removed paths, and identical other 61 files including styles/assets. Canonical IDs, article authors/dates, sitemap/AI discovery and runtime are unchanged. Approach description now accurately includes AI-DLC. No new tests mirror the reversible copy; existing release contracts plus concrete rendered checks cover the affected behavior.

## Handoff

- Checkpoint: content, contextual link, metadata and map implemented. Independent review, responsive/keyboard/fallback/print inspection and full local gate passed.
- Remaining work: publish PR, verify required exact-head checks/reviews, finalize completion record and merge; observe production separately.
- Next action: publish the verified change and inspect required GitHub checks on its current head.
- Blockers: none.
- Acceptance basis: explicit user request, delegated placement and standing publication authority.
- Publication: local task branch only; no source commit, PR, merge or new live release yet.
- Last verified: 2026-11-06, clean main 3239b2e before branch; current source/adoption context inspected. Baseline and combined gates, focused rendered checks and source review passed. Remote publication checks and live release not yet verified.
