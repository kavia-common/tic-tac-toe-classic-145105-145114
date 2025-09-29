#!/usr/bin/env bash
# CI/build shim for Expo managed project.
# If native Android exists, use its Gradle wrapper. Otherwise, no-op with success.
set -euo pipefail

if [ -f "./android/gradlew" ]; then
  echo "[build.sh] Native Android project detected. Running Gradle assembleDebug..."
  cd android
  ./gradlew assembleDebug
  exit $?
else
  echo "[build.sh] No native Android project (Expo managed). Skipping Gradle build."
  exit 0
fi
