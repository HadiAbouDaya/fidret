# Search readiness audit and improvements

4 November 2026. Owner: Hadi Abou Daya. [Task and release evidence](../tasks/2026-11-04-seo-geo.md). This is a bounded technical/content review, not a ranking or AI-citation score.

## Starting observations

The live crawl found 18 sitemap URLs returning HTTP 200, unique head titles/descriptions, matching self-canonicals and one H1. All were reachable from Home within three link transitions. Unknown paths and `/AGENTS.md` returned genuine 404s. HTTPS, strict CSP and local fingerprinted styles/fonts were present. No missing image dimensions or alt attributes were found in this crawl. These observations do not establish actual search-engine indexing.

The source checkout contained the guided Lab experience in PR 38, while production still served the preceding reader interface. PR 38 passed CI/review-state inspection and was merged before this SEO branch; this was publication drift, not a broken link on the older live site.

There was no structured-data graph, article-specific Open Graph type, social preview image or optional `llms.txt`. Newer guided/notes templates omitted visible edition dates. The output checker protected the homepage canonical specifically, without equivalent search-contract coverage across all routes. GitHub `main` was unprotected with no rulesets or required checks.

## Implemented improvements

| Finding | Change | Evidence boundary |
| --- | --- | --- |
| Incomplete entity/page identity | Shared Organization/WebSite, page/profile, breadcrumb and authored Article graph | Actual public identity only; no invented credentials, offers, locations or ratings |
| Generic article previews | Article type/edition metadata, truthful branded 1200 × 630 raster preview and social descriptions | A preview is not a promise of a rich result |
| Missing visible edition dates | Actual source dates on guided Lab entries and factory notes | No build-time freshness stamping |
| Unclear homepage search title | Descriptive developing Physical AI practice in the title | Public mission and developing status preserved |
| Optional AI directory absent | Generated canonical company/Lab/source/engineering companion directory | Published-only; not used by Google Search or required for AI eligibility |
| Narrow metadata validation | New independent SEO validator covering all generated indexable HTML and discovery | Objective contracts, not taste, claim truth or ranking performance |
| Potential schema/security conflict | Exact inert JSON-data exception and safe serialization | Executable Lab module count/scope/source/CSP protections retained |
| Merge checks bypassable | Actual GitHub required checks, strict current-head PRs and administrator enforcement | Host settings directly read back; JSON/YAML alone is not enforcement |
| Future regression risk | Shared project skill, canonical rules, PR review prompt, failure fixtures and common build gate | Human content/evidence review still needed |

The independent implementation review reproduced malformed metadata placement/attributes, wrong sitemap namespaces, changed stable entity types and a social-image path escaping public output. Each received a concrete fix and failure fixture. Schema tests also cover author/date agreement, missing references, hostile script-termination text, disguised executable code, source publication/withdrawal and duplicate/missing sitemap destinations.

## External observations and follow-ups

- User-agent probes for Googlebot, bingbot, OAI-SearchBot, PerplexityBot and Claude-SearchBot returned HTTP 200 on Home. These were spoofed-UA requests, not tests from genuine crawler networks or proof of every Cloudflare edge setting.
- PageSpeed API returned HTTP 429 for Home and the largest farm route. No field Core Web Vitals, Lighthouse/PSI score or 75th-percentile pass is claimed. Local responsive/browser checks establish a different property.
- Search Console and Bing Webmaster Tools indexing/performance data and Google's current generative-AI inclusion control were not verified in an owner account. Those remain measurement/account follow-ups, not missing code or invented property-verification tokens.
- `www.fidret.com` did not resolve (curl exit 6). Apex HTTPS and canonical consolidation worked. A www alias requires a separate DNS/hosting change; no domain setting was changed here.
- No paid SEO tool, analytics, IndexNow key, training-policy change, licensing policy or external brand outreach was introduced.

The [search standard](../collaboration/search-quality.md) retains checked primary references and future development requirements. The task owns exact local/remote/live results and publication status.
