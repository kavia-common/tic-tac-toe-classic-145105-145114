#!/usr/bin/env node
/**
 * Node Gradle wrapper proxy for CI tools that invoke gradlew.js
 * Delegates to android/gradlew if present, otherwise no-ops for Expo managed workflows.
 */
import { existsSync } from 'fs';
import { spawnSync } from 'child_process';
import path from 'path';
import process from 'process';

const androidGradle = path.join(process.cwd(), 'android', 'gradlew');
if (existsSync(androidGradle)) {
  const res = spawnSync(androidGradle, process.argv.slice(2), {
    cwd: path.join(process.cwd(), 'android'),
    stdio: 'inherit',
    shell: true,
  });
  process.exit(res.status ?? 0);
} else {
  console.log('gradlew.js proxy: No native Android project (Expo managed). Skipping Gradle build.');
  process.exit(0);
}
