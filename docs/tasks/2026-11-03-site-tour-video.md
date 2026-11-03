# One-minute narrated website tour

- Status: done
- Human owner: Hadi Abou Daya
- Agent or harness: Codex
- Branch: hadi/one-minute-site-tour
- Updated: 2026-11-03
- Issue: [#28](https://github.com/HadiAbouDaya/fidret/issues/28)
- Verification status: passed

## Purpose

Create a one-minute video touring Fidret’s website and explaining its mission, vision, developing Physical AI practice and Lab, faithful to the [charter](../foundation/charter.md).

## Scope

Narration, live-site captures, captions, editing and a downloadable MP4. Preserve the website itself. The [script and shot list](../media/2026-11-03-site-tour.md) are shared production sources; media stays outside Git.

## Execution boundaries

- Authorized scope: Hadi explicitly requested the video. Creation and delivery only; no external posting, manual deployment or account changes.
- Worktree: `fidret`, task branch above, clean main base `970f27b`.
- Dependencies: existing public website and canonical company context; local media tools stay under ignored `.local/`.
- Coordination: root owns all edits and production. `tour_script_review` supplied read-only script/evidence review; no parallel editing.

## Plan

1. Ground a short English script and shot list in the charter and practice brief.
2. Capture public pages and native states in a dedicated tab; produce synthetic narration and captions.
3. Edit exactly 60 seconds, inspect frames and check speech transcription/audio levels, then deliver the artifact.
4. Record verification and publish shared production notes through the normal checked branch workflow.

## Acceptance criteria

- A playable 60-second 16:9 MP4 with narration and English captions.
- Covers mission, vision, Physical AI as a developing practice, a concrete synthetic experiment and the Lab.
- Shows real site captures with no private tabs or fabricated capability claims.
- Speech is intelligible, captions are readable, audio/video timings are checked and output is directly accessible to Hadi.

## Decisions

Use the existing visual identity and original live pages. English narration follows the request’s language. No new company direction is introduced; the vision statement summarizes existing charter commitments.

## Verification

2026-11-03 final artifact: `Fidret-60-second-tour.mp4`, created in the workspace deliverables directory outside Git, with SRT and transcript sidecars.

- Exact duration 60.000 seconds; 1920 × 1080; 30 fps; 1,800 frames; H.264/yuv420p video and 48 kHz AAC narration. Size 13,690,250 bytes. SHA-256 `7abd7fa2a44279436cf675d57e3328c296bd4ab8c1a4ff4911ab8f5c5a960148`.
- Complete FFmpeg decode passed without errors. Container metadata and frame count were independently read with PyAV. Fast-start MP4 metadata is enabled.
- Eighteen word-timed caption cues have positive, non-overlapping intervals within the minute. Captions preserve the original punctuation and contain no em dashes. Captions are burned in; the optional embedded English track defaults off to avoid duplicate automatic display. Editable SRT supplied.
- Sampled all thirteen shot regions using extracted video frames/contact sheets; inspected full-size opening, expired-state and closing frames. Reduced the caption band so the signal values remain visible, and removed awkward caption wraps.
- Measured final audio at -16.31 LUFS integrated and -1.48 dBTP, with no clipping. Automated local Whisper transcription confirmed the mission, developing practice, experiment, Lab, vision and closing material. Its small English model split the coined brand name and imperfectly transcribed a few words; it is a coverage check, not a human listening claim. No human auditory review is asserted.
- Script reviewed against the charter and practice brief. Live public pages and fresh/expired/recovered states captured through Brave computer use. T3 recording failed twice (browser download failure, then timeout), so the video uses sharp page captures with gentle pans/cuts rather than continuous recording. No private browser chrome or unrelated tabs included. Production tabs were closed.
- `pnpm check` passed: Astro zero diagnostics, 41 Node tests, 88 Python tests and real site/output validation. Final documentation receives foundation and diff checks. No website source, package manifest or lockfile changes.

Synthetic narration uses `en-GB-RyanNeural`. No stock hardware footage, client/result claims, third-party music, external posting or manual deployment is included.

## Handoff

- Checkpoint: one-minute video and subtitle/transcript sidecars created and verified; script and production evidence prepared for the shared repository.
- Remaining work: no video acceptance criteria remain. Publish/merge the shared documentation checkpoint through the checked PR workflow.
- Next action: deliver the video file link to Hadi and merge the documentation PR after its checks pass. Requested revisions use this script and shot list as their starting point.
- Blockers: none.
- Acceptance basis: Hadi’s explicit request and standing contribution authorization; no Elie review asserted.
- Publication: MP4/SRT/transcript are local deliverables outside Git, not uploaded or posted. This branch contains only the task, register and script/production notes. Its PR/merge state is available in GitHub and Git; no website changes are part of it.
- Last verified: 2026-11-03, exact-duration/container/decode/caption/audio/frame checks passed and artifact hash recorded above. Repository shared checks passed; documentation-only foundation/diff checks run before publication.
