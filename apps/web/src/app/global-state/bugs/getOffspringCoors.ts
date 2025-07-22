import type { BugData } from './BugsProvider';

interface SvgDimensions {
  width: number;
  height: number;
}

interface Coordinates {
  x: number;
  y: number;
}

export default function getOffspringCoors(
  maxOffspringDistance: number,
  parent: BugData,
  svgContainerDimensions: SvgDimensions,
  bugSize: number,
  worldWrap: boolean = false
): Coordinates {
  // get random point within given radius
  const randRadius = Math.floor(Math.random() * maxOffspringDistance);
  const randDegree = Math.floor(Math.random() * 360);
  const randRadian = (randDegree * Math.PI) / 180;
  const xStep = Math.cos(randRadian) * randRadius;
  const yStep = Math.sin(randRadian) * randRadius;

  // find bounds of canvas
  const xMax = svgContainerDimensions.width - bugSize;
  const yMax = svgContainerDimensions.height - bugSize;

  // parent coors are ratio
  let newX = parent.x * svgContainerDimensions.width + xStep;
  let newY = parent.y * svgContainerDimensions.height + yStep;

  // handle out-of-bounds coordinates
  if (worldWrap) {
    // wrap around to the other side using modulo arithmetic
    newX = ((newX % xMax) + xMax) % xMax;
    newY = ((newY % yMax) + yMax) % yMax;
  } else {
    // convert out-of-bounds coordinates to on-the-border coordinates
    if (newX > xMax) {
      newX = xMax;
    }
    if (newX < 0) {
      // so that you don't get multiple bugs stacked up in the corners
      newX = Math.floor(Math.random() * 10);
    }
    if (newY > yMax) {
      newY = yMax;
    }
    if (newY < 0) {
      // so that you don't get multiple bugs stacked up in the corners
      newY = Math.floor(Math.random() * 10);
    }
  }

  const result: Coordinates = {
    x: Math.floor(newX) / svgContainerDimensions.width,
    y: Math.floor(newY) / svgContainerDimensions.height,
  };
  return result;
}
