export default function getRandCoors(canvasDimensions, bugSize) {
  return {
    x: Math.floor(Math.random() * (canvasDimensions.width - bugSize)),
    y: Math.floor(Math.random() * (canvasDimensions.height - bugSize)),
  };
}
