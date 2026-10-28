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
        (self.site / "index.html").write_text(html)
        (self.site / "404.html").write_text(html.replace("</head>", '<meta name="robots" content="noindex"></head>'))
        (self.site / "favicon.svg").write_text('<svg xmlns="http://www.w3.org/2000/svg"/>')
        (self.site / "sitemap.xml").write_text('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"/>')
        (self.site / "robots.txt").write_text("User-agent: *\nAllow: /\n")
        self.headers = (
            "/*\n"
            "  Content-Security-Policy: default-src 'none'; style-src 'self'; font-src 'self'; img-src 'self'; "
            "base-uri 'none'; form-action 'none'; frame-ancestors 'none'\n"
            "  Referrer-Policy: strict-origin-when-cross-origin\n"
            "  X-Content-Type-Options: nosniff\n"
            "  Permissions-Policy: camera=(), microphone=(), geolocation=()\n"
        )
        (self.site / "_headers").write_text(self.headers)

    def save_config(self):
        (self.root / "wrangler.json").write_text(json.dumps(self.config))

    def change_html(self, extra):
        path = self.site / "index.html"
        path.write_text(path.read_text().replace("</body>", extra + "</body>"))

    def test_valid_static_site(self):
        self.assertEqual(validate(self.root), [])

    def test_each_security_header_is_required_in_the_global_rule(self):
        path = self.site / "_headers"
        for header in ("Content-Security-Policy", "Referrer-Policy", "X-Content-Type-Options", "Permissions-Policy"):
            with self.subTest(header=header):
                path.write_text("\n".join(line for line in self.headers.splitlines() if not line.strip().startswith(header)))
                self.assertTrue(any(f"missing global {header}" in error for error in validate(self.root)))
        path.write_text("")
        self.assertEqual(sum("missing global" in error for error in validate(self.root)), 4)

    def test_security_headers_cannot_be_narrowed_to_a_different_scope(self):
        path = self.site / "_headers"
        for scope in ("/not-used/*", "/", "https://fidret.com/*"):
            with self.subTest(scope=scope):
                path.write_text(self.headers.replace("/*\n", f"{scope}\n", 1))
                self.assertEqual(sum("only under literal /*" in error for error in validate(self.root)), 4)

    def test_reordered_csp_and_permissions_are_equivalent(self):
        lines = self.headers.splitlines()
        lines[1] = (
            "  content-security-policy: frame-ancestors 'none'; form-action 'none'; base-uri 'none'; "
            "img-src 'self'; font-src 'self'; style-src 'self'; default-src 'none';"
        )
        lines[4] = "  Permissions-Policy: geolocation=( ),\tcamera=(), microphone=()"
        (self.site / "_headers").write_text("\n".join(lines))
        self.assertEqual(validate(self.root), [])

    def test_csp_missing_extra_weakened_or_duplicate_directives_fail(self):
        path = self.site / "_headers"
        for replacement in (
            "default-src *", "default-src 'none' https:", "default-src 'none'; script-src 'none'",
            "default-src 'none'; default-src 'none'", "",
        ):
            with self.subTest(replacement=replacement):
                path.write_text(self.headers.replace("default-src 'none'", replacement))
                self.assertTrue(any("Content-Security-Policy" in error for error in validate(self.root)))

    def test_other_security_policies_cannot_be_weakened(self):
        path = self.site / "_headers"
        for original, replacement in (
            ("nosniff", ""),
            ("strict-origin-when-cross-origin", "unsafe-url"),
            ("camera=()", "camera=*"),
            ("camera=()", "camera=(self)"),
            ("camera=()", "camera=(), camera=()"),
            ("camera=()", "camera=(), usb=()"),
        ):
            with self.subTest(replacement=replacement):
                path.write_text(self.headers.replace(original, replacement))
                self.assertTrue(any("_headers:" in error for error in validate(self.root)))

    def test_permissions_policy_requires_actual_structured_field_grammar(self):
        path = self.site / "_headers"
        for replacement in ("camera =()", "camera= ()", "camera\t=()", "camera=\t()", "camera=(\t)"):
            with self.subTest(replacement=replacement):
                path.write_text(self.headers.replace("camera=()", replacement))
                self.assertTrue(any("Permissions-Policy" in error for error in validate(self.root)))

    def test_non_ascii_and_controls_cannot_be_normalized_into_a_valid_policy(self):
        path = self.site / "_headers"
        for separator in ("\u00a0", "\u2028", "\u0085", "\x0b", "\x0c", "\x00"):
            with self.subTest(separator=repr(separator)):
                path.write_text(self.headers.replace("default-src 'none'", f"default-src{separator}'none'"))
                self.assertTrue(any("printable ASCII" in error for error in validate(self.root)))
        path.write_text(self.headers.replace("\n  Referrer-Policy", "\u2028  Referrer-Policy"))
        self.assertTrue(any("printable ASCII" in error for error in validate(self.root)))

    def test_ascii_tabs_and_crlf_remain_valid_header_syntax(self):
        (self.site / "_headers").write_bytes(self.headers.replace("default-src 'none'", "default-src\t'none'").replace("\n", "\r\n").encode())
        self.assertEqual(validate(self.root), [])

    def test_scoped_removals_and_overrides_cannot_bypass_global_policy(self):
        path = self.site / "_headers"
        for header, value in (
            ("Content-Security-Policy", "default-src *"),
            ("Referrer-Policy", "unsafe-url"),
            ("X-Content-Type-Options", "nosniff"),
            ("Permissions-Policy", "camera=*"),
        ):
            for directive in (f"! {header}", f"{header}: {value}"):
                with self.subTest(directive=directive):
                    path.write_text(self.headers + f"\n/lab/*\n  {directive}\n")
                    errors = validate(self.root)
                    self.assertTrue(any("cannot be removed" in error or "only under literal /*" in error for error in errors))

    def test_duplicate_global_header_definitions_are_rejected(self):
        path = self.site / "_headers"
        path.write_text(self.headers + "  x-content-type-options: nosniff\n")
        self.assertTrue(any("exactly once" in error for error in validate(self.root)))

    def test_protected_headers_cannot_be_unscoped_or_detached_globally(self):
        path = self.site / "_headers"
        for extra in ("Content-Security-Policy: default-src *", "  ! Content-Security-Policy"):
            with self.subTest(extra=extra):
                path.write_text(self.headers + f"\n{extra}\n")
                self.assertTrue(any("_headers:" in error for error in validate(self.root)))

    def test_independent_cache_rules_preserve_the_security_contract(self):
        (self.site / "_headers").write_text(self.headers + (
            "\n# Fingerprinted build assets\n/_astro/*\n"
            "  Cache-Control: public, max-age=31536000, immutable\n"
            "\n/styles.css\n  Cache-Control: public, max-age=0, must-revalidate\n"
            "\n/lab.css\n  Cache-Control: public, max-age=0, must-revalidate\n"
        ))
        self.assertEqual(validate(self.root), [])

    def test_intended_public_html_cannot_suppress_indexing(self):
        for content in ("noindex", "none", "NOINDEX, nofollow", "max-snippet:100 noindex"):
            with self.subTest(content=content):
                path = self.site / "index.html"
                original = path.read_text()
                path.write_text(original.replace("</head>", f'<meta name="ROBOTS" content="{content}"></head>'))
                self.assertTrue(any("must not suppress indexing" in error for error in validate(self.root)))
                path.write_text(original)
        lab = self.site / "lab"
        lab.mkdir()
        (lab / "index.html").write_text((self.site / "404.html").read_text())
        self.assertTrue(any("lab/index.html: intended public page" in error for error in validate(self.root)))

    def test_recognized_crawler_meta_cannot_suppress_public_indexing(self):
        path = self.site / "index.html"
        original = path.read_text()
        for name in ("robots", "googlebot", "GOOGLEBOT-NEWS", "bingbot"):
            for content in ("noindex", "none"):
                with self.subTest(name=name, content=content):
                    path.write_text(original.replace("</head>", f'<meta name="{name}" content="{content}"></head>'))
                    self.assertTrue(any("must not suppress indexing" in error for error in validate(self.root)))

    def test_robots_parameter_values_are_not_whole_page_directives(self):
        path = self.site / "index.html"
        original = path.read_text()
        for content in ("max-image-preview: none", "max-image-preview:none, index", "max-snippet: -1, max-video-preview: 0"):
            with self.subTest(content=content):
                path.write_text(original.replace("</head>", f'<meta name="robots" content="{content}"></head>'))
                self.assertEqual(validate(self.root), [])
        path.write_text(original.replace("</head>", '<meta name="robots" content="max-image-preview: none noindex"></head>'))
        self.assertTrue(any("must not suppress indexing" in error for error in validate(self.root)))

    def test_duplicate_html_attributes_follow_the_browser_first_value(self):
        path = self.site / "index.html"
        original = path.read_text()
        for meta in (
            '<meta name="robots" content="noindex" content="index">',
            '<meta name="robots" name="description" content="noindex">',
        ):
            with self.subTest(meta=meta):
                path.write_text(original.replace("</head>", meta + "</head>"))
                self.assertTrue(any("must not suppress indexing" in error for error in validate(self.root)))
        path.write_text(original.replace("</head>", '<meta name="description" name="robots" content="noindex"></head>'))
        self.assertEqual(validate(self.root), [])
        path.write_text(original.replace("</body>", '<a href="javascript:alert(1)" href="https://example.com/">Unsafe</a></body>'))
        self.assertTrue(any("unsafe external link" in error for error in validate(self.root)))

    def test_x_robots_tag_cannot_suppress_global_or_scoped_public_indexing(self):
        path = self.site / "_headers"
        for scope in ("/*", "/lab/*", "https://:project.pages.dev/*"):
            for value in ("noindex", "none", "googlebot: noindex", "otherbot: none", "max-image-preview: none, noindex"):
                with self.subTest(scope=scope, value=value):
                    path.write_text(self.headers + f"\n{scope}\n  X-Robots-Tag: {value}\n")
                    self.assertTrue(any("X-Robots-Tag must not suppress" in error for error in validate(self.root)))

    def test_x_robots_tag_allows_parameters_and_literal_404_exception(self):
        path = self.site / "_headers"
        for value in ("max-image-preview: none", "googlebot: max-image-preview: none", "nofollow"):
            with self.subTest(value=value):
                path.write_text(self.headers + f"\n/*\n  X-Robots-Tag: {value}\n")
                self.assertEqual(validate(self.root), [])
        path.write_text(self.headers + "\n/404.html\n  X-Robots-Tag: noindex\n")
        self.assertEqual(validate(self.root), [])

    def test_404_noindex_and_public_nofollow_do_not_add_indexing_requirements(self):
        path = self.site / "index.html"
        path.write_text(path.read_text().replace("</head>", '<meta name="robots" content="nofollow"></head>'))
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

    def test_inline_css_cannot_bypass_the_response_policy(self):
        self.change_html('<style>body{display:none}</style><p style="display:none">Hidden</p>')
        errors = validate(self.root)
        self.assertTrue(any("style is outside" in error for error in errors))
        self.assertTrue(any("inline styles" in error for error in errors))

    def test_active_and_credentialed_link_schemes_are_rejected(self):
        for href in ("javascript:alert(1)", "//example.com/", "http://example.com/", "https://user:secret@example.com/"):
            with self.subTest(href=href):
                path = self.site / "404.html"
                original = path.read_text()
                path.write_text(original.replace("</body>", f'<a href="{href}">Unsafe</a></body>'))
                self.assertTrue(any("unsafe external link" in error for error in validate(self.root)))
                path.write_text(original)


if __name__ == "__main__":
    unittest.main()
