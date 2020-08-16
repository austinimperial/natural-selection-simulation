// import { flatten } from "./tree";
// export default function getRandomLivingBugNode(bugNode) {
//   const livingBugs = flatten(bugNode).filter((bug) => bug.data.isAlive);
//   const randIndex = Math.floor(Math.random() * livingBugs.length);
//   return livingBugs[randIndex];
// }

import { getLivingBugNodes } from "./tree";
export default function getRandomLivingBugNode(bugNode) {
  const livingBugs = getLivingBugNodes(bugNode);
  const randIndex = Math.floor(Math.random() * livingBugs.length);
  return livingBugs[randIndex];
}
