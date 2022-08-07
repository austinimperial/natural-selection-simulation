import React, { useContext} from "react";
import { ScreenSizesContext } from "globalState/screenSizes/index";
import { BugsContext } from "globalState/bugs/BugsProvider";
import { 
  StyledContainer,
} from "./SimulationControlsStyles";
import ControlCollapse from "components/simulationControls/controlCollapse/index"
import CustomBugCollapse from "components/simulationControls/customBugsCollapse/index"
import FileInput from "components/simulationControls/fileInput/index";
import ResetButton from "components/simulationControls/resetButton/index";
import PopulationSlider from "components/simulationControls/sliders/PopulationSlider";
import BugSizeSlider from "components/simulationControls/sliders/BugSizeSlider";
import OffspringDistanceSlider from "components/simulationControls/sliders/OffspringDistanceSlider";
import GrowSpeedSlider from "components/simulationControls/sliders/GrowSpeedSlider";
import MaxMutationSlider from "components/simulationControls/sliders/MaxMutationSlider";
import PresetImageSelect from "components/simulationControls/presetImageSelect/index";
import RandomStep from "components/simulationControls/randomStep/index";
import CustomInitialBugs from "components/simulationControls/customInitialBugs/index";
import HungerTimerSlider from "./sliders/HungerTimerSlider";
import FlashCheckbox from "./flash-checkbox/FlashCheckbox";

function SimulationControls() {
  // global state
  const { xxs, xs, sm, md, lg, xl } = useContext(ScreenSizesContext);

  if (xxs || xs || sm) return (
    <StyledContainer >
      <ControlCollapse />
      <CustomBugCollapse />
      <div
        style={{
          display: 'flex'
        }}
      >
        <ResetButton />
        <RandomStep />        
      </div>
    </StyledContainer>
  )

  if (md || lg || xl) return (
    <StyledContainer >
      <PopulationSlider />
      <BugSizeSlider />
      <OffspringDistanceSlider />
      <GrowSpeedSlider />
      <MaxMutationSlider />    
      <HungerTimerSlider />  
      <FlashCheckbox />
      <PresetImageSelect />
      <FileInput />
      <ResetButton />
      <RandomStep />
      <CustomInitialBugs />
    </StyledContainer>
  )
}

export default SimulationControls;
