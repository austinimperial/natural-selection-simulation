import getRandCoors from "./getRandCoors";
import uuid from "react-uuid";
import { Node, addChild } from "./tree";

export default function getCustomInitialBugs(
  svgContainerDimensions,
  bugSize,
  customColorArray
) {
  let root = new Node({ isRoot: true });
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