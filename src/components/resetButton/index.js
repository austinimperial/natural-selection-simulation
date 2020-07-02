import React, { useContext } from "react";
import { BugsContext } from "globalState/bugs/index";
import { CanvasDimensionsContext } from "globalState/canvasDimensions/index";
import { StyledButton, StyledContainer } from "./styles";

function ResetButton() {
  // global state
  const {
    getInitialBugs,
    setBugs,
    populationSize,
    bugSize,
    getAverageColor,
    setAvgColors,
    bugs,
  } = useContext(BugsContext);
  const { canvasDimensions } = useContext(CanvasDimensionsContext);

  const handleClick = () => {
    getInitialBugs(canvasDimensions, populationSize, setBugs, bugSize);
    setAvgColors([getAverageColor(bugs, populationSize)]);
  };

  return (
    <StyledContainer>
      <StyledButton onClick={handleClick}>reset</StyledButton>
    </StyledContainer>
  );
}

export default ResetButton;
