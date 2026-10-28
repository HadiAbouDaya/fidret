# Resumable, verifiable shared agent work

- Status: active
- Date: 2026-10-28
- Human decision owner: Hadi Abou Daya
- Related task: [Shared agent readiness](../tasks/2026-10-28-agent-readiness.md)
- Basis: Hadi requested whole-project agent readiness with clear purpose and properly recorded work on 2026-10-28; implementation convention within that request

## Context

The existing charter, shared instructions, thin harness adapters and Git-tracked tasks establish a common foundation. New sessions still have to infer code/source relationships and recover progress from narrative handoffs. Decisions are indexed but their lifecycle is not yet checked as rigorously as tasks. A completed historical handoff can still sound like an outstanding instruction.

## Decision

Keep the [existing shared policy](0002-shared-agent-context.md) and add a concise [system map](../architecture/README.md) and [startup/recovery runbook](../collaboration/agent-workflow.md). Keep one canonical home for purpose, policy, choices, implementation and temporary work state. Use task checkpoints and explicit verification/publication evidence so another agent can resume without private memory.

Validate task verification state and checkpoint structure, decision registration/status/ownership/basis, unique numbering and supersession references, duplicate metadata and required shared context files in the existing Python checks. Keep these checks in the current CI/deployment gates and exercise failure cases. A fresh-context trial tests whether the shared instructions are usable.

Agents continue authorized work without routine repeat confirmations. Record execution boundaries and file ownership per task; use isolated worktrees for parallel editing. Existing human decision and external-action authorization boundaries remain authoritative.

## Consequences

More context becomes inspectable and some contradictions fail automatically. Contributors must update canonical records at meaningful checkpoints and keep the source map aligned with architecture changes. Structural validation cannot establish truth, actual human approval or universal harness compliance; review, dated evidence and onboarding trials remain necessary.

No custom orchestration service, persistent agent runtime, new cloud service or frontend migration is introduced. Such components need an actual use case and a separate choice.

## Alternatives considered

- Larger always-loaded instruction files: increase reading cost and duplicate state; prefer short policy plus task-specific routes.
- Private agent memory or chat transcripts as the source of truth: unavailable to another contributor and difficult to verify.
- An orchestration platform first: adds dependencies without resolving the immediate documentation and handoff gaps.

## Review

Established as an implementation convention under Hadi's request, not as evidence of Elie's review. Review after the first few resumed or jointly delivered tasks. Revise the workflow when a concrete failure shows that an additional record or check is useful.
