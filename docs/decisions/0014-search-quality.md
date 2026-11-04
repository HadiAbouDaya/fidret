# Search quality and enforceable PR contracts

- Status: active
- Date: 2026-11-04
- Human decision owner: Hadi Abou Daya
- Related task: [Search and AI-search foundations](../tasks/2026-11-04-seo-geo.md)
- Basis: Hadi explicitly requested SEO/GEO optimization, future-development skills/rules and checks before every PR merges

## Context

The site already serves meaningful HTML and canonical pages, but lacks structured entity metadata and a maintained search contract. CI runs on PRs, while direct inspection found `main` unprotected with no required checks. Execution and enforcement are different properties.

## Decision

Centralize metadata and truthful schema relationships in the existing static layout. Permit exactly inert `application/ld+json` data with safe serialization and JSON validation, independently of [decision 0013](0013-progressive-lab-experiences.md)'s one executable Lab module. Preserve CSP without `unsafe-inline`, unsafe handlers or arbitrary executable assets.

Add a generated published-only optional AI directory, descriptive social metadata and maintained article edition dates. Do not promise rankings, indexing, rich results or AI citations. The [search standard](../collaboration/search-quality.md) and [shared skill](../../skills/fidret-search/SKILL.md) own the operational guidance, informed by current primary sources rather than speculative GEO formulas.

Make the deterministic SEO/GEO validator part of the common build and every PR. The named `seo-geo` job summarizes the full `foundation` result with fail-closed dependency handling. Configure GitHub to require those and `runtime-bootstrap`, current-head/up-to-date PRs and administrator enforcement on main. Record actual host verification in the task; configuration prose does not prove enforcement.

## Consequences

Malformed metadata, broken identity/discovery and unverified changes cannot silently pass the intended merge path. A page's human value, truth, field performance and actual search visibility still require review and external evidence. A technical score is not an outcome measure. Account/domain verification and DNS changes remain distinct work.

## Alternatives considered

Workflow YAML alone leaves merges bypassable. Duplicating build jobs solely for a status name wastes resources. Broad inline-script permission would weaken security for no benefit. Keyword/word-count scores encourage generic content and do not establish search outcomes. A mandatory paid SEO service is unnecessary for these deterministic contracts.

## Review

Implemented within Hadi's requested scope. No joint review or agreement by Elie is inferred. Revisit when the audience, publishing model, crawler policy or runtime changes, retaining explicit evidence and permission boundaries.
