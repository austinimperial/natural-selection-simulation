import React from "react";
import DomImageColors from "components/domColors/domImageColors/index";
import DomPopulationColors from "components/domColors/domPopulationColors/index";
import { StyledContainer } from "./styles";

function DomColors() {
  // const
  const MAX_COLOR_COUNT = 6;

  return (
    <StyledContainer>
      <DomImageColors maxColorCount={MAX_COLOR_COUNT} />
      <DomPopulationColors maxColorCount={MAX_COLOR_COUNT} />
    </StyledContainer>
  );
}

export default DomColors;
