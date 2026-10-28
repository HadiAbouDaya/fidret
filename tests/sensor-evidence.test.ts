import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import test from 'node:test';
import { sensorEvidence, sensorEvidenceTotals } from '../src/lib/sensor-evidence.ts';

test('onsite method evidence matches every snapshot from the independent Python replay', () => {
  const replay = spawnSync('python3', ['-c',
    'import json; from experiments.sensor_freshness.replay import replay_all; print(json.dumps(replay_all(), allow_nan=False))',
  ], {
    cwd: new URL('..', import.meta.url),
    encoding: 'utf8',
  });
  assert.equal(replay.status, 0, replay.stderr);
  assert.deepEqual(sensorEvidence, JSON.parse(replay.stdout));
});

test('published aggregate counts are supported by the scheduled rows', () => {
  const rows = Object.values(sensorEvidence.scenarios).flatMap((scenario) => scenario.snapshots);
  assert.equal(sensorEvidenceTotals.observations, rows.length);
  assert.equal(sensorEvidenceTotals.baseline_timestamp_rollbacks,
    rows.filter((row) => row.baseline.timestamp_rollback).length);
  const invalidAge = (age: number | null) => age !== null && !(0 <= age && age < sensorEvidence.timeout);
  assert.equal(sensorEvidenceTotals.baseline_age_invalid,
    rows.filter((row) => invalidAge(row.baseline.source_age)).length);
  assert.equal(sensorEvidenceTotals.guarded_age_invalid,
    rows.filter((row) => row.guarded.current_value !== null && invalidAge(row.guarded.accepted_age)).length);
});
