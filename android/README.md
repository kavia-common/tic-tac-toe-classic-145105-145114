# Android Folder Redirect (Expo-Managed Workflow)

This repository is an Expo-managed React Native app. The native Android project is not committed by design.

If your tooling expects `android/` at the repository root:
- Use the CI entrypoints documented in:
  - kavia-docs/CI_Configuration_Guide.md
  - kavia-docs/CI_Troubleshooting.md
  - kavia-docs/Build_and_Run_Guide.md

To generate a local native Android project:
- cd tic-tac-toe-classic-145105-145114/tic_tac_toe_frontend
- npx expo prebuild --platform android

The real native project will be created at:
- tic-tac-toe-classic-145105-145114/tic_tac_toe_frontend/android

If your CI must call Gradle directly, run:
- cd tic_tac_toe_frontend && npm run build:android:ci

Do not commit generated native code unless migrating away from the Expo-managed workflow.
