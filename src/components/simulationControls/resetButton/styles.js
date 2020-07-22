import styled from "styled-components";

export const StyledButton = styled.button`
  appearance: none;
  border: 1px solid black;
  fill: white;
`;

export const StyledContainer = styled.div`
  margin: 10px 0px 0px 0px;
    
  ${props => props.small && `
    margin: 15px;
  `}
`;
