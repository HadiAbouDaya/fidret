# Human-centered discovery and engineering experience

- Status: active
- Human owner: Hadi Abou Daya
- Agent or harness: Codex in T3 Code
- Branch: hadi/lab-browser-regressions
- Updated: 2026-11-06
- Verification status: partial
- Issue: https://github.com/HadiAbouDaya/fidret/issues/52

## Purpose

Implement the approved [human-centered proposal](../design/2026-11-06-human-centered-proposal.md), serving [Trust earned](../foundation/charter.md) through recognizable problems, inspectable judgment and an honest conversation route.

## Session duration

Hadi explicitly expanded the task to an eight-hour continuous improvement session, allowing mission-aligned work beyond the original scope. Start: 2026-11-05 23:16:59 UTC (6 November 00:16:59 Paris). Planned end: 2026-11-06 07:16:59 UTC (08:16:59 Paris). Continue useful verified increments until that deadline, unless redirected. Do not manufacture features, human research or verification to fill the session.

## Scope

P0 clarity across company and Work pages; P1 narrative hierarchy, source-backed previews and mobile discovery; practical P2 refinement of existing Lab explanations and native interactions. Preserve architecture, routes, scope, credits and precise methods. Prepare real-reader materials without inventing participants or findings.

## Execution boundaries

- Authorized scope: Hadi approved the full direction with “Go ahead with everything!” and authorized worthwhile mission-aligned initiative. Includes implementation, checks and normal branch/PR/merge publication through the existing workflow. No outreach, account changes, new paid service or physical actuation.
- Worktree: root existing checkout, clean website base cde7631; prior local review documents preserved. Isolated editing delegate worktree managed by T3.
- Dependencies: decisions 0013 and 0015; canonical design/search skills; published models; actual Hadi contact destination.
- Coordination: root integrates and owns all company/Work pages, work catalogue/previews, visitor.css, design/validation/architecture documents, task/register and release. Lab delegate exclusively owns LabExperience.astro, SignalWalkthrough.astro, AgenticBoundary.astro, signal exploration page, lab-journeys.ts, presentation labels in lab-workspaces.ts, related exploration/Lab CSS and directly affected tests. No model-policy changes or runtime expansion. Delegate commits its isolated changes; root reviews and integrates.

## Plan

1. Record approval, preserve audit and establish coordinated implementation ownership.
2. Implement plain-language discovery and question-led Work with meaningful mobile previews.
3. Refine existing Lab invitations and interactions, keeping validated logic and useful fallback.
4. Align design guidance and prepare a ready-to-run five-person test protocol.
5. Run full checks, inspect desktop/mobile/enlarged/keyboard/fallback states, independently review and publish through PR workflow.

## Acceptance criteria

- Company identity, relevance, actual contribution, scope and next step are available without technical documentation.
- All five Work entries and direct links preserve precise evidence and published-parent lifecycle.
- Home includes meaningful visual explanation on phones; no fictional telemetry or unvalidated allocation control.
- Existing interfaces expose plain-language questions and keyboard/no-JS equivalents without new JS routes or dependencies.
- Applicable WCAG 2.2 AA review, with actual coverage and limitations recorded separately from automated checks.
- Full local gate and required exact-head checks pass before merge; publication and deployment evidence are separate.
- No fabricated real-reader results; human validation materials are actionable and clearly pending.

## Decisions

Approved discovery direction extends the existing visitor-outcomes convention without changing company purpose or practice. Practical refinements can proceed under approval; future interaction expansion remains dependent on actual reader evidence. No new AI functionality or service offer is claimed.

## Verification

Baseline source cde7631: previous full gate passed with zero diagnostics, 67 Node tests and 104 Python tests. Current dependency lock unchanged. Integrated and review-fix gates passed; see the dated verification below. Previous audit covered 28 live desktop/mobile renders; new work requires its own render checks.

### First discovery checkpoint

Implemented plain company identity, question-led Work data and headings, short scope statements, project-specific actions, source-derived sensor/version previews and meaningful phone previews. Home now connects problems, current work, potential collaboration and Hadi. Approach has an accessible native detail section; Contact needs no prepared brief. About leads with company/person context. Sharing images were regenerated and visually inspected. Design guidance, architecture map and five-person validation protocol are synchronized.

The first root full deployment gate passed (zero diagnostics, 67 Node tests, 104 Python tests). An immediately subsequent heading-hierarchy correction and forthcoming Lab integration will receive combined verification. Inspected 22 local main/Work renders at 1440 and 390 px. Shared preview snapshot failed twice with its timeout error; isolated installed Brave/Playwright provided renders. Social preview images inspected. Remaining work includes narrower widths, enlarged text, keyboard/fallback/print and independent review.

### Integrated verification checkpoint

Discovery and Lab changes are committed in 79f589b and 14e311f. The integrated and review-fix deployment gates passed. Independent source review found three small issues, now addressed: condition-specific static headings, mismatched action legend and duplicated contact-note source. Existing tests now cover preview/source agreement and Home withdrawal. Browser review passed 128 default/enlarged layouts, 32 text-spacing layouts, 32 axe scans and all 69 exact model states. Keyboard, no-JavaScript, missing-module, reduced-motion/forced-color and printed-content checks are recorded with their limits in the [implementation verification](../design/2026-11-06-human-centered-verification.md).

Printing revealed excessive fragmentation in the existing workspaces. Scoped print rules preserve all five situations and assumptions in six A4 pages instead of eleven and expose the final limits. No model policy or runtime change was needed. Hadi's approved eight-hour session remains active after this first useful increment.

GitHub's current main protection was read on 6 November: foundation, runtime-bootstrap and seo-geo required from GitHub Actions, strict up-to-date branches, administrator enforcement, no force pushes and no assumed second approver. This is host-state evidence; the new branch's checks still need to execute.

### Second increment: explanation at the point of interaction

The second branch began from ee1ae96 while first-increment PR 53 completed its required runs. This increment addresses three source/render findings from the independent experience review: technical response labels in the Lab, technical comparison labels on the sensor Work page, and the suggested experiment appearing after the result and illustration.

Root owns WorkEvidence.astro, LabExperience.astro, lab-workspaces.ts presentation prompts, workspace.css, related integration tests and this record. A new isolated delegate exclusively owns presentation labels and reason strings in autonomous-farm.ts and software-factory.ts, plus directly affected model tests if needed. It may not change facts, decision codes, conditions, priority, scenario data or model coverage. Root integrates and compares the existing 69 states before publication. No new runtime behavior or dependency is planned.

The second increment now includes d509966 (source-derived suggested conditions and the plain sensor comparison) and b59824b (integrated delegate response strings, originally 33710ab). The combined deployment gate passed before the subsequently discovered wordmark fix. A before/after comparison of all 69 states confirms identical facts, decision codes, priority traces, values, reason counts, controls and URL keys; only labels and explanation text differ.

Firefox 159 verification broadened the browser evidence: 64 default/enlarged layouts and native keyboard, no-JavaScript and print-media disclosure checks passed their automated assertions. Visual inspection nevertheless found that Firefox wrapped the last letter of both wordmarks, which document-overflow assertions missed. A scoped no-wrap rule keeps this short brand unit intact at 320, 390 and 1440 px with default, doubled and restored text. Root additionally owns styles.css for this correction. The source-built correction passed subsequent checks. The final gate passed with zero diagnostics, 67 Node tests and 104 Python tests. Separate Chromium and Firefox matrices each covered 56 affected-route layouts; 14 Chromium axe scans found no violations. All 69 browser state results matched the manifest, and the three affected print documents were visually inspected. See the linked verification record for coverage and limits. These are rendering findings, not human comprehension evidence.

### First release verified

[PR 53](https://github.com/HadiAbouDaya/fidret/pull/53) merged as 87f8e6344f800c0596f6d0372365588c2df47b9f after the exact ee1ae96 head passed all three required GitHub checks and no unresolved review feedback remained. The live shared browser then verified HTTP 200 and exact body/title/canonical/stylesheet agreement with the preserved verified build on all 11 main and Work-detail routes. The live 390 px Work render was inspected. No Cloudflare dashboard deployment ID was available because the dashboard required sign-in. The task records observed live output separately from that unverified dashboard state.

### Third increment: reaching the work sooner

Work continues from PR 54's cdc0e6f checkpoint on `hadi/discovery-flow` while required checks run. The live 390 px Work render showed the first project heading approximately 640 px from the top, after two introduction paragraphs and accumulated hero/collection spacing. The first paragraph repeats the questions immediately presented in the gallery. Root owns the Work introduction, scoped visitor styles and this record; a separate agent performs read-only journey review. The aim is a shorter path to a concrete project, retaining readable spacing, the collection's own-work scope and each project's limitations. This is an expert observation, not measured reader comprehension. Verify actual before/after composition, narrow/enlarged layouts, navigation, print and the shared gate before publishing a separate increment.

The read-only review identified three related copy refinements. Root also owns the five Work invitation strings, Home's agent-topic link label and the Lab index's signal feature sentence. Work invitations ask for one recognizable situation instead of a multi-part technical brief; Home's label accurately describes its overview destination; the Lab entry explains the freshness rule before naming it technically. No contact destination, evidence claim, deeper methodology or publication dependency changes.

The third increment passed the full gate with zero diagnostics, 67 Node tests and 104 Python tests. The 390 px gallery's first project heading moved from 634 to 422 CSS pixels from the page top. Across both Chromium and Firefox, 68 default/enlarged layouts passed; six axe scans found no violations; keyboard discovery-to-contact paths and the printed gallery were checked. These establish implementation and rendering, not improved human comprehension. The verification record retains exact coverage and limitations.

Meanwhile PR 54 merged as c2784fa7cfd50542562b77e817e23cbca923c7a2 after all three required checks passed on exact head cdc0e6fecae96821d577ffdee04793d880b2b910 with no unresolved reviews. Early live checks still served the first release, so second-increment publication remains unverified.

The subsequent 00:18 UTC live check verified the second release on 15 canonical routes. Metadata/styles matched preserved output on all routes; bodies matched on 11 static pages; model/prompt data and scenario text matched on the four enhanced pages. Both live exact-condition examples retained expected responses and share state. The third increment is published in PR 55 and awaits its own required checks.

### Fourth increment: preserve reading when enhancement arrives

Work continues from ff2227e on `hadi/lab-loading-continuity`. A delayed-module browser reproduction confirmed that opening the second farm explanation before the controller arrives causes initialization to hide that scene, move focus from its summary to the document body and change the scroll position. The starting HTML is useful, but enhancement must not erase a visitor's progress. A read-only source review also identified empty-fragment Back navigation and the lack of a clear starting-example statement in shared-link fallback as targeted checks.

Root owns the bounded controller, LabExperience.astro, directly related workspace CSS/tests, architecture/craft guidance if affected, and this task. The fix must preserve an active reader's focus/open explanation and context, keep ordinary first-entry and exact-condition links working, and make fallback conditions explicit. No model policy, route, dependency, network/storage behavior or runtime budget expansion is authorized by this correction. Verify the delayed handover in available browser engines, empty-hash Back/Forward, exact sharing, disabled/failed modules, print restoration and the full gate. A separate WebKit installation is isolated review tooling, not a project dependency.

The correction now preserves active reading, repairs both attribute-hidden and CSS-hidden focus, and explains starting-condition fallback. Chromium, Firefox 159 and WebKit 27.2 passed 48 delayed-handover cases, 12 normal/delayed exact-link cases, 18 fallback cases, history/focus checks on both workspaces, all 207 model-state comparisons and six reference/reset round trips. Both printed workspaces were inspected with screen state restored. Additional WebKit coverage passed 64 layouts plus native/no-JavaScript checks. An independent source review prompted the reproduced CSS-hidden focus correction; its separate native-anchor concern was not reproduced in the three bounded browser checks. The final shared gate passed with zero diagnostics, 67 Node tests and 104 Python tests. The controller stays within its existing 16 KB source limit and six-route boundary.

A subsequent read-all/fallback axe scan exposed duplicate result-region names that single-situation scans had missed. The result's accessible name now includes its situation heading as well as its response. This best-practice finding is separate from screen-reader listening. All four affected scans then passed, the phone states were inspected, and the final shared gate passed again for this semantic correction.

PR 55 merged as 8bb8984d3d1fdf6b7089a2534ae5e8267808ebd1 after required checks passed on exact head ff2227e8f93ad9164da3aff522a25e9f001b61b8 with no unresolved reviews. Its live output subsequently matched the preserved third build on the same 15-route comparison used for PR 54. All three completed increments are now merged and verified live.

### Fifth increment: assistive reading review

PR 56 merged as 141fad61868f6d0f17eb0dc213471e30f533cc98 at 00:58 UTC after the exact aa9aff75c83f09a4bbcb6dd5e2ee625a9c055cae head passed foundation, runtime-bootstrap and seo-geo with no review threads. The subsequent 01:06 UTC comparison verified its live output on 15 routes and empty-fragment Back behavior in both workspaces.

Root now owns an isolated Linux assistive-technology check and this task/verification record on `hadi/assistive-reading-review`. Review tooling uses a private display, D-Bus accessibility session, temporary browser profile, task-specific XDG directories and explicitly isolated silent speech output. It does not install project dependencies or change the user's desktop settings. A read-only agent researches the installed speech configuration. Inspect actual Orca-generated utterances for discovery, native details, Lab controls, result changes and history/focus. Record log inspection separately from actual listening and participant feedback. Change public source only for a reproduced finding, keeping the existing design/search/runtime boundaries. No screen-reader result is established by setup feasibility.

The private Orca/Firefox comparison reproduced dropped result/reset announcements and misleading “clickable” situation headings. An explicit polite atomic region delivered the same messages in the tested changed-condition/reset cases. Binding click handlers to their actual links/buttons removed the false heading action. Topic/situation count changes also reached Orca with explicit polite regions. Root additionally owns LabExperience.astro, ScenarioLibrary.astro, the two engineering-note templates and lab-experience.js for this bounded correction. Preserve content, models, history, visible layout and runtime limits; verify all six enhanced routes, keyboard/fallback behavior and the full gate. This is generated-utterance evidence, not listening or human usability feedback.

The fifth correction passed the full shared gate, an independent source review and targeted three-engine navigation/filter/fallback checks. The final native-input Orca comparison inspected 18 expected announcements across six Lab routes: all appeared with the correction, versus none in the compared baseline. Both workspace headings lost the false “clickable” announcement. Generated text output is recorded separately from listening and human usability feedback. The detailed verification retains setup/backend limitations and excludes unreliable early harness trials.

### Sixth increment: continuity through discovery

PR 57 merged as 3a57348acab5a3f287e41bb0e6e75504a0540e0d at 01:24 UTC after foundation, runtime-bootstrap and seo-geo passed on exact head 46cc284b8733cf60c65c84ab26ce05c9e2953140. No comments, reviews or review threads remained. The subsequent live check verified expected metadata/styles/controller identity on 17 routes, exact static bodies on 11 discovery routes, unchanged model/scenario data and explicit polite atomic announcement regions on all six enhanced routes.

A fresh read-only journey review identified two concrete handoff gaps: the agent planning brief ends with team preparation but lacks a local low-pressure conversation invitation; the final workspace action says “Explore the full design” while opening a next-step hub. Root owns the brief's final invitation, its narrowly scoped print/screen spacing, LabExperience.astro's final action label and this task. Preserve the resource, claims, download, routes and existing completion/history behavior. Verify rendered phone/desktop placement and keyboard flow.

A separate local constrained-browser check found larger initial layout shifts on the farm workspace than on the three sampled discovery pages. The read-only source/browser review isolated two causes: font loading adds a 44 px metadata row at 390 px, and enhancement replaces the taller native navigation and starting-context note with a compact picker. A deliberate phone metadata grid is the next bounded candidate; larger native/enhanced parity changes need separate justification. This is a cold-cache browser experiment with explicit network/CPU emulation, not field Core Web Vitals or actual mobile-network evidence. No performance source change is justified by the measurement alone.

### Seventh increment: stable phone workspace heading

Root continues from PR 58's `7fa766c` checkpoint on `hadi/stable-workspace-heading` before that PR merged. PR 58 subsequently merged as `4b575e56f5bcbeaa206331d9f59a48d259672027` at 01:44 UTC after all three required checks passed on exact head `7fa766c8173caaadddfc72ff7212d15b1a28afcd`, with no comments, reviews or review threads. The measured font swap changes the phone metadata from one row of credit/links to two. Root owns `workspace.css`, related evidence/guidance if justified and this record. Replace accidental wrapping with an explicit phone composition: credit, reference links in columns when space permits, scope and dates. Keep the font, source order, accessible link targets, content and desktop layout. A rendered 320 px/doubled-text check also showed “Autonomous” splitting mid-word; a screen-only title size below 375 px preserves a whole word while retaining text scaling. An independent candidate review caught mid-word link wrapping at 320 px with doubled text; use rem-based minimum tracks so enlarged labels can stack. Verify loaded/delayed/failed fonts, 320–700 px boundaries, enlarged text, keyboard order, reduced motion, fallback and print. Measure the same constrained-loading conditions before claiming a reduction. Printing immediately after keyboard navigation also exposed a retained focus outline on the metadata link; suppress workspace focus outlines only in print, retaining screen focus. The separate native-to-enhanced composition change remains an explicit limitation, not a reason to hide readable content.

### Eighth increment: durable reading and navigation regressions

Root continues from PR 59's `5884599` checkpoint on `hadi/lab-browser-regressions`. The reproduced delayed-module, empty-fragment history and hidden-focus failures need repeatable browser checks, beyond the existing model/parser/build contracts. A read-only feasibility review recommends one pinned development-only Playwright dependency and Node's existing test runner, with focused Chromium cases under `tests/browser/` outside the current unit-test glob. A separate command builds current output and tests an ephemeral loopback server. Add browser installation/execution after the existing gate in the required `foundation` CI job; keep `scripts/check_deployment.sh` and Cloudflare builds browser-free. No visitor runtime, account permission or branch-protection change is planned.

Root owns package/lockfile, CI, README, system map, maintenance/operating guidance and task/verification records. One isolated implementation delegate will exclusively own `tests/browser/` and its helper. Root integrates and independently verifies the tests, including a temporary known-bad controller to establish that important regressions are detected. Keep tests event-driven, local-only and bounded, release held requests in cleanup, preserve read-only CI permissions and inspect cold-run duration before changing its timeout. Do not claim browser tests replace visual, assistive-technology or real-visitor review.

The npm registry dated Playwright 1.65.0 to 5 November 18:28 UTC, inside the settling window. Select 1.64.1, published 14 October, whose official patch notes fix routing and Electron regressions. Its Node requirement is compatible with the pinned project runtime. Registry integrity agreed with the lockfile; frozen installation passed after the add completed; the dated advisory response reported zero advisories. No settling-policy exclusion was used. The development tooling checkpoint is ca05a36. Root CI/documentation preparation is ded1f41; the isolated test implementation completed as c7dec35 and is integrated as aef147c. A scoped source review found no concrete CI/package objection and clarified that normal production dependency installation can include the driver package, while browser binary installation/execution remains outside that build. The installed matching Chromium headless shell launched as 156.0.8078.4.

While the test delegate works, root is measuring a local response-only module-preload candidate against preserved seventh output. Twenty alternating baseline/candidate navigations showed no useful improvement, so no preload source change was adopted. The verification record retains the conditions and results.

## Handoff

- Checkpoint: seven increments merged and verified live. Eighth package/CI preparation is committed in ca05a36 and ded1f41; isolated test source c7dec35 is integrated as aef147c. Root browser and negative-fixture checks passed. The reviewed CRLF helper correction and final combined verification passed; all 63 public build files match the seventh release byte for byte.
- Remaining work: finish verification and publish/merge the eighth increment; continue useful mission-aligned improvements within the authorized eight-hour session. Human reader testing remains pending, with its protocol prepared.
- Next action: publish the eighth increment, inspect the first cold CI browser run and merge after exact-head checks/reviews. Continue useful work within the eight-hour session. Listening and human reader testing remain unperformed.
- Blockers: none for implementation. Human participant recruitment and screen-reader listening cannot be represented by agent review.
- Acceptance basis: Hadi's explicit approval and standing publication authorization.
- Publication: first increment merged through PR 53 as 87f8e63 and verified live on 11 routes. Second increment merged through [PR 54](https://github.com/HadiAbouDaya/fidret/pull/54) as c2784fa and verified live on 15 routes. Third increment merged through [PR 55](https://github.com/HadiAbouDaya/fidret/pull/55) as 8bb8984 and verified live on 15 routes. Fourth correction merged through [PR 56](https://github.com/HadiAbouDaya/fidret/pull/56) as 141fad6 and its live output is verified on 15 routes. Fifth source correction 22c358d is pushed on `hadi/assistive-reading-review` with [PR 57](https://github.com/HadiAbouDaya/fidret/pull/57). PR 57 merged as 3a57348 after required checks; fifth live publication is verified on 17 routes. Sixth source commit 2d20fae is pushed on `hadi/discovery-continuity` with [PR 58](https://github.com/HadiAbouDaya/fidret/pull/58), merged as 4b575e5 after required checks. Sixth live output is verified on 18 routes. Seventh source commit 96315a0 is pushed on `hadi/stable-workspace-heading` with [PR 59](https://github.com/HadiAbouDaya/fidret/pull/59), merged as 4c932c02bdd675882f712eed094c7308b40f540d at 02:01:54 UTC after all required checks passed on exact head 5884599f8b5f4e5b77cdbbd924abeb43d8214ac9 with no unresolved review feedback. Seventh live output is verified on both changed workspaces at an actual 390 px viewport. [Issue 52](https://github.com/HadiAbouDaya/fidret/issues/52) remains active for the session.
- Last verified: 2026-11-06, eighth-increment shared gate (zero diagnostics, 67 Node tests, 104 Python tests), 20 browser cases, independent known-bad history/focus fixtures, CRLF policy probe, source reviews and exact parity of all 63 public files. Seventh-increment exact-head required checks, review state and both affected live workspaces passed separately. See the linked verification record for coverage and limits.
