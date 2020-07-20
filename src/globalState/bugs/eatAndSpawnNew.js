//import getNewOffspring2 from "./getNewOffspring2";
import { Node, changeNodeData, addChild } from "./tree";
import uuid from "react-uuid";
import getOffspringCoors from "./getOffspringCoors";
import getColorMutation from "./getColorMutation";

export default function eatAndSpawnNew(
  eatenBug,
  bugs,
  getRandomLivingBugNode,
  maxOffspringDistance,
  svgContainerDimensions,
  bugSize,
  maxMutationStep
) {
  let newbugs = Object.assign(new Node({}), bugs);

  // eat bug
  changeNodeData(newbugs, eatenBug.id, { isAlive: false });

  // spawn new
  const randomSurvivor = getRandomLivingBugNode(newbugs);
  const offspringCoors = getOffspringCoors(
    maxOffspringDistance,
    randomSurvivor.data,
    svgContainerDimensions,
    bugSize
  );

  const newBug = {
    x: offspringCoors.x,
    y: offspringCoors.y,
    isAlive: true,
    color: getColorMutation(randomSurvivor.data, maxMutationStep),
    id: uuid(),
    orientation: Math.floor(Math.random() * 360),
  };

  addChild(randomSurvivor, newBug);

  return newbugs;
}
