# A welcoming way to earn trust

Human-centered website audit and redesign proposal. 6 November 2026, Europe/Paris. Source baseline: `cde7631`. Human owner: Hadi Abou Daya. **Direction approved by Hadi on 6 November 2026. Implementation and validation are tracked separately.** [Audit task](../tasks/2026-11-05-human-centered-review.md). [Implementation task](../tasks/2026-11-06-human-centered-experience.md). [Dated verification](2026-11-06-human-centered-verification.md).

## A. Executive diagnosis and mission alignment

Fidret has useful work to show. The next improvement is to help people recognize its value before asking them to understand its engineering vocabulary.

The [charter](../foundation/charter.md) defines the mission as expertise that earns trust through sound judgment, useful work and reliable delivery. Physical AI is the first developing practice, not the whole company or an established delivery claim. The website should make that judgment understandable, let people inspect actual contributions and help them decide whether a conversation is worthwhile. Enjoyment matters because it can invite attention and understanding. It is not a substitute for evidence or a separate goal of maximizing time on site.

**Recommended direction: recognizable problem → something we made → a small discovery → why it works and where it stops → a useful conversation.**

This advances the existing “A working field of evidence” design language. It does not require a new identity, a new technology stack, a change to the charter or a claim that Fidret already sells mature Physical AI services.

### What the audit establishes

The current site is substantially better equipped than a technical blog: it has curated Work pages, source-derived examples, actual professional context, project invitations and a real contact destination. Previous revisions solved several structural omissions. They did not establish non-technical comprehension. The [visitor-validation document](visitor-validation.md) explicitly records no completed human-reader research.

The remaining friction is editorial and experiential:

- **Category before meaning.** “Physical AI, from observation to action.” introduces a field before introducing the company or a recognizable difficulty.
- **Explanations use the language of their implementation.** “Freshness guard”, “bounded authority” and “candidate” are useful in technical context, but discovery should first establish old information, permission and the version being checked.
- **The interesting consequence arrives late.** The farm's shared-water problem and the software model's revision mismatch are stronger entry points than architecture categories.
- **The experience becomes more textual on phones.** Below 760 px, Home hides both the hero observation figure and the selected-work visual previews. The live 390 px DOM confirms both are `display: none`. Compactness is useful, but the mobile journey loses the illustrative layer entirely.
- **Contact is available, but preparation looks heavier than necessary.** “You do not need a finished specification” is already present. The subsequent four-item context list and commitment language may undermine that reassurance.
- **Trust is explained repeatedly rather than always demonstrated.** The best proof is the visible moment when a model withholds an action and explains why, alongside a real person who takes responsibility.

These are expert-review hypotheses grounded in source and browser observations, not statements that visitors actually failed or felt intimidated.

### Retain, simplify, redesign, remove

| Treatment | Recommendation | Why it serves the mission |
| --- | --- | --- |
| Retain | Forest, ivory, sage and restrained copper; Manrope and Newsreader; original diagrams; calm editorial space | Makes Fidret recognizable without borrowing someone else's commercial credibility |
| Retain | Published routes, actual contributors/dates, Work/Lab distinction, exact model links, method and limitation pages | Lets people inspect the basis of claims and share dependable references |
| Retain | “Trust earned.”, “Start with one useful question.”, transparent Hadi contact handoff | Already conveys purpose and a proportionate next step |
| Simplify | Main introductions, scope labels, repeated formal CTAs, contact preparation | Reduces translation work without reducing technical depth |
| Redesign | Question-first Work presentation and one compact mobile-friendly causal illustration | Makes useful judgment visible before visitors enter technical detail |
| Remove or relocate | Duplicate title/question phrasing, catalogue preambles, process detail before first contact | Gives each paragraph a clear visitor purpose |
| Decline | Fake live telemetry, allocation games, autonomous-operation claims, invented packages, scroll spectacle | These would manufacture apparent maturity rather than earn trust |

A proposed change must pass four questions: does it establish relevance, accurately show what exists, preserve its limits, and help someone choose a next step? If it only makes the company look more advanced, omit it.

## Evidence and coverage

Repository review covered the shared instructions and startup workflow, charter and practice brief, contribution/task/decision registers, current visitor follow-up, architecture map, design brief, DESIGN.md, design skill and references, search guidance, visitor validation, all requested Astro pages, shared Work data/components, people/contact configuration, Lab models/controller, CSS and relevant test contracts. Two independent read-only agent reviews covered content/evidence and interactions/accessibility. This is a review of the complete site's architecture and visitor-facing families, not a claim to have read every historical task or every line of code.

Live inspection used `https://fidret.com/` on 5 November UTC / 6 November Paris. Desktop Home was visually inspected at 1280 × 800. Live rendered text, headings, link destinations and document overflow were inspected at desktop 1280 px and mobile 390 px for Home, Work, Approach, About, Contact, Lab and all five individual Work pages. Hadi's profile was also inspected at desktop. No document-level horizontal overflow was observed in those samples. On mobile Home, the first Work heading began around 667 px; this measures placement, not comprehension.

The farm control was exercised from `#scene-water~v1-000`: changing Shared water to Not reserved produced `#scene-water~v1-010` and “Hold and investigate”. This confirms that particular interaction and source boundary, not physical safety or full accessibility. Programmatic selection did not establish keyboard focus behavior.

**Rendered visual review recovered through an isolated browser.** Shared-preview snapshots repeatedly timed out after the initial desktop image, and CUA reported its browser host unavailable. A local Playwright session using the installed Brave browser then captured all eleven main/Work pages plus the signal exploration, farm workspace and factory workspace at 1440 and 390 px with fonts loaded (28 renders). Full-page compositions were inspected in contact sheets, with larger mobile opening crops for Home, Work and Contact. These renders confirm the consistent forest/ivory identity, spacious desktop rows, long textual mobile sequence and the missing Home previews. The workspace renders also keep controls next to results on desktop and stack them coherently on mobile, while retaining the technical labels identified below. They show no obvious broken composition; they do not establish a usability outcome. Temporary captures and the viewport inventory remain ignored under `.local/review/`; no browser or server was left running.

Tablet/320 px, enlarged text, screen-reader listening, full keyboard journeys, measured contrast, print pagination and a second browser engine were not completed in this audit. Do not describe this as a completed WCAG audit. These belong to the implementation baseline and verification gates below. No inquiry was sent, and contact receipt was not tested.

The accidental probe of `/work/agent-workflow/` returned the expected 404; the actual linked route `/work/agentic-company-harness/` was then inspected. This is not a broken site-link finding.

## Five visitors: review hypotheses to test

No ten-second user test has been run. The assessments below predict where to look, rather than score real people.

| Visitor | Can explain Fidret after 10 seconds? Can name a relevant problem? | Projects and evidence distinctions | Motivation, language and next step |
| --- | --- | --- | --- |
| Non-technical business owner | May infer an AI research site rather than an emerging engineering company. Needs an explicit company sentence and a familiar work problem. | Scope labels are honest but specialist. “Software experiment with invented inputs” is easier than “synthetic replay”. | Work and Contact are visible. Abstract language may make further exploration feel like homework. Lead with “Could this help with a process that keeps going wrong?” |
| Operations manager | Can recognize delayed readings once reached; Home does not immediately connect them to an operating decision. | Water reservation and uncertain pump outcomes offer relevance; distinguish model checks from real control capability. | Put the operational situation before the architecture. Invite one example of a recurring difficulty, not a complete systems brief. |
| Entrepreneur with an early idea | May not know whether a company that “builds software experiments” can discuss an unformed idea. | Needs to see that working software and exploratory designs coexist, without interpreting a concept as a product. | “Discuss a project” is available but sounds more prepared than “Talk about an idea”. Explain that the first conversation can determine fit and a useful question. |
| Technical collaborator | Most likely to understand the field and infer a contribution quickly. | Existing methods, exact model states, limitations and source pages are strengths. Keep them one clear link away. | Avoid a compulsory introductory tour. A concise explanation should accelerate access to rigor rather than hide it. |
| Curious visitor | The field name may not explain what anyone is building. A concrete question can provide an immediate foothold. | A source-derived before/after makes the project matter; a short visible scope sentence prevents fictional systems being mistaken for deployed ones. | Invite “What changes if...?” without a quiz, score or forced interaction. They should learn something even if they never contact Fidret. |

Across all five perspectives, contact navigation already works as a route. What remains unmeasured is whether people understand the handoff and feel ready to use it. Technical terminology is not inherently unwelcome; introducing it before its meaning is the avoidable burden.

## B. Visitor journey and site structure

Keep the existing top-level destinations and routes: Home via the wordmark, Work, Approach, About (`/project/`), Lab and Contact. A wholesale navigation change is lower value than making those destinations answer distinct questions. Consider the visible label “How we work” for Approach only after checking mobile wrapping and testing recognition. Do not create separate beginner and expert sites.

**Discover:** Home introduces company and problem → Work presents an interesting question → individual Work page shows what was made and one example → optional Lab exploration → About/Approach establishes people and working relationship → Contact.

**Go deeper:** Work or a forwarded Lab URL → summary/scope/actual contribution → direct workspace or engineering notes → method, sources and limitations → project-specific invitation. Experts can take the direct method link without finishing an exercise.

**Direct Work entry:** question + why it matters + what exists + short scope sentence in the first content block. Follow with one worked example and two distinct actions: explore the artifact; read its method. “All work” and a related-question invitation provide context and continuation. Do not make Home a prerequisite.

### Homepage sequence

1. **What is Fidret?** A short aspirational heading supported immediately by “Fidret is an emerging engineering company...” and current scope. Keep Work primary and conversation secondary.
2. **Why care?** One compact sentence or illustrated example: a normal-looking reading can be too old to use. This should not become a second long hero.
3. **What exists?** Three selected questions with concise artifact/scope descriptions and purposeful previews. Lead with sensor and farm work; keep the implemented publishing system visible as actual software evidence. Link all five projects from Work.
4. **Could this relate to me?** “Bring us a problem worth understanding.” Three grounded conversation examples, linked to relevant evidence, not a service-package grid.
5. **Why trust the approach?** Hadi's approved background plus one concrete working principle: compare an experiment with what happens today and explain where it fails. Link people and Approach; avoid another mission essay.
6. **What next?** “Explore a question” or “Tell us what you have in mind.” No finished specification required.

Use the existing asymmetry and one substantial forest section for emphasis. Let the rhythm move between short prose and artifacts. On mobile, retain a compact static before/after near the first project instead of restoring a large hero diagram above all work. Use no scroll interception, entrance sequence or autoplay. Readers can skip any example.

## C. Page-by-page recommendations

All expected impacts below are hypotheses. P0 clarifies existing content; P1 changes composition and explanatory depth; P2 refines only after testing.

| Page and current problem | Intended experience and content | Design/interaction and files | Priority / expected impact |
| --- | --- | --- | --- |
| Home: field label before company identity; selected work uses artifact categories; all explanatory visuals disappear on mobile | Recognize an engineering company, understand one problem and choose a question. Use the hero and Physical AI copy below. Keep visible current scope. | `src/pages/index.astro`, `ObservationField.astro`, `SelectedWork.astro`, `WorkArtifact.astro`, `visitor.css`. Start with copy; then replace a redundant preview with one source-backed static consequence at phone sizes. | P0 identity, P1 hierarchy. Highest expected comprehension benefit. |
| Work index: “observations, resources or authority” asks visitors to interpret the framework; “Selected contributions” repeats the introduction | Browse five questions, see why each matters and identify the kind of thing that exists. Retain ownership statement once. | `src/pages/work/index.astro`, `src/lib/work.ts`, `SelectedWork.astro`, `WorkArtifact.astro`, `visitor.css`. Use spacious editorial rows with project-specific visuals; no filter for five entries. Question first, short scope nearby, concise summary, distinct CTA. | P0 wording, P1 gallery. High relevance/discovery benefit. |
| All five Work detail pages: repeated title/question and technical contribution precede recognizable stakes; essential limits appear lower | A forwarded link should explain the problem and actual artifact immediately. Keep the existing contribution, result, limits and next-validation depth. | `src/pages/work/[slug].astro`, `work.ts`, `WorkEvidence.astro`, `WorkContext.astro`, `visitor.css`. Move one sentence of relevance and essential scope into the opening; preserve exact source-derived worked cases and artifact/method links. | P0 first-block clarity, P1 examples. High scope comprehension benefit. |
| Approach: strong opening followed by five process stages with repeated output terminology | Understand what a first conversation might lead to and why tests, responsibility and the option to stop matter | `src/pages/approach.astro`, `visitor.css`, `ProjectInvitation.astro`. Retain “Start with one useful question.” Introduce “Understand the problem. Test something useful. Decide what follows.” as a short summary; keep the five detailed stages below or in native disclosures. No packaged engagement promise. | P0 invitations, P1 progressive disclosure. Medium reduction in perceived preparation. |
| About: principles and name story before clear company/person context; abstract responsibility language | Know what Fidret is, who is building the work and how its purpose shapes decisions | `src/pages/project.astro`, `src/lib/people.ts`, profile template, `visitor.css`. Put company identity and Hadi's approved role earlier. Keep name origin and charter link. Say “Work someone else can understand and continue.” Preserve all actual publication credits, including contributors not featured in promotion. | P0 introduction, P1 order. High identity benefit. |
| Contact: useful reassurance competes with a substantial context list and commitment language | Feel that an early idea or recurring problem is enough; understand that the next link opens Hadi's personal page | `src/pages/contact.astro`, `src/lib/contact.ts`, `ProjectInvitation.astro`. Two visible prompts; optional “Useful details, if you have them” disclosure. Keep real destination and transparent note together. No form, new mailbox or response promise. | P0. High reduction in invitation friction. |
| Lab index: discovery shortcut itself says “contributions and evidence”; publication labels dominate | Understand this is the deeper collection, browse real publications, or return to question-led Work | `src/pages/lab/index.astro`, `src/styles/lab.css`, published metadata. “New here? Explore the questions behind the work.” Preserve chronology, bylines/dates and empty state. Avoid duplicating the Work gallery. | P0 labels, P1 summaries only where needed. Medium wayfinding benefit. |
| Farm/factory workspaces and engineering notes: good interactions introduced as an “editable policy model”; dense result labels | Start with a concrete decision, change one condition, see a comprehensible result, then inspect precise reasoning | `LabExperience.astro`, `WorkspaceArtifact.astro`, `FarmMap.astro`, `lab-journeys.ts`, `lab-workspaces.ts`, `lab-experience.css`, `workspace.css`. Add plain-language framing without changing canonical outcomes. Preserve reference returns and all five scenes. | P1 entry copy, P2 refinement. High educational potential; no measured learning gain yet. |
| Signal exploration and method: useful fixed walkthrough can be mistaken for a live simulation if relabeled loosely | Learn that ordinary-looking information can expire, then inspect the actual software experiment | `SignalWalkthrough.astro`, `signal-walkthrough.ts`, `src/pages/explorations/signal-freshness.astro`, method route, `exploration.css`. Name choices as recorded moments; show the unchanged value and changed usability. Keep invented clock and threshold limitations visible. | P1 explanation, P2 interaction polish. High value at low complexity. |
| Agent article/planning brief: five technical contracts before practical action boundaries | See what an agent may read, draft and send; understand the brief is planning, not an installed control system | `AgenticBoundary.astro`, `workflow-brief.ts`, workflow-brief routes, canonical Lab piece. Lead with the fictional support-ticket task, then introduce contract terminology. Preserve editable download, credits and print usability. | P1. Medium relevance benefit for software/workflow conversations. |
| Header/footer and people context | Predictable small navigation; meaningful next action; profile context consistent with entry | `SiteHeader.astro`, `SiteFooter.astro`, `ProjectInvitation.astro`, shared CSS. Keep routes. Review `/people/hadi/` marking Lab as current when reached from About before changing its shared semantics. Preserve real contributor pages and compact footer. | P0 link/focus review, P1 context. Targeted benefit, no need for a new menu system. |

### Exact copy to change first

| Current wording | Proposed wording or treatment |
| --- | --- |
| “Physical AI, from observation to action.” | “Exploring how to make AI dependable.” Support with the explicit company/current-work sentence below. |
| “Explore how decisions hold up when observations, resources or authority change.” | “What happens when information is old, resources are shared, or software changes after its tests pass?” |
| “Selected contributions” | “Questions we're exploring”, or remove this secondary introduction where it repeats “Our work”. |
| “View the contribution and evidence” | Use the project-specific Work-summary links below. Keep a separate action for actually opening a workspace. |
| “Decisions depend on the whole system.” | “A useful answer is only the beginning.” Follow with concrete checks, not another abstract claim. |
| “usable evidence, bounded authority, reliable implementation and recovery” | “Checking information, setting clear limits, building working software and recovering when something goes wrong.” |
| “Current evidence cannot reserve the water.” | “Knowing the field is dry does not mean the water is available.” |
| “Publish a parent. Withdraw its dependent pages.” | “Change one article. Keep the rest of the site in step.” |
| “Clear responsibility, recoverable work.” | “Work someone else can understand and continue.” |
| “Useful starting context” | “Useful details, if you have them.” Make the supporting prompts optional. |
| “Scope, responsibilities and success criteria belong in the brief before a commitment.” | On Contact: “A conversation can help us decide whether there is a useful next step.” Keep commitment detail on Approach. |
| “Does the evidence cover these bytes?” | “Were the tests run on this version?” Keep artifact identity in technical reasoning. |
| “Primary model response” / “Execution grant” | “What the model decides” / “Permission for this step”. Preserve exact policy terms in the detailed explanation. |

## D. Proposed copy

These are reviewable examples, not approved company offers. Preserve “Trust earned.” as the brand line. Do not use an aspirational heading without its nearby present-tense qualification.

### Homepage hero

**Exploring how to make AI dependable.**

Fidret is an emerging engineering company. We build software experiments and explore how AI systems can work with machines, information and people.

What should happen when a reading is too old, two jobs need the same resource, or software changes after its tests pass?

**Explore our work** · **Talk about an idea**

Layout note: test this at phone size before fixing it. If it delays the first project, move the final question into that project's introduction rather than shrinking the type.

### Accessible Physical AI introduction

**AI has to deal with a changing world.**

A sensor can report that a field is dry. Before a watering system acts, it also needs to know whether that reading is recent and whether the water is available.

Systems that use information from the physical world to help people make decisions or operate equipment are part of what we call Physical AI. This is Fidret's first practice. Our current work explores these questions through software experiments and system designs.

**Explore the farm example**

### Potential collaboration

**Bring us a problem worth understanding.**

An awkward process. An idea you want to test. A system whose decisions are hard to trust.

We're interested in conversations about where AI could help, what needs checking and what a useful first experiment might look like.

Our current work includes software experiments, system designs, agent-workflow planning and the publishing system you're using now. A possible collaboration would start with your situation and an honest look at what we can contribute.

**Tell us what you have in mind**

Ground these invitations in evidence:

- Information arrives late or is hard to trust: inspect the sensor experiment.
- Several activities share equipment or resources: explore the fictional farm design.
- AI-assisted software needs understandable checks: examine the factory model and actual publishing system.
- An agent's responsibilities are unclear: explore the workflow brief.

These are topics for discovery, not four established service lines. Future pilots, robotics integration, customer delivery, maintenance obligations and performance promises need their own evidence and agreement. Individual professional experience remains Hadi's experience, not Fidret's delivery history.

### Five Work entries

The full six-part treatment belongs on the individual overview. A gallery row should show the question, a short reason to care, what exists, its scope and a link; do not put six labeled paragraphs in every card.

#### What happens when a machine trusts old information?

**Why it matters:** A reading can look ordinary even after updates stop. A decision based on it may no longer fit what is happening.

**What we made:** A small software rule that stops presenting a reading as current when it becomes too old, with repeatable test scenarios and a walkthrough.

**Explore:** Choose a recorded moment. Compare the last received value with the value the rule still considers usable.

**What it shows:** When information was recorded matters as well as when it arrived.

**Scope:** A software experiment with invented inputs. No equipment tested. The example's three-second limit is an assumption, not a recommendation.

**Summary action:** Explore the sensor experiment. **Deeper action:** Open the walkthrough / Read the method and results.

#### What if two farm jobs need the same water?

**Why it matters:** A field needs irrigation, while animals also need drinking water. A sensible plan must account for shared resources.

**What we made:** A fictional farm design and a working teaching interface for examining the checks before a proposed action.

**Explore:** Remove the water reservation for a watering job and see why the model holds it. Then explore conflicting readings or a lost connection.

**What it shows:** A proposal needs more than good information. It must also respect resource reservations, local checks and permission.

**Scope:** Fictional architecture and teaching model. No farm or equipment is connected. The model checks a reservation; it does not calculate how much water to give each job.

**Summary action:** Explore the farm model. **Deeper action:** Try the water example / Read the engineering notes.

#### The tests passed. Is this version ready?

**Why it matters:** Imagine AI helps change a booking system. Tests pass, then one more edit lands. Those earlier results do not automatically cover the new version.

**What we made:** A proposed software-delivery design and an interactive teaching workspace about checks, permission and recovery.

**Explore:** Compare revision 13 with tests for revision 12. Change which revision the tests cover, then examine what happens if permission is withdrawn.

**What it shows:** Checks must match the software being considered. A matching test result is only one condition for proceeding.

**Scope:** A teaching model of a proposed architecture. No autonomous delivery pipeline runs here.

**Summary action:** Explore the release example. **Deeper action:** Try the version check / Read the architecture.

#### Which parts of a task should an AI agent handle?

**Why it matters:** Being allowed to draft a reply should not automatically mean being allowed to send it or change the underlying system.

**What we made:** A researched explanation and an editable planning brief for one agent workflow.

**Explore:** Follow a fictional support-ticket example, then use the prompts to describe your own task.

**What it shows:** Useful automation starts with a clear task, needed information, permitted actions and a person who can take over.

**Scope:** Research and a planning tool. Completing the brief does not implement controls or establish readiness to operate.

**Summary action:** Explore the agent planning brief. **Deeper action:** Open the worked brief / Read the technical note.

#### How do you keep a growing website consistent?

**Why it matters:** An article may appear in a listing, link to a reference page and offer downloads. Changing it should not leave those parts telling different stories.

**What we made:** The working publishing system behind Fidret, connecting authored material, generated pages and automated release checks.

**Explore:** Follow how a published piece creates related pages and what happens when it returns to draft.

**What it shows:** A shared source and repeatable checks can keep publication and withdrawal consistent.

**Scope:** Implemented for Fidret's own website. Not a customer case study or a certification; automated checks do not establish the truth of every sentence.

**Summary action:** See how this site is built. **Deeper action:** Inspect the publication example / Read the publishing approach.

### Contact and action language

**Tell us what you have in mind.**

An early idea or an unsolved problem is enough. Tell Hadi what is happening and what you would like to change. You do not need a finished brief.

**Contact Hadi**

This opens Hadi's personal contact page, which currently handles Fidret inquiries.

Optional disclosure: **Useful details, if you have them.** An example, the people involved, any known constraints, or the link to a project that prompted your question.

Use “Explore our work” for the collection, “Try the water example” for an exact model state, “Read the method” for evidence, and “Talk about an idea” for Contact. Never label a link “Try” when it only opens another summary. Hover/focus should clarify clickability, not reveal information unavailable otherwise.

## E. Meaningful interaction concepts

Qualitative ranking reflects implementation judgment, not measured learning. No new dependency or homepage JavaScript is necessary for the first four concepts when they link into existing experiences.

| Rank and concept | Educational value | Relative cost | Accessible behavior and limits |
| --- | --- | --- | --- |
| 1. Would you still trust this reading? | High: normal-looking information becomes unusable as time passes | Low: reframe existing native radio walkthrough | Select a documented moment, not a live clock. Text states the changed result. Complete static explanation; no timer, color-only state or motion requirement. |
| 2. The tests passed. Which version? | High: revision mismatch makes assurance tangible | Low to medium: existing factory evidence scene | Native selects and nearby result. Keep version 13/12 derived from source. Full initial worked example without JS; permission remains independent of test matching. |
| 3. There is water. Is it available for this job? | High: explains why independent plans can conflict | Low for deep links; medium for clearer composition | Existing Reserved/Not reserved control. No dragging, invented litres, optimizer or “choose a winner” simulation. Static comparison conveys the same lesson. |
| 4. It stopped replying. Did it already act? | High but more demanding: explains why retrying a pump command may be wrong | Low to medium: existing farm receipt scene | Unknown/Complete/Not executed are deliberate choices; no time pressure. Describe the result in text. A teaching state is not an operating pump. |
| 5. Read, draft or send? | Medium to high: connects agent permissions to a familiar task | Low: existing native `AgenticBoundary.astro` explanation | Native radio choices and clear action descriptions. Explicitly fixed illustrative cases, not a security assessment or live agent. |

Microcopy: “Try another moment.” “What changed?” “Why did it pause?” “See the assumptions.” “Open this example in the Lab.” The small surprise is a justified change in outcome, not animation.

Reuse `WorkEvidence.astro` before adding a second presentation of the model. Existing farm links `#scene-water~v1-000` and `#scene-water~v1-010` and factory links `#scene-evidence~v1-000`, `~v1-100`, `~v1-101` preserve exact conditions. Keep their versioned semantics and reference round trips.

Under [decision 0013](../decisions/0013-progressive-lab-experiences.md), executable browser code is confined to six farm/factory routes. Models enumerate finite outcomes at build time; the browser selects those outcomes. Home and Work stay script-free. Use native details/radios, static examples and ordinary links there. Importing the Lab controller onto Home is not a harmless styling change: it would require an explicit runtime decision, CSP/output-test coordination and a demonstrated need. It is not recommended for this proposal.

Use brief user-triggered transitions only if they help locate the changed result; remove them under reduced motion. No looping scan, decorative counters, parallax, mandatory quiz or sound. Keep focus on native controls and expose changed output in a tested, understandable way. A visible limitation must not be hidden in “Go deeper”.

## F. Implementation roadmap

Approval is a gate because Hadi explicitly requested a proposal before implementation. It is not an extra skill-imposed permission process. Approve the direction first; implement each coherent phase through the established task and review workflow. No change to the founding mission is proposed.

### P0: Clarity and accessibility

**Smallest coherent release:** make company identity explicit; rewrite the five discovery questions and repeated CTAs; put essential scope in each direct-entry overview; simplify the invitation and contact prompts. Preserve layout initially so the copy change can be evaluated independently. Fix any critical navigation/accessibility failures discovered in the required baseline review before adding interaction.

**Files:** `src/pages/index.astro`, `work/index.astro`, `work/[slug].astro`, `project.astro`, `contact.astro`, limited introduction/CTA changes in `approach.astro` and `lab/index.astro`; `src/lib/work.ts`; `SelectedWork.astro`, `ProjectInvitation.astro`; shared metadata/preview text only where the new visible wording requires consistency. Use `SiteLayout.astro`/`seo.ts`, not route-specific metadata implementations.

**Dependencies:** Hadi's direction approval; complete the narrower-width/enlarged-text/keyboard baseline; verify exact claims against canonical artifacts. Update the design brief's audience statement to explicitly include non-technical and curious first-time visitors when implementing the accepted change. Amend existing visitor guidance rather than introducing a competing policy. Do not change charter or runtime architecture.

**Risks:** generic AI marketing, aspiration interpreted as established capability, longer hero delaying Work, inaccurate simplified scope, breaking tests tied to visible copy, metadata no longer describing the actual page.

**Verification:** target applicable WCAG 2.2 AA requirements, distinguishing automated checks from assistive-technology testing; full gate; diff/claims review; all primary routes and five Work details at 1440, 768, 390 and 320 px; 200% text and 400% zoom/reflow as applicable; keyboard-only discovery-to-contact and direct Work entry; visible/unobscured focus, heading order, link names, actual contrast and target spacing. Test with assistive technology separately from automated/DOM checks. Keep local fonts, no-JS content, stable URLs and published-only discovery. Use the first real-reader round below.

**Acceptance:** each entry answers company/subject, relevance, actual artifact, essential limit and next step without opening documentation. No new service claim, lost evidence route or mandatory contact preparation. Proposed human iteration gate: at least four of five can independently identify the company, one plausible problem and the conversation route; all five correctly classify the fictional farm after reading its summary. Record actual outcomes before deciding the next increment.

### P1: Discovery and storytelling

**Scope:** recompose Home in the six-question sequence; make Work an editorial exploration gallery; put a worked consequence earlier in each overview; retain one compact mobile illustration; introduce plain-language Lab entries; shorten Approach's visible process summary while preserving detail. This is subtraction and reordering before adding more sections.

**Files:** P0 sources plus `WorkArtifact.astro`, `WorkEvidence.astro`, `WorkContext.astro`, `ObservationField.astro`, `LabExperience.astro`, `src/lib/lab-journeys.ts`, `src/lib/lab-workspaces.ts`, `visitor.css`, `lab.css`, relevant workspace styles. Extend `Work` with a separate discovery-summary/action field only if needed to keep precise technical descriptions intact. Keep one canonical catalogue and existing publication filter.

**Dependencies:** P0 results and stable wording; source-derived snapshots; agreement on which preview teaches a real consequence. Rewrite guidance and affected page contracts together. No new routes are needed.

**Risks:** gallery becomes a wall of six-part cards; visual content stays hidden on phones; diagram conveys information absent from text; two presentations drift from one model; technical links become buried; a withdrawn Lab still appears in Work.

**Verification:** full gate and source-derived evidence tests; inspect whole compositions and relevant selected states; accessible diagram semantics and textual equivalents; no-JS/module-failure fallbacks; exact scenario links, reload and reference return; published-parent withdrawal across cards, routes, downloads, sitemap and `llms.txt`; check social previews remain accurate. Inspect print pagination when evidence layouts change. Compare asset and JS changes to baseline; do not infer field performance from a local run.

**Acceptance:** each Work row has a distinct question and artifact; at least one meaningful visual explanation remains on a phone without hiding work behind a long introduction; Level 1 stands alone and Level 2 is directly accessible. Real readers can explain why their chosen project matters and name its actual artifact. No reader must complete an exercise to understand the company.

### P2: Delight and refinement

**Scope:** refine the top-ranked existing interaction only after users reveal where it helps; then consider version-matching and water-reservation stories. Add supportive hover/focus feedback and optional brief state transitions. The lost-receipt and agent examples are later candidates, not a commitment to build five new widgets.

**Files:** `SignalWalkthrough.astro`, `signal-walkthrough.ts`, `exploration.css`; relevant Lab components/styles; `src/scripts/lab-experience.js` only where behavior actually needs changing. Model files change only under separately justified model scope, not for visual effect.

**Dependencies:** P1 comprehension evidence, current model tests and runtime limits; a clear learning purpose for each control.

**Risks:** implying live AI/equipment, continuous sensor data or resource allocation; duplicating policy in the browser; expanding JS/CSP scope; loss of focus/history; hidden fallback or inaccessible change announcements.

**Verification:** `tests/signal-walkthrough.test.ts`, `lab-workspaces.test.ts`, `lab-runtime.test.mjs`, `work-evidence.test.mjs`, relevant model and publication tests, plus full gate. Exercise altered states, multiple blockers, reset/Back/Forward, share/reload, malformed state, reference round trips, reduced motion, forced colors, keyboard and actual screen reader. Verify no external requests, storage or new dependency, and retain the approved module-size/route contract.

**Acceptance:** the visitor can say what changed and why it matters, with or without executing the interaction. No scope or claim is strengthened beyond evidence. Motion can be disabled without losing meaning. If the interaction adds confusion or fails to improve explanation, keep the static example.

### Release discipline for every implementation increment

Use the pinned Node/pnpm toolchain and frozen install, run `sh scripts/check_deployment.sh` and appropriate changed-behavior checks, inspect the rendered result and complete diff, then update the task checkpoint. Apply the [Fidret search skill](../../skills/fidret-search/SKILL.md): canonical metadata, truthful schema, actual authors/edition dates, initial HTML, public-copy em-dash rule and published-only discovery remain synchronized. Do not stamp editorial dates just because the build ran.

Before any merge, verify the current head's `foundation`, `runtime-bootstrap` and `seo-geo` checks and unresolved review state on GitHub, and report host enforcement separately. Record local changes, commits, push, PR, merge and verified deployment separately. Only `website/` is publish output; never hand-edit or commit it. Keep Free/static hosting. Deployment needs its applicable authorization; this review authorizes none.

## Real-visitor validation protocol

Build on [visitor-validation.md](visitor-validation.md). Hadi owns recruitment/consent and review of outcomes; do not assume Elie's participation or contact anyone on the user's behalf. Recruit **at least five non-technical people who have never seen Fidret**: a business owner, an operations/process person, an early-stage idea holder and two curious/general-business readers. A separate technical collaborator can assess depth but does not replace one of the five.

Plan 15–20 minutes each on their normal device. Include at least two phone sessions and two direct Work-link tasks. Offer keyboard/assistive-technology participation where available; do not confuse these sessions with comprehensive accessibility testing. Record the exact site edition and route. Collect a current-site baseline before implementation where practical; use new first-time participants for the revised ten-second test to avoid familiarity effects.

1. Show Home for ten seconds, without explaining Fidret or Physical AI. Hide it. Ask: **“What does Fidret do?”** Record the person's words, not an evaluator's improved version.
2. Restore the site. Ask: **“What kinds of problems might Fidret work on?”** Do not suggest sensors, agents or consulting.
3. Let them explore: **“Which project interested you, and why?”** Observe their first choice, hesitation, rereading, backtracking and any requests for help.
4. Ask: **“What has Fidret actually built?”** Then ask neutrally what the selected project shows and what it does not establish. Check especially for beliefs that the farm is deployed or the factory operates autonomously.
5. Ask: **“Where would you go to discuss an idea?”** Stop before any message is sent. Ask where the contact link would take them and what they believe they need to prepare.
6. Give a forwarded Work link. Ask them to explain the project without returning Home, find a deeper explanation if they want it, and choose a next step.
7. Only after the tasks, ask whether it felt **clear, welcoming and interesting**, what made it feel that way, and where it felt difficult or overly technical. If using 1–5 ratings, keep the reason beside each rating; do not turn five responses into a universal site score.

Private observation sheet: anonymous participant code, audience, device/access method, date/edition, entry route, question, verbatim interpretation, completed without coaching, hesitation/wrong turn, evidence misunderstanding, feeling/reason and suggested correction. Keep identities and confidential business context out of Git. Publish only non-sensitive aggregate findings and resulting decisions.

Directional iteration criteria, not statistical claims:

- At least four of five identify an emerging engineering company, one relevant problem and a real conversation route without coaching.
- All five can distinguish the fictional farm/teaching model from real deployed work after reading its overview. Any persistent false capability belief is a priority correction.
- At least four of five describe one actual artifact and why it matters, rather than repeating a technical category.
- Review welcoming/interesting responses with observed behavior. Repeated preparation anxiety or inability to explain a control's consequence triggers a rewrite.

Prioritize misleading claims and blocked tasks, then recurring confusion, then polish. Repeat changed tasks with new readers where possible. No analytics script is required. Page time, clicks, passing tests, agent agreement and an attractive interface do not establish understanding, inquiry quality or trust. Count a real inquiry only with actual receipt, and track useful conversations separately from link visits.

## Decision requested and next step

Approve or adjust **the question-first discovery direction with visible evidence boundaries**, then begin with P0. Keep the charter, identity, current routes and technical depth. Complete the remaining accessibility/responsive baseline and run the first non-technical sessions before committing to larger layout or interaction work. This proposal is ready for direction review; its proposed layouts are not implemented or visitor-validated designs.

## Approval and execution

Hadi subsequently instructed “Go ahead with everything!” after authorizing mission-aligned initiative. The [implementation task](../tasks/2026-11-06-human-centered-experience.md) owns actual changes and verification. The proposal above preserves the audit and its hypotheses; human-reader testing remains an unperformed research activity, not an implementation result.
