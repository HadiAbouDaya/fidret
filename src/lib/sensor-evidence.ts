/** Fixed software replay evidence captured on 2026-10-29.
 * Generated from experiments.sensor_freshness.replay.replay_all().
 * The parity test checks every snapshot against a fresh Python replay.
 * This is not a browser feed, physical trial or estimate of field reliability.
 */
export interface SensorReplaySnapshot {
  arrival: { source_time: number; value: number } | null;
  guarded: {
    as_of: number;
    state: 'stale' | 'recovering' | 'fresh';
    current_value: number | null;
    accepted_source_time: number | null;
    accepted_age: number | null;
    recovery_count: number;
    decision: 'accepted' | 'no_reading' | 'delayed_stale' | 'out_of_order' | 'duplicate';
  };
  baseline: {
    as_of: number;
    current_value: number | null;
    source_time: number | null;
    source_age: number | null;
    timestamp_rollback: boolean;
  };
}

export interface SensorScenarioSummary {
  observations: number;
  baseline_age_invalid: number;
  baseline_timestamp_rollbacks: number;
  guarded_age_invalid: number;
}

export interface SensorReplayEvidence {
  clock: string;
  timeout: number;
  freshness: string;
  recovery_observations: number;
  scenarios: Record<string, {
    snapshots: SensorReplaySnapshot[];
    summary: SensorScenarioSummary;
  }>;
}

export const sensorEvidenceCaptureDate = '2026-10-29';

export const sensorEvidence: SensorReplayEvidence = {
  "clock": "synchronized synthetic monotonic seconds",
  "timeout": 3.0,
  "freshness": "0 <= source age < timeout",
  "recovery_observations": 2,
  scenarios: {
    "normal": {
      snapshots: [
        {"arrival": {"source_time": 0, "value": 10}, "guarded": {"as_of": 0.0, "state": "recovering", "current_value": null, "accepted_source_time": 0.0, "accepted_age": 0.0, "recovery_count": 1, "decision": "accepted"}, "baseline": {"as_of": 0, "current_value": 10, "source_time": 0, "source_age": 0, "timestamp_rollback": false}},
        {"arrival": {"source_time": 1, "value": 11}, "guarded": {"as_of": 1.0, "state": "fresh", "current_value": 11.0, "accepted_source_time": 1.0, "accepted_age": 0.0, "recovery_count": 2, "decision": "accepted"}, "baseline": {"as_of": 1, "current_value": 11, "source_time": 1, "source_age": 0, "timestamp_rollback": false}},
        {"arrival": {"source_time": 2, "value": 12}, "guarded": {"as_of": 2.0, "state": "fresh", "current_value": 12.0, "accepted_source_time": 2.0, "accepted_age": 0.0, "recovery_count": 2, "decision": "accepted"}, "baseline": {"as_of": 2, "current_value": 12, "source_time": 2, "source_age": 0, "timestamp_rollback": false}},
        {"arrival": {"source_time": 3, "value": 13}, "guarded": {"as_of": 3.0, "state": "fresh", "current_value": 13.0, "accepted_source_time": 3.0, "accepted_age": 0.0, "recovery_count": 2, "decision": "accepted"}, "baseline": {"as_of": 3, "current_value": 13, "source_time": 3, "source_age": 0, "timestamp_rollback": false}},
        {"arrival": {"source_time": 4, "value": 14}, "guarded": {"as_of": 4.0, "state": "fresh", "current_value": 14.0, "accepted_source_time": 4.0, "accepted_age": 0.0, "recovery_count": 2, "decision": "accepted"}, "baseline": {"as_of": 4, "current_value": 14, "source_time": 4, "source_age": 0, "timestamp_rollback": false}}
      ],
      summary: {"observations": 5, "baseline_age_invalid": 0, "baseline_timestamp_rollbacks": 0, "guarded_age_invalid": 0}
    },
    "dropped": {
      snapshots: [
        {"arrival": {"source_time": 0, "value": 10}, "guarded": {"as_of": 0.0, "state": "recovering", "current_value": null, "accepted_source_time": 0.0, "accepted_age": 0.0, "recovery_count": 1, "decision": "accepted"}, "baseline": {"as_of": 0, "current_value": 10, "source_time": 0, "source_age": 0, "timestamp_rollback": false}},
        {"arrival": {"source_time": 1, "value": 11}, "guarded": {"as_of": 1.0, "state": "fresh", "current_value": 11.0, "accepted_source_time": 1.0, "accepted_age": 0.0, "recovery_count": 2, "decision": "accepted"}, "baseline": {"as_of": 1, "current_value": 11, "source_time": 1, "source_age": 0, "timestamp_rollback": false}},
        {"arrival": null, "guarded": {"as_of": 2.0, "state": "fresh", "current_value": 11.0, "accepted_source_time": 1.0, "accepted_age": 1.0, "recovery_count": 2, "decision": "no_reading"}, "baseline": {"as_of": 2, "current_value": 11, "source_time": 1, "source_age": 1, "timestamp_rollback": false}},
        {"arrival": null, "guarded": {"as_of": 3.999, "state": "fresh", "current_value": 11.0, "accepted_source_time": 1.0, "accepted_age": 2.999, "recovery_count": 2, "decision": "no_reading"}, "baseline": {"as_of": 3.999, "current_value": 11, "source_time": 1, "source_age": 2.999, "timestamp_rollback": false}},
        {"arrival": null, "guarded": {"as_of": 4.0, "state": "stale", "current_value": null, "accepted_source_time": 1.0, "accepted_age": 3.0, "recovery_count": 0, "decision": "no_reading"}, "baseline": {"as_of": 4, "current_value": 11, "source_time": 1, "source_age": 3, "timestamp_rollback": false}},
        {"arrival": null, "guarded": {"as_of": 6.0, "state": "stale", "current_value": null, "accepted_source_time": 1.0, "accepted_age": 5.0, "recovery_count": 0, "decision": "no_reading"}, "baseline": {"as_of": 6, "current_value": 11, "source_time": 1, "source_age": 5, "timestamp_rollback": false}}
      ],
      summary: {"observations": 6, "baseline_age_invalid": 2, "baseline_timestamp_rollbacks": 0, "guarded_age_invalid": 0}
    },
    "delayed": {
      snapshots: [
        {"arrival": {"source_time": 0, "value": 10}, "guarded": {"as_of": 0.0, "state": "recovering", "current_value": null, "accepted_source_time": 0.0, "accepted_age": 0.0, "recovery_count": 1, "decision": "accepted"}, "baseline": {"as_of": 0, "current_value": 10, "source_time": 0, "source_age": 0, "timestamp_rollback": false}},
        {"arrival": {"source_time": 1, "value": 11}, "guarded": {"as_of": 1.0, "state": "fresh", "current_value": 11.0, "accepted_source_time": 1.0, "accepted_age": 0.0, "recovery_count": 2, "decision": "accepted"}, "baseline": {"as_of": 1, "current_value": 11, "source_time": 1, "source_age": 0, "timestamp_rollback": false}},
        {"arrival": {"source_time": 2, "value": 12}, "guarded": {"as_of": 5.0, "state": "stale", "current_value": null, "accepted_source_time": 1.0, "accepted_age": 4.0, "recovery_count": 0, "decision": "delayed_stale"}, "baseline": {"as_of": 5, "current_value": 12, "source_time": 2, "source_age": 3, "timestamp_rollback": false}},
        {"arrival": {"source_time": 2.5, "value": 13}, "guarded": {"as_of": 5.5, "state": "stale", "current_value": null, "accepted_source_time": 1.0, "accepted_age": 4.5, "recovery_count": 0, "decision": "delayed_stale"}, "baseline": {"as_of": 5.5, "current_value": 13, "source_time": 2.5, "source_age": 3.0, "timestamp_rollback": false}},
        {"arrival": null, "guarded": {"as_of": 6.0, "state": "stale", "current_value": null, "accepted_source_time": 1.0, "accepted_age": 5.0, "recovery_count": 0, "decision": "no_reading"}, "baseline": {"as_of": 6, "current_value": 13, "source_time": 2.5, "source_age": 3.5, "timestamp_rollback": false}}
      ],
      summary: {"observations": 5, "baseline_age_invalid": 3, "baseline_timestamp_rollbacks": 0, "guarded_age_invalid": 0}
    },
    "out_of_order": {
      snapshots: [
        {"arrival": {"source_time": 0, "value": 10}, "guarded": {"as_of": 0.0, "state": "recovering", "current_value": null, "accepted_source_time": 0.0, "accepted_age": 0.0, "recovery_count": 1, "decision": "accepted"}, "baseline": {"as_of": 0, "current_value": 10, "source_time": 0, "source_age": 0, "timestamp_rollback": false}},
        {"arrival": {"source_time": 1, "value": 11}, "guarded": {"as_of": 1.0, "state": "fresh", "current_value": 11.0, "accepted_source_time": 1.0, "accepted_age": 0.0, "recovery_count": 2, "decision": "accepted"}, "baseline": {"as_of": 1, "current_value": 11, "source_time": 1, "source_age": 0, "timestamp_rollback": false}},
        {"arrival": {"source_time": 2, "value": 12}, "guarded": {"as_of": 2.0, "state": "fresh", "current_value": 12.0, "accepted_source_time": 2.0, "accepted_age": 0.0, "recovery_count": 2, "decision": "accepted"}, "baseline": {"as_of": 2, "current_value": 12, "source_time": 2, "source_age": 0, "timestamp_rollback": false}},
        {"arrival": {"source_time": 1.5, "value": 99}, "guarded": {"as_of": 2.5, "state": "fresh", "current_value": 12.0, "accepted_source_time": 2.0, "accepted_age": 0.5, "recovery_count": 2, "decision": "out_of_order"}, "baseline": {"as_of": 2.5, "current_value": 99, "source_time": 1.5, "source_age": 1.0, "timestamp_rollback": true}},
        {"arrival": {"source_time": 2, "value": 98}, "guarded": {"as_of": 3.0, "state": "fresh", "current_value": 12.0, "accepted_source_time": 2.0, "accepted_age": 1.0, "recovery_count": 2, "decision": "duplicate"}, "baseline": {"as_of": 3, "current_value": 98, "source_time": 2, "source_age": 1, "timestamp_rollback": false}},
        {"arrival": null, "guarded": {"as_of": 5.0, "state": "stale", "current_value": null, "accepted_source_time": 2.0, "accepted_age": 3.0, "recovery_count": 0, "decision": "no_reading"}, "baseline": {"as_of": 5, "current_value": 98, "source_time": 2, "source_age": 3, "timestamp_rollback": false}}
      ],
      summary: {"observations": 6, "baseline_age_invalid": 1, "baseline_timestamp_rollbacks": 1, "guarded_age_invalid": 0}
    },
    "recovery": {
      snapshots: [
        {"arrival": {"source_time": 0, "value": 10}, "guarded": {"as_of": 0.0, "state": "recovering", "current_value": null, "accepted_source_time": 0.0, "accepted_age": 0.0, "recovery_count": 1, "decision": "accepted"}, "baseline": {"as_of": 0, "current_value": 10, "source_time": 0, "source_age": 0, "timestamp_rollback": false}},
        {"arrival": {"source_time": 1, "value": 11}, "guarded": {"as_of": 1.0, "state": "fresh", "current_value": 11.0, "accepted_source_time": 1.0, "accepted_age": 0.0, "recovery_count": 2, "decision": "accepted"}, "baseline": {"as_of": 1, "current_value": 11, "source_time": 1, "source_age": 0, "timestamp_rollback": false}},
        {"arrival": null, "guarded": {"as_of": 4.0, "state": "stale", "current_value": null, "accepted_source_time": 1.0, "accepted_age": 3.0, "recovery_count": 0, "decision": "no_reading"}, "baseline": {"as_of": 4, "current_value": 11, "source_time": 1, "source_age": 3, "timestamp_rollback": false}},
        {"arrival": {"source_time": 4.5, "value": 14}, "guarded": {"as_of": 4.5, "state": "recovering", "current_value": null, "accepted_source_time": 4.5, "accepted_age": 0.0, "recovery_count": 1, "decision": "accepted"}, "baseline": {"as_of": 4.5, "current_value": 14, "source_time": 4.5, "source_age": 0.0, "timestamp_rollback": false}},
        {"arrival": {"source_time": 4.5, "value": 99}, "guarded": {"as_of": 4.6, "state": "recovering", "current_value": null, "accepted_source_time": 4.5, "accepted_age": 0.09999999999999964, "recovery_count": 1, "decision": "duplicate"}, "baseline": {"as_of": 4.6, "current_value": 99, "source_time": 4.5, "source_age": 0.09999999999999964, "timestamp_rollback": false}},
        {"arrival": {"source_time": 4.4, "value": 98}, "guarded": {"as_of": 4.7, "state": "recovering", "current_value": null, "accepted_source_time": 4.5, "accepted_age": 0.20000000000000018, "recovery_count": 1, "decision": "out_of_order"}, "baseline": {"as_of": 4.7, "current_value": 98, "source_time": 4.4, "source_age": 0.2999999999999998, "timestamp_rollback": true}},
        {"arrival": {"source_time": 5, "value": 15}, "guarded": {"as_of": 5.0, "state": "fresh", "current_value": 15.0, "accepted_source_time": 5.0, "accepted_age": 0.0, "recovery_count": 2, "decision": "accepted"}, "baseline": {"as_of": 5, "current_value": 15, "source_time": 5, "source_age": 0, "timestamp_rollback": false}},
        {"arrival": null, "guarded": {"as_of": 8.0, "state": "stale", "current_value": null, "accepted_source_time": 5.0, "accepted_age": 3.0, "recovery_count": 0, "decision": "no_reading"}, "baseline": {"as_of": 8, "current_value": 15, "source_time": 5, "source_age": 3, "timestamp_rollback": false}},
        {"arrival": {"source_time": 8.5, "value": 18}, "guarded": {"as_of": 8.5, "state": "recovering", "current_value": null, "accepted_source_time": 8.5, "accepted_age": 0.0, "recovery_count": 1, "decision": "accepted"}, "baseline": {"as_of": 8.5, "current_value": 18, "source_time": 8.5, "source_age": 0.0, "timestamp_rollback": false}},
        {"arrival": {"source_time": 11.5, "value": 21}, "guarded": {"as_of": 11.5, "state": "recovering", "current_value": null, "accepted_source_time": 11.5, "accepted_age": 0.0, "recovery_count": 1, "decision": "accepted"}, "baseline": {"as_of": 11.5, "current_value": 21, "source_time": 11.5, "source_age": 0.0, "timestamp_rollback": false}},
        {"arrival": {"source_time": 12, "value": 22}, "guarded": {"as_of": 12.0, "state": "fresh", "current_value": 22.0, "accepted_source_time": 12.0, "accepted_age": 0.0, "recovery_count": 2, "decision": "accepted"}, "baseline": {"as_of": 12, "current_value": 22, "source_time": 12, "source_age": 0, "timestamp_rollback": false}}
      ],
      summary: {"observations": 11, "baseline_age_invalid": 2, "baseline_timestamp_rollbacks": 1, "guarded_age_invalid": 0}
    }
  }
};

export const sensorEvidenceTotals = Object.values(sensorEvidence.scenarios).reduce<SensorScenarioSummary>(
  (totals, scenario) => ({
    observations: totals.observations + scenario.summary.observations,
    baseline_age_invalid: totals.baseline_age_invalid + scenario.summary.baseline_age_invalid,
    baseline_timestamp_rollbacks: totals.baseline_timestamp_rollbacks + scenario.summary.baseline_timestamp_rollbacks,
    guarded_age_invalid: totals.guarded_age_invalid + scenario.summary.guarded_age_invalid,
  }),
  { observations: 0, baseline_age_invalid: 0, baseline_timestamp_rollbacks: 0, guarded_age_invalid: 0 },
);
