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
python3 scripts/lab.py new camera-placement-tradeoffs \
  --title "Camera placement tradeoffs" \
  --kind architecture \
  --author hadi
```

For a genuine joint contribution, pass both `--author hadi --author elie`. Use `--author elie` for Elie's piece. The registry in [authors.json](authors.json) supplies names and profile links consistently. Shared branding does not make every piece jointly authored.

The command creates `lab/pieces/<slug>.json` using [TEMPLATE.json](TEMPLATE.json). Incomplete drafts are allowed. Edit the plain-text fields and lists directly or through your harness. The format is JSON, so Markdown syntax inside text is rendered literally. Put code in `snippets`, links in `resources`, and images in `media`.

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
python3 scripts/lab.py build
python3 -m http.server 8765 --bind 127.0.0.1 --directory website
```

Open `http://127.0.0.1:8765/lab/`. Draft pieces are deliberately absent. To preview a finished piece, set its source status to `published` and supply its publication date locally, rebuild, and review before committing. Publishing requires complete narrative fields, not client evidence or quantitative results.

When ready, set `status` to `published`, set `published` to the actual publication date, and set `updated` to that date or the date of the latest revision. Keep `created` unchanged. Dates use `YYYY-MM-DD` on a UTC basis so local work and CI agree; future publication scheduling is not part of this system.

Run:

```sh
python3 scripts/lab.py build
sh scripts/check_deployment.sh
```

Commit the source and generated changes together. Open a PR with the piece's purpose, actual authors, and preview/check results. Merging to main follows the existing workflow and triggers the website deployment. Check the live piece before calling it published.

`website/lab/` contains generated HTML. Edit sources and [templates](../templates/lab/), not those generated files. `python3 scripts/lab.py check` catches stale output. The generator preserves unmanaged files rather than overwriting them.

## Optional code and images

A code excerpt is an object in `snippets` with `title`, `language`, and `code`. Code is displayed as text and never executed by the website. A resource has a `label` and an HTTPS or local `url`.

Put public images under `website/lab-assets/<slug>/`. Assets in `website/` are deployed independently of a piece's status, so those images are public even while the article is a draft. Each `media` entry needs `src`, `alt`, `caption`, `width`, and `height`; use its `/lab-assets/...` URL. Say when an image is simulated, synthetic, illustrative, or adapted from another source. Include required attribution. Large videos or demos can be linked as resources rather than embedded.

## Build credibility over time

Keep the scope of a piece small enough to finish. Follow a recurring question through several pieces, and link follow-ups as resources. Preserve the original publication date and stable slug; update the same piece when its reasoning improves. Explain a meaningful correction in the text. A failed experiment or revised design can be useful when its lesson is clear.

There is no fixed publication quota. A practical starting rhythm is one focused piece, then feedback and a follow-up. Use the [idea list](ideas.md) to choose topics together; ideas are not completed work or assignments.
