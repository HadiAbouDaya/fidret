# Search and AI-search quality

The public website should help people and crawlers understand Fidret's purpose and inspect its work. This standard applies to every public-page/content/template change. [Decision 0014](../decisions/0014-search-quality.md) records its basis; use the [project skill](../../skills/fidret-search/SKILL.md) during implementation. It complements the design/craft and evidence rules, without replacing them.

## Editorial and technical contracts

- Give each indexable page one descriptive head title, meaningful H1, unique description and exact HTTPS canonical. Keep companion pages distinct, with useful ordinary navigation and no orphaned routes. Error pages remain noindex and outside the sitemap.
- Use shared metadata and the actual social preview. Article authors, visible dates and structured metadata must agree with canonical publishing records. Never change an editorial date merely to imply freshness.
- Retain meaningful initial HTML and direct reference routes. Search readiness does not require removing justified progressive enhancement, but it does require content before execution and working fallback/navigation.
- Use truthful Organization/WebSite, page/profile, breadcrumb and Article relationships. Do not fabricate business proof, services, reviews, locations, credentials, authorship or external identity links. Structured data is not a ranking guarantee or a license to invent claims.
- Preserve public accessibility, no em dashes, image dimensions/alt, local fonts, responsive layouts, low asset cost and existing security. A schema graph is a validated inert data block, never executable inline code.
- Sitemap URLs exactly match indexable canonical HTML. Add `lastmod` only from a maintained editorial date with an actual relationship to that page; do not stamp every build. Published-only queries own Lab route/discovery lifecycle.
- Preserve intended search-crawler access to HTML and required assets. Search, user fetch and model training are different purposes. The current open wildcard robots policy remains unchanged; do not silently change training/licensing choices under an SEO task.
- `llms.txt` is an optional generated directory, not a search eligibility requirement or access-control file. Keep it concise, synchronized and free of drafts/private paths. Do not generate a second full editable copy of the site.

Write direct, self-contained explanations where they help the reader. Useful sources, original artifacts and honest limitations are preferable to repetitive FAQ blocks or unnatural query wording. Do not apply arbitrary “ideal citation length,” word-count, keyword-density or AI-visibility scores. Future content should answer genuine questions related to Fidret's work, rather than manufacture pages to cover search terms.

## Every-PR checks

`sh scripts/check_deployment.sh` runs the existing foundation/type/runtime/content/build/security tests plus `python3 scripts/check_seo.py` and Python regression fixtures. The new checker verifies all generated routes, metadata identity, schema references and visible article dates, real social-image destinations, exact sitemap coverage, search robots access, published AI discovery and link reachability. Failure fixtures cover both malformed inputs and lifecycle withdrawal.

The named `seo-geo` CI job is a fail-closed summary of `foundation`, which actually executes the full SEO/GEO build and tests. It runs under `always()` and succeeds only if the upstream job succeeds, avoiding a skipped-success result. No second installation/build is needed. Both jobs run on every PR, including documentation changes, without path exclusions. Runtime bootstrap remains independently checked.

GitHub protection must require the latest `foundation`, `runtime-bootstrap` and `seo-geo` statuses on `main`, a PR and an up-to-date branch. Administrators are included; no force push or deletion is enabled. A zero-approval PR rule permits the existing owner/agent workflow without inventing an available second human reviewer. Keep existing protections when changing settings. Verify actual host state after configuration. The [task](../tasks/2026-11-04-seo-geo.md) records dated settings evidence; this document alone does not establish enforcement.

Automated checks protect explicit contracts, not the truth of every sentence, design taste, legal compliance, actual indexing or field performance. The PR still records reader intent, content/evidence review, affected routes, changes to claims/dates and relevant render checks. Do not weaken a gate merely to pass; correct its cause or document an authorized contract change with a meaningful regression test.

## Evidence and measurement

Check production separately from local output and GitHub CI: HTTP status, canonical/schema, indexing directives, discovery, changed assets and exact downloads. Record commit, deployment identity and actual checks. A spoofed crawler user agent establishes only that request's response, not genuine infrastructure access.

Use verified Search Console/Bing Webmaster Tools data for indexing, impressions, search traffic and available AI citation reports. Use real field data for 75th-percentile Core Web Vitals (LCP, INP and CLS); a local lab run is a different measure. Explicitly verify Search Console’s current generative-AI inclusion setting and available generative-AI performance report in the owner’s account; repository checks cannot establish those controls. No account verification or private report was available in the initial audit. PageSpeed API returned 429. Follow up with the owner when access is available; do not invent a pass or create verification tokens.

## Primary references, checked 4 November 2026

- [Google's current generative-AI search guidance](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide): people-first discoverable content, no special AI files or citation-length tricks. Google does not use `llms.txt` for Search.
- [Google Article metadata](https://developers.google.com/search/docs/appearance/structured-data/article), [Organization](https://developers.google.com/search/docs/appearance/structured-data/organization) and [structured-data policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies): match factual visible content; eligibility does not guarantee display.
- [Google titles](https://developers.google.com/search/docs/appearance/title-link) and [sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap): descriptive titles, canonical destinations and accurate modification dates.
- [Bing Webmaster Guidelines](https://www.bing.com/webmasters/help/bing-webmaster-guidelines-30fba23a) and [AI Performance](https://blogs.bing.com/webmaster/2026/2/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview/): ordinary crawl/index quality and actual citation observations.
- [Anthropic crawler roles](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler), [Perplexity crawler roles](https://docs.perplexity.ai/docs/resources/perplexity-crawlers) and [OpenAI crawler roles](https://developers.openai.com/api/docs/bots): search crawlers are distinct from training/user-fetch agents. Recheck changing tokens before policy changes.
- [llms.txt proposal](https://llmstxt.org/): optional discovery assistance, not a universal search standard.
- [GitHub required-check behavior](https://docs.github.com/en/pull-requests/how-tos/merge-and-close-pull-requests/troubleshooting-required-status-checks) and [ruleset controls](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/available-rules-for-rulesets): host enforcement, current revisions and skipped-job behavior matter.
