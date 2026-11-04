---
name: fidret-search
description: Optimize or review Fidret public pages for search and AI-search discovery; preserve canonical metadata, truthful schema, readable HTML and mandatory PR checks.
---

# Fidret search and AI discovery

Read [AGENTS.md](../../AGENTS.md) and the [search standard](../../docs/collaboration/search-quality.md). Use this skill for public pages, Lab publishing, metadata, redirects, assets, crawler policy and related build/CI changes. The [charter](../../docs/foundation/charter.md) and current [design skill](../fidret-design/SKILL.md) remain authoritative for claims and presentation.

Start with the reader's question and the canonical source. Keep a direct explanation, meaningful headings, actual bylines, maintained edition dates, primary citations and explicit conditions/limits. Preserve the distinction between an exploration, a developing practice and demonstrated work. Do not add invented expertise, reviews, clients, addresses, offers, external identity links or keyword repetitions.

Use `src/layouts/SiteLayout.astro` and `src/lib/seo.ts` for shared metadata. An authored article supplies actual headline/authors/edition dates; the visible page must agree. Companion pages have their own canonical identity. Preserve stable URLs. Update publication/discovery tests when adding or withdrawing routes, including optional `llms.txt`. Never use build time as editorial freshness.

Keep meaningful content and ordinary links in initial HTML. The narrowly approved Lab controller is progressive enhancement; do not hide the only answer behind browser execution. Retain local assets, dimensions, font budgets, accessible controls and the existing craft/em-dash rules.

For an interactive explanation, keep its worked starting examples, actual model response, scope and direct engineering references in readable HTML. An inert outcome manifest is application data, not a substitute for explanatory prose. Preserve one canonical page identity while versioned URL fragments carry optional experiment settings. Context/condition query strings must not create new sitemap entries, inconsistent canonicals or invented editorial freshness. Verify the exact setting round trip as well as initial metadata. Refine the interface for the reader; do not flatten a useful model into keyword-heavy prose for a crawler.

Structured data is inert JSON, serialized through the safe helper. It cannot grant an inline executable-script exception or justify relaxing CSP. Keep the validator's malicious-data tests. Match markup to visible, factual content rather than adding schema solely to attract a rich result.

Run `pnpm check`, which includes `scripts/check_seo.py` and its failure tests. Inspect rendered pages when presentation changes. Before merging, confirm the current head's `foundation`, `runtime-bootstrap` and `seo-geo` checks pass, with no unresolved review feedback. Follow the repository's documented merge protection, rather than treating workflow YAML as enforcement.

Verify live status, canonical, sitemap, schema, discovery and changed assets after publication. Report actual indexing, field Core Web Vitals and AI citations only with account/service evidence. No local test establishes rankings or citations. Consult current primary sources linked in the search standard for changing crawler policies or search features; do not use fixed passage-length, keyword-density or synthetic GEO scores.
