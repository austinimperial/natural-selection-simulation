import React, { useContext } from "react";
import { ScreenSizesContext } from "globalState/screenSizes/index";
import { StyledContainer } from "./styles";
import FileInput from "components/simulationControls/fileInput/index";
import ResetButton from "components/simulationControls/resetButton/index";
import PopulationSlider from "components/simulationControls/populationSlider/index";
import BugSizeSlider from "components/simulationControls/bugSizeSlider/index";
import OffspringDistanceSlider from "components/simulationControls/offspringDistanceSlider/index";
import GrowSpeedSlider from "components/simulationControls/growSpeedSlider/index";
import MaxMutationSlider from "components/simulationControls/maxMutationSlider/index";
import PresetImageSelect from "components/simulationControls/presetImageSelect/index";
import RandomStep from "components/simulationControls/randomStep/index";
import CustomInitialBugs from "components/simulationControls/customInitialBugs/index";

function SimulationControls() {
  // global state
  const { xxs, xs, sm, md, lg, xl } = useContext(ScreenSizesContext);

  return (
    <StyledContainer small={xxs || xs || sm} big={md || lg || xl}>
      <PopulationSlider />
      <BugSizeSlider />
      <OffspringDistanceSlider />
      <GrowSpeedSlider />
      <MaxMutationSlider />
      <PresetImageSelect />
      <FileInput />
      <ResetButton />
      <RandomStep />
      <CustomInitialBugs />
    </StyledContainer>
  );
}

export default SimulationControls;
