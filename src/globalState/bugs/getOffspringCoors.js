export default function getOffspringCoors(
  maxOffspringDistance,
  eatenBug,
  canvasDimensions,
  bugSize
) {
  // get random point within given radius
  const randRadius = Math.floor(Math.random() * maxOffspringDistance);
  const randDegree = Math.floor(Math.random() * 360);
  const randRadian = (randDegree * Math.PI) / 180;
  const xStep = Math.cos(randRadian) * randRadius;
  const yStep = Math.sin(randRadian) * randRadius;

  // find bounds of canvas
  const xMax = canvasDimensions.width - bugSize;
  const yMax = canvasDimensions.height - bugSize;

  var newX = eatenBug.x + xStep;
  var newY = eatenBug.y + yStep;

  if (newX > xMax) {
    newX = xMax;
  }
  if (newX < 0) {
    newX = 0;
  }
  if (newY > yMax) {
    newY = yMax;
  }
  if (newY < 0) {
    newY = 0;
  }

  const result = {
    x: Math.floor(newX),
    y: Math.floor(newY),
  };
  return result;
}
