# Task register

Task records make work transferable between people and harnesses. Create a record from [the template](TEMPLATE.md), link it here, and update it in the same branch as the work. Each active task names a human owner and its branch; do not treat an assignment as accepted without the person's agreement.

| Task | Human owner | State |
| --- | --- | --- |
| [Shared foundation](2026-10-24-foundation.md) | Hadi Abou Daya | See task record |
| [Free static website](2026-10-24-static-website.md) | Hadi Abou Daya | See task record |
| [Shared Fidret Lab](2026-10-24-fidret-lab.md) | Hadi Abou Daya | See task record |
| [Shared agent readiness](2026-10-28-agent-readiness.md) | Hadi Abou Daya | See task record |
| [Static Astro migration](2026-10-28-astro-migration.md) | Hadi Abou Daya | See task record |
| [Purpose-aligned improvement session](2026-10-28-project-hardening.md) | Hadi Abou Daya | See task record |
| [Managed Node bootstrap](2026-10-28-managed-runtime.md) | Hadi Abou Daya | See task record |
| [Dependency maintenance](2026-10-28-dependency-maintenance.md) | Hadi Abou Daya | See task record |
| [Reliable stylesheet delivery](2026-10-28-fingerprinted-styles.md) | Hadi Abou Daya | See task record |

The task file is authoritative for status and progress. This register provides discovery and ownership; it avoids copying detailed progress into several places.

## States

| State | Meaning |
| --- | --- |
| planned | Scope and acceptance criteria are being prepared |
| active | An owner has taken the task and work is underway |
| blocked | A specific dependency prevents the next step; record what would unblock it |
| review | Implementation and checks are ready for human review |
| done | Acceptance criteria and checks are met, and the result is accepted explicitly or completed under the owner's standing authorization; record the basis and publication state |

## Handoff requirements

Keep the current state concise. Include what changed, verification commands and results, unresolved questions, and a concrete next action. Link a PR or commit when one exists; label local changes as local. A long agent transcript is unnecessary.

Use the template's seven handoff fields: checkpoint, remaining work, next action, blockers, acceptance basis, publication and last verified. Set `Verification status` to `not-run`, `partial` or `passed`; a done task requires passed verification and actual completion under acceptance or applicable standing authorization. Preserve historical evidence as dated evidence and verify current Git/external state before acting on an old handoff.

Use the PR description for a trivial correction. Substantive work needs a task record so it remains understandable outside a particular harness or GitHub thread.
