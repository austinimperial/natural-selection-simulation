import React, { useState, useContext, useRef, useEffect } from 'react'
//import { ScreenSizesContext } from 'globalState/screenSizes/index'
import { 
    StyledCanvas,
    StyledContainer,
    StyledFileInput
} from './styles'
import changeBackgroundImage from './changeBackgroundImage'

function Canvas() {
    // local state
    const [bgImg,setBgImg] = useState("")

    // // global state
    // const {xxs,xs,sm,md,lg,xl} = useContext(ScreenSizesContext)

    // refs
    const canvasRef = useRef()

    useEffect(() => {
        changeBackgroundImage(bgImg,canvasRef.current)
    },[bgImg])

    return (
        <StyledContainer>
            <StyledCanvas 
                ref={canvasRef} 
                onClick={e => console.log(e)}
            /> 
            <StyledFileInput 
                type="file" 
                accept="image/*"
                onChange={e => setBgImg(URL.createObjectURL(e.target.files[0]))} 
            />
        </StyledContainer>

    )
}

export default Canvas