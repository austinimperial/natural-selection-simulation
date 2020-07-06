const _ = require('lodash')

const updateCanvas = _.throttle((populationSnapshots,canvasDimensions,populationSize,canvas) => {
    console.log('updateCanvas')
    const ctx = canvas.getContext('2d')
    const colWidth = Math.ceil(canvasDimensions.width / populationSnapshots.length)
    const rowHeight = Math.ceil(canvasDimensions.height / populationSize) 
    ctx.clearRect(0,0,canvasDimensions.width,canvasDimensions.height)
    populationSnapshots.forEach((ps,rowIndex) => {   
        ps.forEach((color,columnIndex) => {
            ctx.fillStyle = `rgb(${color[0]},${color[1]},${color[2]})`
            ctx.fillRect(
                rowIndex*colWidth, 
                columnIndex*rowHeight, 
                colWidth, 
                rowHeight
            );
        })        
    }) 
},5000)

export default updateCanvas