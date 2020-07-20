import React, { useContext } from "react";
import { StyledContainer } from "./styles";
import { SnapshotsDisplayContext } from "globalState/snapshotsDisplay/index";
import { BugsContext } from "globalState/bugs/index";
import CanvasSnapshots from "components/snapshots/canvasSnapshots/index";
import SnapshotsControls from "components/snapshots/snapshotsControls/index";
import SvgSnapshots from "components/snapshots/svgSnapshots/index";

function Snapshots() {
  // global state
  const { displaySvg } = useContext(SnapshotsDisplayContext);
  const { populationSnapshots } = useContext(BugsContext);

  if (populationSnapshots.length === 0) return <></>;

  return (
    <StyledContainer>
      <SnapshotsControls />
      {displaySvg ? <SvgSnapshots /> : <CanvasSnapshots />}
    </StyledContainer>
  );
}

export default Snapshots;
