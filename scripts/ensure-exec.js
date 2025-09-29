#!/usr/bin/env node
/**
 * Ensure executable bits are set on shell scripts for CI environments that strip file modes.
 * Converted to CommonJS to avoid ESM runtime errors during npm prepare.
 */
const { chmodSync, existsSync } = require('fs');

const files = [
  './gradlew',
  './gradle',
  './build.sh',
  './tic_tac_toe_frontend/scripts/ci-safe-build.js',
];

for (const f of files) {
  if (existsSync(f)) {
    try {
      chmodSync(f, 0o755);
      console.log(`ensure-exec: set +x ${f}`);
    } catch (e) {
      console.warn(`ensure-exec: failed to chmod ${f}`, e);
    }
  }
}
