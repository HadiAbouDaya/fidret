# Human-centered experience: implementation verification

6 November 2026. Implementation of the [approved proposal](2026-11-06-human-centered-proposal.md), tracked in the [active task](../tasks/2026-11-06-human-centered-experience.md) and [issue 52](https://github.com/HadiAbouDaya/fidret/issues/52).

## What this record establishes

This is source, browser and automated verification of the implementation increments below. It does not establish first-time visitor comprehension, commercial demand, screen-reader usability or field performance. The [five-person reader protocol](visitor-validation.md) remains unperformed.

The changes make company identity explicit, lead Work with recognizable questions, show short evidence limits, expose source-derived previews on phones and reduce preparation for a conversation. The existing Lab controls explain their purpose in plainer language. The model decisions, URL state tokens, authors, edition dates and publication boundaries remain unchanged.

## Repository checks

The pinned Node 24.22.1 and pnpm 11.28.9 toolchain ran `sh scripts/check_deployment.sh` after integration and again after review fixes. The latter passed with zero Astro errors, warnings or hints across 81 checked files, 67 Node tests and 104 Python tests. The production build generated 28 pages. This includes publication/withdrawal fixtures, model and runtime tests, metadata/discovery contracts, source/output boundaries and the no-em-dash rule. `git diff --check` passed.

Existing fixture builds now also compare the discovery sensor and version previews with canonical values, verify their readable initial HTML and visible scope, and exercise withdrawal of the new Home conversation links. No browser-test package was added to the project or lockfile.

## Rendered and behavioral checks

Local production output was served with `pnpm preview`. Shared preview snapshots timed out twice; an isolated installed Brave browser controlled through Playwright provided the fallback. Temporary screenshots, JSON results and print PDFs are ignored local review artifacts, not published assets.

| Check | Coverage | Observed result |
| --- | --- | --- |
| Main discovery composition | Home, Work, Approach, About, Contact, Lab and all five Work details at 1440 and 390 px | Inspected 22 full-page renders; meaningful Work previews remain visible on phones. |
| Responsive reflow | Those 11 routes plus the signal walkthrough, farm, factory, agent article and Hadi profile; 320, 390, 768 and 1440 px; default and doubled root text | 128 layouts; no document overflow or controls beyond the right edge. This is text enlargement, not a claim of all browser zoom modes. |
| Text spacing | The same 16 routes at 390 and 1440 px; line height 1.5, letter spacing .12em, word spacing .16em, paragraph spacing 2em | 32 layouts without document overflow. |
| Automated accessibility | The 16 routes at 390 and 1440 px; axe WCAG 2 A/AA, 2.1 AA, 2.2 AA and best-practice tags | 32 scans with no violations. Incomplete contrast cases received a separate review below. |
| Keyboard | Home skip link; Contact and Approach native disclosures; farm/factory native selects; signal and agent radio groups | Correct focus destination, disclosure toggling, native selection and visible result changes. Model changes retained focus; status text updated. |
| State fidelity | All 69 farm/factory state URLs rendered in the browser | Inputs, response labels and visible reasons matched the state table. Farm share/reload, reset, Back/Forward and engineering-reference return preserved exact conditions. |
| Reduced motion and forced colors | Signal native selection with both preferences active | Keyboard selection and the selected explanation remained usable; screenshot inspected. This is bounded coverage, not every OS/browser combination. |
| No JavaScript and failed module | Both farm/factory workspaces; blocked controller request and disabled JavaScript | All five initial examples and answers remained readable; unusable enhanced controls remained hidden. Signal and agent radio explanations also worked without JavaScript. |
| Print | Approach, three model Work details, agent article, both workspaces, signal walkthrough and full signal method, starting with disclosures closed | Printed content inspected. Native disclosures and all agent examples appear. Workspace conditions and results remain paired; final limits are included. Screen disclosure/scene/selection state was restored after printing. |

Print inspection found excessive white space and orphan fragments from keeping whole workspace scenes together. Scoped print styles allow the explanation to flow, keep each result together and retain the conclusion. At the tested A4 settings, each workspace decreased from 11 to 6 pages without dropping its five situations or detailed assumptions. Visitor print styles also keep short scope sections together.

## Contrast review limits

Axe could not resolve SVG text backgrounds, labels over a drawing, or several symbols. Source and rendered inspection established the relevant fills and backgrounds: ivory on forest is approximately 10.61:1, sage on forest 9.00:1, and the dark secondary diagram text on the sage field 6.57:1. The farm label backing is lighter still. Symbols have accompanying words; they do not carry the only explanation. These observations address the flagged cases, not a blanket accessibility certification.

## Independent source review

A separate read-only agent reviewed the first integrated commits. It found no blocking model, evidence-boundary or publication-lifecycle regression. Three small findings were fixed: two static Lab headings described starting inputs after those inputs changed; the agent legend did not match its three actions; and the Contact note had bypassed its shared source. The review also prompted preview/source fixture coverage. This was an internal review, not participant feedback.

## Loading and search boundaries

Home, Work and Contact load no executable JavaScript. The farm and factory keep the existing single 13,754-byte controller; no runtime route or third-party dependency was added. The two retained font files total 49,176 bytes. Local gzip size calculations were approximately 7.1 KB for Home HTML and 4.8 KB for its styles; these are build measurements, not observed production transfer or Core Web Vitals.

Canonical routes, bylines, authored edition dates, inert structured identity and published-only discovery remain under the shared tests. Work sharing images were regenerated and inspected for clipping. No indexing, ranking or AI-citation gain is claimed. Remote checks and actual live deployment belong in the task's publication checkpoint after they occur.

## First increment: publication evidence

[PR 53](https://github.com/HadiAbouDaya/fidret/pull/53) merged as `87f8e6344f800c0596f6d0372365588c2df47b9f` on 5 November at 23:53:59 UTC (6 November in Paris). Before merging, the exact head `ee1ae96882edb00270e855cdbdd0993fcd732156` passed `foundation`, `runtime-bootstrap` and `seo-geo`; the review and unresolved-thread inspection found no outstanding feedback.

On 6 November, the shared browser navigated the actual canonical Home, Work, Approach, About, Contact, Lab and five Work-detail URLs. All 11 returned HTTP 200 through navigation timing. Each page's rendered body SHA-256, title, canonical URL and stylesheet URLs exactly matched the preserved verified first-increment production output. The expected Manrope font loaded. The live Work page at 390 px was also visually inspected. This establishes that those pages served the release, rather than inferring publication from a Git merge. The Cloudflare dashboard required sign-in, so no dashboard deployment ID or build-success record was verified. Live response headers and search-engine indexing were not established by this comparison.

## Second increment: explanations beside the controls

Source commits `d509966` and `b59824b` simplify the sensor comparison, give each of the ten Lab situations a concrete existing condition to try before its controls, and use plainer model response labels and reasons. The suggested condition is derived from each case's existing control/option data. A focused assertion checks that it exists, differs from the starting condition and selects a validated state. The underlying policies, facts, priority, state keys and model inputs are unchanged.

The integrated deployment gate and the final gate including the wordmark correction both passed with zero Astro diagnostics, 67 Node tests, 104 Python tests and 28 generated pages. A before/after comparison of the 69 published states found identical facts, decisions, priority traces, values, reason counts, controls and URL keys. Only response labels and reason prose differed. Browser output for all 69 states matched the resulting manifest.

| Check | Coverage | Observed result |
| --- | --- | --- |
| Chromium layout and accessibility | Sensor/farm/factory Work pages, both workspaces and both scenario collections; 320, 390, 768 and 1440 px; default and doubled root text | 56 layouts without document overflow or off-edge controls. Fourteen axe scans at 390 and 1440 px found no violations. |
| Firefox 159 | The same seven routes, widths and text sizes | 56 layouts without document overflow; header and footer wordmarks each stayed on one line. Native disclosures/radio groups, workspace selection/focus and readable no-JavaScript examples passed the bounded checks. |
| Prompt and fallback | Both workspaces, JavaScript enabled, disabled and controller request blocked | Suggested conditions precede the controls; all five starting examples remain readable without enhancement. |
| Print | Both complete workspaces and sensor Work page, disclosures initially closed | Inspected actual PDFs: six pages per workspace, three for the sensor. Conditions, reasons, assumptions and final limits remain present. Screen state restored after printing. Firefox print-media disclosure visibility was also checked, separately from Chromium PDF output. |

The Firefox work began with 64 broader layout checks at 390 and 1440 px. Their overflow assertions passed, but visual inspection found both short wordmarks wrapping the final letter. A shared `white-space: nowrap` rule corrects that specific problem. The source-built fix was checked at 320, 390 and 1440 px with default, doubled and restored text, then included in the final seven-route matrix. This is an example of why automated geometry and axe results do not replace visual inspection.

No dependency, executable route, model policy, published URL or editorial attribution changed. These checks establish rendering and implementation consistency; they do not establish that a first-time reader understands the revised explanations.

A separate read-only source review found no blocking issues in the second increment. It checked unchanged model conditions and priority, the ten valid suggested conditions, visible sensor limitations, progressive-enhancement structure and the narrowly scoped wordmark correction. It did not rerun browser checks or substitute for real-reader testing.

### Second increment: merge evidence

[PR 54](https://github.com/HadiAbouDaya/fidret/pull/54) merged as `c2784fa7cfd50542562b77e817e23cbca923c7a2` on 6 November at 00:13:04 UTC. Its exact head `cdc0e6fecae96821d577ffdee04793d880b2b910` passed all three required GitHub checks. No unresolved review threads or other review feedback remained. An early live check still served the first increment; a merge is not being treated as proof of deployment.

At approximately 00:18 UTC, live verification established the second release on 15 canonical routes: the previous 11 main/Work pages, both workspaces and both scenario collections. Navigation status was 200 on all, and titles, canonicals and stylesheet URLs matched the preserved second build. Rendered body hashes matched on the 11 static pages. The four enhanced pages matched hashes of their complete model/prompt data or scenario text; runtime-added DOM attributes were not misrepresented as static-body agreement. Every page loaded Manrope and applied the no-wrap wordmark rule. Two live exact-condition links, farm `scene-water~v1-010` and factory `scene-evidence~v1-100`, produced the expected selected inputs, label/reasons and share fragment. No Cloudflare dashboard deployment ID, new header check or search-performance result is claimed.

## Third increment: reaching a project and a conversation sooner

The Work index now uses one concise introduction instead of repeating the questions shown in the gallery. Scoped spacing removes the accumulated hero/collection gap. The introduction still identifies the entries as Fidret's own experiments, designs and working software; individual contribution and scope text is unchanged. Five project invitations now ask for one recognizable situation rather than several technical requirements. Home's agent-topic label describes its overview destination, and the Lab index explains the freshness rule in familiar words.

The full deployment gate passed with zero Astro diagnostics, 67 Node tests and 104 Python tests. No new test or dependency was added for these reversible copy/spacing changes. `git diff --check` passed.

| Width in CSS pixels | Previous first project heading | Revised first project heading |
| --- | --- | --- |
| 320 | 708 px from page top | 497 px |
| 390 | 634 px | 422 px |
| 768 | 506 px | 352 px |
| 1440 | 605 px | 427 px |

These are local Chromium geometry measurements with loaded fonts, rounded to whole pixels. Firefox agreed within one pixel. They show the reduced introduction height, not a measured change in reading time or comprehension.

Rendered checks covered Home, Work and Lab at 320, 390, 768 and 1440 px, plus the five Work details at 320 px, each with default and doubled root text in Chromium and Firefox: 68 layouts without document overflow or off-edge controls. Six axe scans on the three index pages at 390 and 1440 px reported no violations. Both browsers completed a keyboard path through the skip link, a Work entry and its Contact invitation. The revised desktop/phone gallery and its five-page printed output were visually inspected; all five project illustrations and scope statements remain present.

The shared preview timed out twice on the local snapshot step, reporting `Preview automation snapshot timed out after 15000ms`. The installed local browser provided the rendered fallback. A temporary review-harness failure caused by using axe without an explicit browser context was corrected before the passing run; it did not require a product change. Real-reader and assistive-technology limitations stated above still apply.

### Third increment: publication evidence

[PR 55](https://github.com/HadiAbouDaya/fidret/pull/55) merged as `8bb8984d3d1fdf6b7089a2534ae5e8267808ebd1` on 6 November at 00:25:14 UTC. The exact head `ff2227e8f93ad9164da3aff522a25e9f001b61b8` passed `foundation`, `runtime-bootstrap` and `seo-geo`; no outstanding review feedback remained. At approximately 00:38 UTC, the same 15-route shared-browser comparison used for the second release passed against preserved third-build output: HTTP 200, matching metadata/styles, matching bodies on 11 static pages and matching model/prompt or scenario content on four enhanced pages. This separately verifies the live gallery/invitation release. Dashboard deployment identity, live header inspection and search performance remain outside this comparison.

## Fourth increment: continuity while controls load

A controlled delayed-module check at the `ff2227e` baseline exposed a real progressive-enhancement defect. Opening the second farm explanation before the controller arrived left its summary focused and visible. When the module arrived, the interface hid that scene, dropped focus to the body and moved the viewport. A second reproduction, Next from the original unfragmented URL followed by Back, also dropped focus when the previously focused scene became hidden.

The correction preserves the all-situations reading mode when a visitor has already focused, opened or scrolled into the static examples. It retains the open explanation and anchors the visible passage where document scroll limits permit. Normal first entry still starts with one situation; exact condition fragments still select their requested model state. History navigation repairs focus when it hides the previously focused element, including through CSS. The static fallback now explicitly says it is showing the five starting examples and has not applied changed conditions from a shared link.

| Check | Coverage | Observed result |
| --- | --- | --- |
| Late enhancement | Both workspaces; 390 and 1440 px; keyboard-opened explanation, pointer-opened explanation, scrolled passage and focused reading navigation; Chromium, Firefox 159 and WebKit 27.2 | 48 cases passed. Content/open state and existing focus remained available. The largest measured anchor difference away from document scroll limits was 0.83 CSS px. |
| Ordinary and delayed exact links | Both workspaces in all three engines, with and without holding the module request | 12 cases applied the requested condition token and exact share fragment; ordinary entry retained the single-situation presentation. |
| History and focus | Both workspaces in all three engines | Back to the empty hash, Forward, native situation selection and Back from focused mobile read-all navigation passed. Focus remained on the selector during selection and moved to the visible scene when its previous content became hidden. |
| Fallback | Both workspaces in all three engines; JavaScript disabled, module blocked and deliberately invalid model data | 18 cases retained all five starting examples, hid unusable enhanced controls and displayed the explicit starting-condition context. |
| Model and reference fidelity | All 69 states in each engine, then each workspace's engineering-reference return and reset/Back/Forward sequence | 207 rendered state comparisons and six round trips passed. Labels/reasons and exact conditions remained consistent with the canonical manifest. |
| Print | Both workspaces after entering read-all mode, with a disclosed explanation | Actual six-page A4 PDFs inspected; five situations and final limits remained present. Hash, reading mode, scene visibility and disclosure states restored after printing. |
| Additional WebKit coverage | The 16 principal discovery/evidence routes used in the earlier Firefox baseline; 390 and 1440 px; default/doubled root text | 64 layouts without overflow or broken wordmarks. Native disclosures, radio explanations, workspace selection, no-JavaScript content and print-media disclosure visibility passed. Home and farm phone renders inspected. |

The independent source review identified a CSS-hidden navigation variant of the history bug. It was reproduced and fixed by checking rendered visibility, rather than only a `hidden` attribute. A separate suggested concern about native links retaining offscreen focus was tested in all three engines: the visible scene context remained within one CSS pixel of its previous position in those cases. This bounded observation does not establish every possible browser restoration behavior.

Four additional axe scans covered the two workspaces in read-all mode and with the module blocked. They exposed repeated result-region names that were not visible together in the earlier single-situation scans. Including the situation heading in each result's accessible name corrected that best-practice finding. All four subsequent scans passed, and the phone fallback/read-all renders were inspected. This is accessible-name and automated-check evidence, not screen-reader listening.

To repeat the loading regression, hold the controller response after HTML/styles arrive, open a later static explanation, then release the response and check its open state, focus and visible position. Separately, follow Next from the bare URL and go Back; repeat from read-all with focus on its mobile navigation. Finally, open an exact changed-condition link with the controller blocked and confirm that the visible note and example conditions describe the starting state. These checks target the observed failures rather than treating a fast ordinary load as equivalent.

Review harnesses wait for actual enhancement before inspecting dynamic share/return links. Firefox can leave `document.fonts.ready` pending while a deferred module is held; the delayed-module checks instead wait for the specific font face to load. The initial harness assumptions were corrected without treating those timing artifacts as model defects. These are controlled browser tests, not field loading measurements, Safari-device testing or assistive-technology listening.

WebKit and its missing libraries were isolated review tools; no system package or repository dependency was added. The controller remains on the same six routes and grows from 13,754 to 14,821 bytes, below the existing 16,000-byte limit. Local gzip size grows from 3,881 to 4,237 bytes. No model policy, external request, storage, metadata identity, route, author or editorial date changes. The final shared gate passed with zero Astro diagnostics, 67 Node tests and 104 Python tests, including the exact runtime source/route/size and SEO/GEO contracts. `git diff --check` passed.

## Fourth release verification

On 6 November at 00:58 UTC, PR 56 merged as `141fad61868f6d0f17eb0dc213471e30f533cc98`. Required foundation, runtime-bootstrap and seo-geo checks passed on exact head `aa9aff75c83f09a4bbcb6dd5e2ee625a9c055cae`; there were no review threads. The PR watch was removed after merge.

At approximately 01:06 UTC, the shared live browser verified HTTP 200, title, canonical, stylesheet and controller URL agreement with the preserved fourth build on the same 15 routes used for the third release. Eleven static body hashes matched. The two workspaces and two scenario collections matched their full model/prompt and scenario-text hashes; runtime DOM changes mean their whole body hashes are not compared as static output. The new controller asset is present on all four enhanced routes. Both live workspaces retain the explicit starting-condition fallback sentence and situation-specific result names. Activating the next situation and returning with browser Back to the original empty fragment restored a visible first heading in both workspaces. Manrope loaded.

This verifies observed public output and the checked behavior. No Cloudflare dashboard deployment identifier, human comprehension result, search-performance measurement or field-performance claim is established.

## Fifth increment: actual assistive-technology output

The isolated 6 November review used installed Orca 50.3, AT-SPI 2.60.4 and Speech Dispatcher 0.12.1 with Firefox 159. A locally extracted Xvfb supplied a private display. A private D-Bus session, browser profile and XDG directories separated the review from the user's desktop. Speech Dispatcher used an explicit private socket and ALSA null device; no user audio output or settings were used. Its espeak-ng module initialized successfully. This review inspected Orca-generated utterance logs, not audio listening, Braille hardware or feedback from a screen-reader user.

Two issues were reproduced against the preserved fourth build:

- Changing a model condition, resetting a situation or filtering a reference collection updated visible text, but Orca dropped the status message. The installed Orca log records event suppression during the update burst. Adding an explicit polite attribute to the existing status role did not resolve the tested workspace case. An ordinary `div` with `aria-live="polite"` and `aria-atomic="true"` delivered the message without moving focus.
- A click listener on the whole workspace caused situation headings to be announced as clickable. Those headings have no click action. Binding the same handler only to its actual navigation links and reset buttons removed that false action. Finder clicks are similarly scoped to filters and clear buttons.

The final comparison used one browser window, the preserved fourth HTML/controller versus the source-built correction, native XTest pointer input targeted through AT-SPI control bounds, and native keyboard input. Each workspace changed its first two conditions with arrow keys and used reset. Each of the four reference surfaces entered a meaningful query, entered a non-matching query and cleared it. Actual DOM values/counts were checked alongside the utterance text. All 18 expected messages were present after correction; none of those 18 messages was delivered in the compared baseline run. Both workspace situation headings changed from “heading 2 clickable” to “heading 2.” These bounded results do not establish other screen readers' behavior or complete assistive-technology conformance.

Setup limitations were resolved or excluded explicitly. The default AT-SPI X11 input backend delivered one synthetic heading key three times to Orca. Its installed legacy backend produced one heading transition per key; that backend was used for the final comparison. Earlier mixtures of browser-protocol focus and native keys were unreliable and are not counted as complete keyboard journeys. The final control checks used native pointer focus and keyboard changes. Log output was line-buffered for accurate action attribution. No system/Orca code was patched.

To recheck with an actual screen reader, open each workspace, focus a named condition, change it, and confirm the selected option plus the model's response and reasons. Reset and confirm “Starting conditions restored.” Open each scenario collection and engineering-note page, search, reach zero results and clear; confirm the visible count is announced. Navigate the workspace by headings and confirm ordinary headings do not advertise a click action. Record the browser, screen-reader version, settings, input method and whether evidence comes from generated output, listening or participant behavior.

Implementation remains within the six-route runtime boundary. The controller is 15,214 bytes, under the existing 16,000-byte limit. No policy, model data, routes, claims, dates, dependencies or visible design changes were introduced. A read-only source review found no concrete regression objection. The final shared deployment gate passed with zero Astro diagnostics across 81 files, 67 Node tests and 104 Python tests.

Separate browser verification passed in Chromium, Firefox and WebKit: 30 scene navigation/share/reset/Back checks, completion and return, read-all, reset-all, modifier-click behavior, mobile situation selection, 12 finder-route exercises, 48 normal/enlarged layouts and 18 no-JavaScript fallbacks. Six Chromium axe scans found no violations. The finder matrix initially assumed “evidence” must narrow the factory situation list; that term legitimately matches every entry, so the narrowing check uses “receipt.” This was a test assumption, not a product failure. Phone filtered/empty states and a desktop changed model result were visually inspected.

These checks supplement the existing browser/model evidence. They are not human comprehension tests, screen-reader listening, NVDA/JAWS/VoiceOver validation, physical-device testing or a WCAG conformance certification. The five-person protocol remains unperformed.


## Fifth publication and sixth handoff review

PR 57 merged as `3a57348acab5a3f287e41bb0e6e75504a0540e0d` at 01:24 UTC on 6 November. Foundation, runtime-bootstrap and seo-geo passed on exact head `46cc284b8733cf60c65c84ab26ce05c9e2953140`; GitHub showed no comments, reviews or review threads. After that merge, the shared live browser returned HTTP 200 and matched the preserved build's title, canonical, stylesheets and script URL on 17 routes: the earlier 15-route set plus both engineering-note pages. Eleven discovery bodies matched exactly; workspace model/prompt data and scenario texts matched. All six enhanced pages exposed the expected explicit polite atomic `div` regions. Enhanced body hashes are not expected to match initial HTML because the controller changes their state. This verifies observed public output, not a hosting-dashboard deployment ID, audio output, human comprehension or search indexing.

A read-only source review found two remaining handoff gaps: the agent planning brief had no local conversation invitation after its team-preparation material; the final workspace link described a full design but opened a next-step hub. The sixth increment adds a one-task, no-completed-brief invitation and accurately names that hub. The brief invitation uses existing spacing with a print rule that does not force a new page. The sixth full deployment gate passed with zero diagnostics, 67 Node tests and 104 Python tests. Chromium and Firefox checks passed 16 default/doubled-text brief layouts at 320, 390, 768 and 1440 px; 12 keyboard completion/Back journeys across both workspaces at 320, 390 and 1440 px; and six no-JavaScript conversation/completion paths. One axe scan of the brief found no violations. Phone/desktop invitation and workspace-ending renders were inspected. The four-page A4 brief preserves its final decision/limitation content and places the invitation on the final page without an added forced page. Two initial harness failures were corrected: the expected Contact heading was guessed incorrectly, and axe requires an explicitly created browser context. Neither was a site defect. These checks establish navigation/rendering, not human comprehension or assistive listening.
