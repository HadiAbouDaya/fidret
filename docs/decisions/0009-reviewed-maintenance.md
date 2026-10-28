# Reviewed maintenance of the reproducible toolchain

- Status: active
- Date: 2026-10-28
- Human decision owner: Hadi Abou Daya
- Related task: [Dependency maintenance](../tasks/2026-10-28-dependency-maintenance.md)
- Basis: Implementation convention within Hadi's explicit Node-update and continuing purpose-aligned improvement authorization

## Context

The accepted static stack uses exact package, runtime and action pins. Reproducibility alone does not keep those versions supported. A primary-source release review identified Node 24.22.1 as a newer LTS security release than the initial migration's 24.21.0 pin. Agents need an explicit path for future maintenance.

## Decision

Use weekly Dependabot npm/pnpm and GitHub Actions version-update PRs with small minor/patch groups and bounded version-PR queues. Retain ordinary review, compatibility checks and the existing task/merge/deployment workflow. Do not configure automatic merge.

Maintain Node and pnpm pins coherently through explicit tasks, including engine declarations, version files, runtime archive integrity entries and current instructions. Use supported LTS Node and review relevant security releases. Do not assume a dependency bot updates every runtime declaration or that general pnpm support proves the first exact lockfile service run.

Keep advisory checks as dated maintenance evidence with actual exposure and limitations. Do not add live advisory-service availability to every deployment or apply automatic audit fixes. The [maintenance guide](../collaboration/dependency-maintenance.md) owns the procedure.

## Consequences

Updates become visible review work instead of silently drifting or freezing indefinitely. Review and coherent pin upgrades remain responsibilities of the task owner/implementing agent. Exact managed-runtime bot compatibility and future service availability require observed evidence. This configuration does not enable account settings, branch protection or security-alert guarantees.

## Alternatives considered

- Manual-only dependency tracking: avoids a bot but makes ordinary package/action updates easier to miss.
- Automatic merge or floating versions: reduces review work but weakens the reproducible, verified handoff expected here.
- Changing package managers or removing runtime pins for bot compatibility: unnecessary without a demonstrated blocker; investigate actual failures first.

## Review

Established within Hadi's authorized improvement session; no Elie review or joint approval is claimed. The task records implementation, tests and external delivery evidence separately.
