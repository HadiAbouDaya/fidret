"""Verify the publication boundary and invalid public asset references."""

import json
import tempfile
import unittest
from pathlib import Path

from scripts.check_website import validate


class WebsiteTests(unittest.TestCase):
    def setUp(self):
        self.directory = tempfile.TemporaryDirectory()
        self.addCleanup(self.directory.cleanup)
        self.root = Path(self.directory.name)
        self.site = self.root / "website"
        self.site.mkdir()
        self.config = {"name": "fidret", "pages_build_output_dir": "./website"}
        self.save_config()
        html = ('<!doctype html><html lang="en"><head><meta name="viewport" content="width=device-width">'
                '<link rel="canonical" href="https://fidret.com/"></head>'
                '<body><h1>Trust earned.</h1><a href="#purpose">Purpose</a><section id="purpose">Fidret</section></body></html>')
        for name in ("index.html", "404.html"):
            (self.site / name).write_text(html)
        (self.site / "favicon.svg").write_text('<svg xmlns="http://www.w3.org/2000/svg"/>')
        (self.site / "sitemap.xml").write_text('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"/>')
        (self.site / "robots.txt").write_text("User-agent: *\nAllow: /\n")
        (self.site / "_headers").write_text("/*\n  X-Content-Type-Options: nosniff\n")

    def save_config(self):
        (self.root / "wrangler.json").write_text(json.dumps(self.config))

    def change_html(self, extra):
        path = self.site / "index.html"
        path.write_text(path.read_text().replace("</body>", extra + "</body>"))

    def test_valid_static_site(self):
        self.assertEqual(validate(self.root), [])

    def test_repository_root_cannot_be_published(self):
        self.config["pages_build_output_dir"] = "."
        self.save_config()
        self.assertTrue(any("Only ./website" in error for error in validate(self.root)))

    def test_script_and_external_resources_are_rejected(self):
        self.change_html('<script src="https://example.com/app.js"></script>')
        errors = validate(self.root)
        self.assertTrue(any("script is outside" in error for error in errors))
        self.assertTrue(any("external resource" in error for error in errors))

    def test_missing_asset_and_anchor_are_rejected(self):
        self.change_html('<a href="missing.html">Missing</a><a href="#missing">Missing anchor</a>')
        errors = validate(self.root)
        self.assertTrue(any("invalid public link" in error for error in errors))
        self.assertTrue(any("missing link anchor" in error for error in errors))

    def test_internal_documents_cannot_be_assets(self):
        (self.site / "AGENTS.md").write_text("Private working instructions")
        self.assertTrue(any("Unexpected public file" in error for error in validate(self.root)))

    def test_worker_script_is_rejected(self):
        self.config["main"] = "worker.js"
        self.save_config()
        self.assertTrue(any("Worker script" in error for error in validate(self.root)))

    def test_missing_self_hosted_font_is_rejected(self):
        (self.site / "style.css").write_text('@font-face { src: url("/fonts/missing.woff2"); }')
        self.assertTrue(any("missing CSS asset" in error for error in validate(self.root)))


if __name__ == "__main__":
    unittest.main()
