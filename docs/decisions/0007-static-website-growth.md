# Static website growth stack

- Status: accepted
- Date: 2026-10-28
- Human decision owner: Hadi Abou Daya
- Related task: [Static Astro migration](../tasks/2026-10-28-astro-migration.md)
- Basis: Hadi explicitly requested updating the project to the suggested stack on 2026-10-28

## Context

Hadi asked which frontend stack best serves Fidret's purpose and future reliability. At the proposal stage, the HTML/CSS website, Python standard-library Lab publisher and Cloudflare Pages hosting already provided simple static delivery. Astro with TypeScript was recommended for shared layouts, typed content and room for richer publishing. Hadi subsequently requested the migration explicitly on 2026-10-28.

## Decision

Adopt Astro in static mode with strict TypeScript, the existing custom CSS/design tokens and local fonts, validated local Markdown content collections, and the existing static hosting. Keep registered authors in structured data. Add MDX or interactive components only when a piece needs them; neither is part of the initial migration.

The [migration task](../tasks/2026-10-28-astro-migration.md) records implementation and verification under that request. The [system map](../architecture/README.md) owns current source/build relationships, and [decision 0008](0008-astro-publishing.md) defines the publishing/output convention. Acceptance of this architecture is distinct from completion or a verified live deployment.

## Consequences

The stack offers shared layouts, content schemas and optional future interactive components while retaining static output. It adds Node/package dependencies and ongoing upgrade work, so migration alone does not establish greater reliability. Pin the toolchain and dependencies, retain meaningful checks, and preserve URLs, bylines, dates, drafts, limitations, design, static hosting and rollback. Deliberately update script/CSP checks if future work adopts interactivity.

## Alternatives considered

- Keep HTML/CSS and the Python publisher: least change and a sound option while the collection is small.
- Next.js: supports static output and application workflows, but those additional capabilities do not currently justify a public-site migration.
- Introduce a CMS or database: no current requirement; evaluate if the actual contributor workflow needs it.

## Review

Accepted by Hadi on 2026-10-28 with the request, “Ok now let's update the stack of the project to the suggested one.” This records his decision, not Elie's review. Migration completion and delivery evidence belong in the task; future runtime additions remain separate choices attached to actual requirements.

Sources checked 2026-10-28: [Astro islands](https://docs.astro.build/en/concepts/islands/), [content collections](https://docs.astro.build/en/guides/content-collections/), [static Astro on Pages](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/) and [Next.js static export](https://nextjs.org/docs/app/guides/static-exports/). Recheck current compatibility when implementing a migration.
