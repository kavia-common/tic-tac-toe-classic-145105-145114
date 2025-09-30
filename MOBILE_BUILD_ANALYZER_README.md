# Mobile Build Analyzer Readme

## Purpose
Some automated analyzers attempt to execute Gradle directly (e.g., `./gradlew`) at the repository root. This project uses an Expo-managed workflow, so native Android projects do not exist until after an Expo prebuild step. Use the scripts below to generate native projects and build correctly.

## Correct Invocation

- Preferred (simple CI entrypoint):
  - bash tic-tac-toe-classic-145105-145114/ci_build_android.sh

- Makefile target:
  - make -C tic-tac-toe-classic-145105-145114 build-android-ci

- Directly in frontend app:
  - (cd tic-tac-toe-classic-145105-145114/tic_tac_toe_frontend && npm run build:android:ci)

These commands run:
- Expo prebuild (generates android/)
- Gradle build via the generated wrapper

## Shims Provided
- Root Gradle shims:
  - ./tic-tac-toe-classic-145105-145114/gradlew
  - ./tic-tac-toe-classic-145105-145114/android/gradlew
- Frontend Gradle shim (auto-prebuild if missing):
  - ./tic-tac-toe-classic-145105-145114/tic_tac_toe_frontend/android/gradlew

If an analyzer insists on `./gradlew`, call:
- ./tic-tac-toe-classic-145105-145114/run_gradle_check.sh assembleDebug

## Environment Requirements (for native builds)
- Java 17 (Temurin recommended)
- Android SDK + build tools
- Node.js LTS and Expo CLI (via npx)

If these are unavailable, prefer EAS builds for artifacts.
