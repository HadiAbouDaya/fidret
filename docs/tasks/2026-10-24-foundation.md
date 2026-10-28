# Shared company and agent foundation

- Status: done
- Human owner: Hadi Abou Daya
- Agent or harness: Codex
- Branch: foundation/shared-agent-workflow
- Updated: 2026-10-28
- Verification status: passed

## Purpose

Make Fidret's purpose usable in everyday work and give Hadi and Elie Azoury a shared repository workflow across coding harnesses. Fidret means “Trust earned”; physical AI is its first practice.

## Scope

Company charter, initial practice brief, shared agent instructions, collaboration conventions, decision records, task handoffs, contributor templates, and automated foundation checks. Record fidret.com as acquired and defer service setup. Publish to a task branch and merge after verification under Hadi's subsequent authorization. Elie's contributor invitation remains with Hadi.

## Plan

1. Recover and verify the existing repository without replacing its history.
2. Separate the enduring company purpose from the first practice and unvalidated business hypotheses.
3. Establish one canonical instruction file with small harness entry points.
4. Define task ownership, separate branches and worktrees, review, decisions, and handoffs.
5. Add local validation and a GitHub Actions workflow with read-only permissions.
6. Exercise valid and invalid inputs, review the complete diff, and leave a precise handoff.

## Acceptance criteria

- Both contributors can locate the same company context and active task state from the README.
- Harness entry points refer to one canonical instruction file.
- Work has a named human owner, bounded scope, acceptance criteria, verification, and a handoff.
- Parallel work uses separate branches or worktrees and preserves other contributors' edits.
- Confirmed direction, proposals, and demonstrated capability are distinguishable.
- Local checks pass and reject broken internal links and incomplete task records.
- Existing GitHub history and the origin remote are preserved.

## Decisions

Use a documentation-first repository with Python standard-library validation. Keep application stacks and agent orchestration choices open until there is a concrete use case. See [company purpose](../decisions/0001-company-purpose.md) and [shared agent context](../decisions/0002-shared-agent-context.md).

## Verification

- `python3 scripts/check_foundation.py`: passed, 20 documents, 2 task records including the template, and 3 harness adapters.
- `python3 -m unittest discover -s tests -v`: 12 tests passed, including broken links, escaped repository paths, incomplete tasks, invalid task states, and changed adapter pointers.
- Workflow YAML was parsed locally and its triggers, read-only permissions, and action commit pins checked.
- `git fsck --full --no-dangling`: passed; original GitHub object hashes match.
- GitHub Actions: [first branch run](https://github.com/HadiAbouDaya/fidret/actions/runs/40120706143) succeeded for commit `c55cf59c798f385262aa667f6e751cae9b5abdfa`. The published Git tree exactly matched the locally staged tree.
- Actual harness loading on both contributors' machines remains an onboarding check; entry-point files and their references were validated locally and in CI.

The shell cannot resolve GitHub. Original objects were read through the connected GitHub tool and restored with matching hashes; publication will use that connection as well.

## Handoff

Historical checkpoint, 2026-10-24: implementation was complete under Hadi's standing publication and merge authorization. [PR 1](https://github.com/HadiAbouDaya/fidret/pull/1) carried the foundation on `foundation/shared-agent-workflow`; the first published checkpoint passed GitHub CI. Its final documentation checkpoint still awaited merge at the time that note was written. This is history, not an instruction to repeat a merge.

- Checkpoint: foundation implemented in the current local main history; subsequent website and Lab work is recorded in their own tasks.
- Remaining work: none for the initial repository implementation. Elie's onboarding and actual installed-harness loading remain separate follow-ups, not verified here.
- Next action: use the task register for current work. When onboarding occurs, confirm access and installed-harness loading before recording them as complete.
- Blockers: none for this completed implementation.
- Acceptance basis: Hadi's original request and standing publication/merge authorization from 2026-10-24; no Elie review is claimed.
- Publication: historical PR 1 and branch CI above; foundation is present at local main `e02e09f`. This 2026-10-28 clarification did not recheck remote PR state or perform an external action.
- Last verified: `sh scripts/check_deployment.sh` passed on local baseline `e02e09f` on 2026-10-28 with 35 tests. Earlier remote evidence above remains dated evidence.
