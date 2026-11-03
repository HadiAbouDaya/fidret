# Website clarity and lasting design discipline

- Status: done
- Human owner: Hadi Abou Daya
- Agent or harness: Codex
- Branch: hadi/website-craft-release
- Updated: 2026-11-03
- Verification status: passed

- Issue: [#25](https://github.com/HadiAbouDaya/fidret/issues/25)

## Purpose

Remove generic UI and copy patterns so a reader can understand Fidret, inspect its actual work and judge its limits. Preserve the [charter](../foundation/charter.md) and established identity.

## Scope

Public company and Lab presentation, navigation, shared footer, em dashes in public output, and durable guidance in the canonical [design brief](../design/fidret-design-brief.md) and project skill. No new commercial claims, equipment behavior, dependencies or publishing architecture.

## Execution boundaries

- Authorized scope: Hadi requested incremental UI/UX refinement, em-dash removal and lasting rules. Standing contribution authorization covers checked branch publication and merge. No account or manual deployment changes.
- Worktree: existing clean `fidret` checkout, task branch above.
- Dependencies: [design language decision](../decisions/0010-evidence-design-language.md), [onsite knowledge convention](../decisions/0011-onsite-knowledge-and-evidence.md).
- Coordination: root agent owns all edits and integration. `design_audit` provides read-only review in this checkout; no parallel editing.

## Plan

1. Inventory public routes, review Hadi's three linked references, establish baseline and record findings.
2. Simplify Home and footer, then refine company/reading surfaces and verify each coherent increment.
3. Record shared rules and add a public-output em-dash guard with meaningful failure tests.
4. Review desktop/mobile/zoom/keyboard states, run shared checks and publish under standing authorization.

## Acceptance criteria

- Home names the developing Physical AI practice plainly and leads to actual work.
- Repeated slogans, decorative feature icons and marketing-sized shared footer are removed; other pages use descriptive headings and natural wrapping.
- Public prose, titles, accessible labels, sources and downloads contain no em dashes. Missing data has an explicit label.
- Shared guidance requires page-specific purpose, supportable claims, purposeful figures, clear actions and visual verification; CI enforces only objective text constraints.
- Existing routes, publication filtering, download bytes, native walkthrough controls and static/CSP contracts remain valid.
- Shared checks pass, visual evidence and limitations are recorded, and publication status is explicit.

## Findings and increments

Second increment: descriptive headings and natural wraps across company, Lab, method, contributor and planning pages; Lab writing now precedes the larger exploration feature; consistent title separators/source labels and explicit missing-data labels. The article update date records source-label edits, without changing technical claims.

Initial source audit: generic Home h1, repeated mission fragments, redundant purpose section/hero footnote, three decorative icon questions, oversized site-wide footer, forced heading breaks, slogan-heavy secondary pages. The existing palette, self-hosted typography, source-backed writing and fixed signal model are useful foundations to retain.

## Decisions

[Decision 0012](../decisions/0012-website-craft.md) records the active craft convention under Hadi’s explicit request. Keep the accepted identity and static architecture; adapt the references into Fidret’s existing shared system instead of installing competing rule systems.

## Verification

2026-11-03, source checkpoints `08ecc7b`, `ecc40d3`, `6dbd67d`:

- Baseline and final `pnpm check` passed with the pinned Node 24.22.1/pnpm 11.28.9. Final result: Astro 0 errors/warnings/hints, 41 Node tests and 88 Python tests; real site build and public-output validation passed. Bootstrap recovered from a transient runtime-archive timeout. No dependency or lockfile changes.
- New failure tests cover literal/entity-encoded em dashes in text, titles, alt labels, SVG and Markdown, CSS generated text/hex escapes and missing keyboard skip destinations. Normal punctuation passes. `git diff --check` passed.
- Local headless Chromium and WebKit passed 104 route/browser/viewport combinations: all 13 current HTML routes at 1440, 768, 390 and 320 CSS px. No page-level horizontal overflow, browser JavaScript or page errors. Wide technical diagrams/tables retain their own horizontal access.
- Both engines passed keyboard selection through all five signal moments with the correct visible state/value withholding, native brief disclosure and checkbox activation, and skip-link focus moving to `main`. Home, Lab, Approach and the workflow brief also passed 200% root-text enlargement at 390 px. These are automated local browser checks, not real-device or assistive-technology certification.
- Manually inspected before/after Home at desktop/phone sizes, final Home/Lab/Approach desktop composition, and phone reading surfaces including article, project, charter, contributor, sources, method, brief, exploration and 404. Removed tiny nonessential SVG labels and allowed the Home caption its full width. No detector score is claimed.
- An isolated build with the only article withdrawn rendered the Lab empty state at 390 px, omitted withdrawn-article links and kept the exploration reachable. This changed no canonical publication status.
- Direct local download returned HTTP 200, `text/markdown`, exactly 6,498 bytes matching built output; SHA-256 `862e91395a57011c3adc4b140c6a8c42c982b209227f757e6fe7ce1f050dbe26`. No em dash present.
- Independent read-only source review corrected Home recovery wording, an unconditional article-specific Lab intro and CSS-generated-text guard coverage. Rendered QA found and corrected the existing skip-link focus defect.

Local screenshots, fixture paths and detailed browser results remain ignored scratch artifacts. This summary is the portable evidence. Early QA harness retries addressed a mismatched WebKit executable path and a legitimate HTTP 304 cache response; the final sweep used the installed WebKit runtime and unique verification URLs and passed. No browser/download settings or live content were changed for testing.

## Remote publication

On 2026-11-03, GitHub directly confirmed final PR head `b2849c31f9c57c8d7e6f4c921210888affcc7532` passed both `foundation` and `runtime-bootstrap` in [run 41627849959](https://github.com/HadiAbouDaya/fidret/actions/runs/41627849959). There were no discussion comments, submitted reviews or review threads. [PR #26](https://github.com/HadiAbouDaya/fidret/pull/26) merged under the standing authorization as `fa9feb0939ff5c43abc4613a0d53ac634e0fae91`. The same jobs passed on `main` in [run 41632173624](https://github.com/HadiAbouDaya/fidret/actions/runs/41632173624); the merged checkout also passed `pnpm check` locally (41 Node tests, 88 Python tests, Astro zero diagnostics).

T3's watcher twice stopped after repeated host-read failures. Direct GitHub reads worked; the watcher failure did not represent a CI failure. The PR is now merged, so further work concerns automatic production publication rather than waiting for that PR.

Cloudflare Pages deployment `6c5af99b-4bd1-4ca1-b8ad-13642e640876` completed successfully for `fa9feb0`. GitHub’s Cloudflare check supplied the immutable [deployment URL](https://6c5af99b.fidret.pages.dev). At 12:05 UTC on 2026-11-03, direct HTTPS verification of `fidret.com` found exact byte parity with the merged build on all 12 published content routes and their six linked fingerprinted stylesheets. No public HTML contained an em dash after entity decoding. The Markdown download matched the recorded 6,498 bytes/hash; an unknown URL returned the custom 404 with the static CSP, referrer, permissions and content-type headers intact. No manual deployment or account change was made.

The website outcome is complete under the request and standing authorization. This documentation-only release checkpoint records the observed result without changing any public asset.

## Handoff

- Checkpoint: UI/copy improvements and lasting rules merged in PR #26 as `fa9feb0`, checked and verified live on `fidret.com`.
- Remaining work: no website acceptance criteria remain. Publish and merge this documentation-only release checkpoint through the normal checked PR workflow.
- Next action: merge the release-record PR once its checks pass; any further website change belongs in a new task.
- Blockers: none.
- Acceptance basis: Hadi’s 2026-11-03 request and standing checked-publication/merge authorization; verified completion under that authority. No Elie review asserted. Decision 0012 is active within this scope.
- Publication: PR #26 merged and issue #25 closed. Automatic production deployment for `fa9feb0` succeeded and live output matched. Release evidence is on `hadi/website-craft-release`; its own PR/merge state is available from GitHub and Git. This checkpoint adds no public-output changes.
- Last verified: 2026-11-03 12:05 UTC, direct GitHub CI/deployment evidence and live HTML/CSS/download parity. Merged-checkout `pnpm check` passed (41 Node tests, 88 Python tests, Astro zero diagnostics); release documentation passes foundation/diff checks.
