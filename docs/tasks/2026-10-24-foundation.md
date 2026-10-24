# Shared company and agent foundation

- Status: review
- Human owner: Hadi Abou Daya
- Agent or harness: Codex
- Branch: foundation/shared-agent-workflow
- Updated: 2026-10-24

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
- GitHub Actions and actual harness loading on both contributors' machines have not yet been verified.

The shell cannot resolve GitHub. Original objects were read through the connected GitHub tool and restored with matching hashes; publication will use that connection as well.

## Handoff

Implementation is ready for publication and CI verification on `foundation/shared-agent-workflow`. Shared instructions include thin entry points for Codex, Claude Code, Cursor, and GitHub Copilot. Hadi authorized checkpoint publication and merging finished work to main on 2026-10-24.

Next: publish a PR, check its GitHub workflow, and merge under that authorization. Review the foundation and actual harness loading with Elie when his access is available. Invitation, branch protection, DNS, hosting, and email setup remain separate follow-up work.
