# Protect the existing public release policy

- Status: review
- Human owner: Hadi Abou Daya
- Agent or harness: Codex
- Branch: hadi/publication-contracts
- Updated: 2026-10-28
- Verification status: passed

## Purpose

Make the release gate protect the existing static security and indexing policy, supporting [trustworthy delivery](../foundation/charter.md). An audit demonstrated that required files could exist while the documented protections were absent.

## Scope

Validate the existing global security headers in generated output, including Cloudflare scoped-removal/override behavior; reject accidental indexing suppression on intended public pages while preserving the custom 404's noindex. Add meaningful regression fixtures and keep cache directives independent. Do not introduce a new public policy or account setting.

## Execution boundaries

- Authorization: Hadi's continuing research, implementation, PR/merge and live-check request within the existing static-site purpose.
- Worktrees: root integrates/docs in `fidret-contracts`; implementation uses `fidret-contracts-code`.
- Dependencies: starts from actual runtime main `1cd374b`; CSS and maintenance work are independent and will be integrated before publication.
- Coordination: implementation worker owns only `scripts/check_website.py` and `tests/test_website.py`. Root owns task/current documentation, final integration, independent review and publication. Another worker owns CSS/headers in its own task; preserve its cache-rule intent.

## Plan

1. Preserve the disposable-fixture audit evidence and check Cloudflare rule semantics.
2. Validate the current four protected global headers and reject protected-header detach/duplicate/scoped definitions.
3. Protect intended public indexing without changing 404 behavior.
4. Exercise positive and negative output fixtures, run combined checks, review and deliver through CI/merge/live verification.

## Acceptance criteria

- Empty, missing, weakened or wrongly scoped current security policies fail the gate with actionable errors.
- Scoped protected-header removal/override and duplicates cannot silently bypass validation.
- Existing and fingerprinted CSS Cache-Control rules remain valid.
- Accidental public-page noindex fails; the current 404 noindex remains valid.
- Real output passes, negative tests demonstrate the guarded failures, and delivery evidence distinguishes checks, merge and live state.

## Decisions

This enforces the current static build/publication convention in [decision 0008](../decisions/0008-astro-publishing.md); it does not change the approved CSP or public search intent.

## Verification

- Read-only audit on 2026-10-28 copied actual runtime output and wrangler config into disposable fixtures. Current headers, an empty header file, removed CSP, weakened `default-src *`, and a global block narrowed to `/not-used/*` each incorrectly returned zero validation errors. Injecting homepage robots noindex also returned zero errors. Actual deployed protections remained intact.
- [Cloudflare header documentation](https://developers.cloudflare.com/pages/configuration/headers/#detach-a-header) describes combined matching rules and scoped `! Header-Name` removal, so finding a correct global substring is insufficient.
- Validator now checks the four existing global protected headers, an order-independent exact approved CSP map and browser-compatible ASCII policy syntax. It rejects protected removals, scoped overrides and duplicates while allowing independent cache rules.
- Independent review demonstrated additional parser differences: invalid Permissions-Policy whitespace, Unicode CSP separators, last-wins duplicate HTML attributes, crawler-specific and X-Robots noindex bypasses, and a false positive on `max-image-preview: none`. The follow-up corrects them with regression fixtures and preserves browser first-wins attribute handling.
- Indexing protection covers explicit noindex/none directives in recognized robots/googlebot/googlebot-news/bingbot metadata and X-Robots-Tag rules, with the literal `/404.html` exception. It is a bounded invariant checker, not a complete Cloudflare matcher/crawler emulator or platform-limit validator. Actual deployment still requires live verification.
- Worker and root Python discovery passed 61 tests, including 28 website tests. Independent follow-up review ran the website suite and fresh bypass probes and found no remaining blocker within this contract. Current actual header source and immutable cache blocks pass. Final combined gate follows dependency installation.
- Root final `pnpm check` passed 33 Node cases, 61 Python cases, zero Astro diagnostics, foundation validation and actual static-output checks on the merged Node/CSS main. The frozen install recovered official-archive timeouts and completed without relaxing policy.
- Parsing references checked by review: [CSP serialized-policy grammar](https://www.w3.org/TR/CSP3/#parse-serialized-policy), [structured-field dictionary grammar](https://www.rfc-editor.org/rfc/rfc8941.html#section-3.2) and [Google robots directives](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag).

## Handoff

- Checkpoint: demonstrated guard gaps and review findings corrected; final combined gate and independent review passed. Actual Node security-update main `9dadc41` integrated; task-register conflicts preserved all registrations.
- Remaining work: PR/CI/merge and production verification.
- Next action: publish the checked tree and verify both CI jobs before merging.
- Blockers: none requiring user input.
- Acceptance basis: Hadi's continuing autonomous-work authorization and existing documented release policy; no new policy approval is inferred.
- Publication: local task branch only.
- Last verified: final combined gate, 61 Python cases and independent follow-up review passed on 2026-10-28; remote delivery pending.
