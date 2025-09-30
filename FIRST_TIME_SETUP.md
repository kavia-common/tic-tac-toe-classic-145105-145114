# First-Time Setup

## 1) Install prerequisites
- Node.js LTS (18+)
- npm
- Expo CLI via npx (bundled with dev dependencies)

Optional for native Android builds:
- Java 17 (Temurin)
- Android SDK + build tools

## 2) Install dependencies (frontend)
- cd tic-tac-toe-classic-145105-145114/tic_tac_toe_frontend
- npm ci

## 3) Run in development
- npm start
- npm run android
- npm run ios
- npm run web

## 4) Build native Android (optional)
This is an Expo-managed app; generate the native project via prebuild:
- npm run build:android:ci
  - runs: expo prebuild --platform android
  - then: cd android && ./gradlew assembleDebug

If a tool insists on Gradle from the repo root, use:
- bash tic-tac-toe-classic-145105-145114/ci_build_android.sh
- or make -C tic-tac-toe-classic-145105-145114 build-android-ci

## 5) Read the docs
- Start here: kavia-docs/Project_Documentation_Overview.md
- Specs index: kavia-docs/Index_of_Specs.md
