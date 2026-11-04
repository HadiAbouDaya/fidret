# AI software factory Lab

- Status: done
- Human owner: Hadi Abou Daya
- Agent or harness: Codex
- Branch: hadi/ai-software-factory-lab; release record: hadi/software-factory-release-evidence
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

### Published release, 4 November 2026

[PR 31](https://github.com/HadiAbouDaya/fidret/pull/31) passed [GitHub run 41873979077](https://github.com/HadiAbouDaya/fidret/actions/runs/41873979077) for final head `a5648fbddfcbab2ae164dd82380ba8d4033c517f`, with no outstanding review threads, reviews or comments observed before merge. Merged under standing authorization as `e4561829060cf564258d83babe68dd5ea3bb7c7f`. The [main run 41875632416](https://github.com/HadiAbouDaya/fidret/actions/runs/41875632416) also passed foundation and runtime-bootstrap checks.

Cloudflare Pages reported successful deployment `35f0b78d-2952-4e61-9b98-d3de9121dec0` for that merge commit. Its exact [deployment URL](https://35f0b78d.fidret.pages.dev) and [production Lab](https://fidret.com/lab/ai-software-factory/) are distinct from the preceding GitHub checks.

Direct HTTPS verification on `fidret.com` passed for eight routes: Home, Lab index, new article, sources page, Hadi's profile, Inside Fidret, sitemap and the editable brief. All returned 200 with exact local-build byte parity. All three fingerprinted article CSS assets returned 200 with exact byte parity and CSS content types. Actual public CSP retained the same-origin static boundary. No em dashes, browser scripts or forms were found in the new article/output checked.

The [operating brief](https://fidret.com/lab/ai-software-factory/operating-brief.md) returned `text/markdown; charset=utf-8`, 5,654 bytes, SHA-256 `3f7e074a2c12ba4b509da2c97644066ef003f5bdda2ef379d5c3dc87078cee1c`, matching the generated source exactly. No response-header change was needed.

Live Chromium review at 1440, 390 and 320 px confirmed local fonts loaded, no horizontal overflow or page errors, the Verify station, healthy automatic-promotion and unknown-outcome reconciliation choices, and skip-link focus. The broader Chromium/WebKit matrix remains the preceding local evidence. A read-only merge audit found only task-handoff documentation changed between reviewed implementation `50facad` and the deployed merge.

## Handoff

- Checkpoint: researched note, native walkthrough, five promotion exercises, operating brief and lifecycle tests are merged and verified live. Three read-only AI reviews informed technical and craft corrections; rendered accessibility issues fixed.
- Remaining work: none for the Lab release. This documentation-only completion record follows the normal PR workflow separately.
- Next action: publish and merge this release record after its checks pass. Future experiments or reader feedback belong to a new task.
- Blockers: none.
- Acceptance basis: Hadi's 4 November request and delegated decisions; existing standing branch/merge authorization. No joint human review asserted.
- Publication: implementation `50facad`, verification head `a5648fb`, PR 31 and merge `e456182` complete; Cloudflare deployment `35f0b78d-2952-4e61-9b98-d3de9121dec0` succeeded and production bytes/render verified. This completion record is a documentation-only follow-up, not another feature deployment or a human peer-review claim.
- Last verified: 2026-11-04, deployed `e456182` on `fidret.com`; eight routes, three CSS assets, exact brief bytes/type and live Chromium at three widths passed. Local full-suite and cross-browser evidence remains tied to `50facad`; no public source changes occurred afterward.
