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
import {
  StyledContainer,
  StyledCanvasAndGridContainer,
  StyledControlContainer,
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
        </StyledControlContainer>
        <SvgCanvas />
        <ColorGrid />
      </StyledCanvasAndGridContainer>
    </StyledContainer>
  );
}

export default App;
