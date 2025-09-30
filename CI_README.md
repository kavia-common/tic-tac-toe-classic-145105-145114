# CI Notes for Tic Tac Toe Frontend

This repository uses an Expo-managed React Native app. There is no android/ or ios/ directory until you run an Expo prebuild.

- The default `npm run build` is intentionally a no-op. CI systems that automatically call `npm run build` should instead call:
  - `npm run build:android:ci` from tic_tac_toe_frontend directory, or
  - Prefer EAS builds for release workflows.

Steps for local native build in CI:
1. npm ci
2. npm run build:android:ci

See:
- kavia-docs/Build_and_Run_Guide.md
- kavia-docs/CI_Configuration_Guide.md
