# Default AI-DLC website workflow

- Status: review
- Human owner: Hadi Abou Daya
- Agent or harness: Codex in T3 Code
- Branch: hadi/aidlc-default-workflow
- Updated: 2026-11-06
- Verification status: partial
- AI-DLC: 1
- Issue: https://github.com/HadiAbouDaya/fidret/issues/68

## Purpose

Adopt [AWS Labs AI-DLC](https://github.com/awslabs/aidlc-workflows) for all website work without requiring Hadi to invoke it. Preserve [Trust earned](../foundation/charter.md) through explicit intent, adaptive planning, verified delivery and resumable evidence.

## Scope

First finish outstanding PRs, then integrate a pinned upstream workflow into shared instructions, task records, harness pointers and validation. No public design or application behavior change is requested.

## Execution boundaries

- Authorized scope: Hadi explicitly requested this adoption and merging outstanding PRs on 6 November 2026. Existing standing authorization covers publishing branches and merging checked completed work. No account settings, manual deployment or outreach.
- Worktree: existing root checkout, clean branch from origin/main ea4b8ae; other worktrees preserved.
- Dependencies: upstream release and license review, existing decisions 0002 and 0006, pinned build toolchain and exact-head GitHub checks.
- Coordination: root owns all edits and integration. aidlc_research performs read-only upstream/repository research and integration review; fresh_context_trial evaluates default discovery independently without inherited chat. No concurrent editing agent.

## Plan

1. Inspect PRs and current main, preserve existing work.
2. Review and pin upstream AI-DLC, integrate automatic startup and proportional lifecycle evidence.
3. Exercise fresh-context discovery and failure contracts, run the shared gate and review the diff.
4. Publish a PR, resolve feedback and merge after required checks pass.

## Acceptance criteria

- A1: No outstanding PR is ignored before adoption starts.
- A2: All website requests route automatically through the shared AI-DLC skill across existing adapters.
- A3: Pinned upstream guidance is offline, attributed and protected from accidental drift.
- A4: New tasks record proportional stages, gate authority and acceptance traceability without duplicate state.
- A5: Existing authorization, design/search rules, build architecture and required checks remain intact.
- A6: Fresh-context discovery and meaningful rejection fixtures demonstrate the local integration.
- A7: Full local and current-head required GitHub checks pass before merge; publication is reported separately.

## AI-DLC

- Profile: infra
- Depth: Standard
- Rationale: Brownfield delivery-workflow integration. Add intent, practices and functional-design analysis to the infra starting profile; omit unrelated UI/application/environment stages explicitly.
- Current phase: operation
- Gate basis: Hadi's explicit adoption/merge request plus existing standing authority for reversible implementation and checked PR merge. Decision 0016 records the adaptation, not a new human approval.
- Operation status: Implementation 94f921a is pushed in PR 69; required exact-head GitHub checks must pass before merge. No manual deployment or live-site verification is part of this internal change.

| Stages | Disposition | Evidence or reason |
| --- | --- | --- |
| workspace-scaffold, workspace-detection, state-init, intent-capture, feasibility, scope-definition, reverse-engineering, practices-discovery, requirements-analysis, delivery-planning, functional-design | complete | Startup/PR audit, pinned-source research, local adaptation design and A1–A7 scope recorded in this task and decision 0016. |
| code-generation | complete | Shared policy, upstream references and lifecycle checks implemented; independent review findings fixed. |
| build-and-test | complete | Shared gate passed: zero diagnostics, 67 Node tests, 122 Python tests; all 63 public files byte-identical. Skill validation and fresh-context trial passed. |
| ci-pipeline, deployment-pipeline, feedback-optimization | planned | Current-head GitHub review/checks and checked publication handoff remain. |
| approval-handoff, contract-design, domain-design, environment-provisioning, incident-response, infrastructure-design, market-research, nfr-design, nfr-requirements, observability-setup, performance-validation, refined-mockups, rough-mockups, team-formation, units-generation, user-stories | skipped | Internal workflow change: no new visitor feature, market study, UI, application architecture/contract, infrastructure, incident or production measurement is requested. Existing owner and single integration unit suffice. |
| deployment-execution | skipped | No manual deployment authorized or needed; existing main-triggered Pages path stays unchanged and live deployment is not claimed. |

## Traceability

| Criterion | Implementation | Verification | Result |
| --- | --- | --- | --- |
| A1 | Existing PR audit | GitHub open PR list empty; PR 67 merged; origin/main ea4b8ae on 6 November. | pass |
| A2 | AGENTS.md, shared skill, three thin adapters, startup runbook | Foundation routing checks and independent fresh-context trial passed. | pass |
| A3 | vendor/aidlc source subset and upstream.json | 54-file pinned subset inventory and SHA-256 checks passed, including removal/drift fixtures. | pass |
| A4 | Task template, workflow and scripts/check_aidlc.py | 18 lifecycle/integrity/routing tests passed, including incomplete and uncovered criteria. | pass |
| A5 | Decision 0016 and explicit local translations | Independent review and full shared gate passed; all 63 public files byte-identical. | pass |
| A6 | Independent discovery trial and Python failure tests | Independent fresh-context trial, foundation check and all 18 Python fixtures passed. | pass |
| A7 | Shared gate and protected GitHub PR path | Local/remote verification and publication pending. | pending |

## Decisions

[Decision 0016](../decisions/0016-default-aidlc.md) records pinned methodology integration, automatic routing and explicit local translations. Company purpose and website stack remain established.

## Verification

6 November: GitHub open PR list was empty. Latest PR 67 merged at 07:21:30 UTC; current root HEAD equals origin/main ea4b8ae. Current main protection requires foundation, runtime-bootstrap and seo-geo from GitHub Actions, strict freshness and administrator enforcement. No unresolved PR work remains. Initial pnpm baseline could not start because the launcher was absent from this shell PATH. The recovered exact-version local setup and successful baseline are recorded below.

### Implementation checkpoint

Pinned v2.11.3 guidance and local translations are integrated through AGENTS, the shared skill, startup/contribution guidance and all three existing thin adapters. New task/PR/issue templates carry proportional stage accounting, acceptance IDs and evidence. No native engine, hook, provider, permission or website source change is introduced.

The exact pnpm 11.28.9 launcher was obtained under ignored .local/toolchain and used with the already installed Node 24.22.1; no global settings changed. The baseline full gate passed with zero diagnostics, 67 Node tests and 104 Python tests. New 18 AI-DLC tests pass, including hash/inventory drift, removed default routing with links retained, duplicate lifecycle metadata, omitted/duplicate stages, uncovered criteria and false done states. Independent read-only review prompted the directive, metadata and retained-reference checks. The independent fresh-context trial received ordinary typo, interactive-Lab and read-only audit requests without inherited chat. It found mandatory AI-DLC routing automatically, selected express/feature/adapted review paths, located the task/template/authority and identified the existing bounded interactive-runtime constraint. Its foundation check passed. This establishes one fresh agent's discovery, not actual loading in every installed harness. The trial prompted clarification that strict no-write reviews report build checks as not run because those regenerate output. The old handoff was refreshed. The combined gate passed with zero diagnostics, 67 Node tests and 122 Python tests, including all 18 AI-DLC cases. All 63 generated public files are byte-identical to the baseline; no new visual/browser claim is needed for unchanged output. Skill format validation passed. The final gate rerun passed after documentation clarifications. The staged diff check reports only the upstream license's preserved trailing blank line; authored files pass the ordinary whitespace check, and that one byte-exact source passes with blank-at-EOF checking disabled. No extra local browser matrix or live deployment verification was performed; CI retains its existing browser regression job.

### Publication checkpoint

Implementation 94f921a is committed and pushed through [PR 69](https://github.com/HadiAbouDaya/fidret/pull/69), linked to [Issue 68](https://github.com/HadiAbouDaya/fidret/issues/68). Final local shared verification passed and all public output remained byte-identical. Exact-head GitHub checks/reviews are now the remaining gate. This publication checkpoint is a documentation-only revision; its foundation validation passes. Merge, completion and live deployment are not yet claimed.

## Handoff

- Checkpoint: implementation, independent review, fresh-context discovery and local shared verification passed. Published in PR 69; exact-head GitHub checks remain before completion and merge.
- Remaining work: verify current-head required checks/review state, record completion and merge.
- Next action: inspect PR 69 current-head required GitHub checks and unresolved feedback; finalize the completion record and merge when verified.
- Blockers: none; exact local pnpm/Node now available through ignored task tooling.
- Acceptance basis: Hadi's explicit request and existing standing publication authorization.
- Publication: local implementation committed as 94f921a, pushed to hadi/aidlc-default-workflow and opened as PR 69. The PR identifies its final documentation head. No merge, manual deployment or live verification yet.
- Last verified: 2026-11-06, local shared gate, 18 lifecycle tests, skill validation, independent discovery/source reviews, 63-file output comparison and diff inspection passed; PR 69 required checks are running and must be verified on the current head.
