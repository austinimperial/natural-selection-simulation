import React, { useContext } from "react";
import { ScreenSizesContext } from "globalState/screenSizes/index";
import SvgContainer from "components/svgContainer/index";
import FileInput from "components/fileInput/index";
import ResetButton from "components/resetButton/index";
import PopulationSlider from "components/sliders/populationSlider/index";
import BugSizeSlider from "components/sliders/bugSizeSlider/index";
import OffspringDistanceSlider from "components/sliders/offspringDistanceSlider/index";
import GrowSpeedSlider from "components/sliders/growSpeedSlider/index";
import MaxMutationSlider from "components/sliders/maxMutationSlider/index";
import PresetImageSelect from "components/presetImageSelect/index";
import PopulationSnapshots from "components/populationSnapshots/index";
import RandomStep from "components/randomStep/index";
import AdjustSnapshotsButton from "components/adjustSnapshotsButton/index";
import StretchFactorSlider from 'components/sliders/stretchFactorSlider/index'
import {
  StyledContainer,
  StyledControlContainer,
  StyledSubContainer1,
} from "./AppStyles";

function App() {
  // gloabl state
  const { xxs, xs, sm, md, lg, xl } = useContext(ScreenSizesContext);

  return (
    <StyledContainer small={xxs || xs || sm} big={md || lg || xl}>
      <StyledSubContainer1 small={xxs || xs || sm} big={md || lg || xl}>
        <StyledControlContainer>
          <PopulationSlider />
          <BugSizeSlider />
          <OffspringDistanceSlider />
          <GrowSpeedSlider />
          <MaxMutationSlider />
          <FileInput />
          <ResetButton />
          <PresetImageSelect />
          <RandomStep />
          <AdjustSnapshotsButton />
          <StretchFactorSlider />
        </StyledControlContainer>
        <SvgContainer />
      </StyledSubContainer1>
      <PopulationSnapshots />
    </StyledContainer>
  );
}

export default App;
