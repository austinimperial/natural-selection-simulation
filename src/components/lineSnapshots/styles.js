import styled from 'styled-components'

export const StyledScrollBox = styled.div`
    display: flex;
    width: ${props => props.width};
    height: ${props => props.height};
    overflow: scroll;

    ${props => !props.isVertical && `
        margin: 0vh 0vh 25vh 0vh;
        align-items: center;
    `}

    ${props => props.isVertical && `
        justify-content: center;
    `}
`

export const StyledPath = styled.path`
    :hover {
        stroke: white;
    }
`

export const StyledBackground = styled.div`
    background-color: black;
`