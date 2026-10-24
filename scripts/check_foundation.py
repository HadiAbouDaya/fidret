#!/usr/bin/env python3
"""Validate shared context without external packages or network access."""

from __future__ import annotations

import re
import subprocess
from datetime import date
from pathlib import Path
from urllib.parse import unquote, urlsplit


ROOT = Path(__file__).resolve().parents[1]
REQUIRED = (
    "README.md", "AGENTS.md", "CONTRIBUTING.md",
    "docs/foundation/charter.md", "docs/foundation/physical-ai.md",
    "docs/foundation/roadmap.md", "docs/decisions/README.md",
    "docs/decisions/TEMPLATE.md", "docs/tasks/README.md",
    "docs/tasks/TEMPLATE.md", ".github/pull_request_template.md",
    ".github/ISSUE_TEMPLATE/work-item.md",
    ".github/workflows/foundation-checks.yml",
)
ADAPTERS = {
    "CLAUDE.md": "[AGENTS.md](AGENTS.md)",
    ".github/copilot-instructions.md": "[AGENTS.md](../AGENTS.md)",
    ".cursor/rules/fidret.mdc": "[AGENTS.md](../../AGENTS.md)",
}
SECTIONS = (
    "Purpose", "Scope", "Plan", "Acceptance criteria",
    "Decisions", "Verification", "Handoff",
)
STATES = {"planned", "active", "blocked", "review", "done"}
PLACEHOLDERS = {"", "unassigned", "name", "tbd", "pending"}


def markdown_without_fences(text: str) -> str:
    """Links in examples are not live document links."""
    return re.sub(r"(?ms)^```[^\n]*\n.*?^```[^\n]*$", "", text)


def check_links(root: Path, path: Path) -> list[str]:
    errors = []
    text = markdown_without_fences(path.read_text(encoding="utf-8"))
    for destination in re.findall(r"!?\[[^\]\n]*\]\(([^)\n]+)\)", text):
        destination = destination.strip().strip("<>")
        parsed = urlsplit(destination)
        if parsed.scheme or parsed.netloc or not parsed.path:
            continue
        target = (path.parent / unquote(parsed.path)).resolve()
        if not target.is_relative_to(root.resolve()):
            errors.append(f"{path.relative_to(root)}: link leaves repository: {destination}")
        elif not target.exists():
            errors.append(f"{path.relative_to(root)}: missing link target: {destination}")
    return errors


def check_task(root: Path, path: Path) -> list[str]:
    errors = []
    label = path.relative_to(root)
    text = path.read_text(encoding="utf-8")
    fields = dict(re.findall(r"^- ([\w /]+): (.*)$", text, re.MULTILINE))
    status = fields.get("Status", "")
    if status not in STATES:
        errors.append(f"{label}: invalid or missing Status")
    for field in ("Human owner", "Agent or harness", "Branch", "Updated"):
        if not fields.get(field, "").strip():
            errors.append(f"{label}: missing {field}")
    is_template = path.name == "TEMPLATE.md"
    if not is_template:
        try:
            date.fromisoformat(fields.get("Updated", ""))
        except ValueError:
            errors.append(f"{label}: Updated must be an ISO date")
        if status in STATES - {"planned"}:
            for field in ("Human owner", "Agent or harness", "Branch"):
                if fields.get(field, "").strip().lower() in PLACEHOLDERS:
                    errors.append(f"{label}: {field} must be assigned for {status} work")
    for section in SECTIONS:
        match = re.search(
            rf"^## {re.escape(section)}\s*\n(.*?)(?=^## |\Z)",
            text, re.MULTILINE | re.DOTALL,
        )
        if match is None or not match.group(1).strip():
            errors.append(f"{label}: missing or empty {section} section")
    if not is_template:
        register = root / "docs/tasks/README.md"
        index = register.read_text(encoding="utf-8") if register.is_file() else ""
        if f"]({path.name})" not in index:
            errors.append(f"{label}: task must be linked from docs/tasks/README.md")
    return errors


def check_adapters(root: Path) -> list[str]:
    errors = []
    for name, pointer in ADAPTERS.items():
        path = root / name
        if not path.is_file():
            errors.append(f"missing harness adapter: {name}")
            continue
        text = path.read_text(encoding="utf-8")
        if pointer not in text:
            errors.append(f"{name}: must point to canonical AGENTS.md")
        if len(text.splitlines()) > 20:
            errors.append(f"{name}: keep adapter under 21 lines; put shared rules in AGENTS.md")
    return errors


def repository_files(root: Path) -> list[Path]:
    result = subprocess.run(
        ["git", "ls-files", "--cached", "--others", "--exclude-standard", "-z"],
        cwd=root, capture_output=True, check=True,
    )
    return sorted({root / name.decode("utf-8") for name in result.stdout.split(b"\0")
                   if name and (root / name.decode("utf-8")).is_file()})


def main() -> int:
    try:
        files = repository_files(ROOT)
    except (OSError, subprocess.CalledProcessError) as error:
        print(f"Cannot inventory repository files: {error}")
        return 1
    errors = [f"missing foundation file: {name}" for name in REQUIRED
              if not (ROOT / name).is_file()]
    errors.extend(check_adapters(ROOT))
    documents = [p for p in files if p.suffix in {".md", ".mdc"}]
    for path in documents:
        errors.extend(check_links(ROOT, path))
    tasks = [p for p in documents if p.parent == ROOT / "docs/tasks" and p.name != "README.md"]
    for path in tasks:
        errors.extend(check_task(ROOT, path))
    if errors:
        print("Foundation validation failed:")
        for error in errors:
            print(f"- {error}")
        return 1
    print(f"Foundation OK: {len(documents)} documents, {len(tasks)} task records including template, "
          f"{len(ADAPTERS)} harness adapters.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
