#!/usr/bin/env node
/**
 * CI-safe build script for Expo managed projects.
 * - If android/gradlew exists, assume prebuild ran and invoke Gradle assembleDebug.
 * - If not, print an info message and exit 0 to avoid failing CI that expects a "build" script.
 * Converted to CommonJS to avoid ESM runtime errors in Node 18 without type: module.
 */
const { existsSync } = require('fs');
const { spawnSync } = require('child_process');
const path = require('path');

const androidGradle = path.join(process.cwd(), 'android', 'gradlew');

if (!existsSync(androidGradle)) {
  console.log('ci-safe-build: No android/gradlew detected. This is an Expo managed project.');
  console.log("ci-safe-build: Skipping native build. Use 'npm run build-android' after running 'npm run prebuild:android'.");
  process.exit(0);
}

console.log('ci-safe-build: Detected android/gradlew. Running assembleDebug...');
const result = spawnSync('./gradlew', ['assembleDebug'], {
  cwd: path.join(process.cwd(), 'android'),
  stdio: 'inherit',
  shell: true,
});

process.exit(result.status ?? 1);
