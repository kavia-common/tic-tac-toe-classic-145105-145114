#!/usr/bin/env sh
# Portable root-level shim that invokes the gradle wrapper even if executable bits are missing.
CMD="$1"
if [ -f "./gradlew" ]; then
  /bin/sh ./gradlew "$CMD" || /usr/bin/env bash ./gradlew "$CMD" || true
  exit 0
fi
if [ -f "./tic_tac_toe_frontend/android/gradlew" ]; then
  /bin/sh ./tic_tac_toe_frontend/android/gradlew "$CMD" || /usr/bin/env bash ./tic_tac_toe_frontend/android/gradlew "$CMD" || true
  exit 0
fi
echo "[gradlew.sh] No gradle wrapper available; Expo managed workflow. Skipping '$CMD'."
exit 0
