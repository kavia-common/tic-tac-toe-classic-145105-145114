#!/usr/bin/env bash
set -euo pipefail

# Ensure gradle shims are executable in various locations
chmod +x "./gradlew" || true
chmod +x "./android/gradlew" || true
chmod +x "./tic_tac_toe_frontend/android/gradlew" || true

echo "Executable flags set for gradle shims (if present)."
