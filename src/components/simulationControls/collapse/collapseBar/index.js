import React from 'react'
import {
    StyledCollapseBar,
    StyledP
} from './styles'

function CollapseBar({label,style,onClick}) {
    return (
    <StyledCollapseBar
        style={style}
        onClick={onClick}
    >
        <StyledP>{label}</StyledP>
    </StyledCollapseBar>
    )
}

export default CollapseBar