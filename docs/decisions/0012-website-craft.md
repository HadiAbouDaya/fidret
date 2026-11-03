# Website clarity and craft as a shared convention

- Status: active
- Date: 2026-11-03
- Human decision owner: Hadi Abou Daya
- Related task: [Website clarity and design discipline](../tasks/2026-11-03-website-craft.md)
- Basis: Hadi explicitly requested incremental removal of UI/UX AI slop, removal of em dashes and lasting rules for future website development on 2026-11-03

## Context

The existing visual identity is established, but repeated slogans, decorative icon questions and a large promotional footer reduce clarity. Shared instructions already require honest evidence; they need concrete craft criteria that future additions can follow.

## Decision

Retain [decision 0010](0010-evidence-design-language.md), the accepted palette/fonts and static Astro architecture. Refine the canonical [design brief](../design/fidret-design-brief.md#website-craft-rules), project skill and shared agent entry point with page-specific purpose, descriptive headings, subtraction of redundant treatments, proportionate claims and rendered review. The new convention complements the existing visual direction.

Public output must contain no em dashes in prose, titles, metadata, accessible labels, source labels, figures or authored downloads. The output validator decodes HTML entities before checking public text assets. Missing data has a readable label. Visual quality remains an explained review judgment, not a deterministic score.

## Consequences

Every website change includes a small, reviewable rationale and verification appropriate to its surfaces. This adds review work, but helps prevent gradual accumulation of generic UI. CI protects the text rule and existing static/publication contracts; it does not establish tasteful design or a live deployment.

## Alternatives considered

Installing all three external skill systems would duplicate the existing shared source of truth and introduce conflicting workflows. Swapping fonts/colors would leave the hierarchy and copy issues intact. A blanket ban on cards, diagrams or dark surfaces would discard useful choices. Adapt relevant principles into the existing Fidret instructions instead.

## Review

Active implementation convention within Hadi’s explicit request. No joint review or agreement by Elie is asserted. Revisit if the audience, content or product requirements change; preserve the purpose and evidence boundaries.
