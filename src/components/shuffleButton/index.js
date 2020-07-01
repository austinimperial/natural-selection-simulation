import React, { useContext } from "react";
import { BugsContext } from "globalState/bugs/index";
import { CanvasDimensionsContext } from "globalState/canvasDimensions/index";
import { StyledButton, StyledContainer } from "./styles";

function ShuffleButton() {
  // global state
  const { getInitialBugs, setBugs, populationSize, bugSize } = useContext(
    BugsContext
  );
  const { canvasDimensions } = useContext(CanvasDimensionsContext);

  return (
    <StyledContainer>
      <StyledButton
        onClick={() =>
          getInitialBugs(canvasDimensions, populationSize, setBugs, bugSize)
        }
      >
        shuffle
      </StyledButton>
    </StyledContainer>
  );
}

export default ShuffleButton;
