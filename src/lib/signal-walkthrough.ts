/** Fixed explanatory snapshots, checked against the Python experiment in tests.
 * These seconds share one invented synchronized clock. Nothing runs in-browser.
 */
export interface WalkthroughPoint {
  key: string | null;
  now: number;
  reading: { sourceTime: number; value: number } | null;
  expected: {
    state: 'stale' | 'recovering' | 'fresh';
    currentValue: number | null;
    acceptedSourceTime: number;
    acceptedAge: number;
    recoveryCount: number;
    decision: 'accepted' | 'no_reading' | 'delayed_stale';
  };
}

export const walkthroughTimeout = 3;

export const walkthroughSchedule: readonly WalkthroughPoint[] = [
  {
    key: null, now: 0, reading: { sourceTime: 0, value: 20 },
    expected: { state: 'recovering', currentValue: null, acceptedSourceTime: 0, acceptedAge: 0, recoveryCount: 1, decision: 'accepted' },
  },
  {
    key: 'fresh', now: 1, reading: { sourceTime: 1, value: 21 },
    expected: { state: 'fresh', currentValue: 21, acceptedSourceTime: 1, acceptedAge: 0, recoveryCount: 2, decision: 'accepted' },
  },
  {
    key: 'expired', now: 4, reading: null,
    expected: { state: 'stale', currentValue: null, acceptedSourceTime: 1, acceptedAge: 3, recoveryCount: 0, decision: 'no_reading' },
  },
  {
    key: 'delayed', now: 5, reading: { sourceTime: 2, value: 22 },
    expected: { state: 'stale', currentValue: null, acceptedSourceTime: 1, acceptedAge: 4, recoveryCount: 0, decision: 'delayed_stale' },
  },
  {
    key: 'recovering', now: 6, reading: { sourceTime: 6, value: 23 },
    expected: { state: 'recovering', currentValue: null, acceptedSourceTime: 6, acceptedAge: 0, recoveryCount: 1, decision: 'accepted' },
  },
  {
    key: 'recovered', now: 7, reading: { sourceTime: 7, value: 24 },
    expected: { state: 'fresh', currentValue: 24, acceptedSourceTime: 7, acceptedAge: 0, recoveryCount: 2, decision: 'accepted' },
  },
];

const narrative: Record<string, { label: string; title: string; explanation: string; decision: string }> = {
  fresh: {
    label: 'Fresh', title: 'A reading we can use.',
    explanation: 'Two distinct observations have arrived, at 0 s and 1 s. Both qualify. The model now exposes the latest value.',
    decision: 'Latest observation accepted',
  },
  expired: {
    label: 'Expired', title: 'Silence changes the answer.',
    explanation: 'No new reading arrives. The accepted observation reaches its three-second deadline. At that exact boundary, the model withholds the value.',
    decision: 'No arrival; previous observation expired',
  },
  delayed: {
    label: 'Too late', title: 'Arrival does not reset age.',
    explanation: 'A packet arrives at 5 s, but it was observed at 2 s. It is already three seconds old, so it cannot renew freshness. The last accepted timestamp remains 1 s.',
    decision: 'Delayed observation rejected',
  },
  recovering: {
    label: 'First return', title: 'One return is a candidate.',
    explanation: 'A fresh observation arrives at 6 s. Recovery begins, but the model still withholds the value until a second, strictly newer observation qualifies.',
    decision: 'First recovery observation accepted',
  },
  recovered: {
    label: 'Recovered', title: 'A second observation completes recovery.',
    explanation: 'The observation at 7 s is fresh and strictly newer than the candidate at 6 s. The model exposes the value again, as of this moment.',
    decision: 'Second recovery observation accepted',
  },
};

export const walkthroughMoments = walkthroughSchedule.flatMap((point) => {
  if (!point.key) return [];
  const copy = narrative[point.key];
  if (!copy) throw new Error(`Missing walkthrough explanation for ${point.key}`);
  return [{ ...point, key: point.key, ...copy }];
});
