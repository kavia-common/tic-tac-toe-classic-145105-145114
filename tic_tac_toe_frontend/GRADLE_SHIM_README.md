# Gradle Shim (Frontend)

This is an Expo-managed app; there is no native `android/` until you run Expo prebuild.

If a tool or analyzer invokes `./gradlew` from this folder:
- Use the shim `./gradlew` (added here) which will:
  - Delegate to `android/gradlew` if present
  - Or call `android/gradlew.sh` which auto-runs Expo prebuild

Recommended commands:
- Development: `npm start`
- Lint/Typecheck: `npm run verify`
- Android build (debug): `npm run build:android:ci` (performs prebuild then Gradle)
- Workspace helper: `bash ../ci_build_android.sh`

If the shim still fails, ensure Node/Expo are available or prefer EAS builds for release.
