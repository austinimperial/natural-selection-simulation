import React, { useContext } from "react";
import { BugsContext } from "globalState/bugs/index";
import { ScreenSizesContext } from "globalState/screenSizes/index"
import { SvgDimensionsContext } from "globalState/svgContainerDimensions/index";
import { StyledButton, StyledContainer } from "./styles";
import { SnapshotsDisplayContext } from "globalState/snapshotsDisplay/index";

function ResetButton() {
  // global state
  const {
    populationSize,
    bugSize,
    setPopulationSnapshots,
    setBugs,
    getInitialBugs,
    setStepCount,
  } = useContext(BugsContext);
  const { svgContainerDimensions } = useContext(SvgDimensionsContext);
  const { resetCanvasDimens } = useContext(SnapshotsDisplayContext);
  const { xxs, xs, sm } = useContext(ScreenSizesContext)

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
  };

  return (
    <StyledContainer
      small={xxs || xs || sm}
    >
      <StyledButton onClick={handleClick}>reset</StyledButton>
    </StyledContainer>
  );
}

export default ResetButton;
