// coors are a
export default function getRandCoors2(svgContainerDimensions, bugSize) {
  return {
    x:
      Math.floor(Math.random() * (svgContainerDimensions.width - bugSize)) /
      svgContainerDimensions.width,
    y:
      Math.floor(Math.random() * (svgContainerDimensions.height - bugSize)) /
      svgContainerDimensions.height,
  };
}
