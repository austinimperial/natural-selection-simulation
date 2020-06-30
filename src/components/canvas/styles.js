import styled from 'styled-components'

export const StyledCanvasContainer = styled.div`
    padding: 20px;
`

export const StyledCanvas = styled.canvas`
    border: 1px solid black;
`

export const StyledBgImg = styled.img`
    border: 1px solid black;
    position: absolute;
    height: ${props => props.canvasDimensions.height}px;
    width:  ${props => props.canvasDimensions.width}px;
    z-index: -1;
`