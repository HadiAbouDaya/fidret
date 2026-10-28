# Initial repository setup

## Local checkout

The initial workspace root is `/home/oem/Hadi/Work/Fidret`. It contains a protected, empty `.git` directory, so the usable repository is the child directory `/home/oem/Hadi/Work/Fidret/fidret`. Run Git and validation commands there. Other contributors can clone normally to their own preferred path.

Direct HTTPS cloning failed because the execution shell could not resolve `github.com`. The connected GitHub tool could read the private repository. Its complete initial history consisted of one signed commit and a README.

The original blob, tree, and signed commit were reconstructed locally and each Git object hash was checked against GitHub:

- Commit: `15d685efe2f9ed937251e25a95998664624f7ecc`
- Tree: `1720e4f8f0b44e678f185657209eadfd7ec0a18e`
- README blob: `1db2d3c8fc957117a9561295380273f817a6ae90`

The checkout retains `origin` as `https://github.com/HadiAbouDaya/fidret.git` and the original `main` history. This was a verified recovery through the API rather than a successful `git clone` invocation. Normal network Git operations still require shell connectivity and suitable authentication.

## Checks

The initial foundation used Python-only checks. For the current Astro implementation, first install the pinned Node/pnpm toolchain and locked dependencies as described in the [README](../../README.md), then run from the repository root:

```sh
sh scripts/check_deployment.sh
git diff --check
```

The checker validates required foundation files, local Markdown file links, harness pointers, task metadata/verification/checkpoints, decision metadata/lifecycle/basis, and task/decision registration. It rejects duplicate metadata and decision numbers, mismatched decision status and invalid supersession chains. It does not verify external links, Markdown anchors or reference-style links, factual accuracy, actual approvals, or physical safety. Its unit tests exercise both valid and deliberately invalid inputs. The [agent runbook](agent-workflow.md) owns the current startup and recovery protocol.

## GitHub automation

The `Foundation checks` workflow runs the shared check entry point on pushes and pull requests after installing the pinned Node/pnpm toolchain and frozen dependencies. It uses read-only repository permissions and pinned action commits. The job name is `foundation`, which can be selected as a required check after its first successful run.

Action references were resolved against the official repositories: [checkout v7](https://github.com/actions/checkout/tree/3d3c42e5aac5ba805825da76410c181273ba90b1), [setup-python v7](https://github.com/actions/setup-python/tree/6d4fd22b20465ccc0f7354476588e8df7c9ca0e0) and, for the Astro migration, [setup-node v6](https://github.com/actions/setup-node/tree/249970729cb0ef3589644e2896645e5dc5ba9c38). The source workflow is authoritative for pins. Review upstream changes before updating them.

Publishing the workflow does not create branch protection or contributor access. Those GitHub settings remain separate follow-up actions. Execution evidence is recorded in the [foundation task](../tasks/2026-10-24-foundation.md).
