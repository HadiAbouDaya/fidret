"""Exercise omission, drift and false-completion failures in the default lifecycle."""
import json
import shutil
import tempfile
import unittest
from pathlib import Path

from scripts.check_aidlc import (
    DEFAULT_DIRECTIVE, ENTRY_LINKS, VENDOR, check_aidlc, check_lifecycle, check_vendor,
    read_manifest, stage_names,
)

SOURCE = Path(__file__).resolve().parents[1]


class AidlcTests(unittest.TestCase):
    def setUp(self):
        temp = tempfile.TemporaryDirectory()
        self.addCleanup(temp.cleanup)
        self.root = Path(temp.name)
        shutil.copytree(SOURCE / VENDOR, self.root / VENDOR)
        self.manifest = read_manifest(self.root)
        for name, links in ENTRY_LINKS.items():
            self.write(name, "\n".join(f"[Workflow]({link})" for link in links))
        agents = self.root / "AGENTS.md"
        agents.write_text(agents.read_text() + "\n" + DEFAULT_DIRECTIVE)
        self.write("docs/collaboration/aidlc-legacy-tasks.json", '[]\n')

    def write(self, name, content):
        path = self.root / name
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(content)
        return path

    def task(self, done=False):
        status = "done" if done else "active"
        disposition = "complete" if done else "planned"
        phase = "complete" if done else "inception"
        result = "pass" if done else "pending"
        return self.write("docs/tasks/2030-01-01-example.md", f"""# Example

- Status: {status}
- AI-DLC: 1

## Acceptance criteria

- A1: The correction meets the specified source contract.
- A2: Failure behavior remains explicit.

## AI-DLC

- Profile: bugfix
- Depth: Minimal
- Rationale: Reproduce and fix a bounded known defect.
- Current phase: {phase}
- Gate basis: Owner request plus standing authorization for checked PRs.
- Operation status: Publish via the existing checked PR path; no manual deployment.

| Stages | Disposition | Evidence or reason |
| --- | --- | --- |
| {', '.join(sorted(stage_names(self.manifest)))} | {disposition} | Source investigation, reproduction and verified result in the linked task evidence. |

## Traceability

| Criterion | Implementation | Verification | Result |
| --- | --- | --- | --- |
| A1 | U1: corrected source module | Reproduction and regression test | {result} |
| A2 | U1: boundary validation | Invalid input rejection fixture | {result} |
""")

    def errors(self, path):
        return check_lifecycle(self.root, path, self.manifest)

    def test_pinned_subset_matches_inventory_and_bytes(self):
        self.assertEqual(check_vendor(self.root, self.manifest), [])
        path = self.root / VENDOR / next(iter(self.manifest["files"]))
        path.write_bytes(path.read_bytes() + b"\nchanged")
        self.assertTrue(any("hash mismatch" in error for error in check_vendor(self.root, self.manifest)))

    def test_missing_and_unlisted_vendor_files_fail(self):
        self.write(str(VENDOR / "surprise.md"), "Unreviewed policy")
        self.assertTrue(any("inventory differs" in e for e in check_vendor(self.root, self.manifest)))
        (self.root / VENDOR / "LICENSE").unlink()
        self.assertTrue(any("LICENSE" in e for e in check_vendor(self.root, self.manifest)))

    def test_manifest_cannot_traverse_or_select_another_repository(self):
        self.manifest["repository"] = "https://example.com/unreviewed"
        self.manifest["files"]["../outside.md"] = "0" * 64
        errors = check_vendor(self.root, self.manifest)
        self.assertTrue(any("provenance" in e for e in errors))
        self.assertTrue(any("invalid vendor path" in e for e in errors))

    def test_new_task_cannot_omit_entire_lifecycle(self):
        path = self.write("docs/tasks/2030-01-01-new.md", "# Task\n- Status: active\n")
        self.assertTrue(any("lifecycle metadata" in e for e in check_aidlc(self.root, [path])))

    def test_historical_records_are_not_retroactive_claims(self):
        path = self.write("docs/tasks/2020-01-01-legacy.md", "# Historical completed task\n")
        self.write("docs/collaboration/aidlc-legacy-tasks.json", json.dumps([path.name]))
        self.assertEqual(check_aidlc(self.root, [path]), [])
        path.write_text(path.read_text() + "- AI-DLC: 1\n")
        self.assertTrue(check_aidlc(self.root, [path]))

    def test_old_date_does_not_bypass_new_task_contract(self):
        path = self.write("docs/tasks/2000-01-01-new.md", "# New file with old date\n")
        self.assertTrue(check_aidlc(self.root, [path]))

    def test_automatic_entry_cannot_be_removed(self):
        for name in ENTRY_LINKS:
            with self.subTest(name=name):
                path = self.root / name
                before = path.read_text()
                path.write_text("Workflow must be invoked explicitly.")
                self.assertTrue(any("default AI-DLC entry link" in e for e in check_aidlc(self.root, [])))
                path.write_text(before)

    def test_links_alone_cannot_make_default_workflow_optional(self):
        path = self.root / "AGENTS.md"
        path.write_text(path.read_text().replace(DEFAULT_DIRECTIVE, "Use AI-DLC only when asked."))
        self.assertTrue(any("mandatory automatic" in e for e in check_aidlc(self.root, [])))

    def test_conflicting_lifecycle_metadata_fails(self):
        path = self.task()
        path.write_text(path.read_text().replace("- Profile: bugfix", "- Profile: feature\n- Profile: bugfix"))
        self.assertTrue(any("duplicate AI-DLC metadata" in e for e in self.errors(path)))

    def test_reference_cannot_be_removed_together_with_its_hash(self):
        name = "core/memory/phases/inception.md"
        del self.manifest["files"][name]
        (self.root / VENDOR / name).unlink()
        self.assertTrue(any("required reference" in e for e in check_vendor(self.root, self.manifest)))

    def test_active_and_complete_records(self):
        self.assertEqual(self.errors(self.task()), [])
        self.assertEqual(self.errors(self.task(done=True)), [])

    def test_missing_duplicate_and_unknown_stages_fail(self):
        for before, after in (("build-and-test, ", ""),
                              ("build-and-test, ", "build-and-test, build-and-test, "),
                              ("build-and-test, ", "imaginary-stage, ")):
            with self.subTest(after=after):
                path = self.task()
                path.write_text(path.read_text().replace(before, after))
                self.assertTrue(any("every AI-DLC stage exactly once" in e for e in self.errors(path)))

    def test_no_stage_can_silently_lose_reason_or_result(self):
        path = self.task()
        path.write_text(path.read_text().replace("| planned | Source investigation, reproduction and verified result in the linked task evidence. |", "| skipped | |"))
        self.assertTrue(any("missing evidence/reason" in e for e in self.errors(path)))

    def test_done_record_rejects_unfinished_stages_and_unpassed_evidence(self):
        for before, after, expected in (("| complete |", "| deferred |", "unfinished"),
                                        ("| pass |", "| unverified |", "unpassed"),
                                        ("Current phase: complete", "Current phase: operation", "complete phase")):
            with self.subTest(after=after):
                path = self.task(done=True)
                path.write_text(path.read_text().replace(before, after))
                self.assertTrue(any(expected in e for e in self.errors(path)))

    def test_acceptance_cannot_be_uncovered_or_duplicate(self):
        for before, after in (("- A2:", "- A3:"), ("- A2:", "- A1:"),
                              ("- A2:", "- Missing ID:"), ("| A2 |", "| A1 |")):
            with self.subTest(after=after):
                path = self.task()
                path.write_text(path.read_text().replace(before, after))
                self.assertTrue(self.errors(path))

    def test_acceptance_requires_implementation_and_verification(self):
        path = self.task()
        path.write_text(path.read_text().replace("U1: boundary validation", ""))
        self.assertTrue(any("traceability requires" in e for e in self.errors(path)))

    def test_profile_authority_and_operation_are_explicit(self):
        for before, after in (("Profile: bugfix", "Profile: invented"),
                              ("Depth: Minimal", "Depth: no-checks"),
                              ("- Gate basis: Owner request plus standing authorization for checked PRs.", ""),
                              ("- Operation status: Publish via the existing checked PR path; no manual deployment.", "")):
            with self.subTest(after=after):
                path = self.task()
                path.write_text(path.read_text().replace(before, after))
                self.assertTrue(self.errors(path))

    def test_missing_configuration_fails_closed(self):
        (self.root / VENDOR / "upstream.json").unlink()
        self.assertTrue(any("invalid or missing" in e for e in check_aidlc(self.root, [])))


if __name__ == "__main__":
    unittest.main()
