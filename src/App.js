import React from "react";
import SvgCanvas from "components/svgCanvas/index";
import FileInput from "components/fileInput/index";
import ResetButton from "components/resetButton/index";
import ColorGrid from "components/colorGrid/index";
import { StyledContainer, StyledCanvasAndGridContainer } from "./AppStyles";

function App() {
  return (
    <StyledContainer>
      <StyledCanvasAndGridContainer>
        <SvgCanvas />
        <ColorGrid />
      </StyledCanvasAndGridContainer>
      <FileInput />
      <ResetButton />
    </StyledContainer>
  );
}

export default App;
