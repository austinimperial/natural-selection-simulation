import React, { useContext, useRef, useEffect } from 'react'
//import { ScreenSizesContext } from 'globalState/screenSizes/index'
import { BugsContext } from 'globalState/bugs/index'
import { BgImageContext } from 'globalState/bgImage/index'
import { 
    StyledCanvas,
    StyledCanvasContainer,
    StyledBgImg
} from './styles'
import drawAllBugs from './drawAllBugs'

function Canvas() {
    // // global state
    // const {xxs,xs,sm,md,lg,xl} = useContext(ScreenSizesContext)
    const {bugs,getInitialBugs,populationSize,setBugs} = useContext(BugsContext)
    const { bgImage } = useContext(BgImageContext)

    // refs
    const canvasRef = useRef()

    // local vars
    const canvasDimensions = {width:400,height:400}

    useEffect(() => {
        drawAllBugs(canvasRef.current,bugs)
    },[bugs])

    useEffect(() => {
        getInitialBugs(canvasDimensions,populationSize,setBugs)
    },[])

    return (
        <StyledCanvasContainer>
            <StyledBgImg 
                src={bgImage} 
                canvasDimensions={canvasDimensions}
            />
            <StyledCanvas 
                width={canvasDimensions.width}
                height={canvasDimensions.height}
                ref={canvasRef} 
            /> 
        </StyledCanvasContainer>
    )
}

export default Canvas