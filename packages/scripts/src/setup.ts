import { execSync } from 'node:child_process';
import { existsSync, readdirSync, rmSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import consola from 'consola';

const current = import.meta.url;
const executedFrom = pathToFileURL(process.argv[1]);
const isDirectExecution = current === executedFrom?.href;

if (isDirectExecution) {
  await setup();
  process.exit(0);
}

function getRootDir(): string {
  let currentDir = process.cwd();

  while (currentDir !== join(currentDir, '..')) {
    if (
      existsSync(join(currentDir, '.git')) &&
      existsSync(join(currentDir, 'bun.lockb')) &&
      existsSync(join(currentDir, 'turbo.json')) &&
      existsSync(join(currentDir, 'package.json')) &&
      existsSync(join(currentDir, 'apps'))
    ) {
      return currentDir;
    }

    currentDir = join(currentDir, '..');
  }

  return process.cwd();
}

async function setup() {
  try {
    consola.info('Starting setup process...');
    await cleanupDirectories();
    await installDependencies();
    consola.success('Setup completed successfully!');
  } catch (error) {
    consola.error('Setup failed:', error);
    process.exit(1);
  }
}

async function cleanupDirectories() {
  consola.info('Cleaning up directories and files...');

  const patterns = [
    '.cache',
    '.coverage',
    '.next',
    '.tmp',
    'turbo',
    'node_modules',
    'playwright/results',
    'tsconfig.tsbuildinfo',
  ];

  for (const pattern of patterns) {
    try {
      await removePattern(getRootDir(), pattern);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      consola.warn(`Failed to clean ${pattern}:`, errorMessage);
    }
  }
}

async function removePattern(dir: string, pattern: string): Promise<void> {
  try {
    const items = readdirSync(dir);

    for (const item of items) {
      const fullPath = join(dir, item);
      const stat = statSync(fullPath);

      if (stat.isDirectory()) {
        if (item === pattern) {
          consola.info(`Removing directory: ${fullPath}`);
          rmSync(fullPath, { recursive: true, force: true });
        } else {
          await removePattern(fullPath, pattern);
        }
      } else if (stat.isFile() && item === pattern) {
        consola.info(`Removing file: ${fullPath}`);
        rmSync(fullPath, { force: true });
      }
    }
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code !== 'ENOENT') {
      throw error;
    }
  }
}

async function installDependencies() {
  consola.info('Installing dependencies...');

  try {
    execSync('bun install --frozen-lockfile', {
      stdio: 'inherit',
      env: process.env,
    });
    consola.success('Dependencies installed with bun');
  } catch {
    consola.error('dependencies failed to install with frozen lockfile');
  }
}
