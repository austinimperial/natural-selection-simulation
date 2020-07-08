//import getNewOffspring2 from "./getNewOffspring2";
import { Node, changeNodeData, addChild, flatten } from './tree'
import uuid from 'react-uuid'
import getOffspringCoors from './getOffspringCoors'
import getColorMutation from './getColorMutation'

export default function eatAndSpawn2(
    eatenBug,
    bugs2,
    getRandomSurvivor,
    maxOffspringDistance,
    canvasDimensions,
    bugSize,
    maxMutationStep
  ) {
    let newBugs2 = Object.assign(new Node({}), bugs2)

    // eat bug
    changeNodeData(newBugs2,eatenBug.id,{isAlive:false})

    // spawn new
    const randomSurvivor = getRandomSurvivor(newBugs2)
    const offspringCoors = getOffspringCoors(maxOffspringDistance,eatenBug,canvasDimensions,bugSize)

    const newBug = {
        x: offspringCoors.x,
        y: offspringCoors.y,
        isAlive: true,
        color: getColorMutation(randomSurvivor.data,maxMutationStep),
        id: uuid(),
        orientation: Math.floor(Math.random() * 360)
    }

    addChild(randomSurvivor,newBug)

    return newBugs2
  }

