import getRandomRGB from "./getRandomRGB";
import getRandCoors from "./getRandCoors";
import uuid from "react-uuid";

export default function getInitialBugs(
  canvasDimensions,
  populationSize,
  bugSize
) {
  var newBugs = [];
  for (let i = 0; i < populationSize; i++) {
    const randCoors = getRandCoors(canvasDimensions, bugSize);
    newBugs = [
      ...newBugs,
      {
        x: randCoors.x,
        y: randCoors.y,
        color: getRandomRGB(),
        id: uuid(),
        orientation: Math.floor(Math.random() * 360),
      },
    ];
  }
  return newBugs;
}
