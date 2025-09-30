# tic-tac-toe-classic-145105-145114

## CI and Build Notes

This repo uses an Expo-managed workflow. To avoid Gradle errors in CI:

- Preferred: Use EAS builds for release artifacts.
- For local native build in CI:
  - make build-android-ci
  - or run: (cd tic_tac_toe_frontend && npm run build:android:ci)

Ensure executables are set for gradle shims:
- make prepare-ci

See documentation:
- kavia-docs/Build_and_Run_Guide.md
- For analyzers that insist on Gradle: ./run_gradle_check.sh (runs prebuild and delegates to proper wrapper)
- kavia-docs/CI_Configuration_Guide.md
- kavia-docs/CI_Troubleshooting.md
- tic-tac-toe-classic-145105-145114/NOTICE_BUILD.md