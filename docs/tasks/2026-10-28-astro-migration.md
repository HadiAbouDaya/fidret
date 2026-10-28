# Static Astro and TypeScript migration

- Status: review
- Human owner: Hadi Abou Daya
- Agent or harness: Codex
- Branch: hadi/astro-migration
- Updated: 2026-10-28
- Verification status: passed

## Purpose

Hadi explicitly requested migration to the suggested frontend stack on 2026-10-28. Implement [decision 0007](../decisions/0007-static-website-growth.md) so the public company website and growing Lab have reusable layouts, typed content and a standard static build while preserving [Trust earned](../foundation/charter.md).

## Scope

Astro static pages, strict TypeScript, existing custom CSS/local fonts, validated Markdown Lab content, pinned Node/pnpm/dependencies, build/CI checks and current operating documentation. Preserve current design/copy, URLs, author credit, publishing boundaries and Cloudflare Pages Free. Make `website/` disposable generated output while keeping its existing hosting path and build command. Replace the Python page renderer and templates with Astro; retain Python repository/output validators where useful.

## Execution boundaries

- Authorized scope: Hadi's explicit stack-migration request, local validation, normal branch/PR publication and merge under standing authorization. His subsequent two-hour work request explicitly includes live-site verification and continuing delivery. Existing automatic Pages deployment can build from main using the same configured command/output; no hosting account, permission, domain or paid-plan change is part of this task.
- Worktree: `fidret-astro` on `hadi/astro-migration`.
- Dependencies: Node compatible with current Astro, reproducible package installation, accepted decision 0007 and existing website/Lab contracts.
- Coordination: root owns package/build/CI integration, Python validators, actual-build tests and this task record. `hadi/astro-pages` owns pages/layouts/components/public assets; `hadi/astro-content` owns content collections/schema/Markdown policy, template, CLI and their tests; `hadi/astro-docs` owns current repository instructions, architecture/publishing/deployment documentation and decisions. Each editing agent uses its own worktree; root integrates commits and verifies the combined result.

## Plan

1. Establish baseline and accepted architecture; pin the supported toolchain and dependencies.
2. Port company/Lab pages into shared Astro layouts and preserve public assets and URLs.
3. Move Lab authoring to validated Markdown with safe creation and explicit publishing rules; retain an empty real collection.
4. Replace rendering-specific tests with content and actual-build tests; adapt website/build gates to generated output.
5. Update all current agent/publishing/deployment instructions and source maps in the same change.
6. Run type/build/content/security checks, browser review and independent review, then publish/merge with exact evidence.

## Acceptance criteria

- Static Astro + strict TypeScript builds reproducibly from a frozen lockfile; no server adapter/backend or browser JavaScript is added without a need.
- Current pages, design, local assets, canonical routes, root sitemap, robots and custom 404 are preserved.
- Markdown collection enforces actual bylines, allowed kinds, valid/nonfuture UTC dates, complete published narrative, safe links/media/HTML and draft exclusion.
- Build output contains only public assets; internal records, drafts, registries and secrets remain outside it.
- Meaningful negative tests and actual Astro fixture builds cover publication, injection, routes/sitemap and withdrawal.
- Shared checks, type checks and CI pass; browser QA and any verification limits are recorded.
- A fresh agent can find the new source/build/publishing workflow without obsolete commands in current instructions.

## Decisions

Hadi accepted the suggested stack and authorized migration in this task. Update [0007](../decisions/0007-static-website-growth.md) to accepted with that basis. Existing hosting decision 0004 remains in force; record the new generated-output/content convention separately if needed to preserve the original Lab history.

## Verification

- Baseline `91bd5ffd1e931f1219fdfd1c8bf27bcc5fa25301`: shared checks passed; all 56 tests passed.
- Registry/docs checked 2026-10-28: initial Astro 7.4.2 metadata requires Node >=22.23.4. The installer reported stable patch releases Astro 7.4.3 and Markdown processor 7.3.5, now pinned with TypeScript 6.0.3 and pnpm 11.1.2. Node 24.21.0 is pinned for local/CI/Pages.
- Hadi authorized updating machine Node. The harness mounts `~/.nvm` read-only, so its default remains 22. Node 24.21 was installed from the npm registry into writable temporary storage and used for all migration builds/tests. Downloads used the existing pnpm launcher with a temporary engine-check override; actual type/build/test execution used Node 24.21, a writable temporary pnpm store and disabled telemetry. No global default or existing user configuration changed.
- `sh scripts/check_deployment.sh` passed: foundation 40 documents/7 tasks/3 adapters; Astro check 22 files, zero errors/warnings/hints; 28 Node cases and 42 Python cases passed; static homepage, Lab index, custom 404 and root sitemap built; output validation passed.
- Actual-build fixtures cover complete publication without client metrics, ordered bylines, draft exclusion, structured/Markdown images, escaped title/code, withdrawal, and rejection/recovery for incomplete narrative, active HTML and unknown authors. Fixtures stay temporary; the real collection remains empty.
- Independent review found and fixed duplicate-reference ambiguity, CLI replacement-token corruption, late filesystem preflight and source-registry symlink coverage. Image-bearing builds exposed SSR module relocation under `website/.prerender/chunks`; source lookup now uses the documented root-invoked command context. Regression cases or actual-build fixtures cover these fixes.
- Direct byte comparison to `91bd5ff` confirmed identical main CSS, headers, robots, favicon, fonts and licenses. Lab CSS adds Markdown prose selectors. `git diff --check` passed; generated `website/` is ignored and untracked.
- Browser review: homepage/Lab readable at 320px without horizontal overflow; fonts loaded; homepage reviewed at 1440px with matching observed baseline hero geometry. Custom 404 content/navigation, visible first-Tab skip-link focus and a warning/error-free preview console passed. Visitor scripts and inline styles were absent. Raw DevTools approval for the comparison origin was declined; review continued with read-only inspection and temporary preview tabs were closed.
- Remote CI, merge and live-deployment evidence are pending publication.

## Handoff

- Checkpoint: migration implemented and locally verified, with isolated page/content/docs worktrees, independent review and browser QA.
- Remaining work: publish the checked tree, verify remote CI, merge and verify Pages/live output. Project-managed runtime portability is being researched separately.
- Next action: publish the task branch and open a PR after the final diff/record check.
- Blockers: none requiring user input; use the working GitHub connector if shell Git DNS fails.
- Acceptance basis: Hadi's explicit 2026-10-28 migration request and existing publication/merge authorization; no Elie review is claimed.
- Publication: local task branch only; no migration push, merge or verified deployment yet.
- Last verified: integrated local checks and browser review passed on 2026-10-28; external delivery state is not yet claimed.
