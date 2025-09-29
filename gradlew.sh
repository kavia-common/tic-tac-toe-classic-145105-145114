#!/usr/bin/env bash
# Secondary Gradle wrapper shim for tools invoking 'gradlew.sh'
set -e
if [ -f "./android/gradlew" ]; then
  echo "Delegating to ./android/gradlew $@"
  cd android
  exec ./gradlew "$@"
else
  echo "gradlew.sh shim: No native Android project detected (Expo managed)."
  echo "Run 'npm --workspace tic_tac_toe_frontend run prebuild:android' to generate ./android, then re-run Gradle."
  exit 0
fi
