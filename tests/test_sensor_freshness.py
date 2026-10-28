"""Boundary, failure and bounded invariant checks for synthetic-only readings."""

import itertools
import json
import subprocess
import sys
import unittest
from dataclasses import FrozenInstanceError
from pathlib import Path

from experiments.sensor_freshness import FreshnessModel, LatestReadingBaseline, Reading
from experiments.sensor_freshness.replay import SCENARIOS, replay_all


ROOT = Path(__file__).resolve().parents[1]


class SensorFreshnessTests(unittest.TestCase):
    def fresh_model(self, timeout=3):
        model = FreshnessModel(timeout)
        model.step(0, Reading(0, 10))
        self.assertEqual(model.step(1, Reading(1, 11)).state, "fresh")
        return model

    def test_initial_and_recovery_states_withhold_current_value(self):
        model = FreshnessModel(3)
        initial = model.step(0)
        self.assertEqual((initial.state, initial.current_value, initial.recovery_count),
                         ("stale", None, 0))
        candidate = model.step(0, Reading(0, 0))
        self.assertEqual((candidate.state, candidate.current_value, candidate.recovery_count),
                         ("recovering", None, 1))
        ready = model.step(1, Reading(1, 0))
        self.assertEqual((ready.state, ready.current_value, ready.recovery_count), ("fresh", 0, 2))

    def test_missing_readings_expire_at_exact_source_deadline(self):
        model = self.fresh_model()
        self.assertEqual(model.step(3.999999).current_value, 11)
        expired = model.step(4)
        self.assertEqual((expired.state, expired.current_value, expired.accepted_age),
                         ("stale", None, 3))
        self.assertEqual(model.step(100).state, "stale")

    def test_delayed_arrival_does_not_renew_source_deadline(self):
        model = self.fresh_model()
        delayed = model.step(5, Reading(2, 99))
        self.assertEqual(delayed.decision, "delayed_stale")
        self.assertEqual((delayed.state, delayed.accepted_source_time, delayed.current_value),
                         ("stale", 1, None))

    def test_unexpired_delayed_reading_gets_source_based_expiry(self):
        model = self.fresh_model()
        accepted = model.step(3, Reading(2, 12))
        self.assertEqual((accepted.state, accepted.accepted_age), ("fresh", 1))
        self.assertEqual(model.step(4.999999).current_value, 12)
        self.assertIsNone(model.step(5).current_value)

    def test_duplicate_and_out_of_order_cannot_renew_or_replace(self):
        model = self.fresh_model()
        for now, reading, decision in ((2, Reading(1, 99), "duplicate"),
                                       (3, Reading(0.5, 98), "out_of_order")):
            with self.subTest(decision=decision):
                result = model.step(now, reading)
                self.assertEqual(result.decision, decision)
                self.assertEqual((result.accepted_source_time, result.current_value), (1, 11))
        self.assertEqual(model.step(4).state, "stale")

    def test_recovery_requires_two_distinct_observations(self):
        model = self.fresh_model()
        model.step(4)
        model.step(4.5, Reading(4.5, 14))
        for now, reading in ((4.6, Reading(4.5, 99)), (4.7, Reading(4.4, 98)),
                             (4.8, Reading(5, 97)), (4.9, Reading(4.9, float("nan")))):
            snapshot = model.step(now, reading)
            self.assertEqual((snapshot.state, snapshot.recovery_count, snapshot.current_value),
                             ("recovering", 1, None))
        resumed = model.step(5, Reading(5, 15))
        self.assertEqual((resumed.state, resumed.current_value), ("fresh", 15))

    def test_expiry_before_next_arrival_restarts_recovery(self):
        model = FreshnessModel(3)
        model.step(0, Reading(0, 10))
        expired_candidate = model.step(3, Reading(3, 13))
        self.assertEqual((expired_candidate.state, expired_candidate.recovery_count), ("recovering", 1))
        self.assertEqual(model.step(4, Reading(4, 14)).state, "fresh")

    def test_invalid_arrival_still_allows_time_expiry(self):
        model = self.fresh_model()
        result = model.step(4, Reading(5, 99))
        self.assertEqual((result.decision, result.state, result.recovery_count),
                         ("future_source_time", "stale", 0))
        self.assertIsNone(result.current_value)

    def test_invalid_numbers_and_future_sources_are_rejected(self):
        invalid = (float("nan"), float("inf"), float("-inf"), True, "1", None, 10 ** 1000)
        for field, decision in (("source", "invalid_source_time"), ("value", "invalid_value")):
            for value in invalid:
                with self.subTest(field=field, value=str(value)[:20]):
                    model = self.fresh_model()
                    reading = Reading(value, 99) if field == "source" else Reading(2, value)
                    result = model.step(2, reading)
                    self.assertEqual(result.decision, decision)
                    self.assertEqual((result.current_value, result.accepted_source_time), (11, 1))
        model = self.fresh_model()
        self.assertEqual(model.step(2, Reading(-1, 99)).decision, "invalid_source_time")
        self.assertEqual(model.step(2, Reading(2.001, 99)).decision, "future_source_time")
        self.assertEqual(model.step(2, Reading(2, 12)).current_value, 12)

    def test_invalid_now_is_atomic_and_equal_time_is_allowed(self):
        model = self.fresh_model()
        for now in (-1, 0.999, float("nan"), float("inf"), True, "2", None):
            with self.subTest(now=now):
                with self.assertRaises(ValueError):
                    model.step(now, Reading(100, 99))
                snapshot = model.step(1)
                self.assertEqual((snapshot.current_value, snapshot.accepted_source_time), (11, 1))
        self.assertEqual(model.step(1, Reading(1, 12)).decision, "duplicate")

    def test_timeout_must_be_positive_finite(self):
        for timeout in (0, -1, float("nan"), float("inf"), True, "3", None):
            with self.subTest(timeout=timeout), self.assertRaises(ValueError):
                FreshnessModel(timeout)

    def test_watermark_survives_stale_periods(self):
        model = self.fresh_model()
        model.step(100)
        reset_source = model.step(100, Reading(0, 99))
        self.assertEqual((reset_source.decision, reset_source.accepted_source_time), ("out_of_order", 1))
        self.assertEqual(model.step(100, Reading(100, 20)).state, "recovering")

    def test_snapshots_are_immutable_and_explicitly_as_of_time(self):
        model = self.fresh_model()
        earlier = model.step(2)
        self.assertEqual(earlier.as_of, 2)
        with self.assertRaises(FrozenInstanceError):
            earlier.current_value = 99
        self.assertIsNone(model.step(4).current_value)
        self.assertEqual((earlier.as_of, earlier.state, earlier.current_value), (2, "fresh", 11))

    def test_baseline_exposes_old_and_out_of_order_values(self):
        baseline = LatestReadingBaseline()
        baseline.step(0, Reading(0, 10))
        baseline.step(1, Reading(1, 11))
        old = baseline.step(100)
        self.assertEqual((old.current_value, old.source_age), (11, 99))
        rollback = baseline.step(100, Reading(0, 99))
        self.assertTrue(rollback.timestamp_rollback)
        self.assertEqual(rollback.current_value, 99)

    def test_bounded_event_sequences_preserve_current_and_order_invariants(self):
        # Exhaust all 6^5 schedules: missing/fresh/old/delayed/future/invalid.
        for schedule in itertools.product(range(6), repeat=5):
            model = FreshnessModel(2)
            previous = model.step(0)
            for now, choice in enumerate(schedule):
                readings = (None, Reading(now, now), Reading(0, 99),
                            Reading(max(0, now - 2), 98), Reading(now + 1, 97),
                            Reading(now, float("nan")))
                result = model.step(now, readings[choice])
                if result.current_value is not None:
                    self.assertEqual(result.state, "fresh")
                    self.assertEqual(result.recovery_count, 2)
                    self.assertGreaterEqual(result.accepted_age, 0)
                    self.assertLess(result.accepted_age, 2)
                else:
                    self.assertIn(result.state, ("stale", "recovering"))
                if previous.accepted_source_time is not None:
                    self.assertGreaterEqual(result.accepted_source_time, previous.accepted_source_time)
                if result.decision != "accepted":
                    self.assertEqual(result.accepted_source_time, previous.accepted_source_time)
                    self.assertLessEqual(result.recovery_count, previous.recovery_count)
                previous = result

    def test_replay_compares_failures_and_interrupted_recovery(self):
        results = replay_all()
        self.assertEqual(set(results["scenarios"]), set(SCENARIOS))
        self.assertEqual(results, replay_all())
        for result in results["scenarios"].values():
            self.assertEqual(result["summary"]["guarded_age_invalid"], 0)
        self.assertGreater(results["scenarios"]["dropped"]["summary"]["baseline_age_invalid"], 0)
        self.assertGreater(results["scenarios"]["delayed"]["summary"]["baseline_age_invalid"], 0)
        self.assertGreater(results["scenarios"]["out_of_order"]["summary"]["baseline_timestamp_rollbacks"], 0)
        recovery = results["scenarios"]["recovery"]["snapshots"]
        self.assertEqual([row["guarded"]["state"] for row in recovery],
                         ["recovering", "fresh", "stale", "recovering", "recovering",
                          "recovering", "fresh", "stale", "recovering", "recovering", "fresh"])

    def test_readable_command_emits_deterministic_parseable_actual_json(self):
        command = [sys.executable, "-m", "experiments.sensor_freshness"]
        first = subprocess.run(command, cwd=ROOT, check=True, capture_output=True, text=True, timeout=10)
        second = subprocess.run(command, cwd=ROOT, check=True, capture_output=True, text=True, timeout=10)
        self.assertEqual(first.stdout, second.stdout)
        readable, encoded = first.stdout.split("\nJSON results\n", 1)
        self.assertIn("baseline_age_invalid=", readable)
        self.assertEqual(json.loads(encoded), replay_all())


if __name__ == "__main__":
    unittest.main()
