# Astro publishing with Markdown and disposable output

- Status: active
- Date: 2026-10-28
- Human decision owner: Hadi Abou Daya
- Related task: [Static Astro migration](../tasks/2026-10-28-astro-migration.md)
- Basis: Implementation convention within Hadi's explicit 2026-10-28 migration request and accepted decision 0007

## Context

The [founding Lab decision](0005-shared-fidret-lab.md) established shared publishing with explicit individual/joint bylines and a question, approach, takeaways, limits and next-steps format. Its Python/JSON renderer and committed generated pages served the initial site. [Decision 0007](0007-static-website-growth.md) accepts Astro and strict TypeScript; the source/output boundary and operating workflow must evolve with that choice.

## Decision

Retain the shared Lab at `/lab/`, the existing four piece kinds, explicit ordered registered authors, honest scope and limitations, stable slugs, UTC dates and exploratory publication without mandatory client evidence or metrics.

Author pieces once in `lab/pieces/*.md`, using YAML frontmatter and five level-two narrative headings. Keep `lab/authors.json` as the author registry and `lab/TEMPLATE.md` as the draft template. Astro content collections and reusable TypeScript rules validate metadata; the Markdown AST policy rejects unsafe authored content and incomplete published narrative. Incomplete drafts remain excluded from routes, listings and sitemap. Fenced code is displayed as text. Media retain required attribution/context, alt text, captions and dimensions.

Use shared Astro routes/layouts/components in `src/`, canonical static assets in `public/`, and a safe Node draft-creation CLI. Replace the Python page renderer and HTML string templates. Keep Python foundation/output validators where they protect repository and publication contracts.

Generate static pages, sitemap and copied assets into `website/`, preserving the existing Pages output path and build command. This directory is ignored and disposable; never hand-edit or commit it. Commit source and the frozen dependency lockfile instead. The shared check command type-checks, tests and rebuilds before validating public output. Preflight filesystem checks reject symlinked source/cache/output paths before copying or cleaning them.

## Consequences

The public design, URLs, bylines, evidence boundaries and [Pages hosting choice](0004-pages-git-deployment.md) continue. Build tooling now needs pinned Node/pnpm packages, while visitors still receive static HTML/CSS/assets without a server or browser JavaScript requirement. Output can be rebuilt from source; undocumented files placed inside `website/` can be removed by a build.

Source drafts remain visible in this public GitHub repository. Assets in `public/` are published regardless of article draft status. Keep private material elsewhere. Local checks and an accepted architecture do not establish a successful remote build, actual live deployment or another contributor's approval.

## Alternatives considered

- Retain committed generated pages: permits inspecting output in Git, but duplicates source and creates a second place agents may edit; the standard Astro build and output checks replace that freshness contract.
- Keep the Python renderer beside Astro: preserves a second publishing path and increases the chance of conflicting sources; retain only useful independent validators.
- Adopt MDX, a CMS, React or a backend immediately: no current piece requires them; add them through a bounded task when useful.

## Review

Established within Hadi's authorized migration; no Elie review is inferred. This supersedes decision 0005's publishing implementation while retaining its founding format and credit principles. Use the [Lab guide](../../lab/README.md) and [system map](../architecture/README.md) for current operations; the migration task owns implementation and verification evidence.
