# Autonomous farm: research and iteration basis

4 November 2026. Companion to the [task](../tasks/2026-11-04-autonomous-farm-lab.md), [canonical simple article](../../lab/pieces/autonomous-farm.md), [scenario model](../../src/lib/autonomous-farm.ts) and [blueprint/source interpretations](../../src/lib/farm-blueprint.ts).

## Scope and evidence

The farm is fictional. This is an original educational architecture and action-gating model, not a validated twin, complete hazard analysis, commercial proposal or physical trial. Hadi directs and owns the individually authored exploration; AI-assisted research/implementation is disclosed. No involvement or review by Elie is inferred.

Three read-only AI research/review roles covered agricultural/animal/food constraints, cloud/security/data controls and repository/UI integration. These reviews are not independent human agronomic, veterinary, machinery or legal validation. Their recommendations informed root integration; they do not grant authority.

The canonical primary-source list and interpretation limits live in `farmReferences`, alongside chapter-to-source links, and are published in the blueprint. Sources cover FAO water balance/IPM, university extension sensor and nutrient guidance, NSW greenhouse controls, WOAH/EFSA animal welfare, official sheep/biosecurity guidance, FDA withdrawal, European Commission food-chain obligations, HSE confined spaces, NIST OT/IoT, OASIS MQTT, official AWS state/command semantics, OWASP and CNIL/EDPB/EU data rules. Sources were opened during research on this date. The root separately checked HSE's confined-space guidance, NSW greenhouse sensing and the dated WOAH dairy chapter. Living guidance and jurisdiction-specific examples are labeled; no general compliance status is claimed.

## Design choices

Keep the accepted Astro static system, no browser JavaScript and unchanged CSP. Three reading jobs have distinct destinations: simple article, native scenario desk and detailed engineering blueprint. Scenario links land on the relevant blueprint section, and technical sections return to the simple/scenario routes. The editable Markdown brief carries explicit unperformed tests and no operational authority.

The conceptual farm plan explains shared water and separate food/dirty routes. It has no invented dimensions, yield, live values or performance metrics. Readable horizontal access and equivalent text destinations replace shrinking technical labels on a phone. The scenario desk has four meaningful domains with seven independent cases each; it is not a simulated timeline, aggregate score or a claimed complete response procedure.

## Review pass 1: domain interactions

- Distinguished local machinery protection from essential ventilation, drinking water and other care. Rejected a farm-wide stop as a universal safe state.
- Treated water/energy/routes/review capacity as shared constraints and uncertain consumption as reserved until reconciled.
- Explicitly separated cattle/sheep nutrition, animal assessment/treatment and food eligibility. An anomaly does not establish diagnosis.
- Nutrient EC alone cannot establish individual element sufficiency. The proposed guessed mixture is held for investigation and replacement; a signature cannot fix the evidence.
- Added local urgent attendance for lambing/calving/distress, irrigation leakage, egg-handling jams, milking/cleaning incompatible states and product recall lineage.
- Meat follows qualified handling, transport and processing; no autonomous irreversible animal intervention is introduced.

## Review pass 2: command and security boundaries

- A confirmed completed operation returns its durable result without repeating actuation. Result access still needs authorization.
- A lost receipt requires physical reconciliation and retention of possible effect reservations. Transport delivery is not exactly-once physical action.
- A cancellation request is not a confirmed stop. Recovery can require protection and reconciliation concurrently.
- Added boot/session generation or durable sequencing to distinguish valid reboot from replay. Replaced the imprecise phrase “replayed credentials.”
- A disconnected edge cannot immediately receive cloud revocations. Bounded offline delegation requires finite validity, usable time, conservative scope and local disable; new high-risk work waits for current authorization.
- Persistent executor fencing and atomic reservations are implementation requirements, not automatic guarantees from a diagram.
- Residency, plaintext access, jurisdiction, operational dependencies and tested exit are separate questions. Data Act and GDPR applicability remain qualified.

## Review pass 3: reading, native controls and render

- Added selected markers beyond color, visible focus and primary 44 px touch targets.
- Kept technical farm labels readable in a scrollable region with equivalent text links.
- Printed cases retain their primary answer and reasoning, even though interactive choices are hidden.
- Enlarged 320 px review found grid minimum-content overflow. Changed single-column tracks to explicit zero minimums and let control grids adapt to available text width. WebKit focus heuristics required a visible label outline for actual focus as well as focus-visible.
- A final direct-link check found a UF/IFAS redirect loop; replaced it with the directly inspected University of Minnesota Extension primary source on the same sensor constraints. Some primary sites block direct curl despite successful research-reader access; no claim that every source returned HTTP 200 is made.
- Initial desktop/390 px rendering showed the food-route label overrunning its background; shortened it. Moved the diagram caption to the figure boundary and kept navigation distinct.
- The desktop station layout uses one evidence field beside a quiet situation list. Mobile puts the selector before evidence and provides return links. Technical detail stays off the simple reading route.

## Verification boundaries

The model tests enforce all independent action gates over 9,216 combinations, plus protection/unknown/completed-operation precedence and exact review boundaries. Explicit case expectations protect all 28 authored teaching answers. Real Astro fixture builds test publication, withdrawal, destinations and controls; Python output tests retain exact Markdown exceptions and static/public-copy contracts.

The task records final commands, rendered coverage, publication and unresolved limitations. Tests of this model do not test actual devices, farm processes, alarms, provider access, food safety or human response. No physical/distributed-system blueprint rehearsal is represented as performed.
