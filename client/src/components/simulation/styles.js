import styled from "styled-components/macro";

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledSubContainer1 = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  ${(props) =>
    props.small &&
    `
    flex-direction: column;
  `}
`;