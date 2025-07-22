import { afterEach, beforeEach, vi } from 'vitest';

beforeEach(async () => {
  vi.useFakeTimers();
  const mockedDate = new Date('2025-06-1');
  vi.setSystemTime(mockedDate);
});

afterEach(() => {
  // Restore date after each test run
  vi.useRealTimers();
});
