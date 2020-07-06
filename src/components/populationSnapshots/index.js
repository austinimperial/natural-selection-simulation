import React, { useContext, useRef, useEffect } from 'react'
// import { BugsContext } from 'globalState/bugs/index'
import { SnapshotsCanvasContext } from 'globalState/snapshotsCanvas/index'

function PopulationSnapshots() {
    // global state
    // const { populationSnapshots, populationSize } = useContext(BugsContext)
    const { setSnapshotsCanvasRef, canvasDimensions } = useContext(SnapshotsCanvasContext)

    // ref
    const canvasRef = useRef()

    useEffect(() => {
        setSnapshotsCanvasRef(canvasRef)
    },[])

    return (
        <canvas
            width={canvasDimensions.width}
            height={canvasDimensions.height}
            style={{
                'border':'1px solid black'
            }}
            ref={canvasRef}
        >

        </canvas>
    )
}

export default PopulationSnapshots