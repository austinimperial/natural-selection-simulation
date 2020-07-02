import React from "react";
import SvgCanvas from "components/svgCanvas/index";
import FileInput from "components/fileInput/index";
import ShuffleButton from "components/shuffleButton/index";
import ColorGrid from 'components/colorGrid/index'
import { 
  StyledContainer,
  StyledCanvasAndGridContainer
 } from "./AppStyles";

function App() {
  return (
    <StyledContainer>
      <StyledCanvasAndGridContainer>
        <SvgCanvas />
        <ColorGrid />        
      </StyledCanvasAndGridContainer>
      <FileInput />
      <ShuffleButton />
    </StyledContainer>
  );
}

export default App;
