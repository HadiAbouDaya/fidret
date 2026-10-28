"""Fixed synthetic inputs and measured snapshots; no external input or I/O."""

from dataclasses import asdict

from .model import FreshnessModel, LatestReadingBaseline, Reading


TIMEOUT = 3.0

# Tuples are (receiver now, optional source reading). None models no arrival.
SCENARIOS = {
    "normal": (
        (0, Reading(0, 10)), (1, Reading(1, 11)), (2, Reading(2, 12)),
        (3, Reading(3, 13)), (4, Reading(4, 14)),
    ),
    "dropped": (
        (0, Reading(0, 10)), (1, Reading(1, 11)), (2, None),
        (3.999, None), (4, None), (6, None),
    ),
    "delayed": (
        (0, Reading(0, 10)), (1, Reading(1, 11)), (5, Reading(2, 12)),
        (5.5, Reading(2.5, 13)), (6, None),
    ),
    "out_of_order": (
        (0, Reading(0, 10)), (1, Reading(1, 11)), (2, Reading(2, 12)),
        (2.5, Reading(1.5, 99)), (3, Reading(2, 98)), (5, None),
    ),
    "recovery": (
        (0, Reading(0, 10)), (1, Reading(1, 11)), (4, None),
        (4.5, Reading(4.5, 14)), (4.6, Reading(4.5, 99)),
        (4.7, Reading(4.4, 98)), (5, Reading(5, 15)), (8, None),
        (8.5, Reading(8.5, 18)), (11.5, Reading(11.5, 21)), (12, Reading(12, 22)),
    ),
}


def replay(events, timeout=TIMEOUT):
    model = FreshnessModel(timeout)
    baseline = LatestReadingBaseline()
    rows = []
    for now, reading in events:
        guarded = model.step(now, reading)
        simple = baseline.step(now, reading)
        rows.append({
            "arrival": asdict(reading) if reading is not None else None,
            "guarded": asdict(guarded),
            "baseline": asdict(simple),
        })
    return {
        "snapshots": rows,
        "summary": {
            "observations": len(rows),
            "baseline_age_invalid": sum(
                row["baseline"]["source_age"] is not None
                and not 0 <= row["baseline"]["source_age"] < timeout for row in rows
            ),
            "baseline_timestamp_rollbacks": sum(
                row["baseline"]["timestamp_rollback"] for row in rows
            ),
            "guarded_age_invalid": sum(
                row["guarded"]["current_value"] is not None
                and not 0 <= row["guarded"]["accepted_age"] < timeout for row in rows
            ),
        },
    }


def replay_all():
    return {
        "clock": "synchronized synthetic monotonic seconds",
        "timeout": TIMEOUT,
        "freshness": "0 <= source age < timeout",
        "recovery_observations": 2,
        "scenarios": {name: replay(events) for name, events in SCENARIOS.items()},
    }
