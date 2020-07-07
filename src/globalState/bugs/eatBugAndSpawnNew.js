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
