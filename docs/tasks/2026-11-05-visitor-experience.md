# Visitor experience and credible project journey

- Status: done
- Human owner: Hadi Abou Daya
- Agent or harness: Codex in T3 Code
- Branch: hadi/visitor-experience-2026-11-05
- Updated: 2026-11-05
- Verification status: passed

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

## Verified release

PR 45 merged as `4e1729891f5f24ba9a53c21f22469d36d2597ff0` after exact head `e3f154e70dbfbfea08eb16f87671c485d96dbd3b` passed `foundation`, `runtime-bootstrap` and `seo-geo` in workflow `42025880734`. Reviews, inline threads and conversation comments were empty. Main workflow `42026364122` passed all three jobs. A fresh branch read confirmed protection enabled for everyone with those three contexts bound to GitHub Actions.

Cloudflare Pages reported a successful deployment for commit `4e17298`: deployment `35e2fda4-7b79-457d-a03c-e8b1c6f79474`, [immutable deployment](https://35e2fda4.fidret.pages.dev). Live `fidret.com` verification through the shared browser found:

- All 28 HTML views returned the expected title, canonical/description/social identity, styles and normalized main content. The explicit `/404.html` resource redirects to `/404`; an internal source request at `/AGENTS.md` returns an actual 404 with noindex.
- All ten fingerprinted CSS/JS assets and four text/compatibility resources (robots, AI directory and legacy CSS aliases) returned 200 and matched the local build bytes. All five new sharing PNGs returned 200 with the expected 1200 by 630 dimensions and matching decoded pixels.
- The 27 sitemap URLs exactly matched the canonical HTML set. The browser's enforced CSP matched the source policy; an expected blocked connection exposed the actual policy without weakening it.
- Ten principal routes at 1440/390/320 px and normal/200% text passed another 60 live layout checks. The factory's changed evidence/authority state `evidence~v1-101` survived a real engineering-notes return with reasoning open. The live Contact action opened Hadi's actual contact page and its form was present; no message was sent.

The verifier initially counted SVG title elements as head titles and initially encoded the raw browser text-document view without reversing its reported Windows-1252 decoding. Both verifier errors were corrected, then strict metadata and byte comparisons passed. These were verification-tool assumptions, not deployed content or runtime changes.

## Handoff

- Checkpoint: the complete website revision and guidance are merged, deployed and live-verified. The implementation is complete within Hadi's authorization.
- Remaining work: none for the website revision. This documentation-only branch publishes the verified release record. Real visitor outcomes remain a separate ongoing measurement.
- Next action: merge the release-record PR after its required checks pass. Use the reader/inquiry validation plan with actual visitors; future website revisions belong to a new task rather than replaying PR 45.
- Blockers: none for implementation. Actual prospect outcomes need future real visitors; no claims will be invented.
- Acceptance basis: Hadi's explicit end-to-end implementation request, supplied contact/profile direction and standing verified-work publication/merge authorization. This does not claim his visual approval, Elie's review or measured prospect conversion.
- Publication: review `01c208a`, implementation `aa4ebaa` and PR handoff `e3f154e` were pushed in PR 45 and merged as `4e17298`. Cloudflare deployment `35e2fda4-7b79-457d-a03c-e8b1c6f79474` succeeded and the actual production checks above passed. The `hadi/visitor-release-record` branch changes only these internal release records.
- Last verified: 2026-11-05, exact-head and main workflows, current host protection, successful Pages release and actual production metadata/content/assets/layout/interaction/contact checks above. Real-reader outcomes, field Core Web Vitals, second-engine behavior and screen-reader speech remain unmeasured.
