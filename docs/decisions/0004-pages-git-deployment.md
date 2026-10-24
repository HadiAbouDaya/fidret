# Native Pages deployment for the free static site

- Status: active
- Date: 2026-10-24
- Human task owner: Hadi Abou Daya
- Related task: [Website deployment](../tasks/2026-10-24-static-website.md)
- Supersedes: [Initial Workers hosting implementation](0003-free-static-hosting.md)

## Context

Hadi authorized free static hosting, automatic updates from main, and then supplied the visual design brief. During setup, native Workers Builds offered to generate a user API token with broad account service permissions and Workers route access across every zone.

## Decision

Use Cloudflare Pages Free with its native Git integration for this static-only website. The existing GitHub app is restricted to the Fidret repository. This workflow does not require creating the broad user API token offered by Workers Builds.

Configure main as production, framework None, repository root, build command `sh scripts/check_deployment.sh`, and output `website`. Root `wrangler.json` declares `pages_build_output_dir`. Attach fidret.com through Pages Custom domains after the initial deployment. The [deployment guide](../collaboration/website-deployment.md) is the operational reference.

## Consequences

The hosting cost remains zero on the Free plan, within its limits. Pages currently includes 500 builds per month and unlimited static asset requests. There are no Functions, database, or application server. Domain renewal remains a separate existing cost.

Workers is still Cloudflare's recommended platform for new projects, but Pages remains suitable for this small static website and avoids the unnecessary build-token scope observed in the setup. Revisit if a concrete requirement needs a different runtime.

## Sources and review

Checked 2026-10-24: [Pages Git integration](https://developers.cloudflare.com/pages/get-started/git-integration/), [Free plan limits](https://developers.cloudflare.com/pages/platform/limits/), [static request pricing](https://developers.cloudflare.com/pages/functions/pricing/), and [Custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/). The active implementation is within the authorized free hosting task; no paid service is added.
