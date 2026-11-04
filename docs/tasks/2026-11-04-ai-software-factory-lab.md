# AI software factory Lab

- Status: review
- Human owner: Hadi Abou Daya
- Agent or harness: Codex
- Branch: hadi/ai-software-factory-lab
- Updated: 2026-11-04
- Verification status: passed

## Purpose

Explain a full lifecycle AI software factory in which human engineers retain responsibility for the work and its consequences. Hadi requested extensive research, an engaging and advanced Lab, careful visual design and iterative improvement on 4 November 2026. This supports the [charter](../foundation/charter.md) through inspectable engineering judgment; it does not establish a new commercial offer or deployed factory.

## Scope

A canonical architecture note, a native interactive kitchen walkthrough, consequential decision exercises, a reusable engineering brief, sources and Lab discovery. Preserve the static Astro architecture, existing design language and public em-dash rule. [Issue 30](https://github.com/HadiAbouDaya/fidret/issues/30) tracks this work.

## Execution boundaries

- Authorized scope: Hadi explicitly delegated implementation decisions and requested publication as a Fidret Lab. Routine branch/PR/merge work follows [CONTRIBUTING.md](../../CONTRIBUTING.md). No infrastructure, account, permission or physical-equipment changes.
- Worktree: the existing clean `fidret` checkout on the task branch; other historical worktrees remain untouched.
- Dependencies: [publishing convention](../decisions/0008-astro-publishing.md), [design language](../design/fidret-design-brief.md), [craft rules](../decisions/0012-website-craft.md). No dependency change planned.
- Coordination: root Codex owns all edits and integration. Three read-only agents research architecture/operations, evidence/security, and analogy/narrative. They share the checkout without editing or spawning agents.
- Credit: Hadi requested and directs this individually authored exploration, building on his existing AI software-factory writing. Credit Hadi only; disclose research/implementation assistance and do not infer Elie's participation or an independent human review.

## Plan

1. Review primary engineering, security, evaluation and Michelin sources. Retain claim-to-source notes and distinguish evidence from original synthesis.
2. Build a complete architecture note and native walkthrough around one fictional booking change. Include protected evaluation, release authority, uncertain effects, recovery, economics and continuing ownership.
3. Build a useful editable operating brief, connect the Lab and preserve draft-withdrawal contracts.
4. Iterate on rendered hierarchy, comprehension, accessibility and failure behavior. Run meaningful model tests and the full shared checks.
5. Publish the reviewed branch/PR, merge under standing authorization after checks, and verify the live page, assets and download.

## Design plan

The visitor follows a booking change through a working kitchen, then makes release decisions from evidence. This is an educational walkthrough, not live telemetry or an execution service. A seven-stage rail represents the real delivery sequence; a change ticket and handoff explain the selected stage. Keep the rest quiet and readable rather than repeating kitchen decoration throughout.

Retain forest `#153E35`, ivory `#F6F2E9`, charcoal `#242A27`, sage `#D9E3DA` and copper `#A4543B`. Use local Manrope for interface and reading, with Newsreader italic only for a complete short phrase if useful. Align titles, controls and narrative to the shared shell. Use an asymmetric station/evidence composition on desktop and a logical single column on phones. Numbers identify the seven ordered handoffs, never credibility or performance.

The kitchen analogy is Fidret's explanatory synthesis. Michelin's published inspection criteria do not certify software processes, safety or service reliability. Accountability means meaningful authority, time, competence and ownership before and after release, rather than a final approval click or blame assigned to an individual.

## Acceptance criteria

- Primary sources support external claims with dates and explicit limits; no universal best-method, productivity, security or perfection claim.
- Readers can understand the purpose quickly, inspect a complete lifecycle and explore consequential failure cases without browser JavaScript.
- The note covers requirements, UX/accessibility, architecture, context/data governance, isolation, permissions, testing/evals, supply chain, deployment, operations, uncertain side effects, economics and learning.
- Human ownership is explicit at every stage, including pre-authorized automated releases and incident response. Risks require enforceable controls outside the model.
- The artifact is clearly a proposed architecture with fictional examples, not a claim that Fidret operates a production factory or has validated physical systems.
- No em dashes in public output; native controls, focus, print, reduced motion, enlarged text and 1440/768/390/320 layouts work in Chromium and WebKit.
- Required checks pass. New companion routes/download and discovery disappear when the source piece is withdrawn.
- PR checks, merge and live publication are reported as separate verified states.

## Decisions

Use the accepted static architecture and existing publishing contract. Native controls provide a substantial walkthrough without adding a runtime, framework, analytics or weakening CSP. This is an architecture exploration, not an adopted company operating policy.

## Verification

Baseline `pnpm check` passed: zero Astro diagnostics, 41 Node tests and 88 Python tests. First implementation typecheck/build passed. Five new model tests passed, including all 972 combinations of the modeled evidence/authority/effect/observation gates.

The first full check caught an error in the new publication test: it assumed its factory fixture was latest on Home, while the copied repository still contained a newer real article. Corrected the disposable fixture to control its own piece collection and publication ordering, preserving the latest-piece contract rather than changing production behavior. The isolated publication/withdrawal test then passed.

The final `COREPACK_HOME="$PWD/.local/corepack" pnpm check` passed against implementation commit `50facad`: zero diagnostics in 49 Astro/TypeScript files, 47 Node tests and 88 Python tests, followed by a successful production build and public-output validation. This includes the final METR source/prose addition and accessibility corrections. `git diff --check` and the foundation validator passed.

Chromium and WebKit review at 1440, 768, 390 and 320 px passed: 72 route/viewport views, 56 selected station views, 160 decision-feedback states and 112 disclosures. Checked native radio arrow-key operation, visible focus, skip-link focus, 200% text, reduced motion and print. All stages and correct explanations appear in print; incorrect choice feedback is suppressed. A separate 320 px check found no visible primary controls, labels, summaries or station return links below 44 px. No screen-reader listening or independent human usability study is claimed.

All 20 initial primary-source URLs returned HTTP 200, including the AWS rollback redirect. The additional May METR source was opened and verified directly. The public article contains 21 primary sources plus onsite companion/related-work links. Local HTML is about 73 KB before transfer compression, with no browser JavaScript or live data/API requests.

[Research and iteration basis](../design/software-factory-research.md) retains source interpretations, important technical corrections and the initial rendered review. The initial phone station was too long; detailed handoff/evidence now use a native disclosure, with responsibility still visible and direct return/navigation links.

## Handoff

- Checkpoint: researched note, native walkthrough, five promotion exercises, operating brief and lifecycle tests implemented. Three read-only AI reviews informed technical and craft corrections; rendered accessibility issues fixed.
- Remaining work: remote PR checks, merge and live verification.
- Next action: inspect PR 31 readiness when its checks complete; merge under standing authorization, then verify public output and record the release.
- Blockers: none.
- Acceptance basis: Hadi's 4 November request and delegated decisions; existing standing branch/merge authorization. No joint human review asserted.
- Publication: implementation commit `50facad528bcafbc34e4066cc673e933f7ca41f8` pushed to the task branch; [PR 31](https://github.com/HadiAbouDaya/fidret/pull/31) opened and linked. This verification handoff is a documentation follow-up on that branch. No merge or deployment yet.
- Last verified: 2026-11-04, final local full check and cross-browser matrix passed for `50facad`. Origin main remained `75e526f` at the pre-publication fetch; remote PR readiness and public deployment still need direct verification.
