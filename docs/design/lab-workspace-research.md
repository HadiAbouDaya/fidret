# Lab workspace research and design rationale

Reviewed 5 November 2026 for the [second Lab iteration](../tasks/2026-11-05-lab-workspaces.md). This extends the [first reading research](lab-reading-research.md). The outcome is a design hypothesis, not a measured learning improvement.

## What the first iteration still required

The user had to read substantial orientation before acting. Quiz choices revealed the same policy response regardless of the selection. A single authored counterfactual limited exploration, diagrams repeated across unlike situations, and the actual experiment state was lost during a notes round trip. Reducing the visible word count was useful but did not resolve these interaction problems.

## Sources and interpretation

| Primary source | What it supports | Design implication and limit |
| --- | --- | --- |
| [Shneiderman, Direct Manipulation, 1983](https://worrydream.com/refs/Shneiderman_1983_-_Direct_Manipulation%2C_A_Step_Beyond_Programming_Languages.pdf) | Visible objects, incremental reversible actions and immediate feedback as an interaction model | Change explicit conditions, preserve position and allow reset. This foundational argument is not a trial of these Labs. |
| [Bret Victor, Explorable Explanations, 2011 with 2024 postscript](https://worrydream.com/ExplorableExplanations/) | Readers can inspect assumptions and their consequences within an explained model | Let readers test the policy argument, with contextual reference access. Interactive pictures alone would not achieve this. |
| [Adams, Paulson and Wieman, guidance in PhET](https://phet.colorado.edu/web-pages/publications/PERC_Interview_Guidance.pdf) | The nature of guidance affected exploration in interviews with educational simulations; those simulations supplied implicit support | Provide a sound case, constrained controls, local feedback and an open challenge. Do not infer that all instruction should be removed or generalize their subject-specific findings into a guarantee. |
| [Alfieri et al., 2011 meta-analysis](https://doi.org/10.1037/a0021017) | Assisted and unassisted discovery have materially different evidence; feedback, examples and scaffolding matter | Avoid an empty sandbox. Offer starting cases, reasons, fixed assumptions and easy reset. This is a design inference across different interventions. |
| [Red Blob Games, Little Design Things](https://www.redblobgames.com/making-of/little-things/) | Original practitioner observations about comparison, meaningful state and local interaction | Keep unaffected objects still; make the changed boundary interpretable. Practitioner guidance is not a controlled usability study. |
| [W3C status messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html), [dragging movements](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html) | Programmatic status changes without focus transfer; pointer alternatives to dragging | Use native categorical controls and a persistent polite result announcement. Do not require dragging or move focus on every input change. |

Root directly reviewed Victor, the PhET guidance paper and W3C status guidance; a read-only research agent supplied the other primary pointers. Source-based critique is distinct from root's actual browser/render checks and from a human usability study.

## Compositions considered

1. A richer five-step quiz would retain answer recognition and expansion into prose as the central interaction.
2. A full farm-management or release dashboard would imply dynamics the models do not have and overwhelm the reader with controls.
3. A compact model workspace, with five coherent starting situations and two or three visible categorical dimensions each, allows supported exploration while retaining lookup and a complete worked-example fallback. This is the selected approach.

Desktop composition: short subject/context and quiet authorship, five situation links, then conditions beside an artifact and persistent response. Mobile keeps controls and result adjacent, with the explanatory artifact next. The map and release objects earn their space by identifying authority, evidence or uncertain effects. Detailed reasoning stays in an ordinary disclosure with direct engineering links.

## Evaluation criteria

Verify model consistency for the complete declared space, multi-blocker and priority behavior, exact shared/returned state, small/local runtime, meaningful static examples, first-control position, phone/text reflow, keyboard focus, printing and reference finding. These checks establish behavior and layout. They do not establish comprehension, completion rate, real equipment behavior, organizational reliability or search performance.
