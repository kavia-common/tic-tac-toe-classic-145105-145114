# Building This Project

This repository uses the Expo Managed Workflow. By default there is no native Android project.

- Development:
  - cd tic_tac_toe_frontend
  - npm install
  - npm start

- CI:
  - The root-level `build.sh` is a CI-safe shim. It will:
    - No-op (exit 0) if no native Android project exists (managed workflow).
    - Delegate to `android/gradlew assembleDebug` if a native project exists (after `expo prebuild`).

- To produce a local Android build:
  1. cd tic_tac_toe_frontend
  2. npm run prebuild:android
  3. npm run build-android
