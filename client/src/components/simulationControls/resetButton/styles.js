import styled from "styled-components/macro";

export const StyledButton = styled.button`
  border-radius: 0px 0px 0px 0px;
  outline: none;
  appearance: none;
  border: 1px solid black;
  background-color: white;
  cursor: pointer;
  margin: 0px;
  height: 20px;
  font-family: ${props => props.theme.secondaryFont}, sans-serif;
  font-size: 12px;
`;

export const StyledContainer = styled.div`
  margin: 10px 0px 0px 0px;
    
  ${props => props.small && `
    margin: 15px;
  `}
`;
