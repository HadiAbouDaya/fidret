# Free static website and automatic deployment

- Status: active
- Human owner: Hadi Abou Daya
- Agent or harness: Codex
- Branch: feat/static-website
- Updated: 2026-10-24

## Purpose

Publish Fidret's first website at fidret.com and make successful deployments from main update it automatically, using Cloudflare's Free plan and static assets. Preserve the company purpose, Trust earned, and the first physical AI practice direction.

## Scope

A small public website, static-only Cloudflare configuration, checks, deployment documentation, and authorized GitHub and Cloudflare setup. Use the existing domain without adding paid plans or a backend. Do not publish internal repository documents as website assets.

## Plan

1. Build a restrained, responsive static page and inspect its desktop and mobile presentation.
2. Configure Cloudflare Workers Static Assets and a reproducible deployment command.
3. Validate assets, links, configuration, and the existing foundation; document the deployment workflow.
4. Publish a task branch, verify CI, and merge under Hadi's standing authorization.
5. Connect Cloudflare Git integration to main, attach fidret.com, and verify the live page and deployment automation.

## Acceptance criteria

- The site explains Fidret and its developing physical AI practice without inventing delivery claims or contact details.
- Only public website assets are served; the site has no external runtime dependencies, tracking, or backend.
- The deployment is configured for Cloudflare's Free plan with main as the production branch.
- Local and GitHub checks pass, and changes are merged to main.
- A verified Cloudflare deployment serves fidret.com over HTTPS, or an exact account-access blocker is recorded without claiming deployment.

## Decisions

Use a static website and Cloudflare Workers Static Assets on the Free plan, following Hadi's request for the cheapest setup. See [decision 0003](../decisions/0003-free-static-hosting.md). Deployment checks run inside the deploy command as well as GitHub CI.

## Verification

- `python3 scripts/check_foundation.py`: passed, 23 documents and 3 task records including the template.
- `python3 scripts/check_website.py`: passed, including public links, anchors, metadata, and the static-only publication boundary.
- `python3 -m unittest discover -s tests -v`: 18 tests passed, including rejection of repository-root publishing, scripts, external resources, and internal documents in public assets.
- `git diff --check`: passed.
- Browser review: desktop at 1440 pixels and mobile at 390 pixels; no horizontal overflow at 390 or 320 pixels; the Physical AI navigation anchor works.
- Cloudflare's authenticated account is accessible and shows the Free-plan request allowance. No Worker has been created yet.
- GitHub CI and the actual Cloudflare deployment remain to be verified. Local Python preview does not apply Cloudflare headers or 404 routing.

## Handoff

Website and deployment source are implemented and locally checked. Website assets were developed in a separate worktree, then integrated by the primary agent. Next: publish and merge after CI, connect Cloudflare to main using `sh scripts/deploy.sh`, and verify the live domain and automatic updates. No paid upgrade is authorized.
