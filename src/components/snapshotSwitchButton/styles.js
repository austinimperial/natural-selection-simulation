import styled from "styled-components";

export const StyledContainer = styled.div`
  margin: 0px 20px 20px 20px;
`;

export const StyledButton = styled.button`
  margin: 0px;
  appearance: none;
  border: 1px solid black;
  background-color: white;
  padding: 5px;
  outline: none;

  ${(props) =>
    props.isSelected &&
    `
    background-color: black;
    color: white;
  `}

  ${(props) =>
    props.left &&
    `
    border-radius: 5px 0px 0px 5px;
  `}

  ${(props) =>
    props.right &&
    `
    border-radius: 0px 5px 5px 0px;
  `}
`;
