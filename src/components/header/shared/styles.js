import styled from 'styled-components'

export const StyledButton = styled.button`
    font-family: ${props => props.theme.titleFont}, sans-serif;
    font-size: 25px;
    border-radius: 50px;
    width: ${props => props.width};
    height: ${props => props.height};
    background-color: transparent;
    appearance: none;
    border: 1px solid black;
    outline: none;
    cursor: pointer;
    margin: 10px;

    :hover {
        color: white;
        background-color: black;
    }
`