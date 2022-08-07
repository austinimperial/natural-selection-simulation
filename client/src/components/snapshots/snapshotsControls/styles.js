import styled from "styled-components/macro";

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  ${props => props.small && `
    justify-content: center;
  `}

  ${props => props.big && `
    justify-content: flex-start;
  `}
`;


export const StyledSliderContainer = styled.div`
  display: flex;
  margin: 0px 0px 20px 0px;

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