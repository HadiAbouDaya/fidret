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


class Document(HTMLParser):
    def __init__(self, text: str):
        super().__init__()
        self.tags = []
        self.ids = set()
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
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
            if tag in {"script", "iframe", "form", "object", "embed"}:
                errors.append(f"{path.name}: {tag} is outside this static website's scope")
            if any(key.startswith("on") for key in attrs):
                errors.append(f"{path.name}: inline event handlers are not permitted")
            for attribute in ("href", "src"):
                value = attrs.get(attribute)
                if not value:
                    continue
                url = urlsplit(value)
                if url.scheme or url.netloc:
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
