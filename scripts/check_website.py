#!/usr/bin/env python3
"""Check public assets and enforce the deliberately static deployment boundary."""

from __future__ import annotations

import json
import re
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
from xml.etree import ElementTree

ROOT = Path(__file__).resolve().parents[1]
PROTECTED_HEADERS = {
    "content-security-policy": "Content-Security-Policy",
    "referrer-policy": "Referrer-Policy",
    "x-content-type-options": "X-Content-Type-Options",
    "permissions-policy": "Permissions-Policy",
}
STATIC_CSP = {
    "default-src": ("'none'",),
    "style-src": ("'self'",),
    "font-src": ("'self'",),
    "img-src": ("'self'",),
    "base-uri": ("'none'",),
    "form-action": ("'none'",),
    "frame-ancestors": ("'none'",),
}
HEADER_NAME = re.compile(r"[!#$%&'*+.^_`|~0-9A-Za-z-]+")
ROBOTS_META_NAMES = {"robots", "googlebot", "googlebot-news", "bingbot"}
ROBOTS_PARAMETERS = {"max-snippet", "max-image-preview", "max-video-preview", "unavailable_after"}
ROBOTS_DIRECTIVE = re.compile(r"([a-z][a-z0-9_-]*)(?:[ \t]*:[ \t]*[^,\s]+)?", re.IGNORECASE)


def suppresses_indexing(value: str, *, agent_prefix: bool = False) -> bool:
    """Find noindex/none flags, keeping directive parameter values separate."""
    for group in value.lower().split(","):
        if agent_prefix:
            prefix = re.match(r"^[ \t]*([a-z][a-z0-9_-]*)[ \t]*:[ \t]*(.*)$", group)
            if prefix and prefix[1] not in ROBOTS_PARAMETERS | {"noindex", "none"}:
                group = prefix[2]
        if any(item[1] in {"noindex", "none"} for item in ROBOTS_DIRECTIVE.finditer(group)):
            return True
    return False


def check_security_headers(text: str) -> list[str]:
    """Protect the existing global policy while allowing independent cache rules.

    Cloudflare combines matching blocks and supports ``! Header`` removal, so a
    correct-looking global substring alone does not establish the final policy.
    """
    errors = []
    definitions = {name: [] for name in PROTECTED_HEADERS}
    scope = None
    # Split only actual file lines; Unicode separators must not become syntax.
    for number, line in enumerate(text.split("\n"), 1):
        line = line.removesuffix("\r")
        value = line.strip(" \t")
        if not value or value.startswith("#"):
            continue
        label = f"_headers:{number}"
        if value.startswith("!"):
            name = value[1:].strip(" \t")
            if not HEADER_NAME.fullmatch(name):
                errors.append(f"{label}: malformed header removal")
            elif name.lower() in PROTECTED_HEADERS:
                errors.append(f"{label}: protected header cannot be removed: {name}")
            elif line[0] not in " \t" or scope is None:
                errors.append(f"{label}: header removal must be indented under a URL rule")
            continue
        if line[0] not in " \t":
            if not (value.startswith("/") or value.startswith("https://")):
                errors.append(f"{label}: expected a URL rule followed by indented headers")
                scope = None
            else:
                scope = value
            continue
        name, separator, header_value = value.partition(":")
        if scope is None or not separator or not HEADER_NAME.fullmatch(name):
            errors.append(f"{label}: malformed header; indent Name: value under a URL rule")
            continue
        name = name.lower()
        if name in PROTECTED_HEADERS or name == "x-robots-tag":
            if any(ord(char) > 126 or (ord(char) < 32 and char != "\t") for char in header_value):
                errors.append(f"{label}: {name} must contain only printable ASCII and horizontal tabs")
                continue
        if name == "x-robots-tag" and scope != "/404.html" and suppresses_indexing(header_value, agent_prefix=True):
            errors.append(f"{label}: X-Robots-Tag must not suppress public indexing outside literal /404.html")
        if name not in PROTECTED_HEADERS:
            continue
        definitions[name].append((header_value.strip(" \t"), label))
        if scope != "/*":
            errors.append(f"{label}: {PROTECTED_HEADERS[name]} must be defined only under literal /*")

    for name, occurrences in definitions.items():
        header = PROTECTED_HEADERS[name]
        if not occurrences:
            errors.append(f"_headers: missing global {header} under literal /*")
            continue
        if len(occurrences) != 1:
            errors.append(f"_headers: {header} must be defined exactly once; duplicate definitions combine on Cloudflare")
        for value, label in occurrences:
            if name == "content-security-policy":
                directives = {}
                for directive in value.split(";"):
                    tokens = re.split(r"[ \t]+", directive.strip(" \t")) if directive.strip(" \t") else []
                    if not tokens:
                        continue
                    key = tokens[0].lower()
                    if key in directives:
                        errors.append(f"{label}: duplicate Content-Security-Policy directive: {key}")
                    directives[key] = tuple(tokens[1:])
                if directives != STATIC_CSP:
                    errors.append(f"{label}: Content-Security-Policy must match the approved static directive/source policy")
            elif name == "permissions-policy":
                features = {}
                for item in value.split(","):
                    match = re.fullmatch(r"[ \t]*([a-z][a-z0-9-]*)=\( *\)[ \t]*", item)
                    if match is None or match[1] in features:
                        errors.append(f"{label}: Permissions-Policy must disable camera, microphone and geolocation exactly once")
                        break
                    features[match[1]] = ()
                if features != {"camera": (), "microphone": (), "geolocation": ()}:
                    errors.append(f"{label}: Permissions-Policy must disable only camera, microphone and geolocation")
            elif name == "referrer-policy" and value != "strict-origin-when-cross-origin":
                errors.append(f"{label}: Referrer-Policy must be strict-origin-when-cross-origin")
            elif name == "x-content-type-options" and value != "nosniff":
                errors.append(f"{label}: X-Content-Type-Options must be nosniff")
    return errors


class Document(HTMLParser):
    def __init__(self, text: str):
        super().__init__()
        self.tags = []
        self.ids = set()
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        # HTML keeps the first occurrence of a duplicate attribute.
        attributes = {}
        for name, value in attrs:
            attributes.setdefault(name, value)
        attrs = attributes
        self.tags.append((tag, attrs))
        if attrs.get("id"):
            self.ids.add(attrs["id"])


def validate(root: Path) -> list[str]:
    errors = []
    try:
        config = json.loads((root / "wrangler.json").read_text())
    except (OSError, ValueError) as error:
        return [f"Cannot read wrangler.json: {error}"]
    if config.get("pages_build_output_dir") != "./website":
        errors.append("Only ./website may be published; repository documents must stay outside the asset directory")
    if "main" in config or "assets" in config or (root / "functions").exists():
        errors.append("Static hosting must not configure a Worker script or run_worker_first")
    if config.get("name") != "fidret":
        errors.append("The Cloudflare Pages project must be named fidret")
    site = root / "website"
    for name in ("index.html", "404.html", "favicon.svg", "robots.txt", "sitemap.xml", "_headers"):
        if not (site / name).is_file():
            errors.append(f"Missing public asset: {name}")
    if not site.is_dir():
        return errors
    if site.is_symlink():
        return errors + ["Public output directory must not be a symlink"]
    headers = site / "_headers"
    if headers.is_file() and not headers.is_symlink():
        errors.extend(check_security_headers(headers.read_text(encoding="utf-8")))
    files = sorted(site.rglob("*"))
    documents = {}
    for path in files:
        if path.is_symlink():
            errors.append(f"Public assets must not be symlinks: {path.relative_to(site)}")
            continue
        if not path.is_file():
            continue
        suffix = path.suffix.lower()
        if path.name.startswith(".") or (suffix not in {".html", ".css", ".svg", ".txt", ".xml", ".woff2", ".png", ".jpg", ".jpeg", ".webp", ".gif"} and path.name != "_headers"):
            errors.append(f"Unexpected public file type: {path.relative_to(site)}")
        if suffix == ".html":
            documents[path] = Document(path.read_text(encoding="utf-8"))
        if suffix == ".css":
            css = path.read_text()
            if re.search(r"@import", css):
                errors.append(f"External CSS dependencies are not permitted: {path.name}")
            for value in re.findall(r"url\(\s*['\"]?([^)'\"]+)", css):
                url = urlsplit(value.strip())
                if url.scheme or url.netloc:
                    errors.append(f"External CSS dependencies are not permitted: {path.name}")
                    continue
                target = (site / url.path.lstrip("/")) if url.path.startswith("/") else path.parent / url.path
                if not target.resolve().is_relative_to(site.resolve()) or not target.is_file():
                    errors.append(f"{path.name}: missing CSS asset: {value}")
    for path, doc in documents.items():
        if not any(tag == "html" and attrs.get("lang") == "en" for tag, attrs in doc.tags):
            errors.append(f"{path.name}: missing English document language")
        if not any(tag == "meta" and attrs.get("name") == "viewport" for tag, attrs in doc.tags):
            errors.append(f"{path.name}: missing mobile viewport")
        if sum(tag == "h1" for tag, _ in doc.tags) != 1:
            errors.append(f"{path.name}: expected one primary heading")
        for tag, attrs in doc.tags:
            if (path != site / "404.html" and tag == "meta"
                    and (attrs.get("name") or "").strip(" \t\r\n\f").lower() in ROBOTS_META_NAMES
                    and suppresses_indexing(attrs.get("content") or "")):
                errors.append(f"{path.relative_to(site)}: intended public page must not suppress indexing with robots noindex/none")
            if tag in {"script", "style", "iframe", "form", "object", "embed", "base"}:
                errors.append(f"{path.name}: {tag} is outside this static website's scope")
            if any(key.startswith("on") for key in attrs):
                errors.append(f"{path.name}: inline event handlers are not permitted")
            if "style" in attrs or "srcdoc" in attrs:
                errors.append(f"{path.name}: inline styles and embedded documents are not permitted")
            for attribute in ("href", "src"):
                value = attrs.get(attribute)
                if not value:
                    continue
                url = urlsplit(value)
                if url.scheme or url.netloc:
                    if tag == "a" and (url.scheme != "https" or not url.netloc or url.username or url.password):
                        errors.append(f"{path.name}: unsafe external link: {value}")
                    if tag != "a" and not (tag == "link" and attrs.get("rel") == "canonical"):
                        errors.append(f"{path.name}: external resource dependency: {value}")
                    continue
                target = ((site / unquote(url.path.lstrip("/"))) if url.path.startswith("/")
                          else (path.parent / unquote(url.path))).resolve() if url.path else path
                if target.is_dir():
                    target = target / "index.html"
                if not target.is_relative_to(site.resolve()) or not target.is_file():
                    errors.append(f"{path.name}: invalid public link: {value}")
                elif url.fragment and target in documents and unquote(url.fragment) not in documents[target].ids:
                    errors.append(f"{path.name}: missing link anchor: {value}")
    homepage = documents.get(site / "index.html")
    if homepage and not any(tag == "link" and attrs.get("rel") == "canonical"
                            and attrs.get("href") == "https://fidret.com/" for tag, attrs in homepage.tags):
        errors.append("Homepage canonical must be https://fidret.com/")
    for name in ("favicon.svg", "sitemap.xml"):
        path = site / name
        if path.is_file():
            try:
                ElementTree.parse(path)
            except ElementTree.ParseError:
                errors.append(f"Invalid XML: {name}")
    return errors


def main() -> int:
    errors = validate(ROOT)
    if errors:
        print("Website validation failed:")
        for error in errors:
            print(f"- {error}")
        return 1
    print("Website OK: public assets, local links, metadata, and static-only Cloudflare configuration.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
