# Free static website and automatic deployment

- Status: active
- Human owner: Hadi Abou Daya
- Agent or harness: Codex
- Branch: feat/brand-design
- Updated: 2026-10-24

## Purpose

Publish Fidret's first website at fidret.com and make successful deployments from main update it automatically, using Cloudflare Pages Free and static assets. Preserve the company purpose, Trust earned, and the first physical AI practice direction. Apply Hadi's supplied [design brief](../design/fidret-design-brief.md) and retain the source in the repository.

## Scope

A small public website, static-only Cloudflare configuration, checks, deployment documentation, and authorized GitHub and Cloudflare setup. Use the existing domain without adding paid plans or a backend. Do not publish internal repository documents as website assets.

## Plan

1. Build a restrained, responsive static page and inspect its desktop and mobile presentation.
2. Configure Cloudflare Pages native Git deployment with a validation command before publishing.
3. Validate assets, links, configuration, and the existing foundation; document the deployment workflow.
4. Publish a task branch, verify CI, and merge under Hadi's standing authorization.
5. Connect Cloudflare Git integration to main, attach fidret.com, and verify the live page and deployment automation.

## Acceptance criteria

- The site explains Fidret and its developing physical AI practice without inventing delivery claims or contact details.
- Only public website assets are served; the site has no external runtime dependencies, tracking, or backend.
- The deployment is configured for Cloudflare Pages Free with main as the production branch.
- The supplied design brief is preserved exactly; the site uses its palette, local Manrope and Newsreader, natural wrapping, and a typographic wordmark.
- Local and GitHub checks pass, and changes are merged to main.
- A verified Cloudflare deployment serves fidret.com over HTTPS, or an exact account-access blocker is recorded without claiming deployment.

## Decisions

Use a static website on Cloudflare Pages Free, following Hadi's request for the cheapest setup. [Decision 0004](../decisions/0004-pages-git-deployment.md) replaces the initial Workers implementation to avoid the broad account build token offered during setup. Checks run in the Pages build command and GitHub CI.

## Verification

- `python3 scripts/check_foundation.py`: passed, 23 documents and 3 task records including the template.
- `python3 scripts/check_website.py`: passed, including public links, anchors, metadata, and the static-only publication boundary.
- `python3 -m unittest discover -s tests -v`: 19 tests passed, including rejection of repository-root publishing, scripts, external resources, internal documents in public assets, and missing local fonts.
- `git diff --check`: passed.
- Browser review: desktop at 1440 pixels and mobile at 390 pixels; no horizontal overflow at 390 or 320 pixels; the Physical AI navigation anchor works.
- Cloudflare's authenticated account is accessible and shows the Free-plan request allowance. No Worker has been created yet.
- The first website/configuration stage was merged through [PR 3](https://github.com/HadiAbouDaya/fidret/pull/3) with both branch and PR CI successful. The updated brand and Pages configuration require a fresh CI run.
- The supplied design brief's original and repository copy have matching SHA256 hashes. Font binaries match their source Git blob hashes, and license notices are bundled.
- Actual Cloudflare deployment remains to be verified. Local Python preview does not apply Cloudflare headers or 404 routing.

## Handoff

The brand implementation and Pages setup are being finalized on feat/brand-design. Next: merge after checks, deploy Pages from main with `sh scripts/check_deployment.sh` and output website, attach fidret.com, and verify the live domain and automatic updates. The GitHub app's access has been narrowed to fidret. No broad user API build token has been created and no paid upgrade is authorized.
