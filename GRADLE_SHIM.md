# Gradle Shims

This repo is an Expo Managed app. CI tools sometimes try to run `./gradlew` (or `gradle`) from repository root.

- Root-level `gradlew`, `gradlew.bat`, and `gradle` scripts are shims that:
  - Delegate to `./android/gradlew` if it exists (after `expo prebuild`).
  - Otherwise no-op and exit 0 to prevent CI from failing.

If you need to create the native Android project:
1. cd tic_tac_toe_frontend
2. npm run prebuild:android
3. npm run build-android
