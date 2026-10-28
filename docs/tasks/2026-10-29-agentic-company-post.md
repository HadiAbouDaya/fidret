# Agentic-company article and onsite knowledge pages

- Status: active
- Human owner: Hadi Abou Daya
- Agent or harness: Codex with coordinated research and implementation agents
- Branch: hadi/agentic-publication
- Updated: 2026-10-29
- Verification status: not-run

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

Keep the current architecture and publication schema unless a concrete content requirement justifies a documented extension. Use ordinary Markdown, local SVG figures and native controls. No agent framework is installed merely to illustrate the article.

## Verification

Initial link removal is complete: PR 20 merged `152dacf509c4a8da18c3cf98abafe6a150cb2f12`; Cloudflare `2ddc643d-467a-4d5a-8f0e-c1759d97243b` succeeded. Live home/Lab/approach/exploration return HTTP 200, match the checked build and contain zero GitHub anchors. Full gate passed 36 Node and 78 Python tests. New work has not yet been verified.

## Handoff

- Checkpoint: initial link-removal release verified; new scope and explicit Hadi byline recorded; current research has begun.
- Remaining work: onsite destinations, research synthesis/article, explanatory components, combined review/checks and publication.
- Next action: delegate independent implementation and research, then integrate the article around primary-source findings.
- Blockers: none; authorship answered explicitly.
- Acceptance basis: Hadi's explicit post/onsite-pages requests and byline choice, with standing publication authorization; no Elie authorship or review inferred.
- Publication: new task record local only; no new feature PR or deployment yet.
- Last verified: 2026-10-29 local / 2026-10-28 UTC, main `152dacf` and the completed link-removal deployment.
