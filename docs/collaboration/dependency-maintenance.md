# Maintaining the pinned toolchain

Exact pins make builds reproducible; they need deliberate updates. [Decision 0009](../decisions/0009-reviewed-maintenance.md) records this convention. The [system map](../architecture/README.md) identifies current source and version files; task records hold dated checks and delivery evidence.

## Dependency proposals

`.github/dependabot.yml` requests weekly npm/pnpm and GitHub Actions version-update PRs. Minor/patch Astro packages and TypeScript tooling are grouped into small review units; major changes remain separate. The version-update limits are three npm and two Actions PRs. GitHub applies a separate limit to security-update PRs, so these are not a total queue cap. No automatic merge is configured.

GitHub's [supported-ecosystem table](https://docs.github.com/en/code-security/reference/supply-chain-security/supported-ecosystems-and-repositories) listed pnpm 7–12 on 2026-10-28. This repository uses a single-document pnpm lockfile. That general support does not prove the first service run handles this exact managed-runtime lockfile; inspect the first actual update job/PR and record the result. A configuration file alone does not establish an enabled security-alert setting or a successful bot run.

Review release notes, compatibility and the exact diff. Preserve exact package pins and a deliberate lockfile. For Actions, verify the replacement SHA belongs to the official action/release and retain read-only workflow permissions. Follow the usual task/PR workflow, run the full gate and inspect the actual deployment after merge. A green update is evidence for those checks, not permission to infer wider capability or another contributor's approval.

## Node and pnpm upgrades

Check supported LTS releases at least monthly and when a relevant vendor security release appears. This is an operating instruction, not a scheduled automation. Use [Node's release policy](https://nodejs.org/en/about/previous-releases) and the exact release notes; prefer a supported LTS line unless an actual requirement justifies changing it.

Keep these inputs synchronized in one task:

1. `.node-version`, `.nvmrc`, `package.json`'s exact `devEngines.runtime.version` and its matching `engines.node` lower bound/major range.
2. `packageManager` and `engines.pnpm` when changing pnpm; read that version's migration notes and preserve strict engines/project-local stores.
3. Regenerate `pnpm-lock.yaml` with the intended pinned pnpm. Review runtime archive URLs/checksums against official release SHASUMS and distinguish runtime changes from application dependency updates.
4. Install frozen dependencies starting from the supported ordinary Node launcher, check `pnpm exec node --version`, run `pnpm runtime:check` and `pnpm check`, and verify that ordinary `node` did not change unexpectedly.
5. Update current setup/system documentation, review the PR, verify both CI jobs, then verify Pages' exact commit/tool versions and live output.

Dependabot is not relied upon to synchronize `devEngines.runtime`, both Node version files and the engine policy. A package-manager proposal may also require reconciling its exact engine pin. If an update fails compatibility or lockfile generation, preserve the failure in its task and fix the coherent source change; do not disable runtime assertions, strict engines or frozen installation to make it pass.

## Advisory checks

For a dated maintenance review, `pnpm audit --json` includes build tools and application dependencies. Assess the affected path, advisory conditions, development/build versus visitor exposure and the proposed fix. Do not run automatic audit fixes. Advisory-service availability is not a dependency of every static deployment; a failed network lookup is an unverified audit, not a clean result. No audit service or account settings are enabled by this document.

## Current evidence

The [2026-10-28 maintenance task](../tasks/2026-10-28-dependency-maintenance.md) upgrades the initial Node 24.21.0 pin to the official [24.22.1 LTS security release](https://nodejs.org/en/blog/release/v24.22.1). Its record separates source checks, CI, merge and actual deployment. Historical migration/runtime records retain the versions they actually tested.
