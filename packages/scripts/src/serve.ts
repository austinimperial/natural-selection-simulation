import { pathToFileURL } from 'node:url';
import consola from 'consola';
import loadEnvironment from './loadEnvironment.ts';

const current = import.meta.url;
const executedFrom = pathToFileURL(process.argv[1]);
const isDirectExecution = current === executedFrom?.href;

if (isDirectExecution) {
  await loadEnvironment(process.env.APP_ENV);
  await serve();
}
async function serve() {
  consola.info(`Serving up ${process.env.APP_ENV} environment...`);

  Bun.spawnSync(['bun', 'run', 'build'], {
    env: process.env,
    stdout: 'inherit',
    stderr: 'inherit',
  });

  const child = Bun.spawn(['bun', 'start'], {
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

    // Give the child process time to shut down gracefully
    setTimeout(() => {
      if (!child.killed) {
        consola.warn(
          'Child process did not shut down gracefully, forcing exit...'
        );
        process.exit(1);
      }
    }, 5000);
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));

  // Handle process exit
  process.on('exit', () => {
    if (!child.killed) {
      child.kill('SIGTERM');
    }
  });

  // Wait for the child process to exit
  await child.exited;
}
