import styled from "styled-components";

export const StyledContainer = styled.div`
  display: flex;
  margin: 20px;

  ${props => props.small && `
    justify-content: center;
  `}

  ${props => props.big && `
    justify-content: flex-start;
  `}
`;


export const StyledInnerContainer = styled.div`
  display: flex;

  ${props => props.small && `
    flex-direction: column;
    align-items: flex-start;
  `}

  ${props => props.big && `
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  `}
`