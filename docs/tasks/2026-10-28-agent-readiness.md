# Shared agent readiness and reliable context

- Status: review
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

## Handoff

- Checkpoint: source map, startup/recovery workflow, structured handoffs and decision validation implemented; fresh-context trial passed; review fixes integrated from a separate worktree.
- Remaining work: task-branch publication/CI and normal PR completion.
- Next action: publish the verified tree using the connected GitHub tool.
- Blockers: none.
- Acceptance basis: Hadi's 2026-10-28 agent-readiness request and recorded standing authorization for ordinary task publication/merge. No Astro migration, Elie review, new access or service authorization is inferred.
- Publication: local task branch only; no remote push, merge or deployment for this task yet.
- Last verified: local combined implementation/trial checks on 2026-10-28 as recorded above; GitHub base and protection state read on that date. Final combined check/remote publication evidence will be added before handoff.
