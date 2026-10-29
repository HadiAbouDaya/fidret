# A reusable brief for a first agent workflow

- Status: review
- Human owner: Hadi Abou Daya
- Agent or harness: Codex with an isolated content worker and read-only review
- Branch: hadi/workflow-field-guide
- Updated: 2026-10-29
- Verification status: passed

## Purpose

Hadi asked to continue after the [company-harness article and onsite pages](2026-10-29-agentic-company-post.md). A review found a concrete next step: the article asks readers to write five contracts, but supplies no reusable brief. Turn that explanation into a useful planning resource, consistent with the [charter](../foundation/charter.md).

## Scope

A designed article companion, a printable review checklist and an editable Markdown download, plus relevant article/approach navigation. Use the existing five-contract synthesis and a clearly fictional support workflow. Keep publication lifecycle, static delivery, accessibility and repository context coherent.

## Execution boundaries

- Authorized scope: Hadi's continuation of the website/article work and standing push, merge and website publication authorization. No actual agent access, account settings, private data, messages, paid services or physical operations.
- Worktree: root integrates in `fidret-design`; source starts from main `16f6217`. Other worktrees are preserved.
- Dependencies: [onsite publication convention](../decisions/0011-onsite-knowledge-and-evidence.md), the existing article and [design language](../design/fidret-design-brief.md).
- Coordination: root owns page/CSS/routes/navigation/build lifecycle tests/docs and final integration. An isolated worker on `hadi/workflow-brief-content` owns only `src/lib/workflow-brief.ts` and its focused unit tests. A read-only explorer identified the visitor gap. Editing agents preserve each other's work.

## Plan

1. Verify the baseline and inspect current public reading paths.
2. Share typed contract content between the designed page and editable brief; keep both routes tied to the published article.
3. Add contextual links and a native review checklist without a score or browser JavaScript.
4. Verify build/withdrawal/download contracts, desktop/mobile/keyboard and print layouts, then publish and check production.

## Acceptance criteria

- Readers can examine a fictional worked example, review five contracts and take an editable brief into their own workflow.
- The page explains temporary checkbox state and distinguishes a planning aid from actual authorization, a security assessment or certification.
- Guide and Markdown output exist only while the parent article is published; entry points and sitemap reflect that same lifecycle.
- Downloads render as Markdown, link destinations work, and no GitHub anchors, browser scripts or dependencies are added.
- Shared checks pass; actual responsive/native/print rendering and deployed output are checked separately.

## Decisions

Extend the existing onsite publication convention with an article-specific companion and generated Markdown response. Keep the existing Lab schema. This resource applies the article's original synthesis; it does not introduce a new external standard or a company security claim.

## Verification

Baseline `sh scripts/check_deployment.sh` passed on main-equivalent source: 38 Node tests, 82 Python tests, zero Astro diagnostics and output/foundation validation. Read-only review confirmed that the article's next steps lacked a reusable workflow brief and `/approach/` did not link the relevant article. Existing MCP security and OWASP red-teaming references were reopened on 29 October; the resource will use their bounded topics through the article's source record, without new vendor claims.

Implementation gate passed: 41 Node tests, 83 Python tests, zero diagnostics across 45 Astro/TypeScript files, 61 foundation documents / 16 task records including template / 3 adapters and website-output validation. The actual-build lifecycle case was strengthened with a second published piece, then rerun successfully: companion/download/entry points publish only for the harness parent and disappear after withdrawal. The output test permits exactly the authored Markdown path and rejects AGENTS, internal drafts and other Markdown. After two print refinements, the production build, output/foundation validation and whitespace checks passed again. Independent read-only review found no material content, lifecycle or policy issues.

Rendered review: default desktop at 1704 px, phones at 320/390 px and tablet at 768 px; no document overflow. The authority disclosure opens with Enter and the unknown-outcome checkbox toggles with Space, both with visible focus. Reduced-motion rendering was exercised and temporary browser overrides restored. A four-page A4 print proof was rendered and inspected; the headline retains its space and the decision section starts together. Browser download activation opened the expected named Save dialog; after Hadi asked not to be involved in file saving, it was dismissed and verification continued through a direct local HTTP download (200, text/markdown, 6,498 exact bytes), saved under ignored local evidence. Production MIME/header/byte parity remains a release check. No private data is entered or transmitted by the guide, and no browser settings were changed.

## Handoff

- Checkpoint: companion, editable download, navigation, publication lifecycle, shared documentation and local review complete.
- Remaining work: remote checks, merge, deployment verification and closing evidence.
- Next action: publish the checked task branch and verify its production release.
- Blockers: none.
- Acceptance basis: Hadi's continuation request and existing website/article publication authorization; no Elie review or authorship inferred.
- Publication: local implementation includes isolated content commit `1641a0f`; no new push, PR, merge or deployment yet.
- Last verified: 2026-10-29, combined local gate and browser/print/direct-download evidence; production remains unverified for this change.
