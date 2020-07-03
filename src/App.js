import React from "react";
import SvgCanvas from "components/svgCanvas/index";
import FileInput from "components/fileInput/index";
import ResetButton from "components/resetButton/index";
import ColorGrid from "components/colorGrid/index";
import PopulationSlider from "components/populationSlider/index";
import {
  StyledContainer,
  StyledCanvasAndGridContainer,
  StyledControlContainer,
} from "./AppStyles";

function App() {
  return (
    <StyledContainer>
      <StyledCanvasAndGridContainer>
        <SvgCanvas />
        <ColorGrid />
      </StyledCanvasAndGridContainer>
      <StyledControlContainer>
        <FileInput />
        <ResetButton />
        <PopulationSlider />
      </StyledControlContainer>
    </StyledContainer>
  );
}

export default App;
