---
name: fidret-design
description: Design, redesign or refine Fidret website pages, diagrams and reading interfaces using its evidence-led visual language and static Astro architecture.
---

# Design for Fidret

Use [AGENTS.md](../../AGENTS.md) and the [charter](../../docs/foundation/charter.md) for authority and product truth. Read the canonical [design language](../../docs/design/fidret-design-brief.md); it owns tokens, typography, composition, figure rules and the mandatory website craft review. Apply those rules on each change, including small additions. This skill is an original project adaptation informed by the [recorded research](../../docs/design/research.md), not an upstream installation.

Identify what the visitor should understand or do on this surface. Home names the developing practice and leads to actual work; an article should make its reasoning easy to read; the signal walkthrough should make its state easy to inspect. Carry the same identity through these different jobs without reproducing the hero everywhere.

Inspect the actual source and current render before changing them. For a new composition, describe its main visual idea and explain why its content belongs to Fidret. If the idea would work unchanged for any technology company, make the artifact or explanation more specific. Use the existing [system map](../../docs/architecture/README.md) to find canonical sources.

Build in the accepted Astro/CSS system with local licensed assets. Follow [decision 0013](../../docs/decisions/0013-progressive-lab-experiences.md) for bounded progressive enhancement on the declared farm/factory Lab routes; other surfaces remain script-free. Keep complete HTML fallback, local-only state and direct reference access. Prefer original code-native diagrams, native controls and useful evidence. A diagram needs defined meanings and a caption; a synthetic walkthrough must not look like a real sensor feed. Preserve actual dates/bylines and make the limits of an experiment legible. New factual claims need evidence under the shared workflow.

Use descriptive headings with natural wrapping. Remove repeated mission fragments, interchangeable icon rows and decorative accent stripes before adding styling. Keep the shared footer compact. Public prose, metadata, accessible text and downloads must contain no em dashes; label absent values explicitly.

Review the whole rendered page for hierarchy and rhythm, then inspect narrow layouts, enlarged text, focus, selected controls, links and the relevant reading/empty/error states. Fix the largest competing emphasis or least useful element first. Confirm that the memorable element explains the subject and that quieter elements give it space. Keep scope proportional to the request; a small refinement does not require redesigning the site.

Run the repository checks required by AGENTS.md and behavior checks warranted by the change. Record what was actually inspected in the task, including any unavailable browser or deployment verification. A source review, passing build and live visual review are different kinds of evidence. Maintain the canonical design brief alongside an intentional change to its rules; keep task-specific progress in the task.

Save test artifacts with the available tools. For downloadable files, inspect the link and verify HTTP status, content type and exact bytes through a direct fetch. Browser download clicks can open a desktop Save dialog: handle or dismiss it yourself, and never make Hadi save an intermediate test file to continue the work. Preserve the user's browser download settings.
