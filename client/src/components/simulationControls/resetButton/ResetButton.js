import React, { useContext } from "react";
import { BugsContext } from "globalState/bugs/BugsProvider";
import { SvgDimensionsContext } from "globalState/svgContainerDimensions/index";
import { StyledButton, StyledContainer } from "./ResetButtonStyles";
import { SnapshotsDisplayContext } from "globalState/snapshotsDisplay/SnapshotDisplay";

function ResetButton() {
  // global state
  const {
    populationSize,
    bugSize,
    setPopulationSnapshots,
    setBugs,
    getInitialBugs,
    setStepCount,
    setDeaths
  } = useContext(BugsContext);
  const { svgContainerDimensions } = useContext(SvgDimensionsContext);
  const { resetCanvasDimens } = useContext(SnapshotsDisplayContext);

  const handleClick = () => {
    const newBugs = getInitialBugs(
      svgContainerDimensions,
      populationSize,
      bugSize
    );
    setBugs(newBugs);
    setPopulationSnapshots([]);
    setStepCount(0);
    resetCanvasDimens();
    setDeaths([])
  };

  return (
    <StyledContainer>
      <StyledButton onClick={handleClick}>reset</StyledButton>
    </StyledContainer>
  );
}

export default ResetButton;
