import { pathToFileURL } from "node:url";

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  await setup();

  process.exit(0);
}

/**
 * Set up an environment.
 *
 * Run this whenever you change git branches to quickly set up your environment.
 *
 * @usage bun setup
 */
async function setup() {
  Bun.spawnSync(
    [
      "bunx",
      "trash-cli",
      "'**/.cache/'",
      "'**/.coverage/'",
      "'**/.next/'",
      "'**/.react-email/'",
      "'**/.tmp/'",
      "'**/node_modules/'",
      "'**/playwright/results/'",
      "'**/tsconfig.tsbuildinfo'",
    ],
    {
      env: process.env,
      stdout: "inherit",
    }
  );

  Bun.spawnSync(["bun", "install", "--frozen-lockfile"], {
    env: process.env,
    stdout: "inherit",
  });

  Bun.spawnSync(["bun", "db:generate"], {
    env: process.env,
    stdout: "inherit",
  });

  // const { default: seedLoadSQL } = await import('./seed/loadSQL.ts')

  // await seedLoadSQL({ fromCommandLine: true })
}
