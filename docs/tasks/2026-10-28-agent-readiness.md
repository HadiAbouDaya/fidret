# Shared agent readiness and reliable context

- Status: done
- Human owner: Hadi Abou Daya
- Agent or harness: Codex
- Branch: hadi/agent-readiness
- Updated: 2026-10-28
- Verification status: passed

## Purpose

Hadi requested a project that agents can understand and continue with its purpose and useful work properly recorded. Strengthen the existing [shared foundation](../decisions/0002-shared-agent-context.md) so progress toward [Trust earned](../foundation/charter.md) survives a fresh session, contributor, or harness.

## Scope

Shared instructions, source-of-truth and architecture map, agent startup/recovery workflow, task and decision templates, historical handoff clarification, and automated foundation validation. Preserve the current website, company direction, and existing authorization boundaries. Record the Astro recommendation as a proposal, without performing a migration.

## Execution boundaries

- Authorized scope: repository documentation, validation, local checks, task-branch publication and normal PR workflow under Hadi's standing authorization. No account, permission, hosting, or physical-system changes are part of this task.
- Worktree: `fidret-agent-readiness`, branch `hadi/agent-readiness`; resolve the checkout from Git rather than assuming a contributor's absolute path.
- Dependencies: current shared foundation, static website and Lab conventions.
- Coordination: Codex root owns documentation and integration. Validator implementation will use a separate branch/worktree and own only `scripts/check_foundation.py` and `tests/test_foundation.py`. Read-only reviews make no changes.

## Plan

1. Audit existing context and run the current shared checks.
2. Document current architecture, task-specific reading routes, session recovery, evidence routing, and scoped autonomy.
3. Add explicit checkpoints and publication/acceptance evidence to the task workflow; retain historical evidence.
4. Validate decision lifecycle/registration and new context requirements with meaningful failure cases.
5. Run shared checks, review the diff, and have a fresh-context agent attempt the onboarding protocol.
6. Record exact results and publication state, then publish a reviewable checkpoint.

## Acceptance criteria

- A fresh agent can identify company purpose, current implementation, proposals, canonical sources, task owner, and next authorized action from repository files.
- Task records have explicit scope, verification and resumable checkpoints without relying on chat transcripts.
- Shared policy stays in `AGENTS.md`; harness adapters remain thin pointers.
- Decision status disagreements, missing decision basis/registration, duplicate metadata, and broken context references fail automated checks.
- All existing Lab and website checks still pass; public output is unchanged.
- Verification distinguishes local results, remote publication and actual deployment.

## Decisions

Use [decision 0006](../decisions/0006-agent-readiness.md) for the strengthened shared workflow and [proposal 0007](../decisions/0007-static-website-growth.md) for the future static website growth stack. Hadi's request authorizes agent-readiness implementation; it does not establish acceptance of an Astro migration or Elie's review.

## Verification

- Baseline at `e02e09f`: `sh scripts/check_deployment.sh` passed; Lab and website validators passed, foundation reported 31 documents/4 task records/3 adapters, and all 35 tests passed.
- Integrated implementation: `sh scripts/check_deployment.sh` passed with 36 documents, 5 task records including template, 3 adapters and all 51 tests before the final validator review fixes. The final combined run follows those fixes.
- Fresh-context trial on 2026-10-28: an independent agent with no inherited project chat followed `AGENTS.md`, inspected Git/worktrees and the reading route, identified purpose, first practice, implemented stack vs proposal, human owner, sources/output, authorization and next action, then independently ran the shared checks and `git diff --check`; both passed. It correctly identified this task's in-progress checkpoint lag, now updated here. This verifies one agent session, not installed instruction loading in every harness.
- Independent validator review reproduced two gaps: malformed decision filenames escaped validation and supersession could point at an unadopted proposal. Follow-up validation rejects these and invalid/duplicate register destinations and tests valid multi-hop replacement chains.
- Final combined implementation check on 2026-10-28: `sh scripts/check_deployment.sh` passed with 36 documents, 5 task records including template, 3 adapters and all 56 tests. `git diff --check` passed. Diff review confirmed no changes to `website/`, Lab sources/templates, hosting configuration or CI. The 21 added tests cover the new metadata, checkpoint, decision lifecycle and register failure cases.
- GitHub read-only verification on 2026-10-28: remote `main` was `e02e09f70065f3de5a1babbe2a768a113a43d167`, matching the local base; its branch response reported `protected: false` and required checks disabled, and the ruleset list was empty. Require the `foundation` check and a PR on main through a separately authorized settings change; no protection, review or access setting was changed here.
- Shell Git could not resolve `github.com`; the connected GitHub tool successfully read the repository. Use that working connection for publication and verify exact tree parity.
- Published checkpoint: [PR 8](https://github.com/HadiAbouDaya/fidret/pull/8), first remote commit `29c404c9f9b7de77b757b8fcff1e280b855024ed`. Its Git tree `5cf5cb9d3f83287628ef4511374d4e8e21711bf0` exactly matched checked local commit `d7b771de77ab2c914be5fa4a33565a5d6170c131`. Both [branch CI](https://github.com/HadiAbouDaya/fidret/actions/runs/40708626150) and [PR CI](https://github.com/HadiAbouDaya/fidret/actions/runs/40708677103) completed successfully. The PR retains subsequent handoff-commit checks and actual merge state without duplicating a changing service status here.
- Final independent documentation review found no blocking contradictions, new approval requirements, unsupported acceptance/capability claims or actionable historical instructions. This is an agent review, not Elie's review.

## Handoff

- Checkpoint: requested repository agent-readiness implementation complete, locally verified, independently reviewed and published through PR 8; fresh-context trial passed.
- Remaining work: none for the repository implementation. A separately authorized main-protection settings change and each contributor's installed-harness loading check remain follow-ups. Proposed protection settings are to require a PR and successful `foundation` check for main, preserving existing access and review-count settings.
- Next action: for new work, use `AGENTS.md` and the task register. Confirm installed-harness loading during onboarding; handle the recorded main-protection gap as a separate settings task. Read PR 8 for actual delivery state before repeating any remote action.
- Blockers: none.
- Acceptance basis: Hadi's 2026-10-28 agent-readiness request and recorded standing authorization for ordinary task publication/merge. No Astro migration, Elie review, new access or service authorization is inferred.
- Publication: PR 8 is the authoritative record of published commits, checks and merge outcome. The first branch/PR CI and exact tree parity are recorded above; this final handoff is a subsequent documentation checkpoint in that delivery. No hosting/account change or new live-deployment verification is claimed.
- Last verified: 2026-10-28, all 56 local tests/shared validators and diff checks passed; initial published tree parity and both remote CI runs passed; independent documentation review and fresh-context trial passed. Protection state was read on the same date. Subsequent head/merge checks remain linked in PR 8.
