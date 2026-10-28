# Shared Fidret Lab with individual and joint bylines

- Status: superseded
- Date: 2026-10-24
- Human decision owner: Hadi Abou Daya
- Related task: [Shared Fidret Lab](../tasks/2026-10-24-fidret-lab.md)
- Basis: Hadi requested a unified showcase, confirmed the shared Lab with bylines, and explicitly allowed pieces without real-world evidence
- Superseded by: [0008](0008-astro-publishing.md)

This record preserves the founding Lab rationale and original Python/JSON implementation. [Decision 0008](0008-astro-publishing.md) retains the shared format, explicit bylines and evidence boundaries while replacing the authoring/build implementation with Astro and Markdown.

## Context

Hadi and Elie need a consistent way to share useful technical work as their practice develops. The collection should support exploratory work before there are client engagements or physical deployments.

## Decision

Publish a shared Fidret Lab at `/lab/`, with an explicit individual or joint byline on each piece. Accept simulations, prototypes, technical notes, and architecture explorations. Use the same question, approach, takeaways, limits, and next-steps format. Quantitative results, external validation, and client work are optional.

Keep canonical piece sources in `lab/pieces/` as structured JSON, authors in `lab/authors.json`, and common presentation in `templates/lab/`. A Python standard-library tool creates drafts and generates static pages and sitemap entries. Drafts are excluded from the website; source visibility follows the public GitHub repository.

## Consequences

Either contributor or harness can use the same workflow, while credit remains specific to actual contributions. Publishing a prototype does not turn it into a deployed solution. By showing reasoning, limitations, updates, and follow-ups, the Lab can communicate growing expertise without fabricated outcomes.

The current hosting remains static and free. There are no user accounts, runtime scripts, databases, or external publishing services. Initially the Lab has a truthful empty state; no technical piece is invented to populate it.

## Review

The original publishing implementation was superseded during Hadi's authorized Astro migration on 2026-10-28. Its founding format/byline principles continue in decision 0008. Review the format after the first few real pieces. Keep the [Lab guide](../../lab/README.md) as the current operational reference.
