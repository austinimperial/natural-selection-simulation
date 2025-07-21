import { v4 as uuid } from "uuid";
import getRandCoors from "./getRandCoors";
import { addChild, type Node } from "./tree";
import  {type PopulationSnapshot, defaultNode } from "./BugsProvider";

interface SvgDimensions {
  width: number;
  height: number;
}

export default function getCustomInitialBugs(
  svgContainerDimensions: SvgDimensions,
  bugSize: number,
  customColorArray: PopulationSnapshot
): Node {
  const root: Node = defaultNode;
  for (let i = 0; i < customColorArray.length; i++) {
    const randCoors = getRandCoors(svgContainerDimensions, bugSize);
    addChild(root, {
      x: randCoors.x,
      y: randCoors.y,
      isAlive: true,
      color: customColorArray[i].color,
      id: uuid(),
      orientation: Math.floor(Math.random() * 360),
      clone: customColorArray[i].clone,
    });
  }
  return root;
}
