import styled from "styled-components";

export const StyledContainer = styled.div`

  display: flex;
  flex-direction: column;

  ${props => props.small && `
    padding: 10px;
  `}

  ${props => props.big && `
    width: 150px;
    margin: 10px 0px 0px 0px;
  `}
`;

export const StyledTextArea = styled.textarea`
  outline: none;
  height: 50px;
  border: 1px solid black;
  box-sizing: border-box;
  ${(props) =>
    props.isInvalid &&
    `
        border: 2px solid red;
  `}

  ${props => props.small && `
    width: 100%;
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
