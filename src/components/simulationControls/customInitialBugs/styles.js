import styled from "styled-components";

export const StyledContainer = styled.div`
  margin: 10px 0px 0px 0px;
  display: flex;
  flex-direction: column;
  width: 150px;
`;

export const StyledTextArea = styled.textarea`
  outline: none;
  height: 70px;
  border: none;
  box-sizing: border-box;
  ${(props) =>
    props.isInvalid &&
    `
        border: 2px solid red;
    `}
`;

export const StyledP = styled.p`
  margin: 0px;
  font-size: 12px;
`;

export const StyledButton = styled.button`
  color: black;
  appearance: none;
  border: 1px solid black;
  background-color: white;
  border-radius: none;
  margin: 10px 0px 10px 0px;

  ${(props) =>
    props.isInvalid &&
    `
        color: gray;
    `}
`;
