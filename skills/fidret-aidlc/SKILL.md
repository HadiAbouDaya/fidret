---
name: fidret-aidlc
description: Apply Fidret’s default AI-DLC lifecycle to website work, including content, design, code, reviews, fixes, dependencies and delivery tooling. Select proportional stages and keep traceable evidence in repository tasks.
---

# Fidret AI-DLC

Apply automatically on every website request. No command or user reminder is needed. Start with [AGENTS.md](../../AGENTS.md) and the [AI-DLC operating workflow](../../docs/collaboration/aidlc.md). This is a repository adaptation of pinned AWS Labs AI-DLC, not the native engine.

1. Read the actual task artifacts and Git state before resuming. Identify the requested outcome, owner, authority and next step.
2. Choose an upstream [profile](../../vendor/aidlc/core/scopes/) and Minimal, Standard or Comprehensive depth. Read the selected profile and the relevant [stage guidance](../../vendor/aidlc/core/aidlc-common/stages/), progressively as stages begin. Record local stage additions/omissions and their reasons. Use the operating workflow to translate engine mechanics into repository artifacts.
3. Give acceptance criteria stable A1, A2 identifiers. Trace each to an owned implementation unit or file and its verification evidence. Capture gaps, assumptions and contradictions before they affect implementation. Product, design, architecture, development and quality perspectives matter even when one agent covers them.
4. Check traceability at phase boundaries. Use existing authority for routine execution; describe that basis truthfully. Ask only for missing material input or authority. Never simulate human approval or an upstream runtime event.
5. Run the shared gate and relevant behavioral/rendered checks. A failed or unverified criterion stays visible. Update stages, evidence, operation status and the structured handoff before interruption or publication. If evidence changes upstream, revisit affected downstream work.

For a trivial correction or read-only review, keep a compact profile/stage/traceability record in the issue or PR, or in the response if no repository artifact is warranted. Do not manufacture implementation or deployment stages for a review. A strict no-write review does not run builds that regenerate ignored output; report those checks as not run and distinguish source inspection from built-page evidence. For substantive work use the [task template](../../docs/tasks/TEMPLATE.md); detailed artifacts may be linked from it. A resumed historical task gains this lifecycle section when new substantive work begins; do not rewrite its old evidence as if AI-DLC was used then.

Preserve the [design skill](../fidret-design/SKILL.md) and [search skill](../fidret-search/SKILL.md) for their applicable work. Record reusable corrections in the canonical policy or affected skill only when justified, with decisions for changed direction. Keep private prompts and transcripts out of the public repository.
