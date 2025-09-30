# Standardized CI targets for Expo-managed React Native project

.PHONY: help prepare-ci build-android-ci lint

help:
	@echo "Targets:"
	@echo "  prepare-ci       Ensure Gradle shims are executable"
	@echo "  build-android-ci Run prebuild + Gradle using project scripts"
	@echo "  lint             Run ESLint in frontend"

prepare-ci:
	chmod +x gradlew || true
	chmod +x tic_tac_toe_frontend/android/gradlew || true

build-android-ci: prepare-ci
	cd tic_tac_toe_frontend && npm run build:android:ci

lint:
	cd tic_tac_toe_frontend && npm run lint
