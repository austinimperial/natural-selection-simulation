import React, { useContext, useCallback } from 'react'
import { SnapshotsCanvasContext } from 'globalState/snapshotsCanvas/index'
import { BugsContext } from 'globalState/bugs/index'
import updateCanvas from './updateCanvas'
import {
    StyledButton
} from './styles'

function GenerateSnapButton() {
    // global state
    const { snapshotsCanvasRef, canvasDimensions } = useContext(SnapshotsCanvasContext)
    const { populationSnapshots, populationSize } = useContext(BugsContext)

    const handleClick = useCallback(() => {
        updateCanvas(populationSnapshots,canvasDimensions,populationSize,snapshotsCanvasRef.current)
    },[populationSnapshots,canvasDimensions,populationSize,snapshotsCanvasRef])

    return (
        <StyledButton
            onClick={handleClick}
        >
            generate snapshots
        </StyledButton>
    )
}

export default GenerateSnapButton