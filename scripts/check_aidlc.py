"""Offline AI-DLC provenance, default routing and lifecycle record contracts."""
from __future__ import annotations

import hashlib
import json
import re
from pathlib import Path

VENDOR = Path("vendor/aidlc")
PHASES = {"initialization", "ideation", "inception", "construction", "operation", "complete"}
DISPOSITIONS = {"planned", "active", "complete", "skipped", "deferred"}
RESULTS = {"pending", "pass", "fail", "unverified"}
DEFAULT_DIRECTIVE = "Website work MUST automatically follow the Fidret AI-DLC lifecycle without an explicit invocation."
REQUIRED_REFERENCES = {
    "LICENSE",
    *(f"core/memory/phases/{phase}.md" for phase in PHASES - {"initialization", "complete"}),
    "core/knowledge/aidlc-shared/ai-dlc-principles.md",
    "core/knowledge/aidlc-shared/verification.md",
    "core/aidlc-common/protocols/stage-protocol-governance.md",
    "core/aidlc-common/protocols/stage-protocol-recovery.md",
}
# Repository-authored documents remain subject to the normal link checker.
ENTRY_LINKS = {
    "AGENTS.md": ("skills/fidret-aidlc/SKILL.md", "docs/collaboration/aidlc.md"),
    "docs/collaboration/agent-workflow.md": ("../../skills/fidret-aidlc/SKILL.md", "aidlc.md"),
    "skills/fidret-aidlc/SKILL.md": ("../../docs/collaboration/aidlc.md",),
}


def section(text: str, name: str) -> str:
    match = re.search(rf"^## {re.escape(name)}\s*\n(.*?)(?=^## |\Z)", text, re.M | re.S)
    return match.group(1).strip() if match else ""


def fields(text: str) -> dict[str, str]:
    return dict(re.findall(r"^- ([\w -]+):[ \t]*(.+)$", text, re.M))


def table(text: str, header: tuple[str, ...]) -> list[list[str]]:
    rows = []
    in_table = False
    for line in text.splitlines():
        if not line.startswith("|"):
            if in_table and rows:
                break
            continue
        cells = [cell.strip() for cell in line.strip("|").split("|")]
        if tuple(cells) == header:
            in_table = True
        elif in_table and not all(re.fullmatch(r":?-+:?", cell) for cell in cells):
            rows.append(cells)
    return rows


def read_manifest(root: Path) -> dict:
    return json.loads((root / VENDOR / "upstream.json").read_text())


def stage_names(manifest: dict) -> set[str]:
    return {Path(name).stem for name in manifest["files"]
            if name.startswith("core/aidlc-common/stages/")}


def profile_names(manifest: dict) -> set[str]:
    return {Path(name).stem.removeprefix("aidlc-") for name in manifest["files"]
            if name.startswith("core/scopes/")}


def check_vendor(root: Path, manifest: dict) -> list[str]:
    errors = []
    if (manifest.get("repository") != "https://github.com/awslabs/aidlc-workflows"
            or manifest.get("license") != "MIT-0"
            or not re.fullmatch(r"v\d+\.\d+\.\d+", manifest.get("release", ""))
            or not re.fullmatch(r"[a-f0-9]{40}", manifest.get("commit", ""))):
        errors.append("AI-DLC: invalid upstream provenance")
    files = manifest.get("files", {})
    if (len(stage_names(manifest)) != 33 or len(profile_names(manifest)) != 11
            or not REQUIRED_REFERENCES <= files.keys()):
        errors.append("AI-DLC: expected pinned 33-stage/11-profile inventory and required reference files")
    expected = {VENDOR / name for name in files} | {VENDOR / "upstream.json"}
    actual = {p.relative_to(root) for p in (root / VENDOR).rglob("*") if p.is_file()}
    if expected != actual:
        errors.append("AI-DLC: vendor file inventory differs from manifest")
    for name, digest in files.items():
        rel = Path(name)
        path = root / VENDOR / rel
        if rel.is_absolute() or ".." in rel.parts or path.is_symlink():
            errors.append(f"AI-DLC: invalid vendor path: {name}")
        elif not path.is_file() or hashlib.sha256(path.read_bytes()).hexdigest() != digest:
            errors.append(f"AI-DLC: upstream file missing or hash mismatch: {name}")
    return errors


def check_lifecycle(root: Path, path: Path, manifest: dict) -> list[str]:
    label = path.relative_to(root)
    text = path.read_text()
    errors = []
    header = fields(text.split("\n## ", 1)[0])
    if header.get("AI-DLC") != "1":
        errors.append(f"{label}: requires AI-DLC: 1 lifecycle metadata")
    lifecycle = section(text, "AI-DLC")
    meta = fields(lifecycle)
    keys = re.findall(r"^- ([\w -]+):", lifecycle, re.M)
    if len(keys) != len(set(keys)):
        errors.append(f"{label}: duplicate AI-DLC metadata field")
    for field in ("Rationale", "Gate basis", "Operation status"):
        if not meta.get(field, "").strip():
            errors.append(f"{label}: AI-DLC requires {field}")
    if meta.get("Profile") not in profile_names(manifest):
        errors.append(f"{label}: invalid AI-DLC Profile")
    if meta.get("Depth") not in {"Minimal", "Standard", "Comprehensive"}:
        errors.append(f"{label}: invalid AI-DLC Depth")
    if meta.get("Current phase") not in PHASES:
        errors.append(f"{label}: invalid AI-DLC Current phase")
    done = header.get("Status") == "done"
    if done and meta.get("Current phase") != "complete":
        errors.append(f"{label}: done AI-DLC task requires complete phase")
    stages = []
    for row in table(lifecycle, ("Stages", "Disposition", "Evidence or reason")):
        if len(row) != 3:
            errors.append(f"{label}: malformed AI-DLC stage row")
            continue
        names, disposition, evidence = row
        stages.extend(name.strip() for name in names.split(","))
        if disposition not in DISPOSITIONS or not evidence:
            errors.append(f"{label}: invalid stage disposition or missing evidence/reason")
        if done and disposition not in {"complete", "skipped"}:
            errors.append(f"{label}: done task has unfinished AI-DLC stages")
    if set(stages) != stage_names(manifest) or len(stages) != len(set(stages)):
        errors.append(f"{label}: account for every AI-DLC stage exactly once")
    criteria = re.findall(r"^- (A\d+):[ \t]+(.+)$", section(text, "Acceptance criteria"), re.M)
    ids = [key for key, _ in criteria]
    # Stable IDs are required for each acceptance bullet, not just a selected subset.
    bullets = re.findall(r"^- .+$", section(text, "Acceptance criteria"), re.M)
    if not ids or len(ids) != len(set(ids)) or len(bullets) != len(ids):
        errors.append(f"{label}: each acceptance criterion requires a unique A-number ID")
    coverage = []
    for row in table(section(text, "Traceability"),
                     ("Criterion", "Implementation", "Verification", "Result")):
        if len(row) != 4:
            errors.append(f"{label}: malformed traceability row")
            continue
        criterion, implementation, verification, result = row
        coverage.append(criterion)
        if not implementation or not verification or result not in RESULTS:
            errors.append(f"{label}: traceability requires implementation, verification and valid result")
        if done and result != "pass":
            errors.append(f"{label}: done task has unpassed acceptance evidence")
    if set(coverage) != set(ids) or len(coverage) != len(set(coverage)):
        errors.append(f"{label}: trace every acceptance criterion exactly once")
    return errors


def check_aidlc(root: Path, documents: list[Path]) -> list[str]:
    try:
        manifest = read_manifest(root)
        errors = check_vendor(root, manifest)
        legacy = json.loads((root / "docs/collaboration/aidlc-legacy-tasks.json").read_text())
        if not isinstance(legacy, list) or not all(isinstance(name, str) for name in legacy):
            raise ValueError("invalid legacy task inventory")
        agents = root / "AGENTS.md"
        if not agents.is_file() or DEFAULT_DIRECTIVE not in agents.read_text():
            errors.append("AGENTS.md: missing mandatory automatic AI-DLC directive")
        for name, links in ENTRY_LINKS.items():
            path = root / name
            content = path.read_text() if path.is_file() else ""
            for link in links:
                if f"]({link})" not in content:
                    errors.append(f"{name}: missing default AI-DLC entry link: {link}")
        for path in documents:
            if path.parent != root / "docs/tasks" or path.name == "README.md":
                continue
            # Historical tasks opt in when substantive work resumes.
            if path.name not in legacy or re.search(r"^- AI-DLC:", path.read_text(), re.M):
                errors.extend(check_lifecycle(root, path, manifest))
        return errors
    except (OSError, ValueError, TypeError, KeyError) as error:
        return [f"AI-DLC configuration invalid or missing: {error}"]
