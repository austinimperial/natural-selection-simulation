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
  } = useContext(BugsContext);
  const { canvasDimensions } = useContext(CanvasDimensionsContext);

  const handleClick = () => {
    const newBugs = getInitialBugs(canvasDimensions, populationSize, bugSize);
    setBugs(newBugs);
    const newAvgColor = getAverageColor(newBugs, populationSize);
    setAvgColors([newAvgColor]);
  };

  return (
    <StyledContainer>
      <StyledButton onClick={handleClick}>reset</StyledButton>
    </StyledContainer>
  );
}

export default ResetButton;
