# Website deployment

Fidret's website uses Cloudflare Pages Free with native GitHub deployment. [Decision 0004](../decisions/0004-pages-git-deployment.md) records the hosting choice. Follow the [design brief](../design/fidret-design-brief.md) for visual changes. Actual connection, deployment, and domain verification belong in the [website task](../tasks/2026-10-24-static-website.md); configuration alone does not establish that the site is live.

## Deployment configuration

| Setting | Value |
| --- | --- |
| Cloudflare product and plan | Pages, Free |
| Project name | `fidret` |
| GitHub repository | `HadiAbouDaya/fidret` |
| Production branch | `main` |
| Framework preset | None |
| Root directory | Repository root |
| Build command | `sh scripts/check_deployment.sh` |
| Build output directory | `website` |
| Custom domain | `fidret.com` |

Root `wrangler.json` declares `name: fidret`, `pages_build_output_dir: ./website`, and `compatibility_date: 2026-10-24`. There is no Worker script or Pages Functions directory. Publish only `website/`, which contains the public pages, assets, fonts, and their license notices. Keep internal repository documents outside that directory.

The build command runs both Python validators and the unit suite before Pages publishes the static files. No deployment CLI or user-created Cloudflare API token is needed for this Git-connected workflow. Restrict the Cloudflare GitHub App's repository access to `fidret`.

The [Pages Free build allowance](https://developers.cloudflare.com/pages/platform/limits/) is 500 builds per month, with one concurrent build. [Static asset requests are free and unlimited](https://developers.cloudflare.com/pages/functions/pricing/) when they do not invoke Functions. Keep the site static and avoid paid upgrades; domain renewal remains a separate annual expense.

## Local preview and checks

From the repository root:

```sh
python3 -m http.server 8765 --bind 127.0.0.1 --directory website
```

Open `http://127.0.0.1:8765/`. In another terminal:

```sh
sh scripts/check_deployment.sh
```

Python's preview server does not apply Cloudflare's `_headers` or custom 404 routing. Verify those on the deployed site. Review mobile and desktop layouts, text enlargement, navigation, keyboard focus, and font loading before publishing visual changes.

## Initial Cloudflare connection

1. In Workers & Pages, create a **Pages** project using Git integration. Connect GitHub and select `HadiAbouDaya/fidret`. If an installation prompt appears, select only this repository.
2. Apply the configuration above and start the first deployment. Keep the Free plan. Pages handles publication after the build command succeeds.
3. Verify the first production deployment, its associated commit, and its `pages.dev` URL. Then set automatic preview branch deployments to **None** in the project's branch controls to conserve the build allowance. Keep automatic production deployments enabled for `main`.
4. Open the project’s **Custom domains**, select **Set up a domain**, and add `fidret.com`. With the domain active as a Cloudflare zone, the setup creates its CNAME record and provisions HTTPS. Associate the domain with the Pages project through this flow rather than creating an unrelated DNS record.
5. Wait for the domain to become active. Verify the homepage, stylesheet, favicon, local fonts, 404 response, and security headers over HTTPS. Confirm internal paths such as `/AGENTS.md` return a 404, and record the deployed commit and results in the task.

Cloudflare documents [GitHub integration and repository access](https://developers.cloudflare.com/pages/configuration/git-integration/github-integration/), [branch controls](https://developers.cloudflare.com/pages/configuration/branch-build-controls/), and [custom domain setup](https://developers.cloudflare.com/pages/configuration/custom-domains/).

## Changes after connection

Work on a task branch and review the site locally. Merge into `main` after GitHub checks pass. Pages then runs `sh scripts/check_deployment.sh` for that commit and publishes only when it succeeds. Confirm the production deployment and live page before reporting the change as live. A merge and a successful GitHub check are distinct from a verified Pages deployment.

Documentation changes on `main` can also trigger a deployment. Keep preview builds disabled initially; watch-path optimization can be added when it addresses a demonstrated need.

## Recovery

If checks fail, fix the source and push a new commit. A failed build does not replace the previous production deployment. To undo a successful release, revert its Git commit through a task branch, merge the revert, and verify the replacement deployment.

For immediate recovery, use a previous successful production deployment in [Pages rollbacks](https://developers.cloudflare.com/pages/configuration/rollbacks/). Then reconcile `main` so the next deployment does not restore the unwanted version.
