import React, { useContext } from "react";
import { StyledContainer, StyledP, StyledTitleContainer } from "./styles";
import { SnapshotsDisplayContext } from "globalState/snapshotsDisplay/index";
import { ScreenSizesContext } from 'globalState/screenSizes/index'
import { BugsContext } from "globalState/bugs/index";
import CanvasSnapshots from "components/snapshots/canvasSnapshots/index";
import SnapshotsControls from "components/snapshots/snapshotsControls/index";
import SvgSnapshots from "components/snapshots/svgSnapshots/index";

function Snapshots() {
  // global state
  const { displaySvg } = useContext(SnapshotsDisplayContext);
  const { populationSnapshots } = useContext(BugsContext);
  const { xxs,xs,sm,md,lg,xl } = useContext(ScreenSizesContext)

  if (populationSnapshots.length === 0) return <></>;

  return (
    <StyledContainer>
      <StyledTitleContainer small={xxs || xs || sm} big={md || lg || xl}>
        <StyledP>Population Snapshots</StyledP>
      </StyledTitleContainer>
      <SnapshotsControls />
      {displaySvg ? <SvgSnapshots /> : <CanvasSnapshots />}
    </StyledContainer>
  );
}

export default Snapshots;
