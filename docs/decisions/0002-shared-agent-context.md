# Shared agent context and collaboration structure

- Status: active
- Date: 2026-10-24
- Human task owner: Hadi Abou Daya
- Basis: Authorized initial implementation; review together when Elie joins

## Context

Personal chat histories and harness-specific memory are unavailable to the other contributor. Duplicated instructions can diverge, while a full orchestration platform would introduce commitments before the team has a concrete application or workflow to validate.

## Decision

Use root `AGENTS.md` as the canonical shared instruction file. Keep small harness entry points that direct agents to it. Store company intent in the charter, durable choices in decisions, and work state in task records. Use task branches and separate worktrees for concurrent sessions.

Start with Markdown and Python standard-library validation. Use issues and PRs to coordinate remote work once published. Keep tools, vendors, runtime architecture, and any future agent orchestration open until a task justifies them.

## Consequences

Both contributors can inspect the same context in Git. Updating shared policy happens in one place. Contributors must keep task handoffs current. Automated checks catch structural omissions and broken references; human review remains responsible for meaning, technical adequacy, and acceptance.

## Alternatives considered

- Separate policy files for each harness: convenient locally, but creates several competing sources of truth.
- Chat-only coordination: low initial effort, but weak continuity and reviewability across people and harnesses.
- A custom agent runtime now: may become useful, but its requirements have not been established.

## Review

Review with Elie during onboarding and after the first jointly delivered task. Add more machinery only to address a demonstrated coordination problem.
