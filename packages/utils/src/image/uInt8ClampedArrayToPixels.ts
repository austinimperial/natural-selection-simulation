export default function uInt8ClampedArrayToPixels(
  uInt: Uint8ClampedArray,
  pixelCount: number
): number[][] {
  const pixels: number[][] = [];
  for (let i = 0; i < pixelCount * 4; i += 4) {
    pixels.push([uInt[i], uInt[i + 1], uInt[i + 2]]);
  }
  return pixels;
}
