import styled from "styled-components";

export const StyledContainer = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 0px 0px 0px 10px;

  ${(props) =>
    props.small &&
    `
        flex-direction: row;
        flex-wrap: wrap;
    `}

  ${(props) =>
    props.big &&
    `
        flex-direction: column;
    `}
`;
