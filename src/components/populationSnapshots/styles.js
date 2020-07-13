import styled from 'styled-components'

export const StyledScrollBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${props => props.width};
    height: ${props => props.height};
    overflow-x: scroll;

    ${props => !props.isVertical && `
        margin: 0vh 0vh 25vh 0vh;
    `}
`