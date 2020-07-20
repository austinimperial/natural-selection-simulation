import React, { useContext } from "react";
import { ScreenSizesContext } from "globalState/screenSizes/index";
import StretchFactorSlider from "components/snapshots/snapshotsControls/stretchFactorSlider/index";
import ThicknessSlider from "components/snapshots/snapshotsControls/thicknessSlider/index";
import LineWidthSlider from "components/snapshots/snapshotsControls/lineWidthSlider/index";
import SnapshotSwitchButton from "components/snapshots/snapshotsControls/snapshotSwitchButton/index";
import { StyledContainer } from "./styles";

function SnapshotsControls() {
  // global state
  const { xxs, xs, sm, md, lg, xl } = useContext(ScreenSizesContext);

  return (
    <StyledContainer small={xxs || xs || sm} big={md || lg || xl}>
      <SnapshotSwitchButton />
      <StretchFactorSlider />
      <ThicknessSlider />
      <LineWidthSlider />
    </StyledContainer>
  );
}

export default SnapshotsControls;
