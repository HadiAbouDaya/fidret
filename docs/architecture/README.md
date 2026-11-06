# Repository and current system map

This map describes the implementation in Git, not a live service-health report. The [charter](../foundation/charter.md) defines why Fidret exists; the [decision register](../decisions/README.md) records choices and their status. Check the relevant task and current service evidence before claiming something is deployed or still available.

## Current implementation

Fidret has a public company website and a shared technical Lab built with Astro in static mode, strict TypeScript, custom CSS, SVG assets and local fonts. Validated Markdown collections supply Lab articles and their metadata. Node 24.22.1 and pnpm 11.28.9 are pinned for development/builds; Python 3.12 runs the repository and public-output validators. Exact direct and resolved dependencies live in `package.json` and `pnpm-lock.yaml`.

Astro generates plain HTML/CSS/assets in ignored `website/`. Most pages require no browser JavaScript. Six declared farm/factory Lab surfaces progressively enhance complete HTML with one approved same-origin native module under [decision 0013](../decisions/0013-progressive-lab-experiences.md). No application server, database or authentication service is introduced. There is no React/MDX integration or server adapter; add one only for an actual requirement under a separate task.

Cloudflare Pages Free is configured to build from GitHub `main`, run `sh scripts/check_deployment.sh`, and publish only `website/`. GitHub Actions runs the repository checks on pushes and pull requests. Its required `foundation` job additionally runs focused Chromium browser regressions after the shared gate. This development-only check has a separate command and temporary loopback server; the production build does not install or run browsers. The [deployment guide](../collaboration/website-deployment.md) owns the settings and recovery steps; the [website task](../tasks/2026-10-24-static-website.md) and subsequent tasks own dated deployment evidence. CI configuration does not establish that branch protection is enabled.

## Sources and outputs

The Node launcher can be 22.22 or newer; `devEngines.runtime` in `package.json` and the lockfile provision exact Node 24.22.1 for pnpm scripts. `.node-version`/`.nvmrc` agree with that pin. Stores/caches stay under ignored `.local/`; no machine-wide NVM update is required. CI exercises both the supported Node 22 bootstrap and the pinned build environment. Follow the [maintenance guide](../collaboration/dependency-maintenance.md) for reviewed dependency proposals and coherent runtime upgrades.

| Location | Responsibility | How to change it |
| --- | --- | --- |
| `src/lib/work.ts`, `src/pages/work/`, `SelectedWork.astro`, `WorkEvidence.astro`, `WorkContext.astro` | Question-led contributions with visible scope, source-derived previews/worked examples and project-specific invitations, filtered by published Lab parents | Preserve evidence levels, exact model-state links and withdrawal across cards, related links, routes, sitemap and AI directory |
| `src/lib/contact.ts`, `src/pages/contact.astro`, `ProjectInvitation.astro` | Current project-inquiry destination and transparent handoff | Change the shared destination only from an authorized real contact route; no fictional mailbox or implied form submission |
| `src/lib/people.ts`, `src/styles/visitor.css` | Approved professional context and visitor-journey presentation | Keep individual background distinct from Fidret delivery history; verify full responsive journeys |
| `scripts/generate_social_previews.py`, `public/social/` | Source-generated work-specific 1200 by 630 PNG sharing diagrams | Manually render with Python/Pillow and licensed Manrope, inspect the images and keep canonical preview resolution tested |
| `AGENTS.md` | Canonical shared agent policy | Update it once; keep harness adapters as pointers |
| `src/lib/seo.ts`, `src/layouts/SiteLayout.astro`, `src/pages/llms.txt.ts`, `scripts/check_seo.py` | Shared canonical/social/schema identity, published-only optional AI directory and search regression contracts | Follow [search quality](../collaboration/search-quality.md); retain safe inert-data serialization and the independent executable-script boundary |
| `docs/foundation/` | Company purpose, practice scope, evidence needed to progress | Preserve established direction; record meaningful choices in decisions |
| `docs/decisions/` | Durable choices, rationale, status and basis | Add a numbered record and register it; preserve superseded history |
| `docs/tasks/` | Ownership, scope, authorization, verification and next action | Keep the relevant task current at meaningful checkpoints |
| `src/pages/project.astro`, `src/pages/charter.astro`, `src/pages/people/`, `src/pages/lab/[slug]/sources.astro` | Public project/company views, published-credit profiles and article references/edition notes | Keep public copy faithful to canonical context; derive credit and source routes from published entries only |
| `src/lib/workflow-brief.ts`, `src/pages/lab/[slug]/workflow-brief.astro`, `src/pages/lab/[slug]/workflow-brief.md.ts` | Shared five-contract planning prompts, accessible Work summaries, fictional examples and generated editable Markdown | Keep guide/download/entry points tied to the published harness article; preserve the exact public-download exception, native controls, print layout and visible source/contact destinations on paper |
| `src/lib/lab-journeys.ts`, `src/lib/lab-workspaces.ts`, `src/components/LabExperience.astro`, `WorkspaceArtifact.astro`, `ScenarioLibrary.astro`, `src/scripts/lab-experience.js`, `src/styles/lab-experience.css`, `workspace.css` | Five focused model situations per Lab, full finite input-space outcomes from the canonical build-time policies, scene-specific artifacts, exact URL conditions and local topic/scenario finding | Complete worked examples precede execution. Late enhancement preserves active reading; fallback explains when shared conditions are not applied. History focus repair waits for native scroll restoration. Explicit situation-library fragment navigation reveals and focuses its target, while initial enhancement stays passive. Earlier linked article sections retain native onward notices, and the farm collection retains its old selector anchor. Explicit polite regions announce changes, and click listeners attach only to actual controls. The browser selects an escaped inert model lookup; it does not duplicate policy or operate equipment. Exact runtime source/route/size boundaries, model parity, context/history/focus, fallback and withdrawal are tested. No network/storage or operational simulation |
| `src/lib/autonomous-farm.ts`, `src/lib/farm-blueprint.ts`, `src/components/FarmMap.astro`, `src/styles/farm-map.css`, farm companion routes | Fictional mixed-farm scenario model, source-backed blueprint, native decision desk and editable operating brief | Keep all companions conditional on the published farm article; preserve action gating, unknown-effect reconciliation, the bounded enhancement contract and physical-system limits |
| `src/lib/software-factory.ts`, `src/pages/lab/[slug]/operating-brief.md.ts` | Fictional seven-handoff kitchen walkthrough, build-time promotion teaching model and editable factory brief | Keep the interactive experience/download conditional on the published factory piece; test decision boundaries and withdrawal. No agents or deployment service run here; the shared local reading controller follows decision 0013 |
| `src/lib/sensor-evidence.ts`, `src/pages/explorations/signal-freshness/method.astro` | Checked synthetic replay snapshot and public model contract | Keep the Python-oracle parity test and distinguish software evidence from physical validation |
| `src/pages/`, `src/layouts/`, `src/components/` | Canonical Astro routes, shared structure and presentation | Edit using the design brief; preserve public URLs and page semantics |
| `lab/pieces/*.md`, `lab/TEMPLATE.md`, `lab/authors.json` | Canonical Lab prose, metadata, template and bylines | Follow the Lab guide; create drafts with `pnpm lab:new` |
| `src/content.config.ts`, `src/lib/lab-schema.ts`, `src/lib/lab.ts` | Typed collections, publication rules and published-entry queries | Preserve author/date/schema rules and draft exclusion |
| `src/plugins/lab-policy.mjs` | Markdown AST policy for safe content and complete published narrative | Keep meaningful injection, link and completeness failure tests |
| `scripts/lab.mjs` | Safe draft creation | Preserve explicit authors, UTC dates and filesystem boundaries |
| `experiments/` | Reproducible local software explorations, outside website output | Read the experiment assumptions/task; retain baseline, actual evidence, tests and limits |
| `src/pages/sitemap.xml.ts` | Root sitemap with company/Lab URLs and published pieces | Keep drafts and withdrawn pieces out; preserve the root URL entries |
| `src/lib/signal-walkthrough.ts`, `src/components/SignalWalkthrough.astro`, `src/styles/exploration.css` | Fixed synthetic walkthrough data, native state controls and diagram presentation | Keep snapshots aligned with the Python experiment through `tests/signal-walkthrough.test.ts`; no live feed or equipment integration |
| `src/styles/` | Shared primitives and page-family CSS, including separate Lab, knowledge and 404 consumers | Astro imports produce external fingerprinted CSS; keep family imports at their consumers and test affected/unaffected asset identities, not generated aliases |
| `src/integrations/` | Build-time compatibility assets | Keep `/styles.css` and `/lab.css` generated from the canonical CSS; no duplicate editable copies |
| `public/` | Public media, licensed fonts, favicon, robots and response headers | Edit assets here; every asset is public regardless of an article's draft status |
| `website/` | Disposable generated site, including Lab pages and sitemap | Rebuild with `pnpm build`; never hand-edit or commit |
| `astro.config.mjs`, `tsconfig.json`, `package.json`, `pnpm-lock.yaml`, runtime pin files | Static build, strict types and reproducible toolchain | Update coherently; install from the frozen lockfile and verify compatibility |
| `scripts/check_foundation.py`, `scripts/check_website.py`, `tests/` | Executable repository contracts, public em-dash policy and regression checks | Update checks with the behavior they protect; retain meaningful failure cases |
| `tests/browser/`, `package.json`'s `test:browser` command | Repeatable built-page regressions for Lab reading, focus, history, exact conditions and fallback | Build first, use the pinned development-only browser driver and isolated loopback server; keep production builds browser-free and retain manual/assistive/human checks |
| `scripts/check_build_boundary.mjs`, `scripts/check_deployment.sh` | Safe output preflight and common validation/test/build entry point | Run from the repository root using the pinned toolchain |
| `.github/workflows/`, `wrangler.json`, `public/_headers` | CI, publish directory and public response configuration | Follow the deployment guide and task's authorization |

Internal documents, source drafts and author registries stay outside the public website output. This GitHub repository is public, so that separation does not make repository content private. Never put confidential material here.

## Reading routes

Every substantive task starts with `AGENTS.md`, the charter, contribution workflow, task register and relevant task. Then read the smallest applicable route:

| Work | Additional context |
| --- | --- |
| Public pages or styling | [Design language](../design/fidret-design-brief.md), [Fidret design skill](../../skills/fidret-design/SKILL.md), [research/provenance](../design/research.md), [deployment guide](../collaboration/website-deployment.md), current [hosting decision](../decisions/0004-pages-git-deployment.md) |
| Lab content or publishing | [Lab guide](../../lab/README.md), [current publishing decision](../decisions/0008-astro-publishing.md), sources and collections above |
| Company or practice direction | [Roadmap](../foundation/roadmap.md), [physical AI brief](../foundation/physical-ai.md), relevant decision records |
| Physical experiments | Physical AI brief, [engagement brief](../templates/engagement-brief.md), task-specific operating authorization and evaluation evidence |
| Local practice prototypes | [Experiment index](../../experiments/README.md), the prototype's README/task and [sensor timing research](../foundation/sensor-freshness-research.md); no equipment action is authorized by a software check |
| Shared instructions, tooling or handoffs | [Agent workflow](../collaboration/agent-workflow.md), [context decision](../decisions/0002-shared-agent-context.md), [readiness convention](../decisions/0006-agent-readiness.md), validators and tests |

## Accepted stack and future choices

[Decision 0007](../decisions/0007-static-website-growth.md) records Hadi's acceptance of Astro with TypeScript on 2026-10-28. [Decision 0008](../decisions/0008-astro-publishing.md) records Markdown authoring and disposable output; the [migration task](../tasks/2026-10-28-astro-migration.md) owns implementation, test and delivery evidence. Product backends, orchestration services, MDX/interactive components and additional practices remain separate choices attached to actual requirements. Update this map and all affected operating instructions alongside future architecture changes.
