import { afterAll, beforeAll, describe, expect, test, vi } from 'vitest';
import keepParams from './keepParams.ts';

describe('URL Parameter Retention', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'location', {
      value: { search: '?param1=value1&param2=value2' },
      writable: true,
    });
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  describe('Parameter Filtering Behavior', () => {
    test('filters out non-existent parameters from retention list', () => {
      const result = keepParams('/test', ['param1', 'param3']);
      expect(result).toBe('/test?param1=value1');
    });

    test('returns clean path when no parameters are specified for retention', () => {
      const result = keepParams('/test', []);
      expect(result).toBe('/test');
    });
  });

  describe('Parameter Selection Logic', () => {
    test('preserves only requested parameters from current URL', () => {
      const result = keepParams('/test', ['param1']);
      expect(result).toBe('/test?param1=value1');
    });

    test('maintains all specified parameters when they exist in URL', () => {
      const result = keepParams('/test', ['param1', 'param2']);
      expect(result).toBe('/test?param1=value1&param2=value2');
    });
  });
});
