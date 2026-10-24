# Free static website hosting

- Status: accepted
- Date: 2026-10-24
- Human decision owner: Hadi Abou Daya
- Related task: [Free static website](../tasks/2026-10-24-static-website.md)
- Basis: Hadi requested and authorized the cheapest automatic deployment setup after the Free plan recommendation

## Context

Fidret needs a first website on its registered domain with updates following merges to main. The initial content can be served as static files and needs no backend.

## Decision

Use Cloudflare Workers Static Assets on the Free plan and the native GitHub build integration with main as production. Publish only `website/`, configured in root `wrangler.json`. Keep the first site as HTML, CSS, and SVG with no runtime packages or scripts.

Use `sh scripts/deploy.sh` as the deployment command. It runs foundation, website, and unit checks before invoking a pinned Wrangler version. This gates deployment independently of the GitHub checks.

## Consequences

The initial site has no hosting subscription. Static asset requests and storage have no additional charge; builds use the Free plan allowance. The annual domain renewal remains an existing expense. Adding dynamic services or changing the account plan requires a separate decision.

Changes merged to main trigger a production build when the integration is connected. A successful deployment updates fidret.com. Website content stays separate from company working documents. Cloudflare account state and successful live deployment must be verified separately from committed configuration.

## Alternatives considered

Cloudflare Pages also supports free static hosting, but Cloudflare currently recommends Workers for new projects. A paid application host adds no necessary capability for this first site.

## Sources and review

Checked 2026-10-24: [Workers guidance](https://developers.cloudflare.com/workers/best-practices/workers-best-practices/), [static asset pricing](https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/), [build allowance](https://developers.cloudflare.com/workers/ci-cd/builds/limits-and-pricing/), and [build configuration](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/). Revisit when a concrete website requirement needs server execution or another service.
