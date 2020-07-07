import getOffspringCoors from "./getOffspringCoors";
import getColorMutation from "./getColorMutation";
import uuid from "react-uuid";
import { Node } from './tree'

// picks a random surviving bug (aka not the just-eaten bug) as the parent bug for color mutation
// mutates color, chooses new random coordinates within the given radius of the just-eaten bug
export default function getNewOffspring(
  canvasDimensions,
  maxOffspringDistance,
  eatenBug,
  allBugs,
  bugSize,
  i,
  populationSize,
  maxMutationStep
) {

}
