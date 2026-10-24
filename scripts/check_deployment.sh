#!/bin/sh
# Cloudflare Pages build command. Publish only after these checks pass.
set -eu
python3 scripts/check_foundation.py
python3 scripts/check_website.py
python3 -m unittest discover -s tests -v
