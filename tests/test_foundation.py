"""Exercise the failures the collaboration checks are intended to catch."""

import tempfile
import unittest
from pathlib import Path

from scripts.check_foundation import ADAPTERS, SECTIONS, check_adapters, check_links, check_task


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

    def task(self, status="active", owner="Hadi", register=True):
        content = (
            f"# Example task\n\n- Status: {status}\n- Human owner: {owner}\n"
            "- Agent or harness: Codex\n- Branch: hadi/example\n- Updated: 2026-10-24\n\n"
        )
        content += "\n".join(f"## {section}\n\nConcrete task information.\n" for section in SECTIONS)
        path = self.write("docs/tasks/example.md", content)
        if register:
            self.write("docs/tasks/README.md", "[Example](example.md)\n")
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

    def test_canonical_adapter_pointers(self):
        for name, pointer in ADAPTERS.items():
            self.write(name, pointer + "\n")
        self.assertEqual(check_adapters(self.root), [])
        self.write("CLAUDE.md", "Use a private local policy instead.\n")
        self.assertTrue(any("canonical AGENTS.md" in e for e in check_adapters(self.root)))


if __name__ == "__main__":
    unittest.main()
