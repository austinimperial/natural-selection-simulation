import React, { useEffect, useState, useRef } from 'react'
import { StyledContainer } from './styles'

function Collapse({children,isCollapsed,collapseContainerStyle,onClick}) {
    const [height, setHeight] = useState(0)
    const containerRef = useRef(null)

    useEffect(() => {
        setHeight(containerRef.current.scrollHeight)
    },[])

    return (
        <StyledContainer
            isCollapsed={isCollapsed}
            style={collapseContainerStyle}
            height={height}
            ref={containerRef}
            onClick={onClick}
        >
            {children}
        </StyledContainer> 
    )
}

export default Collapse