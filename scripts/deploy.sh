#!/bin/sh
# Run from the repository root. The same checks gate manual and automatic deploys.
set -eu
python3 scripts/check_foundation.py
python3 scripts/check_website.py
python3 -m unittest discover -s tests -v
exec npx --yes wrangler@4.151.3 deploy
