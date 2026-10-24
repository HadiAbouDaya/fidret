# Working together at Fidret

Hadi Abou Daya and Elie Azoury should be able to understand, review, and continue each other's work regardless of the coding harness used. This is the initial working convention; review it together during Elie's onboarding.

## Ownership

Every substantive task has one named human owner. An agent implements or assists; its output does not establish either person's approval. The owner keeps scope and acceptance criteria clear and requests review when the work is ready.

Hadi ([HadiAbouDaya](https://github.com/HadiAbouDaya)) is the repository owner. Elie Azoury's GitHub handle is [Eliejaz](https://github.com/Eliejaz).

As of 2026-10-24, GitHub confirms the repository is public. Hadi reported sending Elie's contributor invitation on that date. The permission check currently reports read access for `Eliejaz`; invitation acceptance and write access have not been confirmed. Avoid assigning him tasks or recording his agreement before he accepts them.

## Task and branch workflow

1. Read the [charter](docs/foundation/charter.md), [agent instructions](AGENTS.md), and [current tasks](docs/tasks/README.md).
2. Create an issue from the work template when using GitHub. For substantive work, copy [the task template](docs/tasks/TEMPLATE.md) to `docs/tasks/YYYY-MM-DD-short-name.md`. Link the issue and task to each other. Before remote access is available, the repository task is sufficient.
3. Give the task a human owner, scope, acceptance criteria, and branch. Note affected areas and overlapping work. One task owns a file at a time unless the contributors coordinate otherwise.
4. Work on a branch such as `hadi/task-name` or `elie/task-name`. Keep changes focused enough for the other person to review.
5. Update the task as work progresses. Put lasting choices in a [decision record](docs/decisions/README.md).
6. Run checks, inspect the diff, and leave a handoff. Publish useful checkpoints and open a PR using its template. Ask the other contributor to review once both have access.
7. Resolve feedback and merge once acceptance criteria and required checks pass, within the authorization below. Preserve the task's verification and decision links.

Small spelling or broken-link fixes can use the PR description as their task record. They still need a clear purpose and verification.

Hadi gave standing authorization on 2026-10-24 to push useful checkpoints and merge finished work to `main`. Agents can complete that workflow without asking again for routine publication. Honor a task that requests review before merge or local work only, and resolve any outstanding human decision before presenting it as accepted. Deployments and changes to domains, access, or account settings need their own task authorization.

## Concurrent sessions

Use a separate checkout or Git worktree for each active task. Two agents must not edit the same working tree concurrently.

From a clean, synchronized checkout, for example:

```sh
git fetch origin
git worktree add ../fidret-hadi-task -b hadi/task-name origin/main
git worktree add ../fidret-elie-task -b elie/task-name origin/main
```

Each contributor creates their own branch and worktree when starting their task. Do not run an example against a branch or directory that already contains work. Check active tasks before taking ownership of overlapping files. If overlap is necessary, agree who integrates the changes and record that agreement in both tasks.

Before a PR, update from `main` using a normal merge or a rebase of your own unshared commits. Never rewrite another person's branch. The contributor resolving a conflict records any change to behavior or intent and reruns the relevant checks.

## Decisions and review

Record decisions that affect company purpose, public claims, practice scope, architecture, shared instructions, or delivery obligations. Routine implementation choices can stay in the task or PR.

For a proposed change to purpose or practice direction, name a human decision owner and request input from the other contributor. Record the actual outcome and any unresolved disagreement. Do not present silence as agreement. For ordinary task review, the reviewer checks the acceptance criteria, evidence, maintainability, and connection to Fidret's purpose.

## Shared context and private material

For shared technical publishing, use [Fidret Lab](lab/README.md). Choose the actual authors explicitly; a piece may be individual or joint. Simulations, prototypes, conceptual architectures, and explanations are suitable before there is client work. Use the common format and the existing task, PR, and deployment workflow.

Keep reusable context in the repository and reference it from issues and PRs. Keep private notes and local machine configuration in `.local/`, which is ignored. Essential project context must be understandable without those notes. The `.gitignore` reduces accidental additions; it is not a secrets scanner.

Do not commit client or personal data to this foundation. If future work needs restricted material, record a non-sensitive summary and an access-controlled reference so both contributors understand what the evidence supports.

## Contributor onboarding

- Elie accepts the invitation already sent by Hadi. Confirm the intended access level and verify write access after acceptance.
- Elie clones the repository, reads the charter and this workflow, and runs both local check commands from the README.
- Each person confirms that their harness reads `AGENTS.md` and can find a task, its owner, and its handoff.
- Review the initial foundation together and record changes through a task and PR.
- Once access is confirmed, add the actual GitHub handles to a CODEOWNERS file if useful. Configure a rule for `main` requiring PR review and the `foundation` check if supported by the repository's GitHub plan. A workflow file alone does not enforce branch protection.

GitHub manages contributor access. This guide records its known state; no CODEOWNERS assignment or GitHub ruleset is configured by these documents.

For the harness check, ask it to read `AGENTS.md`, explain Fidret's purpose, identify the current task and human owner, and run the local foundation checks. Compare its response with the repository. The entry-point files are provided for Codex, Claude Code, Cursor, and GitHub Copilot; actual loading in each contributor's installed harness must be confirmed during onboarding.
