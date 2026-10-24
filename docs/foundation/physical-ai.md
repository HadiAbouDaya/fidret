# Physical AI practice foundation

Physical AI is Fidret's first practice to develop. Its purpose is to earn trust in systems that must work under real physical conditions. This brief defines the initial exploration scope; it does not claim an established delivery capability.

## Working scope

For this practice, physical AI covers systems that use observations of the physical world to support decisions or actions involving equipment and physical processes. Relevant work may involve perception, simulation, reasoning, control, and integration with sensors or machines.

The first focus must be narrow enough to validate. A system's operating environment, users, timing requirements, failure modes, and integration constraints are part of the problem.

## Candidate starting points

These are discovery hypotheses, not selected offers:

| Candidate | Question to validate |
| --- | --- |
| Visual inspection or operator assistance | Is there a recurring decision where better perception would improve a measurable outcome? |
| Simulation and evaluation | Can a representative environment expose useful failures before a physical trial? |
| Bounded automation or robotics integration | Is there a repeatable task with clear operating limits, access to equipment, and a responsible operator? |

Compare opportunities by client need, access to data and equipment, available expertise, evaluation feasibility, integration effort, and consequences of failure. Select the first focus after discovery rather than choosing a stack first.

## Building credible expertise

1. **Understand:** describe a real workflow, its users, constraints, and current baseline.
2. **Demonstrate:** build a reproducible experiment with defined inputs, environment, metric, baseline, and failure cases.
3. **Evaluate:** test under representative conditions and document where the result does and does not hold.
4. **Trial:** agree a bounded pilot, supervision, acceptance criteria, and responsibility with the people operating the system.
5. **Deliver:** define integration, monitoring, maintenance, handover, and ownership before making a delivery commitment.

Keep evidence in the relevant future project. A simulation result supports a simulation claim; a lab result supports a claim under those lab conditions. Record what additional evidence is needed before making broader claims.

## Work involving physical equipment

Before an agent runs code that can affect real equipment, the task must identify the responsible human operator, the permitted operating envelope, the validation already completed, and how the operator can stop or recover the system. Keep initial experiments in simulation or an isolated environment until that authorization exists. A passing repository check does not authorize physical actuation.

## Questions for the first practice task

- Which client problem and environment can we access and understand well enough to validate?
- Which relevant abilities are already demonstrated, and which require learning or a partner?
- What is the smallest useful experiment and its success criterion?
- What would justify continuing, changing direction, or stopping?

Use the [engagement brief](../templates/engagement-brief.md) to turn a selected opportunity into a concrete task.
