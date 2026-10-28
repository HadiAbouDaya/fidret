# Reproducible project-managed Node bootstrap

- Status: review
- Human owner: Hadi Abou Daya
- Agent or harness: Codex
- Branch: hadi/managed-runtime
- Updated: 2026-10-28
- Verification status: passed

## Purpose

Make the [accepted Astro toolchain](../decisions/0007-static-website-growth.md) usable by a fresh agent without private temporary paths or write access to a global Node manager. This addresses the actual read-only NVM failure during the migration and supports reliable handoff under [Trust earned](../foundation/charter.md).

## Scope

Use pnpm 11's project-managed Node runtime declaration and lockfile checksums, writable ignored project-local caches, current bootstrap documentation and meaningful CI verification. Retain exact Node 24.21/pnpm 11.1.2 and the current public site. Do not change machine defaults, accounts, domains, access or paid plans.

## Execution boundaries

- Authorization: Hadi's explicit Node-update permission, stack-migration request and continuing two-hour improvement request; implementation and publication/merge follow existing authorization.
- Worktrees: root integration/docs in `fidret-runtime`; package/CI implementation in a separate `fidret-runtime-tools` worktree. Root integrates and verifies the combined result.
- Ownership: worker owns package.json, pnpm-lock.yaml, pnpm-workspace.yaml and the CI/bootstrap contract; root owns task records, README/runbook documentation, delivery evidence and final integration.
- Dependencies: migration PR 9 merged as `b9fe0037a29bc60a4a275e9a20caf38b561dff2f`; its live deployment is being checked independently.

## Plan

1. Research the pinned pnpm 11 runtime implementation and test the proposed bootstrap in a disposable directory.
2. Add exact `devEngines.runtime` and deliberate lockfile/runtime integrity entries; use ignored project-local store/cache paths.
3. Verify a clean frozen install starting on the machine's ordinary Node 22, actual project script execution on Node 24 and offline reuse/failure behavior.
4. Run the full repository checks and add a small CI bootstrap check so runtime compatibility stays observable.
5. Update agent/developer startup instructions, publish/merge after checks and verify automatic deployment.

## Acceptance criteria

- Ordinary Node 22.22 can start the pinned pnpm and install frozen dependencies without disabling engineStrict or writing global configuration.
- Project scripts use exact Node 24.21; pnpm runtime URLs/checksums are recorded in the lockfile.
- Warm frozen/offline reinstall is reproducible; absent offline runtime fails clearly.
- Existing site/content/type/security checks pass and no public content/design is changed.
- Current instructions explain managed runtime versus ordinary `node`, without requiring private chat or temporary paths.
- Source, CI, merge and deployment evidence are recorded separately.

## Decisions

This is a tooling implementation of accepted decision 0007 and [publishing convention 0008](../decisions/0008-astro-publishing.md), not a new application runtime or hosting service.

## Verification

- Official sources checked 2026-10-28: [runtime declaration](https://pnpm.io/package_json#devenginesruntime), [pnpm 11 release](https://pnpm.io/blog/releases/11.0), [pinned runtime conversion](https://github.com/pnpm/pnpm/blob/v11.1.2/pkg-manifest/utils/src/convertEnginesRuntimeToDependencies.ts) and [Node resolver](https://github.com/pnpm/pnpm/blob/v11.1.2/engine/runtime/node-resolver/src/index.ts).
- Disposable bootstrap experiment: plain pnpm 11.1.2 install on Node 22.22 with engineStrict true downloaded Node 24.21 in 13.7 seconds; managed exec/scripts used 24.21 while ordinary Node/NVM stayed 22.22/22. Clean frozen and warm/offline reinstalls had zero downloads and identical lockfiles. Empty-store offline install correctly failed with ERR_PNPM_CANNOT_DOWNLOAD_BINARY_OFFLINE. Official Node archive URLs and SHA256 runtime integrities were present.
- Full-project tools-worktree cold plain install passed from ordinary Node 22.22 with engineStrict true in 42.2s (386 packages). Clean frozen reinstall and warm/offline reinstall reused all packages, downloaded none and preserved the lockfile; existing application dependency versions/integrities were unchanged. `pnpm check` passed 30 Node cases, 42 Python cases, clean Astro diagnostics and static output validation.
- Root independently installed frozen dependencies in a fresh integration worktree in 31s without a PATH override or engine bypass. Managed exec reported 24.21 while ordinary `node` remained 22.22; runtime/pin assertions passed. An attempted exec before explicit install used an implicit installation path that encountered harness DNS restrictions; the documented explicit frozen installation succeeded.
- Standalone Astro commands previously attempted writing home-directory telemetry preferences. The project CLI wrapper now disables telemetry before importing Astro and runs root/filesystem preflight; plain `pnpm typecheck` succeeded under the read-only home with zero diagnostics and no manual environment setup.
- Final integration `pnpm check` passed after the wrapper change: 30 Node cases, 42 Python cases, zero Astro diagnostics, foundation validation and static public-output checks. Independent read-only review confirmed runtime/pin agreement, unchanged application dependencies, CLI argument handling, preflight ordering and the two CI environments; no concrete blocker was found.

## Handoff

- Checkpoint: managed runtime, local-cache policy, telemetry-safe CLI and CI bootstrap job implemented; independent review and the final combined gate passed.
- Remaining work: PR/CI/merge and deployment verification.
- Next action: publish the checked tree and verify both CI jobs before merging.
- Blockers: none requiring user input.
- Acceptance basis: Hadi's explicit continuing-work authorization and observed need for a portable supported runtime; no global Node change or Elie review is claimed.
- Publication: local task branch only; migration publication is recorded in its own task.
- Last verified: full integration and independent review passed on 2026-10-28; remote CI and deployment remain pending.
