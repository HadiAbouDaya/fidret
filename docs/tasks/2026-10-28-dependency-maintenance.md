# Supported runtime and reviewed dependency maintenance

- Status: review
- Human owner: Hadi Abou Daya
- Agent or harness: Codex
- Branch: hadi/dependency-maintenance
- Updated: 2026-10-28
- Verification status: passed

## Purpose

Keep the reproducible stack maintained after the migration, supporting [reliable delivery](../foundation/charter.md). Exact pins need an explicit update path, and a current release review found a newer Node 24 security release than the initial migration pin.

## Scope

Upgrade project Node from 24.21.0 to the official 24.22.1 security release, synchronize runtime/version/engine pins and lockfile archive checksums, and establish reviewed weekly dependency/action update PRs. Document the manual synchronized Node/pnpm upgrade procedure and actual automation limits. Preserve public content, design and hosting.

## Execution boundaries

- Authorization: Hadi's explicit Node-update permission and continuing research, implementation, PR/merge and live-check request. No account, access, billing or auto-merge setting changes.
- Worktrees: root integrates/documentation in `fidret-maintenance`; code implementation used isolated `fidret-maintenance-code`.
- Dependencies: managed-runtime PR 10 merged as `1cd374b`; CSS work is independent and will be integrated from actual main before publication if it merges first.
- Coordination: root owns task/current-tooling documentation and publication. Implementation worker owns runtime pin files, package/lockfile, Dependabot configuration and directly affected runtime tests. Separate worktrees prevent concurrent edits.

## Plan

1. Check official release/support and Dependabot compatibility sources.
2. Update exact runtime pins/checksums and prove frozen bootstrap/full checks.
3. Add supported, bounded update PR configuration with no automatic merge.
4. Document review, synchronized pin maintenance, failures and live verification; publish/merge after CI.

## Acceptance criteria

- Node 24.22.1 executes project commands and all version declarations agree.
- Frozen installation uses verified archive integrity entries without changing existing application dependency versions.
- Dependency automation is supported for the actual pnpm lockfile and only opens reviewable PRs; no future successful bot run is claimed without evidence.
- Instructions distinguish automatic dependency proposals from manual synchronized Node/pnpm pin maintenance.
- Full checks, independent review, remote CI and production deployment are verified separately.

## Decisions

This maintains accepted [stack decision 0007](../decisions/0007-static-website-growth.md) and the project-managed runtime convention. It does not change application architecture or delegate approval to a bot.

## Verification

- Official [Node 24.22.1 release](https://nodejs.org/en/blog/release/v24.22.1), dated 2026-10-21, identifies it as an LTS security release with TLS/DNS/HTTP/crypto fixes. Checked 2026-10-28; no claim is made that the static visitor site was exploitable.
- [Node release policy](https://nodejs.org/en/about/previous-releases) lists Node 24 as LTS and recommends Active/Maintenance LTS for production applications.
- Primary Dependabot research checked 2026-10-28: [current supported ecosystems](https://docs.github.com/en/code-security/reference/supply-chain-security/supported-ecosystems-and-repositories), [configuration reference](https://docs.github.com/en/code-security/reference/supply-chain-security/dependabot-options-reference), [pnpm 11 support](https://github.com/dependabot/dependabot-core/issues/14794) and [devEngines support discussion](https://github.com/dependabot/dependabot-core/issues/13722). Current docs support pnpm 7–12; this is a single-document lockfile. Exact managed-runtime service behavior remains unverified until an actual bot run. Version PR limits are three npm/two Actions; security updates have a separate fixed limit of ten.
- Worker updated all runtime/version/engine declarations and only runtime importer/archive/snapshot lock data. Existing application dependency declarations and all non-runtime lock data were programmatically unchanged. All ten official archive integrity records matched release-page SHASUMS; the Linux x64 tar.gz SHA256 is `eb6728e77c576a35162c122c45ccadf224d89ff00abc8dae46cc2897c6002d7c`.
- Fresh isolated frozen bootstrap from ordinary Node 22.22 succeeded with strict engines; managed exec reported 24.22.1, both runtime tests passed and ordinary Node remained 22.22. One transient official-archive timeout recovered. Lockfile SHA256 remained `886407bf96710794be1eba52da812b22ea3178e23bd74f032090e0f09c8f8f12`.
- Worker full gate passed 30 Node cases, 42 Python cases, clean Astro diagnostics and static output. Actual CSS main `1b9cd61` was then merged into root integration; the task-register-only conflict preserved both registrations. Final combined gate and independent review follow.
- Root's separate ordinary frozen install succeeded in 28.7s; actual managed Node was 24.22.1 while ordinary Node stayed 22.22. Final combined `pnpm check` with the merged CSS work passed 33 Node cases, 42 Python cases, zero Astro diagnostics and static-output/foundation validation. Independent source review found no blocker and confirmed all non-runtime lock text remained byte-identical to actual CSS main.

## Handoff

- Checkpoint: coherent security update, weekly reviewed proposals and maintenance guide/decision implemented; independent review, fresh bootstrap and final combined checks passed.
- Remaining work: PR/CI/merge and production verification; the first actual Dependabot service run remains future evidence.
- Next action: publish the checked tree and verify both CI jobs before merging.
- Blockers: none requiring user input.
- Acceptance basis: Hadi's explicit Node-update and continuing autonomous-work authorization; no other contributor approval is inferred.
- Publication: local task branch only.
- Last verified: official sources, isolated/root bootstrap, independent review and final combined gate checked on 2026-10-28; remote delivery pending.
