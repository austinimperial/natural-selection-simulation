class Organism {
    constructor() {
        this.id = null
        this.pointList = null
        this.color = null
    }
}

function updatePointlist(id,array,pathItem) {
    array.forEach(org => {
        if (org.id === id) {
            org.pointList.push(pathItem)
        }
    })
}

// function getPath({
//     pointList,
//     screenDimensions,
//     populationSize,
//     thickness,
//     stretchFactor,
//     populationSnapshots
// }) {
//     const colWidth = screenDimensions.width * parseInt(stretchFactor) / populationSnapshots.length;
//     const rowHeight = (screenDimensions.height / populationSize) * parseFloat(thickness);

//     const path = pointList.reduce((acc,current,i) => {
//         const xCoor = current.x * colWidth
//         const yCoor = (current.y * rowHeight) + rowHeight/2
//         if (i === 0) return `M ${xCoor} ${yCoor} `
//         return acc += `L ${xCoor} ${yCoor} `
//     },'')
//     return path
// }

function getMidpoint(p1x,p1y,p2x,p2y) {
    return {
        x: (p1x + p2x) / 2,
        y: (p1y + p2y) /2
    }
}

function getMidpoints(pointList) {
    return pointList.map((point,i) => {
        if (i === pointList.length-1) return point
        const nextPoint = pointList[i+1]
        return getMidpoint(point.x,point.y,nextPoint.x,nextPoint.y)
    })
}

function getPath({
    pointList,
    screenDimensions,
    populationSize,
    thickness,
    stretchFactor,
    populationSnapshots
}) {
    const colWidth = screenDimensions.width * parseInt(stretchFactor) / (populationSnapshots.length - 1);
    const rowHeight = (screenDimensions.height / populationSize) * parseFloat(thickness);
    const midpoints = getMidpoints(pointList)

    const path = pointList.reduce((acc,current,i) => {
        const xCoor = current.x * colWidth
        const yCoor = (current.y * rowHeight) + rowHeight/2

        if (i === 0) return `M ${xCoor} ${yCoor} L ${midpoints[0].x * colWidth} ${(midpoints[0].y * rowHeight) + rowHeight/2} `

        return acc += `
            Q
            ${xCoor} ${yCoor} 
            ${midpoints[i].x * colWidth} ${(midpoints[i].y * rowHeight) + rowHeight/2} 
        `
    },'')
    return path
}

// svgPops creates a list of Organisms
export function getOrganismList(populationSnapshots) {
    const idList = []
    const organismList = []
    populationSnapshots.forEach((ps,x) => {
        ps.forEach((bug,y) => {
            if (!idList.includes(bug.id)) {
                idList.push(bug.id)

                const newOrg = new Organism()
                newOrg.id = bug.id
                newOrg.pointList = [{x,y}]
                newOrg.color = bug.color
                return organismList.push(newOrg)
            }

            return updatePointlist(bug.id,organismList,{x,y})
        })
    })
    return organismList
}

export function getLinePaths({
    organismList,
    screenDimensions,
    populationSize,
    stretchFactor,
    thickness,
    populationSnapshots,
}) {

    return organismList.map(org => {
        const newPath = getPath({
            pointList: org.pointList,
            screenDimensions,
            populationSize,
            stretchFactor,
            thickness,
            populationSnapshots,
        })

        return {
            path: newPath,
            color: `rgb(${org.color[0]},${org.color[1]},${org.color[2]})`,
        }
    })
}