import { pathToFileURL } from 'node:url';
import consola from 'consola';
import load from './loadEnvironment';

const current = import.meta.url;
const executedFrom = pathToFileURL(process.argv[1]);
const isDirectExecution = current === executedFrom?.href;

if (isDirectExecution) {
  await load(process.env.APP_ENV);
  await dev();
}

async function dev() {
  consola.info(`Launching ${process.env.APP_ENV} environment...`);

  const child = Bun.spawn(['turbo', 'run', 'dev', '--filter', '@repo/web'], {
    env: process.env,
    stdin: 'inherit',
    stdout: 'inherit',
    stderr: 'inherit',
  });

  let isShuttingDown = false;

  const shutdown = (signal: 'SIGINT' | 'SIGTERM') => {
    if (isShuttingDown) return;
    isShuttingDown = true;

    consola.info(`Received ${signal}, shutting down gracefully...`);
    child.kill(signal);
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));

  // Wait for the child process to exit
  await child.exited;
}
