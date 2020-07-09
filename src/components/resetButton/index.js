import React, { useContext } from "react";
import { BugsContext } from "globalState/bugs/index";
import { CanvasDimensionsContext } from "globalState/canvasDimensions/index";
import { StyledButton, StyledContainer } from "./styles";

function ResetButton() {
  // global state
  const {
    populationSize,
    bugSize,
    setPopulationSnapshots,
    setBugs2,
    getInitialBugs2,
    setStepCount
  } = useContext(BugsContext);
  const { canvasDimensions } = useContext(CanvasDimensionsContext);

  const handleClick = () => {
    const newBugs = getInitialBugs2(canvasDimensions, populationSize, bugSize);
    setBugs2(newBugs);
    setPopulationSnapshots([]);
    setStepCount(0)
  };

  return (
    <StyledContainer>
      <StyledButton onClick={handleClick}>reset</StyledButton>
    </StyledContainer>
  );
}

export default ResetButton;
