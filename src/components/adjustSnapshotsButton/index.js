import React, { useContext } from "react";
import { SnapshotsCanvasContext } from "globalState/snapshotsCanvas/index";
import { StyledContainer, StyledButton } from "./styles";

function AdjustSnapshotsButton() {
  // global state
  const { makeThin } = useContext(SnapshotsCanvasContext);

  const handleClick = () => {
    makeThin();
  };

  return (
    <StyledContainer>
      <StyledButton onClick={handleClick}>adjust</StyledButton>
    </StyledContainer>
  );
}

export default AdjustSnapshotsButton;
