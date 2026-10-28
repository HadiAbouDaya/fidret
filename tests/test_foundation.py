"""Exercise the failures the collaboration checks are intended to catch."""

import tempfile
import unittest
from pathlib import Path

from scripts.check_foundation import (
    ADAPTERS, DECISION_SECTIONS, HANDOFF_FIELDS, SECTIONS,
    check_adapters, check_decision, check_decisions, check_links, check_task,
)


class FoundationTests(unittest.TestCase):
    def setUp(self):
        self.directory = tempfile.TemporaryDirectory()
        self.addCleanup(self.directory.cleanup)
        self.root = Path(self.directory.name)

    def write(self, name, content):
        path = self.root / name
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(content, encoding="utf-8")
        return path

    def task(self, status="active", owner="Hadi", register=True, verification="passed"):
        content = (
            f"# Example task\n\n- Status: {status}\n- Human owner: {owner}\n"
            "- Agent or harness: Codex\n- Branch: hadi/example\n- Updated: 2026-10-24\n"
            f"- Verification status: {verification}\n\n"
        )
        for section in SECTIONS:
            body = "Concrete task information."
            if section == "Handoff":
                body = "\n".join(f"- {field}: Concrete checkpoint information." for field in HANDOFF_FIELDS)
            content += f"## {section}\n\n{body}\n\n"
        path = self.write("docs/tasks/example.md", content)
        if register:
            self.write("docs/tasks/README.md", "[Example](example.md)\n")
        return path

    def decision(self, number="0001", slug="example", status="proposed", basis=None,
                 register=True, superseded_by=None):
        content = (
            f"# Example decision\n\n- Status: {status}\n- Date: 2026-10-24\n"
            "- Human decision owner: Hadi\n"
        )
        if basis is not None:
            content += f"- Basis: {basis}\n"
        if superseded_by is not None:
            content += f"- Superseded by: {superseded_by}\n"
        content += "\n" + "\n".join(
            f"## {section}\n\nConcrete decision information.\n" for section in DECISION_SECTIONS)
        path = self.write(f"docs/decisions/{number}-{slug}.md", content)
        if register:
            index = self.root / "docs/decisions/README.md"
            text = index.read_text() if index.is_file() else "| Record | Status | Subject |\n"
            self.write("docs/decisions/README.md",
                       text + f"| [{number}]({path.name}) | {status} | Example |\n")
        return path

    def test_relative_encoded_and_external_links(self):
        self.write("docs/with space.md", "# Target\n")
        path = self.write("README.md", "[Local](docs/with%20space.md#heading)\n"
                          "[Web](https://example.com/unknown)\n[Anchor](#heading)\n")
        self.assertEqual(check_links(self.root, path), [])

    def test_broken_internal_link(self):
        path = self.write("README.md", "[Missing](missing.md)\n")
        self.assertIn("missing link target", check_links(self.root, path)[0])

    def test_link_outside_repository(self):
        path = self.write("README.md", "[Outside](../private.md)\n")
        self.assertIn("leaves repository", check_links(self.root, path)[0])

    def test_examples_are_not_live_links(self):
        path = self.write("README.md", "```text\n[Example](not-real.md)\n```\n")
        self.assertEqual(check_links(self.root, path), [])

    def test_complete_registered_task(self):
        self.assertEqual(check_task(self.root, self.task()), [])

    def test_unregistered_task(self):
        errors = check_task(self.root, self.task(register=False))
        self.assertTrue(any("must be linked" in error for error in errors))

    def test_invalid_status(self):
        self.assertTrue(any("Status" in e for e in check_task(self.root, self.task(status="unknown"))))

    def test_active_task_requires_human_owner(self):
        self.assertTrue(any("must be assigned" in e
                            for e in check_task(self.root, self.task(owner="Unassigned"))))

    def test_planned_task_can_be_unassigned(self):
        self.assertEqual(check_task(self.root, self.task(status="planned", owner="Unassigned")), [])

    def test_missing_handoff_and_invalid_date(self):
        path = self.task()
        text = path.read_text().split("## Handoff")[0].replace("2026-10-24", "not-a-date")
        path.write_text(text)
        errors = check_task(self.root, path)
        self.assertTrue(any("Handoff" in e for e in errors))
        self.assertTrue(any("ISO date" in e for e in errors))

    def test_empty_verification_section(self):
        path = self.task()
        path.write_text(path.read_text().replace(
            "## Verification\n\nConcrete task information.", "## Verification\n"))
        self.assertTrue(any("Verification" in e for e in check_task(self.root, path)))

    def test_done_task_requires_passed_verification(self):
        for verification in ("partial", "not-run"):
            with self.subTest(verification=verification):
                errors = check_task(self.root, self.task(status="done", verification=verification))
                self.assertTrue(any("done work requires" in error for error in errors))
        self.assertEqual(check_task(self.root, self.task(status="done")), [])

    def test_task_verification_status_must_be_explicit(self):
        errors = check_task(self.root, self.task(verification="unknown"))
        self.assertTrue(any("Verification status" in error for error in errors))

    def test_handoff_requires_each_checkpoint_field(self):
        for field in HANDOFF_FIELDS:
            with self.subTest(field=field):
                path = self.task()
                path.write_text(path.read_text().replace(
                    f"- {field}: Concrete checkpoint information.", f"- {field}:"))
                self.assertTrue(any(f"Handoff requires nonempty {field}" in error
                                    for error in check_task(self.root, path)))

    def test_duplicate_top_metadata_is_rejected(self):
        path = self.task()
        path.write_text(path.read_text().replace(
            "- Status: active", "- Status: planned\n- Status: active"))
        self.assertTrue(any("duplicate metadata field: Status" in error
                            for error in check_task(self.root, path)))

    def test_narrative_labels_do_not_replace_metadata(self):
        path = self.task()
        path.write_text(path.read_text().replace(
            "## Scope\n", "## Scope\n\n- Status: unknown\n"))
        self.assertEqual(check_task(self.root, path), [])

    def test_dates_require_dashed_calendar_format(self):
        for value in ("20261024", "2026-W43-6", "2026-02-30"):
            with self.subTest(value=value):
                path = self.task()
                path.write_text(path.read_text().replace("2026-10-24", value))
                self.assertTrue(any("ISO date" in error for error in check_task(self.root, path)))

    def test_template_can_keep_assignment_and_date_guidance(self):
        source = self.task(status="planned", owner="Unassigned", verification="not-run")
        path = self.write("docs/tasks/TEMPLATE.md", source.read_text().replace(
            "2026-10-24", "YYYY-MM-DD"))
        self.assertEqual(check_task(self.root, path), [])

    def test_proposed_decision_does_not_require_acceptance_basis(self):
        self.assertEqual(check_decision(self.root, self.decision()), [])

    def test_accepted_and_active_decisions_require_recorded_basis(self):
        for number, status in (("0001", "accepted"), ("0002", "active")):
            with self.subTest(status=status):
                path = self.decision(number=number, status=status)
                self.assertTrue(any("requires a recorded Basis" in error
                                    for error in check_decision(self.root, path)))
                path.write_text(path.read_text().replace(
                    "- Date:", "- Basis: Authorized task, recorded on 2026-10-24.\n- Date:"))
                self.assertEqual(check_decision(self.root, path), [])

    def test_unregistered_decision_is_rejected(self):
        path = self.decision(register=False)
        self.assertTrue(any("must be linked" in error for error in check_decision(self.root, path)))

    def test_decision_register_must_match_record_status_once(self):
        path = self.decision()
        index = self.root / "docs/decisions/README.md"
        original = index.read_text()
        index.write_text(original.replace("| proposed |", "| accepted |"))
        self.assertTrue(any("matching Status" in error for error in check_decision(self.root, path)))
        index.write_text(original + f"| [0001]({path.name}) | proposed | Duplicate |\n")
        self.assertTrue(any("one entry" in error for error in check_decision(self.root, path)))

    def test_decision_header_and_sections_are_validated(self):
        mutations = (
            ("- Status: proposed", "- Status: unknown", "decision Status"),
            ("- Date: 2026-10-24", "- Date: 20261024", "ISO date"),
            ("- Human decision owner: Hadi", "- Human decision owner: Unassigned", "must be assigned"),
            ("- Status: proposed", "- Status: proposed\n- Status: proposed", "duplicate metadata"),
            ("## Review\n\nConcrete decision information.", "## Review\n", "Review section"),
        )
        original = self.decision().read_text()
        path = self.root / "docs/decisions/0001-example.md"
        for before, after, expected in mutations:
            with self.subTest(expected=expected):
                path.write_text(original.replace(before, after))
                self.assertTrue(any(expected in error for error in check_decision(self.root, path)))

    def test_duplicate_decision_numbers_are_rejected(self):
        self.decision()
        self.decision(slug="another")
        self.assertTrue(any("duplicate decision number 0001" in error
                            for error in check_decisions(self.root)))

    def test_only_index_and_template_can_be_unnumbered(self):
        self.write("docs/decisions/README.md", "# Decision index\n")
        self.write("docs/decisions/TEMPLATE.md", "# Decision template\n")
        self.assertEqual(check_decisions(self.root), [])
        for filename in ("astro.md", "006-proposal.md", "0006.md"):
            with self.subTest(filename=filename):
                path = self.write(f"docs/decisions/{filename}", "# Unregistered proposal\n")
                self.assertTrue(any("decision filename" in error
                                    for error in check_decisions(self.root)))
                path.unlink()

    def test_register_cannot_point_to_nondecision_or_missing_file(self):
        self.write("docs/decisions/TEMPLATE.md", "# Template\n")
        for filename in ("README.md", "TEMPLATE.md", "0001-missing.md"):
            with self.subTest(filename=filename):
                self.write("docs/decisions/README.md",
                           f"| [0001]({filename}) | proposed | Invalid target |\n")
                self.assertTrue(any("register target must be an existing numbered decision" in error
                                    for error in check_decisions(self.root)))

    def test_duplicate_register_rows_are_rejected(self):
        path = self.decision()
        index = self.root / "docs/decisions/README.md"
        index.write_text(index.read_text() + f"| [0001]({path.name}) | proposed | Duplicate |\n")
        self.assertTrue(any("duplicate decision register entry" in error
                            for error in check_decisions(self.root)))

    def test_superseded_decision_requires_valid_successor(self):
        self.decision(number="0002", status="active", basis="Authorized implementation.")
        path = self.decision(status="superseded", superseded_by="[0002](0002-example.md)")
        self.assertEqual(check_decisions(self.root), [])
        original = path.read_text()
        for value in ("", "[0001](0001-example.md)", "[0003](missing.md)",
                      "[0003](0002-example.md)", "[0002](README.md)"):
            with self.subTest(value=value):
                path.write_text(original.replace("[0002](0002-example.md)", value))
                self.assertTrue(any("requires Superseded by" in error
                                    for error in check_decision(self.root, path)))

    def test_supersession_cannot_leave_decision_directory(self):
        self.write("0002-outside.md", "# Outside\n")
        path = self.decision(status="superseded", superseded_by="[0002](../../0002-outside.md)")
        self.assertTrue(any("requires Superseded by" in error
                            for error in check_decision(self.root, path)))

    def test_supersession_cycle_is_rejected(self):
        self.decision(status="superseded", superseded_by="[0002](0002-example.md)")
        self.decision(number="0002", status="superseded", superseded_by="[0001](0001-example.md)")
        self.assertTrue(any("supersession cycle" in error for error in check_decisions(self.root)))

    def test_supersession_target_must_have_taken_effect(self):
        self.decision(number="0002", status="proposed")
        self.decision(number="0003", status="rejected")
        path = self.decision(status="superseded", superseded_by="[0002](0002-example.md)")
        original = path.read_text()
        for number in ("0002", "0003"):
            with self.subTest(number=number):
                path.write_text(original.replace("[0002](0002-example.md)",
                                                f"[{number}]({number}-example.md)"))
                self.assertTrue(any("requires Superseded by" in error
                                    for error in check_decision(self.root, path)))

    def test_valid_multihop_supersession_chain(self):
        self.decision(status="superseded", superseded_by="[0002](0002-example.md)")
        self.decision(number="0002", status="superseded", superseded_by="[0003](0003-example.md)")
        self.decision(number="0003", status="accepted", basis="Accepted by the named owner.")
        self.assertEqual(check_decisions(self.root), [])

    def test_canonical_adapter_pointers(self):
        for name, pointer in ADAPTERS.items():
            self.write(name, pointer + "\n")
        self.assertEqual(check_adapters(self.root), [])
        self.write("CLAUDE.md", "Use a private local policy instead.\n")
        self.assertTrue(any("canonical AGENTS.md" in e for e in check_adapters(self.root)))


if __name__ == "__main__":
    unittest.main()
