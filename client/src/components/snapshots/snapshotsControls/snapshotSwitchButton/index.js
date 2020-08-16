import React, { useContext } from "react";
import { SnapshotsDisplayContext } from "globalState/snapshotsDisplay/index";
import { StyledButton, StyledContainer } from "./styles";

function SnapshotSwitchButton() {
  // global state
  const { setDisplaySvg, displaySvg } = useContext(SnapshotsDisplayContext);

  return (
    <StyledContainer>
      <StyledButton
        left
        onClick={() => setDisplaySvg(true)}
        isSelected={displaySvg}
      >
        lines
      </StyledButton>
      <StyledButton
        right
        onClick={() => setDisplaySvg(false)}
        isSelected={!displaySvg}
      >
        grid
      </StyledButton>
    </StyledContainer>
  );
}

export default SnapshotSwitchButton;
