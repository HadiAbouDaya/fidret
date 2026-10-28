# Shared Fidret Lab publishing system

- Status: done
- Human owner: Hadi Abou Daya
- Agent or harness: Codex
- Branch: feat/fidret-lab
- Updated: 2026-10-28
- Verification status: passed

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
- [PR #6](https://github.com/HadiAbouDaya/fidret/pull/6) merged as `be503375793060810340ee98882cb13f4bd6aff5`. Both [branch CI](https://github.com/HadiAbouDaya/fidret/actions/runs/40127434263) and [PR CI](https://github.com/HadiAbouDaya/fidret/actions/runs/40127459087) passed before merge.
- Cloudflare Pages confirmed that commit as the current production deployment at `https://e55e897a.fidret.pages.dev`, automatically deployed from `main`.
- [The live Lab](https://fidret.com/lab/) and its stylesheet returned HTTPS 200. The homepage navigation and closing link both lead to the Lab. `/lab/authors.json` returned 404; repository sources are outside the website output.
- Live browser review at 360px and 1440px confirmed readable layouts without horizontal overflow. The shared contributor section names Hadi and Elie; the collection accurately says its first pieces are still to come.

## Handoff

Completed under Hadi's standing authorization to publish checkpoints and merge finished work, plus his website deployment request. The Lab is merged and verified live. This does not record Elie's review or agreement.

UI templates and styling were developed in a separate worktree, then integrated with the publisher and workflow. No technical pieces, author contributions, or experimental results were invented to fill the collection.

- Checkpoint: shared Lab publisher, templates, documentation and static output completed. No real technical pieces were added during setup.
- Remaining work: none for the publishing system. Selecting and writing the first piece belongs to a new task.
- Next action: either contributor can choose a question from [the unassigned ideas](../../lab/ideas.md) or bring their own, then follow the [Lab guide](../../lab/README.md) with actual bylines.
- Blockers: none for this completed implementation.
- Acceptance basis: Hadi's shared Lab request, standing publication/merge authorization and website deployment request; no Elie review or joint authorship is inferred.
- Publication: PR 6 merged as `be503375793060810340ee98882cb13f4bd6aff5`, with production deployment and live checks recorded above for 2026-10-24. This 2026-10-28 clarification did not reverify current service state.
- Last verified: local baseline `e02e09f` passed `sh scripts/check_deployment.sh` on 2026-10-28 with 35 tests and no published/draft pieces; the live evidence above remains historical.
