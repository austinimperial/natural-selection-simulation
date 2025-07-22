import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    coverage: {
      all: true,
      enabled: true,
      exclude: ['**/node_modules/**'],
      include: ['**/src/**'],
      provider: 'v8',
      reporter: ['json', 'lcov'],
      reportOnFailure: true,
      reportsDirectory: './.coverage',
    },
    env: { TZ: 'UTC' },
    globalSetup: '../../packages/vitest-config/src/setup/global-setup.ts',
    passWithNoTests: true,
    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          exclude: ['e2e-tests/**', '**/*.int.spec.ts?(x)'],
          include: ['**/*.spec.ts?(x)'],
          environment: 'happy-dom',
        },
      },
      {
        extends: true,
        test: {
          name: 'integration',
          include: ['**/*.int.spec.ts?(x)'],
          setupFiles: [
            '../../packages/vitest-config/src/setup/integration/pre-test-setup.ts',
          ],
          poolOptions: { forks: { singleFork: true } },
        },
      },
    ],
    environment: 'happy-dom',
    exclude: ['**/node_modules', '**/*.spec.tsx'],
  },
});
