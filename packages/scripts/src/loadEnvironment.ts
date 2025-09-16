import { existsSync } from 'node:fs';
import { join } from 'node:path';
import consola from 'consola';
import prompts from 'prompts';

const PROD_ACCESS_USERS = ['50807636+austinimperial@users.noreply.github.com'];

function hasInfisicalConfig(): boolean {
  const currentDir = __dirname;
  const rootDir = currentDir.includes('packages/scripts/src')
    ? join(currentDir, '../../../../')
    : process.cwd();

  return existsSync(join(rootDir, 'infisical.json'));
}

function parseEnvFile(content: string): Record<string, string> {
  const envVars: Record<string, string> = {};

  for (const line of content.split('\n')) {
    const trimmedLine = line.trim();
    if (trimmedLine && !trimmedLine.startsWith('#')) {
      const equalIndex = trimmedLine.indexOf('=');
      if (equalIndex > 0) {
        const key = trimmedLine.slice(0, equalIndex).trim();
        const value = trimmedLine
          .slice(equalIndex + 1)
          .trim()
          .replace(/^['"]+|['"]+$/g, '');
        envVars[key] = value;
      }
    }
  }

  return envVars;
}

export default async function load(
  env?: 'dev' | 'test' | 'preview' | 'staging' | 'production'
) {
  if (!env) {
    const userEmail = Bun.spawnSync(['git', 'config', 'user.email'])
      .stdout.toString()
      .trim();

    const isProdUser = PROD_ACCESS_USERS.includes(userEmail);

    env = (
      await prompts({
        type: 'select',
        name: 'value',
        message: 'Select env',
        choices: [
          { title: 'dev', value: 'dev' },
          { title: 'test', value: 'test' },
          {
            title: isProdUser ? 'staging' : 'staging (no access)',
            value: 'staging',
            disabled: !isProdUser,
          },
          {
            title: isProdUser ? 'production' : 'production (no access)',
            value: 'production',
            disabled: !isProdUser,
          },
        ],
        onState: (state: { aborted: boolean }) =>
          state.aborted && process.nextTick(() => process.exit(0)),
      })
    ).value;
  }

  consola.info(`Loading ${env} env variables...`);

  if (hasInfisicalConfig()) {
    const envInfisicalString = Bun.spawnSync([
      'infisical',
      'export',
      `--env=${env}`,
    ]).stdout.toString();

    if (
      !envInfisicalString ||
      envInfisicalString.includes('Select your hosting option:')
    ) {
      throw new Error(
        `No env variables found for ${env} env. ` +
          'You may need to run `infisical login`.'
      );
    }

    process.env = {
      ...process.env,
      ...parseEnvFile(envInfisicalString),
    };
  } else {
    consola.info('No infisical.json found, skipping infisical env loading');

    if (process.env.NODE_ENV !== 'test') {
      const proceedWithoutInfisical = await prompts({
        type: 'confirm',
        name: 'value',
        message: 'No infisical config detected, do you still want to proceed?',
        initial: true,
      });

      if (!proceedWithoutInfisical.value) {
        consola.info('Environment loading cancelled by user');
        process.exit(0);
      }
    } else {
      consola.info('Skipping infisical prompt in test env');
    }
  }

  // add local top level env file
  if (env === 'dev') {
    const envFileContent = await Bun.file('.env').text();

    process.env = {
      ...process.env,
      ...parseEnvFile(envFileContent),
    };
  }

  consola.info(`Loaded ${env} env variables`);

  return env!;
}
