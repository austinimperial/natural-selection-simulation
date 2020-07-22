import styled from "styled-components";

export const StyledContainer = styled.div`
    margin-top: 20px;
`;

export const StyledP = styled.p`
    margin: 0px;
    font-size: 34px;
    font-family: 'Barrio', cursive;
`

export const StyledTitleContainer = styled.div`
    display: flex;
    justify-content: flex-start;

    ${props => props.small && `
        justify-content: center;
    `}

    ${props => props.big && `
        margin: 0px 0px 0px 20px;
    `}
`
