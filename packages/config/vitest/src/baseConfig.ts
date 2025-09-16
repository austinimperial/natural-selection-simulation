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
    },
    passWithNoTests: true,
    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          exclude: ['e2e-tests/**', '**/node_modules/**'],
          include: ['**/*.spec.ts?(x)', '**/*.test.ts?(x)'],
          environment: 'happy-dom',
        },
      },
    ],
    environment: 'happy-dom',
    exclude: ['**/node_modules', '**/*.spec.tsx'],
    include: ['**/*.spec.ts?(x)', '**/*.test.ts?(x)'],
  },
});
