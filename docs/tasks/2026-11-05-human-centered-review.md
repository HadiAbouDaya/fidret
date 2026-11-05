# Human-centered website review and redesign proposal

- Status: done
- Human owner: Hadi Abou Daya
- Agent or harness: Codex in T3 Code
- Branch: hadi/human-centered-review
- Updated: 2026-11-06
- Verification status: passed

## Purpose

Review the entire visitor journey and propose approachable discovery that serves [Trust earned](../foundation/charter.md). Hadi explicitly reinforced mission alignment. Preserve truthful evidence and Physical AI as the first developing practice.

## Scope

Repository and live-site audit, five visitor perspectives, page recommendations, copy examples, interaction concepts, phased roadmap and real-reader test protocol. Deliver an internal proposal. No website implementation or canonical design-policy change before Hadi approves the direction.

## Execution boundaries

- Authorized scope: review and planning only under the current request. Keep proposal local for review; no deployment, outreach, account changes or public-copy edits.
- Worktree: existing fidret checkout, clean at entry on main cde7631, now task branch above.
- Dependencies: [visitor outcomes](../decisions/0015-visitor-outcomes.md), [runtime boundary](../decisions/0013-progressive-lab-experiences.md), [visitor validation](../design/visitor-validation.md), completed [follow-up](2026-11-05-visitor-followup.md).
- Coordination: root alone edits this task, task register and review document. Two read-only agents review content/evidence and interactions/accessibility in the shared checkout; no parallel editing.

## Plan

1. Inspect canonical context, implementation and current desktop/mobile site.
2. Identify mission-aligned friction and smallest useful corrections, separating observations from hypotheses.
3. Write the proposal and staged validation/implementation plan.
4. Check repository documentation, record browser/test limits and hand off for direction approval.

## Acceptance criteria

- Covers requested deliverables A through F and all five visitor perspectives.
- Exact existing copy and relevant files ground recommendations.
- Describes current evidence, proposed choices and untested visitor hypotheses separately.
- Preserves routes, credits, model logic, accessible fallback and truthful claims.
- Defines a test with at least five first-time non-technical participants, without claiming research was conducted.
- Website sources remain unchanged; roadmap waits for direction approval.

## Decisions

Hadi approved the direction and implementation on 6 November 2026 with “Go ahead with everything!” after explicitly authorizing mission-aligned initiative. Implementation is tracked separately in [the experience task](2026-11-06-human-centered-experience.md). The charter remains unchanged. Proposed experience changes must make careful judgment understandable and support useful conversations, not imply established services.

## Verification

- Entry: clean main at `cde7631`; current source tree remains unchanged. Only proposal/task/register documents were added or edited.
- [Proposal](../design/2026-11-06-human-centered-proposal.md) records exact browser/source coverage and its limits. Desktop Home was visually inspected at 1280 x 800. Live rendered content, headings, links and overflow were inspected for all major routes and all five Work details at 1280 and 390 px. Farm water-reservation selection changed its exact URL state and result as expected.
- Snapshot calls subsequently timed out, including a second preview tab. CUA fallback reported its browser host unavailable. Recovered visual review using locally installed Playwright and the installed Brave browser in an isolated headless session: 28 font-loaded renders at 1440 and 390 px across the six primary pages, all five Work details and signal/farm/factory experiences. Inspected full-page contact sheets and larger Home/Work/Contact mobile crops. Both owned preview tabs and the isolated browser were closed. No server was started. This establishes visual audit coverage at those sizes, not a full accessibility or device certification.
- Initial `pnpm check` failed to launch because Node/npm/Corepack/pnpm were absent from PATH. Downloaded official Node 24.22.1 into ignored `.local/review`, verified SHA-256 against official SHASUMS, and installed exact pnpm 11.28.9 locally. No global settings or dependency pins changed.
- Frozen install passed. With the local pinned tools on PATH, `sh scripts/check_deployment.sh` passed: foundation/type/tests/build/public-output/search checks, zero diagnostics in 81 Astro files, 67 Node tests and 104 Python tests. The ignored build output was regenerated; no public sources changed. Log is local disposable `.local/review/check.log`; this record retains the meaningful outcome.
- `python3 scripts/check_foundation.py` and `git diff --check` passed after the proposal was written. Read-only content and interaction reviews informed the proposal; a third read-only final review confirmed A–F coverage and mission/model boundaries and identified the missing explicit WCAG 2.2 AA target, now added. No real visitor research, assistive-technology listening, field performance, search-account evaluation or inquiry receipt test was conducted.

## Handoff

- Checkpoint: local proposal covers diagnosis, five visitor perspectives, journeys, page recommendations, exact copy, interaction concepts, P0/P1/P2 implementation gates and a five-person comprehension protocol. Website and canonical policies unchanged.
- Remaining work: none for preparing the proposal. Hadi's direction decision and the planned real-reader/accessibility validation precede future implementation decisions; no human study is claimed.
- Next action: implement the approved direction in the linked experience task.
- Blockers: none for the proposal. Shared-preview screenshot failure was worked around with an isolated installed browser.
- Acceptance basis: Hadi's review/planning request and explicit mission alignment. The subsequent explicit approval accepts the direction and authorizes implementation; no visitor outcomes are inferred.
- Publication: local documents on `hadi/human-centered-review`; no commits, pushes, PR, merge or deployment. Proposal publication now accompanies the approved implementation task.
- Last verified: 2026-11-06 Europe/Paris, unchanged website source baseline `cde7631`, full local gate passed and documentation checks above. Desktop/mobile visual audit completed at 1440/390 px; remaining accessibility and real-reader coverage is explicitly unperformed.
