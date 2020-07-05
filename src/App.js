import React from "react";
import SvgCanvas from "components/svgCanvas/index";
import FileInput from "components/fileInput/index";
import ResetButton from "components/resetButton/index";
import ColorGrid from "components/colorGrid/index";
import PopulationSlider from "components/sliders/populationSlider/index";
import BugSizeSlider from "components/sliders/bugSizeSlider/index";
import OffspringDistanceSlider from "components/sliders/offspringDistanceSlider/index";
import GrowSpeedSlider from "components/sliders/growSpeedSlider/index";
import MaxMutationSlider from "components/sliders/maxMutationSlider/index";
import DomColors from "components/domColors/index";
import PresetImageSelect from "components/presetImageSelect/index";
import {
  StyledContainer,
  StyledCanvasAndGridContainer,
  StyledControlContainer,
  StyledCanvasAndDomColorsContainer,
} from "./AppStyles";

function App() {
  return (
    <StyledContainer>
      <StyledCanvasAndGridContainer>
        <StyledControlContainer>
          <PopulationSlider />
          <BugSizeSlider />
          <OffspringDistanceSlider />
          <GrowSpeedSlider />
          <MaxMutationSlider />
          <FileInput />
          <ResetButton />
          <PresetImageSelect />
        </StyledControlContainer>
        <StyledCanvasAndDomColorsContainer>
          <SvgCanvas />
          <DomColors />
        </StyledCanvasAndDomColorsContainer>
        <ColorGrid />
      </StyledCanvasAndGridContainer>
    </StyledContainer>
  );
}

export default App;
