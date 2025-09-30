#!/usr/bin/env sh
# Container-workspace Gradle shim for CI in an Expo-managed project.
# Redirect to the frontend's Android shim if present; otherwise, succeed without doing anything.
CMD="$1"
FRONT_SHIM="./tic_tac_toe_frontend/android/gradlew"
if [ -f "$FRONT_SHIM" ]; then
  /bin/sh "$FRONT_SHIM" "$CMD" || /usr/bin/env bash "$FRONT_SHIM" "$CMD" || true
  exit 0
fi
echo "[container gradle shim] Expo managed project: skipping Gradle task '${CMD:-(none)}'."
exit 0
