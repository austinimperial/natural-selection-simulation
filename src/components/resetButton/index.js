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
    setPopulationSnapshots,
    setBugs2,
    getInitialBugs2
  } = useContext(BugsContext);
  const { canvasDimensions } = useContext(CanvasDimensionsContext);

  const handleClick = () => {
    const newBugs = getInitialBugs(canvasDimensions, populationSize, bugSize);
    const newAvgColor = getAverageColor(newBugs, populationSize);

    setBugs(newBugs);
    setAvgColors([newAvgColor]);
    setPopulationSnapshots([])

    // bugs2
    const newBugs2 = getInitialBugs2(canvasDimensions, populationSize, bugSize);
    setBugs2(newBugs2)
  };

  return (
    <StyledContainer>
      <StyledButton onClick={handleClick}>reset</StyledButton>
    </StyledContainer>
  );
}

export default ResetButton;
