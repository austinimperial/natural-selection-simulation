import styled from "styled-components";

export const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  justify-content: flex-start;

  ${(props) =>
    props.small &&
    `
        flex-direction: column;
        align-items: flex-start;
    `}

  ${(props) =>
    props.big &&
    `
        flex-direction: row;
    `}
`;
