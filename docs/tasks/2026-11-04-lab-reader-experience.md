# Guided Lab reading experience

- Status: done
- Human owner: Hadi Abou Daya
- Agent or harness: Codex in T3 Code
- Branch: hadi/lab-reader-experience
- Updated: 2026-11-04
- Verification status: passed

## Purpose

Hadi finds the two latest Labs difficult to traverse and too text-heavy. He requested research, careful planning, a complete interactive reading experience and user-perspective optimization. Improve first-time understanding and expert lookup for the autonomous-farm and AI software-factory Labs while preserving their evidence and limits.

## Scope

[Issue 37](https://github.com/HadiAbouDaya/fidret/issues/37) tracks this work. Short guided missions at the existing article URLs, contextual visual consequences, specific decisions and counterfactuals, shareable scenes, a self-directed scenario library and structured engineering notes. Preserve canonical prose, dates, bylines, existing farm reference URLs and all downloads. Replace duplicated introductions and long catalogs as the novice entry. No actual farm, customer, agent service or equipment connection.

## Execution boundaries

- Authorized scope: Hadi delegates research, design and implementation. Standing branch/merge authorization and the existing task's publication intent cover the normal release workflow. No account, infrastructure, permission or physical-system changes.
- Worktree: existing clean task checkout on hadi/lab-reader-experience; historical worktrees remain untouched.
- Dependencies: accepted Astro static publishing and design language. The bounded progressive-enhancement decision is recorded separately; do not silently remove static/security checks.
- Coordination: root owns all edits and integration. Three read-only agents cover UX research, reader/content traversal and architecture. They do not edit or spawn agents.

## Plan

1. Read source and rendered baselines; research primary UX, learning and accessibility guidance. Identify visitor tasks and compare design alternatives.
2. Create one reusable progressive-enhancement controller with Lab-specific five-decision stories and visual state, explicit navigation and contextual depth. Keep a complete static fallback.
3. Give engineers and returning readers meaningful topic navigation and direct links, plus searchable scenario/reference collections.
4. Review first-minute entry, causal feedback, mobile/enlarged layouts, keyboard/history/focus, no-JS/failed-script behavior and print. Test new security and withdrawal boundaries.
5. Run shared checks, publish and merge under standing authorization, then verify production behavior and source parity.

## Design plan

Retain forest #153E35, ivory #F6F2E9, charcoal #242A27, sage #D9E3DA and copper #A4543B. Use Manrope for controls and reading, without decorative headline fragments. One event and its causal diagram form the focal region; navigation and technical references stay quiet.

A generic carousel would hide the system and add clicks without meaning. Instead the farm shows the link between cloud proposal, local authority and equipment/care. The factory keeps the relationship between a candidate and its evidence visible. A decision changes that artifact and supplies a short explanation. An optional counterfactual changes one defined condition using the existing model. No invented live telemetry, farm physiology or learning score.

Layout: compact title and scope, meaningful progress links, current scene with evidence/decision beside a responsive diagram, immediate local consequence, then Back/Continue. Mobile keeps the decision near its evidence, without a large map preamble. Experts can bypass the mission. All scenes and technical content remain directly reachable and printable.

## Acceptance criteria

- Each original article opens with a clear subject and a meaningful action before a long essay/catalog. A novice never has to choose a domain first.
- Five guided decisions per Lab use scene-specific alternatives, explain causes and show a model-backed changed condition without grading or locking reference content.
- Back, direct scene links, browser history, restart and read-all behave predictably. Reference navigation preserves a clear return path.
- Full research, authorship, scope, existing farm anchors and exact briefs remain available. Factory notes expose substantive topics, not only generic editorial headings.
- Runtime is small, self-hosted and confined to declared Lab routes. No framework, remote calls, analytics, storage, inline script/handlers, dynamic HTML or server is added.
- No-JS/script failure retains useful content and destinations. Native keyboard semantics, concise live feedback, focus, print, reduced motion and 1440/768/390/320 plus enlarged text work.
- Meaningful model/UI/publication/security tests and full shared checks pass. Real-user comprehension gains are not claimed without an actual study.
- Push, PR, merge and verified production publication remain distinct.

## Decisions

Research favors a guided primary path plus direct technical lookup, with one optional depth layer. [Decision 0013](../decisions/0013-progressive-lab-experiences.md) documents the native runtime and exact security boundary; static Astro hosting remains unchanged. This does not adopt an operational AI/farm architecture.

## Verification

Recovery: clean c8108ac after finishing the previous release-record PR 36. Existing live farm entry contained about 1,336 words and 6,242 px at the inspected desktop viewport; its scenario link appeared near the bottom of the first viewport. Reader audit is a task-based design review, not observed human research. Baseline shared check passed: zero diagnostics, 53 Node tests and 88 Python tests.

The shared preview's image snapshot timed out twice ("Preview automation snapshot timed out after 15000ms"); DOM reads worked. Under the browser fallback rule, use the local browser harness for actual render/behavior tests. Record any limits explicitly.

Review iterations: specific choices/neutral selection, persistent polite feedback, model-backed counterfactual prerequisites, context-preserving note returns, useful search aliases and grouped topics. Removed obsolete native-matrix components/styles instead of retaining two systems. The first browser matrix passed all 240 answer interactions, 80 comparisons, 192 navigation checks and eight fallback cases; it exposed print specificity and enlarged-text grid issues that are being corrected. A full check overlapped a separate generated-output build and failed on a missing prerender chunk; serialized builds and a frozen browser-test copy now isolate output mutation. That failure was a local execution collision, not a reason to weaken a contract.

Final local verification passed: the shared `pnpm check` returned zero diagnostics in 64 checked files, 57 Node tests and 89 Python tests, then built and validated production output. It includes real published/draft fixture builds for both Labs and all companions, runtime hash invalidation/source parity/scope/budget checks, independent teaching-model tests and malicious inline/arbitrary-script/header failures. A final native-disclosure reset refinement received a fresh production build and targeted keyboard/restart/200% checks in both engines. Output/foundation validators and `git diff --check` passed afterward.

The complete Chromium/WebKit matrix at 1440, 768, 390 and 320 px passed: 48 route views, 240 decisions, 80 changed-condition comparisons, 192 explicit/history navigation checks and 10 fallback checks (including a deliberately injected failure after scene hiding). It also exercised contextual reference returns, direct case/scene URLs, read-all/finish/restart, skip-link focus without changing the active scene, persistent status markup, filtered/zero-result printing with restored screen state, 44 px primary targets, reduced motion and enlarged text/clipped-content checks. A separate final keyboard pass covered Enter/Tab, visible focus, comparison labels, reset and enlarged 320 px views for both Labs and engines. No screen-reader listening or actual human comprehension study is claimed.

The module is 12,436 source bytes (approximately 3.2 KB under local gzip), below the enforced 16 KB cap. The farm library is about 46 KB HTML, replacing the preceding 144 KB decision matrix; the two guided entries are about 37 KB each before compression. These are build measurements, not production transfer timing or learning-effect estimates. Exactly one approved raw module is loaded only on the six declared Lab surfaces. No framework, storage, model execution or remote request API is introduced.

[Research and iteration basis](../design/lab-reading-research.md) records primary sources, reader tasks, alternatives and evidence limits. Source-based AI reviews and actual root render checks informed the corrections; they are not independent human usability approval. Original publication metadata and canonical narrative sources/briefs remain; factory prose and lifecycle material are explicitly available in engineering notes, farm reference routes/anchors remain stable, and compatibility links direct old article topics into the reference layer.

## Handoff

- Checkpoint: PR 38 merged at `40532933a3d1049001a49f97f532d08f2cc6c174`; both guided entries and their companions were deployed and verified. The [second workspace iteration](2026-11-05-lab-workspaces.md) records Hadi's subsequent request to go further.
- Remaining work: none for the first iteration. Further interaction/readability improvements belong to the linked follow-up.
- Next action: continue the second iteration from its own task checkpoint; do not replay this merge or deployment.
- Blockers: none. The stopped PR watcher was cleared because the PR had already merged.
- Acceptance basis: Hadi's delegated implementation request and standing verified-work merge/publication authorization. No human comprehension study is asserted.
- Publication: implementation `b4fcd41`, final head `b8f8d65`, PR 38 merged as `4053293`. Main workflow `41928911421` passed; Cloudflare deployment `f07ebfd3-b4c8-4fcd-a4ad-2d69e1ae870f` succeeded on 4 November 2026. This is the first iteration's deployment, not the subsequent workspace release.
- Last verified: 2026-11-05 recovery check. Production matched the exact immutable deployment for 21 routes/assets, with successful status/MIME/CSP and runtime Git-source parity. Live Chromium at 1440/390/320 passed story decisions, comparisons, reference returns, search and both no-JS fallbacks. Real-user comprehension, operational execution and screen-reader listening remain untested.
