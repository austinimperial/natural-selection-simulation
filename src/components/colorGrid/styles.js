import styled from "styled-components";

export const StyledContainer = styled.div`
  flex-grow: 1;
  margin: 20px;
  display: flex;
  flex-direction: column;
  --gradientString: ${props => props.gradientString};

  // give a solid background if there's only one avgColor (aka can't make a gradient)
  ${props => props.isInitial && `
    background-color: var(--gradientString);
  `}

  // If there's 2 or more avgColors, make a gradient
  background: linear-gradient(180deg, ${props => props.gradientString});
`;