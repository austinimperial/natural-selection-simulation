import React, { useContext, useState } from 'react'
import { 
    StyledContainer,
    StyledSvg
 } from './styles'
import { bugPath } from './bugPath'
import { BugsContext } from 'globalState/bugs/index'
import getCoordinates from './getCoordinates'

function Bug({svgCanvas,bug}) {
    // local state
    const [isGrowing,setIsGrowing] = useState(true)

    // global state
    const { bugSize } = useContext(BugsContext)

    return (
        <StyledContainer
            xCoor={getCoordinates(svgCanvas,bug,bugSize).x}
            yCoor={getCoordinates(svgCanvas,bug,bugSize).y}
        >
            <StyledSvg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 255.036 255.036" 
                xml="preserve" 
                height={bugSize}
                fill={bug.color}
                isGrowing={isGrowing}
            >
                <path d={bugPath} />
            </StyledSvg>  
        </StyledContainer>      
    )
}

export default Bug