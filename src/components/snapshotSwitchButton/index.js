import React, { useContext } from "react";
import { SnapshotsDisplayContext } from "globalState/snapshotsDisplay/index";
import { StyledButton, StyledContainer } from "./styles";

function SnapshotSwitchButton() {
  // global state
  const { setDisplaySvg } = useContext(SnapshotsDisplayContext);

  return (
    <StyledContainer>
      <StyledButton onClick={() => setDisplaySvg((prev) => !prev)}>
        switch
      </StyledButton>
    </StyledContainer>
  );
}

export default SnapshotSwitchButton;
