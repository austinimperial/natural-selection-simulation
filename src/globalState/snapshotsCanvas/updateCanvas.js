import lowToHigh from './lowToHigh'
const _ = require('lodash')

const updateCanvas = _.throttle((populationSnapshots,canvasDimensions,populationSize,canvas) => {
    const ctx = canvas.getContext('2d')
    const colWidth = canvasDimensions.width / populationSnapshots.length
    const rowHeight = canvasDimensions.height / populationSize
    ctx.clearRect(0,0,canvasDimensions.width,canvasDimensions.height)
    populationSnapshots.forEach((ps,rowIndex) => {   
        const sortedByAncestor = ps.sort((a,b) => lowToHigh(a.ancestor,b.ancestor))
        sortedByAncestor.forEach((bug,columnIndex) => {
            ctx.fillStyle = `rgb(${bug.color[0]},${bug.color[1]},${bug.color[2]})`
            ctx.fillRect(
                rowIndex*colWidth, 
                columnIndex*rowHeight, 
                colWidth, 
                rowHeight
            );
        })        
    }) 
},3000)

export default updateCanvas