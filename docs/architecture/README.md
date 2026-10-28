# Repository and current system map

This map describes the implementation in Git, not a live service-health report. The [charter](../foundation/charter.md) defines why Fidret exists; the [decision register](../decisions/README.md) records choices and their status. Check the relevant task and current service evidence before claiming something is deployed or still available.

## Current implementation

Fidret has a public company website and a shared technical Lab. The site is static HTML, custom CSS, SVG assets and locally served fonts. The Lab publisher and repository validators use Python's standard library; local checks require Git and Python 3.12 or newer. There is no browser JavaScript, application server, database, authentication service or installed package dependency in this implementation.

Cloudflare Pages Free is configured to build from GitHub `main`, run `sh scripts/check_deployment.sh`, and publish only `website/`. GitHub Actions runs the repository checks on pushes and pull requests. The [deployment guide](../collaboration/website-deployment.md) owns the settings and recovery steps; the [website task](../tasks/2026-10-24-static-website.md) and subsequent tasks own dated deployment evidence. CI configuration does not establish that branch protection is enabled.

## Sources and outputs

| Location | Responsibility | How to change it |
| --- | --- | --- |
| `AGENTS.md` | Canonical shared agent policy | Update it once; keep harness adapters as pointers |
| `docs/foundation/` | Company purpose, practice scope, evidence needed to progress | Preserve established direction; record meaningful choices in decisions |
| `docs/decisions/` | Durable choices, rationale, status and basis | Add a numbered record and register it; preserve superseded history |
| `docs/tasks/` | Ownership, scope, authorization, verification and next action | Keep the relevant task current at meaningful checkpoints |
| `website/index.html`, `website/styles.css`, `website/404.html` | Hand-maintained public company pages and shared styling | Edit directly using the design brief and website checks |
| `lab/pieces/`, `lab/authors.json` | Canonical Lab content and bylines | Follow the Lab guide; use the publisher to create a piece |
| `templates/lab/` | Shared Lab page templates | Edit templates, then rebuild the Lab |
| `scripts/lab.py` | Content validation, creation, static generation and freshness checks | Preserve publication, escaping and source/output boundaries |
| `website/lab/` | Generated Lab pages | Rebuild from sources; do not hand-edit |
| `website/sitemap.xml` | Public URL list; Lab entries maintained by the publisher | Preserve non-Lab entries when rebuilding |
| `website/lab.css`, `website/lab-assets/`, `website/fonts/` | Public Lab styling, media and licensed fonts | Edit assets directly; all assets under `website/` are public |
| `scripts/check_foundation.py`, `scripts/check_website.py`, `tests/` | Executable repository contracts and regression checks | Update checks with the behavior they protect; retain meaningful failure cases |
| `scripts/check_deployment.sh` | Common local and deployment check entry point | Run from the repository root |
| `.github/workflows/`, `wrangler.json`, `website/_headers` | CI, publish directory and public response configuration | Follow the deployment guide and task's authorization |

Internal documents, source drafts and author registries stay outside the public website output. This GitHub repository is public, so that separation does not make repository content private. Never put confidential material here.

## Reading routes

Every substantive task starts with `AGENTS.md`, the charter, contribution workflow, task register and relevant task. Then read the smallest applicable route:

| Work | Additional context |
| --- | --- |
| Public pages or styling | [Design brief](../design/fidret-design-brief.md), [deployment guide](../collaboration/website-deployment.md), current [hosting decision](../decisions/0004-pages-git-deployment.md) |
| Lab content or publisher | [Lab guide](../../lab/README.md), [Lab decision](../decisions/0005-shared-fidret-lab.md), sources/templates above |
| Company or practice direction | [Roadmap](../foundation/roadmap.md), [physical AI brief](../foundation/physical-ai.md), relevant decision records |
| Physical experiments | Physical AI brief, [engagement brief](../templates/engagement-brief.md), task-specific operating authorization and evaluation evidence |
| Shared instructions, tooling or handoffs | [Agent workflow](../collaboration/agent-workflow.md), [context decision](../decisions/0002-shared-agent-context.md), [readiness convention](../decisions/0006-agent-readiness.md), validators and tests |

## Proposed evolution

[Decision 0007](../decisions/0007-static-website-growth.md) records Astro with TypeScript as a proposed growth stack. It has not been adopted. A migration needs a concrete task, acceptance criteria and an accepted choice; this map and all affected build, publishing and validation instructions must change together if that happens. Product backends, orchestration services and additional practices remain separate choices attached to actual requirements.
