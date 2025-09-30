#!/usr/bin/env bash
set -euo pipefail

# CI helper script: prebuild then gradle for Android
cd "$(dirname "$0")/tic_tac_toe_frontend"

# Ensure node modules
if [ ! -d "node_modules" ]; then
  npm ci
fi

# Prebuild generates android/ and gradlew
npx expo prebuild --platform android

# Run Gradle build
cd android
./gradlew assembleDebug
