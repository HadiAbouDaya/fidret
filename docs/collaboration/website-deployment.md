# Website deployment

Fidret's Astro site uses Cloudflare Pages Free with native GitHub deployment. [Decision 0004](../decisions/0004-pages-git-deployment.md) records hosting; [decision 0008](../decisions/0008-astro-publishing.md) records the current build/publication convention. Follow the [design brief](../design/fidret-design-brief.md) for visual changes. Initial connection evidence belongs in the [website task](../tasks/2026-10-24-static-website.md); the [Astro migration task](../tasks/2026-10-28-astro-migration.md) and subsequent tasks own later deployment evidence. Configuration alone does not establish that the site is live.

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

Root `wrangler.json` declares `name: fidret`, `pages_build_output_dir: ./website`, and `compatibility_date: 2026-10-24`. Astro's static `outDir` is the same directory, so the existing Pages build command and output settings are retained. `website/` is ignored, disposable output generated from `src/`, Markdown content and `public/`; never edit or commit it. There is no server adapter, Worker script or Pages Functions directory. Publish only this generated public output, keeping internal records, source drafts and registries outside it.

The repository pins Node through `.node-version`/`.nvmrc`, pnpm through `package.json`, resolved dependencies through `pnpm-lock.yaml`, and Python through `.python-version`. Pages' automatic dependency installation must honor the pinned package manager and lockfile before the configured command runs; confirm the reported tool versions in the first migrated build. The command validates foundation records, type-checks Astro/TypeScript, runs Node tests including isolated fixture builds, builds the site, and runs Python output validation and unit tests before publication. No deployment CLI or user-created Cloudflare API token is needed. Keep the Cloudflare GitHub App's repository access restricted to `fidret`.

The managed-runtime task adds exact `devEngines.runtime` and locked official Node archive checksums, so pnpm scripts also work when the available launcher is Node 22.22. The first Astro production build confirmed Node 24.21.0, Python 3.12.12 and pnpm 11.1.2 without changing account settings. Project stores/caches are ignored under `.local/`; they are not website assets.

The [Pages Free build allowance](https://developers.cloudflare.com/pages/platform/limits/) is 500 builds per month, with one concurrent build. [Static asset requests are free and unlimited](https://developers.cloudflare.com/pages/functions/pricing/) when they do not invoke Functions. Keep the site static and avoid paid upgrades; domain renewal remains a separate annual expense.

## Local preview and checks

Install the pinned toolchain and frozen dependencies using the README. Follow the [Lab publishing guide](../../lab/README.md) for bylines, drafts and the common piece format. Edit `src/`, Markdown sources and `public/`, then run the shared checks; commit those sources and any deliberate lockfile change, not `website/`.

From the repository root:

```sh
pnpm dev
```

Open `http://127.0.0.1:8765/`. For production-output review, use `pnpm build` followed by `pnpm preview` instead. In another terminal:

```sh
sh scripts/check_deployment.sh
```

Astro's local servers do not establish Cloudflare response-header or routing behavior. Verify `public/_headers` and the custom 404 on the deployed site. Review mobile/desktop layouts, text enlargement, navigation, keyboard focus and font loading before publishing visual changes. The preflight boundary check rejects symlinks in Astro/public/Lab source, cache and output paths before Astro reads, copies or cleans them.

## Stylesheet releases

Edit the canonical CSS in `src/styles/`. Astro imports bundle it into external files with content fingerprints under `/_astro/`; `inlineStylesheets: never` retains the strict same-origin CSP without inline CSS. A build integration also emits `/styles.css` and `/lab.css` from the same source bytes for older links. Those aliases are generated output, not separate editable sources. New pages use the fingerprinted links so changing CSS changes the requested asset URL.

After a stylesheet release, inspect the stylesheet URL in actual production HTML, confirm that it returns CSS over HTTPS and review the rendered pages. Check custom-domain headers separately from an exact deployment's `pages.dev` URL. A 2026-10-28 audit observed a four-hour custom-domain TTL on the old mutable CSS URLs despite revalidation headers on the exact deployment; the account-level cause was not established. Fingerprinted URLs address asset identity without changing zone settings. Cloudflare documents [custom-domain cache risks](https://developers.cloudflare.com/pages/configuration/serving-pages/#caching-and-performance) and [headers for fingerprinted assets](https://developers.cloudflare.com/pages/configuration/headers/#configure-custom-browser-cache-behavior).

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
