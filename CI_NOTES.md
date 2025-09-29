# CI Notes for Expo Managed App

This repository uses the Expo Managed Workflow.

- There is no native `android/` or `ios/` directory unless you run `expo prebuild`.
- The `npm run build` script is CI-safe and will:
  - No-op with exit code 0 if `android/gradlew` is not found.
  - If `expo prebuild` has been run and `android/gradlew` exists, it will execute `./gradlew assembleDebug`.

Recommended CI steps:
1. npm ci
2. npm run lint
3. npm run build  (this will no-op unless prebuild is done)

If you need a native build within CI:
- Run `npm run prebuild:android` before `npm run build-android`.

For cloud builds:
- Prefer EAS: https://docs.expo.dev/build/
