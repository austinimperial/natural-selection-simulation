import React, { useContext } from "react";
import { ScreenSizesContext } from "globalState/screenSizes/index";
import { SnapshotsDisplayContext } from "globalState/snapshotsDisplay/SnapshotDisplay";
import StretchFactorSlider from "components/snapshots/snapshotsControls/stretchFactorSlider/index";
import ThicknessSlider from "components/snapshots/snapshotsControls/thicknessSlider/index";
import LineWidthSlider from "components/snapshots/snapshotsControls/lineWidthSlider/index";
import SnapshotSwitchButton from "components/snapshots/snapshotsControls/snapshotSwitchButton/index";
import {  Container, StyledSliderContainer } from "./SnapshotsControlsStyles";

function SnapshotsControls() {
  // global state
  const { xxs, xs, sm, md, lg, xl } = useContext(ScreenSizesContext);

  const { 
    isVertical,
  } = useContext(SnapshotsDisplayContext);

  return (
    < Container small={xxs || xs || sm} big={md || lg || xl} isVertical={isVertical}>
      <SnapshotSwitchButton />
      <StyledSliderContainer small={xxs || xs || sm} big={md || lg || xl}>
        <StretchFactorSlider />
        <ThicknessSlider />
        <LineWidthSlider />
      </StyledSliderContainer>
    </ Container>
  );
}

export default SnapshotsControls;
