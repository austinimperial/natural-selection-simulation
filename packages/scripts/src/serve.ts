import { pathToFileURL } from 'node:url'
import envLoad from '@repo/env/load.ts'
import consola from 'consola'

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  await envLoad()
  await serve()
}

/**
 * Build and start an environment locally.
 *
 * @usage bun serve
 */
async function serve() {
  consola.info(`Starting ${process.env.APP_ENV} environment...`)

  process.env.BETTER_AUTH_URL = 'http://localhost:3000'
  process.env.NEXT_PUBLIC_INTERCOM_APP_ID = undefined
  process.env.PRODUCTION_SOURCE_MAPS = 'true'
  process.env.SKIP_BUILD_TYPE_CHECK = 'true'

  if (process.env.APP_ENV === 'test') {
    process.env.TZ = 'UTC'
  }

  Bun.spawnSync(['bun', 'run', 'build'], {
    env: process.env,
    stdout: 'inherit',
    stderr: 'inherit',
  })

  Bun.spawn(['bun', 'start'], {
    env: process.env,
    stdout: 'inherit',
    stderr: 'inherit',
  })
}
