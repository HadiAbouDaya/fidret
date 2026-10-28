# Fidret design language and website revamp

- Status: done
- Human owner: Hadi Abou Daya
- Agent or harness: Codex with coordinated implementation and review agents
- Branch: hadi/design-revamp; closing evidence on hadi/design-handoff
- Updated: 2026-10-28
- Verification status: passed

## Purpose

Hadi requests a full visual redesign, research into design skills that avoid generic AI output, a durable Fidret design language and distinctive useful additions. Serve [Trust earned](../foundation/charter.md) through excellent presentation and inspectable evidence. Physical AI remains a developing practice.

## Scope

Rebuild all existing public surfaces, establish reusable design guidance and an adapted project design skill, and introduce an explanatory walkthrough grounded in the existing synthetic sensor-freshness prototype. Keep Astro/TypeScript static, same-origin assets, zero browser JavaScript, existing public URLs, truthful credits and Free hosting. Do not invent commercial proof or contact destinations.

## Execution boundaries

- Authorized scope: Hadi's full-revamp request delegates creative and feature choices. Existing authorization covers branches, PRs and verified merges; the prior request to push and deploy the project remains applicable to this website work. Existing main deployment runs automatically; no account, domain or paid-plan changes.
- Worktree: `fidret-design`, branch above; canonical checkout preserved clean.
- Dependencies: existing Astro migration, prototype and publication checks; [design brief](../design/fidret-design-brief.md) will be revised under this request.
- Coordination: root integration agent owns homepage, shared chrome, global CSS, original figure, approach route, task, and combined verification. Separate worktrees will own design documentation/skill, Lab/article/404 presentation, and the native-state signal walkthrough. Each agent owns its assigned files and preserves others' work; root integrates commits.

## Plan

1. Research primary-source design skills/references and review approved mission/content.
2. Establish a distinctive composition, tokens, diagram and interaction grammar; retain provenance and an agent-readable skill.
3. Implement the complete responsive redesign and useful source-backed exploration.
4. Run foundation/type/build/tests, inspect desktop/mobile/text enlargement and keyboard interaction, critique rendered output and refine.
5. Publish through a checked PR/merge and verify actual production; leave resumable evidence.

## Acceptance criteria

- A coherent, distinctive visual language is documented and applied across home, Lab, articles, 404 and new exploration.
- Original graphics explain sensing and evidence, with accurate labels and no implied hardware validation.
- Native controls give an understandable, keyboard-usable signal-freshness walkthrough; values match the documented software model.
- Responsive layouts, visible focus, readable contrast, reduced-motion behavior and working navigation.
- All existing content/byline/draft/privacy/output boundaries remain protected; required checks pass.
- Source, review and actual publication status are recorded separately.

## Decisions

Research selected Impeccable's anti-template critique and design-surface distinctions, supplemented by the installed frontend-design skill. A small original Fidret adaptation will omit upstream installers/hooks and approval tournaments. The new brief will explicitly supersede v1's composition defaults while retaining the company purpose.

## Verification

Initial main clean at `11105131e9257edede2d814a8cbeee41264858d8`. The exact toolchain installed successfully in the task worktree using project-local Corepack: Node 24.22.1, pnpm 11.28.9, Astro 7.4.2, frozen lockfile unchanged. Prior worktrees are preserved.

First combined `sh scripts/check_deployment.sh` passed: foundation 56 documents / 14 tasks / 3 adapters, Astro 33 files with zero diagnostic issues,36 Node tests,78 Python tests,5 static pages and output validation. The walkthrough test compares all scheduled snapshots with the independent Python model.

Independent source/fixture reviews found and root corrected a future article resource-anchor collision (covered in the existing actual-build fixture), two narrowly insufficient informative-line contrasts and an ineffective generic-div aria label. Root also increased mobile diagram labels and added print-friendly walkthrough states. Final combined checks follow refinements.

Rendered production-output review: desktop1704 and phone390/320 layouts; all5currentpublicpages at 320 had no document overflow and zero scripts. Native radio keyboard arrows/Space changed the selected moment and exposed only its corresponding panel in the accessibility tree. Tablet 768 review confirmed the Lab and approach composition. A disposable article fixture with code/table and deliberate resource-heading collisions was reviewed at 390; the Resources jump uses a unique target and all IDs are unique. A separate disposable 200% root-text fixture produced34 px body text without document overflow on home/approach/Lab/exploration/article at 390. This is a text-enlargement fixture, not a claim of an assistive-technology audit or a browser's 200% zoom setting.

Final combined `sh scripts/check_deployment.sh` passed after refinements:36 Node tests,78 Python tests, Astro 33 files with zero diagnostic issues, foundation and output contracts. Computed informative-line contrast is now3.67:1 (field annotation on sage) and3.58:1 (timeline axis on forest). Header/navigation, article guide, code/table containment, five native state choices and real source links were reviewed. Initial compressed HTML measurements: home 6,661 bytes; exploration 4,429 bytes (gzip locally, not a field-performance claim). No external design detector, field CWV or formal accessibility certification claimed.


Production release evidence: Cloudflare's authenticated GitHub check reports success for merge `b0bea72` and [deployment d30a6120](https://d30a6120.fidret.pages.dev). Live home, approach, Lab and walkthrough return HTTP 200 and byte-match their checked local HTML; both fingerprinted stylesheets return HTTP 200, immutable caching and exact byte parity. Strict CSP remains present, with zero scripts or inline styles. Internal `AGENTS.md` and experiment source paths return 404. The browser loaded the new typography/figure and normal navigation from home to Lab to walkthrough; selecting the delayed moment revealed only `snapshot-delayed`, with accepted timestamp 1 s, age 4 s and value withheld. Both CSSOM sheets and self-hosted fonts loaded. This verifies the published software interface, not physical equipment or a field-performance claim.

## Handoff

- Checkpoint: complete redesign and reusable design language/skill merged, deployed and verified on the custom domain.
- Remaining work: none for the requested redesign; future authored Lab pieces and representative physical-system evaluation belong to separate tasks.
- Next action: use the canonical design language and project skill for future website changes; preserve the tested evidence boundaries.
- Blockers: none; exact local toolchain installation now works.
- Acceptance basis: Hadi's explicit full-revamp request and applicable standing publication authorization; no Elie review or agreement inferred.
- Publication: [PR 18](https://github.com/HadiAbouDaya/fidret/pull/18) merged as `b0bea72e3f1befb34185689e1f5324f042ea1207`; checked source head `f54fa84be29597909b6057fc000bad0c2091443d`. Push CI `40782843865`, PR CI `40782874763` and merged-main CI `40783110437` passed. Cloudflare production deployment `d30a6120-8432-4dd3-9248-a767d1cda2a8` succeeded and the actual redesign was verified on `fidret.com` at 22:56–22:57 UTC. This closing record follows on `hadi/design-handoff`; its PR tracks the later documentation-only release, which does not change public source bytes.
- Last verified: 2026-10-28, exact local/remote checks, Cloudflare success for `b0bea72`, live HTML/CSS parity, browser rendering and native walkthrough behavior at 22:56–22:57 UTC.
