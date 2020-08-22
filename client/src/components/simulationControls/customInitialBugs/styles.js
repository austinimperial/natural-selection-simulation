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
  border: 1px solid black;
  height: 101px;
  box-sizing: border-box;
  margin: 3px 0px 3px 0px;
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
  ${props => props.subtext && `font-size: 10px`}
`;

export const StyledButton = styled.button`
  color: black;
  appearance: none;
  cursor: pointer;
  border: 1px solid black;
  background-color: white;
  border-radius: none;
  margin: 10px 0px 10px 0px;
  height: 20px;
  font-family: ${props => props.theme.secondaryFont}, sans-serif;
  font-size: 12px;

  ${(props) =>
    props.isInvalid &&
    `
        cursor: not-allowed;
        color: gray;
    `}
`;
