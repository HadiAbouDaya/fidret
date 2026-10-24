# Fidret

**Trust earned.**

Fidret is being built around expertise that earns trust: clients can rely on our judgment, our work, and our commitment to deliver. The name is inspired by the Latin *fīdere*, “to trust” or “to rely upon.”

Physical AI is our first practice. The company purpose guides how we choose work, develop expertise, and serve clients as the company grows.

## Start here

| Read | Purpose |
| --- | --- |
| [Company charter](docs/foundation/charter.md) | Purpose, commitments, and what is decided |
| [Physical AI practice](docs/foundation/physical-ai.md) | Initial direction and questions to validate |
| [Shared agent instructions](AGENTS.md) | Context every coding harness must follow |
| [Contribution workflow](CONTRIBUTING.md) | How Hadi and Elie work together |
| [Decision register](docs/decisions/README.md) | Why durable choices were made |
| [Task register](docs/tasks/README.md) | Current work, ownership, and handoffs |
| [Foundation roadmap](docs/foundation/roadmap.md) | Evidence needed for the next stages |
| [Website deployment](docs/collaboration/website-deployment.md) | Static website, free hosting, and updates from main |

## Working with an agent

Start your harness at the repository root. Codex uses `AGENTS.md`; bridges for other supported harnesses point to that same file. If a harness does not discover an entry point automatically, explicitly ask it to read `AGENTS.md`.

Use this opening prompt:

```text
Read AGENTS.md and the task register. Continue task <path>, or create a task
record for this request. Explain the connection to Fidret's purpose, identify
the human owner and acceptance criteria, and inspect the working tree before
editing. Keep the task record current and leave a verifiable handoff.
```

Git-tracked documents carry shared context. Put decisions and useful handoffs there so another person or harness can continue without access to private chat history.

## Local setup

The foundation and website checks use Git and Python 3.12 or newer. The public website has no runtime dependencies:

```sh
git clone https://github.com/HadiAbouDaya/fidret.git
cd fidret
python3 scripts/check_foundation.py
python3 scripts/check_website.py
python3 -m unittest discover -s tests -v
```

The clone command is for a fresh machine after these changes are published. This session's checkout is already at `/home/oem/Hadi/Work/Fidret/fidret`; see the [initial setup record](docs/collaboration/setup.md) for its recovery and verification details.

Preview the public site with `python3 -m http.server 8765 --bind 127.0.0.1 --directory website`, then open `http://127.0.0.1:8765/`. Cloudflare deployment uses the separately pinned CLI described in the deployment guide.

## Current state

This is the initial company and collaboration foundation. The working conventions are ready for review with Elie when he joins. Market selection, offers, pricing, technical stack, and evidence of physical AI delivery remain open. The [initial foundation task](docs/tasks/2026-10-24-foundation.md) records implementation and verification status.

The first public website and its static-only configuration live in this repository. The [website task](docs/tasks/2026-10-24-static-website.md) records whether the Cloudflare connection and live domain have been verified.
