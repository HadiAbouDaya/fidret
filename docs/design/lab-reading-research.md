# Lab reading and interaction research

4 November 2026. Human owner: Hadi Abou Daya. This is the design/research basis for the [guided Lab task](../tasks/2026-11-04-lab-reader-experience.md) and [bounded enhancement decision](../decisions/0013-progressive-lab-experiences.md).

## Reader problem and baseline

Hadi reports that the farm and factory Labs are hard to traverse and text-heavy. A source-based reader audit considered a curious first-time visitor, an engineering evaluator and a returning reader seeking one contract. It was an AI-assisted task walkthrough, not observed human research.

The live desktop baseline had about 1,336 visible words/6,297 px for the farm entry and 3,255 words/13,634 px for the factory entry at 1440 px. Measurements describe those particular rendered states, not attention or comprehension. The first farm action required another route and a category/situation selection; factory readers encountered a large interactive component before the complete essay, with a generic H2-only index.

## Primary sources and design inferences

- [NNGroup, Progressive Disclosure](https://www.nngroup.com/articles/progressive-disclosure/): prioritize essential options and make specialized depth available. Inference: one obvious story entry and one direct technical route; avoid deep disclosure hierarchies. This does not justify hiding critical scope or evidence.
- [GOV.UK, Accordion](https://design-system.service.gov.uk/components/accordion/): structure/reduce content first; do not hide material everyone needs. Inference: do not convert the entire essay into closed accordions. A selective lookup library is a different task from the novice story.
- [GOV.UK, Tabs](https://design-system.service.gov.uk/components/tabs/): sequential reading and comparison are poor fits for disconnected tab panels. Inference: use ordinary scene links, visible progress and local evidence/result comparison.
- [NNGroup, Wizards](https://www.nngroup.com/articles/wizards/): guidance can help unfamiliar tasks but constrains experts. Inference: let readers jump, read all, restart and bypass the story.
- [W3C, staged forms](https://www.w3.org/WAI/tutorials/forms/multi-page/): meaningful stages/progress support orientation. Adapting that principle to an educational journey is an inference, not direct evidence about Lab readers.
- [Chi and Wylie, ICAP author-hosted paper](https://education.asu.edu/sites/default/files/lcl/chiwylie2014icap_2.pdf): cognitive engagement concerns what a learner does mentally. UI clicks alone do not establish learning; its interactive category involves co-generation. Inference: use consequential predictions and explanations, not decorative manipulation.
- [Butler, Godbole and Marsh, institutional record](https://scholars.duke.edu/publication/746629), [DOI](https://doi.org/10.1037/a0031026): the reported text-study experiments favor explanatory over answer-only feedback for inference transfer. Inference: give a short causal explanation and a changed-condition example. Do not predict a numerical gain for this site.
- [Bret Victor, Explorable Explanations](https://worrydream.com/ExplorableExplanations/): a creator's design argument for examining assumptions/alternatives. This is an exemplar/philosophy, not a controlled usability result.
- [Red Blob Games, Diagram structure](https://www.redblobgames.com/making-of/diagram-structure/) and [Little Design Things](https://www.redblobgames.com/making-of/little-things/): connect a defined input to model output and keep visual changes understandable. Inference: local, deterministic before/after boundaries with useful static content, rather than distant animated consequences.
- [W3C, status messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html): announce concise results without unnecessarily moving focus. The whole long explanation is not a live region.
- [W3C, reflow](https://www.w3.org/WAI/WCAG21/Understanding/reflow) and [focus not obscured](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html): inspect narrow/zoomed content and focused controls. No sticky overlay should obscure the current task.
- [Vite, static assets](https://vite.dev/guide/assets.html): explicit URL/no-inline imports support a fingerprinted external module. This technical mechanism is verified in actual output, not assumed from documentation alone.

Primary sources were opened/researched by root and read-only agents on this date. Living guidance may change. There is no universally best layout or experimentally demonstrated Fidret learning/completion improvement here.

## Alternatives and selected composition

More accordions would retain the navigation problem. A generic carousel would add clicks without a causal model. A compulsory wizard would obstruct returning readers. An unbounded sandbox would imply operational dynamics the existing models do not simulate.

Select one five-decision mission per subject, a local model-backed counterfactual, and an expert lookup layer. The farm visual relates resources, local control and care. The factory artifact relates the proposed candidate to its verification. Numbering identifies real story position, never mastery. Wrong choices are explained without punishment, gates or a score; readers can reveal the explanation immediately.

Technical detail stays substantive. Existing farm blueprint anchors are stable; the factory gains a dedicated full-prose reference with substantive H3 navigation and lifecycle handoffs. Local search/filtering helps lookup without uploading queries. Complete HTML, native disclosures and links remain usable when enhancement is blocked.

## Review tasks and evidence limits

Test a first-time visitor reaching the first decision, predicting an unknown effect, distinguishing care from a blanket stop and identifying an evidence mismatch. Test an engineer reaching authority, timeout or sovereignty directly; test browser Back/Forward, reference return, restart, read-all and deep links. Include keyboard/focus, reduced motion, print, blocked script and malformed initialization.

Measure structural friction such as words/actions before the first decision, repeated introductions, route crossings and runtime/DOM size. These checks support implementation quality. They do not substitute for an observed human comprehension study. The task records actual rendered coverage, corrections, checks and release state.

## Implementation review corrections

Three read-only AI review roles and root browser passes refined the implementation. Immediate feedback moved beside the action; the compact artifact precedes phone choices in semantic order. A neutral selection marker replaced a misleading checkmark. A persistent polite announcer replaced a live region first exposed at answer time. Ordinary skip/legacy anchors now retain native focus; only known story fragments drive the controller. Contextual note links validate a scene key and return to its explanation without storage. Search aliases cover actual timeout, rollback, recovery and permission vocabulary.

Print specificity and enlarged-text layout failures found in the first complete matrix were corrected. All cases print despite active/zero-result filters, with screen state restored afterward. Narrow factory artifacts stack as readable candidate/evidence strips. Inputs and text grids reflow without clipping. Restart clears counterfactual disclosure state. The task records the final passing coverage and its limits.
