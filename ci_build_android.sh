#!/usr/bin/env bash
set -euo pipefail

# Standard CI entrypoint for Android build in Expo-managed workflow

# Move to frontend app
cd "$(dirname "$0")/tic_tac_toe_frontend"

# Install deps if missing
if [ ! -d "node_modules" ]; then
  npm ci
fi

# Prebuild to generate native android project
npx expo prebuild --platform android

# Ensure gradle wrapper is executable
chmod +x android/gradlew || true

# Build debug APK
cd android
./gradlew assembleDebug
