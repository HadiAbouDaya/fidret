"""Exercise draft boundaries, explicit credit, safe rendering, and reproducible publishing."""

import json
import shutil
import tempfile
import unittest
from datetime import timedelta
from pathlib import Path

from scripts.lab import ROOT, author_registry, build, new_piece, today_utc, validate_piece


class LabTests(unittest.TestCase):
    def setUp(self):
        self.directory = tempfile.TemporaryDirectory()
        self.addCleanup(self.directory.cleanup)
        self.root = Path(self.directory.name)
        (self.root / "lab").mkdir()
        shutil.copy(ROOT / "lab/authors.json", self.root / "lab/authors.json")
        shutil.copy(ROOT / "lab/TEMPLATE.json", self.root / "lab/TEMPLATE.json")
        shutil.copytree(ROOT / "templates", self.root / "templates")
        (self.root / "website").mkdir()
        self.authors = author_registry(self.root)

    def piece(self, status="draft", authors=None):
        path = new_piece(self.root, "fixture-note", "Fixture note", "architecture", authors or ["hadi"])
        data = json.loads(path.read_text())
        data.update(
            status=status,
            published=today_utc().isoformat() if status == "published" else None,
            summary="A conceptual note for the test fixture.",
            question="What would a bounded system design need to consider?",
            approach=["This is proposed reasoning, not an executed experiment."],
            takeaways=["A useful architecture can expose a tradeoff before implementation."],
            limits=["The proposal has not been tested on hardware."],
            next_steps=["Explore one small implementation."],
        )
        path.write_text(json.dumps(data))
        return path, data

    def test_incomplete_draft_stays_off_website_and_sitemap(self):
        new_piece(self.root, "unfinished", "Unfinished draft", "simulation", ["hadi"])
        self.assertEqual(build(self.root), (0, 1))
        index = (self.root / "website/lab/index.html").read_text()
        self.assertNotIn("Unfinished draft", index)
        self.assertFalse((self.root / "website/lab/unfinished").exists())
        self.assertNotIn("unfinished", (self.root / "website/sitemap.xml").read_text())

    def test_conceptual_note_publishes_without_metrics_or_client_evidence(self):
        self.piece(status="published")
        self.assertEqual(build(self.root), (1, 0))
        article = (self.root / "website/lab/fixture-note/index.html").read_text()
        self.assertIn("Architecture note", article)
        self.assertIn("not an executed experiment", article)
        self.assertIn("Hadi Abou Daya", article)
        self.assertNotIn("Elie Azoury", article)
        self.assertIn("https://fidret.com/lab/fixture-note/", article)

    def test_joint_authors_are_displayed_in_declared_order(self):
        self.piece(status="published", authors=["elie", "hadi"])
        build(self.root)
        article = (self.root / "website/lab/fixture-note/index.html").read_text()
        self.assertLess(article.index("Elie Azoury"), article.index("Hadi Abou Daya"))

    def test_unknown_or_duplicate_authors_are_rejected(self):
        for authors in (["unknown"], ["hadi", "hadi"]):
            with self.subTest(authors=authors), self.assertRaises(ValueError):
                new_piece(self.root, "invalid-credit", "Invalid credit", "prototype", authors)

    def test_creation_preserves_existing_piece_and_rejects_path_traversal(self):
        path = new_piece(self.root, "existing", "Original", "prototype", ["elie"])
        original = path.read_bytes()
        with self.assertRaises(ValueError):
            new_piece(self.root, "existing", "Overwrite", "prototype", ["hadi"])
        self.assertEqual(path.read_bytes(), original)
        with self.assertRaises(ValueError):
            new_piece(self.root, "../outside", "Unsafe", "prototype", ["hadi"])

    def test_blank_narrative_cannot_be_published(self):
        path = new_piece(self.root, "empty", "Empty", "technical-note", ["hadi"])
        data = json.loads(path.read_text())
        data.update(status="published", published=today_utc().isoformat(), summary="   ")
        path.write_text(json.dumps(data))
        with self.assertRaisesRegex(ValueError, "complete summary"):
            build(self.root)

    def test_date_order_and_future_publication_are_rejected(self):
        _, data = self.piece(status="published")
        for change in ({"updated": "2000-01-01"}, {"published": (today_utc() + timedelta(days=1)).isoformat()}):
            with self.subTest(change=change), self.assertRaises(ValueError):
                validate_piece(data | change, "fixture-note", self.authors, self.root)

    def test_stale_output_is_detected(self):
        path, data = self.piece(status="published")
        build(self.root)
        self.assertEqual(build(self.root, check=True), (1, 0))
        data["title"] = "Changed title"
        path.write_text(json.dumps(data))
        with self.assertRaisesRegex(ValueError, "stale"):
            build(self.root, check=True)
        build(self.root)
        self.assertEqual(build(self.root, check=True), (1, 0))

    def test_withdrawn_piece_is_removed_from_pages_and_sitemap(self):
        path, data = self.piece(status="published")
        build(self.root)
        data["status"] = "draft"
        path.write_text(json.dumps(data))
        build(self.root)
        self.assertFalse((self.root / "website/lab/fixture-note/index.html").exists())
        self.assertNotIn("fixture-note", (self.root / "website/sitemap.xml").read_text())

    def test_unmanaged_page_is_preserved(self):
        folder = self.root / "website/lab"
        folder.mkdir()
        path = folder / "index.html"
        path.write_text("A contributor's unrelated draft")
        with self.assertRaisesRegex(ValueError, "unmanaged"):
            build(self.root)
        self.assertEqual(path.read_text(), "A contributor's unrelated draft")

    def test_html_and_code_are_escaped(self):
        path, data = self.piece(status="published")
        data["question"] = '<script>alert("test")</script>'
        data["snippets"] = [{"title": "Code excerpt", "language": "html", "code": "<script>example</script>"}]
        path.write_text(json.dumps(data))
        build(self.root)
        article = (self.root / "website/lab/fixture-note/index.html").read_text()
        self.assertNotIn("<script>", article)
        self.assertIn("&lt;script&gt;", article)

    def test_unsafe_links_and_media_outside_public_lab_assets_are_rejected(self):
        _, data = self.piece(status="published")
        data["resources"] = [{"label": "Unsafe", "url": "javascript:alert(1)"}]
        with self.assertRaisesRegex(ValueError, "HTTPS or local URL"):
            validate_piece(data, "fixture-note", self.authors, self.root)
        data["resources"] = []
        data["media"] = [{"src": "/../secret.svg", "alt": "Example", "caption": "Proposed diagram", "width": 100, "height": 100}]
        with self.assertRaisesRegex(ValueError, "existing image"):
            validate_piece(data, "fixture-note", self.authors, self.root)

    def test_sitemap_preserves_unrelated_urls(self):
        sitemap = self.root / "website/sitemap.xml"
        sitemap.write_text('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
                           '<url><loc>https://fidret.com/</loc></url>'
                           '<url><loc>https://fidret.com/labour/</loc></url></urlset>')
        build(self.root)
        self.assertIn("https://fidret.com/labour/", sitemap.read_text())
        self.assertEqual(build(self.root, check=True), (0, 0))

    def test_symlinked_piece_directory_cannot_write_outside_checkout(self):
        with tempfile.TemporaryDirectory() as outside:
            (self.root / "lab/pieces").symlink_to(outside, target_is_directory=True)
            with self.assertRaisesRegex(ValueError, "symlinks"):
                new_piece(self.root, "escape", "Escape", "prototype", ["hadi"])
            self.assertFalse((Path(outside) / "escape.json").exists())

    def test_symlinked_output_directory_is_rejected(self):
        with tempfile.TemporaryDirectory() as outside:
            (self.root / "website/lab").symlink_to(outside, target_is_directory=True)
            with self.assertRaisesRegex(ValueError, "symlinks"):
                build(self.root)
            self.assertFalse((Path(outside) / "index.html").exists())

    def test_symlinked_output_file_is_preserved(self):
        build(self.root)
        with tempfile.TemporaryDirectory() as outside:
            target = Path(outside) / "keep.html"
            target.write_text("Preserve this file")
            output = self.root / "website/lab/index.html"
            output.unlink()
            output.symlink_to(target)
            with self.assertRaisesRegex(ValueError, "symlinks"):
                build(self.root)
            self.assertEqual(target.read_text(), "Preserve this file")


if __name__ == "__main__":
    unittest.main()
