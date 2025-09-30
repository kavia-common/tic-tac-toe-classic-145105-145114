# Build Guide (Repository Root)

## Overview
This repository is an Expo-managed React Native project. Native Android and iOS projects are not committed by design. If a build system or analyzer attempts to run `./gradlew` at the root, it will fail unless native projects are generated first.

## Correct Commands

### Recommended CI Entry
- bash tic-tac-toe-classic-145105-145114/ci_build_android.sh

### Makefile Target
- make -C tic-tac-toe-classic-145105-145114 build-android-ci

### Direct (from frontend app)
- cd tic-tac-toe-classic-145105-145114/tic_tac_toe_frontend
- npm run build:android:ci

These commands:
- Run Expo prebuild to generate android/
- Then invoke Gradle using the generated wrapper

## Notes
- Do not call `./gradlew` directly at the repository root without prebuild.
- If a tool insists on calling Gradle from the root, use the shims provided:
  - ./tic-tac-toe-classic-145105-145114/gradlew
  - ./tic-tac-toe-classic-145105-145114/android/gradlew
- Ensure Java 17 and the Android SDK are available for native builds, or prefer EAS builds for release artifacts.

## References
- kavia-docs/Build_and_Run_Guide.md
- kavia-docs/CI_Configuration_Guide.md
- kavia-docs/CI_Troubleshooting.md
- tic-tac-toe-classic-145105-145114/MOBILE_BUILD_ANALYZER_README.md
