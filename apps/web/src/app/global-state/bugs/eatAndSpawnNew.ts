import { v4 as uuid } from 'uuid';
import { type BugData, defaultBugData } from './BugsProvider';
import getColorMutation from './getColorMutation';
import getOffspringCoors from './getOffspringCoors';
import { addChild, changeNodeData, createNode, type Node } from './tree';

interface SvgDimensions {
  width: number;
  height: number;
}

export default function eatAndSpawnNew(
  eatenBug: BugData,
  bugs: Node,
  getRandomLivingBugNode: (bugs: Node) => Node,
  maxOffspringDistance: number,
  svgContainerDimensions: SvgDimensions,
  bugSize: number,
  phenotypicDistance: number,
  worldWrap: boolean = false
): Node {
  const newbugs = Object.assign(createNode({ data: defaultBugData }), bugs);

  // eat bug
  changeNodeData(newbugs, eatenBug.id, { isAlive: false });

  // spawn new
  const randomSurvivor = getRandomLivingBugNode(newbugs);
  const offspringCoors = getOffspringCoors(
    maxOffspringDistance,
    randomSurvivor.data!,
    svgContainerDimensions,
    bugSize,
    worldWrap
  );

  const newBug: BugData = {
    x: offspringCoors.x,
    y: offspringCoors.y,
    isAlive: true,
    color: getColorMutation(randomSurvivor.data!, phenotypicDistance),
    id: uuid(),
    orientation: Math.floor(Math.random() * 360),
    clone: randomSurvivor.data!.clone,
  };

  addChild(randomSurvivor, newBug);

  return newbugs;
}
