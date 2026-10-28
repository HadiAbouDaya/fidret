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
    "docs/architecture/README.md", "docs/collaboration/agent-workflow.md",
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
VERIFICATION_STATES = {"not-run", "partial", "passed"}
HANDOFF_FIELDS = (
    "Checkpoint", "Remaining work", "Next action", "Blockers",
    "Acceptance basis", "Publication", "Last verified",
)
DECISION_STATES = {"proposed", "accepted", "active", "rejected", "superseded"}
DECISION_SECTIONS = ("Context", "Decision", "Consequences", "Review")
DECISION_NAME = re.compile(r"^(\d{4})-[\w-]+\.md$")
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


def fields_in(text: str, label: Path | str) -> tuple[dict[str, str], list[str]]:
    fields = {}
    errors = []
    for name, value in re.findall(r"^- ([\w /]+):[ \t]*(.*)$", text, re.MULTILINE):
        if name in fields:
            errors.append(f"{label}: duplicate metadata field: {name}")
        fields[name] = value.strip()
    return fields, errors


def top_fields(text: str, label: Path) -> tuple[dict[str, str], list[str]]:
    """Only the leading record header is metadata; prose can contain labelled lists."""
    return fields_in(re.split(r"^## ", text, maxsplit=1, flags=re.MULTILINE)[0], label)


def section_body(text: str, section: str) -> str:
    match = re.search(
        rf"^## {re.escape(section)}[ \t]*\n(.*?)(?=^## |\Z)",
        text, re.MULTILINE | re.DOTALL,
    )
    return match.group(1).strip() if match else ""


def valid_date(value: str) -> bool:
    if not re.fullmatch(r"\d{4}-\d{2}-\d{2}", value):
        return False
    try:
        date.fromisoformat(value)
    except ValueError:
        return False
    return True


def check_task(root: Path, path: Path) -> list[str]:
    label = path.relative_to(root)
    text = path.read_text(encoding="utf-8")
    fields, errors = top_fields(text, label)
    status = fields.get("Status", "")
    if status not in STATES:
        errors.append(f"{label}: invalid or missing Status")
    for field in ("Human owner", "Agent or harness", "Branch", "Updated"):
        if not fields.get(field, "").strip():
            errors.append(f"{label}: missing {field}")
    is_template = path.name == "TEMPLATE.md"
    verification = fields.get("Verification status", "")
    if verification not in VERIFICATION_STATES:
        errors.append(f"{label}: invalid or missing Verification status")
    if status == "done" and verification != "passed":
        errors.append(f"{label}: done work requires Verification status: passed")
    if not is_template:
        if not valid_date(fields.get("Updated", "")):
            errors.append(f"{label}: Updated must be an ISO date (YYYY-MM-DD)")
        if status in STATES - {"planned"}:
            for field in ("Human owner", "Agent or harness", "Branch"):
                if fields.get(field, "").strip().lower() in PLACEHOLDERS:
                    errors.append(f"{label}: {field} must be assigned for {status} work")
    for section in SECTIONS:
        if not section_body(text, section):
            errors.append(f"{label}: missing or empty {section} section")
    handoff, handoff_errors = fields_in(section_body(text, "Handoff"), f"{label} Handoff")
    errors.extend(handoff_errors)
    for field in HANDOFF_FIELDS:
        if not handoff.get(field):
            errors.append(f"{label}: Handoff requires nonempty {field}")
    if not is_template:
        register = root / "docs/tasks/README.md"
        index = register.read_text(encoding="utf-8") if register.is_file() else ""
        if f"]({path.name})" not in index:
            errors.append(f"{label}: task must be linked from docs/tasks/README.md")
    return errors


def decision_register(root: Path) -> dict[str, list[str]]:
    path = root / "docs/decisions/README.md"
    text = path.read_text(encoding="utf-8") if path.is_file() else ""
    entries: dict[str, list[str]] = {}
    for filename, status in re.findall(
        r"^\|\s*\[[^\]\n]+\]\(([^)\n]+)\)\s*\|\s*([^|\n]+?)\s*\|", text, re.MULTILINE,
    ):
        entries.setdefault(filename, []).append(status.strip())
    return entries


def successor(root: Path, path: Path, fields: dict[str, str]) -> Path | None:
    match = re.fullmatch(r"\[(\d{4})\]\(([^)\n]+)\)", fields.get("Superseded by", ""))
    if not match:
        return None
    target = (path.parent / match.group(2)).resolve()
    name = DECISION_NAME.fullmatch(target.name)
    if (target.parent != (root / "docs/decisions").resolve()
            or target == path.resolve() or not target.is_file()
            or name is None or name.group(1) != match.group(1)):
        return None
    target_fields, _ = top_fields(target.read_text(encoding="utf-8"), target.relative_to(root.resolve()))
    if target_fields.get("Status") not in {"accepted", "active", "superseded"}:
        return None
    return target


def check_decision(root: Path, path: Path) -> list[str]:
    label = path.relative_to(root)
    text = path.read_text(encoding="utf-8")
    fields, errors = top_fields(text, label)
    status = fields.get("Status", "")
    if status not in DECISION_STATES:
        errors.append(f"{label}: invalid or missing decision Status")
    if not valid_date(fields.get("Date", "")):
        errors.append(f"{label}: Date must be an ISO date (YYYY-MM-DD)")
    if fields.get("Human decision owner", "").lower() in PLACEHOLDERS:
        errors.append(f"{label}: Human decision owner must be assigned")
    if status in {"active", "accepted"} and not fields.get("Basis"):
        errors.append(f"{label}: {status} decision requires a recorded Basis")
    for section in DECISION_SECTIONS:
        if not section_body(text, section):
            errors.append(f"{label}: missing or empty {section} section")
    statuses = decision_register(root).get(path.name, [])
    if not statuses:
        errors.append(f"{label}: decision must be linked from docs/decisions/README.md")
    elif len(statuses) != 1 or statuses[0] != status:
        errors.append(f"{label}: decision register must contain one entry with matching Status")
    if status == "superseded" and successor(root, path, fields) is None:
        errors.append(f"{label}: superseded decision requires Superseded by linking a different "
                      "accepted, active or superseded numbered decision")
    return errors


def check_decisions(root: Path) -> list[str]:
    errors = []
    numbers = {}
    successors = {}
    directory = root / "docs/decisions"
    for filename, statuses in decision_register(root).items():
        if not DECISION_NAME.fullmatch(filename) or not (directory / filename).is_file():
            errors.append(f"docs/decisions/README.md: register target must be an existing numbered decision: {filename}")
        if len(statuses) != 1:
            errors.append(f"docs/decisions/README.md: duplicate decision register entry: {filename}")
    for path in sorted(directory.glob("*.md")):
        if path.name in {"README.md", "TEMPLATE.md"}:
            continue
        match = DECISION_NAME.fullmatch(path.name)
        if match is None:
            errors.append(f"{path.relative_to(root)}: decision filename must use NNNN-short-name.md")
            continue
        number = match.group(1)
        if number in numbers:
            errors.append(f"{path.relative_to(root)}: duplicate decision number {number}")
        numbers[number] = path
        errors.extend(check_decision(root, path))
        fields, _ = top_fields(path.read_text(encoding="utf-8"), path.relative_to(root))
        if fields.get("Status") == "superseded":
            target = successor(root, path, fields)
            if target is not None:
                successors[path.resolve()] = target
    for path in successors:
        seen = set()
        current = path
        while current in successors:
            if current in seen:
                errors.append(f"{path.relative_to(root.resolve())}: decision supersession cycle")
                break
            seen.add(current)
            current = successors[current]
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
    errors.extend(check_decisions(ROOT))
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
