# Tic Tac Toe (Expo Managed) - Root

- Development is under `tic_tac_toe_frontend/` (Expo managed).
- CI should not call `./gradlew` directly in a managed workflow.

Entry points:
- npm run start          -> boots Expo (workspace: frontend)
- npm run lint           -> lints frontend
- ./build.sh             -> CI-safe build shim (no-op unless native project exists)
- ./ci.sh                -> CI entry that runs lint and build shim

If a native Android build is required:
1) cd tic_tac_toe_frontend
2) npm run prebuild:android
3) npm run build-android
