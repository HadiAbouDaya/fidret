"""Print readable replay evidence and the same observations as JSON."""

import json

from .replay import replay_all


def main():
    results = replay_all()
    print("Synthetic sensor freshness replay (timeout=3 seconds; fresh age < 3)")
    print("Values describe the supplied logical time only; no physical validation.")
    for name, result in results["scenarios"].items():
        print(f"\n{name}")
        print("  as_of  decision             state       current  baseline  baseline_age")
        for row in result["snapshots"]:
            guarded, baseline = row["guarded"], row["baseline"]
            age = f"{baseline['source_age']:g}" if baseline["source_age"] is not None else "None"
            print(
                f"  {guarded['as_of']:>5g}  {guarded['decision']:<20} "
                f"{guarded['state']:<10}  {str(guarded['current_value']):>7}  "
                f"{str(baseline['current_value']):>8}  {age}"
            )
        print("  counts: " + ", ".join(f"{key}={value}" for key, value in result["summary"].items()))
    print("\nJSON results")
    print(json.dumps(results, indent=2, sort_keys=True, allow_nan=False))


if __name__ == "__main__":
    main()
