# Decision register

Record durable choices here so both contributors and their agents can understand the reasoning. Reference the relevant decision from the task, PR, and any document it changes.

| Record | Status | Subject |
| --- | --- | --- |
| [0001](0001-company-purpose.md) | accepted | Founding purpose and first practice |
| [0002](0002-shared-agent-context.md) | active | Shared agent context and collaboration structure |
| [0003](0003-free-static-hosting.md) | superseded | Initial Workers static hosting implementation |
| [0004](0004-pages-git-deployment.md) | active | Native Pages Free deployment from main |
| [0005](0005-shared-fidret-lab.md) | active | Shared Lab publishing with individual and joint bylines |

## Creating a decision

Copy [the template](TEMPLATE.md) to the next available `NNNN-short-name.md` and add it to the table. Check for a number collision before merging concurrent work.

Use **proposed** for a choice awaiting its named human decision owner, **accepted** after that owner accepts it, **active** for an implementation convention established within an authorized task, **rejected** for a declined proposal, and **superseded** when a later decision replaces it. An active convention does not imply both contributors have reviewed it.

Keep the original rationale when changing a decision. Link a superseding record and update the affected instructions or company document in the same change. Git history preserves earlier wording; private chats must not be the only place the decision can be understood.
