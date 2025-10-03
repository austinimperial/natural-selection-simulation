import uInt8ClampedArrayToPixels from '@repo/utils/image/uInt8ClampedArrayToPixels';

const quantize = require('quantize') as (
  pixels: number[][],
  maxColors: number
) => {
  palette(): number[][];
};

export default function computeImgPalette(
  url: string,
  x: number,
  y: number,
  colorCount: number,
  callback: (palette: number[][]) => void
): void {
  const img = new Image();
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  if (!context) {
    throw new Error('Failed to get 2D context from canvas');
  }

  img.crossOrigin = 'anonymous';
  img.src = url;

  img.onload = () => {
    context.drawImage(img, 0, 0);
    const data = context.getImageData(0, 0, x, y).data;
    const pixels = uInt8ClampedArrayToPixels(data, x * y);
    const colorMap = quantize(pixels, colorCount);
    callback(colorMap.palette());
  };
}
