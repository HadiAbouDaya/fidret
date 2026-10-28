# Patch the package-manager installer

- Status: done
- Human owner: Hadi Abou Daya
- Agent or harness: Codex
- Branch: hadi/pnpm-security
- Updated: 2026-10-28
- Verification status: passed

## Purpose

Apply actual vendor installer fixes discovered during the [continuing improvement session](2026-10-28-project-hardening.md), supporting reproducible and reliable agent setup. The initial pnpm 11.1.2 pin falls inside documented affected ranges; exact pins require current advisory review as well as repeatable builds.

## Scope

Upgrade to a verified patched stable release within pnpm 11, preserve Node 24.22.1, strict engines, managed runtime and project-local stores. Use a coherent mature Astro baseline where the newer installer enforces release age against freshly published locked packages. Update current toolchain instructions and test ordinary-Node bootstrap, frozen installation and the full release gate. No exploit replay, compromise claim, account setting or application architecture change.

## Execution boundaries

- Authorization: Hadi's stack migration and continuing research/implementation/PR/merge/live-check request; this is ordinary maintenance under [decision 0009](../decisions/0009-reviewed-maintenance.md).
- Worktrees: root integrates/docs in `fidret-pnpm`; implementation in a separate `fidret-pnpm-code` worktree.
- Dependencies: actual main `9dadc41` contains the Node 24.22.1 security patch and maintenance procedure; policy/prototype tasks remain separate and will be integrated from actual main before publication.
- Coordination: worker owns package.json, any deliberate lock/workspace compatibility changes and directly affected runtime tests. Root owns current docs/task/register, independent review and publication. Preserve other branches' intent.

## Plan

1. Read official affected/patched ranges and verify the selected same-major stable release.
2. Synchronize package-manager/engine pins and install with the intended manager; review any lock/config changes rather than relaxing checks.
3. Verify frozen/cold bootstrap, runtime selection and full checks, then independently review, publish/merge and verify production.

## Acceptance criteria

- Project uses a verified stable pnpm 11 release above the checked advisory patch floors.
- Exact package-manager/engine agreement and Node runtime remain coherent; application version changes are limited to the reviewed mature Astro set needed for the intact settling policy.
- Frozen installation and full checks pass; cold setup starts on the supported ordinary launcher without global configuration writes.
- Current instructions reflect the new pin; historical evidence retains versions actually tested.
- Evidence distinguishes the bounded vendor-advisory review from a full transitive audit and records CI/merge/deployment separately.

## Decisions

Maintain the accepted stack and active reviewed-maintenance convention. Prefer the patched current pnpm 11 line over a new major without a demonstrated requirement. No broader claim of vulnerability absence or compromise is made.

## Verification

- On 2026-10-28, `pnpm audit --json` exited 1 with `fetch failed`; no advisory report was obtained. Direct official advisory review was used for specific package-manager findings, not as a complete replacement audit.
- Official [tarball manifest traversal advisory](https://github.com/pnpm/pnpm/security/advisories/GHSA-vq4v-j7r6-jq4m), [virtual-store traversal advisory](https://github.com/pnpm/pnpm/security/advisories/GHSA-c59q-g84q-2gj5) and [proxy placeholder advisory](https://github.com/pnpm/pnpm/security/advisories/GHSA-vx52-2968-3vc6) list pnpm 11 before 11.11.0 as affected and 11.11.0+ as patched. [Build-approval identity advisory](https://github.com/pnpm/pnpm/security/advisories/GHSA-5wx6-mg75-v57r) is patched in 11.5.3+. These concern installation/configuration exposure; no malicious dependency or compromise was observed here.
- Official [11.28.9 release](https://github.com/pnpm/pnpm/releases/tag/v11.28.9) is stable, published 2026-10-27 and the highest stable 11.x tag observed on 2026-10-28. It is above the checked patch floors and includes an additional registry-response dependency fix. Major 12 was available but is outside this same-major maintenance scope.
- Both manifest pins agree on 11.28.9 and Node remains 24.22.1. An added runtime assertion checks the actual launching manager's user-agent metadata; a direct negative probe correctly rejects missing manager metadata.
- The machine's launcher is a Corepack shim. Preparing the uncached manager with project-local `COREPACK_HOME` failed on registry DNS (`EAI_AGAIN`) before installation. An escalated download attempt was automatically rejected because this harness disables sandbox approval; no global cache/configuration writes or policy bypass were used. Local new-manager installation and full checks are unverified.
- Both existing CI jobs now set `COREPACK_HOME` inside the workspace; README/runbook instructions use the same project-local cache export. Independent source review found no blocker. Authorized CI will establish cold Node-22 bootstrap, exact manager/runtime execution, frozen lock compatibility and the full gate before merge.
- Actual public-policy main `a7ba607` was integrated without application conflicts. The prior full checks on unchanged application/runtime inputs remain historical evidence, not a claim of new-manager execution.
- Initial new-manager [PR CI](https://github.com/HadiAbouDaya/fidret/actions/runs/40730370243) and [push CI](https://github.com/HadiAbouDaya/fidret/actions/runs/40730360141) successfully downloaded/executed 11.28.9 but failed frozen installation because five Astro lock entries had been published at 14:48 UTC that day, inside the 24-hour release-age window. No gate was disabled.
- Compatibility scope was narrowed to the mature 2026-10-21 set: Astro 7.4.2, markdown-remark 7.3.4, markdown-satteri 0.4.5, Prism 4.1.1 and telemetry 3.4.1. Official [Astro release](https://github.com/withastro/astro/releases/tag/astro%407.4.2), [remark release](https://github.com/withastro/astro/releases/tag/%40astrojs%2Fmarkdown-remark%407.3.4), published registry metadata and pinned API source were reviewed. Current unified processor/hooks remain supported; configured syntax highlighting is disabled, so the newer Prism-rendering patch path is unused. Reviewed core advisory patch floors are below the selected Astro version; this is a bounded review, not a full transitive audit.
- Lock resolution used the available cached 11.1.2 only in an isolated lock-only fixture with the canonical lockfile as input and unchanged age defaults. Exactly five related package/snapshot records changed; every shared record, including Node archive integrity, stayed byte-identical. Target project manager remains 11.28.9. The settling policy is now explicit at 1440 minutes with no exclusions; CI must verify the final lock and actual new-manager pipeline.
- The independently checked synthetic prototype from actual main `d0bfa94` was integrated; final CI covers its 17 tests alongside the publication gate. Final cold/frozen/full checks remain pending the updated PR head.
- Final head `9d44075` passed both jobs in [push CI](https://github.com/HadiAbouDaya/fidret/actions/runs/40732147851) and [PR CI](https://github.com/HadiAbouDaya/fidret/actions/runs/40732158924). Logs confirm cold Corepack preparation of 11.28.9, successful frozen installation, ordinary Node-22 bootstrap with managed 24.22.1, exact manager assertions, intact age policy, zero Astro diagnostics, 34 Node cases, 78 Python cases and valid static output. This supersedes the pending-CI checkpoint above; local uncached download remains unverified in this harness.
- [PR 15](https://github.com/HadiAbouDaya/fidret/pull/15) merged as `603c4dea98993d291ac9d0d8829027f4452f3be9`. Production `19b5429a-4766-407f-ab00-16aa9ac03842` succeeded for that exact commit in 4m15s. Visible logs confirm Node 24.22.1, pnpm 11.28.9 and Astro 7.4.2. Live homepage/fonts/external CSS loaded with zero scripts or inline styles and unchanged geometry.

## Handoff

- Checkpoint: patched manager and mature compatible Astro baseline delivered through independent review, verified cold/frozen CI, merged PR and actual production deployment; release-age policy retained.
- Remaining work: none for this release; a full transitive advisory audit remains unverified after its network failure.
- Next action: follow the maintenance guide for future updates; use the project-local Corepack cache and retain exact pins/settling checks.
- Blockers: none for delivery. This harness's uncached local manager download remains unavailable; CI and production established actual execution without an escalation or policy bypass.
- Acceptance basis: Hadi's explicit continuing-work authorization and established maintenance procedure; no other contributor review is inferred.
- Publication: PR 15 merged as `603c4de`; production `19b5429a` verified successful. Historical failed CI and final passing evidence are retained above.
- Last verified: official source review, exact final CI execution and actual production deployment checked on 2026-10-28; no local-download or full-audit success is inferred.
