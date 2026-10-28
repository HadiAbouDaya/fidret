# Reliable stylesheet delivery across releases

- Status: review
- Human owner: Hadi Abou Daya
- Agent or harness: Codex
- Branch: hadi/fingerprinted-styles
- Updated: 2026-10-28
- Verification status: passed

## Purpose

Make a new release reliably identify its own CSS while preserving the current design and [Trust earned](../foundation/charter.md). This addresses observed custom-domain caching rather than adding visitor features or unsupported claims.

## Scope

Use Astro's external fingerprinted CSS, one canonical editable source for each stylesheet and generated compatibility aliases for the existing public CSS URLs. Preserve strict CSP, zero visitor JavaScript, fonts, routes and current visuals. Update source-map/deployment instructions and verify actual builds, browser rendering, CI and live delivery.

## Execution boundaries

- Authorization: Hadi's continuing two-hour research, implementation, PR/merge and live-check request; existing automatic Pages deployment is authorized. No account/cache-rule setting change is included.
- Worktrees: root integrates/docs in `fidret-assets`; implementation uses `fidret-assets-code` on `hadi/fingerprinted-styles-code`.
- Dependencies: [Astro migration](2026-10-28-astro-migration.md) is merged and live. [Managed runtime](2026-10-28-managed-runtime.md) PR 10 merged as `1cd374b`; this branch integrated the actual merged main before publication.
- Coordination: worker owns canonical CSS moves, Astro/layout/integration configuration and real-build tests; root owns task records, architecture/deployment documentation, independent review and publication.

## Plan

1. Confirm cache behavior and primary Astro/Cloudflare documentation.
2. Import canonical CSS through Astro and generate legacy aliases from the same source after builds.
3. Prove real CSS changes produce new external URLs, aliases match source bytes and the static/security gate passes.
4. Compare actual rendering, review the diff, publish/merge after CI and verify production HTML/CSS.

## Acceptance criteria

- Generated HTML links content-fingerprinted same-origin CSS; no inline style or browser JavaScript is introduced.
- Meaningful CSS changes alter linked CSS identity; unchanged source remains deterministic.
- Existing `/styles.css` and `/lab.css` remain available as generated aliases without duplicate editable sources.
- Current pages, typography, navigation, focus and narrow-screen layout remain usable.
- Checks, independent review, CI, merge and live deployment are recorded with actual evidence.

## Decisions

This is a release-reliability implementation within accepted [decision 0007](../decisions/0007-static-website-growth.md) and active [publishing convention 0008](../decisions/0008-astro-publishing.md). It changes source ownership and asset identity, without changing hosting or public content.

## Verification

- Live audit on 2026-10-28: custom-domain `/styles.css` and `/lab.css` returned `public, max-age=14400, must-revalidate`; the exact deployment's `/styles.css` returned `public, max-age=0, must-revalidate` with the same ETag. The account-level cause is unverified; no current broken styling is claimed.
- Primary references checked 2026-10-28: [Astro CSS imports and ordering](https://docs.astro.build/en/guides/styling/), [Cloudflare cache behavior](https://developers.cloudflare.com/pages/configuration/serving-pages/#caching-and-performance) and [fingerprinted asset headers](https://developers.cloudflare.com/pages/configuration/headers/#configure-custom-browser-cache-behavior).
- Merging actual runtime main into the locally based task caused documentation-only conflicts in README and the task register because equivalent runtime source trees had different commit histories. Resolution preserved the runtime instructions and this task's canonical-CSS guidance/register entry. Foundation validation and diff whitespace checks passed after resolution; no application behavior changed in that merge.
- Canonical site/Lab CSS moved byte-for-byte to `src/styles/`. Native imports produce one shared external fingerprinted bundle on all three current pages; either source invalidates the shared bundle. A config-root/build-output-aware integration generates exact-byte legacy aliases and rejects duplicate editable public CSS sources.
- Worker `pnpm check` passed 32 Node cases, 42 Python cases, zero Astro diagnostics and public-output validation. Root independently passed the combined gate before final review corrections.
- Independent review found moved styles could follow a symlinked `src` ancestor and that trailing-slash `lstat` followed a linked styles directory. Root added `src` to recursive preflight, checked source ancestors without trailing slashes and added direct integration regression cases. Focused boundary/config tests passed four cases; final combined gate follows these corrections.
- Final root `pnpm check` after those corrections passed 33 Node cases, 42 Python cases, zero Astro errors/warnings/hints and static-output validation. Follow-up independent review found no remaining blocker.
- Actual browser review at 1704px compared live baseline with the production build: homepage hero bounds, font size, line height and color were identical; Manrope loaded, document width remained 1689px, and script/inline-style counts remained zero. Homepage, Lab navigation/current state and generated custom 404 were reviewed. This CSS-only move preserves source bytes; no new post-change mobile-emulation claim is made.

## Handoff

- Checkpoint: implementation, final combined checks, independent review and browser comparison passed.
- Remaining work: PR/CI/merge and production verification.
- Next action: publish the checked tree and verify remote CI before merging.
- Blockers: none requiring user input.
- Acceptance basis: Hadi's explicit continuous-work authorization; no Elie review or agreement is claimed.
- Publication: local task branch only.
- Last verified: final local gate, independent review and browser comparison passed on 2026-10-28; production delivery remains pending.
