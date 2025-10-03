declare module 'quantize' {
  interface ColorMap {
    palette(): number[][];
  }

  function quantize(pixels: number[][], maxColors: number): ColorMap;

  export = quantize;
}
