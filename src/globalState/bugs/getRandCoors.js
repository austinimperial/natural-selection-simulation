
export default function getRandCoors(svgContainerDimensions, bugSize) {
  return {
    x:
      Math.floor(Math.random() * (svgContainerDimensions.width - bugSize)) /
      svgContainerDimensions.width,
    y:
      Math.floor(Math.random() * (svgContainerDimensions.height - bugSize)) /
      svgContainerDimensions.height,
  };
}
