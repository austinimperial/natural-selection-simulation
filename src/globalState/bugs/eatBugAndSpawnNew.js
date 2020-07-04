import getNewOffspring from "./getNewOffspring";

export default function eatBugAndSpawnNew(
  i,
  setBugs,
  canvasDimensions,
  maxOffspringDistance,
  allBugs,
  bugSize,
  populationSize,
  maxMutationStep
) {
  setBugs((prevBugs) => {
    const newBugs = [...prevBugs];

    // move eaten bug to end of array
    const eatenBug = newBugs.splice(i, 1);
    newBugs.push(eatenBug[0]);

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

    // put the new bug at the frong of the array
    return [offspring, ...newBugs];
  });
}
