# Patch the package-manager installer

- Status: active
- Human owner: Hadi Abou Daya
- Agent or harness: Codex
- Branch: hadi/pnpm-security
- Updated: 2026-10-28
- Verification status: partial

## Purpose

Apply actual vendor installer fixes discovered during the [continuing improvement session](2026-10-28-project-hardening.md), supporting reproducible and reliable agent setup. The initial pnpm 11.1.2 pin falls inside documented affected ranges; exact pins require current advisory review as well as repeatable builds.

## Scope

Upgrade to a verified patched stable release within pnpm 11, preserve Node 24.22.1, application dependency versions, strict engines, managed runtime and project-local stores. Update current toolchain instructions and test ordinary-Node bootstrap, frozen installation and the full release gate. No exploit replay, compromise claim, account setting or application architecture change.

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
- Exact package-manager/engine agreement, Node runtime pin and all existing application dependency versions remain coherent.
- Frozen installation and full checks pass; cold setup starts on the supported ordinary launcher without global configuration writes.
- Current instructions reflect the new pin; historical evidence retains versions actually tested.
- Evidence distinguishes the bounded vendor-advisory review from a full transitive audit and records CI/merge/deployment separately.

## Decisions

Maintain the accepted stack and active reviewed-maintenance convention. Prefer the patched current pnpm 11 line over a new major without a demonstrated requirement. No broader claim of vulnerability absence or compromise is made.

## Verification

- On 2026-10-28, `pnpm audit --json` exited 1 with `fetch failed`; no advisory report was obtained. Direct official advisory review was used for specific package-manager findings, not as a complete replacement audit.
- Official [tarball manifest traversal advisory](https://github.com/pnpm/pnpm/security/advisories/GHSA-vq4v-j7r6-jq4m), [virtual-store traversal advisory](https://github.com/pnpm/pnpm/security/advisories/GHSA-c59q-g84q-2gj5) and [proxy placeholder advisory](https://github.com/pnpm/pnpm/security/advisories/GHSA-vx52-2968-3vc6) list pnpm 11 before 11.11.0 as affected and 11.11.0+ as patched. [Build-approval identity advisory](https://github.com/pnpm/pnpm/security/advisories/GHSA-5wx6-mg75-v57r) is patched in 11.5.3+. These concern installation/configuration exposure; no malicious dependency or compromise was observed here.
- Official [11.28.9 release](https://github.com/pnpm/pnpm/releases/tag/v11.28.9) is stable, published 2026-10-27 and the highest stable 11.x tag observed on 2026-10-28. It is above the checked patch floors and includes an additional registry-response dependency fix. Major 12 was available but is outside this same-major maintenance scope.
- Both manifest pins now agree on 11.28.9. Node 24.22.1, application dependencies, lockfile and workspace policies are unchanged. An added runtime assertion checks the actual launching manager's user-agent metadata; a direct negative probe correctly rejects missing manager metadata.
- The machine's launcher is a Corepack shim. Preparing the uncached manager with project-local `COREPACK_HOME` failed on registry DNS (`EAI_AGAIN`) before installation. An escalated download attempt was automatically rejected because this harness disables sandbox approval; no global cache/configuration writes or policy bypass were used. Local new-manager installation and full checks are unverified.
- Both existing CI jobs now set `COREPACK_HOME` inside the workspace; README/runbook instructions use the same project-local cache export. Independent source review found no blocker. Authorized CI will establish cold Node-22 bootstrap, exact manager/runtime execution, frozen lock compatibility and the full gate before merge.
- Actual public-policy main `a7ba607` was integrated without application conflicts. The prior full checks on unchanged application/runtime inputs remain historical evidence, not a claim of new-manager execution.

## Handoff

- Checkpoint: patched pins, actual-manager assertion and local Corepack-cache setup implemented; source review passed. Local download is blocked by harness networking, so CI verification is required before merge.
- Remaining work: cold/frozen/new-manager full checks in CI, merge and actual production verification.
- Next action: publish this reviewable checkpoint and inspect both CI jobs; correct any compatibility failure rather than relaxing checks.
- Blockers: local uncached manager download is unavailable in this harness; the existing authorized CI environment is the verification path and needs no user input.
- Acceptance basis: Hadi's explicit continuing-work authorization and established maintenance procedure; no other contributor review is inferred.
- Publication: local task branch only.
- Last verified: official release/advisory ranges, coherent source pins, syntax/diff checks and independent review checked on 2026-10-28; actual new-manager execution remains pending CI.
