interface SvgDimensions {
  width: number;
  height: number;
}

interface Coordinates {
  x: number;
  y: number;
}

export default function getRandCoors(
  svgContainerDimensions: SvgDimensions,
  bugSize: number
): Coordinates {
  return {
    x:
      Math.floor(Math.random() * (svgContainerDimensions.width - bugSize)) /
      svgContainerDimensions.width,
    y:
      Math.floor(Math.random() * (svgContainerDimensions.height - bugSize)) /
      svgContainerDimensions.height,
  };
}
