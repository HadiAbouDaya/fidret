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

The foundation and website checks use Git and Python 3.12 or newer. The public website has no runtime dependencies:

```sh
git clone https://github.com/HadiAbouDaya/fidret.git
cd fidret
sh scripts/check_deployment.sh
```

The clone command is for a fresh machine after these changes are published. This session's checkout is already at `/home/oem/Hadi/Work/Fidret/fidret`; see the [initial setup record](docs/collaboration/setup.md) for its recovery and verification details.

Preview the public site with `python3 -m http.server 8765 --bind 127.0.0.1 --directory website`, then open `http://127.0.0.1:8765/`. Cloudflare Pages runs the shared checks before publishing; see the deployment guide.

## Current state

This is the initial company and collaboration foundation. The working conventions are ready for review with Elie when he joins. Market selection, offers, pricing, product/practice stacks and evidence of physical AI delivery remain open. The [initial foundation task](docs/tasks/2026-10-24-foundation.md) records historical implementation evidence; the [task register](docs/tasks/README.md) locates subsequent work.

The implemented website uses HTML/CSS, a Python standard-library Lab publisher and Cloudflare Pages Free. Successful automatic builds from main publish `website/` to fidret.com. The [system map](docs/architecture/README.md) describes the current architecture; [Astro with TypeScript](docs/decisions/0007-static-website-growth.md) is a proposed growth option, not an adopted migration. The [website task](docs/tasks/2026-10-24-static-website.md) records dated live verification and deployment evidence.
