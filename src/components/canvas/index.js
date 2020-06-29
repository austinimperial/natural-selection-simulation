import React, { useState, useContext, useRef, useEffect } from 'react'
//import { ScreenSizesContext } from 'globalState/screenSizes/index'
import { BugsContext } from 'globalState/bugs/index'
import { 
    StyledCanvas,
    StyledContainer,
    StyledFileInput,
    StyledCanvasContainer,
    StyledBgImg
} from './styles'
//import changeBackgroundImage from './changeBackgroundImage'
import drawAllBugs from './drawAllBugs'

function Canvas() {
    // local state
    const [bgImg,setBgImg] = useState("")

    // // global state
    // const {xxs,xs,sm,md,lg,xl} = useContext(ScreenSizesContext)
    const {bugs,addBug} = useContext(BugsContext)

    // refs
    const canvasRef = useRef()

    useEffect(() => {
        drawAllBugs(canvasRef.current,bugs)
    },[bugs])

    const handleCanvasClick = e => {
        addBug(e)
    }

    return (
        <StyledContainer>
            <StyledCanvasContainer>
                <StyledBgImg src={bgImg} />
                <StyledCanvas 
                    width="300"
                    height="300"
                    ref={canvasRef} 
                    onClick={handleCanvasClick}
                /> 
            </StyledCanvasContainer>
            <StyledFileInput 
                type="file" 
                accept="image/*"
                onChange={e => setBgImg(URL.createObjectURL(e.target.files[0]))} 
            />
        </StyledContainer>

    )
}

export default Canvas