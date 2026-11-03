# Website clarity and lasting design discipline

- Status: review
- Human owner: Hadi Abou Daya
- Agent or harness: Codex
- Branch: hadi/website-craft
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

## Handoff

- Checkpoint: three coherent implementation increments complete; final shared and local cross-browser checks passed. [PR #26](https://github.com/HadiAbouDaya/fidret/pull/26) is open.
- Remaining work: GitHub checks for the final documentation checkpoint, checked merge under standing authorization, then observe automatic production publication separately.
- Next action: inspect final PR checks and merge once successful; verify any resulting live publication before claiming it is deployed.
- Blockers: none; remote CI status must be confirmed.
- Acceptance basis: Hadi’s 2026-11-03 request and standing checked-publication/merge authorization; no Elie review asserted. [Decision 0012](../decisions/0012-website-craft.md) is active within this scope.
- Publication: branch `hadi/website-craft` pushed; PR #26 open, issue #25 linked. No merge or deployment from this task at this checkpoint. Final evidence update will be a normal additional commit.
- Last verified: 2026-11-03 local shared checks and final Chromium/WebKit sweep passed for `6dbd67d`; remaining task-document edits receive foundation/diff checks. Live site not yet verified against these changes.
