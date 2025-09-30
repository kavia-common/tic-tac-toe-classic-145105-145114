# Frontend Gradle Settings Shim

This file (`settings.gradle`) ensures that when Gradle is invoked from inside `tic_tac_toe_frontend/`, it includes only the generated `android/` project, preventing Gradle from using the repository-root `settings.gradle`.

Notes:
- This is primarily for CI/analyzers that insist on calling `./gradlew` before Expo prebuild.
- Correct native build flow remains:
  1) `npm ci`
  2) `npm run build:android:ci` (runs Expo prebuild then `./android/gradlew assembleDebug`)
- For development: `npm start`
