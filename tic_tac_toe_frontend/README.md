# Tic Tac Toe Frontend (Expo)

Run locally:
- npm install
- npm start

Lint:
- npm run lint

Build (managed workflow):
- npm run build (CI-safe no-op)
- For native Android build:
  1) npm run prebuild:android
  2) npm run build-android

Notes:
- This is an Expo managed app; there is no android/ or ios/ until prebuild is executed.
- CI tools should not call ./gradlew directly; use root ./build.sh or workspace npm scripts instead.
