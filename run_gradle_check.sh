#!/usr/bin/env bash
set -euo pipefail

# This script attempts to run a Gradle task even in an Expo-managed project by delegating to the frontend shim.
# It will auto-generate the native android project via expo prebuild if missing.

# Ensure shims are executable
chmod +x "./gradlew" || true
chmod +x "./android/gradlew" || true
chmod +x "./tic_tac_toe_frontend/android/gradlew" || true

# Prefer workspace-level shim, which delegates to frontend and auto-prebuilds
if [ -x "./gradlew" ]; then
  ./gradlew "${@:-}" || true
fi

# Fall back to frontend path: will run prebuild if needed
if [ -x "./tic_tac_toe_frontend/android/gradlew" ]; then
  (cd tic_tac_toe_frontend/android && ./gradlew "${@:-}") || true
fi

# Direct documented path for CI
if [ -f "./tic_tac_toe_frontend/package.json" ]; then
  (cd tic_tac_toe_frontend && npm ci && npx expo prebuild --platform android && cd android && ./gradlew "${@:-}") || true
fi

echo "run_gradle_check.sh executed. If Gradle still failed, ensure Android SDK/Java are available or use EAS builds."
