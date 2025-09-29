# tic-tac-toe-classic-145105-145114

This is an Expo managed React Native Tic Tac Toe app.

Run locally:
- npm install
- npm start

Build notes:
- This is an Expo managed workflow; by default there is no android/ folder.
- The `npm run build` script is CI-safe and will no-op unless a native project exists.
- To produce a native Android build locally:
  1) npm run prebuild:android
  2) npm run build-android

Alternatively, use EAS for builds:
- npx expo install expo-dev-client
- npx expo prebuild
- eas build -p android