# Bounded progressive enhancement for Lab experiences

- Status: active
- Date: 2026-11-04
- Human decision owner: Hadi Abou Daya
- Related task: [Guided Lab reading experience](../tasks/2026-11-04-lab-reader-experience.md)
- Basis: Hadi requested a researched, substantially more interactive and readable experience for the two latest Labs and delegated its design and implementation. Decision 0007 already permits justified interactive components with deliberate script/CSP updates.

## Context

The no-browser-JavaScript convention supported the original static articles and native walkthroughs. The current user request requires local guided progress, shareable scene state, causal counterfactuals and direct topic/scenario finding. Reproducing these with large CSS radio matrices adds markup and navigation cost without a clear reading journey.

## Decision

Keep Astro static output, Free hosting, local fonts and no application server, framework, analytics or external runtime dependencies. Add one small same-origin fingerprinted native module for six declared routes belonging to the farm and factory Labs. Render complete, useful HTML first; hide steps and enable controls only after successful initialization. State is ephemeral in memory and shareable URL fragments, with no cookies/storage or network API calls.

Allow only the approved external module asset shape, its canonical source bytes and declared HTML routes in the output validator. Add `script-src 'self'` to the existing default-deny global CSP. Continue rejecting inline scripts, event handlers, dynamic HTML, arbitrary JavaScript assets, source maps, forms and remote dependencies. Keep authored Markdown's raw-HTML prohibition. Other pages remain script-free. Actual built-output scope and failure cases must be tested.

The module supports journey navigation, accessible local decision feedback, one-condition comparisons and local text/category filtering. It does not run AI, cloud execution, equipment or a physiological/operational simulation. Existing build-time models supply the teaching outcomes.

## Consequences

Readers get an explicit journey and direct lookup while core content remains available when scripting fails. A small additional asset and client behavior now require meaningful browser/history/focus/fallback tests. Performance and public security boundaries stay explicit. Research-informed design is not a measured comprehension or completion-rate improvement.

## Alternatives considered

More native radio panels preserve zero scripts but retain the confusing catalog and cannot provide robust shared state/history/search without growing CSS complexity. A UI framework/client router would add unnecessary dependencies and hydration. A compulsory wizard would obstruct expert readers. Native enhancement with direct reference routes is proportionate.

## Review

Established within Hadi's delegated UX task, not asserted as joint human review. Revisit if runtime scope, data collection, dependencies or external communication is proposed. The earlier zero-script convention remains historical evidence for prior releases; this record supersedes it only for the six declared Lab surfaces.
