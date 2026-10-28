#!/bin/sh
# Cloudflare Pages build command. Publish only after these checks pass.
set -eu
export ASTRO_TELEMETRY_DISABLED=1
python3 scripts/check_foundation.py
pnpm typecheck
pnpm test
pnpm build
python3 scripts/check_website.py
python3 -m unittest discover -s tests -v
