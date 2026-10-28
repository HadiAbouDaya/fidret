"""Explicit source-age rules on one synchronized synthetic clock.

Returned snapshots describe only their supplied logical time. Call step() again
before using a value at a later time; no background clock or timer is involved.
"""

from dataclasses import dataclass
from math import isfinite


def _finite_number(value):
    if isinstance(value, bool) or not isinstance(value, (int, float)):
        return None
    try:
        number = float(value)
    except OverflowError:
        return None
    return number if isfinite(number) else None


@dataclass(frozen=True)
class Reading:
    source_time: float
    value: float


@dataclass(frozen=True)
class Snapshot:
    as_of: float
    state: str
    current_value: float | None
    accepted_source_time: float | None
    accepted_age: float | None
    recovery_count: int
    decision: str


class FreshnessModel:
    """Withhold current data until two distinct fresh observations qualify.

    Invalid receiver time raises atomically. Invalid arrivals return a rejection,
    after applying time-based expiry. See README.md for the complete contract.
    """

    def __init__(self, timeout: float):
        timeout = _finite_number(timeout)
        if timeout is None or timeout <= 0:
            raise ValueError("timeout must be a positive finite number")
        self.timeout = timeout
        self._now = None
        self._accepted = None
        self._state = "stale"
        self._recovery_count = 0

    def step(self, now: float, reading: Reading | None = None) -> Snapshot:
        """Advance/check at now, optionally process one arrival, then snapshot."""
        now = _finite_number(now)
        if now is None or now < 0 or (self._now is not None and now < self._now):
            raise ValueError("now must be finite, nonnegative and nondecreasing")
        self._now = now

        if self._accepted is not None and now - self._accepted.source_time >= self.timeout:
            self._state = "stale"
            self._recovery_count = 0

        decision = "no_reading"
        if reading is not None:
            decision, candidate = self._validate(reading, now)
            if candidate is not None:
                self._accepted = candidate
                if self._state != "fresh":
                    self._recovery_count += 1
                    self._state = "fresh" if self._recovery_count == 2 else "recovering"

        accepted_time = self._accepted.source_time if self._accepted is not None else None
        return Snapshot(
            as_of=now,
            state=self._state,
            current_value=self._accepted.value if self._state == "fresh" else None,
            accepted_source_time=accepted_time,
            accepted_age=now - accepted_time if accepted_time is not None else None,
            recovery_count=self._recovery_count,
            decision=decision,
        )

    def _validate(self, reading, now):
        source_time = _finite_number(reading.source_time)
        value = _finite_number(reading.value)
        if source_time is None or source_time < 0:
            return "invalid_source_time", None
        if value is None:
            return "invalid_value", None
        if source_time > now:
            return "future_source_time", None
        if self._accepted is not None:
            if source_time == self._accepted.source_time:
                return "duplicate", None
            if source_time < self._accepted.source_time:
                return "out_of_order", None
        if now - source_time >= self.timeout:
            return "delayed_stale", None
        return "accepted", Reading(source_time, value)


@dataclass(frozen=True)
class BaselineSnapshot:
    as_of: float
    current_value: float | None
    source_time: float | None
    source_age: float | None
    timestamp_rollback: bool


class LatestReadingBaseline:
    """A deliberately naive last-arrival register, with no freshness policy.

    Replay supplies finite times and values. Source-age diagnostics are exposed
    for comparison, but never influence what this baseline offers as current.
    """

    def __init__(self):
        self._latest = None

    def step(self, now: float, reading: Reading | None = None) -> BaselineSnapshot:
        rollback = False
        if reading is not None:
            rollback = self._latest is not None and reading.source_time < self._latest.source_time
            self._latest = reading
        source_time = self._latest.source_time if self._latest is not None else None
        return BaselineSnapshot(
            as_of=now,
            current_value=self._latest.value if self._latest is not None else None,
            source_time=source_time,
            source_age=now - source_time if source_time is not None else None,
            timestamp_rollback=rollback,
        )
