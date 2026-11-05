# Human-centered experience: implementation verification

6 November 2026. Implementation of the [approved proposal](2026-11-06-human-centered-proposal.md), tracked in the [active task](../tasks/2026-11-06-human-centered-experience.md) and [issue 52](https://github.com/HadiAbouDaya/fidret/issues/52).

## What this record establishes

This is source, browser and automated verification of the first implementation increment. It does not establish first-time visitor comprehension, commercial demand, screen-reader usability or field performance. The [five-person reader protocol](visitor-validation.md) remains unperformed.

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
