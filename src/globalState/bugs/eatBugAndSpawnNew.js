// import getNewOffspring from "./getNewOffspring";

// export default function eatBugAndSpawnNew(
//   i,
//   setBugs,
//   canvasDimensions,
//   maxOffspringDistance,
//   allBugs,
//   bugSize,
//   populationSize,
//   maxMutationStep,
// ) {
//   setBugs((prevBugs) => {
//     const newBugs = [...prevBugs];

//     const eatenBug = newBugs.splice(i, 1);
//     // turn this on to keep all bugs by pushing eaten bugs to back of the array
//     // otherwise they are removed from the array
//     //newBugs.push(eatenBug[0]);

//     const offspring = getNewOffspring(
//       canvasDimensions,
//       maxOffspringDistance,
//       eatenBug[0],
//       allBugs,
//       bugSize,
//       i,
//       populationSize,
//       maxMutationStep
//     );

//     // put the new bug at the frong of the array
//     return [offspring, ...newBugs];
//   });
// }

import getNewOffspring from "./getNewOffspring";

export default function eatBugAndSpawnNew(
  i,
  canvasDimensions,
  maxOffspringDistance,
  allBugs,
  bugSize,
  populationSize,
  maxMutationStep
) {
  let survivors = [...allBugs];
  const eatenBug = survivors.splice(i, 1);

  const offspring = getNewOffspring(
    canvasDimensions,
    maxOffspringDistance,
    eatenBug[0],
    allBugs,
    bugSize,
    i,
    populationSize,
    maxMutationStep
  );

  const newBugs = [offspring, ...survivors];
  return newBugs;
}
