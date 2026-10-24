# Shared Fidret Lab publishing system

- Status: review
- Human owner: Hadi Abou Daya
- Agent or harness: Codex
- Branch: feat/fidret-lab
- Updated: 2026-10-24

## Purpose

Give Hadi and Elie a unified way to publish useful technical pieces and build credibility over time. Hadi confirmed a shared Fidret Lab with individual or joint bylines and clarified that client work or real-world validation is not required at this stage.

## Scope

A reusable piece format, author registry, contributor workflow, agent guidance, simple static publishing tools, and a public Lab section within the supplied brand design. Support simulations, prototypes, technical notes, and architecture explorations. Do not invent completed projects, measured results, authorship, or reviews.

## Plan

1. Define the shared format and an authoring workflow suitable for both contributors and their harnesses.
2. Build a dependency-free publisher that separates drafts from published pages and generates bylines consistently.
3. Add a branded Lab index and piece templates, preserving the existing free static hosting architecture.
4. Test publication boundaries, escaping, links, authors, dates, and generated-page freshness.
5. Publish and merge after CI, then verify the deployed Lab and update this handoff.

## Acceptance criteria

- Either contributor can create a piece using the same template and commands.
- A piece can carry either person's byline or both, with no automatic attribution to an uninvolved person.
- Exploratory work is publishable without client projects, production deployment, or measured real-world results.
- Readers can see the kind of piece, question, approach, takeaways, limits, and next steps.
- Drafts stay off the website; documentation explains that source drafts in this public repository are still public on GitHub.
- The public site retains its brand, accessibility, static-only operation, and free deployment workflow.
- Checks pass locally and in GitHub; the live Lab is verified after merge.

## Decisions

Use a shared Fidret Lab with bylines, confirmed by Hadi. Store each piece once in structured source and generate static HTML at build time. Keep runtime JavaScript, accounts, databases, and third-party publishing services out of this initial system.

## Verification

- `python3 scripts/lab.py build` and `python3 scripts/lab.py check`: passed with no actual source pieces; the collection uses its truthful empty state.
- `sh scripts/check_deployment.sh`: both existing validators, the new Lab freshness check, and all 35 tests passed.
- Tests cover solo and joint bylines, incomplete drafts, publication without client evidence or metrics, escaping, unsafe links, dates, withdrawal, stale outputs, existing-file preservation, and symlink boundaries.
- A focused independent review identified symlink and local-time date issues; both were corrected. Creation and date validation now use UTC.
- Browser review completed for the actual empty collection and a temporary local article fixture. The fixture includes joint bylines and a code excerpt, is explicitly labelled as a fixture, and is not part of the repository's piece collection.
- GitHub CI and live post-merge verification remain pending.

## Handoff

Implementation is ready for CI and publication. UI templates and styling were developed in a separate worktree, then integrated with the publisher and workflow. No technical pieces, author contributions, or experimental results were invented to fill the collection. After merge, verify `/lab/`, the homepage link, responsive layout, and the existing static publication boundary.
