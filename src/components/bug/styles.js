import styled, { keyframes } from 'styled-components'

export const StyledContainer = styled.div`
    position: absolute;
    left: ${props => props.xCoor}px;
    top: ${props => props.yCoor}px;
`

export const grow = (height) => keyframes`{
    0% {height: 0px;}
    100% {height: ${height}px;}
}`

export const StyledSvg = styled.svg`
    animation: ${props => grow(props.height)} 2s linear;
`