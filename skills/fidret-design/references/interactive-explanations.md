# Frontend craft for interactive explanations

Project adaptation of the frontend-design process, refined under Hadi's 5 November 2026 authorization. Keep this portable guidance in the repository rather than modifying a machine-specific plugin cache. The [design brief](../../../docs/design/fidret-design-brief.md) remains authoritative for identity, and the [workspace research](../../../docs/design/lab-workspace-research.md) records evidence and limits.

## Choose the object before the container

Name the reader's question and the artifact that answers it: the exact candidate/evidence pair, stable operation record, local command boundary or actual observation requirement. Do not draw the same dashboard or graphic for every topic. Show where the decision changes and why. Every line, status, number and object must retain a defined meaning when the reader changes conditions.

## Make the interaction earn its complexity

- Start with a coherent worked example, two or three relevant controls and an optional open challenge. Avoid an empty sandbox, compulsory quiz, start modal or a large introductory screen that hides the useful action.
- A control changes a named assumption, with a model-backed response and reasons visible nearby. Multiple blockers remain effective when one is repaired. A priority response must not imply that lower checks passed.
- Keep inputs and output spatially close. Do not require scrolling through another explanation to discover the effect of an action. Check actual first-control and result positions, not only page height or word count.
- Make reset reversible and predictable. Preserve exact bounded state in a shareable link and during a reference round trip. Validate enum values, versions and preset membership; ignore malformed state safely.
- Keep native selection focus on the control. Reserve heading focus for explicit navigation, and verify that a reset can be undone with Back and restored with Forward. Check real browser events rather than inferring behavior from source strings.
- Put reasoning, fixed assumptions, accountable people and source depth in direct, ordinary disclosures/links. Retain complete worked examples when scripts are disabled or fail.
- Delay enhancement while opening a later static example, then check the handover. Preserve the reader's open explanation, focus and visible passage. Check Back to the original URL, including focus hidden by CSS. A fallback shared link must say when it shows starting conditions instead of the requested changes.

## Critique the behavior and the render

Inspect the same task with keyboard, phone, enlarged text and direct links. Check the changed artifact, result, status announcement and focus together. Native controls are a sound default for categorical facts; dragging and continuous motion need a specific purpose and equivalent access. Do not fabricate physical dynamics or confidence metrics to make a teaching model appear more realistic.

Review composite diagrams through their accessible structure as well as their appearance. An atomic image must not contain hidden interactive descendants. Link names include their visible text; named scroll regions have working keyboard access. Check meaningful selected/changed states in forced colors.

Print a page with its initial disclosures closed and inspect the result. All evidence cases, table columns and diagram boundaries must remain available. Restore the reader's previous disclosure and situation state after printing. A print-media screen capture alone does not verify pagination or PDF completeness.

Describe what verification establishes. Layout checks, policy tests and source-based agent reviews do not prove comprehension, completion, real-world safety or human approval. Useful research informs a design hypothesis; actual user studies would test it.
