import React, { useContext } from "react";
import { BugsContext } from "globalState/bugs/index";
import getGradientString from "./getGradientString";
import { StyledContainer } from "./styles";
import uuid from "react-uuid";

function ColorGrid() {
  // global state
  const { avgColors } = useContext(BugsContext);

  return (
    <StyledContainer
      key={uuid()}
      gradientString={getGradientString(avgColors)}
    ></StyledContainer>
  );
}

export default ColorGrid;
