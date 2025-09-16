// import { flatten } from "./tree";
// export default function getRandomLivingBugNode(bugNode) {
//   const livingBugs = flatten(bugNode).filter((bug) => bug.data.isAlive);
//   const randIndex = Math.floor(Math.random() * livingBugs.length);
//   return livingBugs[randIndex];
// }

import { getLivingBugNodes, type Node } from './tree';

export default function getRandomLivingBugNode(bugNode: Node): Node {
  const livingBugs = getLivingBugNodes(bugNode) as Node[];
  const randIndex = Math.floor(Math.random() * livingBugs.length);
  return livingBugs[randIndex];
}
