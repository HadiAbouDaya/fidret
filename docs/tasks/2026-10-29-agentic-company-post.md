# Agentic-company article and onsite knowledge pages

- Status: done
- Human owner: Hadi Abou Daya
- Agent or harness: Codex with coordinated research and implementation agents
- Branch: hadi/agentic-publication; closing record on hadi/agentic-handoff
- Updated: 2026-10-29
- Verification status: passed

## Purpose

Hadi requests current research on harness engineering and preparing a company to operate securely with agents, presented as an interesting Fidret Lab post with strong explanatory design. He explicitly chose **Hadi Abou Daya** as the byline. He also requests well-designed onsite counterparts for the GitHub destinations removed in PR 20. Serve the [charter](../foundation/charter.md) through clear explanations, primary-source evidence and honest limits.

## Scope

- Research current primary engineering/security sources with publication and retrieval dates; distinguish documented mechanisms, recommendations and untested proposals.
- Write and publish a substantive, readable Lab article credited to Hadi, with original figures and useful native interactive components.
- Build public project/charter/contributor pages, a readable sensor experiment method/replay page, and article sources/publication notes. Restore the relevant actions using onsite destinations, with no outbound GitHub anchors.
- Preserve static Astro, external fingerprinted CSS, zero browser JavaScript, strict CSP, source/draft separation and Free hosting. No company-security assessment, compliance certification or validated hardware claim is implied.

## Execution boundaries

- Authorized scope: Hadi's three follow-up requests authorize the post, its byline and the onsite equivalents; existing publishing/merge/deployment authorization applies. No account changes, paid services, actual company tool access, equipment action or messages to people.
- Worktree: `fidret-design`, new branch above from main `152dacf`; other worktrees preserved.
- Dependencies: [design language](../design/fidret-design-brief.md), [Lab workflow](../../lab/README.md), [synthetic prototype](../../experiments/sensor_freshness/README.md), completed GitHub removal [PR 20](https://github.com/HadiAbouDaya/fidret/pull/20).
- Coordination: root owns article research/prose, original article figures/experience, article template/sources route, sitemap, records and integration. An isolated destination-pages worker owns project/charter/people routes and shared navigation/byline/author-registry changes. An isolated experiment worker owns the sensor method/replay surface and model-backed data/tests. A research agent owns read-only cross-provider/security source review. Workers preserve other edits; root integrates and verifies combined work.

## Plan

1. Finish the initial GitHub removal release; research current harness and security practices.
2. Build useful onsite replacements grounded in actual company/prototype/article records.
3. Write the sourced article and design its explanatory graphics and native control experience.
4. Independently review technical claims, source attribution and security boundaries; run meaningful checks and inspect desktop/mobile/article states.
5. Publish checked changes, verify actual production and leave a resumable handoff.

## Acceptance criteria

- Every removed project/charter/profile/experiment/source destination has a useful onsite counterpart and working navigation.
- The article is engaging, dated, credited to Hadi and supported by current opened primary sources; established controls, emerging practices and Fidret proposals remain distinct.
- Original design components explain authority, context, evidence and recovery without fake scores, live data or security guarantees.
- Contributor pages reflect actual credits, experiment results agree with the Python model, and sources/publication notes do not invent revision history.
- Required static/type/content/foundation tests and output contracts pass; new routes appear in the sitemap, drafts remain excluded, and public HTML has no GitHub anchors.
- Actual live deployment/rendering is verified separately from code merge.

## Decisions

See [decision 0011](../decisions/0011-onsite-knowledge-and-evidence.md) and the [dated source ledger](../foundation/agentic-company-research.md).

Keep the current architecture and publication schema unless a concrete content requirement justifies a documented extension. Use ordinary Markdown, local SVG figures and native controls. No agent framework is installed merely to illustrate the article.

## Verification

Initial link removal is complete: PR 20 merged `152dacf509c4a8da18c3cf98abafe6a150cb2f12`; Cloudflare `2ddc643d-467a-4d5a-8f0e-c1759d97243b` succeeded. Live home/Lab/approach/exploration return HTTP 200, match the checked build and contain zero GitHub anchors. Full gate passed 36 Node and 78 Python tests. New isolated implementation checks passed. The article is 1,897 words with 15 primary references, a dated research ledger and explicit Hadi byline; an independent source/security review found no material overclaim and prompted precise OAuth wording plus readable diagram access. Root integration found an existing foundation-link mismatch: canonical Lab root-local URLs were treated as filesystem paths. A bounded fix with four regression cases preserves document/traversal checks and defers website-route existence to publishing/output validation. The combined gate passed: foundation 60 documents / 15 tasks / 3 adapters, Astro 41 files with zero errors/warnings/hints, 38 Node tests, 82 Python tests and static output validation. Initial actual-build fixture failed because it assumed no public Lab assets existed; recursive fixture directory creation corrected that assumption while preserving the source/withdrawal assertions. Public article/source routes, profile queries and exact model replay are covered. Rendered review passed at 320/390/768/1704 pixels across the new public routes. All tested documents fit their viewport; the architecture figure keeps readable horizontal access on phones. The reply policy radio selected only its panel, and author/profile links, sources and experiment navigation remained onsite. A separate scan of all 12 generated HTML pages found zero GitHub anchors, scripts or duplicate IDs. Minor header refinements removed an external-looking icon from the internal project link and use location semantics for parent sections; the final typecheck/build/output/foundation checks passed after those refinements.


Production evidence: all 11 canonical public routes return HTTP 200 and byte-match the checked build. Five fingerprinted stylesheets return HTTP 200, exact bytes and immutable caching. Public HTML has zero GitHub anchors, scripts or inline styles, and CSP remains present. Internal AGENTS/author-registry/experiment-source paths return 404. The live article has Hadi Abou Daya's byline linked onsite; its three native controls load, and selecting deployment exposes only the denied panel. Self-hosted fonts load. The evidence/source/profile/method pages and sitemap are deployed. No field Core Web Vitals, comprehensive assistive-technology audit, company security assessment or hardware trial is claimed.

## Handoff

- Checkpoint: article and all onsite counterparts merged, deployed and verified on the custom domain; release evidence recorded.
- Remaining work: none for the requested article and onsite features; the closing record and UTC publication-date reconciliation are tracked on the closing branch.
- Next action: use the canonical Lab/design workflow for future pieces; actual company agent access and physical operation remain separately scoped work.
- Blockers: none; authorship answered explicitly.
- Acceptance basis: Hadi's explicit post/onsite-pages requests and byline choice, with standing publication authorization; no Elie authorship or review inferred.
- Publication: [PR 21](https://github.com/HadiAbouDaya/fidret/pull/21) merged as `45dcf3732abb53f8c2f430042c788ca415a1ddc9`; checked source head `400a28bb6fa38e6a3ee5c203ad4163565fdb17b1`. Push CI `40790564350` and PR CI `40790638164` passed, as did both merged-main jobs. Cloudflare deployment `51b3cc0b-d018-417c-ba1f-c159cd244f2f` succeeded at 2026-10-29 00:02:00 UTC. The first release crossed UTC midnight; this closing branch preserves creation on 28 October and reconciles publication/update dates to the actual 29 October release. The closing PR tracks its final deployment.
- Last verified: 2026-10-29 UTC, exact build/live parity for all 11 public routes, CSS and private-path probes; live Hadi byline/profile and policy exercise verified after deployment `51b3cc0b`.
