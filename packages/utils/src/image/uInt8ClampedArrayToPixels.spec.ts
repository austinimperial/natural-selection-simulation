import { describe, expect, it } from 'vitest';
import uInt8ClampedArrayToPixels from './uInt8ClampedArrayToPixels';

describe('uInt8ClampedArrayToPixels', () => {
  it('should convert Uint8ClampedArray to array of RGB pixel values', () => {
    // Create a Uint8ClampedArray representing 2 pixels (8 values: RGBA for each pixel)
    const uInt = new Uint8ClampedArray([255, 0, 0, 255, 0, 255, 0, 255]); // Red pixel, Green pixel
    const pixelCount = 2;

    const result = uInt8ClampedArrayToPixels(uInt, pixelCount);

    // The function should correctly process both pixels
    expect(result).toEqual([
      [255, 0, 0], // Red pixel (RGB)
      [0, 255, 0], // Green pixel (RGB)
    ]);
  });

  it('should handle single pixel correctly', () => {
    const uInt = new Uint8ClampedArray([128, 64, 192, 255]); // Single purple pixel
    const pixelCount = 1;

    const result = uInt8ClampedArrayToPixels(uInt, pixelCount);

    expect(result).toEqual([[128, 64, 192]]);
  });

  it('should handle multiple pixels correctly', () => {
    // 3 pixels: Red, Green, Blue
    const uInt = new Uint8ClampedArray([
      255,
      0,
      0,
      255, // Red
      0,
      255,
      0,
      255, // Green
      0,
      0,
      255,
      255, // Blue
    ]);
    const pixelCount = 3;

    const result = uInt8ClampedArrayToPixels(uInt, pixelCount);

    expect(result).toEqual([
      [255, 0, 0], // Red
      [0, 255, 0], // Green
      [0, 0, 255], // Blue
    ]);
  });

  it('should handle zero pixels', () => {
    const uInt = new Uint8ClampedArray([]);
    const pixelCount = 0;

    const result = uInt8ClampedArrayToPixels(uInt, pixelCount);

    expect(result).toEqual([]);
  });
});
