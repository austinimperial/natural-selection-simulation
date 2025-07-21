import { v4 as uuid } from "uuid";
import getRandCoors from "./getRandCoors";
import getRandomRGB from "./getRandomRGB";
import { addChild, createNode, type Node } from "./tree";

interface SvgDimensions {
  width: number;
  height: number;
}

export default function getInitialBugs(
  svgContainerDimensions: SvgDimensions,
  populationSize: number,
  bugSize: number
): Node {
  const root = createNode({ isRoot: true });
  for (let i = 0; i < populationSize; i++) {
    const randCoors = getRandCoors(svgContainerDimensions, bugSize);
    addChild(root, {
      x: randCoors.x,
      y: randCoors.y,
      isAlive: true,
      color: getRandomRGB(),
      id: uuid(),
      orientation: Math.floor(Math.random() * 360),
      clone: false,
    });
  }
  return root;
}
