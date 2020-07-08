import { flatten } from './tree'
export default function getLivingBugs(bugsNode) {
    const result =  flatten(bugsNode).filter(node => node.data.isAlive).map(bug => bug.data)
    return result
}