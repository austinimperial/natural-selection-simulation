import React, { useContext } from "react";
import { BugsContext } from "globalState/bugs/index";
import { SvgDimensionsContext } from "globalState/svgContainerDimensions/index";
import { StyledButton, StyledContainer } from "./styles";
import { SnapshotsDisplayContext } from "globalState/snapshotsDisplay/index";

function ResetButton() {
  // global state
  const {
    populationSize,
    bugSize,
    setPopulationSnapshots,
    setBugs2,
    getInitialBugs,
    setStepCount,
  } = useContext(BugsContext);
  const { svgContainerDimensions } = useContext(SvgDimensionsContext);
  const { resetCanvasDimens } = useContext(SnapshotsDisplayContext);

  const handleClick = () => {
    const newBugs = getInitialBugs(
      svgContainerDimensions,
      populationSize,
      bugSize
    );
    setBugs2(newBugs);
    setPopulationSnapshots([]);
    setStepCount(0);
    resetCanvasDimens();
  };

  return (
    <StyledContainer>
      <StyledButton onClick={handleClick}>reset</StyledButton>
    </StyledContainer>
  );
}

export default ResetButton;
