import React, { useContext } from "react";
import { SnapshotsDisplayContext } from "globalState/snapshotsDisplay/index";
import { StyledButton, StyledContainer } from "./styles";

function SnapshotSwitchButton() {
  // global state
  const { setDisplaySvg, isShowingSvg } = useContext(SnapshotsDisplayContext);

  return (
    <StyledContainer>
      <StyledButton
        left
        onClick={() => setDisplaySvg(true)}
        isSelected={isShowingSvg}
      >
        lines
      </StyledButton>
      <StyledButton
        right
        onClick={() => setDisplaySvg(false)}
        isSelected={!isShowingSvg}
      >
        grid
      </StyledButton>
    </StyledContainer>
  );
}

export default SnapshotSwitchButton;
