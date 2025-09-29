#!/usr/bin/env bash
# Kotlin script shim for environments that mistakenly call gradlew.kts
if [ -f "./android/gradlew" ]; then
  echo "Delegating to ./android/gradlew $@"
  cd android && ./gradlew "$@"
  exit $?
else
  echo "gradlew.kts shim: Android project not initialized (Expo managed)."
  exit 0
fi
