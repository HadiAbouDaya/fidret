# Publishing in Fidret Lab

Fidret Lab is Hadi and Elie's shared space for simulations, prototypes, architecture explorations, and technical notes. A piece can earn credibility through clear thinking, useful explanation, and visible progress. Client work, production deployments, and real-world validation are not prerequisites.

The public collection is [fidret.com/lab](https://fidret.com/lab/). The same format and workflow apply whichever coding harness either contributor uses.

## The common format

| Field | What to write |
| --- | --- |
| Title and summary | What the reader will understand or be able to examine |
| Kind | Simulation, prototype, technical note, or architecture note |
| Authors | The person or people who actually contributed and take responsibility for the piece |
| Question | What you are exploring and why it is useful |
| Approach | How you investigated it, or the reasoning behind a proposed design |
| Takeaways | What you observed, learned, or currently conclude; qualitative findings are sufficient |
| Limits | Assumptions, simplifications, untested parts, and where the conclusions apply |
| Next steps | What you would change, compare, or explore next |
| Optional material | Code excerpts, diagrams, screenshots, source repositories, demonstrations, and references |

For a conceptual architecture, describe it as a proposal. For a simulation, identify what was simulated. For a prototype, distinguish what runs from what is planned. A technical note can explain a method without claiming an experiment was run. Metrics are useful when available, not mandatory fields.

## Create a piece

From the repository root, for example:

```sh
pnpm lab:new camera-placement-tradeoffs \
  --title "Camera placement tradeoffs" \
  --kind architecture \
  --author hadi
```

For a genuine joint contribution, pass both `--author hadi --author elie`. Use `--author elie` for Elie's piece. The registry in [authors.json](authors.json) supplies names and onsite contributor profile links consistently. Profiles list only work credited in published pieces. Shared branding does not make every piece jointly authored.

The command creates `lab/pieces/<slug>.md` using `lab/TEMPLATE.md`, without overwriting an existing source. Incomplete drafts are allowed. Astro's typed collection validates the metadata and Markdown policy during checks/builds; do not create a second source in `src/pages/` or generated `website/`.

Keep the YAML frontmatter fields `schema_version`, `slug`, `title`, `kind`, `status`, `authors`, `created`, `published`, `updated` and `summary`. Schema version is `1`; kinds are `simulation`, `prototype`, `technical-note` and `architecture`; status is `draft` or `published`. The lowercase hyphenated slug must match the source filename. Choose unique author IDs from the registry in their intended byline order. Use quoted `YYYY-MM-DD` UTC dates, with `created <= published <= updated` for publication and no future dates. A draft can leave `published` null.

Write the body in Markdown under these five level-two headings: `Question`, `Approach`, `Takeaways`, `Limits` and `Next steps`. Each needs substantive content before publication, along with a complete title and summary. Ordinary paragraphs, lists, links and fenced code work; authored level-one headings and raw HTML are rejected so the page retains its single title and static content boundary. Fenced code displays as text. Link targets must be safe HTTPS or root-local URLs; protocol-relative URLs, credentials and active schemes are rejected.

This repository is public: draft sources are visible on GitHub even though they stay off the website. Keep confidential client material and private drafts in a private repository.

## Work through your harness

Use a prompt such as:

```text
Read AGENTS.md and lab/README.md. Create a draft Lab piece about <topic>,
with <hadi, elie, or both> as the actual authors and <kind> as its format.
Use only the work and material supplied. Separate what we did or observed
from what we propose. Keep qualitative takeaways and untested assumptions
clear. Leave it as a draft, build the preview, and report what is missing.
```

Start a task branch, then fill the shared format. Ask the other contributor for feedback when available; a peer review is helpful, but external validation and peer availability are not publication gates. Agree joint credit with the people involved and never record a review that did not happen.

## Preview and publish

```sh
pnpm dev
```

Open `http://127.0.0.1:8765/lab/`. Draft pieces are deliberately absent from routes, the collection and sitemap. To preview a finished piece, set its source status to `published` and supply its publication date locally. For production-output review, run `pnpm build` then `pnpm preview`. Publishing requires complete narrative sections, not client evidence or quantitative results.

When ready, set `status` to `published`, set `published` to the actual publication date, and set `updated` to that date or the date of the latest revision. Keep `created` unchanged. Dates use `YYYY-MM-DD` on a UTC basis so local work and CI agree; future publication scheduling is not part of this system.

Run:

```sh
sh scripts/check_deployment.sh
```

Commit the Markdown source and public assets, with any deliberate toolchain/lockfile change. Open a PR with the piece's purpose, actual authors and preview/check results. Merging to main follows the existing workflow and triggers the configured website build. Check the live piece before calling it published.

`website/` is ignored, disposable Astro output, including Lab HTML and the root sitemap. Never hand-edit or commit it; a build can clean and replace it. Change Markdown, the typed collections/helpers and the [Astro pages/components](../src/) instead. The [publishing decision](../docs/decisions/0008-astro-publishing.md) replaces the earlier Python renderer/template workflow. Withdrawing a piece by changing it to a draft removes its route and sitemap entry on the next successful build.

## Optional code and images

Fenced Markdown is suitable for code in the narrative. Optional frontmatter `snippets` objects retain `title`, `language` and `code` for a separately captioned excerpt; code is displayed as text and never executed. A `resources` entry has a `label` and safe HTTPS or root-local `url`.

The first structured `media` entry is the article cover; later entries appear as supporting figures. Wide technical diagrams need readable narrow-screen access. Every published piece also gets an onsite sources/publication-notes page from its references and current dates; drafts do not.

Put public images under `public/lab-assets/<slug>/` and use structured frontmatter `media` entries with `src`, `alt`, `caption`, positive integer `width` and `height`. The `src` is its `/lab-assets/...` URL; the local file must exist and use an allowed image format. Assets in `public/` are copied into every build independently of a piece's status, so an image is public even while its article is a draft. Say when an image is simulated, synthetic, illustrative or adapted from another source, and include required attribution. Large videos or demos can be linked as resources rather than embedded.

## Build credibility over time

Keep the scope of a piece small enough to finish. Follow a recurring question through several pieces, and link follow-ups as resources. Preserve the original publication date and stable slug; update the same piece when its reasoning improves. Explain a meaningful correction in the text. A failed experiment or revised design can be useful when its lesson is clear.

There is no fixed publication quota. A practical starting rhythm is one focused piece, then feedback and a follow-up. Use the [idea list](ideas.md) to choose topics together; ideas are not completed work or assignments.
