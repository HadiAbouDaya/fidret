# Visitor experience and credible project journey

- Status: active
- Human owner: Hadi Abou Daya
- Agent or harness: Codex in T3 Code
- Branch: hadi/visitor-experience-2026-11-05
- Updated: 2026-11-05
- Verification status: partial

## Purpose

Implement the [visitor review](../design/2026-11-05-visitor-review.md) so prospective collaborators can understand relevant work, assess actual contributions and people, and take a real next step. [Issue 44](https://github.com/HadiAbouDaya/fidret/issues/44) tracks the work. Hadi explicitly requested the complete plan and implementation across all areas after the review, including design guidance. The site must serve this purpose without announcing its commercial objective.

## Scope

Home, curated work summaries and a working publishing-system case, Approach, About, Hadi's profile, Contact, Lab entry/deep-link summaries, shared navigation, work-specific previews, search discovery and design guidance. Include responsive/accessibility/performance verification and production release. Preserve Physical AI as first practice and existing Lab evidence boundaries. No new commercial delivery history, prices, client claims, analytics service, account configuration or physical equipment.

## Execution boundaries

- Authorized scope: Hadi's explicit end-to-end implementation request supersedes the earlier review-only restriction for this new task. Existing standing PR/merge authorization applies. Publishing and verifying this website revision is within the requested end-to-end work; no account or domain changes.
- Worktree: existing `fidret` checkout, task branch based on `ba38bc1` plus review commit `01c208a`. Other checkouts remain untouched.
- Dependencies: Hadi supplied `https://hadi.aboudaya.com/contact/` as the current personal contact destination and requested featuring only Hadi for now. Centralize the destination for future replacement. Preserve existing credits and URLs; do not invent Elie's biography.
- Coordination: root is sole editing/integration owner. Read-only content and technical reviewers provided recommendations. Further review is read-only. No parallel edits.

## Plan

1. Record visitor questions, page contracts, content/evidence map and measurable acceptance conditions.
2. Create a curated Work journey and summaries of actual contribution, including the implemented publishing system behind this site. Reorder Home, clarify Approach/About/Hadi and add the approved contact route.
3. Keep deep links independently understandable, preserve publication withdrawal, add work-specific social previews and synchronize metadata/discovery.
4. Update design brief/skill with visitor outcomes, page contracts, work presentation and a verification matrix. Preserve architecture, identity and evidence rules.
5. Run shared checks, independent source critique, shared-browser responsive/keyboard/fallback/interaction QA and stated performance measurements. Address findings before publication.
6. Publish a protected PR, verify exact-head checks/reviews, merge and verify actual production. Leave a usable human-reader test and inquiry-quality baseline for outcomes that require real visitors.

## Acceptance criteria

- A first-time reader can reach selected work immediately from Home, understand the question, contribution, evidence level and limit, then reach Hadi's actual contact destination.
- Existing Lab work is accurately described as an experiment, architecture exploration or educational interface. The actual publishing system supplies implemented end-to-end evidence without implying client delivery.
- Individual work/deep links supply project context without requiring a complete model exercise. Lab-linked work summaries and discovery withdraw with their parent.
- Hadi's public profile is grounded in credited work. Existing contributor credits remain intact; no invented professional biography.
- Company, related software work and the first Physical AI practice are coherently connected. Collaboration describes a bounded starting process without fictional offers or guarantees.
- Main navigation, metadata, sitemap, social previews and optional AI directory reflect the new routes; security and runtime constraints remain intact.
- Responsive layouts, text enlargement, keyboard paths, model response order, fallback and representative state/reference round trips are verified and limits recorded. Performance observations identify environment and distinguish laboratory from field evidence.
- Shared checks and exact-head required CI pass, unresolved review feedback is addressed, and the actual production content/contact/assets are verified.
- Updated guidance and a practical reader/inquiry test make further improvement transferable. No claim of 100% conversion, partnership or human comprehension is inferred from implementation checks.

## Decisions

[Visitor outcomes and work evidence](../decisions/0015-visitor-outcomes.md) records the implementation convention. The audience hypothesis is teams evaluating a concrete AI-enabled workflow/system and the technical reviewers assessing it. This does not select a new industry or establish a broad service catalogue.

## Verification

First integrated `pnpm check` passed: zero diagnostics in 79 files, 63 Node tests, production build, output/SEO checks and 100 Python tests. Skill validation passed. Publication-withdrawal tests now include curated work routes and discovery. Source-only independent content and technical reviews found no blocking misleading claim or integration defect; their small findings were addressed.

Hadi's supplied contact destination opened in the shared browser, with an actual contact interface and direct options visible. No inquiry was sent. His public About page supported the concise AI consultant/software engineer background in `src/lib/people.ts`; personal experience is kept separate from Fidret delivery history.

Farm/factory summaries now describe editable condition models. Their publication/research dates remain 4 November; actual summary revision dates are 5 November. No claim of renewed research is made.

The [verification record](../design/2026-11-05-visitor-verification.md) captures the completed local work: all 28 HTML pages at four widths and normal/200% text (224 combinations), all 69 model states across that matrix (552 checks), native keyboard/selection/reference/reset behavior, production-header/absent-runtime fallback, social assets and explicit performance/assistive/human-research limits. Final local shared checks passed after correcting the render findings. No real-reader or commercial outcome is inferred.

## Handoff

- Checkpoint: the full local revision, guidance, reader-validation plan and verification record are complete. Shared checks and independent source/skill review passed; rendered issues were fixed and rechecked.
- Remaining work: publish the PR, confirm exact-head required checks/reviews, merge and verify actual production. Real visitor outcomes remain a separate ongoing measurement.
- Next action: commit/push the verified revision and create the protected PR, then complete the release when its current checks permit it.
- Blockers: none for implementation. Actual prospect outcomes need future real visitors; no claims will be invented.
- Acceptance basis: Hadi's explicit implementation request and contact/profile direction in this conversation.
- Publication: local implementation and documentation only; no implementation commit, push, PR, merge or deployment yet. Review commit `01c208a` is included in the branch.
- Last verified: 2026-11-05, final local shared check, skill validation, source reviews and shared-Chromium evidence in the verification record. Production has not yet been verified for this revision.
