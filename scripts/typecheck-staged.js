#!/usr/bin/env node

// This script runs type checking for lint-staged
// It ignores the file path arguments and runs type checking on the entire workspace

const { execSync } = require('node:child_process');

try {
  console.log('Running type check...');
  execSync('turbo run check-types', {
    stdio: 'inherit',
    cwd: process.cwd(),
  });
  console.log('Type check passed!');
} catch (_error) {
  console.error('Type check failed!');
  process.exit(1);
}
