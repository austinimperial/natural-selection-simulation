import styled from "styled-components";

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;

  ${(props) =>
    props.small &&
    `

  `}

  ${(props) =>
    props.big &&
    `
  
  `}
`;

export const StyledControlContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const StyledCanvasAndDomColorsContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  ${(props) =>
    props.small &&
    `
    align-items: center;
  `}

  ${(props) =>
    props.big &&
    `
    align-items: flex-start;
  `}
`;

export const StyledSubContainer1 = styled.div`
  display: flex;

  ${(props) =>
    props.small &&
    `
    flex-direction: column;
  `}

  ${(props) =>
    props.big &&
    `

  `}
`;
