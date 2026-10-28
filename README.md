# Fidret

**Trust earned.**

Website: [fidret.com](https://fidret.com/).

Our shared technical showcase is [Fidret Lab](https://fidret.com/lab/). Hadi and Elie can publish individual or joint simulations, prototypes, architecture notes, and technical explanations using the [same contribution format](lab/README.md).

Fidret is being built around expertise that earns trust: clients can rely on our judgment, our work, and our commitment to deliver. The name is inspired by the Latin *fīdere*, “to trust” or “to rely upon.”

Physical AI is our first practice. The company purpose guides how we choose work, develop expertise, and serve clients as the company grows.

## Start here

| Read | Purpose |
| --- | --- |
| [Company charter](docs/foundation/charter.md) | Purpose, commitments, and what is decided |
| [Physical AI practice](docs/foundation/physical-ai.md) | Initial direction and questions to validate |
| [Shared agent instructions](AGENTS.md) | Context every coding harness must follow |
| [Contribution workflow](CONTRIBUTING.md) | How Hadi and Elie work together |
| [Agent startup and recovery](docs/collaboration/agent-workflow.md) | Start, resume, record evidence and leave a usable checkpoint |
| [System map and reading routes](docs/architecture/README.md) | Current stack, canonical sources, generated output and task-specific context |
| [Decision register](docs/decisions/README.md) | Why durable choices were made |
| [Task register](docs/tasks/README.md) | Current work, ownership, and handoffs |
| [Foundation roadmap](docs/foundation/roadmap.md) | Evidence needed for the next stages |
| [Website deployment](docs/collaboration/website-deployment.md) | Static website, free hosting, and updates from main |
| [Design brief](docs/design/fidret-design-brief.md) | The supplied visual specification and implementation requirements |
| [Lab publishing](lab/README.md) | Create a piece, choose bylines, preview, and publish |

## Working with an agent

Start your harness at the repository root. Codex uses `AGENTS.md`; bridges for other supported harnesses point to that same file. If a harness does not discover an entry point automatically, explicitly ask it to read `AGENTS.md`.

Use this opening prompt:

```text
Read AGENTS.md and follow the agent startup runbook. Continue task <path>,
or create and register a task for this request. Identify the purpose, human
owner, acceptance criteria, current checkpoint and next authorized action.
Inspect Git and the relevant reading route before editing. Keep decisions,
verification and a resumable handoff in the repository.
```

Git-tracked documents carry shared context. Put decisions and useful handoffs there so another person or harness can continue without access to private chat history.

## Local setup

Use Git, Python 3.12 and Node 22.22 or newer to launch pnpm 11. `package.json` declares exact pnpm and project Node versions; `pnpm install` obtains Node 24.21 for project commands and locks its archive checksums with dependencies. Global Node/NVM defaults do not need to change. On a fresh machine with Corepack available:

```sh
git clone https://github.com/HadiAbouDaya/fidret.git
cd fidret
corepack enable
corepack install
pnpm install --frozen-lockfile
pnpm check
```

The clone command is for a fresh machine after these changes are published. This session's checkout is already at `/home/oem/Hadi/Work/Fidret/fidret`; see the [initial setup record](docs/collaboration/setup.md) for its recovery and verification details.

If pnpm is already available, skip the Corepack setup commands. Installation uses ignored project-local stores/caches under `.local/`, including on a harness with a read-only home directory. After installation, `pnpm exec node --version` reports the project runtime; bare `node` may still report the machine's original version. Run scripts through pnpm. `.node-version` and `.nvmrc` retain the same pin for CI, Pages and optional `nvm install`/`nvm use` on unrestricted machines. First installation needs the registry and official Node archives; warm frozen/offline reuse is supported, while an absent offline runtime fails explicitly.

The Astro command wrapper runs filesystem preflight and disables build-tool telemetry before loading the CLI, so development/type/build/preview commands do not require writable home-directory preferences. It does not add visitor analytics or browser JavaScript.

Use `pnpm dev` for development, or `pnpm build` followed by `pnpm preview` to inspect the static production output at `http://127.0.0.1:8765/`. Edit Astro sources, Markdown and `public/` assets. `website/` is generated and ignored; never edit or commit it. Cloudflare Pages runs the shared checks before publishing; see the deployment guide.

## Current state

This is the initial company and collaboration foundation. The working conventions are ready for review with Elie when he joins. Market selection, offers, pricing, product/practice stacks and evidence of physical AI delivery remain open. The [initial foundation task](docs/tasks/2026-10-24-foundation.md) records historical implementation evidence; the [task register](docs/tasks/README.md) locates subsequent work.

The website uses Astro in static mode, strict TypeScript, custom CSS/local fonts and validated Markdown Lab collections. [Hadi accepted the stack](docs/decisions/0007-static-website-growth.md) on 2026-10-28; the [migration task](docs/tasks/2026-10-28-astro-migration.md) records implementation and verification. The [system map](docs/architecture/README.md) identifies canonical sources and generated output. Cloudflare Pages Free retains its existing build command and `website/` output path; a successful merge and a verified live deployment are recorded separately.
