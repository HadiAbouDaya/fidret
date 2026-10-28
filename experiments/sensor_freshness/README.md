# Synthetic sensor freshness and recovery

This local software experiment explores the [sensor interruption idea](../../lab/ideas.md) under the [physical AI practice brief](../../docs/foundation/physical-ai.md). It uses invented scalar readings and a deterministic clock. Implementation is agent-prepared for review; this is not a Lab article or an attribution of authorship to either contributor. The [task](../../docs/tasks/2026-10-28-sensor-freshness.md) owns review and delivery evidence.

## Model contract

These rules define the experiment before interpreting its results:

- Source timestamps and receiver `now` are nonnegative, finite seconds on the **same synchronized synthetic monotonic clock**. The model does not establish synchronization between real clocks. Time can stay equal between calls but cannot move backward. An invalid `now` raises `ValueError` without changing model state.
- With timeout `T > 0`, a reading is fresh only when `0 <= now - source_time < T`. It is stale **at** `source_time + T`. Arrival time never replaces source time.
- A reading has a finite numeric scalar value and source timestamp; booleans are rejected as numbers. Future timestamps, invalid numbers, negative source times, already-stale readings, duplicates and timestamps earlier than the last accepted timestamp are rejected. A rejection cannot renew the accepted reading or count toward recovery.
- Each `step(now, reading=None)` first advances time and expires the previous accepted reading, then handles the optional arrival. Thus invalid input can coincide with expiry, and missing input still expires data. The accepted timestamp watermark survives expiry. Clock resets, sensor restarts and sequence restarts are not modeled.
- The initial state is `stale`, with no current value. A valid fresh observation enters `recovering`. A second observation with a strictly greater source timestamp enters `fresh`. If the first candidate expires before the second arrives, recovery restarts with the next accepted observation. Rejected observations neither advance nor reset an unexpired recovery candidate. Once fresh, each accepted observation maintains freshness until its own deadline.
- Only a `fresh` snapshot exposes `current_value`. `stale` and `recovering` snapshots expose `None`; diagnostic timestamps may remain. A snapshot is immutable and valid **as of its supplied `as_of` time only**. Callers must call `step` with their current logical time before using a value. An old snapshot does not update itself.

The deliberately simple baseline replaces its stored reading on every arrival and offers that value indefinitely, without checking age, ordering, future timestamps or recovery. It represents one specific failure-prone policy, rather than all alternatives to this model. The replay reports source age and timestamp rollbacks so its weaknesses are visible.

## Reproduce

From the repository root, with Python 3.12 and no installations:

```sh
python3 -m experiments.sensor_freshness
python3 -m unittest discover -s tests -p 'test_sensor_freshness.py' -v
```

The first command prints readable rows followed by the same results as JSON. Its five fixed scenarios cover normal arrivals, dropped arrivals, delayed packets, out-of-order/duplicate packets and interrupted recovery. The timeout is three synthetic seconds. No result files are created, and no network or equipment is accessed.

Each row is a scheduled observation point, not continuous monitoring. `baseline_age_invalid` counts rows where the baseline exposes a reading outside the permitted source-age interval. `baseline_timestamp_rollbacks` counts arrivals that replace its reading with an earlier timestamp. These counts depend on the fixtures and observation schedule; they are not estimates of real-world error rates.

## Observed fixture results

Running the command on 2026-10-28 produced these counts. `guarded_age_invalid` applies the same age check only when the guarded model exposes a current value.

| Scenario | Observation points | Baseline age-invalid rows | Baseline timestamp rollbacks | Guarded age-invalid rows |
| --- | ---: | ---: | ---: | ---: |
| Normal | 5 | 0 | 0 | 0 |
| Dropped arrivals | 6 | 2 | 0 | 0 |
| Delayed arrivals | 5 | 3 | 0 | 0 |
| Out of order / duplicate | 6 | 1 | 1 | 0 |
| Recovery | 11 | 2 | 1 | 0 |

In the recovery fixture, the model withholds the first fresh candidate, ignores a duplicate and an older arrival, then resumes on the second distinct observation. A later candidate expires exactly at its three-second deadline before another arrival, so recovery remains incomplete until one more observation. The baseline immediately offers every replacement, including the duplicate's different value.

The focused suite contains 17 tests. It covers exact timeout, source-based expiry despite later arrival, invalid/future numbers, atomic rejection of invalid receiver time, retained ordering across expiry, immutable as-of snapshots, baseline failures, replay output and invariants over all `6^5` five-step schedules from six input categories. This bounded enumeration is not an exhaustive proof over all inputs.

## Limits

Freshness here concerns source age and ordering only. A timely number can still be physically wrong, misleading, malicious or inappropriate for a decision. The experiment does not address clock drift, transport/protocol behavior, identity, authentication, calibration, units, multiple sensors, persisted state, scheduling delays or a real workflow. Timestamp comparisons use Python floating-point seconds; precision at very large clock values is not evaluated. A strict timestamp watermark also needs a separately designed reset policy before use with a source that can restart its clock.

The three-second timeout and two-observation recovery threshold are illustrative choices, not validated operational requirements. No hardware, real sensor/client data, actuation or safety assessment is involved. Withholding `current_value` is a software output rule; it does not define a safe physical action or fallback. Evaluation with representative conditions and a responsible operator would be separate work.
