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
