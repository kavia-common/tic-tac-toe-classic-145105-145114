# CI Help for Expo-Managed App

This app uses Expo-managed workflow. There is no native `android/` until you run Expo prebuild.

Recommended CI tasks:
- Lint and Typecheck only (fast): `npm run verify`
- Android debug build:
  1) `npm ci`
  2) `npm run build:android:ci` (runs Expo prebuild, then Gradle)

If your CI tries `./gradlew` at the repo root, use:
- `bash ../../ci_build_android.sh` from the workspace root, or
- `make -C .. build-android-ci`

Notes:
- Prefer EAS for release builds.
- Ensure Java 17 and Android SDK are available for native builds.
