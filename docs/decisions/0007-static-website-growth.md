# Proposed static website growth stack

- Status: proposed
- Date: 2026-10-28
- Human decision owner: Hadi Abou Daya
- Related task: [Shared agent readiness](../tasks/2026-10-28-agent-readiness.md)

## Context

Hadi asked which frontend stack best serves Fidret's purpose and future reliability. The current HTML/CSS website, Python standard-library Lab publisher and Cloudflare Pages hosting already provide simple static delivery. Growing technical publishing, repeated layouts and interactive demonstrations could eventually benefit from standard framework tooling; their scale and migration benefit have not yet been established.

## Decision

Propose Astro in static mode with strict TypeScript, the existing custom CSS/design tokens and local fonts, validated local content collections, and the existing static hosting. Prefer Markdown for prose; add MDX or interactive components only when a piece needs them. Existing structured JSON can be retained or migrated deliberately with its schema and publication boundaries.

This is a recommendation, not the implemented stack or authorization to migrate. Keep the [current system](../architecture/README.md) until a concrete expansion task justifies the transition and Hadi accepts the choice.

## Consequences

The proposed stack offers shared layouts, content schemas and optional interactive components while retaining static output. It adds Node/package dependencies and ongoing upgrade work, so migration alone does not establish greater reliability. A migration task must preserve URLs, bylines, dates, drafts, limitations, design, static hosting and rollback, and deliberately update script/CSP checks if interactivity is adopted.

## Alternatives considered

- Keep HTML/CSS and the Python publisher: least change and a sound option while the collection is small.
- Next.js: supports static output and application workflows, but those additional capabilities do not currently justify a public-site migration.
- Introduce a CMS or database: no current requirement; evaluate if the actual contributor workflow needs it.

## Review

Human decision pending. Hadi's follow-up requested agent readiness, not a frontend migration. Revisit when repeated layouts, richer publishing or actual demonstrations create observable maintenance friction. Opening or accepting this proposal does not itself complete migration or verify a deployment.

Sources checked 2026-10-28: [Astro islands](https://docs.astro.build/en/concepts/islands/), [content collections](https://docs.astro.build/en/guides/content-collections/), [static Astro on Pages](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/) and [Next.js static export](https://nextjs.org/docs/app/guides/static-exports/). Recheck current compatibility when implementing a migration.
