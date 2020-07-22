import styled from "styled-components";

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
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
  flex-wrap: wrap;

  ${(props) =>
    props.small &&
    `
    flex-direction: column;
  `}
`;