# Free static website and automatic deployment

- Status: done
- Human owner: Hadi Abou Daya
- Agent or harness: Codex
- Branch: chore/deployment-verification
- Updated: 2026-10-28
- Verification status: passed

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

- `python3 scripts/check_foundation.py`: passed for the foundation, design sources, decision register, and task records.
- `python3 scripts/check_website.py`: passed, including public links, anchors, metadata, and the static-only publication boundary.
- `python3 -m unittest discover -s tests -v`: 19 tests passed, including rejection of repository-root publishing, scripts, external resources, internal documents in public assets, and missing local fonts.
- `git diff --check`: passed.
- Live browser review: no horizontal overflow at 320, 360, 768, or 1440 pixels. Manrope and Newsreader are served locally. The Physical AI navigation anchor works, and the first keyboard tab exposes the skip link with the brief's visible copper focus outline. OS text-scale emulation at 2x produced no horizontal overflow at 360 pixels; browser-specific zoom behavior should also be included in future manual reviews.
- The first website/configuration stage was merged through [PR 3](https://github.com/HadiAbouDaya/fidret/pull/3) with both branch and PR CI successful. At that intermediate checkpoint, the updated brand and Pages configuration still required the fresh CI run subsequently recorded for PR 4 below.
- The supplied design brief's original and repository copy have matching SHA256 hashes. Font binaries match their source Git blob hashes, and license notices are bundled.
- The final design and Pages configuration merged through [PR 4](https://github.com/HadiAbouDaya/fidret/pull/4), with branch and PR CI successful. The first Pages deployment [51b290bc](https://51b290bc.fidret.pages.dev/) succeeded for main commit `4431192e341e9559d3a1f4d9e802aff588af78f9`.
- `curl -sSI --max-time 15 https://fidret.com/`: HTTP 200 over verified HTTPS, including the expected Content-Security-Policy, Permissions-Policy, Referrer-Policy, and nosniff headers.
- Both public WOFF2 font URLs returned HTTP 200 with font/woff2 content type. `/AGENTS.md` returned the custom HTML 404; repository documents are outside the asset directory.
- Pages settings confirm main as production and automatic production deployments enabled. Automatic preview branch builds were disabled to conserve the Free plan allowance.
- The final documentation checkpoint was intended to verify the next main-triggered build. Its PR and Cloudflare deployment history retain the resulting commit and build state; inspect those records before asserting a current deployment state.

## Handoff

Implementation and initial live deployment are complete under Hadi's explicit deployment request and standing merge authorization. The site is at [fidret.com](https://fidret.com/) on Cloudflare Pages Free, with the source brief preserved and local font licenses included. The GitHub app is restricted to fidret. No broad user API build token or paid upgrade was created.

- Checkpoint: static company website and Pages setup completed; the live verification above is dated 2026-10-24.
- Remaining work: none for the initial website setup. Email, contact destinations and additional commercial content are separate tasks.
- Next action: follow the design brief and deployment guide for new website work; inspect actual service state when deployment verification is needed.
- Blockers: none for this completed implementation.
- Acceptance basis: Hadi's explicit website/deployment request and standing merge authorization from 2026-10-24.
- Publication: initial site merged through PR 4 and verified live for `4431192e341e9559d3a1f4d9e802aff588af78f9` as recorded above. Later Lab publication is in its own task. No current live state was reverified by this 2026-10-28 handoff clarification.
- Last verified: local baseline `e02e09f` passed `sh scripts/check_deployment.sh` on 2026-10-28 with 35 tests; the live checks above remain historical evidence.
