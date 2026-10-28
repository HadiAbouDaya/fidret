# Reproducible local experiments

These sources develop bounded ideas under the [physical AI practice brief](../docs/foundation/physical-ai.md). They are public repository material, separate from the deployed website and Lab articles. Each experiment states its inputs, assumptions, baseline, reproducible command, observed results and limits. Do not place confidential data, model weights or hardware credentials here.

| Experiment | Question | Scope and evidence |
| --- | --- | --- |
| [Sensor freshness and recovery](sensor_freshness/README.md) | What should a connected system do when readings stop arriving or arrive late? | Python standard-library model with synthetic event replays, a latest-arrival baseline and bounded invariant tests; no hardware or operational safety claim |

To continue an experiment, read its task/README before changing assumptions. Keep source and meaningful tests together; the root Python test discovery includes these checks. Record actual conditions and limitations with results. A passing software test does not authorize physical actuation, select a commercial offer or establish real-world capability. Use the [engagement brief](../docs/templates/engagement-brief.md) and a separate task for representative evaluation or a client pilot.

Eventual [Lab publication](../lab/README.md) is a separate editorial step with actual contributor/byline selection. Task ownership and agent-prepared implementation are not automatic article authorship.
