import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import test from 'node:test';
import { walkthroughMoments, walkthroughSchedule, walkthroughTimeout } from '../src/lib/signal-walkthrough.ts';

test('published walkthrough snapshots match the independent Python model', () => {
  const replay = spawnSync('python3', ['-c', `
import json, sys
from experiments.sensor_freshness.model import FreshnessModel, LatestReadingBaseline, Reading
payload = json.load(sys.stdin)
model = FreshnessModel(payload['timeout'])
baseline = LatestReadingBaseline()
rows = []
for point in payload['schedule']:
    value = point['reading']
    reading = Reading(value['sourceTime'], value['value']) if value else None
    snapshot = model.step(point['now'], reading)
    reference = baseline.step(point['now'], reading)
    rows.append({
        'snapshot': {
            'state': snapshot.state,
            'currentValue': snapshot.current_value,
            'acceptedSourceTime': snapshot.accepted_source_time,
            'acceptedAge': snapshot.accepted_age,
            'recoveryCount': snapshot.recovery_count,
            'decision': snapshot.decision,
        },
        'baselineValue': reference.current_value,
    })
json.dump(rows, sys.stdout)
`], {
    cwd: new URL('..', import.meta.url),
    input: JSON.stringify({ timeout: walkthroughTimeout, schedule: walkthroughSchedule }),
    encoding: 'utf8',
  });
  assert.equal(replay.status, 0, replay.stderr);
  const rows = JSON.parse(replay.stdout) as { snapshot: WalkthroughSnapshot; baselineValue: number }[];
  assert.equal(rows.length, walkthroughSchedule.length);
  for (const [index, point] of walkthroughSchedule.entries()) {
    assert.deepEqual(rows[index]?.snapshot, point.expected, `moment ${point.key ?? 'warmup'}`);
  }
  // Show the policy difference at expiry and on a stale packet, not an invented improvement rate.
  assert.equal(rows[2]?.baselineValue, 21);
  assert.equal(rows[2]?.snapshot.currentValue, null);
  assert.equal(rows[3]?.baselineValue, 22);
  assert.equal(rows[3]?.snapshot.currentValue, null);
});

type WalkthroughSnapshot = typeof walkthroughSchedule[number]['expected'];

test('walkthrough includes the timeout boundary and withholds both recovery candidates and stale data', () => {
  const boundary = walkthroughMoments.find((moment) => moment.key === 'expired');
  assert.equal(boundary?.expected.acceptedAge, walkthroughTimeout);
  assert.equal(boundary?.expected.currentValue, null);
  for (const moment of walkthroughMoments) {
    if (moment.expected.state === 'fresh') {
      assert.ok(moment.expected.acceptedAge < walkthroughTimeout);
      assert.equal(moment.expected.recoveryCount, 2);
    } else {
      assert.equal(moment.expected.currentValue, null);
    }
  }
});
