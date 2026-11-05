"""Verify the publication boundary and invalid public asset references."""

import json
from html import escape
import tempfile
import unittest
from pathlib import Path

from scripts.check_website import PUBLIC_MARKDOWN_DOWNLOADS, check_download_headers, validate


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
                '<body><main id="main" tabindex="-1"><h1>Trust earned.</h1><a href="#purpose">Purpose</a><section id="purpose">Fidret</section></main></body></html>')
        (self.site / "index.html").write_text(html)
        (self.site / "404.html").write_text(html.replace("</head>", '<meta name="robots" content="noindex"></head>'))
        (self.site / "favicon.svg").write_text('<svg xmlns="http://www.w3.org/2000/svg"/>')
        (self.site / "sitemap.xml").write_text('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"/>')
        (self.site / "robots.txt").write_text("User-agent: *\nAllow: /\n")
        self.headers = (
            "/*\n"
            "  Content-Security-Policy: default-src 'none'; script-src 'self'; style-src 'self'; font-src 'self'; img-src 'self'; "
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

    @staticmethod
    def download_headers():
        return "".join(f"\n/{path}\n  Content-Type: text/markdown; charset=utf-8\n"
                       "  Cache-Control: public, max-age=0, must-revalidate\n"
                       for path in sorted(PUBLIC_MARKDOWN_DOWNLOADS))

    def test_all_curated_downloads_have_explicit_host_mime_and_revalidation(self):
        actual = (Path(__file__).resolve().parents[1] / "public/_headers").read_text()
        self.assertEqual(check_download_headers(actual, PUBLIC_MARKDOWN_DOWNLOADS), [])
        for path in PUBLIC_MARKDOWN_DOWNLOADS:
            download = self.site / path
            download.parent.mkdir(parents=True, exist_ok=True)
            download.write_text("# Editable brief\n")
        headers = self.headers + self.download_headers()
        target = self.site / "_headers"
        target.write_text(headers)
        self.assertEqual(validate(self.root), [])
        for path in PUBLIC_MARKDOWN_DOWNLOADS:
            block = (f"/{path}\n  Content-Type: text/markdown; charset=utf-8\n"
                     "  Cache-Control: public, max-age=0, must-revalidate\n")
            for replacement in ("", block.replace('utf-8', 'iso-8859-1'),
                                block.replace('text/markdown', 'text/plain'),
                                block.replace('public, max-age=0, must-revalidate', 'public, max-age=3600'),
                                block.replace(f'/{path}', '/lab/*')):
                with self.subTest(path=path, replacement=replacement):
                    target.write_text(headers.replace(block, replacement))
                    self.assertTrue(any(f"/{path} needs exactly one literal" in e for e in validate(self.root)))
        for scope in ('/*', '/lab/*', 'https://fidret.com/lab/*'):
            for directive in ('Content-Type: text/plain', '! Content-Type',
                              'Cache-Control: public, max-age=3600', '! Cache-Control'):
                with self.subTest(scope=scope, directive=directive):
                    target.write_text(headers + f'\n{scope}\n  {directive}\n')
                    self.assertTrue(any('needs exactly one literal' in e for e in validate(self.root)))

    def test_exact_workspace_links_require_a_real_scene_and_declared_state(self):
        html = (self.site / "index.html").read_text()
        routes = ('lab/autonomous-farm/index.html', 'lab/ai-software-factory/index.html')
        table = escape(json.dumps({'000': {'label': 'Blocked'}, '010': {'label': 'Allowed'}}), quote=True)
        scene = (f'<article id="scene-water" data-scene data-key="water" data-initial="000" '
                 f'data-model="{table}"><h2>Water</h2></article>')
        for relative in routes:
            page = self.site / relative
            page.parent.mkdir(parents=True)
            page.write_text(html.replace('</main>', scene + '</main>'))
        for relative in routes:
            route = '/' + relative.removesuffix('index.html')
            index = self.site / 'index.html'
            index.write_text(html.replace('</body>', f'<a href="{route}#scene-water~v1-010">Exact conditions</a></body>'))
            self.assertEqual(validate(self.root), [])
            for fragment in ('scene-missing~v1-010', 'scene-water~v2-010', 'scene-water~v1-999',
                             'scene-water~v1-01', 'scene-water~v1-0100', 'scene-water~v1-01x',
                             'scene-water~v1-__proto__', 'purpose~v1-010', 'missing'):
                with self.subTest(route=route, fragment=fragment):
                    index.write_text(html.replace('</body>', f'<a href="{route}#{fragment}">Bad conditions</a></body>'))
                    self.assertTrue(any('missing link anchor' in e for e in validate(self.root)))
        # The same attributes elsewhere cannot authorize state fragments.
        index.write_text(html.replace('</main>', scene + '<a href="#scene-water~v1-010">Wrong route</a></main>'))
        self.assertTrue(any('missing link anchor' in e for e in validate(self.root)))

    def test_exact_workspace_links_reject_malformed_scene_models(self):
        html = (self.site / "index.html").read_text()
        page = self.site / 'lab/autonomous-farm/index.html'
        page.parent.mkdir(parents=True)
        self.change_html('<a href="/lab/autonomous-farm/#scene-water~v1-000">Exact conditions</a>')
        for model in ('{broken', 'null', '[]', '{}', '{"000":null}', '{"000":42}', '{"garbage":{}}'):
            with self.subTest(model=model):
                scene = (f'<article id="scene-water" data-scene data-key="water" data-initial="000" '
                         f'data-model="{escape(model, quote=True)}"><h2>Water</h2></article>')
                page.write_text(html.replace('</main>', scene + '</main>'))
                self.assertTrue(any('missing link anchor' in e for e in validate(self.root)))

    def test_valid_static_site(self):
        self.assertEqual(validate(self.root), [])

    def test_only_valid_inert_schema_data_can_use_the_inline_data_exception(self):
        graph = '{"@context":"https://schema.org","@graph":[]}'
        safe = f'<script type="application/ld+json">{graph}</script>'
        self.change_html(safe)
        self.assertEqual(validate(self.root), [])
        path = self.site / "index.html"
        original = path.read_text()
        for bad in (safe.replace(graph, "alert(1)"), safe.replace('type=', 'src="/favicon.svg" type='),
                    safe.replace('type=', 'onload="alert(1)" type='), safe.replace('application/ld+json', 'text/javascript'),
                    safe.replace(graph, graph + '</script><script>alert(1)')):
            with self.subTest(bad=bad):
                path.write_text(original.replace(safe, bad))
                self.assertTrue(validate(self.root))
        path.write_text(original)

    def test_curated_markdown_download_does_not_allow_other_repository_markdown(self):
        (self.site / "_headers").write_text(self.headers + self.download_headers())
        download = self.site / "lab/agentic-company-harness/workflow-brief.md"
        download.parent.mkdir(parents=True)
        download.write_text("# Agent workflow brief\n\nAn authored public planning template.\n")
        factory_download = self.site / "lab/ai-software-factory/operating-brief.md"
        factory_download.parent.mkdir(parents=True)
        factory_download.write_text("# Software factory brief\n\nAn authored public planning template.\n")
        farm_download = self.site / "lab/autonomous-farm/operating-brief.md"
        farm_download.parent.mkdir(parents=True)
        farm_download.write_text("# Farm brief\n\nAn authored public planning template.\n")
        self.assertEqual(validate(self.root), [])
        for relative in ("AGENTS.md", "lab/pieces/internal-draft.md", "lab/agentic-company-harness/other.md",
                         "lab/ai-software-factory/other.md", "lab/autonomous-farm/other.md", "lab/other/operating-brief.md"):
            with self.subTest(relative=relative):
                private_source = self.site / relative
                private_source.parent.mkdir(parents=True, exist_ok=True)
                private_source.write_text("# Internal source\n")
                self.assertTrue(any(f"Unexpected public file type: {relative}" in error for error in validate(self.root)))
                private_source.unlink()

    def test_skip_link_needs_a_focusable_main_destination(self):
        path = self.site / "index.html"
        for replacement in ('<main id="main">', '<main tabindex="-1">', '<div id="main" tabindex="-1">'):
            with self.subTest(replacement=replacement):
                original = path.read_text()
                path.write_text(original.replace('<main id="main" tabindex="-1">', replacement))
                self.assertTrue(any("skip link needs a focusable main destination" in error
                                    for error in validate(self.root)))
                path.write_text(original)

    def test_public_em_dash_rule_catches_literal_and_encoded_copy(self):
        for value in ("\u2014", "&mdash;", "&#8212;", "&#x2014;", "&#X2014;"):
            for markup in (f"<p>One{value}two</p>", f'<img alt="One{value}two" src="/favicon.svg">',
                           f"<title>One{value}two</title>"):
                with self.subTest(value=value, markup=markup):
                    self.change_html(markup)
                    self.assertTrue(any("index.html: public text must not contain em dashes" in error
                                        for error in validate(self.root)))
                    path = self.site / "index.html"
                    path.write_text(path.read_text().replace(markup, ""))

    def test_public_em_dash_rule_covers_figures_and_authored_downloads(self):
        for relative, text in (("figure.svg", '<svg><title>One&#x2014;two</title></svg>'),
                               ("lab/agentic-company-harness/workflow-brief.md", "One\u2014two"),
                               ("lab/ai-software-factory/operating-brief.md", "One\u2014two"),
                               ("lab/autonomous-farm/operating-brief.md", "One\u2014two")):
            with self.subTest(relative=relative):
                path = self.site / relative
                path.parent.mkdir(parents=True, exist_ok=True)
                path.write_text(text)
                self.assertTrue(any(f"{relative}: public text must not contain em dashes" in error
                                    for error in validate(self.root)))
                path.unlink()

    def test_public_em_dash_rule_covers_css_generated_text(self):
        path = self.site / "copy.css"
        for value in ("\u2014", r"\2014", r"\002014", r"\2014 "):
            with self.subTest(value=value):
                path.write_text(f'.label::after {{ content: "{value}"; }}')
                self.assertTrue(any("copy.css: public text must not contain em dashes" in error
                                    for error in validate(self.root)))

    def test_public_copy_allows_other_punctuation(self):
        self.change_html("<p>Fidret | Lab: 1–3 seconds (synthetic), source-time check.</p>")
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
            "img-src 'self'; font-src 'self'; style-src 'self'; script-src 'self'; default-src 'none';"
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


    def test_only_the_exact_source_controlled_runtime_is_allowed_on_declared_lab_routes(self):
        runtime = self.site / "_astro/lab-experience.Fixture1.js"
        runtime.parent.mkdir()
        source = self.root / "src/scripts/lab-experience.js"
        source.parent.mkdir(parents=True)
        source.write_text("export const localReading = true;\n")
        runtime.write_bytes(source.read_bytes())
        page = self.site / "lab/autonomous-farm/index.html"
        page.parent.mkdir(parents=True)
        html = (self.site / "index.html").read_text()
        script = '<script type="module" src="/_astro/lab-experience.Fixture1.js"></script>'
        page.write_text(html.replace('</body>', script + '</body>'))
        self.assertEqual(validate(self.root), [])
        for tag in (script.replace('type="module"', 'type="text/javascript"'),
                    script.replace('</script>', 'alert(1)</script>'),
                    script.replace('></script>', ' onload="alert(1)"></script>'),
                    script.replace('Fixture1.js', 'Fixture1.js?extra=1'),
                    script + script):
            with self.subTest(tag=tag):
                page.write_text(html.replace('</body>', tag + '</body>'))
                self.assertTrue(validate(self.root))
        page.write_text(html.replace('</body>', script + '</body>'))
        self.change_html(script)
        self.assertTrue(any('script is outside' in e for e in validate(self.root)))
        (self.site / "index.html").write_text(html)
        runtime.write_text("export const substituted = true;\n")
        self.assertTrue(any('canonical source' in e for e in validate(self.root)))
        runtime.write_bytes(source.read_bytes())
        arbitrary = self.site / "_astro/other.Fixture1.js"
        arbitrary.write_text("export const unexpected = true;\n")
        self.assertTrue(any('Unexpected public file type' in e for e in validate(self.root)))


if __name__ == "__main__":
    unittest.main()
