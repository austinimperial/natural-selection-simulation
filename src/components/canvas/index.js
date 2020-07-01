import React, { useContext, useEffect, useRef } from 'react'
//import { ScreenSizesContext } from 'globalState/screenSizes/index'
import { BugsContext } from 'globalState/bugs/index'
import { BgImageContext } from 'globalState/bgImage/index'
import { CanvasDimensionsContext } from 'globalState/canvasDimensions/index'
import { 
    StyledSvgCanvas,
    StyledContainer,
    StyledBgImg,
} from './styles'
import Bug from 'components/bug/bug'

function SvgCanvas() {
    // // global state
    // const {xxs,xs,sm,md,lg,xl} = useContext(ScreenSizesContext)
    const { 
        bugs,
        getInitialBugs,
        populationSize,
        setBugs,
        bugSize
    } = useContext(BugsContext)
    const { bgImage } = useContext(BgImageContext)
    const { canvasDimensions } = useContext(CanvasDimensionsContext)

    // refs
    const svgCanvasRef = useRef()

    useEffect(() => {
        getInitialBugs(canvasDimensions,populationSize,setBugs,bugSize)
    },[])

    return (
        <StyledContainer>
            <StyledBgImg 
                src={bgImage} 
                canvasDimensions={canvasDimensions}
            />
            <StyledSvgCanvas
                ref={svgCanvasRef}
                canvasDimensions={canvasDimensions} 
                onClick={() => console.log('canvas click')}
            >
                {
                    bugs.map(bug => (
                        <Bug 
                            key={bug.x+bug.y+bug.color}
                            bug={bug}
                            svgCanvas={svgCanvasRef}
                        />                           
                    ))
                 
                }
            </StyledSvgCanvas>
        </StyledContainer>
    )
}

export default SvgCanvas