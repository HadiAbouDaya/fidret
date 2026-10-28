# Synthetic sensor freshness and recovery prototype

- Status: done
- Human owner: Hadi Abou Daya
- Agent or harness: Codex
- Branch: hadi/sensor-freshness-prototype
- Updated: 2026-10-28
- Verification status: passed

## Purpose

Develop a small, reproducible example of explicit failure handling from the existing [Lab idea](../../lab/ideas.md): what should a connected system do when sensor readings stop arriving? This supports the [physical AI practice](../foundation/physical-ai.md) through bounded evaluation and honest limits, without selecting a commercial offer or implying real-world validation.

## Scope

A local Python standard-library state model, deterministic synthetic event replay, a latest-reading baseline, meaningful tests and a short explanation of observed outcomes/limitations. Keep the prototype outside website assets and Lab publication. No hardware, network integration, real sensor/client data, actuation, operational safety claim or human byline assignment.

## Execution boundaries

- Authorization: Hadi's continuing purpose-aligned research, implementation and PR/merge request. This is an isolated software prototype, not permission to operate equipment.
- Worktrees: root integration/docs in `fidret-sensor`; implementation in `fidret-sensor-code`.
- Dependencies: foundation charter, practice brief and existing unassigned idea. A real workflow, user/environment access and client evaluation remain discovery questions.
- Coordination: worker owns `experiments/sensor_freshness/` and `tests/test_sensor_freshness.py`; root owns task/register, experiment index/system-map links, independent review and delivery evidence. Separate worktrees; no overlap with website/runtime implementation.
- Attribution: implementation is agent-prepared for human review. Hadi is task owner, not an assumed article author; Elie has not participated in or approved this prototype. Eventual Lab publication requires actual contributor/byline selection in its own task.

## Plan

1. State the synthetic clock, freshness, ordering and recovery assumptions before implementation.
2. Implement fresh/stale/recovering states and deterministic normal/drop/delay/out-of-order/recovery replays against a latest-reading baseline.
3. Test boundary and invalid-input behavior plus invariants under explicitly stated conditions.
4. Independently reproduce outcomes, document limits, verify the public-output boundary and deliver through reviewed CI/PR/merge.

## Acceptance criteria

- One documented local command reproduces deterministic scenario results without external dependencies, network or equipment.
- Under the stated same-clock assumptions, stale readings are not offered as current; valid recovery observations are required before current use resumes.
- Delayed, out-of-order, dropped and invalid inputs have explicit behavior, including the timeout boundary.
- Comparison with the deliberately simple latest-reading baseline demonstrates the failure mode using actual synthetic replay results.
- Tests/evidence/limitations and actual attribution are recorded; no Lab article or company capability claim is invented.

## Decisions

This explores an existing idea within the practice brief. It does not choose a production protocol, safety architecture, target market or client commitment. Keep simulation evidence limited to the implemented model and fixtures.

## Verification

- Topic selected from the existing idea list on 2026-10-28 after the website release-reliability work; actual implementation/results follow.
- Implemented Python standard-library model and five deterministic replays. Exact semantics, source/receiver shared-clock assumption, strict timeout boundary, ordering watermark, two-observation recovery and immutable as-of snapshots are documented with the code.
- Root independently reproduced 33 observation points: latest-arrival baseline exposed age-invalid values on eight rows and rolled back timestamps twice; guarded current-value exposure had zero age-invalid rows in these fixtures. These are fixture/schedule counts, not real-world error rates or a general proof.
- Seventeen focused tests include all 6^5 = 7,776 short schedules from six input categories. Independent read-only review reran them and reproduced the counts, finding no concrete bug within the stated contract. Invalid receiver time is atomic; rejected readings cannot renew freshness/recovery; timeout/recovery boundary behavior is explicit.
- Root final `pnpm check` after actual public-policy main `a7ba607` passed 33 Node cases, 78 Python cases, zero Astro diagnostics and foundation/static-output validation. Task-register merge conflicts preserved all registrations. A later package-manager upgrade is independent; final CI will verify the combined current tree before merge.
- Added experiment index/system-map route and a bounded primary-source research note comparing timing questions with ROS 2 QoS, MQTT 5 expiry and monotonic-clock semantics. Those sources inform future questions; no protocol integration was tested or selected.
- Worker full pnpm gate initially attempted an implicit dependency bootstrap and encountered registry DNS; it was stopped without a claimed pass. Root used explicit frozen installation and then completed the full gate above.
- [PR 16](https://github.com/HadiAbouDaya/fidret/pull/16) merged as `d0bfa94`; both jobs passed in [push](https://github.com/HadiAbouDaya/fidret/actions/runs/40731141166) and [PR](https://github.com/HadiAbouDaya/fidret/actions/runs/40731150102) CI. The subsequent package-manager CI passed the final combined tree with 34 Node and 78 Python cases. Combined production `19b5429a` successfully deployed `603c4de`, retaining the prototype outside website assets and Lab publication.

## Handoff

- Checkpoint: bounded prototype delivered with reproducible evidence, independent review, full checks, merged PR and confirmed static-output separation.
- Remaining work: none for this software exercise; representative workflow evaluation and any Lab article/byline are separate future tasks.
- Next action: use the documented replay; select a real workflow, timing requirements and evaluation conditions before broader claims or equipment work.
- Blockers: no external input needed for this software exercise; real workflow/client discovery remains separate.
- Acceptance basis: Hadi's explicit continuing purpose-aligned work request; no claim of another contributor's review or real-world validation.
- Publication: PR 16 merged as `d0bfa94`; combined CI/production verified. No Lab article or human byline was published.
- Last verified: replay, bounded tests, independent review, final combined CI and output/deployment boundary checked on 2026-10-28.
