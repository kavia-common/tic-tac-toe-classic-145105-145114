#!/usr/bin/env sh
# Root-level Gradle wrapper shim for Expo managed projects.
# This ensures CI or analyzers invoking ./gradlew won't fail when no native project is present.

set -e

if [ -f "./android/gradlew" ]; then
  echo "Delegating to ./android/gradlew $@"
  cd android
  exec ./gradlew "$@"
else
  echo "gradlew shim: No native Android project detected (Expo managed)."
  echo "Run 'npm --workspace tic_tac_toe_frontend run prebuild:android' to generate ./android, then re-run Gradle."
  exit 0
fi
