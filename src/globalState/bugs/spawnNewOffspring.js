import getOffspringCoors from "./getOffspringCoors";
import getColorMutation from './getColorMutation'

const getRandomSurvivor = (allBugs,indexOfEatenBug) => {
  const onlySurvivors = [...allBugs]
  onlySurvivors.splice(indexOfEatenBug,1)
  return allBugs[Math.floor(Math.random() * onlySurvivors.length)]
}

// picks a random surviving bug (aka not the just-eaten bug) as the parent bug for color mutation
// mutates color, chooses new random coordinates within the given radius of the just-eaten bug
export default function spawnNewOffspring(
  setBugs,
  canvasDimensions,
  maxOffspringDistance,
  eatenBug,
  allBugs,
  bugSize,
  i
) {
  setBugs((prevBugs) => {
    const offSpringCoors = getOffspringCoors(
      maxOffspringDistance,
      eatenBug,
      canvasDimensions,
      bugSize
    );
    const newBug = {
      x: offSpringCoors.x,
      y: offSpringCoors.y,
      color: getColorMutation(getRandomSurvivor(allBugs,i),maxOffspringDistance),
    };
    const newBugs = [...prevBugs, newBug];
    return newBugs;
  });
}

