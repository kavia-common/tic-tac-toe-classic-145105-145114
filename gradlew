#!/usr/bin/env bash
# Workspace-level Gradle shim to support CI/analyzers that call ./gradlew from the repo root.
# Delegates to the frontend's auto-prebuild gradle wrapper which can generate android if missing.

set -euo pipefail

FRONTEND_WRAPPER="tic_tac_toe_frontend/android/gradlew"

if [ -x "${FRONTEND_WRAPPER}" ]; then
  exec "${FRONTEND_WRAPPER}" "$@"
fi

if [ -f "${FRONTEND_WRAPPER}" ]; then
  chmod +x "${FRONTEND_WRAPPER}"
  exec "${FRONTEND_WRAPPER}" "$@"
fi

echo "Gradle wrapper not found. This is an Expo-managed app without native projects generated."
echo "Use 'npm run build:android:ci' in tic_tac_toe_frontend or run 'npx expo prebuild --platform android' first."
exit 127
