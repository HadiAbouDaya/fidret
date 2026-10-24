# Website deployment

Fidret's first website uses Cloudflare Workers Static Assets on the Free plan. The hosting decision and its cost boundaries are recorded in [decision 0003](../decisions/0003-free-static-hosting.md). Current setup and live verification are recorded in the [website task](../tasks/2026-10-24-static-website.md).

## Repository configuration

| Setting | Value |
| --- | --- |
| Public assets | `website/` only |
| Cloudflare configuration | Root `wrangler.json` |
| Worker name | `fidret` |
| Custom Domain | `fidret.com` |
| Production branch | `main` |
| Root directory in Cloudflare | Repository root |
| Build command | Empty; the static files need no compilation |
| Deploy command | `sh scripts/deploy.sh` |
| Account plan | Free |

The deploy script runs both validators and the unit suite, then uses pinned Wrangler `4.151.3`. It requires Python 3.12 or newer and a supported Node.js version, available in Cloudflare's [build image](https://developers.cloudflare.com/workers/ci-cd/builds/build-image/). The CLI pin was checked against the [official release](https://github.com/cloudflare/workers-sdk/releases/tag/wrangler%404.151.3).

There is no Worker script or application server. Do not change the asset directory to the repository root. Keep private or internal material outside `website/`.

## Local preview and checks

```sh
python3 -m http.server 8765 --bind 127.0.0.1 --directory website
```

Open `http://127.0.0.1:8765/`. In another terminal, from the repository root:

```sh
python3 scripts/check_foundation.py
python3 scripts/check_website.py
python3 -m unittest discover -s tests -v
```

Python's preview server does not apply Cloudflare's `_headers` or custom 404 routing. Verify those on the actual deployment. For a Wrangler preview, use `npx --yes wrangler@4.151.3 dev` with network access to obtain the CLI.

## Initial Cloudflare connection

1. In Workers & Pages, create an application from GitHub and select only `HadiAbouDaya/fidret` when granting repository access.
2. Use the settings above, with main as the production branch. Keep the Free plan and skip paid upgrades or optional services.
3. Confirm the deployment uses the checked-in configuration. Its Custom Domain route provisions fidret.com and its HTTPS certificate when the zone is active and there are no conflicting DNS records.
4. Verify the build log, deployed commit, homepage, CSS, favicon, custom 404 response, and security headers. Confirm internal paths such as `/AGENTS.md` return a 404.

The GitHub integration may need account-owner authorization. Never put API tokens in this repository. Use the integration's managed build authentication. The [official custom-domain guide](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/) describes DNS and certificate behavior.

## Changes after connection

Work on a task branch and review the website locally. Merge into main after GitHub checks pass. Cloudflare then runs the deploy script against that commit; only a successful command publishes the new version. Confirm the production deployment before reporting it live.

Preview deployments are optional and should stay off initially to conserve build minutes. A documentation change on main can trigger a deployment too; watch-path optimization can be added when there is a demonstrated need.

## Recovery

If checks fail, fix the source and push a new commit; the previous production version stays available when no deployment was performed. If a successful release needs reverting, revert its Git commit through a task branch, merge the revert, and verify the replacement deployment. For immediate recovery, use Cloudflare's deployment rollback, then reconcile main so the next build does not restore the unwanted version.
