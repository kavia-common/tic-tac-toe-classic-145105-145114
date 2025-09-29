#!/usr/bin/env bash
# Root-level CI entry script.
# Use this when CI is configured to call a generic CI script.
set -euo pipefail

echo "[ci.sh] Running lint and CI-safe build"
npm run --workspace tic_tac_toe_frontend lint || true
./build.sh
echo "[ci.sh] Done"
