import React, { useContext } from "react";
import { BugsContext } from "globalState/bugs/index";
import { CanvasDimensionsContext } from "globalState/canvasDimensions/index";
import { StyledButton, StyledContainer } from "./styles";

function ResetButton() {
  // global state
  const {
    populationSize,
    bugSize,
    getAverageColor,
    setAvgColors,
    setPopulationSnapshots,
    setBugs2,
    getInitialBugs2,
    getLivingBugs
  } = useContext(BugsContext);
  const { canvasDimensions } = useContext(CanvasDimensionsContext);

  const handleClick = () => {
    const newBugs = getInitialBugs2(canvasDimensions, populationSize, bugSize);
    const newAvgColor = getAverageColor(getLivingBugs(newBugs), populationSize);

    setBugs2(newBugs);
    setAvgColors([newAvgColor]);
    setPopulationSnapshots([])
  };

  return (
    <StyledContainer>
      <StyledButton onClick={handleClick}>reset</StyledButton>
    </StyledContainer>
  );
}

export default ResetButton;
