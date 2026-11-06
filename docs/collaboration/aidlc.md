# Default AI-DLC workflow

Hadi requested permanent, automatic adoption for all website work on 6 November 2026. [Decision 0016](../decisions/0016-default-aidlc.md) records the implementation choice. Every website request follows [the shared skill](../../skills/fidret-aidlc/SKILL.md), including copy, Lab, design, code, review, maintenance and build/delivery tooling. No `$aidlc`, slash command or reminder is required. Start automatically, report the selected approach briefly, and continue authorized work.

## Pinned source and local adaptation

[AI-DLC v2.11.3](https://github.com/awslabs/aidlc-workflows/releases/tag/v2.11.3), published 4 November 2026, is pinned at commit `a8721be3631e6a254cf524ea57e5932aa56b4149`. Its 33 stage definitions, 11 profiles, phase rules and selected verification/recovery references are available offline under [vendor/aidlc](../../vendor/aidlc/). The [manifest](../../vendor/aidlc/upstream.json) identifies every byte-exact file and SHA-256; [MIT-0](../../vendor/aidlc/LICENSE) is retained. Sources were inspected on 6 November 2026. Read only the selected profile and relevant stages, not the whole source tree on every request.

This integrates the methodology through repository instructions and validation. It does not install the native `aidlc` binary, engine, hooks, specialist runtime or its audit/state machinery. Do not claim that its doctor, sensors or human-presence checks ran. The following local translations are deliberate:

| Upstream concept | Fidret implementation |
| --- | --- |
| Intent, state, questions and stage artifacts | One registered task and linked supporting artifacts. `AI-DLC` section is the stage cursor; existing checkpoint is the recovery entry point. No competing `aidlc-docs/` or `aidlc/spaces/` state |
| Five phases and adaptive profiles | Profile/depth plus explicit disposition of all 33 stages; group identical dispositions to keep records small |
| Requirements, units and element traceability | Stable A1/A2 acceptance IDs mapped to implementation units/files and actual checks in the task's `Traceability` table |
| Human gates and plan approval | Review concrete artifacts against existing request, decisions and authorization. Record that authority as authority, never as a fresh approval. Ask when a material decision/input or external-action permission is genuinely missing |
| Phase verification and sensors | Explicit traceability review, existing local gate, behavioral/render checks and required GitHub checks. Structural validation cannot prove semantic coverage |
| Engine commands, template tokens and event writes | Reference material only. Do not execute `{{INVOKE}}`, Bun paths, native event/state tools or manufacture engine receipts. Use the repository's real tools |
| Agent roles and parallel Units | Apply relevant product/design/architecture/development/quality perspectives; delegate useful independent work under harness rules, with isolated editing worktrees and an integration owner |
| Operation and feedback | Inspect existing publication path, merge through checked PRs, report deployment separately, record remaining observation and actionable follow-ups |
| Memory and learned rules | Canonical docs/skills/decisions for justified reusable learning; task for temporary evidence. No automatic private-chat capture |

The current request and higher-priority harness rules govern. Existing Fidret rules win over upstream defaults: PRs and exact-head required checks before `main`, pinned pnpm/Node, proportional tests rather than an invented universal coverage target, design/search/evidence standards, truthful credits, and separate authorization for manual deployment, account changes, outreach and physical actions. Do not change a provider, model, permissions or user configuration as part of using this workflow.

## Select a proportional path

Use the upstream profile as a starting point, then explicitly record departures. This is brownfield work: understand relevant current code and canonical documents first. A profile is not permission to skip the shared gate or an applicable quality check.

| Request | Starting profile and depth | What determines the selected stages |
| --- | --- | --- |
| Small copy/content/docs correction | `express`, Minimal | Inspect context, define the correction, implement, check output and hand off. Skip unrelated market/design/infrastructure work with reasons |
| Reproduced defect | `bugfix`, Minimal or Standard | Reproduction, relevant reverse engineering, acceptance, fix and regression evidence; include design/accessibility analysis if affected |
| Existing structure cleanup | `refactor`, Minimal or Standard | State behavior to preserve, compare alternatives, implement and verify equivalence |
| New page, Lab experience or significant redesign | `feature`, Standard | Visitor intent, scope, source/evidence, design, accessibility/search/NFRs, implementation units, tests, render review and publication |
| Runtime, dependencies or delivery infrastructure | `infra` or `security-patch`, proportionate depth | Compatibility/threat boundaries, rollback, build/CI and actual host evidence |
| Exploratory model or prototype | `poc`, proportionate depth | Hypothesis, conditions, baseline, findings and limits. No production/physical capability claim |
| Broad initiative | `classic` or `enterprise`, Comprehensive when justified | Read the profile and justify relevant discovery, architecture, contracts, ownership and operational stages |
| Read-only audit or advice | Closest profile, adapted | Execute discovery/analysis/review only. State that code, release and deployment stages are inapplicable |

`mvp` and `workshop` remain available when their actual purposes fit. Do not infer a project rewrite from a profile name. No automatic full market research for a spelling correction.

## Durable record

For new substantive tasks use [the template](../tasks/TEMPLATE.md), with top-level `AI-DLC: 1`. The lifecycle format is versioned separately from the upstream release. Existing records are grandfathered by an explicit [legacy list](aidlc-legacy-tasks.json), not a date heuristic. Add the lifecycle when resuming substantive work on them; retain original evidence. Trivial corrections/reviews may use the compact record described in the skill.

The `AI-DLC` section records Profile, Depth, Rationale, Current phase, Gate basis and Operation status, followed by a table:

```text
| Stages | Disposition | Evidence or reason |
| workspace-scaffold, workspace-detection, state-init | complete | Task, ownership and actual Git inspection |
```

Each stage slug appears exactly once, alone or comma-grouped. Use `planned`, `active`, `complete`, `skipped` or `deferred`. Every row needs concrete evidence or a reason. `deferred` means outstanding work with an owner/next step, never successful completion. List all stages from the manifest's `core/aidlc-common/stages/` inventory so omissions stay visible. For a done task all stages must be complete or skipped; skipping cannot waive acceptance criteria or authorization. Template guidance is not completion evidence.

Acceptance criteria use `- A1: ...`, `- A2: ...`. The `Traceability` table has `Criterion`, `Implementation`, `Verification`, `Result` columns, one row for each criterion. Implementation names a unit/file/artifact; verification names the intended check initially and actual evidence as it runs. Results are `pending`, `pass`, `fail` or `unverified`. All criteria must pass for done work. If a criterion is no longer appropriate, record the authorized scope change before changing it. Add a linked detailed design/test record only when useful.

## Execute and recover

1. Initialization: follow [startup](agent-workflow.md), inspect actual artifacts/Git, identify owner, constraints, authority and the next stage. On resume, reconcile current artifacts, dated task evidence and Git/PR state. Never replay an action from an old cursor alone.
2. Ideation: connect the request to the visitor/company outcome, identify known facts, assumptions and missing material inputs. Discovery work already covered by an approved brief may be reused by reference.
3. Inception: make criteria testable, understand relevant current architecture/practices, choose stages/depth, resolve contradictions, assign units/owners and verification. Before construction, trace intent to acceptance and the proposed implementation. Record any decisions in the register.
4. Construction: read the relevant stage and phase guidance; implement the smallest coherent change. Verify complete runnable output, boundary failures and the real reader journey when affected. At the operation boundary every acceptance ID needs implementation and verification evidence. Failed evidence reopens affected work; do not weaken the target to pass.
5. Operation: review publication/rollback obligations and actual required checks/review state. Continue routine authorized branch/PR/merge work. Record merges and observed deployment separately. Deployment stages may be skipped as outside authorized scope; say what remains unobserved. Do not invent monitoring, production validation or human research. Put justified follow-up in a task.

At every meaningful checkpoint update stages, traceability, verification and the seven handoff fields. A phase boundary review records gaps/contradictions and its basis, not a fictional human signature. Keep completed artifacts when revising; update affected downstream criteria/checks and rerun relevant verification. Preserve earlier evidence as dated evidence.

## Verify and maintain

`python3 scripts/check_foundation.py` verifies the pinned inventory/hashes, automatic entry path, lifecycle structure and new-task traceability. It runs in the existing `sh scripts/check_deployment.sh` gate, so no separate workflow or external service is needed. Meaningful rejection fixtures exercise drift, omitted/duplicate stages, uncovered criteria, fabricated completion states and removed auto-loading. These checks establish structure and file integrity, not actual adoption by every installed harness or semantic truth.

The fresh-context trial in the startup runbook must locate this workflow without a user naming AI-DLC. Onboard each actual harness separately. Shared AGENTS routing and thin adapters make the instructions portable; they do not prove hooks or native runtime execution.

Update upstream only in a task branch: inspect release notes/source diff and license, select a concrete release commit, replace the selected source bytes, update `upstream.json` hashes, review local translations and stage inventory, then run full checks and a fresh-context trial. Do not fetch latest or run an upstream installer during ordinary startup. Preserve local policy in this runbook/skill and keep vendor files byte-exact. Native runtime installation, if later requested, needs its own compatibility/trust/settings review; never quietly add hooks or disable its presence checks.
