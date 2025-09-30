# Tic Tac Toe Frontend (React Native + Expo)

[![Expo Managed](https://img.shields.io/badge/Expo-Managed-blue)](#)
[![React%20Native](https://img.shields.io/badge/React%20Native-0.79.x-61dafb)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178c6)](#)

## Quick Start

### Install
- npm ci
- expo install @react-navigation/native @react-navigation/native-stack react-native-screens react-native-safe-area-context
- expo install @react-native-async-storage/async-storage

### Run (Dev)
- Start: npm start
- Android: npm run android
- iOS: npm run ios
- Web: npm run web

## Features (MVP)
- Home, Game, Settings screens
- PvP and PvAI (Easy/Normal)
- Game Over modal flow
- Ocean Professional theme (colors, shadows, rounded corners)
- Settings and Stats with AsyncStorage persistence

## Build Notes (Android)

This is an Expo-managed project. Native android/ is generated on demand.

- Local debug build (generates android/ then builds):
  - npm run build:android:ci

- Do not call ./gradlew before prebuild. If a tool insists on Gradle, use:
  - ../../ci_build_android.sh
  - or make -C .. build-android-ci

## Scripts

- start: expo start
- android: expo start --android
- ios: expo start --ios
- web: expo start --web
- lint: eslint .
- prebuild:android: expo prebuild --platform android
- build:android:local: prebuild then ./gradlew assembleDebug
- build:android:ci: expo prebuild then ./gradlew assembleDebug

## Architecture & Docs

- PRD: ../../kavia-docs/PRD_Tic_Tac_Toe_Mobile_App.md
- Architecture: ../../kavia-docs/Architecture_Tic_Tac_Toe_Mobile_App.md
- Design Style: ../../kavia-docs/Design_Style_Guide.md
- Developer Onboarding: ../../kavia-docs/Developer_Onboarding_Guide.md
- Build & CI:
  - ../../kavia-docs/Build_and_Run_Guide.md
  - ../../kavia-docs/CI_Configuration_Guide.md
  - ../../kavia-docs/CI_Troubleshooting.md
- Implementation Plan: ../../kavia-docs/Implementation_Plan.md
- Roadmap: ../../kavia-docs/Roadmap.md

## Notes

- Theme: Ocean Professional (blue and amber accents, minimalist, subtle gradients and shadows).
- State: hooks + Context (settings, stats); game state local to GameScreen.
- AI: strategy-based (Easy random, Normal heuristics; Hard/minimax later).
