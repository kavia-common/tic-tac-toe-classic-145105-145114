#!/usr/bin/env bash
set -euo pipefail

# Ensure shims are executable
chmod +x "./gradlew" || true
chmod +x "./tic_tac_toe_frontend/android/gradlew" || true

# Attempt to run the workspace shim which delegates to the frontend wrapper.
# Pass through any args (e.g., assembleDebug)
./gradlew "${@:-}" || {
  echo "Gradle shim failed. This is expected if native projects haven't been generated."
  echo "Run: (cd tic_tac_toe_frontend && npm run build:android:ci)"
  exit 127
}
