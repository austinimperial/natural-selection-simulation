import uInt8ClampedArrayToPixels from "./uInt8ClampedArrayToPixels";
const quantize = require("quantize");

export default function computeImgPalette(url, x, y, colorCount, callback) {
  var img = new Image();
  var canvas = document.createElement("canvas");
  var context = canvas.getContext("2d");
  img.onload = () => {
    context.drawImage(img, 0, 0);
    const data = context.getImageData(0, 0, x, y).data;
    const pixels = uInt8ClampedArrayToPixels(data, x * y);
    const colorMap = quantize(pixels, colorCount);
    callback(colorMap.palette());
  };
  img.src = url;
}
