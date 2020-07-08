import getRandomRGB from "./getRandomRGB";
import getRandCoors from "./getRandCoors";
import uuid from "react-uuid";
import { Node, addChild } from './tree'

export default function getInitialBugs2(
  canvasDimensions,
  populationSize,
  bugSize
) {

  let root = new Node({isRoot:true})
  for (let i=0; i < populationSize; i++) {
    const randCoors = getRandCoors(canvasDimensions, bugSize);
    addChild(root,{
        x: randCoors.x,
        y: randCoors.y,
        isAlive: true,
        color: getRandomRGB(),
        id: uuid(),
        orientation: Math.floor(Math.random() * 360)
    })
  }
  return root
}