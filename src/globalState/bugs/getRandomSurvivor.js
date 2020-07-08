import { flatten } from './tree'
export default function getRandomSurvivor(bugNode) {
    const livingBugs = flatten(bugNode).filter(bug => bug.data.isAlive)
    const randIndex = Math.floor(Math.random() * livingBugs.length)
    return livingBugs[randIndex]
}