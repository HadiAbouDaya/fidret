# Fidret design language

Version 4 · 5 November 2026 · **A working field of evidence**

This is the canonical visual direction for Fidret. Hadi requested a complete redesign and delegated its creative choices; [decision 0010](../decisions/0010-evidence-design-language.md) records the implementation basis. It replaces the layout and composition defaults of the supplied 24 October brief, preserved in Git history. The [website craft convention](../decisions/0012-website-craft.md) refines its application after Hadi’s 3 November review. The [charter](../foundation/charter.md) remains the authority for company purpose and claims.

## The idea

Make careful thinking tangible. Fidret's first practice concerns observations, time, decisions and physical conditions. Let an original explanatory artifact carry that world into the design, with clear language, readable typography and figures that explain a specific idea.

The audience is a prospective collaborator or technical reviewer assessing a concrete project question. Help them understand relevance, identify Fidret's actual contribution, inspect proportionate evidence, understand the people and approach, and choose a useful next step. The website does not need to explain its commercial purpose. Physical AI is a developing practice; do not imply an established delivery history.

## Visitor outcomes

Each primary page should help its intended visitor understand the subject, assess its relevance, identify what Fidret actually contributed, inspect proportionate evidence and choose a useful next step. Define the reader's question before selecting a composition. A page can be visually restrained and technically correct while still leaving that question unanswered.

Home introduces relevance and leads promptly to selected work. Work curates contributions by usefulness and evidence, while Lab remains the publication collection. A forwarded work link must make sense without a visit to Home. Explain professional background separately from Fidret engagement history. A discussion invitation uses a real, maintained destination; it does not require a new form or backend.

Use the [work and journey reference](../../skills/fidret-design/references/work-and-journeys.md) for contribution summaries and whole-journey critique. [Decision 0015](../decisions/0015-visitor-outcomes.md) records this convention. No design check proves that a lead will become a partner.

## Visual signature

Make the strongest relevant work easy to find. Original sensing and decision artifacts connect the visual identity to the subject; captions distinguish concepts from observations. Choose the primary action from the visitor's task and current evidence, rather than permanently prescribing one experiment. Forest and ivory establish purposeful emphasis. Other pages use descriptive headings and proportions suited to their content, rather than inheriting Home's introduction.

The signature is the relationship between an observation and the evidence needed to rely on it. Avoid using a decorative point cloud or instrument display without an understandable purpose. In the signal walkthrough, each highlighted mark corresponds to an actual selected state.

## Tokens

Use semantic CSS custom properties in the canonical [site stylesheet](../../src/styles/styles.css). Keep values centralized; an inverse surface adapts text, controls, links and focus together.

| Role | Value | Use |
| --- | --- | --- |
| Forest | `#153E35` | Primary ink, wordmark, strong panels and actions |
| Ivory | `#F6F2E9` | Main reading canvas and inverse text |
| Charcoal | `#242A27` | Detailed body text |
| Sage | `#D9E3DA` | Diagram fields and quiet contextual surfaces |
| Copper | `#A4543B` | Selected meaningful events and accents on ivory |
| Muted ink | `#58665D` | Secondary text on ivory |
| Control boundary | `#66766A` | Visible input and control edges on ivory |
| Quiet rule | `#C8D2C8` | Nonessential separation on light surfaces |

Forest on ivory is approximately 10.61:1; charcoal on ivory 13.09:1; copper on ivory 4.81:1. Copper on sage is about 4.08:1 and on forest about 2.21:1: use forest/charcoal on sage and ivory/sage on forest for ordinary text. These palette calculations do not establish accessibility for an entire component. Verify actual selected, hover and focus states.

Retain the existing self-hosted, licensed [font assets](font-sources.md). Manrope is the primary family, with Arial/sans-serif fallback. Newsreader 400 italic, with Georgia/serif fallback, may carry a complete short editorial phrase. Do not isolate an arbitrary word in a different color or serif face.

| Type role | Direction |
| --- | --- |
| Company display | Fluid, approximately 72–112 px on wide screens and 40–56 px on phones; Manrope 500–600; compact leading and careful negative tracking |
| Page and section headings | Clear hierarchy; approximately 32–64 px according to the surface; natural wrapping |
| Lead | Approximately 18–22 px, comfortable leading, short enough to scan |
| Reading body | 16–18 px, approximately 1.6–1.75 line height and 60–68 character measure |
| Labels and captions | 13–16 px, sentence case, normal tracking; never shrink essential information to fit a diagram |

These ranges are starting points. Preserve hierarchy and readable wrapping at narrow widths, text enlargement and zoom rather than fixing a heading's height or forcing desktop line breaks.

## Composition

Use a shared outer alignment with fluid gutters, roughly 20–24 px on phones and 40–64 px on wide screens. A broad content frame can reach approximately 1,400 px; paragraphs stay within their reading measure. Use a 4 px spacing unit with 8 px groupings, but vary the intervals: related details sit close together and major ideas have room around them.

Asymmetry is deliberate: a large statement may share space with a figure, while a quieter section gives a narrow introduction room beside a wider explanation. Alternate open canvas, one substantial forest field and focused evidence. Mobile reorders into a clear reading sequence, with the explanation before its controls and supporting detail.

Use flat surfaces and modest rounding where a control or enclosed experiment needs a boundary. Cards are useful only for independently actionable or clearly grouped content. Avoid turning every paragraph into a panel. Rules express a relationship; numbering expresses a real sequence. Neither is a default decoration.

## Surface grammar

| Surface | Reader's job | Design response |
| --- | --- | --- |
| Home | Recognize the problem space and reach useful evidence | Plain subject, concise introduction, early selected work and an obvious next step |
| Work overview | Choose a relevant contribution | Curated questions, actual artifacts, evidence levels and links to contribution summaries |
| Individual work | Assess what exists and why it matters | Question, contribution, finding, relevance, limits, next validation and direct artifact/method access |
| Approach | Understand how a bounded project could begin | Starting context, scope, useful outputs, evidence, responsibilities and a discussion route |
| About and people | Understand the company and responsible people | Approved roles/background, actual contributions, clear distinction from company delivery history |
| Contact | Reach a real person with useful context | Maintained destination, accurate handoff explanation and no fictional address, form or response guarantee |
| Lab index | Find and assess published work | Readable titles, real kind/date/byline metadata, an honest publication state and a route to the existing exploration |
| Lab article | Understand a question, method, result and limits | Restrained reading measure, strong headings, legible figures/code, visible authorship, dates and sources |
| Signal walkthrough | Inspect why a reading is accepted or stale | Native state selection, explicit time/age/status, a persistent explanation and direct model/source references |
| Model workspace | Change assumptions and understand the response | Useful initial example, nearby inputs/result, explicit teaching scope, matching reading order and direct project context |
| 404 | Recover from an unknown address | Familiar identity, clear explanation, working home and Lab links; noindex retained |

A new surface should use the part of this grammar that serves its task. It need not inherit the company's largest headline, hero figure or dark panel.

## Figure language

- Use original SVG or other code-native artwork for sensing fields, observation boundaries and signal paths. Maintain consistent line weights, point shapes, spacing and label hierarchy.
- Separate conceptual artwork from measured evidence in the caption. An isometric scene is not a photograph or record of built hardware.
- Distinguish observations, accepted state and rejected/stale events through shape or text as well as color. Essential graphic cues need visible contrast; decorative mesh may be quieter.
- Wide technical figures retain readable horizontal access or a full-size link on narrow screens; keep a useful plain-text caption. The first structured article image is its cover.
- Every technical axis, number and status must have a defined meaning. Do not invent live telemetry, accuracy figures or operating conditions for visual atmosphere.
- Put essential explanations in normal page text so they remain readable on a phone and available without interpreting a drawing. Hide decorative SVG from assistive technology; give explanatory figures an appropriate accessible name and caption.
- Do not reuse third-party project imagery as Fidret's work. Record source and license when an external asset is actually introduced.

## Interaction and motion

Keep the accepted static Astro architecture, same-origin assets and external fingerprinted CSS. Under [decision 0013](../decisions/0013-progressive-lab-experiences.md), the farm/factory Lab routes may progressively enhance complete HTML with one small approved native module. Other pages remain script-free. Use local state, shareable scene links, concise causal feedback and direct reference access. No framework, analytics, external requests or compulsory tour is introduced. Runtime and CSP changes require synchronized output tests, not an unreviewed exception for spectacle.

A radio group selects a documented moment in the synthetic signal scenario. Its labels identify the choices, the selected state is visibly different, and the revealed explanation describes what changed. It is a walkthrough, not a running simulator or real sensor feed. Keep controls keyboard usable and their order consistent with the visible sequence. Expose essential limits beside the experience, rather than behind an interaction.

Use real links for navigation and native controls for state. Maintain a visible focus indicator on every surface, with comfortable primary touch targets of at least 44 px. Disclosures should show what will open. Do not depend on hover, motion or color alone.

For explanations with a model, start with a useful example and let the reader change a small number of explicit assumptions. Keep the resulting action and reasons near the inputs. Repairing one condition must not conceal other blockers, and a priority response must identify checks not evaluated. Give each situation the artifact it needs instead of reusing an attractive but irrelevant graphic. Preserve exact bounded settings through sharing, references, reload and history. The [frontend craft checks](../../skills/fidret-design/references/interactive-explanations.md) record this review process. These are design requirements, not claims of measured learning gains.

Motion may clarify a user's action through a brief state transition, approximately 120–180 ms. Avoid perpetual scanning, parallax, scroll interception and section-by-section entrance effects. Honor reduced-motion preferences. A still composition must remain complete.

## Words and evidence

Use specific nouns, plain verbs and sentence case. Do not use em dashes in public output, including document titles, metadata, source labels, accessible text, figures and authored downloads. Use full sentences, commas, colons or parentheses; use ` | ` between a page title and site name. Label missing values explicitly instead of using a dash placeholder. Explain a need, a decision or an observable result. Preserve **Fidret** and **Trust earned.** The name is inspired by the Latin trust root; do not present the coined name as a literal ancient translation.

Keep a visible distinction between company purpose, developing practice, candidate application and demonstrated work. A software exploration has its actual assumptions and limits. A simulation result does not establish a physical-system outcome. Preserve actual authors and dates; an agent-built interface does not establish a human byline or joint review.

Keep website navigation focused on Fidret’s public pages. Hadi requested removal of outbound GitHub links on 29 October 2026: do not add them to public navigation, project actions, bylines or article templates. Use designed onsite project, charter, contributor, experiment-method and article-source pages for those destinations. Keep contributor names and internal repository provenance intact. Do not invent an email address, inquiry form, client logo, testimonial, service package or outcome metric to complete the layout.

## Avoiding template habits

Reject repeated icon-heading-copy cards, obligatory all-caps labels, meaningless 01/02/03 markers, decorative dashboard metrics, generic arrows on every action, gradient washes, glowing machinery and stock robot renders. Also reject an undifferentiated cream-and-serif editorial treatment: Manrope, the sensing field and the native experiment should give this site its own identity.

These are diagnostics, not a substitute for looking. The retained forest/ivory/copper palette is a deliberate Fidret choice. A distinctive result depends on hierarchy, content, proportion and craft; changing to fashionable colors would not establish it.

## Website craft rules

These rules apply to all new public pages and edits. Start with the visitor’s task and Fidret’s purpose, rather than a list of fashionable visual prohibitions.

1. **Name the subject.** A reader should quickly understand what Fidret is developing or what this page explains. Prefer “Signal freshness: method and replay” to “From a rule to a replay.” Put context in the introduction rather than repeating the heading in an eyebrow.
2. **Give each region one job.** Home introduces the company and leads to work; the Lab lists publications before its larger exploration feature; an article supports reading; a method page supports inspecting evidence. The shared footer ends the page with compact navigation and the tagline.
3. **Give evidence the emphasis.** Preserve “Trust earned.” as the brand promise. Establish relevance, expose the useful work and keep its essential scope nearby. Remove repeated mission fragments and development statements. Repeating a clear action at a useful decision point can help; repeating it under vague labels does not.
4. **Earn every visual element.** Explain what a figure, icon, container, rule, number or dark surface helps the reader understand. Remove decoration that cannot answer that question. Avoid interchangeable icon-heading-copy trios, accent stripes on ordinary panels, fake telemetry and oversized slogan footers. A real state boundary or focus ring is functional and should remain visible.
5. **Keep claims proportionate.** Give software experiments their conditions and limits. Keep conceptual illustrations distinct from measurements. Do not invent contact destinations, metrics, client proof or capabilities to finish a layout. Show actual credits and dates.
6. **Use the existing system.** Retain the licensed fonts, palette, semantic tokens and static Astro architecture. Fix shared patterns at their source. Do not replace one generic template with another, add a framework for decoration, or leave unused selectors behind.
7. **Compose for reading and action.** Use descriptive link text, an obvious next step, natural heading wrapping and readable captions. Keep practical/source pages quieter than Home. Use numbering only for a meaningful sequence. Preserve keyboard access, visible focus, 44 px primary touch targets and reduced-motion behavior.
8. **Inspect the whole result.** After each coherent increment, look at the rendered page before polishing it. Check wide desktop, tablet, 390 px and 320 px layouts, enlarged text, links and relevant native-control states. Exercise the Lab’s empty state when its template changes. Record exact coverage and limits in the task; passing CI is not proof of design quality.

Before merging, the task or PR records the page’s reader task, the concrete clutter/confusion removed, why any new visual treatment helps and the render/behavior checks actually performed. An automated “AI slop score” cannot establish these judgments. The public-output validator enforces the objective em-dash rule, including encoded HTML entities, alongside existing publication contracts.

## Build, look, refine

Read the [project design skill](../../skills/fidret-design/SKILL.md) when changing the website. Inspect the relevant content and current render, choose the surface's job, then implement against this language. Review the complete page before refining individual details.

Before release, verify narrow mobile, tablet and wide desktop layouts, readable enlarged text, native-control keyboard behavior, visible focus, contrast and all destinations. Look at home, Lab, an article fixture, 404 and the exploration. Check that diagrams explain their concepts and that selected states agree with their model. Run the repository's shared checks and record exactly which visual and functional checks actually ran in the current [task record](../tasks/README.md).

Review the full journey as well as the component. On a phone, check which useful evidence appears first, how much explanation precedes it and whether the reader can reach a legitimate next step. Do not equate no overflow with useful prioritization. Keep DOM reading order aligned with visual order, including results and diagrams.

| Evidence | What to record | What it cannot establish alone |
| --- | --- | --- |
| Automated contracts | Types, behavior, lifecycle withdrawal, links, metadata and security boundaries | Prose truth, visual taste, comprehension or commercial effectiveness |
| Render inspection | Actual routes, widths, text enlargement, states, emphasis and destinations | Screen-reader speech, every device or real-reader understanding |
| Keyboard and assistive use | Tasks completed, focus, announcements, reading order, diagram alternatives and exact tools used | Full accessibility conformance from a single pass |
| Performance | Environment, cache/network conditions, routes, paint/layout/interaction observations | Field Core Web Vitals from a local laboratory run |
| Reader feedback | Actual unprompted interpretation, navigation, hesitation and evidence needs | Conversion rates or universal conclusions from a small sample |
| Inquiry outcomes | Attempted contact, confirmed inquiry, qualified discussion and progression separately | A partnership inferred from a click or time on page |

Use the [visitor validation plan](visitor-validation.md) for actual-reader tasks and outcome records. Keep personal inquiry details in an appropriate private workspace; public repository notes should contain only non-sensitive aggregate findings. Update guidance when repeated observed confusion supports a change, rather than accumulating prohibitions from individual tastes.

[Research and adaptation provenance](research.md) records the reviewed skills, reference principles and intentionally omitted upstream machinery. This brief is a maintained Fidret specification; it does not assert that an external design detector or certification ran.
