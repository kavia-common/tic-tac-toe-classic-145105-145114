#!/usr/bin/env node
/**
 * Root build delegator for CI/analyzers.
 * Calls the frontend workspace build script which is CI-safe for Expo managed apps.
 */
import { spawnSync } from 'child_process';

const res = spawnSync('npm', ['run', '--workspace', 'tic_tac_toe_frontend', 'build'], {
  stdio: 'inherit',
  shell: true,
});
process.exit(res.status ?? 0);
