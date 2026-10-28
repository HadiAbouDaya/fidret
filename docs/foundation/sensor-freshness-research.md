# Sensor freshness: context for a future evaluation

Research checked 2026-10-28 for the [synthetic prototype task](../tasks/2026-10-28-sensor-freshness.md). This note informs future questions; it does not select a protocol or claim a protocol integration was tested. The [experiment README](../../experiments/sensor_freshness/README.md) owns the implemented model and actual replay evidence.

## Separate the timing questions

The prototype uses one explicitly shared synthetic clock and withholds stale values at supplied observation times. A real system also needs to establish what a timestamp means, how clocks relate, how messages are transported, how often the application checks and what action is appropriate when data cannot be trusted.

| Mechanism | Documented behavior | Question for the real workflow |
| --- | --- | --- |
| ROS 2 deadline | Bounds the expected interval between topic messages; missed-deadline events can be observed | What arrival cadence is required, and who handles a missed deadline? |
| ROS 2 lifespan | Expires messages when publication-to-reception time exceeds the configured duration | Does the timestamp describe publication or the physical measurement, and how is age checked after reception? |
| ROS 2 liveliness | Tracks whether a publisher indicates it is alive within its lease | Which application/data failures remain possible while the publisher is alive? |
| MQTT 5 message expiry | Limits how long a server retains a message before starting onward delivery; the remaining interval accounts for time spent waiting there | What measurement age remains acceptable after transport and application processing? |
| Local monotonic time | Supports elapsed-time comparisons without system-clock adjustments | How will source and receiver timestamps be related across machines and restarts? |

ROS descriptions come from the official [Jazzy QoS documentation source](https://github.com/ros2/ros2_documentation/blob/jazzy/source/Concepts/Intermediate/About-Quality-of-Service-Settings.rst). The public documentation page denied automated access, so its official source was read instead. MQTT behavior is specified in [MQTT 5.0 section 3.3.2.3.3](https://docs.oasis-open.org/mqtt/mqtt/v5.0/os/mqtt-v5.0-os.html). Python documents that a [monotonic clock's reference point is undefined](https://docs.python.org/3/library/time.html#time.monotonic); use elapsed differences under the appropriate clock assumptions.

The questions in the right column are engineering inferences for this project. No middleware behavior, clock synchronization, failure recovery or physical response has been measured by the current prototype.

## Evidence needed before a representative trial

Identify one actual workflow and responsible operator. Establish measurement meaning/units, expected cadence, acceptable age, clock error bounds, restart behavior, transport/backlog conditions, invalid data handling and a meaningful baseline. Define which output is permitted during stale/recovering states and how the operator can stop or recover a trial. Select timeout/recovery thresholds from those conditions and consequences, then test representative failures before any equipment action is authorized.

The current three-second timeout and two-observation recovery threshold are illustrative. The existing [practice brief](physical-ai.md) and [engagement template](../templates/engagement-brief.md) govern subsequent scope and authorization.
