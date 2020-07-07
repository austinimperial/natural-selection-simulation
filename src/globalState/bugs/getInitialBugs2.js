import getRandomRGB from "./getRandomRGB";
import getRandCoors from "./getRandCoors";
import uuid from "react-uuid";
import { Node, flatten } from './tree'

export default function getInitialBugs2(
  canvasDimensions,
  populationSize,
  bugSize
) {

  let root = new Node()
  for (let i=0; i < populationSize; i++) {
    const randCoors = getRandCoors(canvasDimensions, bugSize);

    root.addChild({
        x: randCoors.x,
        y: randCoors.y,
        ancestor: i,
        color: getRandomRGB(),
        id: uuid(),
        orientation: Math.floor(Math.random() * 360)
    })
  }

  console.log(flatten(root))
  return root
}